/**
 * @import BaseUser from "../documents/user.mjs";
 * @import {
 *   DatabaseCreateOperation,
 *   DatabaseGetOperation,
 *   DatabaseUpdateOperation,
 *   DatabaseDeleteOperation,
 *   DatabaseOperation
 * } from "./_types.mjs";
 */
/**
 * An abstract base class extended on both the client and server which defines how Documents are retrieved, created,
 * updated, and deleted.
 * @abstract
 */
export default class DatabaseBackend {
    /**
     * Retrieve Documents based on provided query parameters.
     * It recommended to use CompendiumCollection#getDocuments or CompendiumCollection#getIndex rather
     * than calling this method directly.
     * @param {typeof Document} documentClass           The Document class definition
     * @param {DatabaseGetOperation} operation          Parameters of the get operation
     * @param {BaseUser} [user]                         The requesting User
     * @returns {Promise<Document[]|object[]>}          An array of retrieved Document instances or index objects
     */
    get(documentClass: typeof Document, operation: DatabaseGetOperation, user?: BaseUser | undefined): Promise<Document[] | object[]>;
    /**
     * Retrieve Document instances using the specified operation parameters.
     * @param {typeof Document} documentClass           The Document class definition
     * @param {DatabaseGetOperation} operation          Parameters of the get operation
     * @param {BaseUser} [user]                         The requesting User
     * @returns {Promise<Document[]|object[]>}          An array of retrieved Document instances or index objects
     * @abstract
     * @internal
     * @ignore
     */
    _getDocuments(documentClass: typeof Document, operation: DatabaseGetOperation, user?: BaseUser | undefined): Promise<Document[] | object[]>;
    /**
     * Create new Documents using provided data and context.
     * It is recommended to use {@link Document.createDocuments} or {@link Document.create} rather than calling this
     * method directly.
     * @param {typeof Document} documentClass           The Document class definition
     * @param {DatabaseCreateOperation} operation       Parameters of the create operation
     * @param {BaseUser} [user]                         The requesting User
     * @returns {Promise<Document[]>}                   An array of created Document instances
     */
    create(documentClass: typeof Document, operation: DatabaseCreateOperation, user?: BaseUser | undefined): Promise<Document[]>;
    /**
     * Create Document instances using provided data and operation parameters.
     * @param {typeof Document} documentClass           The Document class definition
     * @param {DatabaseCreateOperation} operation       Parameters of the create operation
     * @param {BaseUser} [user]                         The requesting User
     * @returns {Promise<Document[]>}                   An array of created Document instances
     * @abstract
     * @internal
     * @ignore
     */
    _createDocuments(documentClass: typeof Document, operation: DatabaseCreateOperation, user?: BaseUser | undefined): Promise<Document[]>;
    /**
     * Update Documents using provided data and context.
     * It is recommended to use {@link Document.updateDocuments} or {@link Document#update} rather than calling this
     * method directly.
     * @param {typeof Document} documentClass           The Document class definition
     * @param {DatabaseUpdateOperation} operation       Parameters of the update operation
     * @param {BaseUser} [user]                         The requesting User
     * @returns {Promise<Document[]>}                   An array of updated Document instances
     */
    update(documentClass: typeof Document, operation: DatabaseUpdateOperation, user?: BaseUser | undefined): Promise<Document[]>;
    /**
     * Update Document instances using provided data and operation parameters.
     * @param {typeof Document} documentClass           The Document class definition
     * @param {DatabaseUpdateOperation} operation       Parameters of the update operation
     * @param {BaseUser} [user]                         The requesting User
     * @returns {Promise<Document[]>}                   An array of updated Document instances
     * @abstract
     * @internal
     * @ignore
     */
    _updateDocuments(documentClass: typeof Document, operation: DatabaseUpdateOperation, user?: BaseUser | undefined): Promise<Document[]>;
    /**
     * Delete Documents using provided ids and context.
     * It is recommended to use {@link foundry.abstract.Document.deleteDocuments} or
     * {@link foundry.abstract.Document#delete} rather than calling this method directly.
     * @param {typeof Document} documentClass           The Document class definition
     * @param {DatabaseDeleteOperation} operation       Parameters of the delete operation
     * @param {BaseUser} [user]                         The requesting User
     * @returns {Promise<Document[]>}                   An array of deleted Document instances
     */
    delete(documentClass: typeof Document, operation: DatabaseDeleteOperation, user?: BaseUser | undefined): Promise<Document[]>;
    /**
     * Delete Document instances using provided ids and operation parameters.
     * @param {typeof Document} documentClass           The Document class definition
     * @param {DatabaseDeleteOperation} operation       Parameters of the delete operation
     * @param {BaseUser} [user]                         The requesting User
     * @returns {Promise<Document[]>}                   An array of deleted Document instances
     * @abstract
     * @internal
     * @ignore
     */
    _deleteDocuments(documentClass: typeof Document, operation: DatabaseDeleteOperation, user?: BaseUser | undefined): Promise<Document[]>;
    /**
     * Get the parent Document (if any) associated with a request context.
     * @param {DatabaseOperation} operation           The requested database operation
     * @returns {Promise<Document|null>}              The parent Document, or null
     * @internal
     * @ignore
     */
    _getParent(operation: DatabaseOperation): Promise<Document | null>;
    /**
     * Describe the scopes which are suitable as the namespace for a flag key
     * @returns {string[]}
     */
    getFlagScopes(): string[];
    /**
     * Describe the scopes which are suitable as the namespace for a flag key
     * @returns {string[]}
     */
    getCompendiumScopes(): string[];
    /**
     * Log a database operations message.
     * @param {string} level      The logging level
     * @param {string} message    The message
     * @abstract
     * @protected
     */
    protected _log(level: string, message: string): void;
    /**
     * Log a database operation for an embedded document, capturing the action taken and relevant IDs
     * @param {string} action                  The action performed
     * @param {string} type                    The document type
     * @param {abstract.Document[]} documents  The documents modified
     * @param {object} [context]               The context of the log request
     * @param {Document} [context.parent]      A parent document
     * @param {string} [context.pack]          A compendium pack within which the operation occurred
     * @param {string} [context.level=info]    The logging level
     * @param {boolean} [context.dryRun=false] Whether this operation is part of a dry run: abort true and level isn't
     *                                         "debug"
     * @protected
     */
    protected _logOperation(action: string, type: string, documents: abstract.Document[], { parent, pack, level, dryRun }?: {
        parent?: Document<object, foundry.abstract.types.DocumentConstructionContext> | undefined;
        pack?: string | undefined;
        level?: string | undefined;
        dryRun?: boolean | undefined;
    } | undefined): void;
    /**
     * Construct a standardized error message given the context of an attempted operation
     * @param {BaseUser} user
     * @param {string} action
     * @param {Document} subject
     * @param {object} [context]
     * @param {Document} [context.parent]
     * @param {string} [context.pack]
     * @returns {string}
     * @protected
     */
    protected _logError(user: BaseUser, action: string, subject: Document, { parent, pack }?: {
        parent?: Document<object, foundry.abstract.types.DocumentConstructionContext> | undefined;
        pack?: string | undefined;
    } | undefined): string;
    #private;
}
import Document from "./document.mjs";
import type { DatabaseGetOperation } from "./_types.mjs";
import type BaseUser from "../documents/user.mjs";
import type { DatabaseCreateOperation } from "./_types.mjs";
import type { DatabaseUpdateOperation } from "./_types.mjs";
import type { DatabaseDeleteOperation } from "./_types.mjs";
import type { DatabaseOperation } from "./_types.mjs";
