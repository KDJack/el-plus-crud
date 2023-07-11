declare const _default: __VLS_WithTemplateSlots<
  import('vue').DefineComponent<
    {
      modelValue: {
        type: import('vue').PropType<string | number | null>
      }
      field: {
        type: import('vue').PropType<string>
        required: true
      }
      loading: {
        type: import('vue').PropType<boolean>
      }
      desc: {
        type: import('vue').PropType<{
          [key: string]: any
        }>
        required: true
      }
      formData: {
        type: import('vue').PropType<{
          [key: string]: any
        }>
        required: true
      }
      rowIndex: {
        type: import('vue').PropType<number>
      }
    },
    {},
    unknown,
    {},
    {},
    import('vue').ComponentOptionsMixin,
    import('vue').ComponentOptionsMixin,
    'update:modelValue'[],
    'update:modelValue',
    import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
    Readonly<
      import('vue').ExtractPropTypes<{
        modelValue: {
          type: import('vue').PropType<string | number | null>
        }
        field: {
          type: import('vue').PropType<string>
          required: true
        }
        loading: {
          type: import('vue').PropType<boolean>
        }
        desc: {
          type: import('vue').PropType<{
            [key: string]: any
          }>
          required: true
        }
        formData: {
          type: import('vue').PropType<{
            [key: string]: any
          }>
          required: true
        }
        rowIndex: {
          type: import('vue').PropType<number>
        }
      }>
    > & {
      'onUpdate:modelValue'?: ((...args: any[]) => any) | undefined
    },
    {},
    {}
  >,
  Partial<Record<number, (_: {}) => any>>
>
export default _default
type __VLS_WithTemplateSlots<T, S> = T & {
  new (): {
    $slots: S
  }
}
