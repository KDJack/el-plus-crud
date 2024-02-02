<template>
  <el-input v-if="isInit" :class="desc.class" :style="desc.style" type="textarea" v-bind="attrs" :disabled="disabled" v-model="currentValue" v-on="onEvents"> </el-input>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormTextarea',
  inheritAttrs: false,
  typeName: 'textarea',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, watch, onBeforeMount, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { ICRUDConfig } from '../../../../types'

const defaultConf = inject('defaultConf') as ICRUDConfig

const props = defineProps<{
  modelValue?: string | null
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue', 'validateThis'])
const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

const currentValue = ref(props.modelValue)
emits('update:modelValue', currentValue)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { maxlength: defaultConf.form?.leng?.textare, showWordLimit: true, rows: 3, ...useAttrs() })
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
</script>
