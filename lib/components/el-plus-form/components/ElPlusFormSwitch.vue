<template>
  <div class="el-plus-form-switch">
    <el-switch v-if="isInit" v-bind="attrs" :disabled="disabled" v-on="onEvents" :loading="props.loading || localLoading" v-model="currentValue" :before-change="handelBeforeChange" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormSwitch',
  inheritAttrs: false,
  typeName: 'switch',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { ElMessageBox } from 'element-plus'
import { useVModel } from '@vueuse/core'

const emits = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue?: boolean | string | number | null
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const localLoading = ref(false)
const currentValue = useVModel(props, 'modelValue', emits)

const isInit = ref(false)
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

/**
 * 这里处理开关提示
 */
function handelBeforeChange() {
  let confirm = props.desc?.confirm
  if (typeof confirm === 'function') {
    confirm = confirm(currentValue.value, props.formData || {})
  }
  if (confirm) {
    localLoading.value = true
    return new Promise((resolve, reject) => {
      ElMessageBox({
        title: '提示',
        message: confirm || '',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => resolve(true))
        .catch(() => reject())
        .finally(() => {
          setTimeout(() => {
            localLoading.value = false
          }, 200)
        })
    })
  }
  return true
}

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { activeValue: 1, inactiveValue: 0, clearable: true, ...useAttrs() })
  isInit.value = true
})
</script>
