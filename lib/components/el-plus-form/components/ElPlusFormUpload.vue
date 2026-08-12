<template>
  <div class="ele-form-upload-image" :class="{ 'ele-form-upload-file': !!desc.upType, 'ele-form-upload-card': cardMode }" v-if="isInit">
    <el-upload ref="uploadRef" class="ele-image-upload" v-bind="attrs" v-on="onEvents" :disabled="disabled" :fileList="currentValue || []" :class="{ 'over-limit': currentValue?.length >= attrs.limit, 'upload-disabled': attrs.disabled }">
      <!-- card 模式：胶囊形添加按钮作为触发器 -->
      <div v-if="cardMode" class="upload-add-btn" v-show="(currentValue?.length || 0) + activeCount < realLimit">
        <span class="plus">+</span>{{ desc.addText || (isImageType ? '添加图片' : '添加文件') }}
        <span class="format-hint" v-if="desc.formatHint">{{ desc.formatHint }}</span>
      </div>
      <!-- 老模式：原触发器 -->
      <div v-else class="upload-panel-icon">
        <i v-if="desc.icon" :class="desc.icon" :style="{ fontSize: desc.fontSize || '14px', color: desc.color || 'var(--el-text-color-placeholder)' }"></i>
        <el-icon v-else :style="{ fontSize: desc.fontSize || '14px', color: desc.color || 'var(--el-text-color-placeholder)' }"><Plus /></el-icon>
        <div class="el-upload__text2" v-if="!!desc.upType && desc.text2">
          {{ desc.text2 }}
        </div>
        <div class="el-upload__text" v-if="!!desc.upType">
          {{ desc.text || '拖拽/点击上传' }}
        </div>
      </div>
      <!-- card 模式：用 #file 插槽自定义每个文件项为卡片，复用 el-upload 的上传中进度/成功/失败状态 -->
      <template v-if="cardMode" #file="{ file }">
        <div class="upload-file-card" :class="{ 'is-fail': file.status === 'fail' }" @click="onCardClick(file)">
          <img v-if="isImage(file) && imgUrl(file)" class="file-thumb" :src="imgUrl(file)" />
          <div v-else class="file-type-icon" :class="typeClass(file)">{{ typeLabel(file) }}</div>
          <div class="file-info">
            <span class="file-name">{{ file.name }}</span>
            <span v-if="file.status === 'uploading'" class="file-meta file-progress">
              <span class="file-progress-track">
                <span class="file-progress-fill" :style="{ width: (file.percentage || 0) + '%' }"></span>
              </span>
            </span>
            <span v-else-if="file.status === 'fail'" class="file-meta file-error">上传失败</span>
            <span v-else class="file-meta">{{ formatSize(file.size ?? file.fsize) }}</span>
          </div>
          <span v-if="!attrs.disabled" class="file-delete" @click.stop="onCardRemove(file)">×</span>
        </div>
      </template>
    </el-upload>

    <!-- 图片查看的站位标签 -->
    <el-image-viewer v-if="showPreview" @close="showPreview = false" teleported :initialIndex="previewIndex" :url-list="previewList" />

    <div v-if="!attrs.autoUpload" class="upload-hands-submit">
      <el-button style="margin-left: 10px" size="small" type="success" @click="submit" :disabled="attrs.disabled"> 上传到服务器 </el-button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormUpload',
  inheritAttrs: false,
  typeName: 'upload',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, computed, useAttrs, onBeforeMount, watch, inject, type Ref } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import * as fileTypes from '../data/file'

// 引入图标
import excel from '../images/icon/excel.png'
import pdf from '../images/icon/pdf.png'
import file from '../images/icon/file.png'
import txt from '../images/icon/txt.png'
import word from '../images/icon/word.png'
import zip from '../images/icon/zip.png'
import ppt from '../images/icon/ppt.png'
import { ICRUDConfig, IOssInfo } from '../../../../types'
import { isPromiseLike, getValue } from '../../../util'
import { useVModel } from '@vueuse/core'

interface IUpAction {
  action: string
  uploadId?: string
  token?: string
  furl?: string
}

const defaultConf = inject('defaultConf') as ICRUDConfig

// 图标Map
const iconMap = { excel, pdf, file, txt, word, zip, ppt } as any

