/**
 * @import Document from "../../../common/abstract/document.mjs";
 * @import {DocumentOwnershipNumber} from "../../../common/constants.mjs";
 * @import {Application, ApplicationV2} from "../../applications/api/_module.mjs";
 * @import {ApplicationRenderOptions} from "../../applications/_types.mjs";
 * @import {DatabaseCreateOperation, DatabaseDeleteOperation} from "../../../common/abstract/_types.mjs";
 * @import Collection from "../../../common/utils/collection.mjs";
 * @import {DocumentConstructionContext} from "../../../common/abstract/_types.mjs";
 * @import {ToCompendiumOptions} from "../../_types.mjs";
 */
/**
 * A mixin which extends each Document definition with specialized client-side behaviors.
 * This mixin defines the client-side interface for database operations and common document behaviors.
 * @category Mixins
 * @param {typeof Document} Base    The base Document class to be mixed
 */
export default function ClientDocumentMixin(Base: typeof Document): {
    new (data: any, context: any): {
        /**
         * @inheritDoc
         * @this {ClientDocument}
         */
        _initialize(this: any, options?: {}): void;
        /**
         * Return a reference to the parent Collection/Document instance that contains/is this Document.
         * @this {ClientDocument}
         * @type {DocumentCollection|EmbeddedCollection|Document|null}
         */
        readonly collection: any;
        /** @override */
        readonly compendium: CompendiumCollection<any> | null | undefined;
        /**
         * Is this document in a compendium? A stricter check than Document#inCompendium.
         * @type {boolean}
         * @override
         */
        readonly inCompendium: boolean;
        /**
         * Is this Document persisted?
         *
         * A document is persisted if it has a nonnull UUID that resolves to a document with `fromUuid`.
         * In particular, clones of persisted Documents are also persisted Documents if they have the same ID as the
         * original.
         *
         * This property is false until this document and all its ancestors up to the root document have been initialized
         * and added to their collections.
         * @type {boolean}
         */
        readonly persisted: boolean;
        /**
         * A boolean indicator for whether the current game User has ownership rights for this Document.
         * Different Document types may have more specialized rules for what constitutes ownership.
         * @type {boolean}
         */
        readonly isOwner: boolean;
        /**
         * Test whether this Document is owned by any non-Gamemaster User.
         * @type {boolean}
         */
        readonly hasPlayerOwner: boolean;
        /**
         * A boolean indicator for whether the current game User has exactly LIMITED visibility (and no greater).
         * @type {boolean}
         */
        readonly limited: boolean;
        /**
         * Return a string which creates a dynamic link to this Document instance.
         * @returns {string}
         */
        readonly link: string;
        /**
         * Return the permission level that the current game User has over this Document.
         * See the {@link CONST.DOCUMENT_OWNERSHIP_LEVELS} object for an enumeration of these levels.
         * @type {DocumentOwnershipNumber}
         *
         * @example Get the permission level the current user has for a document
         * ```js
         * game.user.id; // "dkasjkkj23kjf"
         * actor.ownership; // {default: 1, dkasjkkj23kjf: 2}
         * actor.permission; // 2
         * ```
         */
        readonly permission: DocumentOwnershipNumber;
        /**
         * Lazily obtain a Application instance used to configure this Document, or null if no sheet is available.
         * @type {Application|ApplicationV2|null}
         */
        readonly sheet: Application<foundry.applications.types.ApplicationConfiguration, ApplicationRenderOptions> | null;
        _sheet: any;
        /**
         * A boolean indicator for whether the current game User has at least limited visibility for this Document.
         * Different Document types may have more specialized rules for what determines visibility.
         * @type {boolean}
         */
        readonly visible: boolean;
        /**
         * Obtain the Application class constructor which should be used to configure this Document.
         * @returns {Function|null}
         * @internal
         */
        _getSheetClass(): Function | null;
        /**
         * Safely prepare data for a Document, catching any errors.
         * @internal
         */
        _safePrepareData(): void;
        /**
         * Prepare data for the Document. This method provides an opportunity for Document classes to define special data
         * preparation logic to compute values that don't need to be stored in the database, such as a "bloodied" hp value
         * or the total carrying weight of items. The work done by this method should be idempotent per initialization.
         * There are situations in which prepareData may be called more than once.
         *
         * By default, foundry calls the following methods in order whenever the document is created or updated.
         * 1. {@link reset} (Inherited from DataModel)
         * 2. {@link _initialize} (Inherited from DataModel)
         * 3. {@link prepareData}
         * 4. {@link foundry.abstract.TypeDataModel.prepareBaseData | TypeDataModel#prepareBaseData}
         * 5. {@link prepareBaseData}
         * 6. {@link prepareEmbeddedDocuments}
         * 7. {@link foundry.abstract.TypeDataModel.prepareDerivedData | TypeDataModel#prepareBaseData}
         * 8. {@link prepareDerivedData}
         *
         * Do NOT invoke database operations like {@link update} or {@link setFlag} within data prep, as that can cause an
         * infinite loop by re-triggering the data initialization process.
         *
         * If possible you should extend {@link prepareBaseData} and {@link prepareDerivedData} instead of this function
         * directly, but some systems with more complicated calculations may want to override this function to add extra
         * steps, such as to calculate certain item values after actor data prep.
         */
        prepareData(): void;
        /**
         * Prepare data related to this Document itself, before any embedded Documents or derived data is computed.
         *
         * If possible when modifying the `system` object you should use
         * {@link foundry.abstract.TypeDataModel.prepareBaseData | TypeDataModel#prepareBaseData} on your data models
         * instead of this method directly on the document.
         */
        prepareBaseData(): void;
        /**
         * Prepare all embedded Document instances which exist within this primary Document.
         */
        prepareEmbeddedDocuments(): void;
        /**
         * Apply transformations or derivations to the values of the source data object.
         * Compute data fields whose values are not stored to the database.
         *
         * If possible when modifying the `system` object you should use
         * {@link foundry.abstract.TypeDataModel.prepareDerivedData | TypeDataModel#prepareDerivedData} on your data models
         * instead of this method directly on the document.
         */
        prepareDerivedData(): void;
        /**
         * Render all Application instances which are connected to this document by calling their respective
         * @see {@link foundry.applications.api.ApplicationV2#render}
         * @param {boolean} [force=false]     Force rendering
         * @param {object} [context={}]       Optional context
         */
        render(force?: boolean | undefined, context?: object | undefined): void;
        /**
         * Determine the sort order for this Document by positioning it relative a target sibling.
         * See SortingHelper.performIntegerSort for more details
         * @param {object} [options]            Sorting options provided to SortingHelper.performIntegerSort
         * @param {object} [options.updateData] Additional data changes applied to each sorted document
         * @param {object} [options.sortOptions] Options passed to the foundry.utils.performIntegerSort method
         * @returns {Promise<Document>}       The Document after it has been re-sorted
         */
        sortRelative({ updateData, ...sortOptions }?: {
            updateData?: object | undefined;
            sortOptions?: object | undefined;
        } | undefined): Promise<Document>;
        /**
         * Create a content link for this document.
         * @param {object} eventData                     The parsed object of data provided by the drop transfer event.
         * @param {object} [options]                     Additional options to configure link generation.
         * @param {ClientDocument} [options.relativeTo]  A document to generate a link relative to.
         * @param {string} [options.label]               A custom label to use instead of the document's name.
         * @returns {string}
         * @internal
         */
        _createDocumentLink(eventData: object, { relativeTo, label }?: {
            relativeTo?: any | undefined;
            label?: string | undefined;
        } | undefined): string;
        /**
         * Handle clicking on a content link for this document.
         * @param {PointerEvent} event The triggering click event.
         * @returns {Application|Promise<ApplicationV2>|null}
         * @protected
         */
        _onClickDocumentLink(event: PointerEvent): Application | Promise<Application> | null;
        /** @inheritDoc */
        _preCreate(data: any, options: any, user: any): Promise<any>;
        /** @inheritDoc */
        _onCreate(data: any, options: any, userId: any): void;
        /** @inheritDoc */
        _preUpdate(changes: any, options: any, user: any): Promise<any>;
        /** @inheritDoc */
        _onUpdate(changed: any, options: any, userId: any): void;
        /** @inheritDoc */
        _preDelete(options: any, user: any): Promise<any>;
        /** @inheritDoc */
        _onDelete(options: any, userId: any): void;
        /**
         * Close open Applications for this Document and its children.
         * @param {ClientDocument} document
         * @param {object} [closingOptions]
         */
        "__#204@#closeApplications"(document: any, closingOptions?: object | undefined): void;
        /**
         * Orchestrate dispatching descendant document events to parent documents when embedded children are modified.
         * @param {string} event                The event name, preCreate, onCreate, etc...
         * @param {string} collection           The collection name being modified within this parent document
         * @param {Array<*>} args               Arguments passed to each dispatched function
         * @param {ClientDocument} [_parent]    The document with directly modified embedded documents.
         *                                      Either this document or a descendant of this one.
         * @internal
         */
        _dispatchDescendantDocumentEvents(event: string, collection: string, args: Array<any>, _parent?: any | undefined): void;
        /**
         * Actions taken after descendant documents have been created, but before changes are applied to the client data.
         * @param {Document} parent         The direct parent of the created Documents, may be this Document or a child
         * @param {string} collection       The collection within which documents are being created
         * @param {object[]} data           The source data for new documents that are being created
         * @param {object} options          Options which modified the creation operation
         * @param {string} userId           The ID of the User who triggered the operation
         * @protected
         */
        _preCreateDescendantDocuments(parent: Document, collection: string, data: object[], options: object, userId: string): void;
        /**
         * Actions taken after descendant documents have been created and changes have been applied to client data.
         * @param {Document} parent         The direct parent of the created Documents, may be this Document or a child
         * @param {string} collection       The collection within which documents were created
         * @param {Document[]} documents    The array of created Documents
         * @param {object[]} data           The source data for new documents that were created
         * @param {object} options          Options which modified the creation operation
         * @param {string} userId           The ID of the User who triggered the operation
         * @protected
         */
        _onCreateDescendantDocuments(parent: Document, collection: string, documents: Document[], data: object[], options: object, userId: string): void;
        /**
         * Actions taken after descendant documents have been updated, but before changes are applied to the client data.
         * @param {Document} parent         The direct parent of the updated Documents, may be this Document or a child
         * @param {string} collection       The collection within which documents are being updated
         * @param {object[]} changes        The array of differential Document updates to be applied
         * @param {object} options          Options which modified the update operation
         * @param {string} userId           The ID of the User who triggered the operation
         * @protected
         */
        _preUpdateDescendantDocuments(parent: Document, collection: string, changes: object[], options: object, userId: string): void;
        /**
         * Actions taken after descendant documents have been updated and changes have been applied to client data.
         * @param {Document} parent         The direct parent of the updated Documents, may be this Document or a child
         * @param {string} collection       The collection within which documents were updated
         * @param {Document[]} documents    The array of updated Documents
         * @param {object[]} changes        The array of differential Document updates which were applied
         * @param {object} options          Options which modified the update operation
         * @param {string} userId           The ID of the User who triggered the operation
         * @protected
         */
        _onUpdateDescendantDocuments(parent: Document, collection: string, documents: Document[], changes: object[], options: object, userId: string): void;
        /**
         * Actions taken after descendant documents have been deleted, but before deletions are applied to the client data.
         * @param {Document} parent         The direct parent of the deleted Documents, may be this Document or a child
         * @param {string} collection       The collection within which documents were deleted
         * @param {string[]} ids            The array of document IDs which were deleted
         * @param {object} options          Options which modified the deletion operation
         * @param {string} userId           The ID of the User who triggered the operation
         * @protected
         */
        _preDeleteDescendantDocuments(parent: Document, collection: string, ids: string[], options: object, userId: string): void;
        /**
         * Actions taken after descendant documents have been deleted and those deletions have been applied to client data.
         * @param {Document} parent         The direct parent of the deleted Documents, may be this Document or a child
         * @param {string} collection       The collection within which documents were deleted
         * @param {Document[]} documents    The array of Documents which were deleted
         * @param {string[]} ids            The array of document IDs which were deleted
         * @param {object} options          Options which modified the deletion operation
         * @param {string} userId           The ID of the User who triggered the operation
         * @protected
         */
        _onDeleteDescendantDocuments(parent: Document, collection: string, documents: Document[], ids: string[], options: object, userId: string): void;
        /**
         * Whenever the Document's sheet changes, close any existing applications for this Document, and re-render the new
         * sheet if one was already open.
         * @param {object} [options]
         * @param {boolean} [options.sheetOpen]  Whether the sheet was originally open and needs to be re-opened.
         * @internal
         */
        _onSheetChange({ sheetOpen }?: {
            sheetOpen?: boolean | undefined;
        } | undefined): Promise<void>;
        /**
         * Present a Dialog form to confirm deletion of this Document.
         * @param {object} [options] Additional options passed to `DialogV2.confirm`
         * @param {DatabaseDeleteOperation} [operation]  Document deletion options.
         * @returns {Promise<Document>} A Promise that resolves to the deleted Document
         */
        deleteDialog(options?: object | undefined, operation?: DatabaseDeleteOperation | undefined): Promise<Document>;
        /**
         * Export document data to a JSON file which can be saved by the client and later imported into a different session.
         * Only world Documents may be exported.
         * @param {object} [options]      Additional options passed to the {@link ClientDocument#toCompendium} method
         */
        exportToJSON(options?: object | undefined): void;
        /**
         * Serialize salient information about this Document when dragging it.
         * @returns {object}  An object of drag data.
         */
        toDragData(): object;
        /**
         * Update this Document using a provided JSON string.
         * Only world Documents may be imported.
         * @this {ClientDocument}
         * @param {string} json                 Raw JSON data to import
         * @returns {Promise<ClientDocument>}   The updated Document instance
         */
        importFromJSON(this: any, json: string): Promise<any>;
        /**
         * Render an import dialog for updating the data related to this Document through an exported JSON file
         * @returns {Promise<void>}
         */
        importFromJSONDialog(): Promise<void>;
        /**
         * Transform the Document data to be stored in a Compendium pack.
         * Remove any features of the data which are world-specific.
         * @param {CompendiumCollection} [pack]   A specific pack being exported to
         * @param {ToCompendiumOptions} [options] Additional options which modify how the document is converted
         * @returns {object}                      A data object of cleaned data suitable for compendium import
         */
        toCompendium(pack?: CompendiumCollection<any> | undefined, { clearSort, clearFolder, clearFlags, clearSource, clearOwnership, clearState, keepId }?: ToCompendiumOptions | undefined): object;
        /**
         * Create a content link for this Document.
         * @param {Partial<EnrichmentAnchorOptions>} [options]  Additional options to configure how the link is constructed.
         * @returns {HTMLAnchorElement}
         */
        toAnchor({ attrs, dataset, classes, name, icon }?: any): HTMLAnchorElement;
        /**
         * Convert a Document to some HTML display for embedding purposes.
         * @param {DocumentHTMLEmbedConfig} config  Configuration for embedding behavior.
         * @param {EnrichmentOptions} [options]     The original enrichment options for cases where the Document embed
         *                                          content also contains text that must be enriched.
         * @returns {Promise<HTMLDocumentEmbedElement|HTMLElement|null>} A representation of the Document as HTML content,
         *                                          or null if such a representation could not be generated.
         */
        toEmbed(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLDocumentEmbedElement | HTMLElement | null>;
        /**
         * Specific callback actions to take when the embedded HTML for this Document has been added to the DOM.
         * @param {HTMLDocumentEmbedElement} element      The embedded document HTML
         */
        onEmbed(element: HTMLDocumentEmbedElement): void;
        /**
         * A method that can be overridden by subclasses to customize embedded HTML generation.
         * @param {DocumentHTMLEmbedConfig} config  Configuration for embedding behavior.
         * @param {EnrichmentOptions} [options]     The original enrichment options for cases where the Document embed
         *                                          content also contains text that must be enriched.
         * @returns {Promise<HTMLElement|HTMLCollection|null>}  Either a single root element to append, or a collection of
         *                                                      elements that comprise the embedded content.
         * @protected
         */
        _buildEmbedHTML(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | HTMLCollection | null>;
        /**
         * A method that can be overridden by subclasses to customize inline embedded HTML generation.
         * @param {HTMLElement|HTMLCollection} content  The embedded content.
         * @param {DocumentHTMLEmbedConfig} [config]    Configuration for embedding behavior.
         * @param {EnrichmentOptions} [options]         The original enrichment options for cases where the Document embed
         *                                              content also contains text that must be enriched.
         * @returns {Promise<HTMLElement|null>}
         * @protected
         */
        _createInlineEmbed(content: HTMLElement | HTMLCollection, config?: any, options?: any): Promise<HTMLElement | null>;
        /**
         * A method that can be overridden by subclasses to customize the generation of the embed figure.
         * @param {HTMLElement|HTMLCollection} content  The embedded content.
         * @param {DocumentHTMLEmbedConfig} config      Configuration for embedding behavior.
         * @param {EnrichmentOptions} [options]         The original enrichment options for cases where the Document embed
         *                                              content also contains text that must be enriched.
         * @returns {Promise<HTMLElement|null>}
         * @protected
         */
        _createFigureEmbed(content: HTMLElement | HTMLCollection, { cite, caption, captionPosition, label }: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | null>;
        /**
         * @deprecated since v14
         * @ignore
         */
        getRelativeUUID(relative: any): string;
        _configure({ pack, parentCollection }?: {
            pack?: null | undefined;
            parentCollection?: null | undefined;
        }): void;
        _initializationOrder(): Generator<(string | foundry.data.fields.DataField | undefined)[], void, unknown>;
        readonly collectionName: any;
        readonly documentName: any;
        _getParentCollection(parentCollection?: string | null | undefined): string | null;
        readonly id: string | null;
        readonly isEmbedded: boolean;
        readonly uuid: string | null;
        _uuid: string | null | undefined;
        getUserLevel(user?: foundry.documents.BaseUser | undefined): DocumentOwnershipNumber;
        testUserPermission(user: foundry.documents.BaseUser, permission: CONST.DocumentOwnershipLevel, { exact }?: {
            exact?: boolean | undefined;
        }): boolean;
        canUserModify(user: foundry.documents.BaseUser, action: string, data?: object | undefined): boolean;
        clone(data?: object | undefined, context?: (foundry.abstract.types._DataModelConstructionOptions & Pick<foundry.abstract.types.DataModelValidationOptions, "dropInvalidEmbedded" | "fallback" | "strict"> & foundry.abstract.types._DocumentConstructionContext & foundry.abstract.types.DocumentCloneOptions) | undefined): Document | Promise<Document>;
        "__#244@#discardInvalidEmbedded"(source: object): void;
        migrateSystemData(): object;
        toObject(source?: boolean): any;
        _updateDiff(copy: any, changes: any, options: any, _state: any): object;
        update(data?: object | undefined, operation?: Partial<Omit<foundry.abstract.types.DatabaseUpdateOperation, "updates">> | undefined): Promise<Document | undefined>;
        delete(operation?: Partial<Omit<DatabaseDeleteOperation, "ids" | "deleteAll">> | undefined): Promise<Document | undefined>;
        getEmbeddedCollection(embeddedName: string): DocumentCollection;
        getEmbeddedDocument(embeddedName: string, id: string, { invalid, strict }?: {
            strict?: boolean | undefined;
            invalid?: boolean | undefined;
        } | undefined): Document;
        createEmbeddedDocuments(embeddedName: string, data?: object[], operation?: DatabaseCreateOperation | undefined): Promise<Document[]>;
        updateEmbeddedDocuments(embeddedName: string, updates?: object[], operation?: foundry.abstract.types.DatabaseUpdateOperation | undefined): Promise<Document[]>;
        deleteEmbeddedDocuments(embeddedName: string, ids: string[], operation?: DatabaseDeleteOperation | undefined): Promise<Document[]>;
        traverseEmbeddedDocuments(_parentPath?: string | undefined): Generator<any, void, any>;
        getFlag(scope: string, key: string): any;
        setFlag(scope: string, key: string, value: any): Promise<Document>;
        unsetFlag(scope: string, key: string): Promise<Document>;
        _source: object;
        parent: foundry.abstract.DataModel | null;
        readonly schema: foundry.data.fields.DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: foundry.data.validation.DataModelValidationFailure | null;
            joint: foundry.data.validation.DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): foundry.data.fields.DataField | undefined;
        _initializeSource(data: object | DataModel, options?: DocumentConstructionContext | undefined): object;
        _getInnerModel(field: foundry.data.fields.DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): DataModel | null;
        reset(): void;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): foundry.data.validation.DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
        _updateCommit(copy: object, diff: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
        "__#3@#prepareSafeSource"(changes: object): object;
        toJSON(): object;
    };
    /** @inheritDoc */
    name: string;
    /** @override */
    _onCreateOperation(documents: any, operation: any, user: any): Promise<void>;
    /**
     * Gets the default new name for a Document
     * @param {object} context                    The context for which to create the Document name.
     * @param {string} [context.type]             The sub-type of the document
     * @param {Document|null} [context.parent]    A parent document within which the created Document should belong
     * @param {string|null} [context.pack]        A compendium pack within which the Document should be created
     * @returns {string}
     */
    defaultName({ type, parent, pack }?: {
        type?: string | undefined;
        parent?: Document<object, DocumentConstructionContext> | null | undefined;
        pack?: string | null | undefined;
    }): string;
    /**
     * Present a Dialog form to create a new Document of this type.
     * Choose a name and a type from a select menu of types.
     * @param {object} data                Document creation data
     * @param {DatabaseCreateOperation} [createOptions]  Document creation options.
     * @param {object} [options={}]        Options forwarded to DialogV2.prompt
     * @param {{id: string; name: string}[]} [options.folders] Available folders in which the new Document can be place
     * @param {string[]} [options.types]   A restriction of the selectable sub-types of the Dialog.
     * @param {string} [options.template]  A template to use for the dialog contents instead of the default.
     * @param {object} [options.context]   Additional render context to provide to the template.
     * @param {ApplicationRenderOptions} [renderOptions]  Options to forward to the document sheet's render call.
     * @returns {Promise<Document|null>}   A Promise which resolves to the created Document, or null if the dialog was
     *                                     closed.
     */
    createDialog(data?: object, createOptions?: DatabaseCreateOperation | undefined, { folders, types, template, context, ...dialogOptions }?: {
        folders?: {
            id: string;
            name: string;
        }[] | undefined;
        types?: string[] | undefined;
        template?: string | undefined;
        context?: object | undefined;
    } | undefined, renderOptions?: ApplicationRenderOptions | undefined): Promise<Document | null>;
    /**
     * A helper function to handle obtaining the relevant Document from dropped data provided via a DataTransfer event.
     * The dropped data could have:
     * 1. A data object explicitly provided
     * 2. A UUID
     *
     * @param {object} data           The data object extracted from a DataTransfer event
     * @returns {Promise<Document>}   The resolved Document
     * @throws If a Document could not be retrieved from the provided data.
     */
    fromDropData(data: object): Promise<Document>;
    /**
     * Create the Document from the given source with migration applied to it.
     * Only primary Documents may be imported.
     *
     * This function must be used to create a document from data that predates the current core version.
     * It must be given nonpartial data matching the schema it had in the core version it is coming from.
     * It applies legacy migrations to the source data before calling {@link foundry.abstract.Document.fromSource}.
     * If this function is not used to import old data, necessary migrations may not applied to the data
     * resulting in an incorrectly imported document.
     *
     * The core version is recorded in the `_stats` field, which all primary documents have. If the given source data
     * doesn't contain a `_stats` field, the data is assumed to be pre-V10, when the `_stats` field didn't exist yet.
     * The `_stats` field must not be stripped from the data before it is exported!
     * @param {object} source                  The document data that is imported.
     * @param {DocumentConstructionContext} [context] The model construction context passed to
     *                                                {@link foundry.abstract.Document.fromSource}. Strict validation is
     *                                                enabled by default.
     * @returns {Promise<Document>}
     */
    fromImport(source: object, context?: DocumentConstructionContext | undefined): Promise<Document>;
    readonly schema: foundry.data.fields.DataModelSchemaField;
    metadata: Readonly<foundry.abstract.types.DocumentClassMetadata>;
    LOCALIZATION_PREFIXES: string[];
    readonly database: foundry.abstract.DatabaseBackend;
    readonly implementation: typeof Document;
    readonly baseDocument: typeof Document;
    readonly collectionName: string;
    readonly documentName: string;
    readonly TYPES: string[];
    readonly hasTypeData: boolean;
    readonly hierarchy: Readonly<Record<string, any>>;
    canUserCreate(user: foundry.documents.BaseUser): boolean;
    _preCleanData(data: any, options: any, _state: any): void;
    createDocuments(data?: Array<object | Document>, operation?: Partial<Omit<DatabaseCreateOperation, "data">> | undefined): Promise<Document[]>;
    updateDocuments(updates?: object[], operation?: Partial<Omit<foundry.abstract.types.DatabaseUpdateOperation, "updates">> | undefined): Promise<Document[]>;
    deleteDocuments(ids?: string[], operation?: Partial<Omit<DatabaseDeleteOperation, "ids">> | undefined): Promise<Document[]>;
    create(data?: object | Document<object, DocumentConstructionContext> | (object | Document<object, DocumentConstructionContext>)[] | undefined, operation?: Partial<Omit<DatabaseCreateOperation, "data">> | undefined): Promise<Document | Document[] | undefined>;
    get(documentId: string, operation?: foundry.abstract.types.DatabaseGetOperation | undefined): Document | null;
    getCollectionName(name: string): string | null;
    _preCreateOperation(documents: Document[], operation: DatabaseCreateOperation, user: foundry.documents.BaseUser): Promise<boolean | void>;
    _preUpdateOperation(documents: Document[], operation: foundry.abstract.types.DatabaseUpdateOperation, user: foundry.documents.BaseUser): Promise<boolean | void>;
    _onUpdateOperation(documents: Document[], operation: foundry.abstract.types.DatabaseUpdateOperation, user: foundry.documents.BaseUser): Promise<void>;
    _preDeleteOperation(documents: Document[], operation: DatabaseDeleteOperation, user: foundry.documents.BaseUser): Promise<boolean | void>;
    _onDeleteOperation(documents: Document[], operation: DatabaseDeleteOperation, user: foundry.documents.BaseUser): Promise<void>;
    _addDataFieldShims(data: object, shims: {
        [oldKey: string]: string;
    }, options?: {
        warning?: string | undefined;
        value?: any;
    } | undefined): void;
    _addDataFieldShim(data: object, oldKey: string, newKey: string, options?: {
        warning?: string | undefined;
        value?: any;
    } | undefined): void;
    _addDataFieldMigration(data: object, oldKey: string, newKey: string, apply?: ((data: object) => any) | undefined): boolean;
    _logDataFieldMigration(oldKey: string, newKey: string, options?: object | undefined): void;
    _clearFieldsRecursively(data: object, fieldNames: string[], options?: {
        callback?: ((data: object, fieldName: string) => any) | undefined;
    } | undefined): void;
    _schema: foundry.data.fields.DataModelSchemaField;
    defineSchema(): foundry.abstract.types.DataSchema;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: foundry.data.types.DataModelCleaningOptions | undefined, _state?: Partial<foundry.data.types.DataModelUpdateState> | undefined): object;
    _cleanData(data: object, options: Readonly<foundry.data.types.DataModelCleaningOptions>, _state: foundry.data.types.DataModelUpdateState): object;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): object;
    migrateData(source: object, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined, _state?: foundry.data.types.DataModelUpdateState | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
import type Document from "../../../common/abstract/document.mjs";
import CompendiumCollection from "../collections/compendium-collection.mjs";
import type { DocumentOwnershipNumber } from "../../../common/constants.mjs";
import type { ApplicationRenderOptions } from "../../applications/_types.mjs";
import type { Application } from "../../applications/api/_module.mjs";
import type { DatabaseDeleteOperation } from "../../../common/abstract/_types.mjs";
import type { ToCompendiumOptions } from "../../_types.mjs";
import type { DatabaseCreateOperation } from "../../../common/abstract/_types.mjs";
import type { DocumentConstructionContext } from "../../../common/abstract/_types.mjs";
