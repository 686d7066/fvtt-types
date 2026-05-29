/**
 * A special {@link foundry.data.fields.NumberField} represents a number between 0 and 1.
 */
export class AlphaField extends NumberField {
    static get _defaults(): never;
}
/**
 * A special {@link foundry.data.fields.NumberField} which represents an angle of rotation in degrees between 0 and 360.
 * @property {boolean} normalize Whether the angle should be normalized to [0,360) before being clamped to [0,360]. The
 *                               default is true.
 */
export class AngleField extends NumberField {
    /** @inheritdoc */
    static get _defaults(): never;
    /** @inheritdoc */
    _cast(value: any): any;
}
/**
 * A special subclass of {@link foundry.data.fields.DataField} which can contain any value of any type.
 * Any input is accepted and is treated as valid. Setting the serializable option to true will apply some light cleaning
 * and validation, ensuring that a candidate value will not be appreciably changed when serialized for writing to disk.
 * It is not recommended to use this class except in very specific circumstances.
 */
export class AnyField extends DataField {
    /** @inheritDoc */
    static get _defaults(): DataFieldOptions & {
        nullable: boolean;
        serializable: boolean;
    };
    /** @inheritDoc */
    clean(value: any, options: any, _state: any): any;
    /** @override */
    override _validateType(value: any): void;
    /** @override */
    override _toInput(config: any): HTMLInputElement | foundry.applications.elements.HTMLCodeMirrorElement;
}
/**
 * A subclass of {@link foundry.data.fields.DataField} which deals with array-typed data.
 * @template [ElementType=DataField]
 * @property {number} min     The minimum number of elements.
 * @property {number} max     The maximum number of elements.
 */
export class ArrayField<ElementType = DataField> extends DataField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        required: boolean;
        nullable: boolean;
        empty: boolean;
        exact: undefined;
        min: number;
        max: number;
    };
    /**
     * Validate the contained element type of the ArrayField
     * @param {*} element        The type of Array element
     * @returns {ElementType}    The validated element type
     * @throws                   An error if the element is not a valid type
     * @protected
     */
    protected static _validateElementType(element: any): ElementType;
    /**
     * @see {@link SchemaField._handleValidationFailure}
     * @internal
     */
    static _handleValidationFailure(field: any, value: any, index: any, parentFailure: any, fieldFailure: any, options: any): void;
    /**
     * @param {ElementType} element          The type of element contained in the Array
     * @param {ArrayFieldOptions} [options]  Options which configure the behavior of the field
     * @param {DataFieldContext} [context]   Additional context which describes the field
     */
    constructor(element: ElementType, options?: ArrayFieldOptions | undefined, context?: DataFieldContext | undefined);
    /**
     * The data type of each element in this array
     * @type {ElementType}
     */
    element: ElementType;
    /** @override */
    override getInitialValue(source: any): any;
    /** @override */
    override initialize(value: any, model: any, options?: {}): any;
    /** @override */
    override _getField(parts: any, { source }?: {}): any;
    /** @override */
    override _cast(value: any): any[];
    /**
     * When cleaning an ArrayField we must force {partial: false} since arrays are always fully replaced.
     * We take care to preserve the provided array reference, cleaning its elements rather than replacing the array.
     * @override
     */
    override _cleanType(value: any, options: any, _state: any): any;
    /**
     * Clean data for an individual element in the ArrayField.
     * @param {object} value                      Unclean data for the array entry
     * @param {DataModelCleaningOptions} options  Options which control how data is cleaned
     * @param {DataModelUpdateState} _state       State used during data cleaning
     * @returns {object}                          Cleaned data for the array entry
     * @protected
     */
    protected _cleanElement(value: object, options: DataModelCleaningOptions, _state: DataModelUpdateState): object;
    /** @override */
    override _validateType(value: any, options: any): void;
    /** @override */
    override _validateRecursive(value: any, options: any): void;
    /** @override */
    override _validateModel(changes: any, options: any): void;
    /** @override */
    override _updateDiff(key: any, value: any, options: any, state: any): void;
    /**
     * Commit array field changes by replacing array contents while preserving the array reference itself.
     * @override
     */
    override _updateCommit(source: any, key: any, value: any, _diff: any, _options: any): void;
    /** @override */
    override toObject(value: any): any;
    /** @override */
    override apply(fn: any, value?: any[], options?: {}): any[];
    /** @override */
    override _castChangeDelta(raw: any, replacementData: any): any[];
    /** @override */
    override _applyChangeAdd(value: any, delta: any, model: any, change: any): any;
    /**
     * @param {unknown[]} value
     * @param {unknown[]} delta
     * @override
     */
    override _applyChangeSubtract(value: unknown[], delta: unknown[], model: any, change: any): unknown[];
}
/**
 * A subclass of {@link foundry.data.fields.DataField} which deals with boolean-typed data.
 */
export class BooleanField extends DataField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        required: boolean;
        nullable: boolean;
        initial: boolean;
    };
    /** @override */
    override _cast(value: any): boolean;
    /** @override */
    override _validateType(value: any, _options: any): void;
    /** @override */
    override _toInput(config: any): HTMLInputElement;
    /** @override */
    override _applyChangeAdd(value: any, delta: any, model: any, change: any): any;
    /** @override */
    override _applyChangeSubtract(value: any, delta: any, model: any, change: any): boolean;
    /** @override */
    override _applyChangeMultiply(value: any, delta: any, model: any, change: any): any;
    /** @override */
    override _applyChangeUpgrade(value: any, delta: any, model: any, change: any): any;
    /** @override */
    override _applyChangeDowngrade(value: any, delta: any, model: any, change: any): any;
}
/**
 * A special {@link foundry.data.fields.StringField} which records a standardized CSS color string.
 */
export class ColorField extends StringField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        blank: boolean;
        trim: boolean;
        choices: undefined;
        textSearch: boolean;
    } & {
        nullable: boolean;
        initial: null;
        blank: boolean;
    };
    /** @override */
    override initialize(value: any, model: any, options?: {}): any;
    /** @override */
    override _toInput(config: any): foundry.applications.elements.HTMLColorPickerElement;
}
/**
 * @import {EffectChangeData} from "../documents/_types.mjs";
 * @import {
 *   ArrayFieldOptions,
 *   ChoiceInputConfig,
 *   CodeMirrorInputConfig,
 *   DataFieldContext,
 *   DataFieldOptions,
 *   DataFieldValidationOptions,
 *   DataModelCleaningOptions,
 *   DataModelSanitizationOptions,
 *   DataModelUpdateState,
 *   DocumentStats,
 *   DocumentUUIDFieldOptions,
 *   EmbeddedCollectionUpdateContext,
 *   FilePathFieldOptions,
 *   FormGroupConfig,
 *   FormInputConfig,
 *   GridOffsetFieldOptions,
 *   GridOffsetsFieldOptions,
 *   JavaScriptFieldOptions,
 *   NumberFieldOptions,
 *   StringFieldInputConfig,
 *   StringFieldOptions,
 *   TypedObjectFieldOptions
 * } from "./_types.mjs";
 * @import {Document} from "../abstract/_module.mjs";
 * @import {DataSchema, DataModelUpdateOptions} from "../abstract/_types.mjs";
 * @import {FormSelectOption} from "../../client/applications/forms/fields.mjs"
 * @import {Roll, ReplaceFormulaDataOptions} from "../../client/dice/_module.mjs";
 */
/**
 * An abstract class that defines the base pattern for a data field within a data schema.
 * @property {string} name                The name of this data field within the schema that contains it.
 * @mixes DataFieldOptions
 */
