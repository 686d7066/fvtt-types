/**
 * @import {DataModelUpdateState, DataModelCleaningOptions} from "../data/_types.mjs";
 * @import {DataField} from "../data/fields.mjs";
 * @import {
 *  DataModelConstructionContext,
 *  DataModelFromSourceOptions,
 *  DataModelSanitizationOptions,
 *  DataModelUpdateOptions,
 *  DataModelValidationOptions,
 *  DataSchema
 * } from "./_types.mjs";
 */
/**
 * An abstract class which is a fundamental building block of numerous structures and concepts in Foundry Virtual
 * Tabletop. Data models perform several essential roles:
 *
 * * A static schema definition that all instances of that model adhere to.
 * * A workflow for data migration, cleaning, validation, and initialization such that provided input data is structured
 *   according to the rules of the model's declared schema.
 * * A workflow for transacting differential updates to the instance data and serializing its data into format suitable
 *   for storage or transport.
 *
 * DataModel subclasses can be used for a wide variety of purposes ranging from simple game settings to high complexity
 * objects like `Scene` documents. Data models are often nested; see the {@link DataModel.parent} property for more.
 *
 * @abstract
 * @template {object} [ModelData=object]
 * @template {DataModelConstructionContext} [ModelContext=DataModelConstructionContext]
 */
