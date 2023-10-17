<template>
  <el-date-picker v-if="isInit" class="ElPlusFormDate-panel" v-bind="attrs" v-on="onEvents" v-model="currentValue" />
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormDate',
  inheritAttrs: false,
  typeName: 'date',
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
}>()

const emits = defineEmits(['update:modelValue'])
const isInit = ref(false)
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))
const currentValue = ref(props.modelValue)
emits('update:modelValue', currentValue)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { valueFormat: 'YYYY-MM-DD HH:mm:ss', editable: false, ...useAttrs() })
  isInit.value = true
})
</script>
<style lang="scss" scoped>
.ElPlusFormDate-panel {
  display: flex;
}
</style>