export class DataField {
    /**
     * Whether this field defines part of a Document/Embedded Document hierarchy.
     * @type {boolean}
     */
    static hierarchical: boolean;
    /**
     * Does this field type contain other fields in a recursive structure?
     * Examples of recursive fields are SchemaField, ArrayField, or TypeDataField
     * Examples of non-recursive fields are StringField, NumberField, or ObjectField
     * @type {boolean}
     */
    static recursive: boolean;
    /**
     * Default parameters for this field type
     * @returns {DataFieldOptions}
     * @protected
     */
    protected static get _defaults(): DataFieldOptions;
    static "__#246@#cleanDefaultTrue": string[];
    /**
     * Does this form field class have defined form support?
     * @type {boolean}
     */
    static get hasFormSupport(): boolean;
    /**
     * @param {DataFieldOptions} [options]    Options which configure the behavior of the field
     * @param {DataFieldContext} [context]    Additional context which describes the field
     */
    constructor(options?: DataFieldOptions | undefined, { name, parent }?: DataFieldContext | undefined);
    /**
     * The field name of this DataField instance.
     * This is assigned by SchemaField#initialize.
     * @internal
     */
    name: string | undefined;
    /**
     * A reference to the parent schema to which this DataField belongs.
     * This is assigned by SchemaField#initialize.
     * @internal
     */
    parent: any;
    /**
     * The initially provided options which configure the data field
     * @type {DataFieldOptions}
     */
    options: DataFieldOptions;
    /**
     * Is a value of this field written to source data? A Non-persisted value is initialized (with its initial value), and
     * ActiveEffects can use the field for change application.
     * @type {boolean}
     */
    persisted: boolean;
    /**
     * A dot-separated string representation of the field path within the parent schema.
     * @type {string}
     */
    get fieldPath(): string;
    /**
     * Apply a function to this DataField which propagates through recursively to any contained data schema.
     * @param {string|Function} fn          The function to apply
     * @param {*} value                     The current value of this field
     * @param {object} [options={}]         Additional options passed to the applied function
     * @returns {object}                    The results object
     */
    apply(fn: string | Function, value: any, options?: object | undefined): object;
    /**
     * Recursively traverse a schema and retrieve a field specification by a given path/key
     * @param {string[]} parts             The field path or property key if `source` is passed as an array of strings
     *                                     (in reverse order)
     * @param {object} [options]           Additional options
     * @param {object} [options.source]    The source data of the field
     * @param {object} [options.type]      The Document type of the parent field
     * @returns {DataField|undefined}      The corresponding DataField definition for that field, or undefined
     * @protected
     */
    protected _getField(parts: string[], { source, type }?: {
        source?: object | undefined;
        type?: object | undefined;
    } | undefined): DataField | undefined;
    /**
     * Preprocess and clean source data to ensure that it conforms to the correct data type for this field and is ready
     * to be used by data model construction or update operations.
     * Data cleaning is synchronous and automatically applied as the first step of construction and update operations.
     *
     * @param {any} value                           An initial requested value
     * @param {Readonly<DataModelCleaningOptions>} [options]  Additional options for how the field is cleaned
     * @param {DataModelUpdateState} [_state]       Internal state variables which are used during recursion
     * @returns {any}                               The cleaned value
     */
    clean(value: any, options?: Readonly<DataModelCleaningOptions> | undefined, _state?: DataModelUpdateState | undefined): any;
    /**
     * Attempt to retrieve a valid initial value for the DataField.
     * @param {object} source   Model source data object within which an initial value is required for this field
     * @returns {*}             A proposed initial value
     */
    getInitialValue(source: object): any;
    /**
     * Migrate this field's candidate source data.
     * This workflow occurs as a component step of DataField#clean.
     *
     *
     * @param {any} value                           Candidate source value for the field
     * @param {Readonly<DataModelCleaningOptions>} [options]  Options for how the field is cleaned
     * @param {DataModelUpdateState} [_state]       Internal state variables transacted during cleaning recursion.
     * @returns {any}                               A migrated value suitable for cleaning
     * @protected
     */
    protected _migrate(value: any, options?: Readonly<DataModelCleaningOptions> | undefined, _state?: DataModelUpdateState | undefined): any;
    /**
     * Cast a non-default value to ensure it is the correct type for the field
     * @param {*} value       The provided non-default value
     * @returns {*}           The standardized value
     * @protected
     */
    protected _cast(value: any): any;
    /**
     * Apply any cleaning logic specific to this DataField type.
     * @param {any} value         A candidate value that has been cast to the appropriate type
     * @param {Readonly<DataModelCleaningOptions>} [options]  Options for how the field is cleaned
     * @param {DataModelUpdateState} [_state] Internal state variables which are used during recursion
     * @returns {any}             The cleaned value
     * @protected
     */
    protected _cleanType(value: any, options?: Readonly<DataModelCleaningOptions> | undefined, _state?: DataModelUpdateState | undefined): any;
    /**
     * Apply special sanitization workflows to this value.
     * This method is reserved for implementation in server-side workflows.
     * @param {any} value         A candidate value that has been cast and cleaned
     * @param {Readonly<DataModelSanitizationOptions>} [options]  Options for how the field is sanitized
     * @param {DataModelUpdateState} [state] Internal state variables which are used during recursion
     * @returns {any}             The sanitized value
     * @internal
     * @ignore
     */
    _sanitize(value: any, options?: Readonly<DataModelSanitizationOptions> | undefined, state?: DataModelUpdateState | undefined): any;
    /**
     * Iterate over validation functions applied to this field.
     * Validation happens in a depth-first way, for example consider an outerSchema with an innerField:
     *
     * @example Validator Invocation Order
     * ```
     * outerSchema
     *   _validateSpecial
     *   _validateType
     *   _validateRecursive
     *   outerSchema.options.validate
     *     innerField
     *       _validateSpecial
     *       _validateType
     *       innerField.options.validate
     *       _validateModel
     *   _validateModel
     * ```
     * @param {Pick<DataFieldValidationOptions,"phase"|"recursive">} options
     * @yields {(any) => boolean}
     */
    validators({ phase, recursive }?: Pick<DataFieldValidationOptions, "phase" | "recursive">): Generator<foundry.data.types.DataFieldValidator, void, unknown>;
    /**
     * Validate candidate input for this field, ensuring it meets the field requirements.
     *
     * This public method validates recursively, testing both the immediate value of this field as well as the validity
     * of any child values for fields with hierarchical data types.
     *
     * @param {any} value                               The candidate value to validate
     * @param {DataFieldValidationOptions} [options={}] Options which affect validation behavior
     * @returns {DataModelValidationFailure|void}       A failure that occurred if validation is non-strict.
     *                                                  The failure may have been resolved by fallback or dropping
     *                                                  invalid elements.
     * @throws {DataModelValidationFailure}             A failure error type including details of the failure if
     *                                                  validation is performed strictly.
     */
    validate(value: any, options?: DataFieldValidationOptions | undefined): DataModelValidationFailure | void;
    /**
     * Special validation rules which supersede regular field validation.
     * This validator screens for certain values which are otherwise incompatible with this field like null or undefined.
     * @param {*} value                                  The candidate value
     * @returns {boolean|void}                           A boolean to indicate with certainty whether the value is valid
     * @throws {Error}                                   An error with a specific reason the value is invalid
     * @protected
     */
    protected _validateSpecial(value: any): boolean | void;
    /**
     * A default type-specific validator that can be overridden by child classes
     * This method should validate only the value at the current hierarchy level, rather than validating recursively.
     * This method should throw if any validation error occurred, even if resolved by fallback or dropping.
     *
     * @param {*} value                                  The candidate value
     * @param {DataFieldValidationOptions} [options={}]  Options which affect validation behavior
     * @returns {boolean|void}                           A boolean to indicate with certainty whether the value is valid
     * @throws {Error}                                   An error with a specific reason the value is invalid
     * @protected
     */
    protected _validateType(value: any, options?: DataFieldValidationOptions | undefined): boolean | void;
    /**
     * For fields which have hierarchical data structures, define how their inner fields should be validated.
     * This method is called after _validateSpecial and _validateType. It can be assumed that those tests passed.
     * This method should throw if any validation error occurred, even if resolved by fallback or dropping.
     *
     * @param {*} value                                  The candidate value
     * @param {DataFieldValidationOptions} [options={}]  Options which affect validation behavior
     * @returns {boolean|void}                           A boolean to indicate with certainty whether the value is valid
     * @throws {Error}                                   An error with a specific reason the value is invalid
     * @protected
     */
    protected _validateRecursive(value: any, options?: DataFieldValidationOptions | undefined): boolean | void;
    /**
     * Certain fields may declare joint data validation criteria.
     * This method will only be called if the field is designated as recursive.
     * This method should throw if any validation error occurred, even if resolved by fallback or dropping.
     *
     * @param {object} data       Candidate data for joint model validation
     * @param {object} options    Options which modify joint model validation
     * @throws {Error}            An error if joint model validation fails
     * @internal
     */
    _validateModel(data: object, options?: object): void;
    /**
     * Initialize the original source data into a mutable copy for the DataModel instance.
     * @param {unknown} value             The source value of the field
     * @param {object} model              The DataModel instance that this field belongs to
     * @param {object} [options]          Initialization options
     * @returns {unknown}                 An initialized copy of the source data
     */
    initialize(value: unknown, model: object, options?: object | undefined): unknown;
    /**
     * Update the source data for a DataModel which includes this DataField.
     * Updates are performed depth-first; validated and recorded from leaf-nodes upwards.
     *
     * This method is responsible for preparing and validating the requested update.
     * If the update is valid, it is responsible for updating the pending source copy and recording the diff.
     * If the update is invalid it must avoid recording a diff or staging an update to the source copy.
     * If validation fails, this workflow may optionally permit `fallback` to a valid initial value.
     *
     *                                      a partial node of source data, relative to which this field belongs.
     * @param {string} key                  The name of this field within the context of the source data.
     * @param {any} value                   The candidate value that should be applied as an update.
     * @param {DataModelUpdateOptions} options Options which modify how this update workflow is performed.
     * @param {DataModelUpdateState} state  Stateful data that is transacted throughout the model hierarchy during an
     *                                      update operation.
     * @throws {Error}                      An error if the requested update cannot be performed.
     * @internal
     */
    _updateDiff(key: string, value: any, options: DataModelUpdateOptions, state: DataModelUpdateState): void;
    /**
     * Commit a prepared update to DataModel#_source.
     * @param {object} source               The parent source object within which the `key` field exists
     * @param {string} key                  The named field in source to commit
     * @param {object} value                The new value of the field which should be committed to source
     * @param {object} diff                 The reported change to the field
     * @param {DataModelUpdateOptions} options Options which modify how this update workflow is performed.
     * @internal
     */
    _updateCommit(source: object, key: string, value: object, diff: object, options: DataModelUpdateOptions): void;
    /**
     * Export the current value of the field into a serializable object.
     * @param {*} value                   The initialized value of the field
     * @returns {*}                       An exported representation of the field
     */
    toObject(value: any): any;
    /**
     * Render this DataField as an HTML element.
     * @param {FormInputConfig} config        Form element configuration parameters
     * @throws {Error}                        An Error if this DataField subclass does not support input rendering
     * @returns {HTMLElement|HTMLElement[]|HTMLCollection}  A rendered HTMLElement for the field
     */
    toInput(config?: FormInputConfig): HTMLElement | HTMLElement[] | HTMLCollection;
    /**
     * Render this DataField as an HTML element.
     * Subclasses should implement this method rather than the public toInput method which wraps it.
     * @param {FormInputConfig} config        Form element configuration parameters
     * @throws {Error}                        An Error if this DataField subclass does not support input rendering
     * @returns {HTMLElement|HTMLElement[]|HTMLCollection} A rendered HTMLElement for the field
     * @protected
     */
    protected _toInput(config: FormInputConfig): HTMLElement | HTMLElement[] | HTMLCollection;
    /**
     * Render this DataField as a standardized form-group element.
     * @param {FormGroupConfig} groupConfig   Configuration options passed to the wrapping form-group
     * @param {FormInputConfig} inputConfig   Input element configuration options passed to DataField#toInput
     * @returns {HTMLDivElement}              The rendered form group element
     */
    toFormGroup(groupConfig?: FormGroupConfig, inputConfig?: FormInputConfig): HTMLDivElement;
    /**
     * Apply an ActiveEffectChange to this field.
     * @template T
     * @param {T} value                       The field's current value.
     * @param {DataModel} model               The model instance.
     * @param {ActiveEffectChangeData} change The change to apply.
     * @param {object} options                Additional options to configure the change application.
     * @param {Record<string, unknown>} [options.replacementData] Data used to resolve "@" expressions.
     * @returns {T}                           The updated value.
     */
    applyChange<T>(value: T, model: DataModel, change: ActiveEffectChangeData, { replacementData }?: {
        replacementData?: Record<string, unknown> | undefined;
    }): T;
    /**
     * Cast a change delta into an appropriate type to be applied to this field.
     * @param {*} delta  The change delta.
     * @param {object} replacementData Data used to resolve "@" expressions.
     * @returns {*}
     * @protected
     */
    protected _castChangeDelta(delta: any, replacementData?: object): any;
    /**
     * Recursively replace data references in a string change value.
     * @param {string} raw
     * @param {Record<string, unknown>} data  An object providing replacements
     * @param {object} [options]              Additional options to configure the data replacement
     * @param {boolean} [options.strict=true] Throw an Error if data replacement fails
     * @returns {string} The expression with data references resolved
     * @protected
     */
    protected _replaceDataRefs(raw: string, data: Record<string, unknown>, { strict }?: {
        strict?: boolean | undefined;
    } | undefined): string;
    /**
     * Apply an "add" change to this field.
     * @param {*} value                  The field's current value.
     * @param {*} delta                  The change delta.
     * @param {DataModel} model          The model instance.
     * @param {EffectChangeData} change  The original change data.
     * @returns {*}                      The updated value.
     * @protected
     */
    protected _applyChangeAdd(value: any, delta: any, model: DataModel, change: EffectChangeData): any;
    /**
     * Apply a "subtract" change to this field.
     * @param {*} value                  The field's current value.
     * @param {*} delta                  The change delta.
     * @param {DataModel} model          The model instance.
     * @param {EffectChangeData} change  The original change data.
     * @returns {*}                      The updated value.
     * @protected
     */
    protected _applyChangeSubtract(value: any, delta: any, model: DataModel, change: EffectChangeData): any;
    /**
     * Apply a "multiply" change to this field.
     * @param {*} value                  The field's current value.
     * @param {*} delta                  The change delta.
     * @param {DataModel} model          The model instance.
     * @param {EffectChangeData} change  The original change data.
     * @returns {*}                      The updated value.
     * @protected
     */
    protected _applyChangeMultiply(value: any, delta: any, model: DataModel, change: EffectChangeData): any;
    /**
     * Apply an "override" change to this field.
     * @param {*} value                  The field's current value.
     * @param {*} delta                  The change delta.
     * @param {DataModel} model          The model instance.
     * @param {EffectChangeData} change  The original change data.
     * @returns {*}                      The updated value.
     * @protected
     */
    protected _applyChangeOverride(value: any, delta: any, model: DataModel, change: EffectChangeData): any;
    /**
     * Apply an "upgrade" change to this field.
     * @param {*} value                  The field's current value.
     * @param {*} delta                  The change delta.
     * @param {DataModel} model          The model instance.
     * @param {EffectChangeData} change  The original change data.
     * @returns {*}                      The updated value.
     * @protected
     */
    protected _applyChangeUpgrade(value: any, delta: any, model: DataModel, change: EffectChangeData): any;
    /**
     * Apply a "downgrade" change to this field.
     * @param {*} value                  The field's current value.
     * @param {*} delta                  The change delta.
     * @param {DataModel} model          The model instance.
     * @param {EffectChangeData} change  The original change data.
     * @returns {*}                      The updated value.
     * @protected
     */
    protected _applyChangeDowngrade(value: any, delta: any, model: DataModel, change: EffectChangeData): any;
    /**
     * Apply a custom change to this field.
     * @param {*} value                  The field's current value.
     * @param {*} delta                  The change delta.
     * @param {DataModel} model          The model instance.
     * @param {EffectChangeData} change  The original change data.
     * @returns {*}                      The updated value.
     * @protected
     */
    protected _applyChangeCustom(value: any, delta: any, model: DataModel, change: EffectChangeData): any;
    #private;
}
/**
 * A subclass of {@link foundry.data.fields.SchemaField} that represents the root schema node of a DataModel.
 */
