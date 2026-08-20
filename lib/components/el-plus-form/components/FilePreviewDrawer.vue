<template>
  <el-drawer v-model="visible" :size="currentSize" direction="rtl" :with-header="false" append-to-body destroy-on-close class="file-preview-drawer">
    <div class="file-preview-bar">
      <span class="file-preview-name" :title="currentName">{{ currentName }}</span>
      <el-button link type="primary" @click="openInWindow">新窗口打开</el-button>
      <el-icon class="file-preview-close" role="button" tabindex="0" aria-label="关闭预览" @click="visible = false" @keydown.enter="visible = false" @keydown.space.prevent="visible = false"><Close /></el-icon>
    </div>
    <!-- v-if=visible：关抽屉即卸载 iframe 停掉预览会话，切换文件不残留旧加载 -->
    <iframe v-if="visible" :src="currentUrl" :title="currentTitle" class="file-preview-iframe" />
  </el-drawer>
</template>
<script lang="ts">
export default {
  name: 'FilePreviewDrawer',
  inheritAttrs: false,
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Close } from '@element-plus/icons-vue'

const visible = ref(false)
const currentUrl = ref('')
const currentName = ref('')
const currentSize = ref('40%')
const currentTitle = ref('附件预览')

/**
 * 打开非图片附件预览：默认抽屉内嵌 iframe 加载 previewUrl（kkFileView 等在线预览）。
 * 供 ElPlusFormFile / ElPlusFormUpload 的预览入口调用，收编取址、缺失提示与回退逻辑。
 * @param item 文件项（兼容 el-upload 包装对象，取址走 item.raw 兜底）
 * @param cfg desc.previewDrawer：false 回退 window.open 新窗口；对象可覆盖 size/title（无 header，title 仅作 iframe 无障碍标签）
 */
function openPreview(item: any, cfg?: boolean | { size?: string; title?: string }) {
  const url = item?.raw?.previewUrl || item?.previewUrl
  if (!url) {
    ElMessage.warning('暂无预览地址')
    return
  }
  if (cfg === false) {
    window.open(url, '_blank', 'noopener,noreferrer')
    return
  }
  currentSize.value = (cfg && typeof cfg === 'object' && cfg.size) || '40%'
  currentTitle.value = (cfg && typeof cfg === 'object' && cfg.title) || item?.name || '附件预览'
  currentUrl.value = url
  currentName.value = item?.name || ''
  visible.value = true
}

/**
 * 新窗口打开：预览服务设 X-Frame-Options 拒绝 iframe 嵌套时的手动兜底（浏览器层面无法可靠自动检测）
 */
function openInWindow() {
  window.open(currentUrl.value, '_blank', 'noopener,noreferrer')
}

defineExpose({ openPreview })
</script>
<style lang="scss" scoped>
// iframe 全幅铺满抽屉（去 body 内边距），操作条悬浮其上
:deep(.el-drawer__body) {
  position: relative;
  padding: 0;
  overflow: hidden;
}

.file-preview-bar {
  position: absolute;
  top: 10px;
  right: 12px;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: calc(100% - 24px);
  padding: 4px 10px;
  background: var(--el-bg-color-overlay);
  border-radius: 6px;
  box-shadow: var(--el-box-shadow-light);
}

.file-preview-name {
  max-width: 240px;
  font-size: 13px;
  color: var(--el-text-color-regular);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 无 header，关闭按钮收进信息条
.file-preview-close {
  flex-shrink: 0;
  cursor: pointer;
  font-size: 16px;
  color: var(--el-text-color-secondary);

  &:hover {
    color: var(--el-color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--el-color-primary);
    outline-offset: 2px;
    border-radius: 4px;
  }
}

.file-preview-iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
