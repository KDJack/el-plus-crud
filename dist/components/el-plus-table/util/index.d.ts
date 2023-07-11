/**
 * 获取随机字符串
 * @returns {string}
 */
export declare function getUID(): string
export declare function is(val: any, type: any): boolean
/**
 * 判断是否是移动端
 */
export declare function isMobile(): boolean
/**
 * 处理按钮类型
 * @param item
 */
export declare function handelBtnType(item: any): Object
/**
 * 处理列表表头，list转Map
 */
export declare function handelListColumn(columnList: Array<IColumnItem>, minWidth?: string): any[]
/**
 * map转string
 * @param map
 * @param excludeList
 * @returns {string}
 */
export declare const mapToUrlStr: (map: any, excludeList?: any) => string
