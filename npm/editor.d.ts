import { AllowedComponentProps } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { PropType } from 'vue';
import { VNodeProps } from 'vue';

export declare const Editor: DefineComponent<{
    readonly: {
        type: PropType<boolean>;
    };
    modelValue: {
        type: PropType<IEditor_Content_Line[]>;
        required: true;
    };
    border: {
        type: PropType<boolean>;
    };
    popMenuList: {
        type: PropType<{
            type: any;
            title: string;
        }[]>;
    };
    placeholder: {
        type: PropType<string>;
    };
    quoteType: {
        type: PropType<any>;
    };
}, {
    insertConfig: (itemList: IEditor_Content_Line_Config[]) => void;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
    "update:modelValue": (value: IEditor_Content_Line[]) => void;
    uploadFile: (file: File, handleFunc: (fileId: string, path: string) => void) => void;
    popMenuClick: (type: any, handleFunc: (item: IEditor_Content_Line_Config) => void) => void;
    customAnchorClick: (type: any, value: string, link: string, label: string) => void;
    quoteList: (keyword: string, handleFunc: (list: {
        value: string;
        label: string;
        photo: string;
    }[]) => void) => void;
    metaEnter: () => void;
    linkClick: (type: any, value: string, x: number, y: number) => void;
    setLineConfigType: (linkElement: HTMLElement, objConfig: IEditor_Content_Line_Config) => void;
    getLineConfigType: (config: IEditor_Content_Line_Config, linkElement: HTMLElement) => void;
}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    readonly: {
        type: PropType<boolean>;
    };
    modelValue: {
        type: PropType<IEditor_Content_Line[]>;
        required: true;
    };
    border: {
        type: PropType<boolean>;
    };
    popMenuList: {
        type: PropType<{
            type: any;
            title: string;
        }[]>;
    };
    placeholder: {
        type: PropType<string>;
    };
    quoteType: {
        type: PropType<any>;
    };
}>> & {
    onQuoteList?: (keyword: string, handleFunc: (list: {
        value: string;
        label: string;
        photo: string;
    }[]) => void) => any;
    "onUpdate:modelValue"?: (value: IEditor_Content_Line[]) => any;
    onUploadFile?: (file: File, handleFunc: (fileId: string, path: string) => void) => any;
    onPopMenuClick?: (type: any, handleFunc: (item: IEditor_Content_Line_Config) => void) => any;
    onCustomAnchorClick?: (type: any, value: string, link: string, label: string) => any;
    onMetaEnter?: () => any;
    onLinkClick?: (type: any, value: string, x: number, y: number) => any;
    onSetLineConfigType?: (linkElement: HTMLElement, objConfig: IEditor_Content_Line_Config) => any;
    onGetLineConfigType?: (config: IEditor_Content_Line_Config, linkElement: HTMLElement) => any;
}, {}, {}>;

declare type IEditor_Content_Line = {
    arr: IEditor_Content_Line_Config[];
    selectStartIndexPath?: number[];
    selectEndIndexPath?: number[];
};

declare type IEditor_Content_Line_Config = {
    style?: IEditor_Content_Line_Style;
    value: string;
    link?: string;
    type: any;
    width?: number;
    label?: string;
};

declare type IEditor_Content_Line_Style = {
    fontStyle?: string;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    textDecoration?: string;
    fontSize?: string;
};

declare const root: {
    install(App: any): void;
};
export default root;

export { }
