<template>
  <el-autocomplete class="ElPlusFormAutocomplete-panel" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentValue">
    <!-- 作用域插槽 -->
    <template #default="data">
      <slot :data="data" />
    </template>

    <!-- 非作用域插槽 -->
    <template v-for="(item, key, index) in slots" #[key]="data" :key="index">
      <slot :name="key" :data="data" />
    </template>
  </el-autocomplete>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormAutocomplete',
  inheritAttrs: false,
  typeName: 'autocomplete',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, useSlots, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: string | number | '' | null
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = ref(props.modelValue)
emits('update:modelValue', currentValue)

const slots = ref(Object.assign({}, useSlots(), props.desc.slots))
const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { autocomplete: 'new-password', ...useAttrs() })
})
</script>
<style lang="scss" scoped>
.ElPlusFormAutocomplete-panel {
  display: flex;
}
</style>
