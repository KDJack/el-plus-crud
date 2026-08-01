<template>
  <div class="ele-form-image">
    <template v-if="imageItems && imageItems.length > 0">
      <template v-for="(img, i) in imageItems" :key="i">
        <el-image v-if="!attrs.showOne || (attrs.showOne && i === 0)" :class="desc.class" :src="img.list[img.idx]" :preview-src-list="attrs.isShowPreview === false ? null : imageItems.map((im) => im.list[im.idx])" :initial-index="i" v-bind="attrs" :style="styles" v-on="onEvents" :fit="attrs.fit || 'cover'" referrerpolicy="no-referrer" @error="onErrImg(img)" />
      </template>
    </template>
    <div v-else>
      <span class="no-img-tip">-</span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormImage',
  inheritAttrs: false,
  typeName: 'image',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, computed, reactive, watch, useAttrs, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: Array<any> | string | null
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
}>()

const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { isShowPreview: true, previewTeleported: true, showOne: false, ...useAttrs() })
})

// ponytail: 候选 URL 逐个回退。附件 signUrl 可能 404/过期/被删，
// 按 signUrl→shareUrl→previewUrl→furl 逐个尝试（与 ElPlusFormUpload 回显补全同序），
// @error 时 idx 自增触发 :src 切换，避免展示组件直接"加载失败"。
const imageItems = ref<Array<{ list: string[]; idx: number }>>([])
watch(
  () => props.modelValue,
  (val) => {
    let groups: string[][] = []
    if (Array.isArray(val)) {
      if (val.length > 0) {
        if (typeof val[0] === 'string') {
          groups = (val as unknown as string[]).map((s) => [s])
        } else {
          groups = val.map((item: any) => [item.signUrl, item.shareUrl, item.previewUrl, item.furl].filter((u: any) => !!u))
        }
      }
    } else if (typeof val === 'string') {
      groups = val.split(',').map((s) => [s])
    }
    imageItems.value = groups.map((list) => reactive({ list, idx: 0 }))
  },
  { immediate: true, deep: true }
)

const onErrImg = (img: { list: string[]; idx: number }) => {
  if (img.idx < img.list.length - 1) {
    img.idx++
  }
}

/**
 * 格式化样式
 * large，default，small
 */
const styles = computed(() => {
  let width = ''
  let height = ''
  let size = props.desc.size || 'default'
  switch (size) {
    case 'large':
      width = '44px'
      height = '44px'
      break
    case 'default':
      width = '36px'
      height = '36px'
      break
    case 'small':
      width = '28px'
      height = '28px'
      break
    default:
      width = parseInt(size) + 'px'
      height = parseInt(size) + 'px'
      break
  }
  return Object.assign({}, props.desc.style, { width, height, 'max-width': width })
})
</script>
<style lang="scss">
.ele-form-image {
  display: flex;
  // justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 10px;

  .no-img-tip {
    color: #999999;
  }

  .el-image {
    margin: 5px !important;
  }
  .el-image:first-child {
    margin-left: 0px !important;
  }
}

.ele-form-image .el-image {
  border-radius: 5px;
  margin-bottom: 10px;

  .el-image__error {
    font-size: 12px;
    line-height: 13px;
  }
}
</style>
