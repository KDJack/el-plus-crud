<template>
  <div class="el-plus-form-switch">
    <el-switch v-if="isInit" v-bind="attrs" v-on="onEvents" :disabled="disabled" v-model="currentValue" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormSwitch',
  inheritAttrs: false,
  typeName: 'switch',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: number | null
  field: string
  loading?: boolean
  desc: { [key: string]: any }
  formData: { [key: string]: any }
  disabled?: boolean
}>()
const emits = defineEmits(['update:modelValue'])

const currentValue = ref(props.modelValue)
emits('update:modelValue', currentValue)

const isInit = ref(false)
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { activeValue: 1, inactiveValue: 0, clearable: true, ...useAttrs() })
  isInit.value = true
})
</script>
