export type DataSchema = Record<string, DataField>;
export type _DocumentConstructionContext = {
    /**
     * The parent Document of this one, if this one is embedded
     */
    parent?: any;
    /**
     * The compendium collection ID which contains this Document, if any
     */
    pack?: string | null | undefined;
    /**
     * The name of the parent Document's collection that would contain this one
     */
    parentCollection?: string | null | undefined;
    /**
     * In a ServerDocument context, is this document being created?
     */
    creation?: boolean | undefined;
    /**
     * In a ServerDocument context, the timestamp of creation
     */
    modifiedTime?: number | undefined;
    /**
     * In a ServerDocument context, the User performing the construction
     */
    user?: any;
};
export type DocumentConstructionContext = DataModelConstructionContext & _DocumentConstructionContext;
export type DataModelValidationOptions = {
    /**
     * Validate each field. Ignored if changes are passed.
     */
    fields?: boolean | undefined;
    /**
     * Perform joint validation on the full data model.
     *        Ignored if changes are passed.
     */
    joint?: boolean | undefined;
    /**
     * A specific set of proposed changes to validate, rather than the full
     *            source data of the model. This type of validation is redirected to
     *            DataModel#updateSource as a dry-run.
     */
    changes?: object | undefined;
    /**
     * Configuration of data cleaning
     * steps applied to user input data. This can be explicitly passed as `false`
     * which requires the provided data to already be clean.
     */
    clean?: boolean | Omit<DataModelCleaningOptions, "partial"> | undefined;
    /**
     * Allow replacement of invalid values with valid defaults? This option mutates
     *    the provided changes.
     */
    fallback?: boolean | undefined;
    /**
     * If true, invalid embedded documents will emit a warning and be
     * placed in the invalidDocuments collection rather than causing the parent
     * to be considered invalid. This option mutates the provided changes.
     */
    dropInvalidEmbedded?: boolean | undefined;
    /**
     * For Array-like fields, control whether an invalid element is
     * allowed to be removed from the data in lieu of fallback replacement.
     */
    dropInvalidElements?: boolean | undefined;
    /**
     * The data model instance being validated. This is automatically populated
     *           during the model validation flow.
     */
    model?: DataModel<object, DataModelConstructionContext> | undefined;
    /**
     * Throw an error if validation fails.
     */
    strict?: boolean | undefined;
};
export type _DataModelConstructionOptions = {
    /**
     * A parent DataModel instance to which this DataModel belongs
     */
    parent?: DataModel<object, DataModelConstructionContext> | null | undefined;
    /**
     * If we are constructing an embedded model, it may be provided by the
     * constructing DataModelSchemaField with an instance-specific schema to use
     */
    schema?: any;
    /**
     * Configuration of data cleaning
     * steps applied to user input data. This can be explicitly passed as `false`
     * to skip preprocessing when using data that is known to already be fully
     * cleaned.
     */
    clean?: boolean | Omit<DataModelCleaningOptions, "partial"> | undefined;
};
export type DataModelConstructionContext = _DataModelConstructionOptions & Pick<DataModelValidationOptions, "dropInvalidEmbedded" | "fallback" | "strict">;
export type DataModelUpdateOptions = {
    /**
     * Configuration of data cleaning
     * steps applied to user input data. This can be explicitly passed as `false`
     * to skip preprocessing when using data that is known to already be fully
     * cleaned.
     */
    clean?: boolean | Omit<DataModelCleaningOptions, "partial"> | undefined;
    /**
     * Do not finally apply the change, but instead simulate the update workflow
     */
    dryRun?: boolean | undefined;
    /**
     * Allow automatic fallback to a valid initial value if the value provided for
     *    a field in the model is invalid.
     */
    fallback?: boolean | undefined;
    /**
     * Apply changes to inner objects recursively rather than replacing the
     *    top-level object. This is automatically re-interpreted as every key of the
     *    update being defined as a ForcedReplacement operator.
     */
    recursive?: boolean | undefined;
    /**
     * An advanced option used specifically and internally by the ActorDelta model
     */
    restoreDelta?: boolean | undefined;
    /**
     * Used only by the server to understand update context
     */
    user?: any;
};
export type DataModelUpdateState = {
    model: DataModel;
    source: object;
    diff: object;
    failure: DataModelValidationFailure;
};
export type DatabaseAction = "get" | "create" | "update" | "delete";
export type DatabaseWriteAction = Exclude<DatabaseAction, "get">;
export type DatabaseGetOperation = {
    /**
     * A query object which identifies the set of Documents retrieved
     */
    query: Record<string, any>;
    /**
     * The action of this database operation
     */
    action: "get";
    /**
     * The Document name
     */
    documentName: string;
    /**
     * Get requests are never broadcast
     */
    broadcast?: false | undefined;
    /**
     * Return indices only instead of full Document records
     */
    index?: boolean | undefined;
    /**
     * An array of field identifiers which should be indexed
     */
    indexFields?: string[] | undefined;
    /**
     * A compendium collection ID which contains the Documents
     */
    pack?: string | null | undefined;
    /**
     * A parent Document within which Documents are embedded
     */
    parent?: Document<object, DocumentConstructionContext> | null | undefined;
    /**
     * A parent Document UUID provided when the parent instance is unavailable
     */
    parentUuid?: string | undefined;
    /**
     * Additional options passed to the ServerDocument#find API
     */
    queryOptions?: object | undefined;
};
export type DatabaseCreateOperation = {
    /**
     * Whether the database operation is broadcast to other connected clients
     */
    broadcast: boolean;
    /**
     * The action of this database operation
     */
    action: "create";
    /**
     * The Document name
     */
    documentName: string;
    /**
     * An array of data objects from which to create Documents
     */
    data: object[];
    /**
     * Retain the _id values of provided data instead of generating new ids
     */
    keepId?: boolean | undefined;
    /**
     * Retain the _id values of embedded document data instead of generating
     *    new ids for each embedded document
     */
    keepEmbeddedIds?: boolean | undefined;
    /**
     * The timestamp when the operation was performed
     */
    modifiedTime?: number | undefined;
    /**
     * Block the dispatch of hooks related to this operation
     */
    noHook?: boolean | undefined;
    /**
     * Re-render Applications whose display depends on the created Documents
     */
    render?: boolean | undefined;
    /**
     * Control the object of any created Documents
     */
    controlObject?: boolean | undefined;
    /**
     * Render the sheet Application for any created Documents
     */
    renderSheet?: boolean | undefined;
    /**
     * A parent Document within which Documents are embedded
     */
    parent?: Document<object, DocumentConstructionContext> | null | undefined;
    /**
     * A compendium collection ID which contains the Documents
     */
    pack: string | null;
    /**
     * A parent Document UUID provided when the parent instance is unavailable
     */
    parentUuid?: string | null | undefined;
    /**
     * Is the operation a dry run? If so, an empty result array is returned
     *                  before the Documents are created.
     */
    dryRun?: boolean | undefined;
    /**
     * Used internally by server-side backend
     */
    _createData?: Record<string, object> | undefined;
    /**
     * Used internally by the server-side backend
     */
    _result?: (string | object)[] | undefined;
    /**
     * Base64 images extracted during server-side processing
     */
    extractedImages?: Record<string, string> | undefined;
};
export type DatabaseUpdateOperation = {
    /**
     * Whether the database operation is broadcast to other connected clients
     */
    broadcast: boolean;
    /**
     * The action of this database operation
     */
    action: "update";
    /**
     * The Document name
     */
    documentName: string;
    /**
     * An array of data objects used to update existing Documents.
     * Each update object must contain the _id of the target Document
     */
    updates: object[];
    /**
     * Difference each update object against current Document data and only use
     *               differential data for the update operation
     */
    diff?: boolean | undefined;
    /**
     * The timestamp when the operation was performed
     */
    modifiedTime?: number | undefined;
    /**
     * Merge objects recursively. If false, inner objects will be replaced
     *          explicitly. Use with caution!
     */
    recursive?: boolean | undefined;
    /**
     * Re-render Applications whose display depends on the created Documents
     */
    render?: boolean | undefined;
    /**
     * Block the dispatch of hooks related to this operation
     */
    noHook?: boolean | undefined;
    /**
     * A parent Document within which Documents are embedded
     */
    parent?: Document<object, DocumentConstructionContext> | null | undefined;
    /**
     * A compendium collection ID which contains the Documents
     */
    pack: string | null;
    /**
     * A parent Document UUID provided when the parent instance is unavailable
     */
    parentUuid?: string | null | undefined;
    /**
     * Used internally by the server-side backend
     */
    _updateData?: Record<string, object> | undefined;
    /**
     * Used internally by the server-side backend
     */
    _result?: (string | object)[] | undefined;
    /**
     * Is the operation a dry run? If so, an empty result array is returned
     *                  before the Documents are updated.
     */
    dryRun?: boolean | undefined;
    /**
     * Base64 images extracted during server-side processing
     */
    extractedImages?: Record<string, string> | undefined;
};
export type DatabaseDeleteOperation = {
    /**
     * Whether the database operation is broadcast to other connected clients
     */
    broadcast: boolean;
    /**
     * The action of this database operation
     */
    action: "delete";
    /**
     * The Document name
     */
    documentName: string;
    /**
     * An array of Document ids which should be deleted
     */
    ids: string[];
    /**
     * Delete all documents in the Collection, regardless of _id
     */
    deleteAll?: boolean | undefined;
    /**
     * The mapping of IDs of deleted Documents to the UUIDs of the
     * Documents that replace the deleted Documents
     */
    replacements?: Record<string, string> | undefined;
    /**
     * The timestamp when the operation was performed
     */
    modifiedTime?: number | undefined;
    /**
     * Block the dispatch of hooks related to this operation
     */
    noHook?: boolean | undefined;
    /**
     * Re-render Applications whose display depends on the deleted Documents
     */
    render?: boolean | undefined;
    /**
     * A parent Document within which Documents are embedded
     */
    parent?: Document<object, DocumentConstructionContext> | null | undefined;
    /**
     * A compendium collection ID which contains the Documents
     */
    pack: string | null;
    /**
     * A parent Document UUID provided when the parent instance is unavailable
     */
    parentUuid?: string | null | undefined;
    /**
     * Is the operation a dry run? If so, an empty result array is returned
     *                  before the Documents are deleted.
     */
    dryRun?: boolean | undefined;
    /**
     * An alias for 'ids' used internally by the server-side backend
     */
    _result?: (string | object)[] | undefined;
};
export type DatabaseOperation = DatabaseGetOperation | DatabaseCreateOperation | DatabaseUpdateOperation | DatabaseDeleteOperation;
export type DatabaseWriteOperation = Exclude<DatabaseOperation, DatabaseGetOperation>;
export type DocumentSocketRequest = {
    /**
     * The type of Document being transacted
     */
    type: string;
    /**
     * The action of the request
     */
    action: DatabaseAction;
    /**
     * Operation parameters for the request
     */
    operation: DatabaseOperation;
    /**
     * The id of the requesting User
     */
    userId: string;
    /**
     * Should the response be broadcast to other connected clients?
     */
    broadcast: boolean;
};
export type DataModelFromSourceOptions = {
    /**
     * Models created from trusted source data are validated non-strictly.
     *     Default: `false`.
     */
    strict?: boolean | undefined;
};
export type DocumentCloneOptions = {
    /**
     * Save the clone to the World database? Default: `false`.
     */
    save?: boolean | undefined;
    /**
     * Keep the same ID of the original document. Default: `false`.
     */
    keepId?: boolean | undefined;
    /**
     * Track the clone source. Default: `false`.
     */
    addSource?: boolean | undefined;
    /**
     * Discard invalid embedded documents from the source.
     *   Not to be confused with `dropInvalidEmbedded`, which
     *   does not discard the invalid embedded documents but
     *   just prevents the document from being considered invalid
     *   and drops invalid embedded documents during preparation.
     *   Default: `false`.
     */
    discardInvalidEmbedded?: boolean | undefined;
};
export type DocumentPermissionTest = (user: BaseUser, document: Document, data?: object | undefined) => boolean;
export type DocumentClassMetadata = {
    name: string;
    label: string;
    coreTypes: string[];
    collection: string;
    embedded: Record<string, string>;
    permissions: Record<"view" | "create" | "update" | "delete", ("NONE" | "PLAYER" | "TRUSTED" | "ASSISTANT" | "GAMEMASTER") | ("INHERIT" | "NONE" | "LIMITED" | "OBSERVER" | "OWNER") | DocumentPermissionTest>;
    hasTypeData: boolean;
    /**
     * If the Document class has type data, can users normally create instances of the
     *  "base" type?
     */
    baseTypeAllowed?: boolean | undefined;
    indexed: boolean;
    compendiumIndexFields: string[];
    preserveOnImport: string[];
    schemaVersion?: string | undefined;
};
import type { DataField } from "../data/fields.mjs";
import type { DataModel } from "./_module.mjs";
import type { Document } from "./_module.mjs";
import type BaseUser from "../documents/user.mjs";
