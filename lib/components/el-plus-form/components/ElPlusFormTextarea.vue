<template>
  <el-input v-if="isInit" :class="desc.class" :style="desc.style" type="textarea" v-bind="attrs" :disabled="disabled" v-model="currentValue" v-on="onEvents"> </el-input>
  <div v-if="quickFillItems.length" class="el-plus-form-textarea-quickfill">
    <el-button v-for="(text, index) in quickFillItems" :key="index" type="info" size="small" plain @click="onQuickFill(text)">{{ text }}</el-button>
  </div>
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
import { ref, computed, useAttrs, watch, onBeforeMount, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { ICRUDConfig } from '../../../../types'
import { useVModel } from '@vueuse/core'
import { ElMessage } from 'element-plus'

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

const currentValue = useVModel(props, 'modelValue', emits)

// 快捷填充项：支持函数式 (formData, field) => array 动态返回，或静态数组（string/{l,v}/{label,value}）；未配置/空数组时不渲染
const quickFillItems = computed(() => {
  let list = props.desc?.quickFill
  // 函数式动态 quickFill：按表单数据返回候选词，与 required/vif 同范式
  if (typeof list === 'function') {
    list = list(props.formData || {}, props.field)
  }
  if (!Array.isArray(list) || !list.length) return []
  return list.map((it: any) => {
    if (it == null) return ''
    if (typeof it === 'string') return it
    // 兼容 {l,v}/{label,value}；取不到则回退到原始值，统一转字符串避免渲染空 tag
    return String(it.label ?? it.l ?? it.value ?? it.v ?? it)
  })
})

/**
 * 点击快捷填充项：把文本追加到末尾
 * 已有内容非空、且末尾不是逗号/句号（全角 ，。 半角 ,.）时，自动补一个分隔符（默认全角逗号）
 */
function onQuickFill(text: string) {
  if (props.disabled || !text) return
  const oldVal = (currentValue.value as string) || ''
  const max = attrs.value?.maxlength
  // 已达字数上限，无法继续追加
  if (max && oldVal.length >= max) {
    ElMessage.warning('已达字数上限')
    return
  }
  const sep = props.desc?.quickFillSeparator ?? '，'
  let val = oldVal
  if (val && !/[，,。.]$/.test(val)) val += sep
  val += text
  // 按 maxlength 截断；若 text 被完全截掉、末尾残留分隔符则一并去掉
  if (max && val.length > max) {
    val = val.substring(0, max)
    if (sep && val.endsWith(sep)) val = val.slice(0, -sep.length)
  }
  // 截断后 text 完全没插入（值未变化）时提示，避免静默无效
  if (val === oldVal) {
    ElMessage.warning('剩余空间不足，无法追加')
    return
  }
  currentValue.value = val
  emits('validateThis')
}

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
<style lang="scss">
.el-plus-form-textarea-quickfill {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  .el-button {
    margin-right: 10px;
    margin-bottom: 6px;
    cursor: pointer;
    // EP 相邻按钮自带 margin-left: 12px，与 margin-right 叠加会双倍间距
    + .el-button {
      margin-left: 0;
    }
  }
}
</style>
