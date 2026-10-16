<template>
  <div class="ele-form-upload-image" :class="{ 'ele-form-upload-file': !!desc.upType, 'ele-form-upload-card': cardMode }" :style="{ '--file-card-max-width': desc.cardMaxWidth || '200px' }" v-if="isInit">
    <el-upload ref="uploadRef" class="ele-image-upload" v-bind="attrs" v-on="onEvents" :disabled="disabled" :fileList="Array.isArray(currentValue) ? currentValue : []" :class="{ 'over-limit': currentValue?.length >= attrs.limit, 'upload-disabled': attrs.disabled }">
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
        <div class="upload-file-card" :class="{ 'is-fail': file.status === 'fail', 'is-waiting': file.status === 'ready' }" @click="onCardClick(file)">
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

    <!-- 非图片附件预览：抽屉内嵌 iframe -->
    <FilePreviewDrawer ref="previewDrawerRef" />

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
import { ref, computed, useAttrs, onBeforeMount, onBeforeUnmount, watch, inject, nextTick, type Ref } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import * as fileTypes from '../data/file'
import { normalizeSuffix } from './fileType'
import FilePreviewDrawer from './FilePreviewDrawer.vue'

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
// ponytail: passive 本地 ref，赋值恒留本地数组；父级 modelValue 为字符串时也不会透传给 el-upload。
// deep 必须开：归一化 watch 的 map 会产生 detached 副本，此后的 push/splice 原地改动需靠 deep watch 才能 emit 给父级
const currentValue = useVModel(props, 'modelValue', emits, { passive: true, deep: true, defaultValue: [] }) as Ref<Array<any>>

const attrs = ref({} as any)
// 使用方透传的 attrs/事件回调（组件只声明 update:modelValue/validateThis 两个 emit，@remove/@error 等落在 attrs）。
// 内部记账 handler 在 attrs 合并时恒胜（防槽位泄漏死锁），此处仅供各 handler 记账完成后补调使用方回调
const userAttrs = useAttrs()
const isInit = ref(false)
const onEvents = ref(getEvents(props))

// 提交action
const upAction = ref('')
const upActionInfo = ref({} as any)
const isImageType = computed(() => !props.desc.upType || props.desc.upType === 'image')
// card 模式：胶囊按钮 + 文件卡片式回显（默认新风格；desc.listType 传 'picture-card'/'text' 回退老风格）
const cardMode = computed(() => props.desc.listType !== 'picture-card' && props.desc.listType !== 'text')
// 真实上传数量上限：与 attrs.limit 同源（multiple ? limit || 20 : 1），胶囊按钮 v-show 名额判断用；
// 超量拦截由 el-upload 原生 limit/onExceed 负责（同值）
const realLimit = computed(() => (props.desc.multiple ? props.desc.limit || 20 : 1))
// 正在上传中(ready/uploading)的文件数，计入 limit 名额；失败(status=fail)不计入 → 失败即释放名额、恢复按钮
const activeCount = ref(0)
function onUploadChange(_file: any, fileList: any[]) {
  activeCount.value = fileList.filter((f: any) => f.status === 'uploading' || f.status === 'ready').length
}
// el-upload 实例引用，供卡片删除时同步其内部 uploadFiles
const uploadRef = ref()

// 压缩结果暂存：key 为 el-upload raw file 的 uid；handelUploadBefore 压缩后存入，
// handelRequest 上传前替换、handelUploadSuccess 记录压缩后大小并清理，handelUploadRemove 兜底清理
const compressedFiles = new Map<number, File>()

// ===== 上传并发队列 =====
// 批量选择时 el-upload 会同时发起全部上传，浏览器对同域仅 ~6 个并发连接、其余排队，
// 预签名链接在排队期间过期（慢网大文件批量上传到十几个后开始 403）。
// 故上传链接/token 的获取从 beforeUpload 开头推迟到排队轮到该文件之后：取完立即上传，不进浏览器排队。
// 槽位在文件上传结束（onSuccess/onError/onRemove）时释放而非发起时；并发放行的文件在
// handelUploadBefore 的同步写入块中写共享 upAction、紧接发起请求（相邻微任务，不可被插队），
// 顺带消除了原批量场景下并发 beforeUpload 竞写 upAction 的竞态。
const uploadQueue: Array<{ uid: number; resolve: (ok: boolean) => void }> = []
const activeSlots = new Set<number>()
// Math.max 钳制：显式配 0/负数（?? 不会过滤 0）会导致 pumpQueue 永不放行、全部上传无限排队
const uploadConcurrency = computed(() => Math.max(1, props.desc?.concurrency ?? defaultConf.upload?.concurrency ?? 6))
let uploadQueueClosed = false

