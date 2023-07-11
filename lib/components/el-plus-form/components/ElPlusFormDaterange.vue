<template>
  <el-date-picker class="el-plusF-form-daterange-panel" v-bind="attrs" v-on="onEvents" v-model="currentValue">
    <!-- 非作用域插槽 -->
    <template v-for="(item, key, index) in slots" #[key]="data" :key="index">
      <slot :name="key" :data="data" />
    </template>
  </el-date-picker>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormDaterange',
  inheritAttrs: false,
  typeName: 'daterange',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, useSlots, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: Array<string> | Date
  field: string
  desc: { [key: string]: any }
  formData: { [key: string]: any }
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = ref(props.modelValue)
const slots = ref(Object.assign({}, useSlots(), props.desc.slots))
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

emits('update:modelValue', currentValue)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { type: 'daterange', format: 'YYYY-MM-DD', valueFormat: 'x', editable: false, ...useAttrs() })
})
</script>
<style lang="scss" scoped>
.el-plusF-form-daterange-panel {
  display: flex;
}
</style>
