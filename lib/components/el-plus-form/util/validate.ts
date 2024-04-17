/**
 * 获取通用的校验规则
 */

/**
 * 不能为空
 */
export const notNull = [{ required: true, trigger: 'change', validator: validateInputNotNull }]

/**
 * 不能全是空格
 */
export const notAllBlank = [{ required: true, trigger: 'change', validator: validateInputNotAllBlank }]

/**
 * 必须是数字
 */
export const number = [{ type: 'number', message: '请填入数字！' }]

/**
 * 校验验证码
 */
export const vCode = [{ required: true, trigger: 'blur', validator: validateValidateCode }]

/**
 * 校验邮箱
 */
export const email = [{ trigger: 'blur', validator: validateEmail }]

/**
 * 校验手机号
 */
export const phone = [{ required: true, trigger: 'blur', validator: validatePhone }]

/**
 * 校验密码
 */
export const password = [{ required: true, trigger: 'blur', validator: validatePassword }]

/**
 * 校验密码
 */
export const password2 = [{ trigger: 'blur', validator: validatePassword }]

/**
 * 校验账户
 */
export const account = [{ required: true, trigger: 'blur', validator: validateAccount }]

/**
 * 校验英文字母加数字
 */
export const wordnum = [{ required: true, trigger: 'blur', validator: validateWordNumber }]
export const wordnum2 = [{ trigger: 'blur', validator: validateWordNumber }]

/**
 * 必须是数字且不为空
 */
export const numberNotNull = [
  { required: true, message: '不能为空！', trigger: 'blur' },
  { type: 'number', message: '请填入数字！' }
]

/**
 * 正整数
 */
export const zhengZhengShu = [{ required: true, trigger: 'blur', validator: validateZhengZhengShu }]

/**
 * Double类型
 */
export const double = [{ required: true, trigger: 'blur', validator: validateDouble }]
/**
 * Double类型且必填
 */
export const double2 = [{ trigger: 'blur', validator: validateDouble }]

/**
 * 选择
 */
export const select = [{ required: true, trigger: 'change', validator: validateSelect }]

/**
 * 级联选择
 * @type {[*]}
 */
export const cascader = [{ required: true, trigger: 'change', validator: validateCascader }]

/**
 * 必须上传
 */
export const upload = [{ required: true, trigger: 'change', validator: validateUpload }]

/**
 * 文本域
 */
export const textarea = [{ required: true, trigger: 'change', validator: validateTextarea }]

/**
 * 富文本编辑器
 */
export const editor = [{ required: true, trigger: 'change', validator: validateEditor }]

/**
 * 正整数校验
 * @param rule
 * @param value
 * @param callback
 */
function validateZhengZhengShu(rule: any, value: any, callback?: any) {
  if (!/^[1-9]\d*$/.test(value * 1 + '')) {
    callback(new Error('请输入正整数！'))
  } else {
    callback()
  }
}

/**
 * 选择
 * @param rule
 * @param value
 * @param callback
 */
function validateValidateCode(rule: any, value: any, callback?: any) {
  if (value.length !== 4) {
    callback(new Error('验证码必须是4位！'))
  } else {
    callback()
  }
}

/**
 * 选择
 * @param rule
 * @param value
 * @param callback
 */
function validateInputNotNull(rule: any, value: any, callback?: any) {
  if (rule.required && (typeof value === 'undefined' || value === '' || value === null)) {
    callback(new Error('此项必填！'))
  } else {
    callback()
  }
}

/**
 * 不能全是空格
 * @param rule
 * @param value
 * @param callback
 */
function validateInputNotAllBlank(rule: any, value: any, callback?: any) {
  if (rule.required && (typeof value === 'undefined' || value === '' || value === null)) {
    callback(new Error('此项必填！'))
  } else {
    if (typeof value === 'number') {
      value = value + ''
    }
    if (typeof value === 'string' && value.match(/^[ ]*$/)) {
      callback(new Error('不能全是空格!'))
    } else {
      callback()
    }
  }
}

/**
 * 选择
 * @param rule
 * @param value
 * @param callback
 */
function validateSelect(rule: any, value: any, callback?: any) {
  if (value === null || typeof value === 'undefined' || value === '' || value?.length <= 0) {
    callback(new Error('请选择！'))
  } else {
    callback()
  }
}

/**
 * 数组选择
 * @param rule
 * @param value
 * @param callback
 */
