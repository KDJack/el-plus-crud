<template>
  <el-color-picker class="ElPlusFormColor-panel" v-bind="attrs" v-on="onEvents" v-model="currentValue" :disabled="disabled" />
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormColor',
  inheritAttrs: false,
  typeName: 'color',
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
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))
// const { attrs, slots, onEvents } = useMixins({ modelValue: props.modelValue, field: props.field, desc: props.desc, formData: props.formData, useAttrs, useSlots })
emits('update:modelValue', currentValue)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { ...useAttrs() })
})
</script>
<style lang="scss" scoped>
.ElPlusFormColor-panel {
  display: flex;
}
</style>
