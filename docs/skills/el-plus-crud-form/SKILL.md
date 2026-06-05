---
name: el-plus-crud-form
description: Data-driven form component with 40+ field types, dynamic visibility, multi-column layout, submit lifecycle hooks, and field-level linking
version: 1.0.0
origin: el-plus-crud
tags: [vue3, element-plus, form, data-driven, dynamic-form]
---

# ElPlusForm — Data-Driven Form

ElPlusForm is the core form component. Declare form fields through an `IFormDesc` object, supporting 40+ built-in field types, multi-column layout, dynamic visibility (vif/disabled as functions), field linking, custom component extension, and a complete submit lifecycle.

## When to Activate

- Using `<ElPlusForm>` component
- Writing or modifying `IFormDesc` / `IFormDescItem` objects
- Configuring form field types (input, select, upload, daterange, etc.)
- Implementing field linking (inter-field dependencies, dynamic visibility)
- Calling form expose methods: `submit` / `validate` / `reset` / `clear` / `getData`

## Core Concepts

### IFormDesc Structure

Key = field name (matches backend field), value = `IFormDescItem`.

```typescript
const formDesc: IFormDesc = {
  name:  { type: 'input',  label: '姓名', required: true },
  phone: { type: 'input',  label: '手机号', rules: 'phone' },
  role:  { type: 'select', label: '角色', options: roleList }
}
```

### 40+ Built-in Field Types

| Category | Types |
|---|---|
| **Input** | `input`, `number`, `nbinput`, `password`, `textarea`, `quickinput`, `percentinput` |
| **Selection** | `select`, `radio`, `checkbox`, `checkboxbutton`, `switch`, `slider`, `rate`, `transfer` |
| **Date/Time** | `date`, `datetime`, `daterange`, `datetimerange`, `time`, `timerange` |
| **Upload** | `upload`, `image`, `file`, `upbtn` |
| **Tree/Cascade** | `tree`, `tselect` (tree-select), `cascader`, `cascaderpanel` |
| **Display** | `text`, `tag`, `status`, `link`, `rate`, `color` |
| **Advanced** | `area`, `autocomplete`, `lkuser`, `formula` |
| **Action** | `btn`, `btns` |

### Dynamic Properties

These properties accept functions for reactive behavior:

| Property | Function Signature | Description |
|---|---|---|
| `vif` | `(formData, fieldValue) => boolean` | Show/hide field |
| `disabled` | `(formData, fieldValue) => boolean` | Enable/disable field |
| `label` | `(formData, fieldValue) => string` | Dynamic label |
| `attrs` | `(formData, fieldValue) => object` | Dynamic attributes |
| `tip` | `(formData, fieldValue) => string` | Dynamic hint text |
| `style` | `(formData, fieldValue) => object` | Dynamic styles |
| `required` | `(formData) => boolean` | Dynamic mandatory |

When any property is a function, the form automatically enables deep watching on `modelValue` (`isOpenListen = true`).

### Multi-Column Layout

Uses a 24-grid system via `el-row` / `el-col`.

```typescript
// 2-column form
<ElPlusForm :column="2" :formDesc="formDesc" />

// Field spanning 2 columns
{ type: 'textarea', label: '描述', colspan: 2 }
```

### Submit Lifecycle

```
beforeValidate → validate → beforeRequest → requestFn/updateFn → success → requestError → requestEnd
```

- `beforeValidate(data)`: Return false to cancel. Can be async.
- `beforeRequest(data)`: Return false to cancel, return object to replace data. Can be async.
- `requestFn(data)`: Create request. If `updateFn` exists and data has `idKey`, calls `updateFn` instead.
- `success({ response, formData, callBack })`: Success callback. `callBack()` resets loading.
- `requestError(error)`: Error handler.
- `requestEnd()`: Always called (finally block).

These hooks are passed via `v-bind` (attrs), not as props:

