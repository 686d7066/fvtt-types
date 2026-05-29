/**
 * @import ActiveEffect from "../documents/active-effect.mjs";
 * @import {EffectChangeData} from "../documents/_types.mjs";
 */
/**
 * A TypeDataModel for {@link ActiveEffect}s. A single ArrayField is defined for {@link EffectChangeData}. A system can
 * override the changes SchemaField but must preserve definitions for type, phase, and priority.
 */
export default class ActiveEffectTypeDataModel extends TypeDataModel<object> {
    /** @override */
    static override defineSchema(): {
        changes: fields.ArrayField<fields.SchemaField>;
    };
    /**
     * Validate that an {@link EffectChangeData#type} string is well-formed.
     * @param {string} type The string to be validated
     * @returns {true}
     * @throws {Error} An error if the type string is malformed
     */
    static "__#237@#validateType"(type: string): true;
    constructor(data?: {}, options?: {});
}
import TypeDataModel from "../abstract/type-data.mjs";
import * as fields from "./fields.mjs";