function validateCascader(rule: any, value: any, callback?: any) {
  if (value === null || typeof value === 'undefined' || value === '' || value.length <= 0 || value[0] == null) {
    callback(new Error('请选择！'))
  } else {
    callback()
  }
}

/**
 * 上传
 * @param rule
 * @param value
 * @param callback
 */
function validateUpload(rule: any, value: any, callback?: any) {
  if (value === null || typeof value === 'undefined' || value === '' || value.length <= 0) {
    callback(new Error('请上传！'))
  } else {
    callback()
  }
}

/**
 * 文本域
 * @param rule
 * @param value
 * @param callback
 */
function validateTextarea(rule: any, value: any, callback?: any) {
  if (rule.required && (typeof value === 'undefined' || value === '' || value === null)) {
    callback(new Error('此项必填！'))
  } else if (!value.replace(/\n/g, '')) {
    callback(new Error('不能全是换行！'))
  } else if (typeof value === 'string' && value.replace(/\n/g, '').match(/^[ ]*$/)) {
    callback(new Error('不能全是空格!'))
  } else {
    callback()
  }
}
/**
 * 富文本编辑器
 * @param rule
 * @param value
 * @param callback
 */
function validateEditor(rule: any, value: any, callback?: any) {
  if (rule.required && (typeof value === 'undefined' || value === '' || value === null)) {
    callback(new Error('此项必填！'))
  } else if (!value.replace(/\n/g, '')) {
    callback(new Error('不能全是换行！'))
  } else if (typeof value === 'string' && value.replace(/\n/g, '').match(/^[ ]*$/)) {
    callback(new Error('不能全是空格!'))
  } else {
    callback()
  }
}

/**
 * 小数校验规则
 * @param rule
 * @param value
 * @param callback
 */
function validateDouble(rule: any, value: any, callback?: any) {
  if (!/^\d+(\.(\d{1}|\d{2}))?$/.test(value * 1 + '')) {
    callback(new Error('小数格式错误(最多两位)!'))
  } else {
    callback()
  }
}

/**
 * 校验邮箱
 * @param rule
 * @param value
 * @param callback
 */
function validateEmail(rule: any, value: any, callback?: any) {
  if (!value) {
    callback(new Error('邮箱必填'))
  } else if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
    callback(new Error('邮箱格式错误!'))
  } else {
    callback()
  }
}

/**
 * 校验手机号
 * @param rule
 * @param value
 * @param callback
 */
function validatePhone(rule: any, value: any, callback?: any) {
  if (!value) {
    callback(new Error('手机号必填'))
  } else if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
    callback(new Error('手机号格式错误!'))
  } else {
    callback()
  }
}

/**
 * 校验密码
 * @param rule
 * @param value
 * @param callback
 */
export function validatePassword(rule: any, value: any, callback?: any) {
  if (!value || !/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?=.*[~!@#$%^&*])(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,32}$/.test(value)) {
    callback(new Error('密码为8-32位字母大小写+特殊字符+数字!'))
  } else {
    callback()
  }
}

/**
 * 校验密码
 * @param rule
 * @param value
 * @param callback
 */
export function validatePassword2(rule: any, value: any, callback?: any) {
  if (value && !/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?=.*[~!@#$%^&*])(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,32}$/.test(value)) {
    callback(new Error('密码为8-32位字母大小写+特殊字符+数字!'))
  } else {
    callback()
  }
}

/**
 * 校验账户
 * @param rule
 * @param value
 * @param callback
 */
function validateAccount(rule: any, value: any, callback?: any) {
  if (rule.required && (typeof value === 'undefined' || value === '' || value === null)) {
    callback(new Error('此项必填！'))
  } else if (value && !/^([a-z,A-z,0-9]){4,20}$/.test(value)) {
    callback(new Error('账号为4-20位字母或数字!'))
  } else {
    callback()
  }
}

/**
 * 校验字母和数字组成
 * @param rule
 * @param value
 * @param callback
 */
function validateWordNumber(rule: any, value: any, callback?: any) {
  if (rule.required && (typeof value === 'undefined' || value === '' || value === null)) {
    callback(new Error('此项必填！'))
  } else if (value && !/^([a-z,A-z,0-9])+$/.test(value)) {
    callback(new Error('请输入字母或数字!'))
  } else {
    callback()
  }
}
