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
import { ref, useAttrs, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue?: Array<string | Date> | string | Date | null
  field?: string
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = useVModel(props, 'modelValue', emits)

const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { valueFormat: 'HH:mm:ss', editable: false, ...useAttrs() })
  isInit.value = true
})
</script>
<style lang="scss" scoped>
.ElPlusFormTime-panel {
  display: flex;
}
</style>
