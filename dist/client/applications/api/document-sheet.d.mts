/**
 * @import Document from "../../../common/abstract/document.mjs";
 * @import {DatabaseCreateOperation, DatabaseUpdateOperation} from "../../../common/abstract/_types.mjs";
 * @import {ApplicationClickAction, ApplicationConfiguration, ApplicationRenderOptions} from "../_types.mjs";
 * @import FormDataExtended from "../ux/form-data-extended.mjs";
 */
/**
 * @typedef DocumentSheetConfiguration
 * @property {Document} document          The Document instance associated with this sheet
 * @property {number} viewPermission      A permission level in CONST.DOCUMENT_OWNERSHIP_LEVELS
 * @property {number} editPermission      A permission level in CONST.DOCUMENT_OWNERSHIP_LEVELS
 * @property {boolean} canCreate          Can this sheet class be used to create a new Document?
 * @property {boolean} canImport          Can the Document be imported into the World from a Compendium Collection?
 * @property {boolean} sheetConfig        Allow sheet configuration as a header button
 * @property {boolean} ownershipConfig    Allow ownership configuration as a header button
 */
/**
 * @typedef DocumentSheetRenderOptions
 * @property {string} renderContext       A string with the format "{operation}{documentName}" providing context
 * @property {object} renderData          Data describing the document modification that occurred
 */
/**
 * The Application class is responsible for rendering an HTMLElement into the Foundry Virtual Tabletop user interface.
 * @extends {ApplicationV2<
 *  ApplicationConfiguration & DocumentSheetConfiguration,
 *  ApplicationRenderOptions & DocumentSheetRenderOptions
 * >}
 */
