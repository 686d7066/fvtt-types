/**
 * @import {ApplicationClickAction, FormFooterButton} from "../_types.mjs";
 */
/**
 * A Macro configuration sheet
 * @extends DocumentSheetV2
 * @mixes HandlebarsApplication
 */
export default class MacroConfig extends DocumentSheetV2 {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        classes: string[];
        canCreate: boolean;
        window: {
            contentClasses: string[];
            icon: string;
            resizable: boolean;
        };
        position: {
            width: number;
            height: number;
        };
        actions: {
            execute: Function;
        };
        form: {
            closeOnSubmit: boolean;
        };
    };
    /** @override */
    static override PARTS: {
        body: {
            template: string;
            root: boolean;
        };
        footer: {
            template: string;
        };
    };
    static "__#318@#onExecute"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /** @inheritDoc */
    _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
    #private;
}
import { DocumentSheetV2 } from "../api/_module.mjs";
