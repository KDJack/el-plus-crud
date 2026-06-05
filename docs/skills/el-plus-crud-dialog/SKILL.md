---
name: el-plus-crud-dialog
description: Dialog wrapper for ElPlusForm and ElPlusFormGroup with auto open/close, submit handling, and table reload coordination
version: 1.1.0
origin: el-plus-crud
tags: [vue3, element-plus, dialog, form-dialog, modal-form, form-group-dialog]
---

# ElPlusFormDialog — Dialog Form

ElPlusFormDialog wraps `ElPlusForm` or `ElPlusFormGroup` inside an `el-dialog`, providing a standard pattern for add/edit dialogs. It supports two modes:

- **formDesc mode** (original): Standard form dialog, pass `formDesc` for field descriptors
- **formGroup mode** (new): Grouped form dialog, pass `formGroup` for multi-section forms

Both modes share the same dialog lifecycle: open → init form, close → clear data, submit success → close dialog + refresh linked table. Core value: one component completes the full "click button → open dialog → fill form → submit → close → refresh list" workflow.

## When to Activate

- Using `<ElPlusFormDialog>` component
- Implementing add/edit modal functionality
- Coordinating dialog with table reload
- Configuring dialog width and form integration
- Building grouped/sectioned form dialogs with `formGroup`

## Core Concepts

### Two Modes

| Mode | Prop | Renders | Use Case |
|---|---|---|---|
| `formDesc` (default) | `:formDesc="formDesc"` | `ElPlusForm` | Simple flat form |
| `formGroup` | `:formGroup="formGroupConfig"` | `ElPlusFormGroup` | Multi-section grouped form |

When `formGroup` is provided, it takes priority and renders `ElPlusFormGroup`. Otherwise, falls back to `ElPlusForm` with `formDesc`. Fully backward compatible — existing `formDesc` usage requires zero changes.

### Two-way Bindings

```html
<!-- formDesc mode -->
<ElPlusFormDialog
  v-model="formData"
  v-model:show="showDialog"
  :formDesc="formDesc"
/>

<!-- formGroup mode -->
<ElPlusFormDialog
  v-model="formData"
  v-model:show="showDialog"
  :formGroup="formGroupConfig"
/>
```

- `v-model` — form data object
- `v-model:show` — dialog visibility

### tableRef Coordination

Pass a table ref to automatically reload the table after successful submit (works in both modes):

```html
<ElPlusTable ref="tableRef" :tableConfig="tableConfig" />
<ElPlusFormDialog v-model:show="showDialog" v-model="formData" :formDesc="formDesc" :tableRef="tableRef" />
```

When `tableRef` is provided and no custom `success` callback:
1. Shows `ElMessage.success(successTip)`
2. Calls `tableRef.reload()`
3. Closes the dialog
4. Calls `callBack()` to reset form loading state

### Dialog Default Configuration

| Property | Default | Description |
|---|---|---|
| `width` | `'700px'` | Dialog width |
| `draggable` | `true` | Dialog is draggable |
| `top` | `'15vh'` | Top offset |
| `closeOnClickModal` | `false` | Clicking overlay won't close |
| `destroyOnClose` | `true` | Destroy form on close |
| `showCancel` | `true` | Show cancel button |

### Lifecycle

```
User clicks "新增/编辑" → set formData + showDialog=true
  → dialog opened → formRef.init()
  → user fills form → clicks "提交"
  → ElPlusForm/ElPlusFormGroup submit lifecycle runs
  → success → tableRef.reload() + close dialog
  → dialog closed → formRef.clear()
```

### Props

```typescript
interface ElPlusFormDialogProps {
  modelValue?: { [key: string]: any }  // Form data (two-way)
  formDesc?: IFormDesc                  // Form field descriptors (formDesc mode)
  formGroup?: IFormGroupConfig          // Grouped form config (formGroup mode)
  show?: boolean                        // Dialog visibility (two-way)
  title?: string                        // Dialog title
  tableRef?: any                        // ElPlusTable ref for auto-reload
  success?: Function                    // Custom success callback
  isLoading?: boolean                   // External loading state
  successTip?: string | ((data?) => string)  // Success message (default: '操作成功!')
}
```

### Slots

| Slot | Mode | Description |
|---|---|---|
| `header` | Both | Custom dialog header |
| `top` | formDesc only | Content above form |
| `default` | formDesc only | Content inside form area |
| `footer` | Both | Custom dialog footer |

Note: `top` and `default` slots are only available in `formDesc` mode. In `formGroup` mode, use `ElPlusFormGroup`'s named slots (`title{index}`, `top{index}`, `default{index}`).

### Expose Methods

```typescript
const dialogRef = ref()
dialogRef.value.submit()     // Manually trigger form submit (formDesc mode) / validate (formGroup mode)
dialogRef.value.validate()   // Validate all form fields
dialogRef.value.getData()    // Get merged form data
dialogRef.value.clearValid() // Clear validation state
dialogRef.value.clear()      // Clear form data
dialogRef.value.init()       // Re-initialize form
```

## Code Examples

### Basic Add Dialog (formDesc mode)

```html
<template>
  <ElPlusTable ref="tableRef" :tableConfig="tableConfig" />

  <ElPlusFormDialog
    v-model:show="showDialog"
    v-model="formData"
    :formDesc="formDesc"
    :requestFn="api.createUser"
    :tableRef="tableRef"
    title="新增用户"
  />
</template>

<script setup>
const showDialog = ref(false)
const formData = ref({})
const formDesc = {
  name:  { type: 'input', label: '姓名', required: true },
  phone: { type: 'input', label: '手机号', rules: 'phone' },
  email: { type: 'input', label: '邮箱', rules: 'email' }
}

const handleAdd = () => {
  formData.value = {}
  showDialog.value = true
}
</script>
```

