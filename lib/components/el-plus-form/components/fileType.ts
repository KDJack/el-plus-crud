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
 * 取文件类型 key（img/pdf/word/excel/ppt/txt/zip/file）
 * 兼容 IOssInfo 与 el-upload 内部 file：suffix 优先取业务字段，缺失则从文件名提取扩展名兜底，
 * 否则类型图标会全部退化成 file
 */
export function getFileType(file: any): string {
  let suffix = (file?.suffix || file?.raw?.suffix || '').toLocaleLowerCase()
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
 * 文件大小格式化
 */
export function formatSize(bytes?: number): string {
  if (!bytes) return ''
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}
