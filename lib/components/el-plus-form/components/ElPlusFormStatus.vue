<template>
  <div class="ElPlusFormStatus-panel">
    <i :style="Sstyle" />
    <div :class="desc.class" :style="desc.style">
      {{ statusFormat.l }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormStatus',
  inheritAttrs: false,
  typeName: 'status',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'

//状态
const statusIcon = ['#909399', '#e6a23c', '#67c23a', '#000000', '#f56c6c']

const props = defineProps<{
  modelValue?: string | number | '' | null
  field: string
  desc: { [key: string]: any }
  formData: { [key: string]: any }
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = ref(props.modelValue)
emits('update:modelValue', currentValue)

const statusFormat = ref({} as any)
const Sstyle = computed(() => {
  return {
    background: statusIcon[props.desc.attrs.find((item: any) => item.v == currentValue.value).c] || props.desc.attrs.find((item: any) => item.v == currentValue.value).c || '#909399'
  }
})

onMounted(() => {
  //找出对应状态字段和颜色
  statusFormat.value.l = props.desc.attrs.find((item: any) => item.v == currentValue.value).l
})
</script>
<style lang="scss" scoped>
.ElPlusFormStatus-panel {
  display: flex;
  line-height: 25px;
  align-items: center;
  i {
    display: inline-block;
    min-width: 10px;
    min-height: 10px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>
