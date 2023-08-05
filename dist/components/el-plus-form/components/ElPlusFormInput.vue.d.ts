declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<{
    modelValue: {
        type: import("vue").PropType<string | null>;
    };
    field: {
        type: import("vue").PropType<string>;
        required: true;
    };
    desc: {
        type: import("vue").PropType<{
            [key: string]: any;
        }>;
        required: true;
    };
    formData: {
        type: import("vue").PropType<{
            [key: string]: any;
        }>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("validateThis" | "update:modelValue")[], "validateThis" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: import("vue").PropType<string | null>;
    };
    field: {
        type: import("vue").PropType<string>;
        required: true;
    };
    desc: {
        type: import("vue").PropType<{
            [key: string]: any;
        }>;
        required: true;
    };
    formData: {
        type: import("vue").PropType<{
            [key: string]: any;
        }>;
        required: true;
    };
}>> & {
    onValidateThis?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {}, {}>, Partial<Record<number, (_: {}) => any>>>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