function pumpQueue() {
  while (activeSlots.size < uploadConcurrency.value && uploadQueue.length > 0) {
    const next = uploadQueue.shift()!
    activeSlots.add(next.uid)
    next.resolve(true)
  }
}

/**
 * 排队等待上传槽位：轮到返回 true；被取消（用户删除排队文件/组件卸载）返回 false。
 * 内部永不 reject，取消走 beforeUpload return false 的 el-upload 标准移除链路
 */
function acquireSlot(uid: number): Promise<boolean> {
  if (uploadQueueClosed) return Promise.resolve(false)
  return new Promise((resolve) => {
    uploadQueue.push({ uid, resolve })
    pumpQueue()
  })
}

/**
 * 释放槽位（上传结束/失败/在途删除时调用），幂等
 */
function releaseSlot(uid: number) {
  if (activeSlots.delete(uid)) pumpQueue()
}

/**
 * 文件被删除/取消：排队中的直接摘除，已在途的释放槽位
 */
function cancelSlot(uid: number) {
  const idx = uploadQueue.findIndex((w) => w.uid === uid)
  if (idx >= 0) {
    const [waiter] = uploadQueue.splice(idx, 1)
    waiter.resolve(false)
    return
  }
  releaseSlot(uid)
}

onBeforeUnmount(() => {
  uploadQueueClosed = true
  while (uploadQueue.length > 0) {
    uploadQueue.shift()!.resolve(false)
  }
})

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
    onExceed: handleOutOfLimit,
    onPreview: handelPreview,
    ...userAttrs,
    // 内部记账 handler 必须排在 ...useAttrs() 之后恒胜：使用方写的 @remove/@error 会落进 attrs，
    // 若覆盖内部 handler 则槽位不释放（并发队列下 6 槽泄漏后全队列死锁）且 listChange 记账丢失；
    // 使用方回调在内部 handler 尾部补调（见各 handler 内的 userAttrs 调用），能力不丢；
    // onExceed/onPreview 同样内部恒胜 + 尾部补调；@before-upload 不透传（内部已含排队取槽，用户再否决需槽位回滚）
    beforeUpload: handelUploadBefore,
    onRemove: handelUploadRemove,
    onSuccess: handelUploadSuccess,
    onError: handelUploadError
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
  // el-upload 的 onChange 是 prop 回调(非 emit)，须挂到 attrs 上才能在文件状态变化时统计上传中数量；
  // 新老模式统一挂线：activeCount 是「在途挂起」守卫与胶囊按钮名额判断的共用数据源
  attrs.value.onChange = onUploadChange
  // card 模式：去掉拖拽；保留 el-upload 列表（用 #file 插槽自定义卡片），以复用其上传中进度/成功/失败状态
  if (cardMode.value) {
    attrs.value.drag = false
    attrs.value.listType = 'text'
    // limit 维持真实值：超量批次由 el-upload 原生 onExceed 整批拦截（element-plus handleError 会移除失败文件、不占名额，重传不受阻）；
    // 胶囊按钮 v-show（realLimit + activeCount）仅用于达限时提前隐藏入口
  }
  isInit.value = true
})

/**
 * 上传之前，校验文件大小以及类型
 * @param file
 */
