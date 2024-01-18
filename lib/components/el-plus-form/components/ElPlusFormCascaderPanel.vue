<template>
  <el-cascader-panel v-if="isInit" class="ElPlusFormCascaderPanel-panel" v-bind="attrs" :disabled="disabled" v-on="onEvents" :options="options" v-model="currentValue"> </el-cascader-panel>
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
import { ref, reactive, useAttrs, watch, onBeforeMount, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { isEqual } from '../../../util'

const globalData = inject('globalData') as any

const props = defineProps<{
  modelValue?: Array<string> | string | null
  field?: string
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = ref(Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue])
emits('update:modelValue', currentValue)

const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))
const options = reactive([] as any[])

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

//监听options数据
watch(
  () => props.desc.options,
  async (data) => {
    if (typeof data === 'string') {
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
<style lang="scss" scoped>
.ElPlusFormCascaderPanel-panel {
  display: flex;
}
</style>
../util/aaaaa
