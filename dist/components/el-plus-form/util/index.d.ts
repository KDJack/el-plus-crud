export declare function isDef(val: any): boolean
export declare function isUnDef(val: any): boolean
export declare function isFunction(val: any): boolean
/**
 * 获取随机字符串
 * @returns {string}
 */
export declare function getUID(): string
/**
 * 判断是否是移动端
 */
export declare function isMobile(): boolean
export declare function is(val: any, type: any): boolean
export declare function getSize(elem: any): {
  width: any
  height: any
}
export declare function castArray(value: any): any
export declare function castCategory(value: any, formData: any): any[]
export declare function castFileList(value: any): any
export declare function castString(value: any): any
export declare function castBoolean(value: any): boolean
export declare function castNumber(value: any): number
export declare function isEmpty(val: any): boolean
/**
 * 格式化表单字段
 * @param formData
 * @param formDesc
 */
export declare function valueFormat(formData: any, formDesc: any): void
/**
 *
 * @param val 数组转字符串
 */
export declare function arrayToStr(val: any): string
/**
 * 裁剪长度
 * @param str
 * @param len
 * @param isTransHz 是否转换汉字长度为2个英文字母长度
 */
export declare const cutString: (str: string | undefined, len: number, isTransHz?: boolean) => string
/**
 * 获取字符串长度
 * @type {(p1?:*)}
 */
export declare const getStrLength: (str: any) => number
