/**
 * A specialized VFX reference field that accepts either a pre-computed {@link PointSourcePolygon} instance
 * or a serializable configuration object {x, y, type, radius} sufficient to create one.
 *
 * In the serialized path, the field stores a plain config object and automatically computes the polygon
 * during field initialization. In the reference path, the field resolves to a live PointSourcePolygon
 * at runtime, allowing multiple components to share a single pre-computed polygon without redundant
 * computation.
 *
 * In both cases, the initialized value accessed by the component is always a PointSourcePolygon instance
 * (or null/undefined if not configured).
 *
 * @extends VFXReferenceField
 */
export default class VFXPointSourcePolygonField extends VFXReferenceField {
    constructor(options: any, context: any);
    /** @override */
    override initialize(value: any, model: any, options: any): any;
    /** @override */
    override resolve(value: any, references: any): any;
}
import VFXReferenceField from "./vfx-reference-field.mjs";
