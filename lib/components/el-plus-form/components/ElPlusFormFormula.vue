<template>
  <div class="el-plus-form-formula">
    <div class="formula-text-panel">
      <el-button class="formula-btn" @click="handelOpenPanel" type="warning" plain text>{{ modelValue?.value || '点击进行编辑' }}</el-button>
    </div>

    <!-- 弹框 -->
    <el-dialog class="el-plus-form-formula-dialog" :width="desc.dialogWidth || '800px'" :title="desc.title || desc.placeholder || '请编辑' + desc.label" draggable :closeOnClickModal="false" showCancel v-model="isShowDialog" append-to-body destroy-on-close>
      <div class="show-panel">
        <h2>{{ currentValue }}</h2>
      </div>
      <div class="title-tip">{{ desc.tip || '请在下面输入框中输入您的公式，输入@符号，可以调出引用项' }}</div>
      <div ref="formulaRef" class="formula-input" :contenteditable="disabled ? 'false' : 'plaintext-only'" v-bind="attrs" style="ime-mode: disabled" @keydown.stop="onKeydown" @keyup.stop="onKeyup"></div>
      <!-- 联想提示词 -->
      <div class="formula-input-selection" v-if="showSelection" ref="selection" @click.stop>
        <el-input v-model="filter" ref="inputRef" placeholder="输入关键字筛选"></el-input>
        <div class="options" v-if="displayOptions?.length">
          <span class="option" v-for="(item, i) in displayOptions" :key="i" @click="handelOptionClick(item)">
            {{ item.label }}
          </span>
        </div>
        <div class="empty" v-else>暂无数据</div>
      </div>
      <template #footer>
        <div>
          <el-button type="primary" @click="handelConfirm">确定</el-button>
          <el-button @click="isShowDialog = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ElPlusFormFormula',
  inheritAttrs: false,
  typeName: 'formula',
  customOptions: {}
}
</script>
<script lang="ts" setup>
import { ref, watch, useAttrs, onBeforeMount, inject, computed, reactive, onUnmounted, nextTick } from 'vue'
import { getAttrs } from '../mixins'
import { isEqual, isPromiseLike } from '../../../util'

const globalData = inject('globalData') as any

const props = defineProps<{
  modelValue?: { value: string; domStr: string } | null
  field?: string
  desc: { [key: string]: any }
  formData?: { [key: string]: any }
  disabled?: boolean
}>()

const emits = defineEmits(['update:modelValue', 'validateThis'])
const options = reactive([] as any[])
const attrs = ref({} as any)
const isInit = ref(false)
const isShowDialog = ref(false)
const showSelection = ref(false)
const filter = ref('')
const formulaRef = ref()
const inputRef = ref()
const currentValue = ref('=')
const oldStr = ref('')

const displayOptions = computed(() => {
  if (filter.value) {
    return options.filter(({ label }) => label.includes(filter.value))
  }
  return options
})

/**
 * 打开面板
 */
function handelOpenPanel() {
  isShowDialog.value = true
  nextTick(() => {
    currentValue.value = props.modelValue?.value || '='
    if (formulaRef.value) {
      formulaRef.value.innerHTML = props.modelValue?.domStr || '='
      oldStr.value = formulaRef.value?.innerHTML
    }
  })
}

/**
 * 处理选项点击
 * @param item
 */
function handelOptionClick(item: any) {
  showSelection.value = false
  const res = `<div contenteditable="true">${item.label}<span>${item.value}</span></div>`
  refreshHtml('@', res)
  refreshValue()
}

/**
 * 重新渲染Html
 * @param from
 * @param to
 */
function refreshHtml(from: any, to = '') {
  let text = formulaRef.value?.innerHTML || ''
  if (text && text.includes(from)) {
    text = text.replace(new RegExp(from, 'g'), to)
    formulaRef.value.innerHTML = text + '&nbsp;'
  }
}

/**
 * 监听按键按下
 * @param e
 */
function onKeydown(e: any) {
  const { key } = e
  switch (key) {
    // 禁止回车
    case 'Enter':
      e.preventDefault()
      break
    case '@':
      // case 'Process': // 中文输入法的 @
      openSelection()
      break
    default:
      break
  }
}

/**
 * 监听键盘抬起
 */
function onKeyup(e: any) {
  // 先找一下光标位置
  const oldList = oldStr.value.split(/<div\b[^>]*>(.*?)<\/div>/g) || []
  let nowList = formulaRef.value?.innerHTML?.split(/<div\b[^>]*>(.*?)<\/div>/g) || []
  let diffIndex = -1
  // 这里只判断项数一样的情况
  if (oldList.length === nowList.length) {
    for (let i = 0; i < oldList.length; i++) {
      // 第i项不一样-判断并处理一下
      if (oldList[i] !== nowList[i]) {
        diffIndex = i
        break
      }
    }
  }
  // 如果第i项是标签
  if (diffIndex >= 0 && oldList[diffIndex].indexOf('</span>') > 0) {
    // 这里单独处理下退格键
    if (e.key === 'Backspace') {
      nowList.splice(diffIndex, 1)
    } else {
      nowList[diffIndex] = oldList[diffIndex]
    }
    // 这里恢复一下list的div标签
    nowList = nowList.map((str: string) => {
      if (str.indexOf('</span>') > 0) return `<div contenteditable="true">${str}</div>`
      return str
    })
    formulaRef.value.innerHTML = nowList.join('')
    if (e.key === 'Backspace') {
      setFocus(formulaRef.value, diffIndex - 1)
    }
  }
  refreshValue()
}

