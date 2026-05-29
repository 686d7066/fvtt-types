/**
 * A specialized subclass of SchemaField that specifically deals with points.
 * This data structure accepts plain objects with {x, y} structure or PIXI.Point objects.
 */
export default class VFXPointField extends SchemaField {
    constructor(options?: {}, context?: {});
}
import { SchemaField } from "../../../../common/data/fields.mjs";
