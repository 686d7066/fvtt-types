/**
 * @import {DeepReadonly} from "../_types.mjs";
 * @import {ResolvedUUID} from "./_types.mjs";
 * @import {Document} from "../abstract/_module.mjs";
 */
/**
 * Recurse through an object, applying all special DataFieldOperator values.
 * ForcedDeletion values (or deprecated "-=" keys) are removed from the object
 * ForcedReplacement values (or deprecated "==" keys) are updated in the object
 * @param {*} obj
 * @returns {*}
 */
export function applyDataOperators(obj: any): any;
/**
 * Benchmark the performance of a function, calling it a requested number of iterations.
 * @param {Function} func       The function to benchmark
 * @param {number} iterations   The number of iterations to test
 * @param {...any} args         Additional arguments passed to the benchmarked function
 */
export function benchmark(func: Function, iterations: number, ...args: any[]): Promise<void>;
/**
 * A debugging function to test latency or timeouts by forcibly locking the thread for an amount of time.
 * @param {number} ms         A number of milliseconds to lock
 * @param {boolean} debug     Log debugging information?
 * @returns {Promise<void>}
 */
export function threadLock(ms: number, debug?: boolean): Promise<void>;
/**
 * Wrap a callback in a debounced timeout and expose a cancel method.
 * Delay execution of the callback function until the function has not been called for delay milliseconds.
 *
 * @example Classic usage
 * const updateSearch = debounce(query => this.#runSearch(query), 250);
 * updateSearch("goblin");
 * updateSearch("goblin king");
 *
 * @example Cancel a pending call
 * const savePosition = debounce(() => this.#save(), 1500);
 * savePosition();
 *
 * // Later, if you need to cancel a pending call before the debounced callback fires
 * savePosition.cancel();
 *
 * @param {Function} callback       A function to execute once the debounced threshold has been passed
 * @param {number} delay            An amount of time in milliseconds to delay
 * @returns {Function}              A wrapped function which can be called to debounce execution with a cancel method
 */
export function debounce(callback: Function, delay: number): Function;
/**
 * Wrap a callback in a throttled timeout.
 * Delay execution of the callback function when the last time the function was called was delay milliseconds ago
 * @param {Function} callback       A function to execute once the throttled threshold has been passed
 * @param {number} delay            A maximum amount of time in milliseconds between to execution
 * @returns {Function}              A wrapped function which can be called to throttle execution
 */
export function throttle(callback: Function, delay: number): Function;
/**
 * Recursively freezes (`Object.freeze`) the object (or value).
 * This method DOES NOT support cyclical data structures.
 * This method DOES NOT support advanced object types like Set, Map, or other specialized classes.
 * @template {object} const T
 * @param {T} obj                             The object (or value)
 * @param {object} [options]                  Options to configure the behaviour of deepFreeze
 * @param {boolean} [options.strict=false]    Throw an Error if deepFreeze is unable to seal something instead of
 *                                            returning the original
 * @returns {Readonly<T>}                     The same object (or value) that was passed in
 */
export function deepFreeze<const T extends object>(obj: T, { strict }?: {
    strict?: boolean | undefined;
} | undefined): Readonly<T>;
/**
 * Recursively seals (`Object.seal`) the object (or value).
 * This method DOES NOT support cyclical data structures.
 * This method DOES NOT support advanced object types like Set, Map, or other specialized classes.
 * @template {object} T
 * @param {T} obj                             The object (or value)
 * @param {object} [options]                  Options to configure the behaviour of deepSeal
 * @param {boolean} [options.strict=false]    Throw an Error if deepSeal is unable to seal something
 * @returns {T}                               The same object (or value) that was passed in
 */
