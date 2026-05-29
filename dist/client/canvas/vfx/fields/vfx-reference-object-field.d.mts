/**
 * A subclass of VFXReferenceField which is used to target an entire object.
 * This allows applying deltas to multiple properties of that object.
 * @template {object} [ValueType=any]
 * @extends VFXReferenceField<ValueType>
 *
 * @example
 * ```js
 * const dimensions = new VFXReferenceObjectField(new SchemaField({
 *   width: new NumberField(),
 *   height: new NumberField()
 * }));
 * const unresolvedValue = {reference: "target", deltas: {width: 1, height: -1}};
 * const references = {target: tokenDocument}; // Suppose tokenDocument width=4 and tokenDocument height=4
 * const resolvedObject = dimensions.resolve(unresolvedValue, references); // {width: 5, height: 3}
 * ```
 */
export default class VFXReferenceObjectField<ValueType extends object = any> {
    constructor(schema: any, options: any, context: any);
    /** @override */
    override resolve(value: any, references: any): any;
}
