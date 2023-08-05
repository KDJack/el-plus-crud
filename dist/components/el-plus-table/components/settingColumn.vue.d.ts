/**
 * 初始化选择列
 * @param init
 */
declare function initLocalCheckList(init?: Boolean): void;
declare const _default: import("vue").DefineComponent<{
    column: {
        type: import("vue").PropType<IColumnItem[]>;
        required: true;
    };
    tbName: {
        type: import("vue").PropType<string>;
        required: true;
    };
    size: {
        type: import("vue").PropType<string>;
        required: true;
    };
    showText: {
        type: import("vue").PropType<boolean>;
    };
}, {
    initCol: typeof initLocalCheckList;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    column: {
        type: import("vue").PropType<IColumnItem[]>;
        required: true;
    };
    tbName: {
        type: import("vue").PropType<string>;
        required: true;
    };
    size: {
        type: import("vue").PropType<string>;
        required: true;
    };
    showText: {
        type: import("vue").PropType<boolean>;
    };
}>>, {}, {}>;
export default _default;
