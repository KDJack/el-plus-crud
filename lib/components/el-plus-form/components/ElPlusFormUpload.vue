<template>
  <div class="ele-form-upload-image" :class="{ 'ele-form-upload-file': desc.upType === 'file' }">
    <el-upload class="ele-image-upload" v-bind="attrs" v-on="onEvents" :fileList="currentValue || []" :class="{ 'over-limit': currentValue?.length >= attrs.limit, 'upload-disabled': attrs.disabled }">
      <div class="upload-panel-icon">
        <SvgIcon :name="desc.icon || 'ele-Plus'" :style="{ fontSize: desc.fontSize || '14px', color: desc.color || '#C0C4CC' }" />
        <div class="el-upload__text2" v-if="desc.upType === 'file' && desc.text2">
          {{ desc.text2 }}
        </div>
        <div class="el-upload__text" v-if="desc.upType === 'file'">
          {{ desc.text || '拖拽/点击上传' }}
        </div>
      </div>
      <!-- <template #file="file">
				<UploadShowIcon :file="file"></UploadShowIcon>
			</template> -->
    </el-upload>

    <!-- 图片查看的站位标签 -->
    <el-image-viewer v-if="showPreview" @close="showPreview = false" teleported :initialIndex="previewIndex" :url-list="previewList" />
    <div v-if="!attrs.autoUpload" class="upload-hands-submit">
      <el-button style="margin-left: 10px" size="small" type="success" @click="submit"> 上传到服务器 </el-button>
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
import { ElMessage, UploadUserFile } from 'element-plus'

import * as fileTypes from '../data/file'

// 引入图标
import excel from '../images/icon/excel.png'
import pdf from '../images/icon/pdf.png'
import file from '../images/icon/file.png'
import txt from '../images/icon/txt.png'
import word from '../images/icon/word.png'
import zip from '../images/icon/zip.png'
import ppt from '../images/icon/ppt.png'

const defaultConf = inject('defaultConf') as ICRUDConfig

// 图标Map
const iconMap = { excel, pdf, file, txt, word, zip, ppt }

const props = defineProps<{
  modelValue?: Array<IOssInfo>
  field: string
  loading?: boolean
  desc: { [key: string]: any }
  formData: { [key: string]: any }
}>()

const emits = defineEmits(['update:modelValue', 'validateThis'])
const currentValue = ref((typeof props.modelValue === 'string' ? [{ url: props.modelValue }] : props.modelValue) || [])

emits('update:modelValue', currentValue)

const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

const showPreview = ref(false)
const previewIndex = ref(0)
const previewList = computed(() =>
  currentValue.value
    .map((item: any) => {
      if (['.png', '.jpg', '.gif', '.jpeg'].indexOf(item.raw?.suffix || item.suffix) >= 0) {
        return item.url
      }
    })
    .filter((url) => url)
)

onBeforeMount(async () => {
  // // 如果没有配置，则抛出一个警告
  // if (defaultConf.upload?.action)
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
    httpRequest: handelRequest,
    ...useAttrs()
  })
})

/**
 * 处理删除
 * @param file
 * @param fileList
 */
function handelUploadRemove(file: UploadUserFile) {
  handelListChange(file, 0)
}

/**
 * 上传成功回调
 * @param _
 * @param file
 * @param fileList
 */
async function handelUploadSuccess(_: any, file: any) {
  const { objectUrl, previewUrl } = await defaultConf.upload?.minio?.getObjectAuthUrl(file.raw.uploadId)
  file.raw.shareUrl = objectUrl
  file.raw.previewUrl = previewUrl
  file.url = getFileIcon(file.raw)
  // console.log('handelUploadSuccess: file: ', file)
  handelListChange(file, 1)
}

/**
 * 获取文件Icon
 * @param file
 */
function getFileIcon(file?: any): string {
  if (file) {
    const suffix = (file?.suffix || '') as string
    if (suffix) {
      if (['.png', '.jpg', '.gif', '.jpeg'].indexOf(suffix) >= 0) {
        // return (props.desc.upType === 'file' ? file.previewUrl : file.shareUrl) || file.furl || file.path
        return file.shareUrl || file.furl || file.path
      }
      for (let i = 0; i < fileTypes.suffixTypes.length; i++) {
        for (let j = 0; j < fileTypes.suffixTypes[i].suffixes.length; j++) {
          if (fileTypes.suffixTypes[i].suffixes[j] === suffix) {
            return iconMap[fileTypes.suffixTypes[i].type]
          }
        }
      }
    }
  }
  return iconMap.file
}

/**
 * 处理图片列表的修改
 * @param file
 * @param type 0 : 删除; 1: 新增
 */
function handelListChange(item: UploadUserFile, type: 0 | 1) {
  if (type === 1) {
    currentValue.value.push({
      name: item.name,
      furl: (item.raw as any)?.path || item.url,
      url: getFileIcon(item.raw),
      fsize: item.size,
      uid: item.uid,
      mimeType: item.raw?.type,
      suffix: (item.raw as any).suffix,
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
  // 获取文件上传的路径
  const uploadInfo = (await defaultConf.upload?.minio?.getUploadUrl(file.name)) as any
  file.action = uploadInfo.uploadUrl
  file.path = uploadInfo.objectUrl
  file.previewUrl = uploadInfo.previewUrl
  file.uploadId = uploadInfo.uploadId
}

/**
 * 浏览图片
 * @param file
 */
function handelPreview(file: any) {
  if (['.png', '.jpg', '.gif', '.jpeg'].indexOf(file.raw?.suffix || file.suffix) >= 0) {
    previewIndex.value = previewList.value.findIndex((item) => item === (file.raw?.shareUrl || file.raw?.path || file.furl))
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
 * 处理自定义请求
 * @param param
 */
async function handelRequest(param: any) {
  await defaultConf.upload?.minio?.doElUpload(param)
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
    if (types.every((type) => type !== file.suffix)) {
      return '上传文件类型错误，请重新选择~'
    }
  }
  return true
}

watch(
  () => props.modelValue,
  (data: Array<IOssInfo> | undefined, oldData: any) => {
    if (JSON.stringify(data) !== JSON.stringify(oldData)) {
      // 这里初始化一下
      currentValue.value =
        data?.map((item: IOssInfo) => {
          item.url = getFileIcon(item)
          return item
        }) || []
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