export class DataModelSchemaField extends SchemaField {
    /**
     * @param {typeof DataModel} model          The class of DataModel which should be embedded in this field
     * @param {DataFieldOptions} [options]      Options which configure the behavior of the field
     * @param {DataFieldContext} [context]      Additional context which describes the field
     */
    constructor(model: typeof DataModel, options?: DataFieldOptions | undefined, context?: DataFieldContext | undefined);
    /**
     * The base DataModel definition which is contained in this field.
     * @type {typeof DataModel}
     */
    model: typeof DataModel;
    /** @override */
    override _getField(parts: any, { source }?: {}): DataField | this | undefined;
    /** @inheritDoc */
    clean(value: any, options?: {}, _state?: {}): any;
    /** @override */
    override _migrate(value: any, options: any, _state: any): any;
}
/**
 * A special {@link foundry.data.fields.ForeignDocumentField} which defines the original author of a document.
 * This can only be changed later by GM users.
 */
export class DocumentAuthorField extends ForeignDocumentField {
    /** @inheritDoc */
    static get _defaults(): DataFieldOptions & {
        blank: boolean;
        trim: boolean;
        choices: undefined;
        textSearch: boolean;
    } & {
        required: boolean;
        blank: boolean;
        nullable: boolean;
        readonly: boolean;
        validationError: string;
    } & {
        nullable: boolean;
        readonly: boolean;
        idOnly: boolean;
    } & {
        nullable: boolean;
        gmOnly: boolean;
        initial: () => string | null;
    };
}
/**
 * A subclass of {@link foundry.data.fields.TypedObjectField} that is used specifically for the Document "flags" field.
 */
