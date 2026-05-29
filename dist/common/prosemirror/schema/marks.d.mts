export namespace em {
    let parseDOM: ({
        tag: string;
        getAttrs: (el: any) => false | undefined;
        style?: undefined;
    } | {
        tag: string;
        getAttrs?: undefined;
        style?: undefined;
    } | {
        style: string;
        tag?: undefined;
        getAttrs?: undefined;
    })[];
    function toDOM(): (string | number)[];
}
export namespace strong {
    let parseDOM_1: ({
        tag: string;
        style?: undefined;
        getAttrs?: undefined;
    } | {
        style: string;
        getAttrs: (weight: any) => false | null;
        tag?: undefined;
    })[];
    export { parseDOM_1 as parseDOM };
    export function toDOM_1(): (string | number)[];
    export { toDOM_1 as toDOM };
}
export namespace cite {
    let parseDOM_2: {
        tag: string;
    }[];
    export { parseDOM_2 as parseDOM };
    export function toDOM_2(): (string | number)[];
    export { toDOM_2 as toDOM };
}
export namespace code {
    let parseDOM_3: {
        tag: string;
    }[];
    export { parseDOM_3 as parseDOM };
    export function toDOM_3(): (string | number)[];
    export { toDOM_3 as toDOM };
}
export namespace underline {
    let parseDOM_4: ({
        tag: string;
        style?: undefined;
    } | {
        style: string;
        tag?: undefined;
    })[];
    export { parseDOM_4 as parseDOM };
    export function toDOM_4(): (string | number | {
        style: string;
    })[];
    export { toDOM_4 as toDOM };
}
export namespace strikethrough {
    let parseDOM_5: ({
        tag: string;
        style?: undefined;
    } | {
        style: string;
        tag?: undefined;
    })[];
    export { parseDOM_5 as parseDOM };
    export function toDOM_5(): (string | number)[];
    export { toDOM_5 as toDOM };
}
export namespace superscript {
    let parseDOM_6: ({
        tag: string;
        style?: undefined;
    } | {
        style: string;
        tag?: undefined;
    })[];
    export { parseDOM_6 as parseDOM };
    export function toDOM_6(): (string | number)[];
    export { toDOM_6 as toDOM };
}
export namespace subscript {
    let parseDOM_7: ({
        tag: string;
        style?: undefined;
    } | {
        style: string;
        tag?: undefined;
    })[];
    export { parseDOM_7 as parseDOM };
    export function toDOM_7(): (string | number)[];
    export { toDOM_7 as toDOM };
}
export namespace span {
    let parseDOM_8: {
        tag: string;
        getAttrs: (el: any) => {};
    }[];
    export { parseDOM_8 as parseDOM };
    export function toDOM_8(): (string | number)[];
    export { toDOM_8 as toDOM };
}
export namespace font {
    export namespace attrs {
        let family: {};
    }
    export namespace managed {
        let styles: string[];
    }
    let parseDOM_9: {
        tag: string;
        getAttrs: (el: any) => {
            family: any;
        };
    }[];
    export { parseDOM_9 as parseDOM };
    export function toDOM_9(node: any): (string | {
        style: string;
    })[];
    export { toDOM_9 as toDOM };
}
export namespace size {
    export namespace attrs_1 {
        let size: {};
    }
    export { attrs_1 as attrs };
    export namespace managed_1 {
        let styles_1: string[];
        export { styles_1 as styles };
    }
    export { managed_1 as managed };
    let parseDOM_10: {
        tag: string;
        getAttrs: (el: any) => {
            size: any;
        };
    }[];
    export { parseDOM_10 as parseDOM };
    export function toDOM_10(node: any): (string | {
        style: string;
    })[];
    export { toDOM_10 as toDOM };
}
export namespace color {
    export namespace attrs_2 {
        let color: {};
    }
    export { attrs_2 as attrs };
    export namespace managed_2 {
        let styles_2: string[];
        export { styles_2 as styles };
    }
    export { managed_2 as managed };
    let parseDOM_11: {
        tag: string;
        getAttrs: (el: any) => {
            color: any;
        };
    }[];
    export { parseDOM_11 as parseDOM };
    export function toDOM_11(node: any): (string | {
        style: string;
    })[];
    export { toDOM_11 as toDOM };
}
