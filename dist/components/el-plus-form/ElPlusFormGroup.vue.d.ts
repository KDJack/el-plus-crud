declare const _default: __VLS_WithTemplateSlots<
  import('vue').DefineComponent<
    {
      modelValue: {
        type: import('vue').PropType<
          | {}
          | {
              [key: string]: any
            }
        >
        required: true
      }
      formGroup: {
        type: import('vue').PropType<IFormGroupConfig>
        required: true
      }
      isLoading: {
        type: import('vue').PropType<boolean>
      }
    },
    {},
    unknown,
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    ('request' | 'update:show' | 'update:modelValue' | 'before-validate' | 'before-request' | 'request-success' | 'request-error' | 'request-end')[],
    'request' | 'update:show' | 'update:modelValue' | 'before-validate' | 'before-request' | 'request-success' | 'request-error' | 'request-end',
    import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
    Readonly<
      import('vue').ExtractPropTypes<{
        modelValue: {
          type: import('vue').PropType<
            | {}
            | {
                [key: string]: any
              }
          >
          required: true
        }
        formGroup: {
          type: import('vue').PropType<IFormGroupConfig>
          required: true
        }
        isLoading: {
          type: import('vue').PropType<boolean>
        }
      }>
    > & {
      onRequest?: ((...args: any[]) => any) | undefined
      'onUpdate:show'?: ((...args: any[]) => any) | undefined
      'onUpdate:modelValue'?: ((...args: any[]) => any) | undefined
      'onBefore-validate'?: ((...args: any[]) => any) | undefined
      'onBefore-request'?: ((...args: any[]) => any) | undefined
      'onRequest-success'?: ((...args: any[]) => any) | undefined
      'onRequest-error'?: ((...args: any[]) => any) | undefined
      'onRequest-end'?: ((...args: any[]) => any) | undefined
    },
    {},
    {}
  >,
  Partial<Record<string, (_: {}) => any>>
>
export default _default
type __VLS_WithTemplateSlots<T, S> = T & {
  new (): {
    $slots: S
  }
}
