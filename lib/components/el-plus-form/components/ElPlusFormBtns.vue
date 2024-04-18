<template>
  <div class="el-plus-form-btn-group" :style="{ 'justify-content': getAlignItems }">
    <template v-for="(item, i) in localBtnList" :key="i + (item.label || item.title || '')">
      <template v-if="item.elType === 'upload'">
        <ElPlusFormUpbtn type="primary" :field="field" :desc="item || {}" :formData="formData" :plain="(item && item.plain) ?? desc.plain ?? true" :disabled="disabled || desc.disabled" :text="desc.text" :rowIndex="rowIndex" />
      </template>
      <template v-else>
        <ElPlusFormBtn type="primary" :field="field" :desc="item || {}" :formData="formData" :plain="(item && item.plain) ?? desc.plain ?? true" :disabled="disabled || desc.disabled" :text="desc.text" :rowIndex="rowIndex" />
      </template>
    </template>
    <template v-if="limitList && limitList.length > 0">
      <el-dropdown class="group-menu-btn" :size="desc.size || 'default'" :disabled="disabled || desc.disabled">
        <el-button type="primary" :size="desc.size || 'default'" :plain="desc.plain ?? true"> 更多<i class="ele-ArrowDown el-icon--right" /> </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="(item, i) in limitList" :key="i + (item.label || item.title)" v-on="handelEvelt(item)">
              {{ item.label || item.title }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormBtns',
  inheritAttrs: false,
  typeName: 'btns',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, computed, watch, onMounted, inject } from 'vue'
import ElPlusFormBtn from './ElPlusFormBtn.vue'
import ElPlusFormUpbtn from './ElPlusFormUpbtn.vue'
import { ElMessageBox } from 'element-plus'
import { IBtnBack, ICRUDConfig } from '../../../../types'

const defaultConf = inject('defaultConf') as ICRUDConfig

const props = defineProps<{
  field?: string
  rowIndex?: number
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const localBtnList = ref([] as any[])
const limitList = ref([] as any[])

const getAlignItems = computed(() => {
  switch (props.desc.align) {
    case 'right':
      return 'flex-end'
    case 'center':
      return 'center'
    case undefined:
    case 'left':
      return 'flex-start'
    default:
      return 'flex-start'
  }
})

const handelEvelt = computed(() => {
  return (item: any) => {
    const events = {} as any
    if (item && item.on) {
      for (const key in item.on) {
        if (key === 'click' && item.confirm) {
          events[key] = function () {
            ElMessageBox.confirm(item.confirm, '提示', {
              type: 'warning',
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              item.on[key]({ row: props.formData || {}, field: props.field, rowIndex: props.rowIndex } as IBtnBack)
            })
          }
        } else {
          events[key] = function () {
            item.on[key]({ row: props.formData || {}, field: props.field, rowIndex: props.rowIndex } as IBtnBack)
          }
        }
      }
    }
    return events
  }
})

// 初始化
const initBtnList = () => {
  const tempList = [] as any[]
  limitList.value = []
  if (props.desc.btns.length > 0) {
    props.desc.btns.map((item: any) => {
      if (handelItemVIf(item)) {
        tempList.push(item)
      }
    })
  }
  localBtnList.value = tempList
  const limit = props.desc.limit || 3
  if (localBtnList.value.length > limit) {
    limitList.value = localBtnList.value.splice(limit - 1)
  }
}
// 执行一次vif的处理
const handelItemVIf = (formItem: any): Boolean => {
  let _vif = true
  if (typeof formItem.vif === 'function') {
    _vif = Boolean(runFnGetData(formItem.vif))
  } else if (typeof formItem.vif === 'boolean') {
    _vif = formItem.vif
  }
  if (_vif) {
    // 这里最终处理一下auth权限问题
    if (formItem?.auth) {
      if (!defaultConf.auth) {
        console.warn('使用auth属性，请在crud注册时传入auth校验方法~')
      } else {
        _vif = defaultConf.auth(formItem.auth)
      }
    }
  }
  return _vif
}
// 执行函数,获取相关数据
const runFnGetData = (fn: Function) => {
  return fn(props.formData || {})
}

watch(
  () => props.desc,
  () => initBtnList()
)
watch(
  () => props.formData,
  () => initBtnList()
)

onMounted(() => {
  initBtnList()
})
</script>

<style lang="scss">
.el-plus-form-btn-group {
  display: flex;

  .group-menu-btn {
    margin-left: 10px;
  }
}
</style>