const props = defineProps<{
  modelValue?: string | Array<IOssInfo>
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue', 'validateThis'])
// ponytail: 内部 currentValue 恒为文件数组（modelValue 多态，由下方 watch 归一化），用 Ref<Array> 断言保留 .push/.map 用法
const currentValue = useVModel(props, 'modelValue', emits) as Ref<Array<any>>

const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

// 提交action
const upAction = ref('')
const upActionInfo = ref({} as any)
const isImageType = computed(() => !props.desc.upType || props.desc.upType === 'image')
// card 模式：胶囊按钮 + 文件卡片式回显（默认新风格；desc.listType 传 'picture-card'/'text' 回退老风格）
const cardMode = computed(() => props.desc.listType !== 'picture-card' && props.desc.listType !== 'text')
// 真实上传数量上限：card 模式下 el-upload 内部 limit 会被放大(放行失败重传)，名额判断统一用此值
const realLimit = computed(() => (props.desc.multiple ? props.desc.limit || 20 : 1))
// 正在上传中(ready/uploading)的文件数，计入 limit 名额；失败(status=fail)不计入 → 失败即释放名额、恢复按钮
const activeCount = ref(0)
function onUploadChange(_file: any, fileList: any[]) {
  activeCount.value = fileList.filter((f: any) => f.status === 'uploading' || f.status === 'ready').length
}
// el-upload 实例引用，供卡片删除时同步其内部 uploadFiles
const uploadRef = ref()

const showPreview = ref(false)
const previewIndex = ref(0)
const previewList = computed(() => {
  const tempList = [] as string[]
  currentValue.value.forEach((item: any) => {
    if (isImageItem(item)) {
      const url = getImgPreviewUrl(item)
      if (url) tempList.push(url)
    }
  })
  return tempList
})

onBeforeMount(async () => {
  // 兜底：modelValue 未初始化（undefined）时补 []。否则 :fileList="currentValue || []" 每次 render 产生新 [] 引用，
  // ElUpload 内部 uploadFiles 被动 watch 不断重置 → handleSuccess 的 getFile 找不到文件 → onSuccess 不触发 / handelListChange 报错
  if (!currentValue.value) {
    currentValue.value = []
  }
  if (!defaultConf.upload?.sign && !props.desc?.sign) {
    defaultConf.debug && console.warn('上传私有加密仓库必须在config或desc中配置sign方法进行图片/文件签名鉴权，否则图片将无法显示和预览！')
  }

  attrs.value = await getAttrs(props, {
    drag: true,
    listType: isImageType.value ? 'picture-card' : 'text',
    multiple: !!props.desc.multiple,
    limit: props.desc.multiple ? props.desc.limit || 20 : 1,
    autoUpload: props.desc.autoUpload ?? true,
    accept: props.desc.accept || (fileTypes as any)[`${props.desc.upType || 'image'}Types`].join(','),
    maxSize: props.desc.maxSize || (isImageType.value ? defaultConf.upload?.maxISize : defaultConf.upload?.maxFSize),
    beforeUpload: handelUploadBefore,
    onRemove: handelUploadRemove,
    onSuccess: handelUploadSuccess,
    onExceed: handleOutOfLimit,
    onPreview: handelPreview,
    ...useAttrs()
  })
  // 如果有自定义上传函数，则走自定义，否则走action
  if (props.desc?.uploadFn || defaultConf.upload?.uploadFn) {
    attrs.value.httpRequest = handelRequest
  } else {
    if (defaultConf.upload?.type === 'minio') {
      attrs.value.method = defaultConf.upload.actionType || 'PUT'
    }
    attrs.value.action = upAction
  }
  // card 模式：去掉拖拽；保留 el-upload 列表（用 #file 插槽自定义卡片），以复用其上传中进度/成功/失败状态
  if (cardMode.value) {
    attrs.value.drag = false
    attrs.value.listType = 'text'
    // 放大 el-upload 内部 limit：失败文件会留在 uploadFiles 显示失败卡片，但不应占名额阻止重传。
    // 真正的名额控制交给胶囊按钮 v-show（realLimit + activeCount），el-upload 自身不再 exceed 拦截。
    attrs.value.limit = 9999
    // el-upload 的 onChange 是 prop 回调(非 emit)，须挂到 attrs 上才能在文件状态变化时统计上传中数量
    attrs.value.onChange = onUploadChange
  }
  isInit.value = true
})

/**
 * 上传之前，校验文件大小以及类型
 * @param file
 */
async function handelUploadBefore(file: any) {
  file.suffix = `${(file.name as string).substring(file.name.lastIndexOf('.'))}`.split('?')[0]
  const message = validateFile(file, (fileTypes as any)[`${props.desc.upType || 'image'}Suffixes`], attrs.value.maxSize)
  if (message !== true) {
    ElMessage.warning(message)
    return false
  }
  try {
    // 这里先用本地地址进行占位
    file.url = URL.createObjectURL(file)
    // 获取文件上传的action
    let actionInfo = {} as IUpAction
    if (props.desc?.action) actionInfo = await getActionInfo(props.desc?.action, { fileName: file.name })
    if (!actionInfo.action) actionInfo = await getActionInfo(defaultConf.upload?.action, { fileName: file.name })
    upAction.value = actionInfo.action
    file.uploadId = actionInfo.uploadId || ''
    file.furl = actionInfo.furl

    // 获取上传的token
    if (props.desc?.token || defaultConf.upload?.token) {
      attrs.value.data = { token: await getToken(props.desc?.token || defaultConf.upload?.token, file) }
    }

    if (!props.desc?.uploadFn && defaultConf.upload?.type === 'minio') {
      attrs.value.data = file
      attrs.value.headers = {
        'Content-Type': file.type
      }
    }
  } catch (e) {
    defaultConf.debug && console.log('获取action出错: ', e)
  }
}

/**
 * 获取actionInfo信息
 * @param action
 * @param param
 */
async function getActionInfo(action: string | Function | undefined, param?: any): Promise<IUpAction> {
  const tempInfo = { action: '', uploadId: undefined, token: undefined, furl: '' }
  if (typeof action === 'function') {
    const result = action({ ...(param || {}), type: defaultConf.upload?.type })
    const uploadInfo = (isPromiseLike<any>(result) ? await result : result) as any
    if (typeof uploadInfo === 'object') {
      tempInfo.action = getValue(props.desc?.actionMap?.actionKey || defaultConf.upload?.actionMap?.actionKey || [], uploadInfo)
      tempInfo.uploadId = getValue(props.desc?.actionMap?.uploadIdKey || defaultConf.upload?.actionMap?.uploadIdKey || [], uploadInfo)
      tempInfo.token = getValue(props.desc?.tokenKey || defaultConf.upload?.tokenKey || [], uploadInfo)
      tempInfo.furl = getValue(props.desc?.actionMap?.objectUrlKey || defaultConf.upload?.actionMap?.objectUrlKey || [], uploadInfo)
    } else {
      tempInfo.action = uploadInfo as string
    }
    upActionInfo.value = uploadInfo
  } else if (action !== undefined) {
    tempInfo.action = action
  }
  return tempInfo
}

/**
 * 获取token
 * @param token
 * @param param
 */
async function getToken(token: string | Object | Function | undefined, param?: any): Promise<string> {
  let tokenVal = ''
  if (typeof token === 'function') {
    const result = token(param)
    const tokenInfo = isPromiseLike<any>(result) ? await result : result
    if (typeof tokenInfo === 'object') {
      tokenVal = getValue(props.desc?.tokenKey || defaultConf.upload?.tokenKey || [], tokenInfo)
    } else {
      tokenVal = tokenInfo as string
    }
  }
  return tokenVal
}

/**
 * 上传成功回调
 * @param _
 * @param file
 * @param fileList
 */
async function handelUploadSuccess(response: any, file: any) {
  if (response && Object.keys(response).length > 0) {
    // 从结果集中获取一下furl
    const tempUrl = getValue(defaultConf.upload?.actionMap?.objectUrlKey || [], response.request || response.result || response)
    if (tempUrl) file.raw.furl = tempUrl
  }
  // 获取文件上传的token以及上传路径
  if (defaultConf.upload?.sign) {
    let signInfo = {} as any
    const result = defaultConf.upload?.sign(file.raw[defaultConf.upload?.type === 'aliyun' ? 'furl' : 'uploadId'])
    if (isPromiseLike<any>(result)) {
      signInfo = await result
    } else {
      signInfo = result
    }
    file.raw.previewUrl = getValue(defaultConf.upload.signMap?.previewUrlKey || [], signInfo)
    file.raw.shareUrl = getValue(defaultConf.upload.signMap?.objectUrlKey || [], signInfo)
    file.raw.url = file.raw.shareUrl
  } else {
    file.raw.previewUrl = file.raw.furl
    file.raw.shareUrl = file.raw.furl
  }
  if (isImageType.value) {
    file.url = getFileIcon(file.raw)
  } else {
    file.url = file.raw.furl
  }
  handelListChange(file, 1)
}

/**
 * 获取文件Icon
 * @param file
 */
function getFileIcon(file?: any): string {
  const fileUrl = file.shareUrl || file.signUrl || file.url || file.furl
  const suffix = `${(file?.suffix || fileUrl.substring(fileUrl.split('?')[0].lastIndexOf('.')) || '').toLocaleLowerCase()}`.split('?')[0]
  if (suffix) {
    if (fileTypes.imageSuffixes.indexOf(suffix) >= 0) {
      return fileUrl
    }
    for (let i = 0; i < fileTypes.suffixTypes.length; i++) {
      for (let j = 0; j < fileTypes.suffixTypes[i].suffixes.length; j++) {
        if (fileTypes.suffixTypes[i].suffixes[j] === suffix) {
          return iconMap[fileTypes.suffixTypes[i].type]
        }
      }
    }
  }
  // 这里判断如果是图片，无论如何都返回本身
  return !props.desc.upType || props.desc.upType === 'image' ? fileUrl : iconMap.file
}

/**
 * 处理删除
 * @param file
 * @param fileList
 */
function handelUploadRemove(file: any) {
  handelListChange(file, 0)
}

/**
 * 处理图片列表的修改
 * @param file
 * @param type 0 : 删除; 1: 新增
 */
function handelListChange(item: any, type: 0 | 1) {
  if (type === 1) {
    currentValue.value.push({
      name: item.name,
      furl: item.raw.furl || item.furl || item.url,
      url: isImageType.value ? getFileIcon(item.raw) : item?.raw?.shareUrl || item.url,
      fsize: item.size,
      uid: item.uid,
      mimeType: item.raw?.type,
      suffix: (item.raw as any).suffix?.toLocaleLowerCase() || '',
      busId: props.desc.busId,
      busType: props.desc.busType
    })
  } else {
    const index = currentValue.value.findIndex((file) => file.uid === item.uid)
    if (index >= 0) {
      currentValue.value.splice(index, 1)
    }
  }
  emits('validateThis')
}

/**
 * 浏览图片
 * @param file
 */
function handelPreview(file: any) {
  if (isImageItem(file)) {
    const url = getImgPreviewUrl(file)
    previewIndex.value = previewList.value.findIndex((item) => item === url)
    if (previewIndex.value < 0) {
      previewIndex.value = 0
    }
    showPreview.value = true
  } else {
    const url = file.raw?.previewUrl || file.previewUrl
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    } else {
      ElMessage.warning('暂无预览地址')
    }
  }
}

