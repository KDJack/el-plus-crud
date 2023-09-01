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
import { ref, useAttrs, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: Array<string> | Date | null
  field: string
  desc: { [key: string]: any }
  formData: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = ref(props.modelValue)
const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

emits('update:modelValue', currentValue)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { ...useAttrs() })
  isInit.value = true
})
</script>
<style lang="scss" scoped>
.ElPlusFormTime-panel {
  display: flex;
}
</style>
