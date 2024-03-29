<template>
  <el-select v-if="isInit" class="el-plus-form-select" :class="desc.class" :style="desc.style" :disabled="disabled" v-bind="attrs" v-model="currentValue" :loading="loading" v-on="onEvents">
    <template v-for="(option, i) in options" :key="i">
      <el-option v-if="option" v-bind="option">
        <div class="el-plus-form-select-options">
          <span>{{ option.label || option.l }}</span>
          <div v-if="desc.optionTip">{{ tip(option) }}</div>
        </div>
      </el-option>
    </template>
  </el-select>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormSelect',
  inheritAttrs: false,
  typeName: 'select',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, reactive, computed, onBeforeMount, useAttrs, watch, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { getAttrs } from '../mixins'
import { isEqual, isPromiseLike } from '../../../util'
import { ICRUDConfig } from '../../../../types'

const defaultConf = inject('defaultConf') as ICRUDConfig
const globalData = inject('globalData') as any

const props = withDefaults(
  defineProps<{
    modelValue?: number | string | Array<string>
    loading?: boolean
    desc: { [key: string]: any }
    formData?: { [key: string]: any }
    rowIndex?: number
    disabled?: boolean
  }>(),
  {
    desc: () => ({})
  }
)
const emits = defineEmits(['update:modelValue'])

const currentValue = ref(props.modelValue || (props.desc.multiple ? [] : ''))
emits('update:modelValue', currentValue)

const attrs = ref({} as any)
const options = reactive([] as any[])
const oldQuery = ref(null) as any
const tempAttr = { clearable: true, ...useAttrs() } as any
const isInit = ref(false)

if (props.desc.allowCreate) {
  tempAttr.filterable = true
}

// 如果是远程加载
if (props.desc.remote) {
  tempAttr.remote = true
  tempAttr.filterable = true
  tempAttr.remoteShowSuffix = true
  tempAttr.loadingText = '远程查询中...'
  tempAttr.remoteMethod = async (query: string) => {
    if (query !== undefined && query !== null && query !== '') {
      await queryOptionsFn(query)
    }
  }
}

/**
 * 这里单独处理下事件
 */
const onEvents = computed(() => {
  const tempOn = {} as any
  if (props.desc?.on) {
    Object.keys(props.desc.on).map((key: string) => {
      tempOn[key] = () => {
        props.desc.on[key](
          props.formData || {},
          options.find((item) => item.value === currentValue.value),
          props.rowIndex
        )
      }
    })
  }
  return tempOn
})

// 如果options为空，则默认执行一次查询
if (options.length <= 0 && props.desc.remote && (props.desc.initLoad ?? true)) {
  queryOptionsFn('')
}

// 这里处理下tip
const tip = computed(() => (optionItem: any) => {
  return props.desc.optionTip(optionItem)
})

/**
 * 真正远程查询的方法
 * @param query
 */
async function queryOptionsFn(query: string) {
  if (oldQuery.value !== query) {
    oldQuery.value = query
    options.splice(0, options.length, ...(await props.desc.remote(query)))
    if (query === '') {
      // 判断是否有默认选项
      if (props.desc.defaultItem) {
        // 这里需要判断下默认值是否已经出现在了options中，如果存在，则需要删除
        const index = options.findIndex((item) => item.value === props.desc.defaultItem.value)
        if (index >= 0) {
          options.splice(index, 1)
        }
        options.unshift(props.desc.defaultItem)
      }
    }
  }
}

onBeforeMount(async () => {
  tempAttr.remote = !!props.desc.remote
  attrs.value = await getAttrs(props, tempAttr)
  attrs.value.remote = !!props.desc.remote
  isInit.value = true
})

watch(
  () => props.desc.options,
  async (data) => {
    if (typeof data === 'string') {
      // 从全局数据中获取options
      options.splice(0, options.length, ...(globalData[data] || []))
    } else if (typeof data === 'function') {
      const result = data(props.formData || {})
      if (isPromiseLike<any>(result)) {
        options.splice(0, options.length, ...(await result))
      } else {
        options.splice(0, options.length, ...result)
      }
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

watch(
  () => currentValue.value,
  (val: any) => {
    if (attrs.value.allowCreate) {
      if (val && Array.isArray(val) && (val as Array<any>).some((item) => typeof item === 'string' && item.length > (defaultConf.form?.leng?.input || 20))) {
        ElMessage.warning('最大长度为： ' + (defaultConf.form?.leng?.input || 20))
        currentValue.value = (val as Array<string>).filter((item) => typeof item !== 'string' || item.length <= (defaultConf.form?.leng?.input || 20))
      }
    }
  }
)
</script>
<style lang="scss">
.el-plus-form-select-options {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    // text-align: right;
    color: #aaaaaa;
    max-width: 40%;
    font-size: 12px;
    word-break: break-all;
  }
}
.el-select-dropdown__item {
  height: auto;
  white-space: break-spaces;
}
</style>
../util/aaaaa
