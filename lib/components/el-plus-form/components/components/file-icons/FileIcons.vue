<template>
  <div class="file-icons-panel">
    <div :class="[isCard ? 'card-list' : 'file-list']" v-if="files && files.length">
      <div v-for="(item, i) in files" :key="i" class="file-item" @click="handelPreview(item)">
        <el-image :src="getIcon(item)" :style="style" fit="cover" />
        <div v-if="showName" class="file-name">{{ cutString(item.name, 50) }}</div>
      </div>
    </div>

    <!-- 图片查看的站位标签 -->
    <el-image-viewer v-if="showPreview" @close="showPreview = false" teleported :initialIndex="previewIndex" :url-list="previewList" />
  </div>
</template>
<script lang="ts" setup name="FileIcons">
import { ref, computed } from 'vue'
import fileIcon, { imgSuffix, iconMap } from './data'
import { cutString } from '../../../../../util'
import { IOssInfo } from '../../../../../../types'

const props = defineProps<{
  files: Array<IOssInfo>
  size?: number
  // 是否是卡片布局
  isCard?: boolean
  // 如果是图片，是否直接显示, 默认显示的图片icon
  showImg?: boolean
  // 是否能够预览
  preview?: boolean
  // 是否显示名称
  showName?: boolean
}>()

const showPreview = ref(false)
const previewIndex = ref(0)

// 预览列表
const previewList = computed(() =>
  props.files
    .map((item: any) => {
      if (imgSuffix.indexOf(item.suffix || '') >= 0) {
        return item.shareUrl
      }
    })
    .filter((url) => url)
)

/**
 * 图片的样式
 */
const style = computed(() => {
  return {
    width: (props.size || 16) + 'px',
    height: (props.size || 16) + 'px'
  }
})

/**
 * 获取Icon
 * @param item
 */
function getIcon(item: IOssInfo) {
  let icon = iconMap[item.suffix || ''] || fileIcon
  if (props.showImg) {
    if (imgSuffix.indexOf(item.suffix || '') >= 0) {
      return item.shareUrl
    }
  }
  return icon
}

// 处理点击事件
function handelPreview(file: IOssInfo) {
  if (props.preview) {
    // 如果是图片
    if (imgSuffix.indexOf(file.suffix || '') >= 0) {
      previewIndex.value = previewList.value.indexOf(file.shareUrl || file.furl)
      showPreview.value = true
    } else {
      window.open(file.previewUrl || file.shareUrl || file.furl, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
.file-icons-panel {
  width: 100%;

  .file-list {
    width: 100%;
    display: flex;
    flex-direction: column;

    .file-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      height: 28px;
      line-height: 28px;
      padding: 0 10px;
      background: #f5f7fa;
      margin-bottom: 10px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 400;
      color: #303133;

      &:hover {
        background: #e7e8eb;
        color: var(--el-color-primary);
      }

      .file-name {
        margin-left: 10px;
      }
    }
  }

  .card-list {
    width: 100%;
    display: flex;
    flex-direction: row;

    .file-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .file-name {
        margin-top: 10px;
      }
    }
  }
}
</style>
../../../util/aaaaa
