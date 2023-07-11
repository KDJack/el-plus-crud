declare const _default: import('vue').DefineComponent<
  {
    loading: {
      type: import('vue').PropType<boolean>
      required: true
      default: boolean
    }
    size: {
      type: import('vue').PropType<string>
      required: true
      default: string
    }
    modelValue: {
      type: import('vue').PropType<
        | {}
        | {
            [key: string]: any
          }
      >
    }
    isDialog: {
      type: import('vue').PropType<boolean>
      required: true
      default: boolean
    }
    column: {
      type: import('vue').PropType<IColumnItem[] | null>
      required: true
    }
    tbName: {
      type: import('vue').PropType<string>
      required: true
      default: string
    }
    toolbar: {
      type: import('vue').PropType<ITableToolbar | null>
      required: true
      default: null
    }
    isShowRefresh: {
      type: import('vue').PropType<boolean>
      required: true
      default: boolean
    }
  },
  {
    getData: () => any
  },
  unknown,
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  'query'[],
  'query',
  import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      loading: {
        type: import('vue').PropType<boolean>
        required: true
        default: boolean
      }
      size: {
        type: import('vue').PropType<string>
        required: true
        default: string
      }
      modelValue: {
        type: import('vue').PropType<
          | {}
          | {
              [key: string]: any
            }
        >
      }
      isDialog: {
        type: import('vue').PropType<boolean>
        required: true
        default: boolean
      }
      column: {
        type: import('vue').PropType<IColumnItem[] | null>
        required: true
      }
      tbName: {
        type: import('vue').PropType<string>
        required: true
        default: string
      }
      toolbar: {
        type: import('vue').PropType<ITableToolbar | null>
        required: true
        default: null
      }
      isShowRefresh: {
        type: import('vue').PropType<boolean>
        required: true
        default: boolean
      }
    }>
  > & {
    onQuery?: ((...args: any[]) => any) | undefined
  },
  {
    loading: boolean
    size: string
    isDialog: boolean
    tbName: string
    toolbar: ITableToolbar | null
    isShowRefresh: boolean
  },
  {}
>
export default _default
