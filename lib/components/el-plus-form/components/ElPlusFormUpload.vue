<template>
  <div class="ele-form-upload-image" :class="{ 'ele-form-upload-file': desc.upType === 'file' }" v-if="isInit">
    <el-upload class="ele-image-upload" v-bind="attrs" v-on="onEvents" :disabled="disabled" :fileList="currentValue || []" :class="{ 'over-limit': currentValue?.length >= attrs.limit, 'upload-disabled': attrs.disabled }">
      <div class="upload-panel-icon">
        <i v-if="desc.icon" :class="desc.icon" :style="{ fontSize: desc.fontSize || '14px', color: desc.color || '#C0C4CC' }"></i>
        <el-icon v-else :style="{ fontSize: desc.fontSize || '14px', color: desc.color || '#C0C4CC' }"><Plus /></el-icon>
        <div class="el-upload__text2" v-if="desc.upType === 'file' && desc.text2">
          {{ desc.text2 }}
        </div>
        <div class="el-upload__text" v-if="desc.upType === 'file'">
          {{ desc.text || '拖拽/点击上传' }}
        </div>
      </div>
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
import { ref, computed, useAttrs, onBeforeMount, watch, inject } from 'vue'
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
const currentValue = ref((typeof props.modelValue === 'string' ? [{ url: props.modelValue }] : props.modelValue) || [])

emits('update:modelValue', currentValue)

const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

// 提交action
const upAction = ref('')

const showPreview = ref(false)
const previewIndex = ref(0)
const previewList = computed(() => {
  const tempList = [] as string[]
  currentValue.value.map((item: any) => {
    if (fileTypes.imageSuffixes.indexOf(item.raw?.suffix || item.suffix) >= 0) {
      tempList.push(item.url)
    }
  })
  return tempList
})

onBeforeMount(async () => {
  if (!defaultConf.upload?.sign && !props.desc?.sign) {
    defaultConf.debug && console.warn('上传私有加密仓库必须在config或desc中配置sign方法进行图片/文件签名鉴权，否则图片将无法显示和预览！')
  }
  attrs.value = await getAttrs(props, {
    drag: true,
    listType: props.desc.upType === 'file' ? 'text' : 'picture-card',
    multiple: !!props.desc.multiple,
    limit: props.desc.multiple ? props.desc.limit || 20 : 1,
    autoUpload: props.desc.autoUpload ?? true,
    accept: props.desc.accept || fileTypes[`${props.desc.upType || 'image'}Types`].join(','),
    maxSize: props.desc.maxSize || (props.desc.upType === 'file' ? defaultConf.upload?.maxFSize : defaultConf.upload?.maxISize),
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
      attrs.value.method = 'PUT'
    }
    attrs.value.action = upAction
  }
  isInit.value = true
})

/**
 * 上传之前，校验文件大小以及类型
 * @param file
 */
async function handelUploadBefore(file: any) {
  file.suffix = (file.name as string).substring(file.name.lastIndexOf('.'))
  const message = validateFile(file, fileTypes[`${props.desc.upType || 'image'}Suffixes`], attrs.value.maxSize)
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
    const uploadInfo = isPromiseLike<any>(result) ? await result : result
    if (typeof uploadInfo === 'object') {
      tempInfo.action = getValue(props.desc?.actionMap?.actionKey || defaultConf.upload?.actionMap?.actionKey || [], uploadInfo)
      tempInfo.uploadId = getValue(props.desc?.actionMap?.uploadIdKey || defaultConf.upload?.actionMap?.uploadIdKey || [], uploadInfo)
      tempInfo.token = getValue(props.desc?.tokenKey || defaultConf.upload?.tokenKey || [], uploadInfo)
      tempInfo.furl = getValue(props.desc?.actionMap?.objectUrlKey || defaultConf.upload?.actionMap?.objectUrlKey || [], uploadInfo)
    } else {
      tempInfo.action = uploadInfo as string
    }
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
    const tempUrl = getValue(defaultConf.upload?.actionMap?.objectUrlKey || [], response.request)
    if (tempUrl) file.raw.furl = tempUrl
  }
  // 获取文件上传的token以及上传路径
  if (defaultConf.upload?.sign) {
    let signInfo = {} as any
    const result = defaultConf.upload?.sign(file.raw.uploadId)
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
  if (props.desc.upType !== 'file') {
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
  const fileUrl = file.shareUrl || file.furl || file.url
  const suffix = (file?.suffix || fileUrl.substring(fileUrl.lastIndexOf('.')) || '').toLocaleLowerCase()
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
  return iconMap.file
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
      url: props.desc.upType !== 'file' ? getFileIcon(item.raw) : item?.raw?.shareUrl || item.url,
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
  if (fileTypes.imageSuffixes.indexOf((file.raw?.suffix || file.suffix || '').toLocaleLowerCase()) >= 0) {
    previewIndex.value = previewList.value.findIndex((item) => item === (file.raw?.shareUrl || file.furl))
    if (previewIndex.value < 0) {
      previewIndex.value = 0
    }
    showPreview.value = true
  } else {
    window.open(file.raw?.previewUrl || file.previewUrl, '_blank')
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
          currentValue.value = [{ url: data, furl: data, suffix: data.substring(data.lastIndexOf('.')).toLocaleLowerCase() }]
        } else {
          currentValue.value = []
        }
      } else {
        currentValue.value =
          data?.map((item: IOssInfo) => {
            if (props.desc.upType !== 'file') {
              item.url = getFileIcon(item)
              item.furl = getFileIcon(item)
            }
            item.suffix = (item.suffix || item.url?.substring(item.url?.lastIndexOf('.') || 0) || '').toLocaleLowerCase()
            item.previewUrl = item.furl || item.url
            return item
          }) || []
      }
    }
  },
  { immediate: true }
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
      color: #999999;
    }

    .el-upload__text2 {
      font-size: 16px;
      color: #303133;
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
    margin: 0 !important;
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
</style>
../util/aaaaa
