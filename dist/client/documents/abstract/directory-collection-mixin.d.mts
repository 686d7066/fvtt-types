/**
 * @import Collection from "../../../common/utils/collection.mjs";
 * @import Folder from "../folder.mjs";
 */
/**
 * A mixin which adds directory functionality to a DocumentCollection, such as folders, tree structures, and sorting.
 * @category Mixins
 * @param {typeof Collection} BaseCollection      The base collection class to extend
 */
export default function DirectoryCollectionMixin(BaseCollection: typeof Collection): {
    new (): {
        /**
         * Reference the set of Folders which contain documents in this collection
         * @type {Collection<string, Folder>}
         */
        readonly folders: Collection<string, Folder>;
        /**
         * The built tree structure of the DocumentCollection
         * @type {object}
         */
        readonly tree: object;
        /**
         * The built tree structure of the DocumentCollection. Lazy initialized.
         * @type {object}
         */
        "__#84@#tree": object;
        /**
         * The current search mode for this collection
         * @type {string}
         */
        readonly searchMode: string;
        /**
         * Toggle the search mode for this collection between "name" and "full" text search
         */
        toggleSearchMode(): void;
        /**
         * The current sort mode used to order the top level entries in this collection
         * @type {string}
         */
        readonly sortingMode: string;
        /**
         * Toggle the sorting mode for this collection between "a" (Alphabetical) and "m" (Manual by sort property)
         */
        toggleSortingMode(): void;
        /**
         * The maximum depth of folder nesting which is allowed in this collection
         * @returns {number}
         */
        readonly maxFolderDepth: number;
        /**
         * Return a reference to list of entries which are visible to the User in this tree
         * @returns {Array<*>}
         * @protected
         */
        _getVisibleTreeContents(): Array<any>;
        /**
         * Initialize the tree by categorizing folders and entries into a hierarchical tree structure.
         */
        initializeTree(): void;
        /**
         * Given a list of Folders and a list of Entries, set up the Folder tree
         * @param {Folder[]} folders        The Array of Folder objects to organize
         * @param {object[]} entries        The Array of Entries objects to organize
         * @returns {object}                A tree structure containing the folders and entries
         */
        "__#84@#buildTree"(folders: Folder[], entries: object[]): object;
        /**
         * Creates the list of Folder options in this Collection in hierarchical order
         * for populating the options of a select tag.
         * @returns {{id: string, name: string}[]}
         * @internal
         */
        _formatFolderSelectOptions(): {
            id: string;
            name: string;
        }[];
        /**
         * Populate a single folder with child folders and content
         * This method is called recursively when building the folder tree
         * @param {Folder|null} folder                    A parent folder being populated or null for the root node
         * @param {Folder[]} folders                      Remaining unassigned folders which may be children of this one
         * @param {object[]} entries                      Remaining unassigned entries which may be children of this one
         * @param {object} [options={}]                   Options which configure population
         * @param {boolean} [options.allowChildren=true]  Allow additional child folders
         */
        "__#84@#classifyFolderContent"(folder: Folder | null, folders: Folder[], entries: object[], { allowChildren }?: {
            allowChildren?: boolean | undefined;
        } | undefined): {
            folders: Folder[];
            entries: object[];
            unassignedFolders: Folder[];
            unassignedEntries: object[];
        };
        /** @inheritDoc */
        _onModifyContents(action: any, documents: any, result: any, operation: any, user: any): void;
        readonly contents: any[];
        find(condition: (value: any, index: number, collection: Collection<any, any>) => unknown): any;
        filter(condition: (value: any, index: number, collection: Collection<any, any>) => unknown): any[];
        forEach(fn: (value: any, index: number) => void): void;
        get(key: string, { strict }?: {
            strict?: boolean | undefined;
        } | undefined): any;
        getName(name: string, { strict }?: {
            strict?: boolean | undefined;
        } | undefined): any;
        map<U>(transformer: (element: any, index: number, collection: Collection<any, any>) => U): U[];
        reduce<U>(reducer: (accum: U, element: T, index: number, collection: Collection<any, any>) => U, initial: U): U;
        some(condition: (element: any, index: number, set: Collection<any, any>) => boolean): boolean;
        every(condition: (element: any, index: number, set: Collection<any, any>) => boolean): boolean;
        toJSON(): object[];
        [Symbol.iterator](): MapIterator<any>;
        clear(): void;
        delete(key: any): boolean;
        has(key: any): boolean;
        set(key: any, value: any): any;
        readonly size: number;
        entries(): MapIterator<[any, any]>;
        keys(): MapIterator<any>;
        values(): MapIterator<any>;
        readonly [Symbol.toStringTag]: string;
    };
    new (entries?: readonly (readonly [any, any])[] | null | undefined): {
        /**
         * Reference the set of Folders which contain documents in this collection
         * @type {Collection<string, Folder>}
         */
        readonly folders: Collection<string, Folder>;
        /**
         * The built tree structure of the DocumentCollection
         * @type {object}
         */
        readonly tree: object;
        /**
         * The built tree structure of the DocumentCollection. Lazy initialized.
         * @type {object}
         */
        "__#84@#tree": object;
        /**
         * The current search mode for this collection
         * @type {string}
         */
        readonly searchMode: string;
        /**
         * Toggle the search mode for this collection between "name" and "full" text search
         */
        toggleSearchMode(): void;
        /**
         * The current sort mode used to order the top level entries in this collection
         * @type {string}
         */
        readonly sortingMode: string;
        /**
         * Toggle the sorting mode for this collection between "a" (Alphabetical) and "m" (Manual by sort property)
         */
        toggleSortingMode(): void;
        /**
         * The maximum depth of folder nesting which is allowed in this collection
         * @returns {number}
         */
        readonly maxFolderDepth: number;
        /**
         * Return a reference to list of entries which are visible to the User in this tree
         * @returns {Array<*>}
         * @protected
         */
        _getVisibleTreeContents(): Array<any>;
        /**
         * Initialize the tree by categorizing folders and entries into a hierarchical tree structure.
         */
        initializeTree(): void;
        /**
         * Given a list of Folders and a list of Entries, set up the Folder tree
         * @param {Folder[]} folders        The Array of Folder objects to organize
         * @param {object[]} entries        The Array of Entries objects to organize
         * @returns {object}                A tree structure containing the folders and entries
         */
        "__#84@#buildTree"(folders: Folder[], entries: object[]): object;
        /**
         * Creates the list of Folder options in this Collection in hierarchical order
         * for populating the options of a select tag.
         * @returns {{id: string, name: string}[]}
         * @internal
         */
        _formatFolderSelectOptions(): {
            id: string;
            name: string;
        }[];
        /**
         * Populate a single folder with child folders and content
         * This method is called recursively when building the folder tree
         * @param {Folder|null} folder                    A parent folder being populated or null for the root node
         * @param {Folder[]} folders                      Remaining unassigned folders which may be children of this one
         * @param {object[]} entries                      Remaining unassigned entries which may be children of this one
         * @param {object} [options={}]                   Options which configure population
         * @param {boolean} [options.allowChildren=true]  Allow additional child folders
         */
        "__#84@#classifyFolderContent"(folder: Folder | null, folders: Folder[], entries: object[], { allowChildren }?: {
            allowChildren?: boolean | undefined;
        } | undefined): {
            folders: Folder[];
            entries: object[];
            unassignedFolders: Folder[];
            unassignedEntries: object[];
        };
        /** @inheritDoc */
        _onModifyContents(action: any, documents: any, result: any, operation: any, user: any): void;
        readonly contents: any[];
        find(condition: (value: any, index: number, collection: Collection<any, any>) => unknown): any;
        filter(condition: (value: any, index: number, collection: Collection<any, any>) => unknown): any[];
        forEach(fn: (value: any, index: number) => void): void;
        get(key: string, { strict }?: {
            strict?: boolean | undefined;
        } | undefined): any;
        getName(name: string, { strict }?: {
            strict?: boolean | undefined;
        } | undefined): any;
        map<U>(transformer: (element: any, index: number, collection: Collection<any, any>) => U): U[];
        reduce<U>(reducer: (accum: U, element: T, index: number, collection: Collection<any, any>) => U, initial: U): U;
        some(condition: (element: any, index: number, set: Collection<any, any>) => boolean): boolean;
        every(condition: (element: any, index: number, set: Collection<any, any>) => boolean): boolean;
        toJSON(): object[];
        [Symbol.iterator](): MapIterator<any>;
        clear(): void;
        delete(key: any): boolean;
        has(key: any): boolean;
        set(key: any, value: any): any;
        readonly size: number;
        entries(): MapIterator<[any, any]>;
        keys(): MapIterator<any>;
        values(): MapIterator<any>;
        readonly [Symbol.toStringTag]: string;
    };
    new (): {
        /**
         * Reference the set of Folders which contain documents in this collection
         * @type {Collection<string, Folder>}
         */
        readonly folders: Collection<string, Folder>;
        /**
         * The built tree structure of the DocumentCollection
         * @type {object}
         */
        readonly tree: object;
        /**
         * The built tree structure of the DocumentCollection. Lazy initialized.
         * @type {object}
         */
        "__#84@#tree": object;
        /**
         * The current search mode for this collection
         * @type {string}
         */
        readonly searchMode: string;
        /**
         * Toggle the search mode for this collection between "name" and "full" text search
         */
        toggleSearchMode(): void;
        /**
         * The current sort mode used to order the top level entries in this collection
         * @type {string}
         */
        readonly sortingMode: string;
        /**
         * Toggle the sorting mode for this collection between "a" (Alphabetical) and "m" (Manual by sort property)
         */
        toggleSortingMode(): void;
        /**
         * The maximum depth of folder nesting which is allowed in this collection
         * @returns {number}
         */
        readonly maxFolderDepth: number;
        /**
         * Return a reference to list of entries which are visible to the User in this tree
         * @returns {Array<*>}
         * @protected
         */
        _getVisibleTreeContents(): Array<any>;
        /**
         * Initialize the tree by categorizing folders and entries into a hierarchical tree structure.
         */
        initializeTree(): void;
        /**
         * Given a list of Folders and a list of Entries, set up the Folder tree
         * @param {Folder[]} folders        The Array of Folder objects to organize
         * @param {object[]} entries        The Array of Entries objects to organize
         * @returns {object}                A tree structure containing the folders and entries
         */
        "__#84@#buildTree"(folders: Folder[], entries: object[]): object;
        /**
         * Creates the list of Folder options in this Collection in hierarchical order
         * for populating the options of a select tag.
         * @returns {{id: string, name: string}[]}
         * @internal
         */
        _formatFolderSelectOptions(): {
            id: string;
            name: string;
        }[];
        /**
         * Populate a single folder with child folders and content
         * This method is called recursively when building the folder tree
         * @param {Folder|null} folder                    A parent folder being populated or null for the root node
         * @param {Folder[]} folders                      Remaining unassigned folders which may be children of this one
         * @param {object[]} entries                      Remaining unassigned entries which may be children of this one
         * @param {object} [options={}]                   Options which configure population
         * @param {boolean} [options.allowChildren=true]  Allow additional child folders
         */
        "__#84@#classifyFolderContent"(folder: Folder | null, folders: Folder[], entries: object[], { allowChildren }?: {
            allowChildren?: boolean | undefined;
        } | undefined): {
            folders: Folder[];
            entries: object[];
            unassignedFolders: Folder[];
            unassignedEntries: object[];
        };
        /** @inheritDoc */
        _onModifyContents(action: any, documents: any, result: any, operation: any, user: any): void;
        readonly contents: any[];
        find(condition: (value: any, index: number, collection: Collection<any, any>) => unknown): any;
        filter(condition: (value: any, index: number, collection: Collection<any, any>) => unknown): any[];
        forEach(fn: (value: any, index: number) => void): void;
        get(key: string, { strict }?: {
            strict?: boolean | undefined;
        } | undefined): any;
        getName(name: string, { strict }?: {
            strict?: boolean | undefined;
        } | undefined): any;
        map<U>(transformer: (element: any, index: number, collection: Collection<any, any>) => U): U[];
        reduce<U>(reducer: (accum: U, element: T, index: number, collection: Collection<any, any>) => U, initial: U): U;
        some(condition: (element: any, index: number, set: Collection<any, any>) => boolean): boolean;
        every(condition: (element: any, index: number, set: Collection<any, any>) => boolean): boolean;
        toJSON(): object[];
        [Symbol.iterator](): MapIterator<any>;
        clear(): void;
        delete(key: any): boolean;
        has(key: any): boolean;
        set(key: any, value: any): any;
        readonly size: number;
        entries(): MapIterator<[any, any]>;
        keys(): MapIterator<any>;
        values(): MapIterator<any>;
        readonly [Symbol.toStringTag]: string;
    };
    new (iterable?: Iterable<readonly [any, any]> | null | undefined): {
        /**
         * Reference the set of Folders which contain documents in this collection
         * @type {Collection<string, Folder>}
         */
        readonly folders: Collection<string, Folder>;
        /**
         * The built tree structure of the DocumentCollection
         * @type {object}
         */
        readonly tree: object;
        /**
         * The built tree structure of the DocumentCollection. Lazy initialized.
         * @type {object}
         */
        "__#84@#tree": object;
        /**
         * The current search mode for this collection
         * @type {string}
         */
        readonly searchMode: string;
        /**
         * Toggle the search mode for this collection between "name" and "full" text search
         */
        toggleSearchMode(): void;
        /**
         * The current sort mode used to order the top level entries in this collection
         * @type {string}
         */
        readonly sortingMode: string;
        /**
         * Toggle the sorting mode for this collection between "a" (Alphabetical) and "m" (Manual by sort property)
         */
        toggleSortingMode(): void;
        /**
         * The maximum depth of folder nesting which is allowed in this collection
         * @returns {number}
         */
        readonly maxFolderDepth: number;
        /**
         * Return a reference to list of entries which are visible to the User in this tree
         * @returns {Array<*>}
         * @protected
         */
        _getVisibleTreeContents(): Array<any>;
        /**
         * Initialize the tree by categorizing folders and entries into a hierarchical tree structure.
         */
        initializeTree(): void;
        /**
         * Given a list of Folders and a list of Entries, set up the Folder tree
         * @param {Folder[]} folders        The Array of Folder objects to organize
         * @param {object[]} entries        The Array of Entries objects to organize
         * @returns {object}                A tree structure containing the folders and entries
         */
        "__#84@#buildTree"(folders: Folder[], entries: object[]): object;
        /**
         * Creates the list of Folder options in this Collection in hierarchical order
         * for populating the options of a select tag.
         * @returns {{id: string, name: string}[]}
         * @internal
         */
        _formatFolderSelectOptions(): {
            id: string;
            name: string;
        }[];
        /**
         * Populate a single folder with child folders and content
         * This method is called recursively when building the folder tree
         * @param {Folder|null} folder                    A parent folder being populated or null for the root node
         * @param {Folder[]} folders                      Remaining unassigned folders which may be children of this one
         * @param {object[]} entries                      Remaining unassigned entries which may be children of this one
         * @param {object} [options={}]                   Options which configure population
         * @param {boolean} [options.allowChildren=true]  Allow additional child folders
         */
        "__#84@#classifyFolderContent"(folder: Folder | null, folders: Folder[], entries: object[], { allowChildren }?: {
            allowChildren?: boolean | undefined;
        } | undefined): {
            folders: Folder[];
            entries: object[];
            unassignedFolders: Folder[];
            unassignedEntries: object[];
        };
        /** @inheritDoc */
        _onModifyContents(action: any, documents: any, result: any, operation: any, user: any): void;
        readonly contents: any[];
        find(condition: (value: any, index: number, collection: Collection<any, any>) => unknown): any;
        filter(condition: (value: any, index: number, collection: Collection<any, any>) => unknown): any[];
        forEach(fn: (value: any, index: number) => void): void;
        get(key: string, { strict }?: {
            strict?: boolean | undefined;
        } | undefined): any;
        getName(name: string, { strict }?: {
            strict?: boolean | undefined;
        } | undefined): any;
        map<U>(transformer: (element: any, index: number, collection: Collection<any, any>) => U): U[];
        reduce<U>(reducer: (accum: U, element: T, index: number, collection: Collection<any, any>) => U, initial: U): U;
        some(condition: (element: any, index: number, set: Collection<any, any>) => boolean): boolean;
        every(condition: (element: any, index: number, set: Collection<any, any>) => boolean): boolean;
        toJSON(): object[];
        [Symbol.iterator](): MapIterator<any>;
        clear(): void;
        delete(key: any): boolean;
        has(key: any): boolean;
        set(key: any, value: any): any;
        readonly size: number;
        entries(): MapIterator<[any, any]>;
        keys(): MapIterator<any>;
        values(): MapIterator<any>;
        readonly [Symbol.toStringTag]: string;
    };
    /**
     * Sort two Entries by name, alphabetically.
     * @param {Object} a    Some Entry
     * @param {Object} b    Some other Entry
     * @returns {number}    The sort order between entries a and b
     * @protected
     */
    _sortAlphabetical(a: Object, b: Object): number;
    /**
     * Sort two Entries using their numeric sort fields.
     * @param {Object} a    Some Entry
     * @param {Object} b    Some other Entry
     * @returns {number}    The sort order between Entries a and b
     * @protected
     */
    _sortStandard(a: Object, b: Object): number;
    groupBy<K, T>(items: Iterable<T>, keySelector: (item: T, index: number) => K): Map<K, T[]>;
    readonly [Symbol.species]: MapConstructor;
};
import type Collection from "../../../common/utils/collection.mjs";
import type Folder from "../folder.mjs";