### Edit Dialog (Shared with Add)

```typescript
const handleEdit = (row: any) => {
  // Assign existing data — form auto-fills
  formData.value = { ...row }
  showDialog.value = true
}
```

```html
<!-- Same dialog handles both add and edit -->
<ElPlusFormDialog
  v-model:show="showDialog"
  v-model="formData"
  :formDesc="formDesc"
  :requestFn="api.createUser"
  :updateFn="api.updateUser"
  :tableRef="tableRef"
  :title="formData.id ? '编辑用户' : '新增用户'"
  :successTip="formData.id ? '编辑成功!' : '新增成功!'"
/>
```

When `formData` has an `id` field (default `idKey: 'id'`), `updateFn` is called instead of `requestFn`.

### Grouped Form Dialog (formGroup mode)

```html
<template>
  <ElPlusTable ref="tableRef" :tableConfig="tableConfig" />

  <ElPlusFormDialog
    v-model:show="showDialog"
    v-model="formData"
    :formGroup="formGroupConfig"
    title="编辑用户信息"
    :tableRef="tableRef"
  />
</template>

<script setup>
const formGroupConfig: IFormGroupConfig = {
  column: 2,
  requestFn: api.saveUser,
  successTip: '保存成功!',
  group: [
    {
      title: '基本信息',
      formDesc: {
        name:  { type: 'input', label: '姓名', required: true },
        phone: { type: 'input', label: '手机号', rules: 'phone' }
      }
    },
    {
      title: '地址信息',
      formDesc: {
        province: { type: 'area', label: '地区', required: true },
        address:  { type: 'input', label: '详细地址' }
      }
    },
    {
      title: '备注',
      formDesc: {
        remark: { type: 'textarea', label: '备注信息', colspan: 2 }
      }
    }
  ]
}
</script>
```

**Key points:**
- Pass `formGroup` instead of `formDesc` to switch to grouped mode
- `tableRef` auto-reload works the same way as formDesc mode
- Success callback priority: `props.success` → `formGroup.success` → default (reload + close)

### Custom Width and Attributes

```html
<ElPlusFormDialog
  v-model:show="showDialog"
  v-model="formData"
  :formDesc="formDesc"
  width="900px"
  top="10vh"
  :appendToBody="true"
/>
```

All `el-dialog` attributes pass through: `width`, `top`, `modal`, `appendToBody`, `showClose`, `draggable`, `closeOnClickModal`, `destroyOnClose`.

### Custom Success Callback

```html
<ElPlusFormDialog
  v-model:show="showDialog"
  v-model="formData"
  :formDesc="formDesc"
  :requestFn="api.create"
  :success="handleSuccess"
/>
```

```typescript
const handleSuccess = ({ response, formData, callBack }: IFormBack) => {
  // Custom logic — no auto table reload or dialog close
  ElMessage.success(`创建成功，ID: ${response.id}`)
  showDialog.value = false
  callBack()  // Must call to reset loading state
}
```

## Anti-Patterns

### FAIL: Manually control dialog open/close lifecycle

```typescript
// FAIL: Don't manually manage dialog state and form data
const open = () => {
  showDialog.value = true
  formData.value = { name: '' }
}
const close = () => {
  showDialog.value = false
  formRef.value.clear()
}
```

### PASS: Use v-model:show, component auto-handles lifecycle

```html
<ElPlusFormDialog v-model:show="showDialog" v-model="formData" :formDesc="formDesc" />
```

### FAIL: Custom success without table reload

```typescript
// FAIL: Customized success but forgot to reload table
success: (formBack) => {
  ElMessage.success('操作成功')
  // Missing: tableRef.reload() or formBack.callBack()
}
```

### PASS: Pass tableRef for auto-reload, or handle manually

```typescript
// Option 1: Pass tableRef — fully automatic
<ElPlusFormDialog :tableRef="tableRef" />

// Option 2: Manual — ensure reload and callBack
success: ({ response, formData, callBack }) => {
  tableRef.value?.reload()
  callBack()
}
```

### FAIL: Create separate ElPlusFormGroupDialog for grouped forms

```html
<!-- FAIL: No need for a separate component -->
<ElPlusFormGroupDialog v-model:show="showDialog" :formGroup="formGroupConfig" />
```

### PASS: Use ElPlusFormDialog with formGroup prop

```html
<ElPlusFormDialog v-model:show="showDialog" :formGroup="formGroupConfig" />
```

## Best Practices

1. Pass `tableRef` to enable fully automatic add/edit workflow (both modes)
2. Keep `destroyOnClose: true` (default) for clean state on each open
3. For edit mode, pass existing data via `v-model` — form auto-fills all fields
4. Use dynamic `title` and `successTip` to differentiate add vs edit: `formData.id ? '编辑' : '新增'`
5. All `el-dialog` props pass through via attrs: `width`, `top`, `appendToBody`, etc.
6. Use `formGroup` mode when form fields need to be organized into titled sections
7. Success callback priority: `props.success` (highest) → `formGroup.success` → default behavior

## Related Skills

- `el-plus-crud-form` — ElPlusFormDialog internally uses ElPlusForm in formDesc mode; all formDesc and form configurations apply (direct)
- `el-plus-crud-form-group` — ElPlusFormDialog internally uses ElPlusFormGroup in formGroup mode; all formGroup configurations apply (direct)
- `el-plus-crud-config` — IFormDesc / IFormGroupConfig type definitions (indirect)
- `el-plus-crud-table` — tableRef parameter references ElPlusTable instance (indirect)
- `el-plus-crud-validation` — formDesc rules configuration (indirect)
