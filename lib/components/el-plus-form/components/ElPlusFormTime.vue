<template>
  <el-time-picker v-if="isInit" class="ElPlusFormTime-panel" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentValue" />
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
  field?: string
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = ref(Array.isArray(props.modelValue) ? props.modelValue?.map((item) => new Date(item)) || [] : props.modelValue ? new Date(props.modelValue) : null)
emits('update:modelValue', currentValue)

const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { editable: false, ...useAttrs() })
  isInit.value = true
})
</script>
<style lang="scss" scoped>
.ElPlusFormTime-panel {
  display: flex;
}
</style>