export function deepSeal<T extends object>(obj: T, { strict }?: {
    strict?: boolean | undefined;
} | undefined): T;
/**
 * Quickly clone a simple piece of data, returning a copy which can be mutated safely.
 * This method DOES support recursive data structures containing inner objects or arrays.
 * This method DOES NOT support cyclical data structures.
 * This method DOES NOT support advanced object types like Set, Map, or other specialized classes.
 * @template {object} T
 * @param {T} original                      Some sort of data
 * @param {object} [options]                Options to configure the behaviour of deepClone
 * @param {boolean} [options.strict=false]  Throw an Error if deepClone is unable to clone something instead of
 *                                          returning the original
 * @param {boolean} [options.prune=false]   Delete object entries with undefined values
 * @returns {T}                             The clone of that data
 */
export function deepClone<T extends object>(original: T, { strict, prune }?: {
    strict?: boolean | undefined;
    prune?: boolean | undefined;
} | undefined): T;
/**
 * Deeply difference an object against some other, returning the update keys and values.
 * @param {object} original       An object comparing data against which to compare
 * @param {object} other          An object containing potentially different data.
 *                                Supports values that are DataFieldOperator instances.
 * @param {object} [options={}]   Additional options which configure the diff operation
 * @param {boolean} [options.inner=false]  Only recognize differences in other for keys which also exist in original
 * @param {boolean} [options.deletionKeys=false] Apply special logic to deletion keys. They will only be kept if the
 *                                               original object has a corresponding key that could be deleted.
 * @param {boolean} [options.bidirectional=false] Create a bidirectional diff (or "patch" in Unix parlance), setting a
 *                                                forced-deletion value where an entry is defined in the original object
 *                                                but not the other.
 * @param {number} [options._d]           An internal depth tracker
 * @returns {object}              An object of the data in other which differs from that in original
 */
export function diffObject(original: object, other: object, { inner, deletionKeys, bidirectional, _d }?: {
    inner?: boolean | undefined;
    deletionKeys?: boolean | undefined;
    bidirectional?: boolean | undefined;
    _d?: number | undefined;
} | undefined): object;
/**
 * Test if two values are equivalent.
 *
 * This helper supports equality testing for:
 * 1. Primitive data types (number, string, boolean, undefined)
 * 2. Simple objects (Object prototype, null)
 * 3. Complex objects which expose an `equals` method (Array, Set, Color, etc...)
 *
 * This method compares object `b` with object `a`, so in cases where an equality testing method is used it is called
 * as `a.equals(b).
 *
 * @param {any} a  The first value
 * @param {any} b  The second value
 * @returns {boolean}
 */
export function equals(a: any, b: any): boolean;
/**
 * A cheap data duplication trick which is relatively robust.
 * For a subset of cases the deepClone function will offer better performance.
 * @param {Object} original   Some sort of data
 */
export function duplicate(original: Object): any;
/**
 * Test whether some class is a subclass of a parent.
 * Returns true if the classes are identical.
 * @param {Function} cls        The class to test
 * @param {Function} parent     Some other class which may be a parent
 * @returns {boolean}           Is the class a subclass of the parent?
 */
export function isSubclass(cls: Function, parent: Function): boolean;
/**
 * Search up the prototype chain and return the class that defines the given property.
 * @param {Object|Constructor} obj    A class instance or class definition which contains a property.
 *                                    If a class instance is passed the property is treated as an instance attribute.
 *                                    If a class constructor is passed the property is treated as a static attribute.
 * @param {string} property           The property name
 * @returns {Constructor<Object>}             The class that defines the property
 */
export function getDefiningClass(obj: Object | Constructor, property: string): Constructor<Object>;
/**
 * Encode an url-like string by replacing any characters which need encoding.
 * To reverse this encoding, the native decodeURIComponent can be used on the whole encoded string, without adjustment.
 * @param {string} path     A fully-qualified URL or url component (like a relative path)
 * @returns {string}         An encoded URL string
 */
export function encodeURL(path: string): string;
/**
 * Expand a flattened object to be a standard nested Object by converting all dot-notation keys to inner objects.
 * Only simple objects will be expanded. Other Object types like class instances will be retained as-is.
 * @param {object} obj      The object to expand
 * @returns {object}        An expanded object
 */
