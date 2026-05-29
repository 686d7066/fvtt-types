/**
 * @import { DataFieldOptions, DataFieldValidationOptions, DataFieldContext } from "../../../../common/data/_types.mjs"
 */
/**
 * @template ReferenceType
 * @typedef {Object} VFXReference
 * @property {string} reference
 * @property {string} [property]
 **/
/**
 * This specialized data field allows storing a data structure that will be later dynamically resolved.
 * This field can be used for a value type that is a single property.
 * If that property is numeric, the reference field can store a relative delta.
 *
 * @template {string|number|boolean|null} [ValueType=any]
 * @typedef {{reference: string; property?: string }|ValueType} VFXReferenceFieldData
 */
export default class VFXReferenceField extends DataField {
    /**
     * The schema of a reference object.
     * @type {SchemaField}
     */
    static referenceField: SchemaField;
    /**
     * Test whether a value is a reference.
     * @param {any} value
     * @returns {boolean}
     */
    static isReference(value: any): boolean;
    /**
     * Construct a VFXReferenceField by providing the inner field schema that it wraps.
     * @param {DataField} valueField
     * @param {DataFieldOptions} options
     * @param {DataFieldContext} context
     */
    constructor(valueField: DataField, options: DataFieldOptions, context: DataFieldContext);
    /** @type {DataField} */
    valueField: DataField;
    /** @override */
    override _cleanType(value: any, options: any, _state: any): any;
    /** @override */
    override _validateType(value: any, options: any): any;
    /** @override */
    override initialize(value: any, model: any, options: any): unknown;
    /**
     * Resolve the value of a VFXReferenceObjectField
     * @param {any} value                         The initial value of the field which may contain a reference
     * @param {Record<string, any>} references    Provided references
     * @returns {ValueType|null|undefined}        The resulting resolved value with references applied, if possible
     */
    resolve(value: any, references: Record<string, any>): ValueType | null | undefined;
}
export type VFXReference<ReferenceType> = {
    reference: string;
    /**
     * **
     */
    property?: string | undefined;
};
/**
 * This specialized data field allows storing a data structure that will be later dynamically resolved.
 * This field can be used for a value type that is a single property.
 * If that property is numeric, the reference field can store a relative delta.
 */
export type VFXReferenceFieldData<ValueType extends string | number | boolean | null = any> = {
    reference: string;
    property?: string;
} | ValueType;
import { DataField } from "../../../../common/data/fields.mjs";
import { SchemaField } from "../../../../common/data/fields.mjs";
import type { DataFieldOptions } from "../../../../common/data/_types.mjs";
import type { DataFieldContext } from "../../../../common/data/_types.mjs";
