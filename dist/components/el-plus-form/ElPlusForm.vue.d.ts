export interface IFormProps {
  formDesc?: IFormDesc | null
  modelValue?:
    | {
        [key: string]: any
      }
    | {}
  formAttrs?: {
    [key: string]: any
  }
  rules?: {
    [key: string]: any
  } | null
  isLoading?: boolean
  requestFn?: Function | null
  updateFn?: Function | null
  showBtns?: boolean
  showSubmit?: boolean
  submitBtnText?: string
  showCancel?: boolean
  cancelBtnText?: string
  showReset?: boolean
  resetBtnText?: string
  showLabel?: boolean
  labelWidth?: number | string
  disabled?: boolean
  readonly?: boolean
  isDialog?: boolean
  optionsFn?: Function | null
  size?: string
  column?: number
  isTable?: boolean
  idKey?: string
  maxWidth?: string
}
declare const _default: __VLS_WithTemplateSlots<
  import('vue').DefineComponent<
    {
      size: {
        type: import('vue').PropType<string>
        default: string
      }
      formDesc: {
        type: import('vue').PropType<IFormDesc | null>
        default: null
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
      formAttrs: {
        type: import('vue').PropType<{
          [key: string]: any
        }>
        default: () => {}
      }
      rules: {
        type: import('vue').PropType<{
          [key: string]: any
        } | null>
        default: null
      }
      isLoading: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      requestFn: {
        type: import('vue').PropType<Function | null>
        default: null
      }
      updateFn: {
        type: import('vue').PropType<Function | null>
        default: null
      }
      showBtns: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      showSubmit: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      submitBtnText: {
        type: import('vue').PropType<string>
        default: string
      }
      showCancel: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      cancelBtnText: {
        type: import('vue').PropType<string>
        default: string
      }
      showReset: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      resetBtnText: {
        type: import('vue').PropType<string>
        default: string
      }
      showLabel: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      labelWidth: {
        type: import('vue').PropType<string | number>
        default: string
      }
      disabled: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      readonly: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      isDialog: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      optionsFn: {
        type: import('vue').PropType<Function | null>
        default: null
      }
      column: {
        type: import('vue').PropType<number>
        default: number
      }
      isTable: {
        type: import('vue').PropType<boolean>
        default: boolean
      }
      idKey: {
        type: import('vue').PropType<string>
        default: string
      }
      maxWidth: {
        type: import('vue').PropType<string>
      }
    },
    {
      submit: () => Promise<void>
      getData: () => {
        [key: string]: any
      }
      validate: () => Promise<unknown>
      reset: () => void
      clearValid: () => void
      clear: () => void
      changeValidImg: () => void
    },
    unknown,
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    ('request' | 'reset' | 'cancel')[],
    'request' | 'reset' | 'cancel',
    import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
    Readonly<
      import('vue').ExtractPropTypes<{
        size: {
          type: import('vue').PropType<string>
          default: string
        }
        formDesc: {
          type: import('vue').PropType<IFormDesc | null>
          default: null
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
        formAttrs: {
          type: import('vue').PropType<{
            [key: string]: any
          }>
          default: () => {}
        }
        rules: {
          type: import('vue').PropType<{
            [key: string]: any
          } | null>
          default: null
        }
        isLoading: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        requestFn: {
          type: import('vue').PropType<Function | null>
          default: null
        }
        updateFn: {
          type: import('vue').PropType<Function | null>
          default: null
        }
        showBtns: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        showSubmit: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        submitBtnText: {
          type: import('vue').PropType<string>
          default: string
        }
        showCancel: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        cancelBtnText: {
          type: import('vue').PropType<string>
          default: string
        }
        showReset: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        resetBtnText: {
          type: import('vue').PropType<string>
          default: string
        }
        showLabel: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        labelWidth: {
          type: import('vue').PropType<string | number>
          default: string
        }
        disabled: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        readonly: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        isDialog: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        optionsFn: {
          type: import('vue').PropType<Function | null>
          default: null
        }
        column: {
          type: import('vue').PropType<number>
          default: number
        }
        isTable: {
          type: import('vue').PropType<boolean>
          default: boolean
        }
        idKey: {
          type: import('vue').PropType<string>
          default: string
        }
        maxWidth: {
          type: import('vue').PropType<string>
        }
      }>
    > & {
      onReset?: ((...args: any[]) => any) | undefined
      onRequest?: ((...args: any[]) => any) | undefined
      onCancel?: ((...args: any[]) => any) | undefined
    },
    {
      size: string
      formDesc: IFormDesc | null
      modelValue:
        | {}
        | {
            [key: string]: any
          }
      formAttrs: {
        [key: string]: any
      }
      rules: {
        [key: string]: any
      } | null
      isLoading: boolean
      requestFn: Function | null
      updateFn: Function | null
      showBtns: boolean
      showSubmit: boolean
      submitBtnText: string
      showCancel: boolean
      cancelBtnText: string
      showReset: boolean
      resetBtnText: string
      showLabel: boolean
      labelWidth: string | number
      disabled: boolean
      readonly: boolean
      isDialog: boolean
      optionsFn: Function | null
      column: number
      isTable: boolean
      idKey: string
    },
    {}
  >,
  {
    top?(_: {
      formData:
        | {}
        | {
            [key: string]: any
          }
    }): any
    row?(_: {}): any
    default?(_: {}): any
    'form-btn'?(_: {
      data:
        | {}
        | {
            [key: string]: any
          }
    }): any
    bottom?(_: {
      formData:
        | {}
        | {
            [key: string]: any
          }
    }): any
    'form-footer'?(_: {
      formData:
        | {}
        | {
            [key: string]: any
          }
    }): any
  }
>
export default _default
type __VLS_WithTemplateSlots<T, S> = T & {
  new (): {
    $slots: S
  }
}
