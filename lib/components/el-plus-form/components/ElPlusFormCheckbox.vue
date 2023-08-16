<template>
  <el-checkbox-group v-if="isInit" class="ElPlusFormCheckbox-panel" v-bind="attrs" v-on="onEvents" v-model="currentValue" :disabled="disabled">
    <el-checkbox v-for="option of desc.options" :key="option.value" :label="option.value" v-bind="option.attrs">
      {{ option.text }}
    </el-checkbox>
  </el-checkbox-group>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormCheckbox',
  inheritAttrs: false,
  typeName: 'checkbox',
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
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = ref(props.modelValue)
emits('update:modelValue', currentValue)

const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { ...useAttrs() })
  isInit.value = true
})
</script>
<style lang="scss" scoped>
.ElPlusFormCheckbox-panel {
  display: flex;
}
</style>