export class DocumentFlagsField extends TypedObjectField {
    /** @inheritdoc */
    static get _defaults(): object & {
        validateKey: (k: any) => boolean;
    };
    /**
     * @param {DataFieldOptions} [options]    Options which configure the behavior of the field
     * @param {DataFieldContext} [context]    Additional context which describes the field
     */
    constructor(options?: DataFieldOptions | undefined, context?: DataFieldContext | undefined);
}
/**
 * A subclass of {@link foundry.data.fields.StringField} which provides the primary _id for a Document.
 * The field may be initially null, but it must be non-null when it is saved to the database.
 */
export class DocumentIdField extends StringField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        blank: boolean;
        trim: boolean;
        choices: undefined;
        textSearch: boolean;
    } & {
        required: boolean;
        blank: boolean;
        nullable: boolean;
        readonly: boolean;
        validationError: string;
    };
    /** @override */
    override _cast(value: any): any;
    /** @override */
    override _validateType(value: any, _options: any): void;
}
/**
 * A special {@link foundry.data.fields.ObjectField} which captures a mapping of User IDs to Document permission levels.
 */
export class DocumentOwnershipField extends ObjectField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        required: boolean;
        nullable: boolean;
    } & {
        initial: {
            default: 0;
        };
        validationError: string;
        gmOnly: boolean;
    };
    /** @inheritDoc */
    _cleanType(data: any, options: any, _state: any): any;
    /** @override */
    override _validateType(value: any, _options: any): false | undefined;
}
/**
 * A subclass of {@link foundry.data.fields.SchemaField} which stores document metadata in the _stats field.
 * @mixes DocumentStats
 */
export class DocumentStatsField extends SchemaField {
    /**
     * All Document stats.
     * @type {string[]}
     */
    static fields: string[];
    /**
     * These fields are managed by the server and are ignored if they appear in creation or update data.
     * @type {string[]}
     */
    static managedFields: string[];
    /**
     * Migrate deprecated core flags to `_stats` properties.
     * @param {typeof Document} document
     * @param {object} source
     * @internal
     */
    static _migrateData(document: any, source: object): void;
    /**
     * Shim the deprecated core flag `exportSource` on Document source data.
     * @param {typeof Document} document
     * @param {object} source
     * @param {object} [options]
     * @internal
     */
    static _shimData(document: typeof Document, source: object, options?: object | undefined): void;
    /**
     * Shim the deprecated core flag `exportSource` on Documents.
     * @param {typeof Document} document
     * @internal
     */
    static _shimDocument(document: typeof Document): void;
    /**
     * @param {DataFieldOptions} [options]        Options which configure the behavior of the field
     * @param {DataFieldContext} [context]        Additional context which describes the field
     */
    constructor(options?: DataFieldOptions | undefined, context?: DataFieldContext | undefined);
    /** @ignore */
    _sanitizeType(value: any, options: any, _state: any): any;
}
/**
 * A subclass of {@link foundry.data.fields.StringField} that is used specifically for the Document "type" field.
 */
export class DocumentTypeField extends StringField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        blank: boolean;
        trim: boolean;
        choices: undefined;
        textSearch: boolean;
    } & {
        required: boolean;
        nullable: boolean;
        blank: boolean;
    };
    /**
     * @param {typeof Document} documentClass  The base document class which belongs in this field
     * @param {StringFieldOptions} [options]  Options which configure the behavior of the field
     * @param {DataFieldContext} [context]    Additional context which describes the field
     */
    constructor(documentClass: typeof Document, options?: StringFieldOptions | undefined, context?: DataFieldContext | undefined);
    /** @override */
    override _validateType(value: any, options: any): boolean;
}
/**
 * A subclass of {@link foundry.data.fields.StringField} which supports referencing some other Document by its UUID.
 * This field may not be blank, but may be null to indicate that no UUID is referenced.
 */
export class DocumentUUIDField extends StringField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        blank: boolean;
        trim: boolean;
        choices: undefined;
        textSearch: boolean;
    } & {
        required: boolean;
        blank: boolean;
        nullable: boolean;
        initial: null;
        type: undefined;
        embedded: undefined;
        relative: boolean;
    };
    /**
     * @param {DocumentUUIDFieldOptions} [options] Options which configure the behavior of the field
     * @param {DataFieldContext} [context]    Additional context which describes the field
     */
    constructor(options?: DocumentUUIDFieldOptions | undefined, context?: DataFieldContext | undefined);
    /** @inheritDoc */
    _cleanType(value: any, options: any, state: any): any;
    /** @override */
    override _validateType(value: any, options?: {}): void;
    /** @override */
    override _toInput(config: any): foundry.applications.elements.HTMLDocumentTagsElement;
}
/**
 * A subclass of {@link foundry.data.fields.EmbeddedCollectionField} which manages a collection of delta objects
 * relative to another collection.
 */