```html
<ElPlusForm
  :formDesc="formDesc"
  v-model="formData"
  :requestFn="api.create"
  :updateFn="api.update"
  :beforeValidate="beforeValidate"
  :beforeRequest="beforeRequest"
  :success="onSuccess"
/>
```

### Data Transformation — Special Types

The form automatically transforms data for special types during `getData()`:

| Type | Transformation |
|---|---|
| `daterange` | Splits into `startTime`/`endTime` (customizable via `startTimeKey`/`endTimeKey`) |
| `datetimerange` | Same as daterange, preserves time component |
| `timerange` | Splits into `startTime`/`endTime` with `HH:mm:ss` format |
| `area` | Splits into `provinceId`/`cityId`/`zoneId`/`streetId` |
| `checkbox` | Joins array with comma: `[1,2,3]` → `'1,2,3'` |
| `linkuser` | Splits into `userIds`/`deptIds`/`userNames`/`deptNames` |

### Internal Properties (prefixed with `_`)

Do NOT set these manually — they are computed internally:

- `_type`: Resolved component name (e.g., `'el-plus-form-input'`)
- `_vif`: Computed visibility
- `_disabled`: Computed disabled state
- `_attrs`: Merged attributes
- `_label`: Computed label
- `_tip`: Computed hint text

### Expose Methods

```typescript
const formRef = ref()

formRef.value.submit()       // Trigger submit lifecycle
formRef.value.validate()     // Validate form (returns Promise)
formRef.value.getData()      // Get transformed form data
formRef.value.reset()        // Reset to initial values
formRef.value.clear()        // Clear all data and validation
formRef.value.clearValid()   // Clear validation only
formRef.value.refresh()      // Re-compute dynamic properties
formRef.value.init()         // Init child components
formRef.value.changeValidImg() // Refresh captcha image
```

### Mixins System

Each form sub-component receives these via mixins:

- **getAttrs**: Merges `desc.attrs`, auto-generates `placeholder`, handles `multiple`
- **getEvents**: Wraps events, injects `formData` and `rowIndex` into callbacks

### Display Types — tag

The `tag` type renders an `el-tag` for read-only status display. It does NOT support user input — the value comes from `modelValue`. Two key properties control its behavior:

#### tagType — Controls Tag Color

Determines the `type` attribute of `el-tag` (controls color theme).

| Value Type | Behavior | Example |
|---|---|---|
| **Not set** | Default `'primary'` (blue) | — |
| **Function** `(value, formData, field) => string` | Dynamic color based on value | `tagType: (v) => v === 1 ? 'success' : 'danger'` |
| **String** (format key) | Calls `format[tagType](value, formData, field)` | `tagType: 'statusColor'` |

Supported el-tag types: `'primary'` | `'success'` | `'warning'` | `'danger'` | `'info'`

Rendering rule: if `tagType` is falsy or equals `'--'`, falls back to `'primary'`.

#### format — Controls Display Text

Determines the text shown inside the tag.

| Value Type | Behavior | Example |
|---|---|---|
| **Not set** | Shows raw `modelValue`, empty/null shows `'-'` | — |
| **Function** `(value, formData, field) => string` | Dynamic text | `format: (v) => v === 1 ? '启用' : '禁用'` |
| **String** (format key) | Calls `format[formatKey](value, formData, field)` | `format: 'statusLabel'` |

#### attrs — Pass-through to el-tag

Any `el-tag` native attribute can be set via `attrs`:

```typescript
attrs: { effect: 'dark', round: true, size: 'small' }
```

#### tag in Table Columns

When used in `ITableConfig.column`, tag also supports the `color` property for custom colors:

| color Value Type | Behavior |
|---|---|
| **String** | Fixed custom color: `'#67C23A'` |
| **Function** `(value, row, field) => string` | Dynamic color per row |
| **Array** `['#67C23A', '#F56C6C']` | Color per value index (multi-prop columns) |

### isTable Mode

When `isTable=true`, the form renders as a horizontal search bar (used in table toolbar):

```typescript
// Auto-set: horizontal layout, fixed widths, no submit buttons
<ElPlusForm isTable :formDesc="searchDesc" v-model="queryData" />
```

