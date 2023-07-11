<template>
  <div class="ElPlusFormStatus-panel">
    <i v-if="currentValue === 0" class="status-danger" />
    <i v-else-if="currentValue === 1" class="status-success" />
    <i v-else-if="currentValue === 2" class="status-warning" />
    <i v-else-if="currentValue === 3" class="status-info" />
    <div :class="desc.class" :style="desc.style" v-bind="attrs" v-on="onEvents">
      {{ attrs.formatedValue || currentValue }}
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
import { ref, useAttrs, onBeforeMount } from 'vue'
import { getAttrs, getEvents } from '../mixins'

const props = defineProps<{
  modelValue?: string | number | '' | null
  field: string
  desc: { [key: string]: any }
  formData: { [key: string]: any }
}>()

const emits = defineEmits(['update:modelValue'])
const currentValue = ref(props.modelValue)
emits('update:modelValue', currentValue)

const attrs = ref({} as any)
const onEvents = ref(getEvents(props))

onBeforeMount(async () => {
  attrs.value = await getAttrs(props, { ...useAttrs() })
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
  .status-danger {
    background: #f56c6c;
  }
  .status-success {
    background: #67c23a;
  }
  .status-warning {
    background: #e6a23c;
  }
  .status-info {
    background: #909399;
  }
}
</style>