export class EmbeddedCollectionDeltaField extends EmbeddedCollectionField {
    /** @override */
    static override get implementation(): typeof EmbeddedCollectionDelta;
    /** @override */
    override _cleanElement(value: any, options: any, _state: any): any;
    /** @override */
    override _validateRecursive(value: any, options: any): DataModelValidationFailure | undefined;
    /** @inheritDoc */
    _updateElement(v: any, existingSource: any, ctx: any): void;
    /** @inheritDoc */
    _commitElement(obj: any, src: any, existing: any, changed: any, options: any): void;
}
/**
 * A subclass of {@link foundry.data.fields.ArrayField} which supports an embedded Document collection.
 * Invalid elements will be dropped from the collection during validation rather than failing for the field entirely.
 * @extends {ArrayField<typeof Document>}
 */
export class EmbeddedCollectionField extends ArrayField<typeof Document> {
    /** @override */
    static override _validateElementType(element: any): any;
    /**
     * The Collection implementation to use when initializing the collection.
     * @type {typeof EmbeddedCollection}
     */
    static get implementation(): typeof EmbeddedCollection;
    /**
     * @param {typeof Document} element     The type of Document which belongs to this embedded collection
     * @param {DataFieldOptions} [options]  Options which configure the behavior of the field
     * @param {DataFieldContext} [context]  Additional context which describes the field
     */
    constructor(element: typeof Document, options?: DataFieldOptions | undefined, context?: DataFieldContext | undefined);
    readonly: boolean;
    /**
     * A reference to the DataModel subclass of the embedded document element
     * @type {typeof Document}
     */
    get model(): typeof Document;
    /**
     * The DataSchema of the contained Document model.
     * @type {SchemaField}
     */
    get schema(): SchemaField;
    /**
     * Return the embedded document(s) as a Collection.
     * @param {Document} parent  The parent document.
     * @returns {DocumentCollection}
     */
    getCollection(parent: Document): DocumentCollection;
    /** @override */
    override _cleanElement(value: any, options: any, _state: any): object;
    /**
     * Apply an embedded collection update for a single element of the requested value array. Each element is one of:
     * an update to an existing record, the creation of a new record, or (for subclasses such as
     * {@link EmbeddedCollectionDeltaField}) a tombstone marking a deletion. Subclasses may override this method to
     * intercept element-level update behavior.
     * @param {object} v                                The element being processed.
     * @param {object|undefined} existingSource         The existing source record matched by `_id`, if any.
     * @param {EmbeddedCollectionUpdateContext} ctx     Loop-local context shared across elements.
     * @protected
     */
    protected _updateElement(v: object, existingSource: object | undefined, ctx: EmbeddedCollectionUpdateContext): void;
    /**
     * Commit a single element into the destination source array.
     * Subclasses may override this method to apply specialized logic for individual elements.
     * @param {object} obj                            The element being committed
     * @param {object[]} src                          The destination source array under construction
     * @param {Record<string, object>} existing       Map of pre-update source records
     * @param {Record<string, object>} changed        Map of diff entries
     * @param {DataModelUpdateOptions} options        Update options
     * @protected
     */
    protected _commitElement(obj: object, src: object[], existing: Record<string, object>, changed: Record<string, object>, options: DataModelUpdateOptions): void;
    /** @override */
    override apply(fn: any, value?: any[], options?: {}): {}[];
}
/**
 * A subclass of {@link foundry.data.fields.DataModelSchemaField} used for embedded data models.
 */
export class EmbeddedDataField extends DataModelSchemaField {
    /** @override */
    override _validateModel(changes: any, options: any): void;
}
/**
 * A subclass of {@link foundry.data.fields.EmbeddedDataField} which supports a single embedded Document.
 */
export class EmbeddedDocumentField extends EmbeddedDataField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        required: boolean;
        nullable: boolean;
    } & {
        nullable: boolean;
    };
    /**
     * @param {typeof Document} model       The type of Document which is embedded.
     * @param {DataFieldOptions} [options]  Options which configure the behavior of the field.
     * @param {DataFieldContext} [context]  Additional context which describes the field
     */
    constructor(model: typeof Document, options?: DataFieldOptions | undefined, context?: DataFieldContext | undefined);
    /**
     * Return the embedded document(s) as a Collection.
     * @param {Document} parent  The parent document.
     * @returns {Collection<string, Document>}
     */
    getCollection(parent: Document): Collection<string, Document>;
}
/**
 * A special {@link foundry.data.fields.StringField} which records a file path or inline base64 data.
 *
 * When using the `FilePathField` in a data model that is persisted to the database, for example a Document sub-type, it is essential to declare this field in the package manifest so that it receives proper server-side validation of its contents.
 * See {@link foundry.packages.types.ServerSanitizationFields} for information about this structure.
 *
 * @property {string[]} categories      A set of categories in CONST.FILE_CATEGORIES which this field supports
 * @property {boolean} base64=false     Is embedded base64 data supported in lieu of a file path?
 * @property {boolean} texture=false    Does the file path field allow specifying a virtual file path which must begin
 *                                      with the "#" character?
 * @property {boolean} wildcard=false   Does this file path field allow wildcard characters?
 */
export class FilePathField extends StringField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        blank: boolean;
        trim: boolean;
        choices: undefined;
        textSearch: boolean;
    } & {
        categories: never[];
        base64: boolean;
        wildcard: boolean;
        virtual: boolean;
        nullable: boolean;
        blank: boolean;
        initial: null;
    };
    /**
     * @param {FilePathFieldOptions} [options]  Options which configure the behavior of the field
     * @param {DataFieldContext} [context]      Additional context which describes the field
     */
    constructor(options?: FilePathFieldOptions | undefined, context?: DataFieldContext | undefined);
    categories: any[] | undefined;
    /** @override */
    override _toInput(config: any): HTMLElement;
}
/**
 * A special class of {@link foundry.data.fields.StringField} field which references another DataModel by its id.
 * This field may also be null to indicate that no foreign model is linked.
 */
export class ForeignDocumentField extends DocumentIdField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        blank: boolean;
        trim: boolean;
        choices: undefined;
        textSearch: boolean;
    } & {
        required: boolean;
        blank: boolean;
        nullable: boolean;
        readonly: boolean;
        validationError: string;
    } & {
        nullable: boolean;
        readonly: boolean;
        idOnly: boolean;
    };
    /**
     * @param {typeof Document} model  The foreign DataModel class definition which this field links to
     * @param {StringFieldOptions} [options]    Options which configure the behavior of the field
     * @param {DataFieldContext} [context]      Additional context which describes the field
     */
    constructor(model: typeof Document, options?: StringFieldOptions | undefined, context?: DataFieldContext | undefined);
    /**
     * A reference to the model class which is stored in this field
     * @type {typeof Document}
     */
    model: typeof Document;
    /** @inheritdoc */
    initialize(value: any, model: any, options?: {}): any;
    /** @inheritdoc */
    toObject(value: any): any;
    /** @override */
    override _toInput(config: any): HTMLSelectElement;
}
/**
 * The field for a grid offset.
 */
export class GridOffsetField extends SchemaField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        required: boolean;
        nullable: boolean;
    } & {
        dimensions: number;
    };
    /**
     * @param {GridOffsetFieldOptions} [options]  Options which configure the behavior of the field
     * @param {DataFieldContext} [context]        Additional context which describes the field
     */
    constructor(options?: GridOffsetFieldOptions | undefined, context?: DataFieldContext | undefined);
}
/**
 * The field of an array/set of grid offsets.
 */
