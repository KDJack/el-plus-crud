<template>
  <el-tree-select v-if="isInit" :class="desc.class" :style="desc.style" v-bind="attrs" v-model="currentValue" :data="desc.options" :loading="loading" v-on="onEvents" :render-after-expand="false" />
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormTselect',
  inheritAttrs: false,
  typeName: 'tselect',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: any
  field: string
  loading?: boolean
  desc: { [key: string]: any }
  formData: { [key: string]: any }
}>()
const emits = defineEmits(['update:modelValue'])

const currentValue = ref(props.modelValue)
emits('update:modelValue', currentValue)

const isInit = ref(false)
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { filterable: true, clearable: true, props: { label: 'name', value: 'id', children: 'children' }, ...useAttrs() })
  isInit.value = true
})
</script>
