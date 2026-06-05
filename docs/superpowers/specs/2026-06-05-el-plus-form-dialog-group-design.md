# ElPlusFormDialog 支持 formGroup 分组表单设计

## 背景

当前项目中存在两个独立的表单组件：
- **ElPlusFormDialog**：弹框表单，内部使用 `ElPlusForm`，接收 `formDesc` 配置
- **ElPlusFormGroup**：分组表单（非弹框），接收 `formGroup` 配置，内部渲染多个 `ElPlusForm`

缺少一个**弹框 + 分组表单**的组合能力。用户需要在弹框中使用分组表单。

## 方案选择

**采用方案 A：改造 ElPlusFormDialog，使其同时支持 formDesc 和 formGroup。**

选择理由：
- 弹框管理逻辑（show 控制、dialogAttrs 分离、成功回调、close/open 生命周期）只维护一份，避免重复
- 完全向后兼容 —— 现有传 `formDesc` 的代码零改动
- 不需要新增组件、注册、导出
- 对外 API 统一：`formDesc` 走普通表单，`formGroup` 走分组表单

## 详细设计

### 1. Props 变更

新增可选 prop `formGroup`：

```ts
formGroup?: IFormGroupConfig
```

现有 props 保持不变。`formDesc` 仍为可选（为兼容已有用法），但当处于 `formGroup` 模式时，`formDesc` 不再是必需的。

判断逻辑：`props.formGroup` 存在 → 分组模式，否则走原有 `formDesc` 模式。

### 2. Template 变更

在 `<el-dialog>` 内部用 `v-if/v-else` 切换渲染：

```vue
<el-dialog class="el-plus-form-dialog" v-model="currentShow" :title="props.title"
           v-bind="dialogAttrs" @close="handelClosed" @opened="handelOpen">
  <template #header>
    <slot name="header" />
  </template>

  <!-- 分组表单模式 -->
  <ElPlusFormGroup v-if="props.formGroup"
    ref="refForm"
    style="padding: 20px"
    :isLoading="props.isLoading"
    v-model="currentValue"
    :formGroup="props.formGroup"
    @cancel="currentShow = false"
  />

  <!-- 原有普通表单模式 -->
  <ElPlusForm v-else
    ref="refForm"
    style="padding: 20px"
    :isLoading="props.isLoading"
    :isDialog="true"
    v-model="currentValue"
    :formDesc="formDesc"
    v-bind="attrs"
    :success="dialogSuccess"
    @cancel="currentShow = false"
  >
    <template #top><slot name="top" /></template>
    <template #default><slot name="default" /></template>
  </ElPlusForm>

  <template #footer>
    <slot name="footer" />
  </template>
</el-dialog>
```

关键点：
- 两个子组件共用同一个 `ref="refForm"`，通过 `v-if/v-else` 保证同一时刻只有一个实例存在
- `ElPlusForm` 分支保持原样，包括 `v-bind="attrs"` 透传和插槽
- `ElPlusFormGroup` 不需要 `isDialog`、`v-bind="attrs"` 等 ElPlusForm 专属属性

### 3. Ref 与 expose 方法

统一使用 `refForm` 引用，代理调用子组件方法。

ElPlusFormGroup expose 了：`validate`、`getData`、`clearValid`、`clear`、`init`

ElPlusFormDialog 原有 expose：`submit`

改造后 expose：

- `submit()`：`formDesc` 模式下保持原有行为调用 `refForm.value?.submit()`；`formGroup` 模式下 ElPlusFormGroup 没有 submit 方法，此时 submit 调用不执行或仅做 validate
- `validate()`：调用 `refForm.value?.validate()`
- `clear()`：调用 `refForm.value?.clear()`
- `init()`：调用 `refForm.value?.init()`
- `getData()`：调用 `refForm.value?.getData()`

### 4. 成功回调处理

`formGroup` 模式下，`IFormGroupConfig` 自身包含 `success`、`tableRef`、`requestFn` 等配置。ElPlusFormGroup 内部已经自行处理了提交和成功逻辑，不需要 ElPlusFormDialog 的 `dialogSuccess` 介入。

当 `formGroup` 模式且未配置 `formGroup.success` 时，弹框的关闭行为需要补充：在 `IFormGroupConfig` 的 `success` 回调中关闭弹框并刷新 tableRef。

### 5. open/close 生命周期

两个子组件都有 `init()` 和 `clear()` 方法，`handelOpen` 和 `handelClosed` 通过统一的 `refForm` 调用即可：

```ts
function handelClosed() {
  refForm.value?.clear()
}

function handelOpen() {
  refForm.value?.init()
}
```

### 6. 不涉及变更的部分

- `lib/index.ts`：无需修改，ElPlusFormDialog 已注册
- 类型文件 `types/index.d.ts`：无需新增类型
- ElPlusForm、ElPlusFormGroup 组件本身：无需修改
- 现有使用 `formDesc` 的 ElPlusFormDialog 调用方：完全兼容

## 修改文件清单

| 文件 | 变更内容 |
|------|---------|
| `lib/components/el-plus-form/ElPlusFormDialog.vue` | 唯一需要修改的文件 |

## 使用示例

### 原有用法（完全兼容，无需改动）

```vue
<ElPlusFormDialog
  v-model="formData"
  v-model:show="showDialog"
  :formDesc="formDesc"
  title="编辑"
  :tableRef="tableRef"
/>
```

### 新增用法（分组表单弹框）

```vue
<ElPlusFormDialog
  v-model="formData"
  v-model:show="showDialog"
  :formGroup="formGroupConfig"
  title="编辑分组表单"
  :tableRef="tableRef"
/>
```

其中 `formGroupConfig` 的结构同 `IFormGroupConfig`。

## 验证方式

1. 原有 `formDesc` 用法功能不受影响（回归验证）
2. 新增 `formGroup` 用法能正常弹出分组表单弹框
3. 弹框的 open/close 生命周期正常（clear、init）
4. 分组表单的提交、校验、成功回调正常
5. expose 的方法（submit、validate、clear、init）在两种模式下均可调用
