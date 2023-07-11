export interface IMixinsProps {
  modelValue?: any
  field: string
  rowIndex?: number
  loading?: boolean
  desc: {
    [key: string]: any
  }
  formData: {
    [key: string]: any
  }
  isMobile?: boolean
  defineEmits?: any
}
/**
 * 获取属性
 * @param props
 * @param customAttrs
 * @returns
 */
export declare const getAttrs: (
  props: IMixinsProps,
  customAttrs?:
    | {
        [key: string]: any
      }
    | undefined
) => Promise<any>
/**
 * 获取事件
 * @returns
 */
export declare const getEvents: (props: IMixinsProps) => any
