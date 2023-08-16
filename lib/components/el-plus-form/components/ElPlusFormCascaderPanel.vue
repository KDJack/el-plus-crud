<template>
  <el-cascader-panel v-if="isInit" class="ElPlusFormCascaderPanel-panel" v-bind="attrs" v-on="onEvents" :options="props.desc.options" :disabled="disabled" v-model="currentValue">
    <!-- 非作用域插槽 -->
    <template v-for="(item, key, index) in slots" #[key]="data" :key="index">
      <slot :name="key" :data="data" />
    </template>
  </el-cascader-panel>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormCascaderPanel',
  inheritAttrs: false,
  typeName: 'cascaderPanel',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, useSlots, onBeforeMount } from 'vue'
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

const slots = ref(Object.assign({}, useSlots(), props.desc.slots))
const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, {
    props: { value: 'value', label: 'label', children: 'children' },
    fetchSuggestions(s: any, cb: Function) {
      const res: any[] = []
      cb(res)
    },
    ...useAttrs()
  })
  isInit.value = true
})
</script>
<style lang="scss" scoped>
.ElPlusFormCascaderPanel-panel {
  display: flex;
}
</style>