export function expandObject(obj: object): object;
/**
 * Expand dot-notation keys within a plain object, mutating it in place.
 * Use a lazy allocation strategy that only copies keys when some expansion is required.
 * Performs the dot-key check and expansion in a single forward pass.
 * Keys without dots are passed through via direct assignment.
 * Keys containing dots are expanded via setProperty.
 * @param {object} data                       The object to expand in place.
 * @param {object} [options]                  Options for how expansion occurs.
 * @param {boolean} [options.shallow=false]   Whether to only expand top-level keys.
 * @returns {boolean}                         Whether any expansion was performed at any level.
 */
export function expandObjectInPlace(data: object, { shallow }?: {
    shallow?: boolean | undefined;
} | undefined): boolean;
/**
 * Filter the contents of some source object using the structure of a template object.
 * Only keys which exist in the template are preserved in the source object.
 *
 * @param {object} source           An object which contains the data you wish to filter
 * @param {object} template         An object which contains the structure you wish to preserve
 * @param {object} [options={}]     Additional options which customize the filtration
 * @param {boolean} [options.templateValues=false]  Instead of keeping values from the source, instead draw values
 *                                                  from the template
 * @returns {object}                The filtered object
 *
 * @example Filter an object
 * ```js
 * const source = {foo: {number: 1, name: "Tim", topping: "olives"}, bar: "baz"};
 * const template = {foo: {number: 0, name: "Mit", style: "bold"}, other: 72};
 * filterObject(source, template); // {foo: {number: 1, name: "Tim"}};
 * filterObject(source, template, {templateValues: true}); // {foo: {number: 0, name: "Mit"}};
 * ```
 */
export function filterObject(source: object, template: object, { templateValues }?: {
    templateValues?: boolean | undefined;
} | undefined): object;
/**
 * Flatten a possibly multidimensional object to a one-dimensional one by converting all nested keys to dot notation
 * @param {object} obj        The object to flatten
 * @param {number} [_d=0]     Track the recursion depth to prevent overflow
 * @returns {object}          A flattened object
 */
export function flattenObject(obj: object, _d?: number | undefined): object;
/**
 * Obtain references to the parent classes of a certain class.
 * @param {Function} cls            An class definition
 * @returns {Array<typeof Object>}  An array of parent classes which the provided class extends
 */
export function getParentClasses(cls: Function): Array<typeof Object>;
/**
 * Get the URL route for a certain path which includes a path prefix, if one is set
 * @param {string} path             The Foundry URL path
 * @param {string|null} [prefix]    A path prefix to apply
 * @returns {string}                The absolute URL path
 */
export function getRoute(path: string, { prefix }?: string | null | undefined): string;
/**
 * Test whether the given element is an instance of a given HTMLElement class in a cross-window way.
 * @param {HTMLElement} element            The element to test.
 * @param {string|Constructor} tagOrClass  The tag name or HTMLElement subclass to test.
 * @returns {boolean}
 */
export function isElementInstanceOf(element: HTMLElement, tagOrClass: string | Constructor): boolean;
/**
 * Determine whether a value is a plain object; that is, one with a constructor of Object of null.
 * @param {unknown} value
 * @returns {boolean}
 */
export function isPlainObject(value: unknown): boolean;
/**
 * Learn the underlying data type of some variable. Supported identifiable types include:
 * undefined, null, number, string, boolean, function, Array, Set, Map, Promise, Error,
 * HTMLElement (client side only), Object (plain objects).
 * If the type isn't identifiable, Unknown is returned.
 * @param {*} variable  A provided variable
 * @returns {string}    The named type of the token
 */
export function getType(variable: any): string;
/**
 * A helper function which tests whether an object has a property or nested property given a string key.
 * The method also supports arrays if the provided key is an integer index of the array.
 * The string key supports the notation a.b.c which would return true if object[a][b][c] exists
 * @param {object} object   The object to traverse
 * @param {string} key      An object property with notation a.b.c
 * @returns {boolean}       An indicator for whether the property exists
 */
