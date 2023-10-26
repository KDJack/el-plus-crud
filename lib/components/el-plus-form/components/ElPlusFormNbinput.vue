<template>
  <el-input v-if="isInit" :class="desc.class" :style="desc.style" :clearable="attrs.clearable ?? true" type="number" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentValue" onkeypress="return( /[-\d\.]/.test(String.fromCharCode(event.keyCode)))">
    <template v-for="(item, key, index) of slots" #[key] :key="index">
      <slot :name="key" />
    </template>
    <template v-if="desc.rtext" #append>{{ desc.rtext.text }}</template>
  </el-input>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormNbinput',
  inheritAttrs: false,
  typeName: 'nbinput',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, useSlots, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: string | number | '' | null
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  rowIndex?: number
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
  attrs.value = await getAttrs(props, { ...useAttrs() })
  isInit.value = true
})
</script>
<style lang="scss">
/*input输入框屏蔽浏览器出现上下箭头*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