export default class DataModel<ModelData extends object = object, ModelContext extends DataModelConstructionContext = DataModelConstructionContext> {
    /**
     * The defined and cached Data Schema for all instances of this DataModel.
     * @type {DataModelSchemaField}
     * @internal
     */
    static _schema: DataModelSchemaField;
    /**
     * Define the data schema for models of this type.
     * The schema is populated the first time it is accessed and cached for future reuse.
     *
     * The schema, through its fields, provide the essential cleaning, validation, and initialization methods to turn the
     * {@link _source} values into direct properties of the data model. The schema is a static property of the model and
     * is reused by all instances to perform validation.
     *
     * The schemas defined by the core software in classes like {@link foundry.documents.BaseActor} are validated by the
     * server, where user code does not run. However, almost all documents have a `flags` field to store data, and many
     * have a `system` field that can be configured to be a {@link foundry.abstract.TypeDataModel} instance. Those models
     * are *not* constructed on the server and rely purely on client-side code, which means certain extra-sensitive fields
     * must be also be registered through your package manifest. {@link foundry.packages.types.ServerSanitizationFields}
     *
     * @returns {DataSchema}
     * @abstract
     *
     * @example
     * ```js
     * class SomeModel extends foundry.abstract.DataModel {
     *   static defineSchema() {
     *     return {
     *       foo: new foundry.data.fields.StringField()
     *     }
     *   }
     * }
     *
     * class AnotherModel extends SomeModel {
     *   static defineSchema() {
     *     // Inheritance and object oriented principles apply to schema definition
     *     const schema = super.defineSchema()
     *
     *     schema.bar = new foundry.data.fields.NumberField()
     *
     *     return schema;
     *   }
     * }
     * ```
     */
    static defineSchema(): DataSchema;
    /**
     * The Data Schema for all instances of this DataModel.
     * @type {DataModelSchemaField}
     */
    static get schema(): DataModelSchemaField;
    /**
     * A set of localization prefix paths which are used by this DataModel. This provides an alternative to defining the
     * `label` and `hint` property of each field by having foundry map the labels to a structure inside the path
     * provided by the prefix.
     *
     * @type {string[]}
     *
     * @example
     * JavaScript class definition and localization call.
     * ```js
     * class MyDataModel extends foundry.abstract.DataModel {
     *   static defineSchema() {
     *     return {
     *       foo: new foundry.data.fields.StringField(),
     *       bar: new foundry.data.fields.NumberField()
     *     };
     *   }
     *   static LOCALIZATION_PREFIXES = ["MYMODULE.MYDATAMODEL"];
     * }
     *
     * Hooks.on("i18nInit", () => {
     *   // Foundry will attempt to automatically localize models registered for a document subtype, so this step is only
     *   // needed for other data model usage, e.g. for a Setting.
     *   Localization.localizeDataModel(MyDataModel);
     * });
     * ```
     *
     * JSON localization file
     * ```json
     * {
     *   "MYMODULE": {
     *     "MYDATAMODEL": {
     *       "FIELDS" : {
     *         "foo": {
     *           "label": "Foo",
     *           "hint": "Instructions for foo"
     *         },
     *         "bar": {
     *           "label": "Bar",
     *           "hint": "Instructions for bar"
     *         }
     *       }
     *     }
     *   }
     * }
     * ```
     */
    static LOCALIZATION_PREFIXES: string[];
    /**
     * Clean a data source object to conform to a specific provided schema.
     * @param {object} [data]                       Provided model data that requires cleaning
     * @param {DataModelCleaningOptions} [options]  Options that configure how data cleaning is performed
     * @param {Partial<DataModelUpdateState>} [_state]  Internal options used during cleaning recursion
     * @returns {object}                            Cleaned data which is suitable for validation and usage
     */
    static cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: DataModelCleaningOptions | undefined, _state?: Partial<DataModelUpdateState> | undefined): object;
    /**
     * Apply preliminary model-specific cleaning rules or alter cleaning options or initial state.
     * Subclass models may implement this function to configure the cleaning workflow.
     * Any mutations to data, options, or _state parameters are performed inplace.
     * @param {object} data                               The provided input data for cleaning
     * @param {DataModelCleaningOptions} options          Options which define how cleaning should be performed
     * @param {DataModelUpdateState} _state               The data cleaning state
     * @protected
     */
    protected static _preCleanData(data: object, options: DataModelCleaningOptions, _state: DataModelUpdateState): void;
    /**
     * Apply final custom model-specific cleaning rules after data schema fields are cleaned.
     * Subclass models can implement this function as an ideal place to apply custom imputation or cleaning.
     * Cleaning must be done in-place rather than returning a different object.
     * @param {object} data                                 The provided input data for cleaning
     * @param {Readonly<DataModelCleaningOptions>} options  Options which define how cleaning was performed
     * @param {DataModelUpdateState} _state                 The data cleaning state
     * @returns {object}                                    The original data object, with cleaning performed inplace
     * @protected
     */
    protected static _cleanData(data: object, options: Readonly<DataModelCleaningOptions>, _state: DataModelUpdateState): object;
    /**
     * Evaluate joint validation rules which apply validation conditions across multiple fields of the model.
     * Field-specific validation rules should be defined as part of the DataSchema for the model.
     * This method allows for testing aggregate rules which impose requirements on the overall model.
     * @param {object} data     Candidate data for the model
     * @throws {Error}          An error if a validation failure is detected
     */
    static validateJoint(data: object): void;
    /**
     * Create a new instance of this DataModel from a source record.
     * The source data is presumed trustworthy and is not strictly validated unless explicitly requested.
     * @param {object} source    Initial document data which comes from a trusted source.
     * @param {Omit<DataModelConstructionContext, "strict"> & DataModelFromSourceOptions} [context]
     *                           Model construction context
     * @returns {DataModel}
     */
    static fromSource(source: object, { strict, ...context }?: (Omit<DataModelConstructionContext, "strict"> & DataModelFromSourceOptions) | undefined): DataModel;
    /**
     * Create a DataModel instance using a provided serialized JSON string.
     * @param {string} json       Serialized document data in string format
     * @returns {DataModel}       A constructed data model instance
     */
    static fromJSON(json: string): DataModel;
    /**
     * Convert each value of a changes object to be a ForcedReplacement operator.
     * @param {object} changes        An object of changes which will be mutated inplace
     */
    static "__#3@#performNonRecursiveUpdate"(changes: object): void;
    /**
     * Wrap data migration in a try/catch which attempts it safely.
     *
     * @param {object} source                       Candidate source data for the module, before further cleaning
     * @param {Readonly<DataModelCleaningOptions>} [options]  Additional options for how the field is cleaned
     * @param {DataModelUpdateState} [_state]       Internal state variables which are used during recursion
     * @returns {object}                            Migrated source data, ready for further cleaning
     */
    static migrateDataSafe(source: object, options?: Readonly<DataModelCleaningOptions> | undefined): object;
    /**
     * Migrate candidate source data for this DataModel which may require initial cleaning or transformations.
     * @param {object} source                       Candidate source data for the module, before further cleaning
     * @param {Readonly<DataModelCleaningOptions>} [options]  Additional options for how the field is cleaned
     * @param {DataModelUpdateState} [_state]       Internal state variables which are used during recursion
     * @returns {object}                            Migrated source data, ready for further cleaning
     */
    static migrateData(source: object, options?: Readonly<DataModelCleaningOptions> | undefined, _state?: DataModelUpdateState | undefined): object;
    /**
     * Take data which conforms to the current data schema and add backwards-compatible accessors to it in order to
     * support older code which uses this data.
     * @param {object} data         Data which matches the current schema
     * @param {object} [options={}] Additional shimming options
     * @param {boolean} [options.embedded=true] Apply shims to embedded models?
     * @returns {object}            Data with added backwards-compatible properties, which is the same object as
     *                              the `data` argument
     */
    static shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    /**
     * @deprecated since v14
     * @ignore
     */
    static _initializationOrder(): Generator<never, void, unknown>;
    /**
     * @param {Partial<ModelData>} [data={}] Initial data used to construct the data object. The provided object will be
     *                                       owned by the constructed model instance and may be mutated.
     * @param {ModelContext} [options={}]    Context and data validation options which affects initial model construction.
     */
    constructor(data?: Partial<ModelData> | undefined, { parent, schema, strict, ...options }?: ModelContext | undefined);
    /**
     * Configure the data model instance before validation and initialization workflows are performed.
     * @param {object} [options] Additional options modifying the configuration
     * @protected
     */
    protected _configure(options?: object | undefined): void;
    /**
     * The source data object for this DataModel instance.
     * Once constructed, the source object is sealed such that no keys may be added nor removed.
     * @type {ModelData}
     * @public
     */
    public _source: ModelData;
    /**
     * An immutable reverse-reference to a parent DataModel to which this model belongs.
     * @type {DataModel|null}
     */
    parent: DataModel | null;
    /**
     * Define the data schema for this document instance.
     * @type {DataModelSchemaField}
     */
    get schema(): DataModelSchemaField;
    /**
     * Is the current state of this DataModel invalid?
     * The model is invalid if there is any unresolved failure.
     * @type {boolean}
     */
    get invalid(): boolean;
    /**
     * An array of validation failure instances which may have occurred when this instance was last validated.
     * @type {{fields: DataModelValidationFailure|null, joint: DataModelValidationFailure|null}}
     */
    get validationFailures(): {
        fields: DataModelValidationFailure | null;
        joint: DataModelValidationFailure | null;
    };
    /**
     * Traverse the data model instance, obtaining the DataField definition for a field of a particular property.
     * @param {string[]|string} key      A property key like ["abilities", "strength"] or "abilities.strength"
     * @returns {DataField|undefined}    The corresponding DataField definition for that field, or undefined
     */
    getFieldForProperty(key: string[] | string): DataField | undefined;
    /**
     * Initialize the source data for a new DataModel instance.
     * One-time migrations and initial cleaning operations are applied to the source data.
     * @param {object|DataModel} data   The candidate source data from which the model will be constructed
     * @param {ModelContext} [options]  Options provided to the model constructor
     * @returns {object}                Migrated and cleaned source data which will be stored to the model instance,
     *                                  which is the same object as the `data` argument
     * @protected
     */
    protected _initializeSource(data: object | DataModel, options?: ModelContext | undefined): object;
    /**
     * Resolve a previously-initialized embedded DataModel that corresponds to an element being cleaned. Called during
     * recursive data cleaning when a parent field contains EmbeddedDataField elements, or a single nested DataModel
     * field (such as a TypeDataField), in order to propagate the inner DataModel into _state.model for the recursive
     * clean operation. A single (non-collection) inner model resolves to itself; collection elements are matched by
     * stable _id when one is present, otherwise by positional index.
     *
     * Subclasses may override when data preparation reshapes the field property in a way that the default cannot
     * interpret, for example wrapping the container in a non-iterable type or replacing it with a derived view.
     *
     * @param {DataField} field                 The schema field being recursed into.
     * @param {object} element
     * @param {object} element.value            The cleaned candidate value for the element being processed.
     * @param {number} [element.index]          The positional index of the element within a container, if applicable.
     * @param {Readonly<DataModelCleaningOptions>} [options]  The cleaning options in effect for the operation.
     * @returns {DataModel|null}                The corresponding previously-initialized inner DataModel, or null.
     * @protected
     */
    protected _getInnerModel(field: DataField, { value, index }?: {
        value: object;
        index?: number | undefined;
    }, options?: Readonly<DataModelCleaningOptions> | undefined): DataModel | null;
    /**
     * A generator that orders the DataFields in the DataSchema into an expected initialization order.
     * @returns {Generator<[string,DataField]>}
     * @yields {DataField}
     * @protected
     */
    protected _initializationOrder(): Generator<[string, DataField]>;
    /**
     * Initialize the instance by copying data from the source object to instance attributes.
     * This mirrors the workflow of SchemaField#initialize but with some added functionality.
     * @param {object} [options]        Options provided to the model constructor
     * @protected
     */
    protected _initialize(options?: object | undefined): void;
    /**
     * Reset the state of this data instance back to mirror the contained source data, erasing any changes.
     */
    reset(): void;
    /**
     * Clone a model, creating a new data model by combining current data with provided overrides.
     * @param {object} [data={}]             Additional data which overrides current document data at the time of creation
     * @param {DataModelConstructionContext} [context={}]          Context options passed to the data model constructor
     * @returns {DataModel|Promise<DataModel>} The cloned instance
     */
    clone(data?: object | undefined, context?: DataModelConstructionContext | undefined): DataModel | Promise<DataModel>;
    /**
     * Validate the data contained in the document to check for type and content.
     * This method is intended to validate complete model records, verifying both individual field validation as well
     * as joint model validity.
     *
     * For validating sets of partial model changes, it is preferred to call DataModel#updateSource as a `dryRun`. This
     * method provides a convenience alias for such a workflow if `changes` are provided.
     *
     * Warning: if fallback handling is allowed, this process will mutate provided changes or model source data.
     *
     * @param {DataModelValidationOptions} options    Options which modify how the model is validated
     * @returns {boolean}                             Whether the data source or proposed change is reported as valid.
     *                                                A boolean is always returned if validation is non-strict.
     * @throws {DataModelValidationError}             An error thrown if validation is strict and a failure occurs.
     */
    validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: DataModelValidationOptions): boolean;
    /**
     * Update the DataModel locally by applying an object of changes to its source data.
     * The provided changes are expanded, cleaned, validated, and stored to the source data object for this model.
     * The provided changes argument is mutated in this process.
     * The source data is then re-initialized to apply those changes to the prepared data.
     * The method returns an object of differential changes which modified the original data.
     *
     * @param {object} changes                  New values which should be applied to the data model
     * @param {DataModelUpdateOptions} options  Options which determine how the new data is merged
     * @returns {object}                        An object containing differential keys and values that were changed
     * @throws {DataModelValidationError}       An error if the requested data model changes were invalid
     */
    updateSource(changes?: object, options?: DataModelUpdateOptions): object;
    /**
     * Prepare the state object that is transacted through an updateSource operation.
     * @param {object} changes                  New values which should be applied to the data model
     * @param {DataModelUpdateOptions} options  Options which determine how the new data is merged
     * @param {DataModelUpdateState} _state     Data model update state
     * @protected
     */
    protected _preUpdateSource(changes: object, options: DataModelUpdateOptions, _state: DataModelUpdateState): void;
    /**
     * Perform the first step of the DataModel#_updateSource workflow which applies changes to a copy of model source
     * data and records the resulting diff.
     * @param {object} copy                     A mutable copy of model source data
     * @param {object} changes                  New values which should be applied to the data model
     * @param {DataModelUpdateOptions} options  Options which determine how the new data is merged
     * @param {DataModelUpdateState} _state     Data cleaning state
     * @returns {object}                        The resulting difference applied to source data
     * @throws {DataModelValidationFailure}     A failure if the proposed change is invalid
     * @protected
     */
    protected _updateDiff(copy: object, changes: object, options: DataModelUpdateOptions, _state: DataModelUpdateState): object;
    /**
     * Perform the second step of the DataModel#_updateSource workflow which applies the prepared diff to the model.
     * @param {object} copy                     The prepared copy of source data with changes applied
     * @param {object} diff                     The differential changes that were applied to source
     * @param {DataModelUpdateOptions} options  Options which determine how the new data is merged
     * @param {DataModelUpdateState} _state     Data cleaning state which might include instructions for final commit
     * @protected
     */
    protected _updateCommit(copy: object, diff: object, options: DataModelUpdateOptions, _state: DataModelUpdateState): void;
    /**
     * Copy and transform the DataModel into a plain object.
     * Draw the values of the extracted object from the data source (by default) otherwise from its transformed values.
     * @param {boolean} [source=true]     Draw values from the underlying data source rather than transformed values
     * @returns {object}                  The extracted primitive object
     */
    toObject(source?: boolean | undefined): object;
    /**
     * Extract the source data for the DataModel into a simple object format that can be serialized.
     * @returns {object}          The document source data expressed as a plain object
     */
    toJSON(): object;
    #private;
}
import type { DataModelConstructionContext } from "./_types.mjs";
import { DataModelSchemaField } from "../data/fields.mjs";
import { DataModelValidationFailure } from "../data/validation-failure.mjs";
import type { DataField } from "../data/fields.mjs";
import type { DataModelCleaningOptions } from "../data/_types.mjs";
import type { DataModelValidationOptions } from "./_types.mjs";
import type { DataModelUpdateOptions } from "./_types.mjs";
import type { DataModelUpdateState } from "../data/_types.mjs";
import type { DataSchema } from "./_types.mjs";
import type { DataModelFromSourceOptions } from "./_types.mjs";
