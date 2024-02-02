<template>
  <el-input v-if="isInit" style="display: flex" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentValue">
    <template v-for="(item, key, index) of slots" #[key] :key="index">
      <slot :name="key" />
    </template>
  </el-input>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormInput',
  inheritAttrs: false,
  typeName: 'input',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, watch, useAttrs, useSlots, onBeforeMount, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { ICRUDConfig } from '../../../../types'

const defaultConf = inject('defaultConf') as ICRUDConfig

const props = defineProps<{
  modelValue?: string | null
  field?: string
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue', 'validateThis'])
const slots = ref(Object.assign({}, useSlots(), props.desc.slots))
const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

const currentValue = ref()
emits('update:modelValue', currentValue)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { autocomplete: 'new-password', maxlength: defaultConf.form?.leng?.input || 0, clearable: true, ...useAttrs() })
  isInit.value = true
})

watch(
  () => props.modelValue,
  (data: string | null | undefined) => {
    // 这里要截取一下字符串长度
    if (data && data.length > attrs.value.maxlength) {
      data = data.substring(0, attrs.value.maxlength)
    }
    currentValue.value = data
  },
  { immediate: true }
)

watch(
  () => currentValue.value,
  () => {
    emits('validateThis')
  }
)
</script>