export class GridOffsetsField extends ArrayField<DataField> {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        required: boolean;
        nullable: boolean;
        empty: boolean;
        exact: undefined;
        min: number;
        max: number;
    } & {
        dimensions: number;
    };
    /**
     * @param {GridOffsetsFieldOptions} [options]  Options which configure the behavior of the field
     * @param {DataFieldContext} [context]         Additional context which describes the field
     */
    constructor(options?: GridOffsetsFieldOptions | undefined, context?: DataFieldContext | undefined);
    /** @override */
    override _toInput(config: any): foundry.applications.elements.HTMLStringTagsElement;
}
/**
 * A subclass of {@link foundry.data.fields.StringField} which contains a sanitized HTML string.
 * This class does not override any StringField behaviors, but is used by the server-side to identify fields which
 * require sanitization of user input.
 *
 * When using the `HTMLField` in a data model that is persisted to the database, for example a Document sub-type, it is essential to declare this field in the package manifest so that it receives proper server-side validation of its contents.
 * See {@link foundry.packages.types.ServerSanitizationFields} for information about this structure.
 */
export class HTMLField extends StringField {
    /** @inheritDoc */
    static get _defaults(): DataFieldOptions & {
        blank: boolean;
        trim: boolean;
        choices: undefined;
        textSearch: boolean;
    } & {
        required: boolean;
        blank: boolean;
    };
    /** @inheritDoc */
    toFormGroup(groupConfig?: {}, inputConfig?: {}): HTMLDivElement;
    /** @inheritDoc */
    _toInput(config: any): HTMLElement | foundry.applications.elements.HTMLCodeMirrorElement;
}
/**
 * A special {@link foundry.data.fields.NumberField} represents a number between 0 (inclusive) and 1 (exclusive).
 * Its values are normalized (modulo 1) to the range [0, 1) instead of being clamped.
 */
export class HueField extends NumberField {
    static get _defaults(): never;
    /** @inheritdoc */
    _cast(value: any): any;
    /** @override */
    override _toInput(config: any): foundry.applications.elements.HTMLHueSelectorSlider;
}
/**
 * A subclass of {@link foundry.data.fields.NumberField} which is used for storing integer sort keys.
 */
export class IntegerSortField extends NumberField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        nullable: boolean;
        min: undefined;
        max: undefined;
        step: undefined;
        integer: boolean;
        positive: boolean;
        choices: undefined;
    } & {
        required: boolean;
        nullable: boolean;
        integer: boolean;
        initial: number;
    };
}
/**
 * A special {@link foundry.data.fields.StringField} which contains serialized JSON data.
 */
export class JSONField extends StringField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        blank: boolean;
        trim: boolean;
        choices: undefined;
        textSearch: boolean;
    } & {
        blank: boolean;
        trim: boolean;
        initial: undefined;
        validationError: string;
    };
    constructor(options: any, context: any);
    choices: any;
    /** @override */
    override _validateType(value: any, _options: any): void;
    /** @override */
    override initialize(value: any, model: any, options?: {}): any;
    /** @override */
    override toObject(value: any): any;
    /**
     * @param {FormInputConfig & CodeMirrorInputConfig} config
     * @override
     */
    override _toInput(config: FormInputConfig & CodeMirrorInputConfig): foundry.applications.elements.HTMLCodeMirrorElement;
}
/**
 * A subclass of {@link foundry.data.fields.StringField} which contains JavaScript code.
 */
export class JavaScriptField extends StringField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        blank: boolean;
        trim: boolean;
        choices: undefined;
        textSearch: boolean;
    } & {
        required: boolean;
        blank: boolean;
        nullable: boolean;
        async: boolean;
    };
    /**
     * @param {JavaScriptFieldOptions} [options] Options which configure the behavior of the field
     * @param {DataFieldContext} [context]    Additional context which describes the field
     */
    constructor(options?: JavaScriptFieldOptions | undefined, context?: DataFieldContext | undefined);
    choices: any;
    /** @override */
    override toFormGroup(groupConfig?: {}, inputConfig?: {}): HTMLDivElement;
    /**
     * @param {FormInputConfig & CodeMirrorInputConfig} config
     * @override
     */
    override _toInput(config: FormInputConfig & CodeMirrorInputConfig): foundry.applications.elements.HTMLCodeMirrorElement;
}
/**
 * A subclass of {@link foundry.data.fields.DataField} which deals with number-typed data.
 *
 * @property {number} min                 A minimum allowed value
 * @property {number} max                 A maximum allowed value
 * @property {number} step                A permitted step size
 * @property {boolean} integer=false      Must the number be an integer?
 * @property {boolean} positive=false     Must the number be positive?
 * @property {number[]|object|Function} [choices] An array of values or an object of values/labels which represent
 *                                        allowed choices for the field. A function may be provided which dynamically
 *                                        returns the array of choices.
 */
export class NumberField extends DataField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        nullable: boolean;
        min: undefined;
        max: undefined;
        step: undefined;
        integer: boolean;
        positive: boolean;
        choices: undefined;
    };
    /**
     * @param {NumberFieldOptions} options  Options which configure the behavior of the field
     * @param {DataFieldContext} [context]  Additional context which describes the field
     */
    constructor(options?: NumberFieldOptions, context?: DataFieldContext | undefined);
    nullable: boolean | undefined;
    /** @override */
    override _cast(value: any): number | null;
    /** @override */
    override _cleanType(value: any, _options: any, _state: any): any;
    /** @override */
    override _validateType(value: any, _options: any): void;
    /** @override */
    override _toInput(config: any): HTMLInputElement | HTMLSelectElement | foundry.applications.elements.HTMLRangePickerElement;
    /** @inheritDoc */
    _castChangeDelta(raw: any, replacementData: any): any;
    /** @override */
    override _applyChangeSubtract(value: any, delta: any, model: any, change: any): number;
    /** @override */
    override _applyChangeMultiply(value: any, delta: any, model: any, change: any): number;
    /** @override */
    override _applyChangeUpgrade(value: any, delta: any, model: any, change: any): any;
    /** @override */
    override _applyChangeDowngrade(value: any, delta: any, model: any, change: any): any;
    #private;
}
/**
 * A subclass of DataField which deals with object-typed data.
 */
export class ObjectField extends DataField {
    /** @inheritDoc */
    static get _defaults(): DataFieldOptions & {
        required: boolean;
        nullable: boolean;
    };
    /** @override */
    override getInitialValue(source: any): any;
    /** @override */
    override _cast(value: any): any;
    /** @override */
    override _cleanType(data: any, options: any, _state: any): object;
    /** @override */
    override initialize(value: any, model: any, options?: {}): any;
    /** @override */
    override _validateType(value: any, _options: any): void;
    /** @override */
    override _updateDiff(key: any, value: any, options: any, state: any): void;
    /** @inheritDoc */
    _updateCommit(source: any, key: any, value: any, diff: any, options: any): void;
    /** @override */
    override toObject(value: any): any;
    /** @override */
    override _applyChangeAdd(value: any, delta: any, model: any, change: any): any;
    #private;
}
/**
 * A nullable set field used to reference a set of specific Scene Level documents.
 */
export class SceneLevelsSetField extends SetField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        required: boolean;
        nullable: boolean;
        empty: boolean;
        exact: undefined;
        min: number;
        max: number;
    } & {
        required: boolean;
        initial: never[];
    };
    /**
     * @param {ArrayFieldOptions} [options]  Options which configure the behavior of the field
     * @param {DataFieldContext} [context]   Additional context which describes the field
     */
    constructor(options?: ArrayFieldOptions | undefined, context?: DataFieldContext | undefined);
}
/**
 * A special class of {@link foundry.data.fields.DataField} which defines a data schema.
 */
