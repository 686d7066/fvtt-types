/**
 * @import {ApplicationClickAction, ApplicationFormSubmission} from "../../_types.mjs";
 * @import DocumentSheetV2 from "../../api/document-sheet.mjs";
 * @import Actor from "../../../documents/actor.mjs";
 */
/**
 * The Application responsible for configuring an actor's PrototypeToken
 * @extends ApplicationV2
 * @mixes TokenApplication
 */
export default class PrototypeTokenConfig extends ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        tag: string;
        classes: string[];
        actions: {
            assignToken: Function;
            cycleImage: Function;
            openOverridesConfig: Function;
        };
        form: {
            handler: Function;
        };
    };
    static "__#323@#onAssignToken"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#323@#onCycleImage"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#323@#onOpenOverridesConfig"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#323@#onSubmit"(event: SubmitEvent | Event, form: HTMLFormElement, formData: FormDataExtended): Promise<any>;
    /**
     * Browse for images matching a wildcard texture path.
     * @param {string} src    The wildcard-eligible texture path.
     * @returns {Promise<string[]>}
     */
    static "__#323@#getWildcardImages"(src: string): Promise<string[]>;
    /** @inheritDoc */
    constructor(options: any);
    /** @override */
    override isPrototype: boolean;
    /** @override */
    override get token(): PrototypeToken;
    /**
     * The preview.
     * @type {PrototypeToken|null}
     * @protected
     */
    protected _preview: PrototypeToken | null;
    /**
     * @type {Actor}
     * @override
     */
    override get actor(): Actor;
    /** @override */
    override get _fields(): foundry.abstract.types.DataSchema;
    /**
     * Is this sheet visible to the user?
     * @returns {boolean}
     */
    get isVisible(): boolean;
    /** @inheritDoc */
    _canRender(options: any): false | void;
    /** @inheritDoc */
    _initializeApplicationOptions(options: any): foundry.applications.types.ApplicationConfiguration;
    /** @inheritDoc */
    _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext & {
        document: PrototypeToken | null;
        model: PrototypeToken | null;
        source: foundry.documents.types.PrototypeTokenData;
        rootId: string;
        gridUnits: string;
    }>;
    /** @inheritDoc */
    _prepareAppearanceTab(): Promise<any>;
    /** @inheritDoc */
    _onChangeForm(formConfig: any, event: any): void;
    /** @inheritDoc */
    _prepareButtons(): any;
    /** @inheritDoc */
    _onFirstRender(context: any, options: any): Promise<void>;
    /** @inheritDoc */
    _onRender(context: any, options: any): Promise<void>;
    /** @inheritDoc */
    _onClose(options: any): void;
    /**
     * Preview changes.
     * @param {object} changes  The changes to preview.
     * @protected
     */
    protected _previewChanges(changes: object): void;
    /**
     * Customize how form data is extracted into an expanded object.
     * @param {SubmitEvent|null} event    The originating form submission event
     * @param {HTMLFormElement} form      The form element that was submitted
     * @param {FormDataExtended} formData Processed data for the submitted form
     * @returns {object} An expanded object of processed form data
     * @throws {Error}   Subclasses may throw validation errors here to prevent form submission
     * @protected
     */
    protected _processFormData(event: SubmitEvent | null, form: HTMLFormElement, formData: FormDataExtended): object;
    /** @inheritDoc */
    _tearDown(options: any): void;
    #private;
}
import ApplicationV2 from "../../api/application.mjs";
import { PrototypeToken } from "../../../../common/data/data.mjs";
import type Actor from "../../../documents/actor.mjs";
import FormDataExtended from "../../ux/form-data-extended.mjs";
