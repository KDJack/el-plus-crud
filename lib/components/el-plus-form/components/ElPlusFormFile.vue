<template>
  <div class="ele-form-file" :style="{ marginTop: props.modelValue && props.modelValue.length > 0 ? '10px' : '0' }">
    <template v-if="props.modelValue && props.modelValue.length > 0">
      <FileIcons :files="props.modelValue" showName preview />
    </template>
    <span v-else class="no-img-tip">暂无内容</span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormFile',
  inheritAttrs: false,
  typeName: 'file',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { IOssInfo } from '../../../../types'
import FileIcons from './components/file-icons/FileIcons.vue'

const props = defineProps<{
  modelValue?: Array<IOssInfo>
  field?: string
  loading?: boolean
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
}>()
</script>
<style lang="scss">
.ele-form-file {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  .form-file-list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .no-img-tip {
    width: 100%;
    color: #999999;
    padding-left: 20px;
  }
}
</style>
