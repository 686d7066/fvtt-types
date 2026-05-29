/**
 * @import Document from "../../../common/abstract/document.mjs"
 */
/**
 * The Application responsible for configuring a Placeable document within a parent Scene.
 * @extends DocumentSheetV2
 * @mixes HandlebarsApplication
 */
export default class PlaceableConfig extends DocumentSheetV2 {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        preview: boolean;
    };
    /**
     * The preview of this config.
     * @type {Document|null}
     * @protected
     */
    protected _preview: Document | null;
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
        document: Document<object, foundry.abstract.types.DocumentConstructionContext> | null;
        model: Document<object, foundry.abstract.types.DocumentConstructionContext> | null;
        source: object;
        gridUnits: any;
        selectableLevels: any;
        inputs: {
            createMultiSelectInput: (field: any, config: any) => AbstractMultiSelectElement;
        };
    }>;
    /** @inheritDoc */
    _postRender(context: any, options: any): Promise<void>;
    /** @inheritDoc */
    _preClose(options: any): Promise<void>;
    /**
     * Initialize the preview.
     * @returns {Promise<void>}
     * @protected
     */
    protected _initializePreview(): Promise<void>;
    /**
     * Create the preview.
     * @param {object} [data={}]  Additional data which overrides current document data at the time of creation
     * @returns {Promise<Document>}
     * @protected
     */
    protected _createPreview(data?: object | undefined): Promise<Document>;
    /**
     * Destroy the preview.
     * @protected
     */
    protected _destroyPreview(): void;
    /**
     * Preview changes.
     * @param {object} changes  The changes to preview.
     * @protected
     */
    protected _previewChanges(changes: object): void;
    /**
     * Reset the preview.
     * @protected
     */
    protected _resetPreview(): void;
    #private;
}
import { DocumentSheetV2 } from "../api/_module.mjs";
import type Document from "../../../common/abstract/document.mjs";
