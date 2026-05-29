/**
 * A class that behaves like a lightweight DOM node, allowing children to be appended. Serializes to an HTML string.
 */
export default class StringNode {
    /**
     * A list of HTML void elements that do not have a closing tag.
     * @type {Set<string>}
     */
    static "__#236@#VOID": Set<string>;
    /**
     * Escape HTML tags within string content.
     * @param {string} content  The string content.
     * @returns {string}
     */
    static "__#236@#escapeHTML"(content: string): string;
    /**
     * Convert an HTMLCollection to a StringNode.
     * @param {StringNode} parent          The parent StringNode to append to.
     * @param {HTMLCollection} collection  The child collection to convert and append.
     * @returns {StringNode}               Returns the parent StringNode.
     */
    static "__#236@#convertCollectionToStringNode"(parent: StringNode, collection: HTMLCollection): StringNode;
    /**
     * Convert an HTML node to a StringNode.
     * @param {Node} node                 The HTML Node.
     * @returns {StringNode|string|null}  Returns null if the node cannot be converted.
     */
    static "__#236@#convertNodeToStringNode"(node: Node): StringNode | string | null;
    /**
     * Convert an HTML string to a StringNode.
     * @param {string} html  The HTML string.
     * @returns {StringNode}
     * @throws {Error}       If unable to perform conversion.
     */
    static fromString(html: string): StringNode;
    /**
     * @param {string} [tag]            The tag name. If none is provided, this node's children will not be wrapped in an
     *                                  outer tag.
     * @param {Record<string, string>} [attrs]  The tag attributes.
     * @param {boolean} [inline=false]  Whether the node appears inline or as a block.
     */
    constructor(tag?: string | undefined, attrs?: Record<string, string> | undefined, inline?: boolean | undefined);
    /**
     * Whether the node appears inline or as a block.
     * @type {boolean}
     */
    get inline(): boolean;
    /**
     * Append a child to this string node.
     * @param {StringNode|string} child  The child node or string.
     * @throws {Error}                   If attempting to append a child to a void element.
     */
    appendChild(child: StringNode | string): void;
    /**
     * Serialize the StringNode structure into a single string.
     * @param {string|number} spaces  The number of spaces to use for indentation (maximum 10). If this value is a string,
     *                                that string is used as indentation instead (or the first 10 characters if it is
     *                                longer).
     * @param {object} [internal]
     * @param {number} [internal._depth]
     * @param {boolean} [internal._inlineParent]
     */
    toString(spaces?: string | number, { _depth, _inlineParent }?: {
        _depth?: number | undefined;
        _inlineParent?: boolean | undefined;
    } | undefined): any;
    #private;
}
