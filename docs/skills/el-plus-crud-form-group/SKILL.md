---
name: el-plus-crud-form-group
description: Multi-section grouped form with independent validation per group, shared submit lifecycle, and dynamic group visibility
version: 1.0.0
origin: el-plus-crud
tags: [vue3, element-plus, form-group, multi-section-form, grouped-form]
---

# ElPlusFormGroup — Grouped Form

ElPlusFormGroup organizes multiple `ElPlusForm` instances into a grouped form. Each group has its own title, column count, and `formDesc`. Supports dynamic group visibility (vif), cross-group joint validation, and a unified submit lifecycle. Typical scenarios: multi-section detail pages, complex edit pages, wizard-style forms.

## When to Activate

- Using `<ElPlusFormGroup>` component
- Writing `IFormGroupConfig` configuration
- Organizing form fields into titled sections
- Needing per-group column count and visibility control
- Calling group-level validate / clear / getData / init methods

## Core Concepts

### IFormGroupConfig Structure

```typescript
interface IFormGroupConfig {
  column?: number              // Default column count for all groups
  beforeValidate?: (data) => any  // Pre-validation hook
  beforeRequest?: (data) => any   // Pre-submit hook
  requestFn?: (data) => Promise   // Submit function
  updateFn?: (data) => Promise    // Update function
  success?: (formBack: IFormBack) => any  // Success callback
  successTip?: string | ((data?) => string)
  tableRef?: any               // Table ref for auto-reload after success
  group: Array<{
    title?: string             // Group title (renders as left-border heading)
    formDesc: IFormDesc        // This group's form fields
    column?: number            // Override global column count
    vif?: boolean | ((data?) => boolean)  // Dynamic group visibility
    fid?: string               // Stable group identifier
    showBtns?: boolean         // Show submit buttons (auto: only last group)
    maxWidth?: string
    labelWidth?: string | number
  }>
}
```

### Multi-Instance Coordination

Each group creates an independent `ElPlusForm` instance. The FormGroup manages them through a `formRefs` array:

- Only the **last visible group** shows submit/cancel/reset buttons
- All groups share the same `modelValue` object — field names must not overlap across groups
- `groupFormDesc` collects all visible groups' formDesc for unified data processing

### Validation Strategy

```
External beforeValidate (IFormGroupConfig level)
  → Promise.all(formRefs.map(ref => ref.validate()))
```

All groups are validated in parallel. If any group fails, the entire submission is rejected.

### Data Merging

`getData()` merges all groups' form data into a single object:

```typescript
function getData() {
  const tempData = {}
  formRefs.value.map(tempRef => Object.assign(tempData, tempRef.getData()))
  return tempData
}
```

### Dynamic Group Visibility

```typescript
group: [
  { title: '基本信息', formDesc: basicDesc },
  { title: '企业信息', formDesc: companyDesc, vif: (data) => !!data.isCompany },
  { title: '附加信息', formDesc: extraDesc }
]
```

When `vif` returns false, the group is filtered out and its fields are excluded from validation and data collection.

### Named Slots

Slots are indexed by group position:

```html
<ElPlusFormGroup v-model="formData" :formGroup="formGroupConfig">
  <template #title0><h3>Custom Title for Group 0</h3></template>
  <template #default1><div>Extra content in Group 1</div></template>
  <template #top2><div>Content above Group 2</div></template>
</ElPlusFormGroup>
```

Available slot names: `top{index}`, `title{index}`, `default{index}` for each group.

### Expose Methods

```typescript
const groupRef = ref()

await groupRef.value.validate()    // Validate all groups (parallel)
groupRef.value.getData()           // Get merged form data
groupRef.value.clearValid()        // Clear validation for all groups
groupRef.value.clear()             // Clear data for all groups
groupRef.value.init()              // Init all group components
```

## Code Examples

### Basic Grouped Form

```html
<ElPlusFormGroup v-model="formData" :formGroup="formGroupConfig" />
```

```typescript
const formData = ref({})
const formGroupConfig: IFormGroupConfig = {
  column: 2,
  requestFn: api.saveProfile,
  success: ({ callBack }) => {
    ElMessage.success('保存成功')
    callBack()
  },
  group: [
    {
      title: '基本信息',
      formDesc: {
        name:  { type: 'input', label: '姓名', required: true },
        phone: { type: 'input', label: '手机号', rules: 'phone' },
        email: { type: 'input', label: '邮箱', rules: 'email' }
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
```

### Dynamic Group Visibility

```typescript
const formGroupConfig: IFormGroupConfig = {
  column: 2,
  requestFn: api.save,
  group: [
    { title: '个人信息', formDesc: personalDesc },
    {
      title: '企业信息',
      formDesc: companyDesc,
      column: 3,
      vif: (data) => data.userType === 'company'
    },
    { title: '其他', formDesc: otherDesc }
  ]
}
```

### Custom Group Title via Slots

```html
<ElPlusFormGroup v-model="formData" :formGroup="formGroupConfig">
  <template #title0>
    <div style="color: #409eff; font-size: 18px; font-weight: bold;">
      基本信息
    </div>
  </template>
  <template #default1>
    <el-divider />
  </template>
</ElPlusFormGroup>
```

### ref Method Usage

```typescript
const groupRef = ref()

const handleSubmit = async () => {
  try {
    await groupRef.value.validate()
    const data = groupRef.value.getData()
    await api.save(data)
    ElMessage.success('保存成功')
  } catch (e) {
    console.error('验证失败', e)
  }
}

const handleReset = () => {
  groupRef.value.clear()
}
```

## Anti-Patterns

### FAIL: Manually coordinate multiple separate forms

```html
<!-- FAIL: Don't manually manage multiple forms -->
<div class="section"><h3>基本信息</h3><ElPlusForm ref="form1" :formDesc="desc1" /></div>
<div class="section"><h3>地址</h3><ElPlusForm ref="form2" :formDesc="desc2" /></div>
```
```typescript
const submit = async () => {
  await form1.value.validate()
  await form2.value.validate()
  const data = { ...form1.value.getData(), ...form2.value.getData() }
  await api.save(data)
}
```

### PASS: Use ElPlusFormGroup for unified management

```html
<ElPlusFormGroup v-model="formData" :formGroup="formGroupConfig" />
```

### FAIL: Expect per-group requestFn

```typescript
// FAIL: IFormGroupConfig has ONE shared requestFn, not per-group
group: [
  { title: 'A', formDesc: descA, requestFn: api.saveA },
  { title: 'B', formDesc: descB, requestFn: api.saveB }
]
```

### PASS: Use unified requestFn, dispatch in beforeRequest

```typescript
const formGroupConfig: IFormGroupConfig = {
  requestFn: (data) => api.saveAll(data),
  beforeRequest: (data) => {
    // Handle any pre-processing
    return data
  },
  group: [...]
}
```

## Best Practices

1. Use `fid` for stable group identifiers — avoid index-based keys
2. Last group shows buttons by default (`showBtns: true`); previous groups auto-hide buttons
3. Use `title{index}` slots for custom group header styles (default: left border + text)
4. Ensure field names don't overlap across groups — all share the same `modelValue` object
5. Set `disabledTab: true` to prevent Tab key from leaving the form on the last field

## Related Skills

- `el-plus-crud-form` — ElPlusFormGroup creates ElPlusForm instances per group; all formDesc config applies (direct)
- `el-plus-crud-config` — IFormGroupConfig type definition (indirect)
- `el-plus-crud-validation` — cross-group parallel validation mechanism (indirect)
