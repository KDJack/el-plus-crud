declare const _default: __VLS_WithTemplateSlots<
  import('vue').DefineComponent<
    {
      type: {
        type: import('vue').PropType<string>
        default: string
      }
      modelValue: {
        type: import('vue').PropType<any[] | null>
        default: null
      }
      isDialog: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      tableConfig: {
        type: import('vue').PropType<ITableConfig>
        required: true
      }
      isIndex: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      rowKey: {
        type: import('vue').PropType<string>
        default: string
      }
      isShowRefresh: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      isPager: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      pageSize: {
        type: import('vue').PropType<number>
        default: number
      }
      nullText: {
        type: import('vue').PropType<string>
        default: string
      }
      isEmptyImg: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      isDIYMain: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      selectList: {
        type: import('vue').PropType<any[] | []>
        default: () => never[]
      }
      colMinWidth: {
        type: import('vue').PropType<string>
        default: string
      }
    },
    {
      reload: (isTab?: boolean) => Promise<any[]>
      tableData: any[]
      changeSelect: (itemList: any[], isSelect?: boolean) => void
      resetSelect: () => void
    },
    unknown,
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    ('select' | 'update:modelValue' | 'selection' | 'selectAll' | 'getUrlConsumerIds' | 'tabChange' | 'expandChange')[],
    'select' | 'update:modelValue' | 'selection' | 'selectAll' | 'getUrlConsumerIds' | 'tabChange' | 'expandChange',
    import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
    Readonly<
      import('vue').ExtractPropTypes<{
        type: {
          type: import('vue').PropType<string>
          default: string
        }
        modelValue: {
          type: import('vue').PropType<any[] | null>
          default: null
        }
        isDialog: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        tableConfig: {
          type: import('vue').PropType<ITableConfig>
          required: true
        }
        isIndex: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        rowKey: {
          type: import('vue').PropType<string>
          default: string
        }
        isShowRefresh: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        isPager: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        pageSize: {
          type: import('vue').PropType<number>
          default: number
        }
        nullText: {
          type: import('vue').PropType<string>
          default: string
        }
        isEmptyImg: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        isDIYMain: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        selectList: {
          type: import('vue').PropType<any[] | []>
          default: () => never[]
        }
        colMinWidth: {
          type: import('vue').PropType<string>
          default: string
        }
      }>
    > & {
      onSelect?: ((...args: any[]) => any) | undefined
      'onUpdate:modelValue'?: ((...args: any[]) => any) | undefined
      onSelection?: ((...args: any[]) => any) | undefined
      onSelectAll?: ((...args: any[]) => any) | undefined
      onGetUrlConsumerIds?: ((...args: any[]) => any) | undefined
      onTabChange?: ((...args: any[]) => any) | undefined
      onExpandChange?: ((...args: any[]) => any) | undefined
    },
    {
      type: string
      modelValue: Array<any> | null
      isDialog: boolean
      isIndex: boolean
      rowKey: string
      isShowRefresh: boolean
      isPager: boolean
      pageSize: number
      nullText: string
      isEmptyImg: boolean
      isDIYMain: boolean
      selectList: Array<any> | []
      colMinWidth: string
    },
    {}
  >,
  {
    main?(_: { tableData: any[] }): any
    firstColumn?(_: {}): any
    bottom?(_: {}): any
  }
>
export default _default
type __VLS_WithTemplateSlots<T, S> = T & {
  new (): {
    $slots: S
  }
}
