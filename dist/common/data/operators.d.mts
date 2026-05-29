/**
 * Reconstruct a DataFieldOperator instance from a serialized object.
 * @param {{[OPERATOR_IDENTIFIER]: string, value: any}} obj
 */
export function reconstructOperator(obj: {
    value: any;
}): ForcedDeletion | ForcedReplacement;
/**
 * A symbol used to reference the operator value which ensures it does not collide with a proxied key of that value.
 * @type {symbol}
 */
export const OPERATOR_VALUE: symbol;
/**
 * A unique string used in serialization to identify that an object should be deserialized to a DataFieldOperator.
 * @type {string}
 */
export const OPERATOR_IDENTIFIER: string;
/**
 * A base class used for all special database operations.
 */
export class DataFieldOperator {
    /**
     * Create a DataFieldOperator using a provided value.
     * @param {any} value
     * @returns {DataFieldOperator}
     */
    static create(value: any): DataFieldOperator;
    /**
     * Retrieve the inner value of the DataFieldOperator, or return the value passed if not a DataFieldOperator.
     * @param {any} value
     * @returns {any}
     */
    static get(value: any): any;
    /**
     * Assign the inner value of the DataFieldOperator.
     * @param {DataFieldOperator} operator
     * @param {any} value
     * @returns {any}
     */
    static set(operator: DataFieldOperator, value: any): any;
    /**
     * A comparison helper function that asserts whether two values are equal when one or both values may be
     * DataFieldOperator instances.
     * @param {DataFieldOperator|any} a
     * @param {DataFieldOperator|any} b
     */
    static equals(a: DataFieldOperator | any, b: DataFieldOperator | any): boolean;
    constructor(value: any);
    /** @override */
    override toJSON(): {
        [x: string]: any;
        value: any;
    };
}
/**
 * Force the deletion of a certain DataModel field, resetting its value back to undefined.
 */
export class ForcedDeletion extends DataFieldOperator {
}
/**
 * Force the replacement of a certain DataModel field, assigning it to some explicit value without inner recursion.
 */
export class ForcedReplacement extends DataFieldOperator {
}
