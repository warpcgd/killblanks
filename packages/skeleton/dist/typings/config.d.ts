/**
 * constants
 */
export declare const TRANSPARENT = "transparent";
export declare const EXT_REG: RegExp;
export declare const BASE64: RegExp;
export declare const GRADIENT_REG: RegExp;
export declare const DISPLAY_NONE: RegExp;
export declare const PRE_REMOVE_TAGS: string[];
export declare const AFTER_REMOVE_TAGS: string[];
export declare const SKELETON_STYLE = "sk-style";
export declare const CLASS_NAME_PREFEX = "sk-";
export declare const CONSOLE_SELECTOR = ".sk-console";
export declare const SMALLEST_BASE64 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
export declare const MOCK_TEXT_ID = "sk-text-id";
export declare const Node: {
    new (): Node;
    prototype: Node;
    readonly ATTRIBUTE_NODE: number;
    readonly CDATA_SECTION_NODE: number;
    readonly COMMENT_NODE: number;
    readonly DOCUMENT_FRAGMENT_NODE: number;
    readonly DOCUMENT_NODE: number;
    readonly DOCUMENT_POSITION_CONTAINED_BY: number;
    readonly DOCUMENT_POSITION_CONTAINS: number;
    readonly DOCUMENT_POSITION_DISCONNECTED: number;
    readonly DOCUMENT_POSITION_FOLLOWING: number;
    readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: number;
    readonly DOCUMENT_POSITION_PRECEDING: number;
    readonly DOCUMENT_TYPE_NODE: number;
    readonly ELEMENT_NODE: number;
    readonly ENTITY_NODE: number;
    readonly ENTITY_REFERENCE_NODE: number;
    readonly NOTATION_NODE: number;
    readonly PROCESSING_INSTRUCTION_NODE: number;
    readonly TEXT_NODE: number;
};
export declare const DEFAULTMOD: {
    name: string;
    text: {
        color: string;
    };
    image: {
        shape: string;
        color: string;
        shapeOpposite: HTMLElement[];
    };
    button: {
        color: string;
        excludes: HTMLElement[];
    };
    svg: {
        color: string;
        shape: string;
        shapeOpposite: HTMLElement[];
    };
    pseudo: {
        color: string;
        shape: string;
        shapeOpposite: HTMLElement[];
    };
    excludes: HTMLElement[];
    remove: string[];
    hide: string[];
    grayBlock: string[];
    skipBase64: boolean;
    repeatLI: boolean;
    skipPseudo: boolean;
    cssUnit: string;
    decimal: number;
    animation: boolean;
    transition: boolean;
};
export declare const AUTOMATICMOD: {
    name: string;
    text: {
        color: string;
    };
    image: {
        shape: string;
        color: string;
        shapeOpposite: HTMLElement[];
    };
    button: {
        color: string;
        excludes: HTMLElement[];
    };
    svg: {
        color: string;
        shape: string;
        shapeOpposite: HTMLElement[];
    };
    pseudo: {
        color: string;
        shape: string;
        shapeOpposite: HTMLElement[];
    };
    excludes: HTMLElement[];
    remove: string[];
    hide: string[];
    grayBlock: string[];
    skipBase64: boolean;
    repeatLI: boolean;
    skipPseudo: boolean;
    cssUnit: string;
    decimal: number;
    animation: boolean;
    transition: boolean;
} & {
    name: string;
    image: {
        color: string;
    };
};
