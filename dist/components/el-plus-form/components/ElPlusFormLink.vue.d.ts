declare const _default: import('vue').DefineComponent<
  {
    modelValue: {
      type: import('vue').PropType<[]>
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
  ('change' | 'input' | 'validateThis' | 'update:modelValue')[],
  'change' | 'input' | 'validateThis' | 'update:modelValue',
  import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps,
  Readonly<
    import('vue').ExtractPropTypes<{
      modelValue: {
        type: import('vue').PropType<[]>
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
      disabled: {
        type: import('vue').PropType<boolean>
      }
    }>
  > & {
    onChange?: ((...args: any[]) => any) | undefined
    onInput?: ((...args: any[]) => any) | undefined
    onValidateThis?: ((...args: any[]) => any) | undefined
    'onUpdate:modelValue'?: ((...args: any[]) => any) | undefined
  },
  {},
  {}
>
export default _default
