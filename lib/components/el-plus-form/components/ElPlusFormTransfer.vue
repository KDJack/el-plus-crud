<template>
  <el-transfer :class="desc.class" :data="desc.options" :style="desc.style" class="ele-form-transfer" v-bind="attrs" :disabled="disabled" v-model="currentValue" v-on="onEvents">
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
import { ref, watch, useAttrs, useSlots, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  modelValue?: Array<string | number> | string | number | null
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
// ponytail: 对齐 ElPlusFormCheckbox，修复用户选择无法回写父表单
const currentValue = useVModel(props, 'modelValue', emits)

watch(
  () => props.modelValue,
  (data: Array<string | number> | string | number | null | undefined) => {
    currentValue.value = data ? (Array.isArray(data) ? data : [data]) : []
  },
  { immediate: true }
)

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
