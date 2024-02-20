<template>
  <div class="ele-form-image">
    <template v-if="imagList && imagList.length > 0">
      <template v-for="(image, i) in imagList" :key="image + i">
        <el-image :class="desc.class" :src="image" :preview-src-list="attrs.isShowPreview === false ? null : imagList" :initial-index="i" v-bind="attrs" :style="styles" v-on="onEvents" :fit="attrs.fit || 'cover'" />
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
import { ref, computed, useAttrs, onBeforeMount } from 'vue'
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
  attrs.value = await getAttrs(props, { isShowPreview: true, previewTeleported: true, ...useAttrs() })
})

const imagList = computed(() => {
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
    return props.modelValue.split(',')
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
