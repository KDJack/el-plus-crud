<template>
  <el-transfer :class="desc.class" :data="transferData" :style="desc.style" class="ele-form-transfer" v-bind="attrs" :disabled="disabled" v-model="currentValue" v-on="onEvents">
    <!-- 非作用域插槽 -->
    <template v-for="(item, key, index) in slots" #[key]="data" :key="index">
      <slot :name="key" :data="data" />
    </template>
  </el-transfer>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormTransfer',
  inheritAttrs: false,
  typeName: 'transfer',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, computed, useAttrs, useSlots, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: Array<string | number> | string | number | null
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
// ponytail: el-transfer 内部对 modelValue 调用 .includes，null 会崩；归一化为数组，替代 useVModel 透传
const currentValue = computed({
  get: () => {
    const v = props.modelValue
    return v == null ? [] : Array.isArray(v) ? v : [v]
  },
  set: (val: Array<string | number>) => emits('update:modelValue', val)
})

// ponytail: 兼容 {key,label}/{value,label}/{l,v}/{value,text}，并防御 options 被清空为 null（el-transfer 内部 props.data.reduce 会崩）
const transferData = computed(() => {
  const raw = props.desc.options
  if (!Array.isArray(raw)) return []
  return raw.map((item: any) => ({
    ...item, // 保留原字段，el-transfer 按 desc.props.key/label 读自定义字段名（如 employeeId/employeeName）
    key: item.key ?? item.value ?? item.v,
    label: item.label ?? item.l ?? item.text ?? item.value ?? item.key,
    disabled: !!item.disabled
  }))
})

const slots = ref(Object.assign({}, useSlots(), props.desc.slots))
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { ...useAttrs() })
})
</script>
<style lang="scss" scoped>
.ele-form-transfer {
  line-height: 1;
}
</style>
