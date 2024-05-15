<template>
  <template v-if="vif">
    <template v-if="props.desc?.confirm">
      <el-popconfirm @confirm="onEvents.click" :title="props.desc?.confirm">
        <template #reference>
          <el-button :loading="localLoading" :size="props.desc?.size || 'default'" v-bind="attrs">
            <slot name="default">
              <template v-if="!!props.desc?.label">{{ btnShowText }}</template>
            </slot>
          </el-button>
        </template>
      </el-popconfirm>
    </template>
    <el-button v-else :loading="localLoading" :size="props.desc?.size || 'default'" v-bind="attrs" v-on="onEvents" :style="{ pointerEvents: desc?.isTag ? 'none' : 'all' }" :class="{ 'no-label': !props.desc?.label }">
      <slot name="default">
        <template v-if="!!props.desc?.label">{{ btnShowText }}</template>
      </slot>
    </el-button>
  </template>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormBtn',
  inheritAttrs: false,
  typeName: 'btn',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, computed, useAttrs, watch, inject } from 'vue'
import { IBtnBack, ICRUDConfig } from '../../../../types'

const lodash = inject('lodash') as any
const defaultConf = inject('defaultConf') as ICRUDConfig

const props = defineProps<{
  field?: string
  rowIndex?: number
  loading?: boolean
  desc?: { [key: string]: any }
  formData?: { [key: string]: any }
}>()

const localLoading = ref(props.loading ?? false)

const vif = computed(() => {
  // 这里最终处理一下auth权限问题
  if (props.desc?.auth) {
    if (!defaultConf.auth) {
      console.warn('使用auth属性，请在crud注册时传入auth校验方法~')
    } else {
      return defaultConf.auth(props.desc.auth)
    }
  }
  return true
})

const attrs = computed(() => {
  const attrs = Object.assign({}, useAttrs(), props.desc, props.desc?._attrs)
  if (attrs.btnType) {
    attrs.type = attrs.btnType
  }
  return attrs
})

const onEvents = computed(() => {
  const events = {} as any
  if (props.desc && props.desc.on) {
    for (const key in props.desc.on) {
      if (key === 'click' && props.desc.mask) {
        events[key] = function () {
          localLoading.value = true
          props.desc?.on[key]({
            row: props.formData || {},
            callBack: (time: number) => {
              setTimeout(() => (localLoading.value = false), time || 50)
            },
            field: props.field,
            rowIndex: props.rowIndex
          } as IBtnBack)
        }
      } else {
        events[key] = function () {
          props.desc?.on[key]({ row: lodash.cloneDeep(props.formData || {}), field: props.field, rowIndex: props.rowIndex } as IBtnBack)
        }
      }
    }
  }
  return events
})

const btnShowText = computed(() => {
  if (props.desc?.btnLabel) {
    if (typeof props.desc.btnLabel === 'function') {
      return props.desc.btnLabel(props.formData || {})
    }
    return props.desc.btnLabel
  }
  if (props.desc?.label) {
    if (typeof props.desc.label === 'function') {
      return props.desc.label(props.formData || {})
    }
    return props.desc.label
  }
  return ''
})

watch(
  () => props.loading,
  (val) => {
    localLoading.value = val
  }
)
</script>
<style lang="scss">
.el-button.no-label > span {
  margin-left: 0 !important;
}
</style>
