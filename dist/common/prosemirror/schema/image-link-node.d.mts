/**
 * A class responsible for encapsulating logic around image-link nodes in the ProseMirror schema.
 * @extends {SchemaDefinition}
 */
export default class ImageLinkNode extends SchemaDefinition {
    /**
     * Cached attribute capture instance.
     * @type {AttributeCapture}
     */
    static "__#271@#capture": AttributeCapture;
    /** @override */
    static override get attrs(): object;
    /** @override */
    static override getAttrs(el: any): false | {
        src: any;
        title: any;
        alt: any;
    };
    /** @override */
    static override toDOM(node: any): (string | {
        href: any;
        title: any;
    })[];
    /** @inheritdoc */
    static make(): object;
    /**
     * Handle clicking on image links while editing.
     * @param {EditorView} view     The ProseMirror editor view.
     * @param {number} pos          The position in the ProseMirror document that the click occurred at.
     * @param {PointerEvent} event  The click event.
     * @param {Node} node           The Node instance.
     */
    static onClick(view: EditorView, pos: number, event: PointerEvent, node: Node): boolean;
}
import SchemaDefinition from "./schema-definition.mjs";
import AttributeCapture from "./attribute-capture.mjs";