export function hasProperty(object: object, key: string): boolean;
/**
 * A helper function which searches through an object to retrieve a value by a string key.
 * The method also supports arrays if the provided key is an integer index of the array.
 * The string key supports the notation a.b.c which would return object[a][b][c]
 * @param {object} object   The object to traverse
 * @param {string} key      An object property with notation a.b.c
 * @returns {*}             The value of the found property
 */
export function getProperty(object: object, key: string): any;
/**
 * A helper function which searches through an object to assign a value using a string key
 * This string key supports the notation a.b.c which would target object[a][b][c]
 * @param {object} object   The object to update
 * @param {string} key      The string key
 * @param {*} value         The value to be assigned
 * @returns {boolean}       Whether the value was changed from its previous value
 */
export function setProperty(object: object, key: string, value: any): boolean;
/**
 * A helper function which searches through an object to delete a value by a string key.
 * The string key supports the notation a.b.c which would delete object[a][b][c]
 * @param {object} object   The object to traverse
 * @param {string} key      An object property with notation a.b.c
 * @returns {boolean}       Was the property deleted?
 */
export function deleteProperty(object: object, key: string): boolean;
/**
 * Invert an object by assigning its values as keys and its keys as values.
 * @param {object} obj    The original object to invert
 * @returns {object}      The inverted object with keys and values swapped
 */
export function invertObject(obj: object): object;
/**
 * Return whether a target version (v1) is more advanced than some other reference version (v0).
 * Supports either numeric or string version comparison with version parts separated by periods.
 * @param {number|string|null|undefined} v1    The target version
 * @param {number|string|null|undefined} v0    The reference version
 * @param {object} [options]                   Additional options which affect the comparison.
 * @param {boolean} [options.majorOnly]        Compare only the major version numbers.
 * @returns {boolean}                          Is v1 a more advanced version than v0?
 */
export function isNewerVersion(v1: number | string | null | undefined, v0: number | string | null | undefined, { majorOnly }?: {
    majorOnly?: boolean | undefined;
} | undefined): boolean;
/**
 * Test whether a value is empty-like; either undefined or a content-less object.
 * @param {*} value       The value to test
 * @returns {boolean}     Is the value empty-like?
 */
export function isEmpty(value: any): boolean;
/**
 * Object entries generator.
 * @param {object} obj
 * @yields {[string, any]}
 */
export function objectEntries(obj: object): Generator<any[], void, unknown>;
/**
 * Stream object entries.
 * @param {object} obj
 * @returns {IteratorObject<[string, any], void, unknown>}
 */
export function iterateEntries(obj: object): IteratorObject<[string, any], void, unknown>;
/**
 * Object keys generator.
 * @param {object} obj
 * @yields {string}
 */
export function objectKeys(obj: object): Generator<string, void, unknown>;
/**
 * Stream object keys.
 * @param {object} obj
 * @returns {IteratorObject<string, void, unknown>}
 */
export function iterateKeys(obj: object): IteratorObject<string, void, unknown>;
/**
 * Object values generator.
 * @param {object} obj
 * @yields {any}
 */
export function objectValues(obj: object): Generator<any, void, unknown>;
/**
 * Stream object values.
 * @param {object} obj
 * @returns {IteratorObject<any, void, unknown>}
 */