/**
 * 设置光标高亮
 * @param el
 * @param index
 */
function setFocus(el: any, index: number) {
  const range = document.createRange()
  const sel = window.getSelection()
  range.selectNodeContents(el)
  range.collapse(false)
  el.childNodes[index] && range.setStart(el.childNodes[index], 0)
  range.collapse(true)
  sel?.removeAllRanges()
  sel?.addRange(range)
}

/**
 * 添加监听
 */
function addEventListener() {
  // 添加全局click监听
  window.addEventListener('click', removeSelection)
}

/**
 * 移出监听
 */
function removeEventListener() {
  // 解绑全局click监听关闭选项弹框
  window.removeEventListener('click', removeSelection)
}

/**
 * 确定
 */
function handelConfirm() {
  emits('update:modelValue', { value: currentValue.value, domStr: formulaRef.value?.innerHTML || '' })
  isShowDialog.value = false
  nextTick(() => {
    emits('validateThis')
  })
}

/**
 * 刷新值
 * @param str
 */
function refreshValue() {
  oldStr.value = formulaRef.value.innerHTML
  let str = formulaRef.value.innerHTML
  const yzList =
    str.match(/<span[^>]*>([\s\S]*?)<\/span>/g)?.map((item: any) => {
      const tempItem = item.match(/<span[^>]*>([\s\S]*?)<\/span>/) || []
      return tempItem[1]
    }) || []
  const divList = str.match(/<div[^>]*>([\s\S]*?)<\/div>/g) || []
  divList.map((item: any, i: number) => {
    str = str.replace(item, '${' + yzList[i] + '}')
  })
  currentValue.value = str.replaceAll('&nbsp;', '').replaceAll('&lt;', '<').replaceAll('&gt;', '>')
}

/**
 * 移出选项
 * @param e
 */
function removeSelection(e: any) {
  showSelection.value = false
  e && refreshHtml('@')
}

/**
 * 打开选项栏
 */
function openSelection() {
  filter.value = ''
  showSelection.value = true
  setTimeout(() => {
    // 绑定监听
    addEventListener()
    // 焦点到下拉框filter input中
    inputRef.value.focus()
  }, 0)
}

onBeforeMount(async () => {
  removeEventListener()
  attrs.value = await getAttrs(props, { clearable: true, ...useAttrs() })
  isInit.value = true
})

watch(
  () => props.desc.options,
  async (data: any) => {
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
  () => props.modelValue,
  (data: any) => {
    currentValue.value = data?.value || '='
    if (formulaRef.value) {
      formulaRef.value.innerHTML = data?.domStr || '='
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  removeEventListener()
})
</script>
<style lang="scss">
.el-plus-form-formula-dialog {
  .show-panel {
    text-align: center;
    margin-bottom: 20px;
    color: var(--el-color-danger);
    min-height: 25px;
    word-break: break-all;
  }
  .title-tip {
    margin-bottom: 20px;
  }
  .formula-input {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    padding: 10px 15px;
    min-height: 50px;
    box-sizing: border-box;
    white-space: nowrap;
    outline: none;
    transition: border 0.3s;
    overflow: scroll;
    -ms-overflow-style: none;
    display: flex;
    flex-wrap: wrap;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;

    &::-webkit-scrollbar {
      display: none;
    }

    &[contenteditable='false'] {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.error {
      border: 1px solid var(--el-color-warning);
    }

    &:empty::before {
      content: attr(placeholder);
      color: #c0c4cc;
    }

    br {
      display: none;
    }

    & * {
      display: inline;
      white-space: nowrap;
    }

    &:focus {
      border: 1px solid var(--el-color-warning);
    }

    div {
      color: var(--el-color-warning);
      padding: 0 3px;

      span {
        display: none;
      }
    }
  }
  .formula-input-selection {
    position: relative;
    font-size: 12px;
    width: 100%;
    z-index: 10000;
    background: #fff;
    border: 1px solid #dcdfe6;
    margin-top: -1px;
    box-sizing: border-box;
    border-radius: 4px;
    transition:
      top 300ms,
      left 300ms;

    .el-input {
      &__inner {
        border-radius: 0 0 0 0;
        border: none;
        border-bottom: 1px solid #dcdfe6;

        &:focus {
          border-bottom: 1px solid #dcdfe6;
        }
      }
    }

    .options {
      max-height: 200px;
      overflow-y: scroll;

      .option {
        background-color: #f5f7fa;
        padding: 5px 15px;
        border-radius: 100px;
        margin: 5px;
        white-space: nowrap;
        cursor: pointer;
        display: inline-block;
      }
    }
    .empty {
      text-align: center;
      padding: 20px 0;
    }
  }
}
</style>
<style lang="scss">
.el-plus-form-formula {
  width: 100%;

  .formula-text-panel {
    display: flex;
    .formula-btn {
      width: 100%;
      padding: 0 !important;
      span {
        flex: 1;
        width: 100%;
        text-align: left;
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        white-space: nowrap;
      }
    }
  }
}
</style>
