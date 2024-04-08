<template>
  <el-input v-if="isInit" :class="desc.class" :show-password="true" v-bind="attrs" :disabled="disabled" v-on="onEvents" v-model="currentValue">
    <!-- 组件内部插槽 -->
    <template v-for="(item, key, index) in slots" #[key]="data" :key="index">
      <slot :name="key" :data="data" />
    </template>
  </el-input>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormPassword',
  inheritAttrs: false,
  typeName: 'password',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, useAttrs, useSlots, onBeforeMount, inject } from 'vue'
import { getAttrs, getEvents } from '../mixins'
import { ICRUDConfig } from '../../../../types'
import { useVModel } from '@vueuse/core'

const defaultConf = inject('defaultConf') as ICRUDConfig

const props = defineProps<{
  modelValue?: string | number | '' | null
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()
const emits = defineEmits(['update:modelValue'])
const currentValue = useVModel(props, 'modelValue', emits)

const slots = ref(Object.assign({}, useSlots(), props.desc.slots))
const attrs = ref({} as any)
const isInit = ref(false)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { autocomplete: 'new-password', maxlength: defaultConf.form?.leng?.input || 0, ...useAttrs() })
  isInit.value = true
})
</script>
