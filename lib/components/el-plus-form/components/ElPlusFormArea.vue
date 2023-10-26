<template>
  <el-cascader v-if="isInit" class="ElPlusFormArea-panel" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentValue" :options="areaList" />
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormArea',
  inheritAttrs: false,
  typeName: 'area',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { onMounted, ref, useAttrs, onBeforeMount, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const globalData = inject('globalData') as any

const props = defineProps<{
  modelValue?: Array<any> | null
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
const areaList = ref([] as any)
const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))
const currentValue = ref(props.modelValue)

emits('update:modelValue', currentValue)

/**
 * 远程加载数据
 * @param node
 * @param resolve
 */
// async function lazyLoad(node: any, resolve: any) {
//   resolve(
//     ((await queryAreaByPId(node && node.value ? node.value : '0')) as Array<any>).map((item) => {
//       item.leaf = true
//       return item
//     })
//   )
// }

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { props: { value: 'id', label: 'name', children: 'childs', checkStrictly: !!props.desc.checkStrictly }, clearable: true, filterable: true, ...useAttrs() })
  isInit.value = true
})

onMounted(async () => {
  areaList.value = (globalData.areaList || []) as any[]
})
</script>
<style lang="scss" scoped>
.ElPlusFormArea-panel {
  display: flex;
}
</style>