export default class DocumentSheetV2 extends ApplicationV2<ApplicationConfiguration & DocumentSheetConfiguration, ApplicationRenderOptions & DocumentSheetRenderOptions> {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        id: string;
        classes: string[];
        tag: string;
        document: null;
        viewPermission: 1;
        editPermission: 3;
        canCreate: boolean;
        canImport: boolean;
        sheetConfig: boolean;
        ownershipConfig: boolean;
        actions: {
            configureSheet: Function;
            configureOwnership: Function;
            copyUuid: {
                handler: Function;
                buttons: number[];
            };
            editImage: Function;
            importDocument: Function;
        };
        form: {
            handler: Function;
            submitOnChange: boolean;
            closeOnSubmit: boolean;
        };
        window: {
            controls: {
                icon: string;
                label: string;
                action: string;
                visible: Function;
            }[];
        };
    };
    /**
     * Whether it's possible to configure this Document's sheet.
     * @this {DocumentSheetV2}
     * @returns {boolean}
     */
    static "__#43@#canConfigureSheet"(this: DocumentSheetV2): boolean;
    /**
     * Whether it's possible to configure the ownership of this Document.
     * @this {DocumentSheetV2}
     * @returns {boolean}
     */
    static "__#43@#canConfigureOwnership"(this: DocumentSheetV2): boolean;
    /**
     * Handle click events to configure the sheet used for this document.
     * @param {PointerEvent} event
     * @this {DocumentSheetV2}
     */
    static "__#43@#onConfigureSheet"(this: DocumentSheetV2, event: PointerEvent): void;
    /**
     * Handle click events to configure the ownership of this document.
     * @param {PointerEvent} event
     * @this {DocumentSheetV2}
     */
    static "__#43@#onConfigureOwnership"(this: DocumentSheetV2, event: PointerEvent): void;
    /**
     * Handle click events to copy the UUID of this document to clipboard.
     * @param {PointerEvent} event
     * @this {DocumentSheetV2}
     */
    static "__#43@#onCopyUuid"(this: DocumentSheetV2, event: PointerEvent): void;
    /**
     * Handle dragstart events on the copyUuid button, recording drag transfer data for this Document.
     * @param {DragEvent} event
     * @this {DocumentSheetV2}
     */
    static "__#43@#onDragStartCopyUuid"(this: DocumentSheetV2, event: DragEvent): void;
    static "__#43@#onEditImage"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /**
     * Handle importing a document from a compendium pack.
     * Documents imported using this header button specifically keep their existing IDs.
     * @this {DocumentSheetV2}
     */
    static "__#43@#onImportDocument"(this: DocumentSheetV2): Promise<any>;
    /**
     * Process form submission for the sheet.
     * @this {DocumentSheetV2}                      The handler is called with the application as its bound scope
     * @param {SubmitEvent} event                   The originating form submission event
     * @param {HTMLFormElement} form                The form element that was submitted
     * @param {FormDataExtended} formData           Processed data for the submitted form
     * @param {object} [options]                    Additional options provided by a manual submit call. All options
     *                                              except `options.updateData` are forwarded along to _processSubmitData.
     * @param {object} [options.updateData]         Additional data passed in if this form is submitted manually which
     *                                              should be merged with prepared formData.
     * @returns {Promise<void>}
     */
    static "__#43@#onSubmitDocumentForm"(this: DocumentSheetV2, event: SubmitEvent, form: HTMLFormElement, formData: FormDataExtended, options?: {
        updateData?: object | undefined;
    } | undefined): Promise<void>;
    /**
     * Provide a deprecation path for converted V1 document sheets.
     * @param {unknown} first The first parameter received by this class's constructor
     * @param {unknown[]} rest Any additional parameters received
     * @returns {Partial<ApplicationConfiguration & DocumentSheetConfiguration>}
     * @internal
     */
    static _migrateConstructorParams(first: unknown, rest: unknown[]): Partial<ApplicationConfiguration & DocumentSheetConfiguration>;
    /** @inheritDoc */
    constructor(options: any, ...args: any[]);
    /**
     * The Document instance associated with the application
     * @type {ClientDocument}
     */
    get document(): ClientDocument;
    /**
     * Is this Document sheet visible to the current User?
     * This is governed by the viewPermission threshold configured for the class.
     * @type {boolean}
     */
    get isVisible(): boolean;
    /**
     * Is this Document sheet editable by the current User?
     * This is governed by the editPermission threshold configured for the class.
     * @type {boolean}
     */
    get isEditable(): boolean;
    /** @inheritDoc */
    _initializeApplicationOptions(options: any): any;
    /** @inheritDoc */
    _headerControlButtons(): Generator<foundry.applications.types.ApplicationHeaderControlsEntry, void, unknown>;
    /** @inheritDoc */
    _configureRenderOptions(options: any): void;
    /** @inheritDoc */
    _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext & {
        document: ClientDocument;
        model: ClientDocument;
        source: any;
        fields: any;
        editable: boolean;
        user: foundry.documents.User | null;
        rootId: string;
    }>;
    /** @inheritDoc */
    _getFrameButtons(options: any): foundry.applications.types.ApplicationHeaderControlsEntry[];
    /** @inheritDoc */
    _renderFrame(options: any): Promise<HTMLElement>;
    /**
     * Disable or reenable all form fields in this application.
     * @param {boolean} disabled Should the fields be disabled?
     * @protected
     */
    protected _toggleDisabled(disabled: boolean): void;
    /** @override */
    override _canRender(_options: any): void;
    /** @inheritDoc */
    _onFirstRender(context: any, options: any): Promise<void>;
    /** @inheritDoc */
    _onRender(context: any, options: any): Promise<void>;
    /** @inheritDoc */
    _onClose(options: any): void;
    /** @inheritDoc */
    _onChangeForm(formConfig: any, event: any): void;
    /**
     * Handle toggling the revealed state of a secret embedded in some content.
     * @param {Event} event  The triggering event.
     * @protected
     */
    protected _onRevealSecret(event: Event): void;
    /**
     * Prepare data used to update the Document upon form submission.
     * This data is cleaned and validated before being returned for further processing.
     * @param {SubmitEvent} event                   The originating form submission event
     * @param {HTMLFormElement} form                The form element that was submitted
     * @param {FormDataExtended} formData           Processed data for the submitted form
     * @param {object} [updateData]                 Additional data passed in if this form is submitted manually which
     *                                              should be merged with prepared formData.
     * @returns {object}                            Prepared submission data as an object
     * @throws {Error}                              Subclasses may throw validation errors here to prevent form submission
     * @protected
     */
    protected _prepareSubmitData(event: SubmitEvent, form: HTMLFormElement, formData: FormDataExtended, updateData?: object | undefined): object;
    /**
     * Customize how form data is extracted into an expanded object.
     * @param {SubmitEvent|null} event              The originating form submission event
     * @param {HTMLFormElement} form                The form element that was submitted
     * @param {FormDataExtended} formData           Processed data for the submitted form
     * @returns {object}                            An expanded object of processed form data
     * @throws {Error}                              Subclasses may throw validation errors here to prevent form submission
     * @protected
     */
    protected _processFormData(event: SubmitEvent | null, form: HTMLFormElement, formData: FormDataExtended): object;
    /**
     * Submit a document update or creation request based on the processed form data.
     * @param {SubmitEvent} event                   The originating form submission event
     * @param {HTMLFormElement} form                The form element that was submitted
     * @param {object} submitData                   Processed and validated form data to be used for a document update
     * @param {Partial<DatabaseCreateOperation|DatabaseUpdateOperation>} [options] Additional options altering the request
     * @returns {Promise<void>}
     * @protected
     */
    protected _processSubmitData(event: SubmitEvent, form: HTMLFormElement, submitData: object, options?: Partial<DatabaseCreateOperation | DatabaseUpdateOperation> | undefined): Promise<void>;
    #private;
}
export type DocumentSheetConfiguration = {
    /**
     * The Document instance associated with this sheet
     */
    document: Document;
    /**
     * A permission level in CONST.DOCUMENT_OWNERSHIP_LEVELS
     */
    viewPermission: number;
    /**
     * A permission level in CONST.DOCUMENT_OWNERSHIP_LEVELS
     */
    editPermission: number;
    /**
     * Can this sheet class be used to create a new Document?
     */
    canCreate: boolean;
    /**
     * Can the Document be imported into the World from a Compendium Collection?
     */
    canImport: boolean;
    /**
     * Allow sheet configuration as a header button
     */
    sheetConfig: boolean;
    /**
     * Allow ownership configuration as a header button
     */
    ownershipConfig: boolean;
};
export type DocumentSheetRenderOptions = {
    /**
     * A string with the format "{operation}{documentName}" providing context
     */
    renderContext: string;
    /**
     * Data describing the document modification that occurred
     */
    renderData: object;
};
import type { ApplicationConfiguration } from "../_types.mjs";
import type { ApplicationRenderOptions } from "../_types.mjs";
import ApplicationV2 from "./application.mjs";
import type FormDataExtended from "../ux/form-data-extended.mjs";
import type { DatabaseCreateOperation } from "../../../common/abstract/_types.mjs";
import type { DatabaseUpdateOperation } from "../../../common/abstract/_types.mjs";
import type Document from "../../../common/abstract/document.mjs";
