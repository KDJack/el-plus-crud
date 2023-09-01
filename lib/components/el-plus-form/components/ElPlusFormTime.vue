<template>
  <el-time-picker v-if="isInit" class="ElPlusFormTime-panel" v-bind="attrs" v-on="onEvents" v-model="currentValue" :disabled="disabled" />
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormTime',
  inheritAttrs: false,
  typeName: 'time',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, watch, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: Array<string> | string | Date | null
  field: string
  desc: { [key: string]: any }
  formData: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = ref()
const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

emits('update:modelValue', currentValue)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { editable: false, ...useAttrs() })
  isInit.value = true
})

watch(
  () => props.modelValue,
  (val: Array<string> | string | Date | null | undefined) => {
    if (val) {
      currentValue.value = Array.isArray(val) ? val.map((item) => new Date(item)) : new Date(val)
    } else {
      currentValue.value = attrs.value.isRange ? [] : null
    }
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.ElPlusFormTime-panel {
  display: flex;
}
</style>