export class SchemaField extends DataField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        required: boolean;
        nullable: boolean;
    };
    /**
     * Expand a transacted object.
     * @param {object} data                       The object.
     * @param {DataModelCleaningOptions} options  Cleaning operation options.
     * @param {DataModelUpdateState} _state       Cleaning operation state.
     */
    static expandObject(data: object, options: DataModelCleaningOptions, _state: DataModelUpdateState): void;
    /**
     * When iterating over the keys and values of an object, reconstruct serialized DataFieldOperator values.
     * @param {object} data
     * @param {string} k
     * @param {any} v
     */
    static reconstructOperator(data: object, k: string, v: any): void;
    /**
     * An internal helper function that attempts fallback to a valid initial value in the case of validation failure.
     * @param {DataField} field                             The child data field being handled
     * @param {object} data                                 Data attempted for validation at the parent level
     * @param {string} key                                  The key of this field being validated
     * @param {DataModelValidationFailure} parentFailure    The validation failure at the parent level
     * @param {DataModelValidationFailure} fieldFailure     The validation failure at this field level
     * @param {Partial<DataModelValidationOptions>} options Handling options
     * @internal
     */
    static _handleValidationFailure(field: DataField, data: object, key: string, parentFailure: DataModelValidationFailure, fieldFailure: DataModelValidationFailure, options: Partial<DataModelValidationOptions>): void;
    /**
     * @param {DataSchema} fields                 The contained field definitions
     * @param {DataFieldOptions} [options]        Options which configure the behavior of the field
     * @param {DataFieldContext} [context]        Additional context which describes the field
     */
    constructor(fields: DataSchema, options?: DataFieldOptions | undefined, context?: DataFieldContext | undefined);
    /**
     * The contained field definitions.
     * @type {DataSchema}
     */
    fields: DataSchema;
    /**
     * Initialize and validate the structure of the provided field definitions.
     * @param {DataSchema} fields     The provided field definitions
     * @returns {DataSchema}          The validated schema
     * @protected
     */
    protected _initialize(fields: DataSchema): DataSchema;
    /**
     * Extend this schema definition with additional fields.
     * @param {DataSchema} fields  The additional fields.
     */
    extendFields(fields: DataSchema): void;
    /**
     * Remove fields from this schema definition.
     * @param {string[]} fields  The fields to remove.
     */
    removeFields(fields: string[]): void;
    /**
     * An array of field names which are present in the schema.
     * @returns {string[]}
     */
    keys(): string[];
    /**
     * An array of DataField instances which are present in the schema.
     * @returns {DataField[]}
     */
    values(): DataField[];
    /**
     * An array of [name, DataField] tuples which define the schema.
     * @returns {Array<[string, DataField]>}
     */
    entries(): Array<[string, DataField]>;
    /**
     * Test whether a certain field name belongs to this schema definition.
     * @param {string} fieldName    The field name
     * @returns {boolean}           Does the named field exist in this schema?
     */
    has(fieldName: string): boolean;
    /**
     * Get a DataField instance from the schema by name.
     * @param {string} fieldName    The field name
     * @returns {DataField|void}    The DataField instance or undefined
     */
    get(fieldName: string): DataField | void;
    /**
     * Traverse the schema, obtaining the DataField definition for a particular field.
     * @param {string[]|string} pathOrKey  A field path or property key if `options.source` is given.
     *                                     Examples: `["abilities", "strength"]` or `"abilities.strength"`.
     * @param {object} [options]           Additional options
     * @param {object} [options.source]    The (partial) source data of the field
     * @returns {DataField|undefined}      The corresponding DataField definition for that field, or undefined
     */
    getField(pathOrKey: string[] | string, { source }?: {
        source?: object | undefined;
    } | undefined): DataField | undefined;
    /** @override */
    override _getField(parts: any, { source }?: {}): DataField | this | undefined;
    /** @override */
    override getInitialValue(source: any): any;
    /** @override */
    override _cast(value: any): any;
    /** @inheritdoc */
    _cleanType(data: any, options: any, _state: any): any;
    /** @override */
    override initialize(value: any, model: any, options?: {}): any;
    /** @inheritDoc */
    _updateDiff(key: any, value: any, options: any, state: any): void;
    /** @override */
    override _updateCommit(source: any, key: any, value: any, diff: any, options: any): void;
    /** @override */
    override _validateType(data: any, options?: {}): void;
    /** @override */
    override _validateRecursive(data: any, options: any): void;
    /** @override */
    override _validateModel(changes: any, options?: {}): void;
    /** @override */
    override toObject(value: any): any;
    /** @override */
    override apply(fn: any, data?: {}, options?: {}): {};
    /** @override */
    override _applyChangeAdd(value: any, delta: any, model: any, change: any): any;
    /**
     * Iterate over a SchemaField by iterating over its fields.
     * @yields {DataField}
     */
    [Symbol.iterator](): Generator<any, void, unknown>;
    #private;
}
/**
 * A subclass of {@link foundry.data.fields.ArrayField} which supports a set of contained elements.
 * Elements in this set are treated as fungible and may be represented in any order or discarded if invalid.
 */
export class SetField extends ArrayField<DataField> {
    /**
     * @param {ElementType} element          The type of element contained in the Array
     * @param {ArrayFieldOptions} [options]  Options which configure the behavior of the field
     * @param {DataFieldContext} [context]   Additional context which describes the field
     */
    constructor(element: DataField, options?: ArrayFieldOptions | undefined, context?: DataFieldContext | undefined);
    /** @override */
    override _validateRecursive(value: any, options?: {}): void;
    /** @override */
    override _toInput(config: any): any;
    /** @inheritDoc */
    _castChangeDelta(raw: any, replacementData: any): Set<any>;
    /** @override */
    override _applyChangeSubtract(value: any, delta: any, model: any, change: any): any;
    /** @override */
    override _applyChangeUpgrade(value: any, delta: any, model: any, change: any): any;
    /** @override */
    override _applyChangeDowngrade(value: any, delta: any, model: any, change: any): any;
}
/**
 * A subclass of {@link foundry.data.fields.ArrayField} for shapes.
 */
export class ShapesField extends ArrayField<DataField> {
    /**
     * @param {ArrayFieldOptions} [options]  Options which configure the behavior of the field
     * @param {DataFieldContext} [context]   Additional context which describes the field
     */
    constructor(options?: ArrayFieldOptions | undefined, context?: DataFieldContext | undefined);
}
/**
 * A subclass of {@link foundry.data.fields.DataField} which deals with string-typed data.
 */
