<template>
  <el-drawer v-model="visible" :size="currentSize" direction="rtl" :with-header="false" append-to-body destroy-on-close class="file-preview-drawer">
    <div class="file-preview-bar">
      <span class="file-preview-name" :title="currentName">{{ currentName }}</span>
      <el-button link type="primary" @click="openInWindow">新窗口打开</el-button>
      <el-icon class="file-preview-close" role="button" tabindex="0" aria-label="关闭预览" @click="visible = false" @keydown.enter="visible = false" @keydown.space.prevent="visible = false"><Close /></el-icon>
    </div>
    <!-- 预览加载遮罩（自绘，替代 el-loading 默认转圈）：扫描中的文档页。抽屉打开即现，
         iframe load 后固定延迟淡出（onIframeLoad）；z-index(1) 低于悬浮操作条(2)，加载中仍可关闭/新窗口打开 -->
    <div class="file-preview-body">
      <!-- v-if=visible：关抽屉即卸载 iframe 停掉预览会话，切换文件不残留旧加载 -->
      <iframe v-if="visible" :src="currentUrl" :title="currentTitle" class="file-preview-iframe" @load="onIframeLoad" />
      <Transition name="preview-loading-fade">
        <div v-if="loading" class="preview-loading" :class="{ 'is-slow': slowTip }" role="status" aria-live="polite">
          <div class="scan-sheet" aria-hidden="true">
            <span class="scan-line"></span>
            <span class="scan-line"></span>
            <span class="scan-line"></span>
            <span class="scan-line"></span>
            <i class="scan-bar"></i>
          </div>
          <p class="preview-loading-title">文件数据加载中...</p>
          <p v-if="currentName" class="preview-loading-name" :title="currentName">{{ currentName }}</p>
          <!-- 慢态升级：扫描光带变 warning 色 + 现场给出口，不用去右上角找 -->
          <Transition name="preview-slow-fade">
            <div v-if="slowTip" class="preview-loading-slow">
              <span>文件较大，生成需要一些时间</span>
              <el-button link type="primary" size="small" @click="openInWindow">新窗口打开</el-button>
            </div>
          </Transition>
        </div>
      </Transition>
    </div>
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
import { ref, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { Close } from '@element-plus/icons-vue'

const visible = ref(false)
const currentUrl = ref('')
const currentName = ref('')
const currentSize = ref('40%')
const currentTitle = ref('附件预览')

// 预览加载遮罩：抽屉打开即遮，iframe load 后固定延迟撤（覆盖预览服务首屏后的内部初始化）
const LOAD_DELAY = 2000
// 长时间未加载完成，文案升级引导走顶栏「新窗口打开」兜底
const SLOW_TIP_DELAY = 20000
const loading = ref(false)
const slowTip = ref(false)
let slowTimer: ReturnType<typeof setTimeout> | undefined
let delayTimer: ReturnType<typeof setTimeout> | undefined

function clearTimers() {
  clearTimeout(slowTimer)
  clearTimeout(delayTimer)
}

/**
 * iframe load：撤遮罩前清掉慢加载提示计时器（撤罩后提示无意义），再固定延迟撤罩
 */
function onIframeLoad() {
  clearTimeout(slowTimer)
  clearTimeout(delayTimer)
  delayTimer = setTimeout(() => {
    loading.value = false
  }, LOAD_DELAY)
}

onBeforeUnmount(clearTimers)

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
  // 重开第二个文件：清残留计时器、重置遮罩状态后再开（关闭时 load 未触发的挂起计时器在此兜住）
  clearTimers()
  loading.value = true
  slowTip.value = false
  slowTimer = setTimeout(() => {
    slowTip.value = true
  }, SLOW_TIP_DELAY)
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
  // 高于遮罩(1)：加载中操作条仍可点（新窗口打开/关闭）
  z-index: 2;
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

// 遮罩容器：铺满 drawer body
.file-preview-body {
  position: relative;
  width: 100%;
  height: 100%;
}

/* ===== 预览加载态：扫描中的文档页 ===== */
// 签名元素：扫描光带在折角文档页上往复，骨架行随之微显隐 ——「预览正在生成」的具象化。
// 色值全部派生自 --el-* 变量，跟随主题/暗色；慢态(is-slow)光带转 warning 色
.preview-loading {
  --scan-color: var(--el-color-primary);

  position: absolute;
  inset: 0;
  // 低于悬浮操作条(.file-preview-bar z-index:2)，加载中新窗口打开/关闭仍可点
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  // 顶部让位悬浮操作条
  padding: 48px 24px 24px;
  text-align: center;
  background: var(--el-mask-color, rgba(255, 255, 255, 0.9));

  &.is-slow {
    --scan-color: var(--el-color-warning);
  }
}

// 折角文档页：clip-path 切角 + drop-shadow（box-shadow 会被 clip-path 裁掉，filter 不会）
.scan-sheet {
  position: relative;
  width: 48px;
  height: 60px;
  margin-bottom: 8px;
  padding: 12px 10px 0;
  box-sizing: border-box;
  background: var(--el-bg-color);
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.1));

  // 折角翻页片：落在切角斜边内侧，成页感
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 12px;
    height: 12px;
    background: color-mix(in srgb, var(--el-color-primary) 8%, var(--el-fill-color-light));
    clip-path: polygon(0 0, 100% 100%, 0 100%);
  }
}

