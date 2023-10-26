<template>
  <el-time-picker v-if="isInit" isRange class="el-plusF-form-timerange-panel" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentValue">
    <!-- 非作用域插槽 -->
    <template v-for="(item, key, index) in slots" #[key]="data" :key="index">
      <slot :name="key" :data="data" />
    </template>
  </el-time-picker>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormTimerange',
  inheritAttrs: false,
  typeName: 'timerange',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, useSlots, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: Array<string> | Date
  field?: string
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = ref(props.modelValue)
const slots = ref(Object.assign({}, useSlots(), props.desc.slots))
const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

emits('update:modelValue', currentValue)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { format: 'HH:mm:ss', editable: false, ...useAttrs() })
  isInit.value = true
})
</script>
<style lang="scss" scoped>
.el-plusF-form-timerange-panel {
  display: flex;
}
</style>
