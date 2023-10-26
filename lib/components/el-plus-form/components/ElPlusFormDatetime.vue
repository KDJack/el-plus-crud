<template>
  <el-date-picker v-if="isInit" class="ElPlusFormDatetime-panel" v-bind="attrs" :disabled="disabled" v-on="onEvents" type="datetime" v-model="currentValue" />
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormDatetime',
  inheritAttrs: false,
  typeName: 'datetime',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: string | number | '' | null
  field?: string
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = ref(props.modelValue)
const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

emits('update:modelValue', currentValue)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { valueFormat: 'YYYY-MM-DD HH:mm:ss', ...useAttrs() })
  isInit.value = true
})
</script>
<style lang="scss" scoped>
.ElPlusFormDatetime-panel {
  display: flex;
}
</style>
