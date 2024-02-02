<template>
  <el-input v-if="isInit" :class="desc.class" :style="desc.style" type="textarea" v-bind="attrs" :disabled="disabled" v-model="currentValue" v-on="onEvents" />
  <div class="el-plus-form-quick-input">
    <el-tag v-for="(option, index) in options" :key="index" type="info" @click="changeTip(option.label)">{{ option.label }}</el-tag>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormQuickinput',
  inheritAttrs: false,
  typeName: 'quickinput',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, watch, onBeforeMount, inject, reactive } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { isEqual } from '../../../util'
import { ICRUDConfig } from '../../../../types'

const globalData = inject('globalData') as any
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
const options = reactive([] as any[])
const currentValue = ref(props.modelValue)
emits('update:modelValue', currentValue)

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { maxlength: defaultConf.form?.leng?.textare, showWordLimit: true, rows: 3, ...useAttrs() })
  isInit.value = true
})

/**
 *
 * @param text
 * 选中
 */
function changeTip(text: any) {
  if (props.disabled) return false
  currentValue.value = text
  emits('validateThis')
}

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
  () => props.desc.options,
  async (data) => {
    if (typeof data === 'string') {
      //   // 从全局数据中获取options
      options.splice(0, options.length, ...(globalData[data] || []))
    } else if (typeof data === 'function') {
      options.splice(0, options.length, ...(await data(props.formData || {})))
    } else if (Array.isArray(data)) {
      if (data && options && !isEqual(data, options)) {
        options.splice(0, options.length, ...data)
      }
    } else {
      options.splice(0, options.length)
    }
  },
  { immediate: true }
)
</script>
<style lang="scss">
.el-plus-form-quick-input {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;
  .el-tag {
    margin-right: 10px;
  }
}
</style>
../util/aaaaa
