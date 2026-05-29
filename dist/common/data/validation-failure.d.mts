/**
 * @typedef DataModelValidationFailureElement
 * @property {string|number} id                    Either the element's index or some other identifier for it.
 * @property {string} [name]                       Optionally a user-friendly name for the element.
 * @property {DataModelValidationFailure} failure  The element's validation failure.
 */
/**
 * A class responsible for recording information about a validation failure.
 */
export class DataModelValidationFailure {
    /**
     * Collect nested failures into an aggregate object.
     * @param {DataModelValidationFailure} failure            The failure instance
     * @returns {Record<string, DataModelValidationFailure>}  Returns the failure at the leaf of the tree, otherwise an
     *                                                        object of sub-failures.
     */
    static "__#1@#aggregateFailures"(failure: DataModelValidationFailure): Record<string, DataModelValidationFailure>;
    /**
     * Format a DataModelValidationFailure instance as a string message.
     * @param {DataModelValidationFailure} failure    The failure instance
     * @param {number} _d                             An internal depth tracker
     * @returns {string}                              The formatted failure string
     */
    static "__#1@#formatString"(failure: DataModelValidationFailure, _d?: number): string;
    constructor(message?: string, { invalidValue, fallbackValue, fieldPath, dropped, unresolved, ...options }?: {
        dropped?: boolean | undefined;
        unresolved?: boolean | undefined;
    });
    /**
     * The value that failed validation for this field.
     * @type {any}
     */
    invalidValue: any;
    /**
     * The value it was replaced by, if any.
     * @type {any}
     */
    fallbackValue: any;
    /**
     * The path of the field responsible for the failure.
     * @type {string}
     */
    fieldPath: string;
    /**
     * Whether the value was dropped from some parent collection.
     * @type {boolean}
     */
    dropped: boolean;
    /**
     * Record whether a validation failure is unresolved.
     * This reports as true if validation for this field or any hierarchically contained field is unresolved.
     * A failure is unresolved if the value was invalid and there was no valid fallback value available.
     * @type {boolean}
     */
    unresolved: boolean;
    /**
     * The error message.
     * @type {string}
     */
    message: string;
    /**
     * Options forwarded to the Error constructor.
     * @type {Error}
     */
    options: Error;
    /**
     * If this field contains other fields that are validated as part of its validation, their results are recorded here.
     * @type {Record<string, DataModelValidationFailure>}
     */
    fields: Record<string, DataModelValidationFailure>;
    /**
     * If this field contains a list of elements that are validated as part of its validation, their results are recorded
     * here.
     * @type {DataModelValidationFailureElement[]}
     */
    elements: DataModelValidationFailureElement[];
    /**
     * If this field has a joint validation failure across multiple sub-fields, the failure message is recorded here.
     * @type {string}
     */
    joint: string;
    /**
     * Whether this failure contains other sub-failures.
     * @type {boolean}
     */
    get empty(): boolean;
    /**
     * Return this validation failure as an Error instance.
     * @returns {DataModelValidationError}
     */
    asError(): DataModelValidationError;
    /**
     * Copy the data of this DataModeValidationFailure to another one.
     * @param {DataModelValidationFailure} failure
     */
    copyTo(failure: DataModelValidationFailure): void;
    /**
     * Retrieve the leaf node failure that caused this, or a specific sub-failure via a path.
     * @param {string} [key]  The property key to the failure.
     * @returns {DataModelValidationFailure|null}
     *
     * @example Retrieving a failure.
     * ```js
     * const changes = {
     *   "foo.bar": "validValue",
     *   "foo.baz": "invalidValue"
     * };
     * try {
     *   doc.validate(expandObject(changes));
     * } catch ( err ) {
     *   const failure = err.getFailure("foo.baz");
     *   console.log(failure.invalidValue); // "invalidValue"
     * }
     * ```
     */
    getFailure(key?: string | undefined): DataModelValidationFailure | null;
    /**
     * Retrieve a flattened object of all the properties that failed validation as part of this error.
     * @returns {Record<string, DataModelValidationFailure>}
     *
     * @example Removing invalid changes from an update delta.
     * ```js
     * const changes = {
     *   "foo.bar": "validValue",
     *   "foo.baz": "invalidValue"
     * };
     * try {
     *   doc.validate(expandObject(changes));
     * } catch ( err ) {
     *   const failures = err.getAllFailures();
     *   if ( failures ) {
     *     for ( const prop in failures ) delete changes[prop];
     *     doc.validate(expandObject(changes));
     *   }
     * }
     * ```
     */
    getAllFailures(): Record<string, DataModelValidationFailure>;
    /**
     * Return the base properties of this failure, omitting any nested failures.
     * @returns {{invalidValue: any, fallbackValue: any, dropped: boolean, message: string}}
     */
    toObject(): {
        invalidValue: any;
        fallbackValue: any;
        dropped: boolean;
        message: string;
    };
    /**
     * Represent the DataModelValidationFailure as a string.
     * @returns {string}
     */
    toString(): string;
    /**
     * Log the validation error as a table.
     */
    logAsTable(): void;
    /**
     * Generate a nested tree view of the error as an HTML string.
     * @returns {string}
     */
    asHTML(): string;
    /**
     * @deprecated since v14
     * @ignore
     */
    isEmpty(): boolean;
    /**
     * @deprecated since v14
     * @ignore
     */
    get fallback(): any;
}
/**
 * A specialized Error to indicate a model validation failure.
 * @extends {Error}
 */
export class DataModelValidationError extends Error {
    /**
     * @param {DataModelValidationFailure|string} failure  The failure that triggered this error or an error message
     * @param {...any} [params]                            Additional Error constructor parameters
     */
    constructor(failure: DataModelValidationFailure | string, ...params?: any[] | undefined);
    /**
     * @see {@link DataModelValidationFailure#getFailure}
     * @param {string} [key]
     * @returns {DataModelValidationFailure|null}
     */
    getFailure(key?: string | undefined): DataModelValidationFailure | null;
    /**
     * @see {@link DataModelValidationFailure#getAllFailures}
     * @returns {Record<string, DataModelValidationFailure>}
     */
    getAllFailures(): Record<string, DataModelValidationFailure>;
    /**
     * Log the validation error as a table.
     */
    logAsTable(): void;
    /**
     * Generate a nested tree view of the error as an HTML string.
     * @returns {string}
     */
    asHTML(): string;
    #private;
}
export type DataModelValidationFailureElement = {
    /**
     * Either the element's index or some other identifier for it.
     */
    id: string | number;
    /**
     * Optionally a user-friendly name for the element.
     */
    name?: string | undefined;
    /**
     * The element's validation failure.
     */
    failure: DataModelValidationFailure;
};
