import { ElMessage } from 'element-plus'
import { imageSuffixes, suffixTypes } from '../data/file'

/**
 * 类型 → 色系 class + 缩写标签
 * 与 ElPlusFormUpload cardMode 共用同一套分类，单一来源
 */
export const TYPE_META: Record<string, { cls: string; label: string }> = {
  pdf: { cls: 'pdf', label: 'PDF' },
  word: { cls: 'word', label: 'WORD' },
  excel: { cls: 'excel', label: 'EXCEL' },
  ppt: { cls: 'ppt', label: 'PPT' },
  txt: { cls: 'txt', label: 'TXT' },
  zip: { cls: 'zip', label: 'ZIP' },
  img: { cls: 'img', label: 'IMG' }
}

/**
 * suffix 归一化：小写 + 统一前导点（'.png'）。
 * 后端/调用方存在 dotless（"png"）口径，而后缀表（imageSuffixes/suffixTypes）全带点，
 * dotless 匹配必失败 → 图片退化 FILE 图标 / 预览误判。getFileType 与 Upload.isImageItem 共用。
 */
export function normalizeSuffix(suffix: any): string {
  const s = (suffix || '').toString().toLocaleLowerCase()
  return s && !s.startsWith('.') ? '.' + s : s
}

/**
 * 取文件类型 key（img/pdf/word/excel/ppt/txt/zip/file）
 * 兼容 IOssInfo 与 el-upload 内部 file：suffix 优先取业务字段，缺失则从文件名提取扩展名兜底，
 * 否则类型图标会全部退化成 file
 */
export function getFileType(file: any): string {
  let suffix = normalizeSuffix(file?.suffix || file?.raw?.suffix || '')
  if (!suffix) {
    const name = (file?.name || file?.raw?.name || '').toLowerCase()
    const dot = name.lastIndexOf('.')
    suffix = dot >= 0 ? name.substring(dot) : ''
  }
  if (imageSuffixes.indexOf(suffix) >= 0) return 'img'
  const found = suffixTypes.find((t: any) => t.suffixes.indexOf(suffix) >= 0)
  return found ? found.type : 'file'
}

export function typeClass(file: any): string {
  const meta = TYPE_META[getFileType(file)]
  return meta ? meta.cls : 'file'
}

export function typeLabel(file: any): string {
  const meta = TYPE_META[getFileType(file)]
  return meta ? meta.label : 'FILE'
}

export function isImageFile(file: any): boolean {
  return getFileType(file) === 'img'
}

/**
 * 图片可直接 <img> 展示的 url（缩略图 / 预览器共用）。
 * 取址顺序：signUrl → shareUrl → url → furl → previewUrl（末位兜底），含 raw 兜底。
 * 末位 previewUrl 用于兼容「图片仅带 previewUrl、无 objectUrl 直链」的异常数据——
 * 否则缩略图能显示、但预览器 url-list 取空 → el-image-viewer 打开后 img 不渲染。
 * 正常 OSS 图片首选仍是 shareUrl(objectUrl)，previewUrl 仅在全空时兜底，不改变首选语义。
 */
export function getImageUrl(item: any): string {
  const raw = item?.raw || {}
  return item.signUrl || raw.signUrl || item.shareUrl || raw.shareUrl || item.url || raw.url || item.furl || raw.furl || item.previewUrl || raw.previewUrl || ''
}

/**
 * 是否为图片项：suffix 命中图片后缀，或 url 为 data:image base64。
 * 与 ElPlusFormUpload 的 isImageItem 对齐（预览/点击路径用此判定，而非仅后缀的 isImageFile）。
 * ponytail: base64 data URL 无文件后缀，suffix 解析不可靠，须以 data: 前缀兜底，
 * 否则点击会误判为非图片 → 走文件预览分支。
 */
export function isImageItem(item: any): boolean {
  if (getFileType(item) === 'img') return true
  return getImageUrl(item).toLowerCase().startsWith('data:image/')
}

/**
 * 下载取址：与 getImageUrl 同序（signUrl → shareUrl → url → furl → previewUrl），
 * 语义独立便于后续分化（如下载需强制签名链接时只改这里）
 */
export function getDownloadUrl(item: any): string {
  return getImageUrl(item)
}

/**
 * fetch blob 下载（保证保存为文件 + 自定义文件名）；
 * 失败（CORS/网络/签名过期）回退 window.open 直链打开。
 * data:image base64 项同样可走 fetch→blob（fetch 支持 data URL），无需特判。
 */
export function downloadFile(item: any): void {
  const url = getDownloadUrl(item)
  if (!url) {
    ElMessage.warning('暂无下载地址')
    return
  }
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(String(res.status))
      return res.blob()
    })
    .then((blob) => {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = item?.name || item?.raw?.name || '文件'
      a.click()
      // ponytail: 延迟释放，旧 Safari 同步 revoke 会中断刚触发的下载
      setTimeout(() => URL.revokeObjectURL(a.href), 1000)
    })
    .catch(() => {
      // fetch 失败（常见于 OSS 未配 CORS）回退直链打开；
      // 此处已脱离用户手势上下文，弹窗拦截器可能拦截，须检测并提示
      const w = window.open(url, '_blank', 'noopener,noreferrer')
      if (!w) {
        ElMessage.warning('浏览器拦截了弹窗，且无法直接下载，请检查网络或稍后重试')
      }
    })
}

/**
 * 文件大小格式化
 */
export function formatSize(bytes?: number): string {
  if (!bytes) return ''
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}
