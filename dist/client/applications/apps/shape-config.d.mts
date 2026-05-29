/**
 * @import {BaseShapeData} from "../../../common/data/_module.mjs";
 * @import {FormInputConfig} from "../../../common/data/_types.mjs";
 * @import {DataField} from "../../data/fields.mjs";
 */
/**
 * The configuration to edit a shape of a Document.
 * @extends ApplicationV2
 * @mixes HandlebarsApplication
 */
export default class ShapeConfig extends ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        id: string;
        classes: string[];
        tag: string;
        window: {
            contentClasses: string[];
            icon: string;
        };
        position: {
            width: number;
        };
        form: {
            handler: Function;
            closeOnSubmit: boolean;
        };
    };
    /** @override */
    static override PARTS: {
        form: {
            templates: string[];
        };
        footer: {
            template: string;
        };
    };
    /**
     * Process form submission for the config.
     * @this {ShapeConfig}                          The handler is called with the application as its bound scope
     * @param {SubmitEvent} event                   The originating form submission event
     * @param {HTMLFormElement} form                The form element that was submitted
     * @param {FormDataExtended} formData           Processed data for the submitted form
     * @param {object} [options]                    Additional options provided by a manual submit call. All options
     *                                              except `options.updateData` are forwarded along to _processSubmitData.
     * @param {object} [options.updateData]         Additional data passed in if this form is submitted manually which
     *                                              should be merged with prepared formData.
     * @returns {Promise<void>}
     */
    static "__#134@#onSubmitForm"(this: ShapeConfig, event: SubmitEvent, form: HTMLFormElement, formData: FormDataExtended, options?: {
        updateData?: object | undefined;
    } | undefined): Promise<void>;
    /**
     * Process the shape form data.
     * @param {BaseShapeData} shape
     * @param {object} shapeData
     * @returns {object}
     * @internal
     */
    static _processShapeData(shape: BaseShapeData, shapeData: object): object;
    /**
     * Create the dimension field.
     * @param {DataField} field
     * @param {FormInputConfig} inputConfig
     * @returns {HTMLElement[]}
     */
    static "__#134@#dimensionField"(field: DataField, inputConfig: FormInputConfig): HTMLElement[];
    /**
     * Prepare the shape context.
     * @param {object} context
     * @param {BaseShapeData} shape
     * @param {DataField} fields
     * @internal
     */
    static _prepareShapeContext(context: object, shape: BaseShapeData, fields: DataField): void;
    /**
     * Handle changes to dimension input.
     * @param {HTMLInputElement} input
     * @param {BaseGrid} grid
     * @internal
     */
    static _onChangeDimension(input: HTMLInputElement, grid: BaseGrid): void;
    /**
     * @param {ApplicationConfiguration & {shape: BaseShapeData}} options
     */
    constructor(options: ApplicationConfiguration & {
        shape: BaseShapeData;
    });
    /**
     * The shape that is configured by this application.
     * @type {BaseShapeData}
     */
    get shape(): BaseShapeData;
    /**
     * The Document whose shape is configured by this application.
     * @type {Document}
     */
    get document(): Document<object, foundry.abstract.types.DocumentConstructionContext>;
    /** @inheritDoc */
    _initializeApplicationOptions(options: any): any;
    /** @inheritDoc */
    _configureRenderParts(options: any): any;
    /** @inheritDoc */
    _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext>;
    /** @override */
    override _onChangeForm(formConfig: any, event: any): void;
    /**
     * Submit a Document update request based on the processed form data.
     * @param {SubmitEvent} event                   The originating form submission event
     * @param {HTMLFormElement} form                The form element that was submitted
     * @param {object} shapeData                    Processed and validated form data to be used for a document update
     * @param {Partial<DatabaseUpdateOperation>} [updateOptions] Additional options altering the request
     * @returns {Promise<void>}
     * @protected
     */
    protected _processSubmitData(event: SubmitEvent, form: HTMLFormElement, shapeData: object, updateOptions?: any): Promise<void>;
}
import { ApplicationV2 } from "../api/_module.mjs";
import type { BaseShapeData } from "../../../common/data/_module.mjs";
import Document from "../../../common/abstract/document.mjs";
import type { DataField } from "../../data/fields.mjs";
import type { FormInputConfig } from "../../../common/data/_types.mjs";
