declare const _default: import('vue').DefineComponent<
  {
    modelValue: {
      type: import('vue').PropType<number | null>
    }
    field: {
      type: import('vue').PropType<string>
      required: true
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
    disabled: {
      type: import('vue').PropType<boolean>
    }
  },
  {},
  unknown,
  {},
  {},
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  ('validateThis' | 'update:modelValue')[],
  'validateThis' | 'update:modelValue',
  import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      modelValue: {
        type: import('vue').PropType<number | null>
      }
      field: {
        type: import('vue').PropType<string>
        required: true
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
      disabled: {
        type: import('vue').PropType<boolean>
      }
    }>
  > & {
    onValidateThis?: ((...args: any[]) => any) | undefined
    'onUpdate:modelValue'?: ((...args: any[]) => any) | undefined
  },
  {},
  {}
>
export default _default
