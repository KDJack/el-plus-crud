<template>
  <el-checkbox-group v-if="isInit" class="ElPlusFormCheckboxButton-panel" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentValue">
    <el-checkbox-button v-for="option of desc.options" :key="option.value" :label="option.value" v-bind="option.attrs">
      {{ option.text }}
    </el-checkbox-button>
  </el-checkbox-group>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormCheckboxButton',
  inheritAttrs: false,
  typeName: 'checkboxButton',
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
.ElPlusFormCheckboxButton-panel {
  display: flex;
}
</style>
