<template>
  <div class="ele-form-image">
    <template v-if="imagLIst && imagLIst.length > 0">
      <el-image v-for="(image, i) in imagLIst" :class="desc.class" :key="image" :preview-src-list="attrs.isShowPreview === false ? null : imagLIst" :initial-index="i" :src="format.imgUrl(image)" v-bind="attrs" :style="styles" v-on="onEvents" :fit="attrs.fit || 'cover'" />
    </template>
    <div v-else>
      <span class="no-img-tip">—</span>
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
import { ref, computed, useAttrs, onBeforeMount, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'

// 格式化
const format = inject('format') as any

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
  attrs.value = await getAttrs(props, { isShowPreview: true, previewTeleported: true, ...useAttrs() })
})

const imagLIst = computed(() => {
  if (!props.modelValue) {
    return []
  }
  if (Array.isArray(props.modelValue)) {
    if (typeof props.modelValue[0] === 'string') {
      return props.modelValue
    } else {
      return props.modelValue.map((item) => item.shareUrl || item.furl)
    }
  } else if (typeof props.modelValue === 'string') {
    return props.modelValue.split(',').map((url) => format.imgUrl(url))
  } else {
    // console.log('unknown image Type.....')
  }
  return []
})

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
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .el-image:first-child {
    margin-left: 0px;
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