// ===== card 模式：文件卡片渲染辅助 =====
// 类型 → 色系 class + 缩写标签
const TYPE_META: Record<string, { cls: string; label: string }> = {
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
 * @param file
 */
function getFileType(file: any) {
  // suffix 优先取业务字段；但 el-upload 内部 file 及 handelListChange 存入 currentValue 的项均无可靠 suffix
  // （raw 是 File 对象无 suffix 属性），故从文件名提取扩展名兜底，否则类型图标会全部退化成 FILE
  let suffix = (file?.suffix || file?.raw?.suffix || '').toLocaleLowerCase()
  if (!suffix) {
    const name = (file?.name || file?.raw?.name || '').toLowerCase()
    const dot = name.lastIndexOf('.')
    suffix = dot >= 0 ? name.substring(dot) : ''
  }
  if (fileTypes.imageSuffixes.indexOf(suffix) >= 0) return 'img'
  const found = fileTypes.suffixTypes.find((t: any) => t.suffixes.indexOf(suffix) >= 0)
  return found ? found.type : 'file'
}

function typeClass(file: any) {
  const meta = TYPE_META[getFileType(file)]
  return meta ? meta.cls : 'file'
}

function typeLabel(file: any) {
  const meta = TYPE_META[getFileType(file)]
  return meta ? meta.label : 'FILE'
}

/**
 * 是否为图片（卡片图标位直接显示缩略图）
 * @param file
 */
function isImage(file: any) {
  return getFileType(file) === 'img'
}

/**
 * 取图片缩略图 url（卡片 file-thumb 的 src）
 * ponytail: 图片可直接 <img> 展示的是 objectUrl（signMap.objectUrlKey → shareUrl），
 * 而 previewUrl 是「非图片」文件点击在线预览的地址（见 handelPreview 的 window.open），
 * 对图片缩略图不适用，放末位兜底。签名结果存于 file.raw（顶层无），须一并读取。
 * @param file
 */
function imgUrl(file: any) {
  const raw = file?.raw || {}
  return file.signUrl || raw.signUrl || file.shareUrl || raw.shareUrl || file.url || raw.url || file.furl || raw.furl || file.previewUrl || raw.previewUrl || ''
}

/**
 * 取图片预览 url（previewList / 缩略图共用）。
 * 与 imgUrl 取址一致：signUrl → shareUrl → url → furl → previewUrl（末位兜底），含 raw 兜底。
 * 末位 previewUrl 兜底「图片仅带 previewUrl」的异常数据，避免缩略图显示但 viewer 预览空白。
 */
function getImgPreviewUrl(item: any): string {
  const raw = item?.raw || {}
  return item.signUrl || raw.signUrl || item.shareUrl || raw.shareUrl || item.url || raw.url || item.furl || raw.furl || item.previewUrl || raw.previewUrl || ''
}

/**
 * 是否为图片项：suffix 命中图片后缀，或 url 为 data:image base64 data URL。
 * ponytail: base64 data URL 无文件后缀，suffix 解析不可靠，须另以 data: 前缀兜底，
 * 否则 handelPreview 误判为非图片 → window.open(undefined) → about:blank。
 */
function isImageItem(item: any): boolean {
  const suffix = (item?.raw?.suffix || item?.suffix || '').toString().toLocaleLowerCase()
  if (suffix && fileTypes.imageSuffixes.indexOf(suffix) >= 0) return true
  const url = getImgPreviewUrl(item).toLowerCase()
  if (url.startsWith('data:image/')) return true
  return false
}

/**
 * 文件大小格式化
 * @param bytes
 */
function formatSize(bytes: number) {
  if (!bytes) return ''
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

/**
 * 卡片点击：图片预览 / 非图片新窗口打开（复用 handelPreview）
 * @param file
 */
function onCardClick(file: any) {
  // 上传中 / 失败的文件不预览
  if (file.status && file.status !== 'success') return
  handelPreview(file)
}

/**
 * 卡片删除：以 currentValue 为真相源，按 uid（优先）/url 兜底定位并 splice，
 * 并尽量同步 el-upload 内部 uploadFiles（无 uid 的回显项不影响 card 渲染）
 * @param file
 */
function onCardRemove(file: any) {
  // 走 el-upload 标准删除：清理内部 uploadFiles，并经 onRemove 链路同步 currentValue
  if (uploadRef.value?.handleRemove) {
    uploadRef.value.handleRemove(file)
  } else {
    const idx = currentValue.value.findIndex((f: any) => (file.uid && f.uid === file.uid) || (f.furl || f.url) === (file.furl || file.url))
    if (idx >= 0) currentValue.value.splice(idx, 1)
    emits('validateThis')
  }
}

/**
 * 超出上传数量
 */
function handleOutOfLimit() {
  ElMessage.error('数量最多只能上传' + attrs.value.limit + '个图片/文件!!!')
}

/**
 * 处理自定义上传
 * @param param
 */
function handelRequest(param: any) {
  param.action = upAction.value
  param.actionInfo = upActionInfo.value
  const uploadFn = props.desc?.uploadFn || defaultConf.upload?.uploadFn
  return uploadFn(param)
}

// 手动调用上传的方法
function submit() {
  // this.$refs[this.ref].submit()
}

/**
 * 校验文件
 * @param file
 * @param types
 * @param maxSize
 */
function validateFile(file: any, types: Array<any>, maxSize: number) {
  // 校验文件大小
  if (file.size > maxSize) {
    return '上传文件大小不能超过 ' + (maxSize / 1024 / 1024).toFixed(2) + 'M~'
  }
  // 开始校验文件类型
  if (types && types.length > 0) {
    if (types.every((type) => type !== (file.suffix || '').toLocaleLowerCase())) {
      return '上传文件类型错误，请重新选择~'
    }
  }
  return true
}

watch(
  () => props.modelValue,
  (data: string | Array<IOssInfo> | undefined, oldData: any) => {
    if (JSON.stringify(data) !== JSON.stringify(oldData)) {
      // 这里初始化一下
      if (typeof data === 'string') {
        if (data !== '') {
          currentValue.value = [{ url: data, furl: data, suffix: `${data.substring(data.lastIndexOf('.')).toLocaleLowerCase()}`.split('?')[0] }]
        } else {
          currentValue.value = []
        }
      } else {
        currentValue.value =
          data?.map((item: IOssInfo) => {
            if (isImageType.value) {
              item.url = getFileIcon(item) || getValue(defaultConf.upload?.signMap?.previewUrlKey || [], item)
              item.furl = item.furl || getFileIcon(item)
            }
            item.suffix = `${(item.suffix || item.url?.substring(item.url?.lastIndexOf('.') || 0) || '').toLocaleLowerCase()}`.split('?')[0]
            item.previewUrl = getValue(defaultConf.upload?.signMap?.previewUrlKey || [], item) || item.furl || item.url
            return item
          }) || []
      }
    }
  },
  { immediate: true }
)

/**
 * 回显补全（v0.1.97+）：父组件 push 进来的附件对象（如详情接口返回的 FileAnnexVO）
 * 可能只有 signUrl/previewUrl/furl 而缺 url，但 el-upload 的 picture-card 缩略图只读
 * file.url，缺失则破图。主 watch 无 deep、对数组 push 不触发，故此处 deep 监听原地补全
 * url（不换数组引用，避免触发 el-upload uploadFiles 重置而破坏上传成功回调）。
 * 已有 url 的对象一律不覆盖 —— 100% 兼容既有数据、新增上传与提交流程。
 */
watch(
  () => props.modelValue,
  (data) => {
    if (Array.isArray(data)) {
      data.forEach((item: any) => {
        if (item && !item.url) {
          const fallback = item.signUrl || item.shareUrl || item.previewUrl || item.furl
          if (fallback) item.url = fallback
        }
      })
    }
  },
  { deep: true, immediate: true }
)
</script>
<style lang="scss">
.ele-form-upload-image {
  width: 100%;
  display: flex;

  .ele-image-upload {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }

  .upload-panel-icon {
    margin: auto;
  }

  .upload-disabled {
    .el-upload--picture-card {
      cursor: not-allowed !important;
    }
  }

  .el-icon-close-tip {
    display: none !important;
  }

  .el-upload--picture-card {
    margin-bottom: 12px;
  }

  .over-limit {
    .el-upload--picture-card {
      display: none !important;
    }
  }

  .el-upload--picture-card,
  .el-upload-list--picture-card .el-upload-list__item {
    width: 100px !important;
    height: 100px !important;
    border: none !important;
  }

  .el-upload-dragger {
    display: flex;
    padding: 0 !important;
    min-height: 100px;
    // height: 100px !important;

    .el-upload__text {
      font-size: 12px !important;
      color: var(--el-text-color-placeholder);
    }

    .el-upload__text2 {
      font-size: 16px;
      color: var(--el-text-color-primary);
      line-height: 22px;
      margin-top: 16px;
      margin-bottom: 16px;
    }
  }

  .el-progress-circle {
    width: 90px !important;
    height: 90px !important;
    margin: auto;
  }

  .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    object-fit: cover !important;
  }

  .el-icon--close-tip {
    display: none !important;
  }
}

.ele-form-upload-file {
  .ele-image-upload {
    flex-direction: column;
  }

  .el-upload-list__item {
    // margin: 0 !important;
  }

  .el-form-item--default .el-form-item__content {
    line-height: 20px !important;
    font-size: 12px !important;
  }

  .el-upload-list__item-name {
    line-height: 20px !important;
    font-size: 12px !important;
  }
}

/* ===== card 模式：胶囊按钮 + 文件卡片 ===== */
.ele-form-upload-card {
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  // 按钮浅底：主色 10% 混白，运行时跟随 --el-color-primary（外部动态切主色时实时变化）
  --upload-add-bg: color-mix(in srgb, var(--el-color-primary) 10%, white);

  // card 模式：触发器(胶囊按钮)与文件列表上下排版；触发器只占内容宽，卡片铺满宽度
  .ele-image-upload {
    flex-direction: column;
    align-items: stretch;

    // 触发器只占内容宽，避免胶囊按钮右侧空白区也触发上传
    > .el-upload--text {
      align-self: flex-start;
      max-width: 100%;
      margin-bottom: 8px;
    }

    .el-upload-list {
      margin: 0;
      padding: 0;
      overflow: visible;
      line-height: normal;
    }

    .el-upload-list__item {
      margin: 0 0 4px;
      padding: 0;
      border: none;
      background: transparent;
      border-radius: 0;
      box-shadow: none;
      transition: none;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        background: transparent;
      }
    }
  }

  .upload-add-btn {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 100%;
    gap: 4px;
    padding: 6px 16px;
    font-size: 13px;
    color: var(--el-color-primary);
    background: var(--upload-add-bg);
    border: none;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
    font-weight: 500;
    line-height: 1.4;

    .plus {
      font-size: 14px;
      font-weight: 600;
    }

    .format-hint {
      font-size: 11px;
      color: var(--el-text-color-placeholder);
      margin-left: 6px;
      font-weight: 400;
      white-space: normal;
      word-break: break-word;
    }

    &:hover {
      background: var(--el-color-primary);
      color: var(--el-color-white);
    }
  }

  .upload-disabled .upload-add-btn {
    cursor: not-allowed;
    opacity: 0.6;

    &:hover {
      background: var(--upload-add-bg);
      color: var(--el-color-primary);
    }
  }

  .upload-file-card {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 6px;
    background: var(--el-fill-color-blank);
    border: 1px solid var(--el-border-color-light);
    border-radius: 8px;
    transition: all 0.2s;
    cursor: pointer;
    max-width: 100%;

    &:hover {
      // 主色浅变体：运行时 color-mix 混白，外部动态切主色时实时跟随（light-N 变量为构建期固化，不跟随）
      border-color: color-mix(in srgb, var(--el-color-primary) 50%, white);
      background: color-mix(in srgb, var(--el-color-primary) 5%, white);
    }

    &.is-fail {
      border-color: var(--el-color-danger-light-5);
      background: var(--el-color-danger-light-9);
    }
  }

  .file-type-icon {
    width: 32px;
    height: 32px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.5px;

    &.pdf {
      background: #e8536e;
    }
    &.img {
      background: #8b7cf6;
    }
    &.word {
      background: #4b7cf7;
    }
    &.excel {
      background: #36b37e;
    }
    &.ppt {
      background: #ef8a3d;
    }
    &.txt {
      background: #909399;
    }
    &.zip {
      background: #9b8b7e;
    }
    &.file {
      background: #909399;
    }
  }

  // 图片类型：图标位直接显示缩略图（32×32，cover 填充）
  .file-thumb {
    width: 32px;
    height: 32px;
    border-radius: 7px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .file-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .file-name {
    font-size: 12px;
    color: var(--el-text-color-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.4;
  }

  .file-meta {
    font-size: 11px;
    color: var(--el-text-color-secondary);
    line-height: 1.3;
  }

  // 上传中：进度条占"大小"槽位。固定 14px 行高（≈ .file-meta 文本行高），
  // 让上传中与成功态的 file-info 总高度一致 → 文件名/进度条位置稳定，不随状态跳动错位
  .file-progress {
    width: 100%;
    height: 14px;
    display: flex;
    align-items: center;

    // 纯 div 进度条（弃用 el-progress：其自带 flex/固有尺寸在紧凑卡片内会溢出右框、覆盖文件名）
    .file-progress-track {
      width: 100%;
      height: 4px;
      background: var(--el-fill-color-light);
      border-radius: 2px;
      overflow: hidden;

      .file-progress-fill {
        display: block;
        height: 100%;
        background: #4b7cf7;
        border-radius: 2px;
        transition: width 0.3s ease;
      }
    }
  }

  // 失败：红色提示
  .file-error {
    color: var(--el-color-danger);
  }

  .file-delete {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--el-text-color-placeholder);
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
    font-size: 14px;
    line-height: 1;

    &:hover {
      background: var(--el-color-danger-light-9);
      color: var(--el-color-danger);
    }
  }
}
</style>