async function handelUploadBefore(file: any) {
  file.suffix = `${(file.name as string).substring(file.name.lastIndexOf('.'))}`.split('?')[0]
  // 压缩钩子：在大小校验/占位/取预签名之前先压缩（否则超限图片没机会被压就被拦截）；
  // 压缩实现由 config.upload.compress 或 desc.compress 注入，库本身不引压缩依赖；
  // 压缩失败/未变小（实现方回传原文件）时静默按原文件走后续流程
  const compressFn = props.desc?.compress || defaultConf.upload?.compress
  let uploadFile: File = file
  if (compressFn) {
    try {
      const compressed = await compressFn(file)
      if (compressed && compressed !== file && compressed.size > 0) {
        ;(compressed as any).suffix = file.suffix
        compressedFiles.set(file.uid, compressed)
        uploadFile = compressed
      }
    } catch (e) {
      defaultConf.debug && console.log('压缩失败，使用原文件上传: ', e)
    }
  }
  const message = validateFile(uploadFile, (fileTypes as any)[`${props.desc.upType || 'image'}Suffixes`], attrs.value.maxSize)
  if (message !== true) {
    compressedFiles.delete(file.uid)
    ElMessage.warning(message)
    return false
  }
  try {
    // 这里先用本地地址进行占位（有压缩版用压缩版，预览一致且更省内存）
    file.url = URL.createObjectURL(uploadFile)
  } catch (e) {
    defaultConf.debug && console.log('生成本地预览地址出错: ', e)
  }
  // 排队：轮到该文件的前一刻才取上传链接/token（排队等待期文件处于 ready 态，卡片灰化等待）
  if (!(await acquireSlot(file.uid))) return false
  try {
    // 先取完所有异步数据，再在一个同步块内完成全部共享状态写入（upAction / attrs.data / attrs.headers）：
    // 写入与 el-upload doUpload 读取（beforeUpload resolve 后的相邻微任务）之间不能有 await 挂起点，
    // 否则并发放行的其他文件可能在此期间覆盖共享 upAction，导致本文件拿错上传链接
    let actionInfo = {} as IUpAction
    if (props.desc?.action) actionInfo = await getActionInfo(props.desc?.action, { fileName: file.name })
    if (!actionInfo.action) actionInfo = await getActionInfo(defaultConf.upload?.action, { fileName: file.name })
    // 空链接防御：getActionInfo 不抛错但返回空（如配置的 action 函数返回空值）时，
    // 继续走下去会拿空/旧 action 发请求——恰好绕过下方 catch 的「不能吞错继续」，故显式拦截
    if (!actionInfo.action) {
      defaultConf.debug && console.warn('获取上传链接为空，取消上传: ', file.name)
      return false
    }
    const needToken = !!(
      props.desc?.token ||
      defaultConf.upload?.token
    )
    const token = needToken ? await getToken(props.desc?.token || defaultConf.upload?.token, file) : ''

    // ↓↓↓ 同步写入块（与函数 return 相邻，微任务链不可被并发写插队）↓↓↓
    upAction.value = actionInfo.action
    // 链接随文件走：并发场景共享 upAction 仍可能被「后完成取链接的文件」在「本文件写入与本文件 doUpload 读取之间」
    // 的微任务插队覆盖（HTTP 完成顺序不定，纯拼网速），导致传错对象；handelRequest 优先取文件自己的 actionInfo
    file.actionInfo = actionInfo
    file.uploadId = actionInfo.uploadId || ''
    file.furl = actionInfo.furl
    // data/headers 同理随文件走：attrs.value.data/headers 仍是共享态，并发放行的其他文件可能在本文件
    // 写入与本文件 doUpload 读取之间的微任务间隙覆盖（token 路径带错 token；minio 路径 PUT body 变成别人的文件字节，
    // 静默数据错乱）；handelRequest 里同样优先取文件自己的这份。
    // 遗留缺口：无 uploadFn、走 el-upload 默认 ajax 的纯 token 路径不经 handelRequest，attrs.value.data 仍共享——
    // 仅「按文件发不同 token」的用法有风险（token 同值无影响），后续如需收敛再统一包 per-file httpRequest
    let dataVal: any
    let headersVal: any
    if (needToken) {
      dataVal = { token }
    }
    if (!props.desc?.uploadFn && defaultConf.upload?.type === 'minio') {
      dataVal = uploadFile
      headersVal = { 'Content-Type': uploadFile.type }
    }
    file.uploadData = { data: dataVal, headers: headersVal }
    if (dataVal !== undefined) attrs.value.data = dataVal
    if (headersVal !== undefined) attrs.value.headers = headersVal
  } catch (e) {
    defaultConf.debug && console.log('获取action出错: ', e)
    // 拒绝该文件走 el-upload 标准移除链路（onRemove → cancelSlot 释放槽位），
    // 不能吞错继续：拿旧 action/空 action 发请求可能打到错误地址甚至以假成功回调
    return false
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
async function handelUploadSuccess(response: any, file: any, fileList?: any[]) {
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
  // fsize 记录压缩后的真实体积（el-upload 的 file.size 是压缩前快照）
  const compressedSize = compressedFiles.get(file.raw?.uid ?? file.uid)?.size
  if (compressedSize) file.size = compressedSize
  compressedFiles.delete(file.raw?.uid ?? file.uid)
  releaseSlot(file.raw?.uid ?? file.uid)
  handelListChange(file, 1)
  // 补调使用方回调（内部 handler 恒胜后，使用方 @success 的能力由此保留）
  ;(userAttrs.onSuccess as any)?.(response, file, fileList)
}

/**
 * 上传失败：释放并发槽位（失败文件不占 limit 名额，见 activeCount 注释）
 * @param err
 * @param file
 */
function handelUploadError(_err: any, file: any, fileList?: any[]) {
  releaseSlot(file.raw?.uid ?? file.uid)
  // 补调使用方回调（同上）
  ;(userAttrs.onError as any)?.(_err, file, fileList)
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
function handelUploadRemove(file: any, fileList?: any[]) {
  // el-upload 的 handleRemove 不触发 onChange（无 emitChange），删除后须按回调自带的删除后列表重算，
  // 防删在途文件后 activeCount 卡死、挂起的归一化永不补放。
  // doRemove 恒传删除后列表（beforeUpload 拒绝路径经 upload-content→handleRemove→doRemove 亦然），
  // Array.isArray 仅作旧版/变体防御
  if (Array.isArray(fileList)) onUploadChange(file, fileList)
  compressedFiles.delete(file.raw?.uid ?? file.uid)
  cancelSlot(file.raw?.uid ?? file.uid)
  handelListChange(file, 0)
  // 补调使用方回调（内部 handler 恒胜后，使用方 @remove 的能力由此保留）
  ;(userAttrs.onRemove as any)?.(file, fileList)
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
      // 签名结果须随数据落库：归一化 watch 会用新数组替换 el-upload 内部 uploadFiles（无 raw），
      // 若此处丢失 previewUrl/shareUrl，归一化的 || item.furl 兜底会把预览地址回填成原始地址
      previewUrl: item.raw?.previewUrl || item.previewUrl || '',
      shareUrl: item.raw?.shareUrl || item.shareUrl || '',
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
  // passive+deep v-model 下父级值要等 deep watch flush 后才同步，同步 validate 会读到旧值误报「请上传」；推迟到下一 tick
  nextTick(() => emits('validateThis'))
}

// 非图片预览抽屉（desc.previewDrawer 控制：默认抽屉 iframe，false 回退新窗口，对象可调 size/title）
const previewDrawerRef = ref()

/**
 * 浏览图片 / 预览附件
 * 图片 → 图片查看器；非图片 → 抽屉内嵌 iframe 在线预览，取址/提示/回退逻辑收编在 FilePreviewDrawer.openPreview
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
    previewDrawerRef.value?.openPreview(file, props.desc.previewDrawer)
  }
  // 补调使用方回调（内部 handler 恒胜后，使用方 @preview 的能力由此保留）
  ;(userAttrs.onPreview as any)?.(file)
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
  let suffix = normalizeSuffix(file?.suffix || file?.raw?.suffix || '')
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
 * suffix 经 normalizeSuffix 归一化补点（同 getFileType），dotless 后缀不再误判。
 */
function isImageItem(item: any): boolean {
  const suffix = normalizeSuffix(item?.raw?.suffix || item?.suffix || '')
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
    nextTick(() => emits('validateThis'))
  }
}

/**
 * 超出上传数量
 */
function handleOutOfLimit() {
  ElMessage.error('数量最多只能上传' + attrs.value.limit + '个图片/文件!!!')
  // 补调使用方回调（内部 handler 恒胜后，使用方 @exceed 的能力由此保留）
  ;(userAttrs.onExceed as any)?.()
}

/**
 * 处理自定义上传
 * @param param
 */
function handelRequest(param: any) {
  // 链接随文件走：优先取本文件在 beforeUpload 里存的 actionInfo/uploadData（须在压缩替换之前取，压缩 File 上没有），
  // 共享 upAction/upActionInfo/attrs.data/attrs.headers 仅作旧数据兜底；并发文件互相覆盖共享值不再影响本文件
  const fileActionInfo = param.file?.actionInfo
  param.action = fileActionInfo?.action || upAction.value
  param.actionInfo = fileActionInfo || upActionInfo.value
  const fileUploadData = param.file?.uploadData
  if (fileUploadData?.data !== undefined) param.data = fileUploadData.data
  if (fileUploadData?.headers !== undefined) param.headers = fileUploadData.headers
  // 原始 raw 文件引用（压缩替换前），供应用层 uploadFn 过期重取链接后回写 uploadId/furl（success 从 file.raw 读）
  param.rawFile = param.file
  // 有压缩结果时替换实际上传的文件（预签名按文件名签，压缩版名称/类型不变，PUT 不受影响）
  const compressed = compressedFiles.get(param.file?.uid)
  if (compressed) param.file = compressed
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

// 归一化替换的「在途挂起」：替换会换 currentValue 引用 → :fileList 引用变化 → el-upload 内部 uploadFiles 整组替换，
// 丢掉在途文件的包装项 → 其成功回调 getFile 落空（上传成功却不进列表）且 activeCount 卡死。
// 父级若对 v-model 回写新引用（clone/computed 等），每次成功 push 都会触发该替换，故在途时挂起、归零后补放最终值；
// 在途期间外部对 modelValue 的变更（如表单重置）不生效，以在途上传结果为准
let pendingModelValue: string | Array<IOssInfo> | undefined | null = null

watch(
  () => props.modelValue,
  (data: string | Array<IOssInfo> | undefined, oldData: any) => {
    if (JSON.stringify(data) !== JSON.stringify(oldData)) {
      if (activeCount.value > 0) {
        pendingModelValue = data
        return
      }
      applyModelValue(data)
      pendingModelValue = null
    }
  },
  { immediate: true }
)

// 在途归零（最后一个 ready/uploading 文件结束）后补放挂起的归一化（放最终值即可，中间态无意义）
watch(activeCount, (count) => {
  if (count === 0 && pendingModelValue !== null) {
    applyModelValue(pendingModelValue)
    pendingModelValue = null
  }
})

/**
 * 归一化并整组替换 currentValue（原主 watch body）
 * @param data
 */
function applyModelValue(data: string | Array<IOssInfo> | undefined) {
  // 这里初始化一下
  if (typeof data === 'string') {
    if (data !== '') {
      currentValue.value = [{ url: data, furl: data, suffix: `${data.substring(data.lastIndexOf('.')).toLocaleLowerCase()}`.split('?')[0] }]
    } else {
      currentValue.value = []
    }
  } else {
    currentValue.value = Array.isArray(data)
      ? data.map((item: IOssInfo) => {
          if (isImageType.value) {
            item.url = getFileIcon(item) || getValue(defaultConf.upload?.signMap?.previewUrlKey || [], item)
            item.furl = item.furl || getFileIcon(item)
          }
          item.suffix = `${(item.suffix || item.url?.substring(item.url?.lastIndexOf('.') || 0) || '').toLocaleLowerCase()}`.split('?')[0]
          // 已有 previewUrl（新上传 push 项/业务回显项）优先于 furl 兜底，避免预览地址被原始地址覆盖
          item.previewUrl = getValue(defaultConf.upload?.signMap?.previewUrlKey || [], item) || item.previewUrl || item.furl || item.url
          return item
        })
      : []
  }
}

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

  // card 模式：触发器(胶囊按钮)与文件列表上下排版；触发器只占内容宽，卡片横向排列、排不下换行（限宽见 desc.cardMaxWidth）
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
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .el-upload-list__item {
      margin: 0;
      padding: 0;
      border: none;
      background: transparent;
      border-radius: 0;
      box-shadow: none;
      transition: none;
      flex: 0 1 auto;
      min-width: 0;
      // 限宽挂在 li（flex 子项）上，宽度经 CSS 变量透传（desc.cardMaxWidth），卡片 width:100% 填充
      max-width: var(--file-card-max-width, 200px);

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
    width: 100%;
    box-sizing: border-box;

    &:hover {
      // 主色浅变体：运行时 color-mix 混白，外部动态切主色时实时跟随（light-N 变量为构建期固化，不跟随）
      border-color: color-mix(in srgb, var(--el-color-primary) 50%, white);
      background: color-mix(in srgb, var(--el-color-primary) 5%, white);
    }

    &.is-fail {
      border-color: var(--el-color-danger-light-5);
      background: var(--el-color-danger-light-9);
    }

    // 未上传（ready：选完还没开始传，含 beforeUpload 异步耗时 / 手动上传等待期）整卡灰化，
    // 进入 uploading 摘类后随 transition 平滑恢复正常
    &.is-waiting {
      background: var(--el-fill-color-light);
      border-color: var(--el-border-color-lighter);

      .file-name {
        color: var(--el-text-color-placeholder);
      }

      // 缩略图 / 类型色块图标整体灰化
      .file-thumb,
      .file-type-icon {
        filter: grayscale(1);
        opacity: 0.65;
      }
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