// 骨架文字行：长短错落（首行短深=标题），微闪错峰 —— 内容在渐进成形
.scan-line {
  display: block;
  height: 4px;
  margin-bottom: 7px;
  border-radius: 2px;
  background: var(--el-fill-color-darker);
  opacity: 0.55;
  animation: scan-line-pulse 2.2s ease-in-out infinite;

  &:nth-of-type(1) {
    width: 66%;
    background: var(--el-fill-color-dark);
  }

  &:nth-of-type(2) {
    width: 100%;
    animation-delay: 0.18s;
  }

  &:nth-of-type(3) {
    width: 88%;
    animation-delay: 0.36s;
  }

  &:nth-of-type(4) {
    width: 54%;
    animation-delay: 0.54s;
  }
}

// 扫描光带：主色横向渐隐光条，页内上下往复
// 扫描行程 50px 与页高耦合：60(高) - 4(top) - 2(光带高) - 4(底部留白)，调 .scan-sheet 高度须同步
.scan-bar {
  position: absolute;
  left: 0;
  right: 0;
  top: 4px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--scan-color), transparent);
  // 辉光半径给足：暗色底上光带才扫得出来（亮色底有 8px 就够）
  box-shadow: 0 0 12px color-mix(in srgb, var(--scan-color) 60%, transparent);
  animation: scan-bar-sweep 2.2s ease-in-out infinite alternate;
}

.preview-loading-title {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.preview-loading-name {
  margin: 0;
  max-width: min(320px, 70%);
  font-size: 12px;
  color: var(--el-text-color-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 慢态提示：淡入于末位（不推移上方内容），出口就在等待现场
.preview-loading-slow {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 6px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

// 遮罩淡入淡出
.preview-loading-fade-enter-active,
.preview-loading-fade-leave-active {
  transition: opacity 0.25s ease;
}

.preview-loading-fade-enter-from,
.preview-loading-fade-leave-to {
  opacity: 0;
}

// 慢态提示上浮淡入
.preview-slow-fade-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.preview-slow-fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

@keyframes scan-line-pulse {
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 1;
  }
}

@keyframes scan-bar-sweep {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(50px);
  }
}

// 减少动态偏好：停扫描/微闪，保留静态画面与全部信息
@media (prefers-reduced-motion: reduce) {
  .scan-bar,
  .scan-line {
    animation: none;
  }

  .scan-line {
    opacity: 0.8;
  }
}
</style>
