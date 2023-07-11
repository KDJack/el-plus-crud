/**
 * 获取通用的校验规则
 */
/**
 * 不能为空
 */
export declare const notNull: {
  required: boolean
  trigger: string
  validator: typeof validateInputNotNull
}[]
/**
 * 不能全是空格
 */
export declare const notAllBlank: {
  required: boolean
  trigger: string
  validator: typeof validateInputNotAllBlank
}[]
/**
 * 必须是数字
 */
export declare const number: {
  type: string
  message: string
}[]
/**
 * 校验验证码
 */
export declare const vCode: {
  required: boolean
  trigger: string
  validator: typeof validateValidateCode
}[]
/**
 * 校验邮箱
 */
export declare const email: {
  trigger: string
  validator: typeof validateEmail
}[]
/**
 * 校验手机号
 */
export declare const phone: {
  required: boolean
  trigger: string
  validator: typeof validatePhone
}[]
/**
 * 校验密码
 */
export declare const password: {
  required: boolean
  trigger: string
  validator: typeof validatePassword
}[]
/**
 * 校验密码
 */
export declare const password2: {
  trigger: string
  validator: typeof validatePassword
}[]
/**
 * 校验账户
 */
export declare const account: {
  required: boolean
  trigger: string
  validator: typeof validateAccount
}[]
/**
 * 校验英文字母加数字
 */
export declare const wordnum: {
  trigger: string
  validator: typeof validateWordNumber
}[]
export declare const wordnum2: {
  required: boolean
  trigger: string
  validator: typeof validateWordNumber
}[]
/**
 * 必须是数字且不为空
 */
export declare const numberNotNull: (
  | {
      required: boolean
      message: string
      trigger: string
      type?: undefined
    }
  | {
      type: string
      message: string
      required?: undefined
      trigger?: undefined
    }
)[]
/**
 * 正整数
 */
export declare const zhengZhengShu: {
  required: boolean
  trigger: string
  validator: typeof validateZhengZhengShu
}[]
/**
 * Double类型
 */
export declare const double: {
  required: boolean
  trigger: string
  validator: typeof validateDouble
}[]
/**
 * Double类型且必填
 */
export declare const double2: {
  trigger: string
  validator: typeof validateDouble
}[]
/**
 * 选择
 */
export declare const select: {
  required: boolean
  trigger: string
  validator: typeof validateSelect
}[]
/**
 * 级联选择
 * @type {[*]}
 */
export declare const cascader: {
  required: boolean
  trigger: string
  validator: typeof validateSelect
}[]
/**
 * 必须上传
 */
export declare const upload: {
  required: boolean
  trigger: string
  validator: typeof validateUpload
}[]
/**
 * 文本域
 */
export declare const textarea: {
  required: boolean
  trigger: string
  validator: typeof validateTextarea
}[]
/**
 * 正整数校验
 * @param rule
 * @param value
 * @param callback
 */
declare function validateZhengZhengShu(rule: any, value: any, callback?: any): void
/**
 * 选择
 * @param rule
 * @param value
 * @param callback
 */
declare function validateValidateCode(rule: any, value: any, callback?: any): void
/**
 * 选择
 * @param rule
 * @param value
 * @param callback
 */
declare function validateInputNotNull(rule: any, value: any, callback?: any): void
/**
 * 不能全是空格
 * @param rule
 * @param value
 * @param callback
 */
declare function validateInputNotAllBlank(rule: any, value: any, callback?: any): void
/**
 * 选择
 * @param rule
 * @param value
 * @param callback
 */
declare function validateSelect(rule: any, value: any, callback?: any): void
/**
 * 上传
 * @param rule
 * @param value
 * @param callback
 */
declare function validateUpload(rule: any, value: any, callback?: any): void
/**
 * 文本域
 * @param rule
 * @param value
 * @param callback
 */
declare function validateTextarea(rule: any, value: any, callback?: any): void
/**
 * 小数校验规则
 * @param rule
 * @param value
 * @param callback
 */
declare function validateDouble(rule: any, value: any, callback?: any): void
/**
 * 校验邮箱
 * @param rule
 * @param value
 * @param callback
 */
declare function validateEmail(rule: any, value: any, callback?: any): void
/**
 * 校验手机号
 * @param rule
 * @param value
 * @param callback
 */
declare function validatePhone(rule: any, value: any, callback?: any): void
/**
 * 校验密码
 * @param rule
 * @param value
 * @param callback
 */
export declare function validatePassword(rule: any, value: any, callback?: any): void
/**
 * 校验密码
 * @param rule
 * @param value
 * @param callback
 */
export declare function validatePassword2(rule: any, value: any, callback?: any): void
/**
 * 校验账户
 * @param rule
 * @param value
 * @param callback
 */
declare function validateAccount(rule: any, value: any, callback?: any): void
/**
 * 校验字母和数字组成
 * @param rule
 * @param value
 * @param callback
 */
declare function validateWordNumber(rule: any, value: any, callback?: any): void
export {}
