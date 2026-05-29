/**
 * The Application responsible for configuring a single Level document.
 * @extends {DocumentSheetV2}
 * @mixes HandlebarsApplication
 */
export default class LevelConfig extends DocumentSheetV2 {
    /** @override */
    static override DEFAULT_OPTIONS: {
        classes: string[];
        window: {
            contentClasses: string[];
            icon: string;
        };
        position: {
            width: number;
        };
        form: {
            closeOnSubmit: boolean;
        };
    };
    /** @override */
    static override PARTS: {
        body: {
            template: string;
            scrollable: string[];
        };
        footer: {
            template: string;
        };
    };
    /** @inheritDoc */
    _prepareSubmitData(event: any, form: any, formData: any, updateData: any): object;
}
import DocumentSheetV2 from "../api/document-sheet.mjs";