## Code Examples

### Basic Form

```typescript
const formData = ref({})
const formDesc: IFormDesc = {
  name:  { type: 'input', label: '姓名', required: true },
  phone: { type: 'input', label: '手机号', rules: 'phone' },
  email: { type: 'input', label: '邮箱', rules: 'email' },
  role:  { type: 'select', label: '角色', options: [{ l: '管理员', v: 1 }, { l: '用户', v: 2 }] }
}
```

```html
<ElPlusForm v-model="formData" :formDesc="formDesc" :requestFn="api.createUser" />
```

### Multi-Column with Colspan

```html
<ElPlusForm :column="2" v-model="formData" :formDesc="formDesc" />
```

```typescript
const formDesc: IFormDesc = {
  name:   { type: 'input', label: '姓名' },
  phone:  { type: 'input', label: '手机号' },
  remark: { type: 'textarea', label: '备注', colspan: 2 }  // spans full width
}
```

### Dynamic Visibility and Linking

```typescript
const formDesc: IFormDesc = {
  isCompany: { type: 'switch', label: '是否企业' },
  companyName: {
    type: 'input', label: '企业名称',
    vif: (formData) => !!formData.isCompany,
    required: (formData) => !!formData.isCompany
  },
  creditCode: {
    type: 'input', label: '信用代码',
    vif: (formData) => !!formData.isCompany,
    disabled: (formData) => !formData.isVerified
  }
}
```

### Options — Three Sources

```typescript
const formDesc: IFormDesc = {
  // 1. Static array
  status: { type: 'select', label: '状态', options: [{ l: '启用', v: 1 }, { l: '禁用', v: 0 }] },

  // 2. Function returning array
  roles: { type: 'select', label: '角色', options: () => roleStore.list },

  // 3. String key → fetched from globalData
  types: { type: 'select', label: '类型', options: 'typeOptions' }
}
```

### Complete Submit Lifecycle

```html
<ElPlusForm
  v-model="formData"
  :formDesc="formDesc"
  :requestFn="api.createUser"
  :updateFn="api.updateUser"
  :beforeValidate="handleBeforeValidate"
  :beforeRequest="handleBeforeRequest"
  :success="handleSuccess"
  :requestError="handleRequestError"
/>
```

```typescript
const handleBeforeValidate = (data: any) => {
  // Return false to cancel submit
  return true
}
const handleBeforeRequest = (data: any) => {
  // Modify data before request, return false to cancel
  data.timestamp = Date.now()
  return data
}
const handleSuccess = ({ response, formData, callBack }: IFormBack) => {
  ElMessage.success('保存成功')
  callBack()  // resets loading state
}
```

### daterange Data Transformation

```typescript
const formDesc: IFormDesc = {
  dateRange: {
    type: 'daterange',
    label: '时间范围',
    startTimeKey: 'startDate',    // default: 'startTime'
    endTimeKey: 'endDate',        // default: 'endTime'
    valueFormat: 'YYYY-MM-DD'     // passed to time() formatter
  }
}
// getData() returns: { startDate: '2024-01-01', endDate: '2024-01-31' }
```

### Tag Display — Status Column