export function iterateValues(obj: object): IteratorObject<any, void, unknown>;
/**
 * Update a source object by replacing its keys and values with those from a target object.
 *
 * @param {object} original                           The initial object which should be updated with values from the
 *                                                    target
 * @param {object} [other={}]                         A new object whose values should replace those in the source
 * @param {object} [options={}]                       Additional options which configure the merge
 * @param {boolean} [options.insertKeys=true]         Control whether to insert new top-level objects into the resulting
 *                                                    structure which do not previously exist in the original object.
 * @param {boolean} [options.insertValues=true]       Control whether to insert new nested values into child objects in
 *                                                    the resulting structure which did not previously exist in the
 *                                                    original object.
 * @param {boolean} [options.overwrite=true]          Control whether to replace existing values in the source, or only
 *                                                    merge values which do not already exist in the original object.
 * @param {boolean} [options.recursive=true]          Control whether to merge inner-objects recursively (if true), or
 *                                                    whether to simply replace inner objects with a provided new value.
 * @param {boolean} [options.inplace=true]            Control whether to apply updates to the original object in-place
 *                                                    (if true), otherwise the original object is duplicated and the
 *                                                    copy is merged.
 * @param {boolean} [options.enforceTypes=false]      Control whether strict type checking requires that the value of a
 *                                                    key in the other object must match the data type in the original
 *                                                    data to be merged.
 * @param {boolean} [options.applyOperators=false]    Control whether to apply the effects of DataFieldOperator values
 *                                                    (if true) or retain those operators (if false) in the resulting
 *                                                    merged object.
 * @param {number} [_d=0]                             A privately used parameter to track recursion depth.
 * @returns {object}                                  The original source object including updated, inserted, or
 *                                                    overwritten records.
 *
 * @example Control how new keys and values are added
 * ```js
 * mergeObject({k1: "v1"}, {k2: "v2"}, {insertKeys: false}); // {k1: "v1"}
 * mergeObject({k1: "v1"}, {k2: "v2"}, {insertKeys: true});  // {k1: "v1", k2: "v2"}
 * mergeObject({k1: {i1: "v1"}}, {k1: {i2: "v2"}}, {insertValues: false}); // {k1: {i1: "v1"}}
 * mergeObject({k1: {i1: "v1"}}, {k1: {i2: "v2"}}, {insertValues: true}); // {k1: {i1: "v1", i2: "v2"}}
 * ```
 *
 * @example Control how existing data is overwritten
 * ```js
 * mergeObject({k1: "v1"}, {k1: "v2"}, {overwrite: true}); // {k1: "v2"}
 * mergeObject({k1: "v1"}, {k1: "v2"}, {overwrite: false}); // {k1: "v1"}
 * ```
 *
 * @example Control whether merges are performed recursively
 * ```js
 * mergeObject({k1: {i1: "v1"}}, {k1: {i2: "v2"}}, {recursive: false}); // {k1: {i2: "v2"}}
 * mergeObject({k1: {i1: "v1"}}, {k1: {i2: "v2"}}, {recursive: true}); // {k1: {i1: "v1", i2: "v2"}}
 * ```
 *
 * @example Deleting an existing object key
 * ```js
 * mergeObject({k1: "v1", k2: "v2"}, {"k1": new ForcedDeletion()}, {applyOperators: true});   // {k2: "v2"}
 * ```
 *
 * @example Explicitly replacing an inner object key
 * ```js
 * mergeObject({k1: {i1: "v1"}}, {"k1": ForcedReplacement.create({i2: "v2"})}, {applyOperators: true}); // {k1: {i2: "v2"}}
 * ```
 */
export function mergeObject(original: object, other?: object | undefined, { insertKeys, insertValues, overwrite, recursive, inplace, enforceTypes, applyOperators, performDeletions }?: {
    insertKeys?: boolean | undefined;
    insertValues?: boolean | undefined;
    overwrite?: boolean | undefined;
    recursive?: boolean | undefined;
    inplace?: boolean | undefined;
    enforceTypes?: boolean | undefined;
    applyOperators?: boolean | undefined;
} | undefined, _d?: number | undefined): object;
/**
 * Parse an S3 key to learn the bucket and the key prefix used for the request.
 * @param {string} key  A fully qualified key name or prefix path.
 * @returns {{bucket: string|null, keyPrefix: string}}
 */
export function parseS3URL(key: string): {
    bucket: string | null;
    keyPrefix: string;
};
/**
 * Generate a random alphanumeric string ID of a given requested length using `crypto.getRandomValues()`.
 * @param {number} length    The length of the random string to generate, which must be at most 16384.
 * @returns {string}         A string containing random letters (A-Z, a-z) and numbers (0-9).
 */
export function randomID(length?: number): string;
/**
 * Format a file size to an appropriate order of magnitude.
 * @param {number} size  The size in bytes.
 * @param {object} [options]
 * @param {number} [options.decimalPlaces=2]  The number of decimal places to round to.
 * @param {2|10} [options.base=10]            The base to use. In base 10 a kilobyte is 1000 bytes. In base 2 it is
 *                                            1024 bytes.
 * @returns {string}
 */
