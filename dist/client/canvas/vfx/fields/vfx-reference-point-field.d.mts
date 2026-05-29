/** @import { DataFieldOptions, DataFieldContext } from "../../../../common/data/_types.mjs" */
/**
 * A specialized subclass of VFXReferenceObjectField that specifically deals with points.
 * @extends VFXReferenceObjectField<Point>
 *
 * @example Resolve a relative point into an absolute coordinate.
 * ```js
 * const point = new VFXReferencePointField();
 * const unresolvedValue = {reference: "target", deltas: {x: -50, y: 50}};
 * const references = {target: tokenDocument}; // Suppose tokenDocument.x is 1000 and tokenDocument.y is 2000
 * const resolvedObject = point.resolve(unresolvedValue, references); // {x: 950, y: 2050}
 * ```
 */
export default class VFXReferencePointField extends VFXReferenceObjectField<Point> {
    constructor(options: any, context?: {});
}
import VFXReferenceObjectField from "./vfx-reference-object-field.mjs";
