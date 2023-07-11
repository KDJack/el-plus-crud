<template>
  <el-radio-group class="ElPlusFormRadio-panel" v-bind="attrs" v-on="onEvents" v-model="currentValue">
    <el-radio v-for="option of attrs.options" :key="option.value" :label="option.value">
      {{ option.l || option.label }}
    </el-radio>
  </el-radio-group>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormRadio',
  inheritAttrs: false,
  typeName: 'radio',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: string | number | '' | null
  field: string
  desc: { [key: string]: any }
  formData: { [key: string]: any }
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = ref(props.modelValue)
emits('update:modelValue', currentValue)

const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { ...useAttrs() })
})
</script>
<style lang="scss" scoped>
.ElPlusFormRadio-panel {
  display: flex;
}
</style>
