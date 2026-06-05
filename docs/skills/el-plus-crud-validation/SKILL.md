---
name: el-plus-crud-validation
description: Built-in validation rules for el-plus-crud forms — text, select, upload, email, phone, password, number, and custom validators
version: 1.0.0
origin: el-plus-crud
tags: [vue3, element-plus, validation, form-rules, custom-validator]
---

# Validation System

el-plus-crud includes 20 built-in validation rules covering text input, selectors, uploads, email, phone, password, number, decimal, verification code, account, and more. Rules are referenced via `IFormDescItem.rules` (string for built-in, array for custom). The `required` attribute auto-selects the appropriate validator based on field type.

## When to Activate

- Using `required: true` in formDesc
- Configuring `rules` attribute in formDesc
- Creating custom validation rules
- Debugging form validation issues

## Core Concepts

### rules — Two Forms

```typescript
// 1. String → references built-in rule by name
{ type: 'input', label: '手机号', rules: 'phone' }

// 2. Array → custom rule objects (Element Plus format)
{ type: 'input', label: '自定义', rules: [{ required: true, message: '请输入', trigger: 'blur', validator: myValidator }] }
```

### required Auto-Selection Logic

Setting `required: true` automatically selects a validator based on the field's `type`:

| Field type | Auto-selected rule | Error message |
|---|---|---|
| `input` (default) | `notAllBlank` | 不能全是空格 |
| `textarea` | `textarea` | 不能全是空格/换行 |
| `editor` | `editor` | 不能全是空格/换行 |
| `upload` | `upload` | 请上传 |
| `select`, `radio`, `checkbox`, `tree`, `tselect`, `linkuser`, `link` | `select` | 请选择 |
| `cascader`, `daterange` | `cascader` | 请选择 |
| `password` | `password` | 密码格式错误 |

### Built-in Rules Complete List

#### Text Rules

| Rule name | Required | Trigger | Description |
|---|---|---|---|
| `notNull` | ✅ | change | Cannot be null/undefined/empty |
| `notAllBlank` | ✅ | change | Cannot be all spaces (default for input) |
| `textarea` | ✅ | change | Cannot be all spaces/newlines |
| `editor` | ✅ | change | Rich text editor validation |

#### Selection Rules

| Rule name | Required | Trigger | Description |
|---|---|---|---|
| `select` | ✅ | change | Must select (for select/radio/checkbox/tree) |
| `cascader` | ✅ | change | Must complete cascade selection |

#### Upload Rules

| Rule name | Required | Trigger | Description |
|---|---|---|---|
| `upload` | ✅ | change | Must upload file(s) |

#### Format Rules

| Rule name | Required | Trigger | Description |
|---|---|---|---|
| `email` | ❌ | blur | Email format validation |
| `phone` | ✅ | blur | Chinese mobile number (1[3-9]xxxxxxxxx) |
| `password` | ✅ | blur | 8-32 chars, must include uppercase + lowercase + digit + special char |
| `password2` | ❌ | blur | Same as password but optional |
| `account` | ✅ | blur | 4-20 chars, letters and digits only |
| `vCode` | ✅ | blur | Must be exactly 4 digits |

#### Number Rules

| Rule name | Required | Trigger | Description |
|---|---|---|---|
| `number` | ❌ | — | Must be numeric type |
| `numberNotNull` | ✅ | blur | Must be numeric and not empty |
| `zhengZhengShu` | ✅ | blur | Must be a positive integer |
| `double` | ✅ | blur | Decimal with max 2 decimal places |
| `double2` | ❌ | blur | Same as double but optional |
| `wordnum` | ✅ | blur | Letters and digits only |
| `wordnum2` | ❌ | blur | Same as wordnum but optional |

### required — Three Value Types

```typescript
// 1. Static boolean
required: true

// 2. Vue Ref — reactive control
const isRequired = ref(false)
required: isRequired

// 3. Function — dynamic based on other fields
required: (formData) => !!formData.isCompany
```

### Validation Merge Strategy

- `IFormProps.rules` (form-level) + `IFormDescItem.rules` (field-level) are **merged** (appended, not overridden)
- If `rules` array contains an item with `required: true`, the field's `required` is automatically set to `true`

## Code Examples

### Using Built-in Rule Names

```typescript
const formDesc: IFormDesc = {
  name: { type: 'input', label: '姓名', required: true },
  phone: { type: 'input', label: '手机号', rules: 'phone' },
  email: { type: 'input', label: '邮箱', rules: 'email' },
  password: { type: 'password', label: '密码', rules: 'password' },
  amount: { type: 'nbinput', label: '金额', rules: 'double' }
}
```

### required with Auto-Selection

```typescript
// input + required → auto uses 'notAllBlank'
{ type: 'input', label: '名称', required: true }

// select + required → auto uses 'select'
{ type: 'select', label: '类型', required: true, options: [...] }

// upload + required → auto uses 'upload'
{ type: 'upload', label: '附件', required: true }
```

### Dynamic required via Function

```typescript
const formDesc: IFormDesc = {
  isCompany: { type: 'switch', label: '是否企业' },
  companyName: {
    type: 'input',
    label: '企业名称',
    required: (formData) => !!formData.isCompany
  },
  creditCode: {
    type: 'input',
    label: '信用代码',
    required: (formData) => !!formData.isCompany,
    vif: (formData) => !!formData.isCompany
  }
}
```

### Custom Validation Rule

```typescript
const formDesc: IFormDesc = {
  age: {
    type: 'nbinput',
    label: '年龄',
    rules: [{
      required: true,
      message: '请输入有效年龄 (18-120)',
      trigger: 'blur',
      validator: (rule: any, value: any, callback: any) => {
        if (!value) {
          callback(new Error('年龄不能为空'))
        } else if (value < 18 || value > 120) {
          callback(new Error('年龄必须在18到120之间'))
        } else {
          callback()
        }
      }
    }]
  }
}
```

### Manual Validation via ref

```typescript
const formRef = ref()

// Validate entire form
await formRef.value.validate()

// Validate specific field (triggered automatically on change)
// via @validateThis event on form items
```

## Anti-Patterns

### FAIL: Use wrong rule type for select

```typescript
// FAIL: notAllBlank checks string content, but select value is array/empty
type: { type: 'select', required: true, rules: 'notAllBlank' }
```

### PASS: Let system auto-select rule, or use 'select' explicitly

```typescript
// Best: just use required, system picks 'select' automatically
{ type: 'select', required: true, options: [...] }
```

### FAIL: Duplicate required in rules

```typescript
// FAIL: required:true generates a rule, adding another creates duplicates
{ required: true, rules: [{ required: true, message: '请输入' }] }
```

### PASS: Use one or the other

```typescript
// Option 1: Simple — just required
{ required: true }

// Option 2: Custom — only rules
{ rules: [{ required: true, message: '请输入', validator: customFn }] }
```

## Best Practices

1. Prefer `required: true` — let the system auto-select the correct validator based on `type`
2. Use string rule names (`rules: 'phone'`) for built-in validation, array only for custom logic
3. Use function form `required: (formData) => boolean` for dynamic mandatory fields
4. Custom validator signature: `(rule, value, callback) => void` — consistent with Element Plus
5. Set `trigger: 'blur'` for input validation, `'change'` for selection validation

## Related Skills

This is a foundational skill — referenced directly by:
- `el-plus-crud-form` — formDesc uses rules and required
