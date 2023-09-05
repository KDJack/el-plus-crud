<template>
  <template v-if="vif">
    <template v-if="props.desc.confirm">
      <el-popconfirm @confirm="onEvents.click" :title="props.desc.confirm">
        <template #reference>
          <el-button :loading="localLoading" :size="props.desc.size || 'small'" v-bind="attrs" :disabled="disabled">
            <template #default v-if="!!desc.label">
              {{ btnShowText }}
            </template>
          </el-button>
        </template>
      </el-popconfirm>
    </template>
    <el-button v-else :loading="localLoading" :size="props.desc.size || 'small'" v-bind="attrs" v-on="onEvents" :disabled="disabled" :style="{ pointerEvents: desc.isTag ? 'none' : 'all' }">
      <template #default v-if="!!props.desc.label">
        {{ btnShowText }}
      </template>
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
import { cloneDeep } from 'lodash'
import { IBtnBack, ICRUDConfig } from 'types'

const defaultConf = inject('defaultConf') as ICRUDConfig

const props = defineProps<{
  field?: string
  rowIndex?: number
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const localLoading = ref(props.loading ?? false)

const vif = computed(() => {
  // 这里最终处理一下auth权限问题
  if (props.desc.auth) {
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
  if (!attrs.plain) {
    delete attrs.plain
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
          props.desc.on[key]({
            row: props.formData,
            callBack: () => {
              setTimeout(() => (localLoading.value = false), 500)
            },
            field: props.field,
            rowIndex: props.rowIndex
          } as IBtnBack)
        }
      } else {
        events[key] = function () {
          props.desc.on[key]({ row: cloneDeep(props.formData || {}), field: props.field, rowIndex: props.rowIndex } as IBtnBack)
        }
      }
    }
  }
  return events
})

const btnShowText = computed(() => {
  if (props.desc.btnLabel) {
    if (typeof props.desc.btnLabel === 'function') {
      return props.desc.btnLabel(props.formData)
    }
    return props.desc.btnLabel
  }
  if (props.desc.label) {
    if (typeof props.desc.label === 'function') {
      return props.desc.label(props.formData)
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
<style lang="scss" scoped></style>
types
