declare const _default: __VLS_WithTemplateSlots<
  import('vue').DefineComponent<
    {
      title: {
        type: import('vue').PropType<string>
        default: string
      }
      modelValue: {
        type: import('vue').PropType<
          | {}
          | {
              [key: string]: any
            }
        >
        default: () => {}
      }
      success: {
        type: import('vue').PropType<Function>
      }
      show: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      tableRef: {
        type: import('vue').PropType<any>
      }
      successTip: {
        type: import('vue').PropType<string>
        default: string
      }
    },
    {
      open: () => void
      close: () => void
    },
    unknown,
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    ('update:show' | 'update:modelValue')[],
    'update:show' | 'update:modelValue',
    import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
    Readonly<
      import('vue').ExtractPropTypes<{
        title: {
          type: import('vue').PropType<string>
          default: string
        }
        modelValue: {
          type: import('vue').PropType<
            | {}
            | {
                [key: string]: any
              }
          >
          default: () => {}
        }
        success: {
          type: import('vue').PropType<Function>
        }
        show: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        tableRef: {
          type: import('vue').PropType<any>
        }
        successTip: {
          type: import('vue').PropType<string>
          default: string
        }
      }>
    > & {
      'onUpdate:show'?: ((...args: any[]) => any) | undefined
      'onUpdate:modelValue'?: ((...args: any[]) => any) | undefined
    },
    {
      title: string
      modelValue:
        | {}
        | {
            [key: string]: any
          }
      show: boolean
      successTip: string
    },
    {}
  >,
  {
    header?(_: {}): any
    top?(_: {}): any
    default?(_: {}): any
  }
>
export default _default
type __VLS_WithTemplateSlots<T, S> = T & {
  new (): {
    $slots: S
  }
}