```typescript
// === In formDesc (form detail / isTable mode) ===
const formDesc: IFormDesc = {
  status: {
    type: 'tag',
    label: '状态',
    // tagType: function — dynamic color based on value
    tagType: (value) => {
      if (value === 1) return 'success'   // green
      if (value === 0) return 'danger'    // red
      if (value === 2) return 'warning'   // yellow
      return 'info'                       // gray
    },
    // format: function — dynamic display text
    format: (value) => {
      const map = { 0: '禁用', 1: '启用', 2: '待审核' }
      return map[value] || '未知'
    },
    // attrs: pass-through to el-tag
    attrs: { effect: 'dark', size: 'small' }
  }
}

// === In tableConfig.column ===
const columns: Array<IColumnItem> = [
  {
    prop: 'status', label: '状态', type: 'tag',
    tagType: (value) => value === 1 ? 'success' : 'danger',
    format: (value) => value === 1 ? '启用' : '禁用'
  }
]

// === Using global format functions ===
// main.ts
const formatObj = {
  statusColor: (value) => ({ 0: 'danger', 1: 'success', 2: 'warning' }[value] || 'info'),
  statusLabel: (value) => ({ 0: '禁用', 1: '启用', 2: '待审核' }[value] || '未知')
}
app.use(elPlusCrud, config, formatObj, globalDataObj)

// formDesc — reference by string key
{
  type: 'tag', label: '状态',
  tagType: 'statusColor',   // calls format.statusColor(value, formData, field)
  format: 'statusLabel'     // calls format.statusLabel(value, formData, field)
}

// === Table column with custom color ===
{
  prop: 'status', label: '状态', type: 'tag',
  color: (value, row, field) => value === 1 ? '#67C23A' : '#F56C6C',
  format: (value) => value === 1 ? '在线' : '离线'
}
```

### Custom Component Extension

```typescript
// main.ts — register custom component type
app.use(elPlusCrud, {
  form: { comList: ['custompicker'] }  // registers el-plus-form-custompicker
})

// Create component file: ElPlusFormCustompicker.vue
// Use in formDesc:
{ type: 'custompicker', label: '自定义选择器' }
```

## Anti-Patterns

### FAIL: Use options to control tag display

```typescript
// FAIL: tag does NOT use options — it ignores them completely
{ type: 'tag', label: '状态', options: [{ l: '启用', v: 1 }, { l: '禁用', v: 0 }] }
```

### PASS: Use format for text, tagType for color

```typescript
// tag uses format (display text) + tagType (color), not options
{ type: 'tag', label: '状态', tagType: (v) => v === 1 ? 'success' : 'danger', format: (v) => v === 1 ? '启用' : '禁用' }
```

### FAIL: Manually set internal properties

```typescript
// FAIL: _type, _vif etc. are computed internally
formDesc.name._type = 'el-plus-form-input'
formDesc.name._vif = true
```

### PASS: Set declarative properties, let component handle internals

```typescript
formDesc.name.type = 'input'
formDesc.name.vif = (formData) => !!formData.showName
```

### FAIL: Async operations in vif/disabled functions

```typescript
// FAIL: vif/disabled are synchronous, called on every data change
vif: async (formData) => {
  const result = await checkPermission(formData.id)
  return result
}
```

### PASS: Use reactive variable for async conditions

```typescript
const showField = ref(false)
checkPermission(data.id).then(r => showField.value = r)

// vif can accept boolean directly
formDesc.name.vif = showField
```

### FAIL: Manually handle daterange splitting

```typescript
// FAIL: don't manually process daterange values
const data = formRef.value.getData()
data.startTime = data.dateRange[0]
data.endTime = data.dateRange[1]
```

### PASS: Use startTimeKey/endTimeKey, component handles it automatically

```typescript
{ type: 'daterange', label: '时间范围', startTimeKey: 'startTime', endTimeKey: 'endTime' }
// getData() already returns { startTime: ..., endTime: ... }
```

## Best Practices

1. Keep `formDesc` key names aligned with backend field names — minimize mapping in `beforeRequest`
2. Use function form for `vif`/`disabled` to enable reactive field linking — component auto-enables deep watch
3. Use `descOrders` array to control field display order instead of relying on object key insertion order
4. In `isTable` mode, set fixed `width` on each field to prevent search bar overflow
5. Always configure `upload` in `ICRUDConfig` globally rather than per-field
6. For 3+ daterange components in one form, use `propPrefix` to avoid key collisions

## Related Skills

- `el-plus-crud-config` — IFormDesc, IFormDescItem, IFormConfig type definitions (direct)
- `el-plus-crud-validation` — rules and required validation configuration (direct)
- `el-plus-crud-table` — table toolbar search bar uses ElPlusForm isTable mode (indirect)
