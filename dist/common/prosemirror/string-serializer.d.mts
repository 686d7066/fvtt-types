/**
 * @import {ProseMirrorMarkOutput, ProseMirrorNodeOutput} from "./_types.mjs";
 */
/**
 * A class responsible for serializing a ProseMirror document into a string of HTML.
 */
export default class StringSerializer {
    /**
     * Build a serializer for the given schema.
     * @param {Schema} schema  The ProseMirror schema.
     * @returns {StringSerializer}
     */
    static fromSchema(schema: Schema): StringSerializer;
    /**
     * @param {Record<string, ProseMirrorNodeOutput>} nodes  The node output specs.
     * @param {Record<string, ProseMirrorMarkOutput>} marks  The mark output specs.
     */
    constructor(nodes: Record<string, ProseMirrorNodeOutput>, marks: Record<string, ProseMirrorMarkOutput>);
    /**
     * Create a StringNode from a ProseMirror DOMOutputSpec.
     * @param {DOMOutputSpec} spec                            The specification.
     * @param {boolean} inline                                Whether this is a block or inline node.
     * @returns {{outer: StringNode, [content]: StringNode}}  An object describing the outer node, and a reference to the
     *                                                        child node where content should be appended, if applicable.
     * @protected
     */
    protected _specToStringNode(spec: DOMOutputSpec, inline: boolean): {
        outer: StringNode;
        [content]: StringNode;
    };
    /**
     * Serialize a ProseMirror fragment into an HTML string.
     * @param {Fragment} fragment    The ProseMirror fragment, a collection of ProseMirror nodes.
     * @param {StringNode} [target]  The target to append to. Not required for the top-level invocation.
     * @returns {StringNode}         A DOM tree representation as a StringNode.
     */
    serializeFragment(fragment: Fragment, target?: StringNode | undefined): StringNode;
    /**
     * Convert a ProseMirror node representation to a StringNode.
     * @param {Node} node  The ProseMirror node.
     * @returns {StringNode}
     * @protected
     */
    protected _toStringNode(node: Node): StringNode;
    /**
     * Convert a ProseMirror mark representation to a StringNode.
     * @param {Mark} mark       The ProseMirror mark.
     * @param {boolean} inline  Does the mark appear in an inline context?
     * @returns {{outer: StringNode, [content]: StringNode}}
     * @protected
     */
    protected _serializeMark(mark: Mark, inline: boolean): {
        outer: StringNode;
        [content]: StringNode;
    };
    #private;
}
import StringNode from "../utils/string-node.mjs";
import type { ProseMirrorNodeOutput } from "./_types.mjs";
import type { ProseMirrorMarkOutput } from "./_types.mjs";