export function formatFileSize(size: number, { decimalPlaces, base }?: {
    decimalPlaces?: number | undefined;
    base?: 2 | 10 | undefined;
} | undefined): string;
/**
 * Parse a UUID into its constituent parts, identifying the type and ID of the referenced document.
 * The ResolvedUUID result also identifies a "primary" document which is a root-level document either in the game
 * World or in a Compendium pack which is a parent of the referenced document.
 * @param {string} uuid                  The UUID to parse.
 * @param {object} [options]             Options to configure parsing behavior.
 * @param {foundry.abstract.Document} [options.relative]  A document to resolve relative UUIDs against.
 * @returns {ResolvedUUID|null} Returns, if possible, the Collection, Document Type, and Document ID to resolve the
 *                              parent document, as well as the remaining Embedded Document parts, if any.
 */
export function parseUuid(uuid: string, { relative }?: {
    relative?: Document<object, foundry.abstract.types.DocumentConstructionContext> | undefined;
} | undefined): ResolvedUUID | null;
/**
 * Build the relative UUID of the target relative to the origin if possible.
 * @param {string|Document} target  The target UUID or Document
 * @param {string|Document} origin    The origin UUID or Document
 * @returns {string}                The relative UUID of the target relative to the origin if possible,
 *                                  otherwise the absolute UUID of the target
 */
export function buildRelativeUuid(target: string | Document, origin: string | Document): string;
/**
 * Build a Universally Unique Identifier (uuid) from possibly limited data. An attempt will be made to resolve omitted
 * components, but an identifier and at least one of documentName, parent, and pack are required.
 * @param {object} context  Data for building the uuid
 * @param {string} context.id              The identifier of the document
 * @param {string} [context.documentName]  The document name (or type)
 * @param {Document|null} [context.parent] The document's parent, if any
 * @param {string|null} [context.pack]     The document's compendium pack, if applicable
 * @returns {string|null} A well-formed Document uuid unless one is unable to be created
 */
export function buildUuid({ id, documentName, parent, pack }: {
    id: string;
    documentName?: string | undefined;
    parent?: Document<object, foundry.abstract.types.DocumentConstructionContext> | null | undefined;
    pack?: string | null | undefined;
}): string | null;
/**
 * Escape the given unescaped string.
 *
 * Escaped strings are safe to use inside inner HTML of most tags and in most quoted HTML attributes.
 * They are not NOT safe to use in `<script>` tags, unquoted attributes, `href`, `onmouseover`, and similar.
 * They must be unescaped first if they are used inside a context that would escape them.
 *
 * Handles only `&`, `<`, `>`, `"`, and `'`.
 * @see {@link foundry.utils.unescapeHTML}
 * @param {string|any} value    An unescaped string
 * @returns {string}            The escaped string
 */
export function escapeHTML(value: string | any): string;
/**
 * Unescape the given escaped string.
 *
 * Handles only `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#x27;`.
 * @see {@link foundry.utils.escapeHTML}
 * @param {string} value    An escaped string
 * @returns {string}        The escaped string
 */
export function unescapeHTML(value: string): string;
/**
 * @deprecated since v14
 * @ignore
 */
export function applySpecialKeys(obj: any): any;
/**
 * Is a string key of an object used for certain deletion or forced replacement operations.
 *
 * This function has become internal and undocumented. It can be deprecated and removed once support for
 * legacy deletion keys is fully removed.
 * @ignore
 * @internal
 */
export function isDeletionKey(key: any): boolean;
/**
 * @deprecated since v14
 * @ignore
 */
export function objectsEqual(a: any, b: any): boolean;
/**
 * A utility function to request a debounced page reload.
 * @type {() => void}
 */
export const debouncedReload: () => void;
import type { Document } from "../abstract/_module.mjs";
import type { ResolvedUUID } from "./_types.mjs";
