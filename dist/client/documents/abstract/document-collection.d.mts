/**
 * @import {Application, ApplicationV2} from "../../applications/api/_module.mjs";
 * @import {FromCompendiumOptions, ToCompendiumOptions, SearchableField} from "../../_types.mjs";
 * @import Document from "../../../common/abstract/document.mjs";
 * @import {DatabaseAction, DatabaseOperation} from "../../../common/abstract/_types.mjs";
 * @import User from "../user.mjs";
 */
/**
 * An abstract subclass of the Collection container which defines a collection of Document instances.
 * @abstract
 * @category Collections
 * @template {Document} TDocument
 * @extends Collection<string, TDocument>
 */
export default class DocumentCollection<TDocument extends Document> extends Collection<string, TDocument> {
    /**
     * The base Document type which is contained within this DocumentCollection
     * @type {string}
     */
    static documentName: string;
    /**
     * The cache of search fields for each data model
     * @type {Map<string, Record<string, SearchableField>>}
     */
    static "__#202@#dataModelSearchFieldsCache": Map<string, Record<string, SearchableField>>;
    /**
     * Get the searchable fields for a given document or index, based on its data model
     * @param {string} documentName         The document name
     * @param {string} [type]               A document subtype
     * @returns {Record<string, SearchableField>} A record of searchable DataField definitions
     */
    static getSearchableFields(documentName: string, type?: string | undefined): Record<string, SearchableField>;
    /**
     * Identify and cache the searchable fields for a DataModel.
     * @param {string} documentName
     * @param {string} [type]
     * @returns {Record<string, SearchableField>}
     */
    static "__#202@#getSearchableFields"(documentName: string, type?: string | undefined): Record<string, SearchableField>;
    /**
     * Recursively search text fields.
     * @param {object} data
     * @param {Record<string, SearchableField>} searchFields
     * @param {RegExp} rgx
     * @param {DOMParser} [domParser]
     */
    static "__#202@#searchTextFields"(data: object, searchFields: Record<string, SearchableField>, rgx: RegExp, domParser?: DOMParser | undefined): boolean;
    /**
     * @param {object[]} data      An array of data objects from which to create document instances
     */
    constructor(data?: object[]);
    /**
     * The source data array from which the Documents in the WorldCollection are created
     * @type {object[]}
     * @internal
     */
    _source: object[];
    /**
     * An Array of application references which will be automatically updated when the collection content changes
     * @type {(Application|ApplicationV2)[]}
     */
    apps: (Application | Application)[];
    /**
     * Initialize the DocumentCollection by constructing any initially provided Document instances
     * @protected
     */
    protected _initialize(): void;
    /**
     * A reference to the Document class definition which is contained within this DocumentCollection.
     * @type {typeof Document}
     */
    get documentClass(): typeof Document;
    /** @inheritDoc */
    get documentName(): any;
    /**
     * Record the set of document ids where the Document was not initialized because of invalid source data
     * @type {Set<string>}
     */
    invalidDocumentIds: Set<string>;
    /**
     * The Collection class name
     * @type {string}
     */
    get name(): string;
    /**
     * Instantiate a Document for inclusion in the Collection.
     * @param {object} data       The Document data.
     * @param {object} [context]  Document creation context.
     * @returns {TDocument}
     */
    createDocument(data: object, context?: object | undefined): TDocument;
    /**
     * Obtain a temporary Document instance for a document id which currently has invalid source data.
     * @param {string} id                      A document ID with invalid source data.
     * @param {object} [options]               Additional options to configure retrieval.
     * @param {boolean} [options.strict=true]  Throw an Error if the requested ID is not in the set of invalid IDs for
     *                                         this collection.
     * @returns {TDocument|void}               An in-memory instance for the invalid Document
     * @throws {Error}                         If strict is true and the requested ID is not in the set of invalid IDs
     *                                         for this collection.
     */
    getInvalid(id: string, { strict }?: {
        strict?: boolean | undefined;
    } | undefined): TDocument | void;
    /**
     * Get an element from the DocumentCollection by its ID.
     * @param {string} id                        The ID of the Document to retrieve.
     * @param {object} [options]                 Additional options to configure retrieval.
     * @param {boolean} [options.strict=false]   Throw an Error if the requested Document does not exist.
     * @param {boolean} [options.invalid=false]  Allow retrieving an invalid Document.
     * @returns {TDocument}
     * @throws {Error}                           If strict is true and the Document cannot be found.
     */
    get(id: string, { invalid, strict }?: {
        strict?: boolean | undefined;
        invalid?: boolean | undefined;
    } | undefined): TDocument;
    /**
     * @override
     * @param {string} id
     * @param {TDocument} document
     * @returns {this}
     */
    override set(id: string, document: TDocument): this;
    /** @inheritDoc */
    delete(id: any): boolean;
    /**
     * Render any Applications associated with this DocumentCollection.
     * @param {boolean} [force=false]     Force rendering
     * @param {object} [options={}]       Optional options
     */
    render(force?: boolean | undefined, options?: object | undefined): void;
    /**
     * Find all Documents which match a given search term using a full-text search against their indexed HTML fields
     * and their name. If filters are provided, results are filtered to only those that match the provided values.
     * @param {object} search                      An object configuring the search
     * @param {string} [search.query]              A case-insensitive search string
     * @param {FieldFilter[]} [search.filters]     An array of filters to apply
     * @param {string[]} [search.exclude]          An array of document IDs to exclude from search results
     * @returns {TDocument[]|object[]}
     */
    search({ query, filters, exclude }: {
        query?: string | undefined;
        filters?: FieldFilter[] | undefined;
        exclude?: string[] | undefined;
    }): TDocument[] | object[];
    /**
     * Import a Document into this collection, persisting the result.
     * If the document ID already exists in the collection, it should be replaced with an optional confirmation dialog.
     * If the document ID is undefined or does not already exist, a new Document will be created in the collection.
     * @param {Document} document       A source Document to be imported. The document will be safely copied.
     * @param {FromCompendiumOptions|ToCompendiumOptions} options  Options which modify import behavior
     * @returns {Promise<Document|undefined>} The imported Document instance
     */
    importDocument(document: Document, options: FromCompendiumOptions | ToCompendiumOptions): Promise<Document | undefined>;
    /**
     * Translate a provided Document into data ready for import into this collection.
     * @param {Document} document       A source Document to be imported. The document should be safely copied.
     * @param {object} options          Options which modify import behavior
     * @returns {object}                Data ready for import
     * @throws {Error}                  An error if the import should be disallowed
     * @protected
     */
    protected _prepareImportDocument(document: Document, options: object): object;
    /**
     * Update all objects in this DocumentCollection with a provided transformation.
     * Conditionally filter to only apply to Entities which match a certain condition.
     * @param {Function|object} transformation    An object of data or function to apply to all matched objects
     * @param {Function|null}  condition          A function which tests whether to target each object
     * @param {object} [options]                  Additional options passed to Document.updateDocuments
     * @returns {Promise<TDocument[]>}            An array of updated data once the operation is complete
     */
    updateAll(transformation: Function | object, condition?: Function | null, options?: object | undefined): Promise<TDocument[]>;
    /**
     * Follow-up actions to take when a database operation modifies Documents in this DocumentCollection.
     * @param {DatabaseAction} action                   The database action performed
     * @param {TDocument[]} documents                   The array of modified Documents
     * @param {any[]} result                            The result of the database operation
     * @param {DatabaseOperation} operation             Database operation details
     * @param {User} user                               The User who performed the operation
     * @internal
     */
    _onModifyContents(action: DatabaseAction, documents: TDocument[], result: any[], operation: DatabaseOperation, user: User): void;
    #private;
}
import type Document from "../../../common/abstract/document.mjs";
import Collection from "../../../common/utils/collection.mjs";
import type { Application } from "../../applications/api/_module.mjs";
import type { FromCompendiumOptions } from "../../_types.mjs";
import type { ToCompendiumOptions } from "../../_types.mjs";
import type { DatabaseAction } from "../../../common/abstract/_types.mjs";
import type { DatabaseOperation } from "../../../common/abstract/_types.mjs";
import type User from "../user.mjs";
import type { SearchableField } from "../../_types.mjs";
