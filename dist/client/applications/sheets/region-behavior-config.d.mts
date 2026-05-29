/**
 * @import {FormNode, FormFooterButton} from "../_types.mjs";
 * @import {DataSchema} from "../../../common/abstract/_types.mjs";
 */
/**
 * The Scene Region configuration application.
 * @extends DocumentSheetV2
 * @mixes HandlebarsApplication
 */
export default class RegionBehaviorConfig extends DocumentSheetV2 {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        classes: string[];
        viewPermission: 2;
        window: {
            contentClasses: string[];
            icon: undefined;
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
        form: {
            template: string;
            scrollable: string[];
        };
        footer: {
            template: string;
        };
    };
    constructor(options: any);
    /** @inheritDoc */
    _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext & {
        document: ClientDocument;
        model: ClientDocument;
        source: any;
        fields: any;
        editable: boolean;
        user: foundry.documents.User | null;
        rootId: string;
    } & {
        region: ClientDocument;
        fields: FormNode[];
        hint: string;
        buttons: FormFooterButton[];
    }>;
    /**
     * Prepare form field structure for rendering.
     * @returns {FormNode[]}
     * @protected
     */
    protected _getFields(): FormNode[];
    /**
     * Get footer buttons for this behavior config sheet.
     * @returns {FormFooterButton[]}
     * @protected
     */
    protected _getButtons(): FormFooterButton[];
    #private;
}
import DocumentSheetV2 from "../api/document-sheet.mjs";
import type { FormNode } from "../_types.mjs";
import type { FormFooterButton } from "../_types.mjs";
