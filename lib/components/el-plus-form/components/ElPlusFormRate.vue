<template>
  <el-rate class="ElPlusFormRate-panel" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentValue" />
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormRate',
  inheritAttrs: false,
  typeName: 'rate',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, watch, useAttrs, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { useVModel } from '@vueuse/core'

const emits = defineEmits(['update:modelValue', 'validateThis'])
const props = defineProps<{
  modelValue?: number | null
  field?: string
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const currentValue = useVModel(props, 'modelValue', emits)

const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { ...useAttrs() })
})

watch(
  () => props.modelValue,
  (data: number | null | undefined) => {
    currentValue.value = data
  },
  { immediate: true }
)

watch(
  () => currentValue.value,
  () => {
    emits('validateThis')
  }
)
</script>
<style lang="scss" scoped>
.ElPlusFormRate-panel {
  display: flex;
}
</style>