export class StringField extends DataField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        blank: boolean;
        trim: boolean;
        choices: undefined;
        textSearch: boolean;
    };
    /**
     * Prepare form input configuration to accept a limited choice set of options.
     * @param {FormInputConfig & Partial<ChoiceInputConfig>} [config]
     * @internal
     */
    static _prepareChoiceConfig(config?: (FormInputConfig & Partial<ChoiceInputConfig>) | undefined): void;
    /**
     * Convert a choice entry into a standardized FormSelectOption
     * @param {string|object} entry
     * @param {{labelAttr?: string; valueAttr?: string}} options
     * @returns {FormSelectOption}
     */
    static "__#249@#getChoiceFromEntry"(entry: string | object, { labelAttr, valueAttr }: {
        labelAttr?: string;
        valueAttr?: string;
    }): FormSelectOption;
    /**
     * @param {StringFieldOptions} [options]  Options which configure the behavior of the field
     * @param {DataFieldContext} [context]    Additional context which describes the field
     */
    constructor(options?: StringFieldOptions | undefined, context?: DataFieldContext | undefined);
    nullable: boolean | undefined;
    /**
     * Is the string allowed to be blank (empty)?
     * @type {boolean}
     */
    blank: boolean;
    /**
     * Should any provided string be trimmed as part of cleaning?
     * @type {boolean}
     */
    trim: boolean;
    /**
     * An array of values or an object of values/labels which represent
     * allowed choices for the field. A function may be provided which dynamically
     * returns the array of choices.
     * @type {string[]|object|Function}
     */
    choices: string[] | object | Function;
    /**
     * Is this string field a target for text search?
     * @type {boolean}
     */
    textSearch: boolean;
    /** @inheritdoc */
    clean(value: any, options: any, _state: any): any;
    /** @override */
    override getInitialValue(source: any): any;
    /** @override */
    override _cast(value: any): string;
    /** @inheritdoc */
    _validateSpecial(value: any): boolean | void;
    /** @override */
    override _validateType(value: any, _options: any): true | undefined;
    /**
     * Test whether a provided value is a valid choice from the allowed choice set
     * @param {string} value      The provided value
     * @returns {boolean}         Is the choice valid?
     * @protected
     */
    protected _isValidChoice(value: string): boolean;
    /**
     * @param {FormInputConfig & StringFieldInputConfig} config
     * @override
     */
    override _toInput(config: FormInputConfig & StringFieldInputConfig): HTMLElement | foundry.applications.elements.HTMLCodeMirrorElement;
    /** @inheritDoc */
    _replaceDataRefs(raw: any, data: any, { strict }?: {
        strict?: boolean | undefined;
    }): string;
    /**
     * @param {string} value
     * @param {string} delta
     * @override
     */
    override _applyChangeSubtract(value: string, delta: string, model: any, change: any): string;
}
/**
 * A subclass of {@link foundry.data.fields.ObjectField} which supports a type-specific data object.
 */
export class TypeDataField extends ObjectField {
    /**
     * Return the package that provides the sub-type for the given model.
     * @param {DataModel} model       The model instance created for this sub-type.
     * @returns {System|Module|null}
     */
    static getModelProvider(model: DataModel): System | Module | null;
    /**
     * @param {typeof Document} document      The base document class which belongs in this field
     * @param {DataFieldOptions} [options]    Options which configure the behavior of the field
     * @param {DataFieldContext} [context]    Additional context which describes the field
     */
    constructor(document: typeof Document, options?: DataFieldOptions | undefined, context?: DataFieldContext | undefined);
    /**
     * The canonical document name of the document type which belongs in this field
     * @type {typeof Document}
     */
    document: typeof Document;
    /**
     * A convenience accessor for the name of the document type associated with this TypeDataField
     * @type {string}
     */
    get documentName(): string;
    /**
     * Get the DataModel definition that should be used for this type of document.
     * @param {string} type              The Document instance type
     * @returns {typeof DataModel|null}  The DataModel class or null
     */
    getModelForType(type: string): typeof DataModel | null;
    /** @override */
    override _getField(parts: any, { source, type }?: {}): any;
    /** @inheritDoc */
    clean(value: any, options: any, _state: any): any;
    /** @override */
    override _migrate(value: any, options: any, _state: any): any;
    /** @override */
    override _cleanType(value: any, options: any, _state: any): any;
    /** @override */
    override _validateRecursive(value: any, options: any): any;
    /** @override */
    override _validateModel(changes: any, options?: {}): any;
}
/**
 * A subclass of ObjectField that represents a mapping of keys to the provided DataField type.
 */
export class TypedObjectField extends ObjectField {
    /** @inheritDoc */
    static get _defaults(): object;
    /**
     * @param {DataField} element                  The value type of each entry in this object.
     * @param {TypedObjectFieldOptions} [options]  Options which configure the behavior of the field.
     * @param {DataFieldContext} [context]         Additional context which describes the field
     */
    constructor(element: DataField, options?: TypedObjectFieldOptions | undefined, context?: DataFieldContext | undefined);
    /**
     * The value type of each entry in this object.
     * @type {DataField}
     */
    element: DataField;
    /** @override */
    override _getField(parts: any, { source }?: {}): DataField | this | undefined;
    /** @override */
    override _cleanType(data: any, options: any, _state: any): any;
    /** @override */
    override _validateRecursive(data: any, options?: {}): void;
    /** @override */
    override _validateModel(changes: any, options?: {}): void;
    /** @override */
    override apply(fn: any, data?: {}, options?: {}): {};
}
/**
 * A subclass of {@link foundry.data.fields.DataField} that defines a union of schema-constrained objects discriminable
 * via a `type` property.
 */
export class TypedSchemaField extends DataField {
    /** @inheritdoc */
    static get _defaults(): DataFieldOptions & {
        required: boolean;
    };
    /**
     * @param {Record<string, DataSchema|SchemaField|typeof DataModel>} types The different types this field can represent
     * @param {DataFieldOptions} [options]                                    Options for configuring the field
     * @param {DataFieldContext} [context]                                    Additional context describing the field
     */
    constructor(types: Record<string, DataSchema | SchemaField | typeof DataModel>, options?: DataFieldOptions | undefined, context?: DataFieldContext | undefined);
    /**
     * The types of this field.
     * @type {{[type: string]: SchemaField}}
     */
    types: {
        [type: string]: SchemaField;
    };
    /** @override */
    override _getField(parts: any, { source }?: {}): DataField | SchemaField | this | undefined;
    /** @override */
    override _cast(value: any): any;
    /** @override */
    override _cleanType(value: any, options: any, _state: any): any;
    /** @override */
    override _validateType(value: any, options: any): void | DataModelValidationFailure;
    /** @override */
    override initialize(value: any, model: any, options: any): any;
    /** @inheritDoc */
    _updateDiff(key: any, value: any, options: any, state: any): void;
    /** @inheritDoc */
    _updateCommit(source: any, key: any, value: any, diff: any, options: any): void;
    /** @override */
    override toObject(value: any): any;
    /** @override */
    override apply(fn: any, data?: {}, options?: {}): {};
    #private;
}
import type { DataFieldOptions } from "./_types.mjs";
import type { DataModelCleaningOptions } from "./_types.mjs";
import type { DataModelUpdateState } from "./_types.mjs";
import type { ArrayFieldOptions } from "./_types.mjs";
import type { DataFieldContext } from "./_types.mjs";
import type { DataModelSanitizationOptions } from "./_types.mjs";
import type { DataFieldValidationOptions } from "./_types.mjs";
import { DataModelValidationFailure } from "./validation-failure.mjs";
import type { DataModelUpdateOptions } from "../abstract/_types.mjs";
import type { FormInputConfig } from "./_types.mjs";
import type { FormGroupConfig } from "./_types.mjs";
import type { EffectChangeData } from "../documents/_types.mjs";
import type { Document } from "../abstract/_module.mjs";
import type { StringFieldOptions } from "./_types.mjs";
import type { DocumentUUIDFieldOptions } from "./_types.mjs";
import EmbeddedCollectionDelta from "../abstract/embedded-collection-delta.mjs";
import type { EmbeddedCollectionUpdateContext } from "./_types.mjs";
import EmbeddedCollection from "../abstract/embedded-collection.mjs";
import type { FilePathFieldOptions } from "./_types.mjs";
import type { GridOffsetFieldOptions } from "./_types.mjs";
import type { GridOffsetsFieldOptions } from "./_types.mjs";
import type { CodeMirrorInputConfig } from "./_types.mjs";
import type { JavaScriptFieldOptions } from "./_types.mjs";
import type { NumberFieldOptions } from "./_types.mjs";
import type { DataSchema } from "../abstract/_types.mjs";
import type { StringFieldInputConfig } from "./_types.mjs";
import type { ChoiceInputConfig } from "./_types.mjs";
import type { FormSelectOption } from "../../client/applications/forms/fields.mjs";
import type { TypedObjectFieldOptions } from "./_types.mjs";
