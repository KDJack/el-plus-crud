<template>
  <div class="ele-form-file">
    <template v-if="files.length">
      <div v-for="(item, i) in files" :key="item.uid ?? i" class="ele-form-file-card" role="button" tabindex="0" :aria-label="item.name ? '预览：' + item.name : '预览文件'" :style="{ maxWidth: desc.cardMaxWidth || '200px', minWidth: desc.cardMinWidth || desc.cardMaxWidth || '200px' }" @click="handleCardClick(item)" @keydown.enter="handleCardClick(item)" @keydown.space.prevent="handleCardClick(item)">
        <img v-if="isImageFile(item) && getImageUrl(item)" class="file-thumb" :src="getImageUrl(item)" />
        <div v-else class="file-type-icon" :class="typeClass(item)">{{ typeLabel(item) }}</div>
        <div class="file-info">
          <span class="file-name">{{ item.name }}</span>
          <span v-if="formatSize(item.fsize)" class="file-meta">{{ formatSize(item.fsize) }}</span>
        </div>
        <el-tooltip content="下载" placement="top">
          <span class="file-download-btn" role="button" tabindex="0" aria-label="下载文件" @click.stop="downloadFile(item)" @keydown.enter.stop.prevent="downloadFile(item)" @keydown.space.stop.prevent="downloadFile(item)">
            <el-icon><Download /></el-icon>
          </span>
        </el-tooltip>
      </div>
    </template>
    <span v-else class="no-img-tip">暂无内容</span>

    <!-- 图片预览 -->
    <el-image-viewer v-if="showPreview" @close="showPreview = false" teleported :initialIndex="previewIndex" :url-list="previewList" />
    <!-- 非图片附件预览：抽屉内嵌 iframe -->
    <FilePreviewDrawer ref="previewDrawerRef" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormFile',
  inheritAttrs: false,
  typeName: 'file',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Download } from '@element-plus/icons-vue'
import { IOssInfo } from '../../../../types'
import { typeClass, typeLabel, isImageFile, isImageItem, getImageUrl, formatSize, downloadFile } from './fileType'
import FilePreviewDrawer from './FilePreviewDrawer.vue'

const props = defineProps<{
  modelValue?: Array<IOssInfo>
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
}>()

// 兜底：modelValue 期望为 IOssInfo[]；非数组（误传 string/null 等）安全降级为空，避免按字符迭代渲染脏数据
const files = computed(() => (Array.isArray(props.modelValue) ? props.modelValue : []))

const showPreview = ref(false)
const previewIndex = ref(0)

// 图片预览列表（仅图片项的缩略图 url，取址同 fileType.getImageUrl）
const previewList = computed(() =>
  files.value
    .filter((item: any) => isImageItem(item))
    .map((item: any) => getImageUrl(item))
    .filter(Boolean)
)

// 非图片预览抽屉（desc.previewDrawer 控制：默认抽屉 iframe，false 回退新窗口，对象可调 size/title）
const previewDrawerRef = ref()

/**
 * 卡片点击：图片 → 图片查看器；非图片 → 抽屉内嵌 iframe 在线预览。
 * 与 ElPlusFormUpload.handelPreview 对齐：取址/提示/回退逻辑收编在 FilePreviewDrawer.openPreview。
 */
function handleCardClick(item: any) {
  if (isImageItem(item)) {
    previewIndex.value = Math.max(0, previewList.value.indexOf(getImageUrl(item)))
    showPreview.value = true
  } else {
    previewDrawerRef.value?.openPreview(item, props.desc.previewDrawer)
  }
}
</script>
<style lang="scss" scoped>
.ele-form-file {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  margin-top: 10px;

  .no-img-tip {
    width: 100%;
    color: var(--el-text-color-placeholder);
    padding-left: 20px;
  }
}

.ele-form-file-card {
  flex: 0 1 auto;
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 6px;
  background: var(--el-fill-color-blank);
  border: 1px solid var(--el-border-color-light);
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: color-mix(in srgb, var(--el-color-primary) 50%, white);
    background: color-mix(in srgb, var(--el-color-primary) 5%, white);
  }

  &:focus-visible {
    outline: 2px solid var(--el-color-primary);
    outline-offset: 2px;
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

  .file-download-btn {
    // 用 visibility 占位而非 display 切换，避免 hover 时按钮出现挤压文件名导致布局跳动
    visibility: hidden;
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: 4px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
      color: var(--el-color-primary);
      background: var(--el-fill-color-light);
    }
  }

  &:hover .file-download-btn,
  .file-download-btn:focus-visible {
    visibility: visible;
    opacity: 1;
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
}
</style>
