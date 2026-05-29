/**
 * ProseMirror implementation of the HTML disclosure widget.
 */
export default class DisclosureWidget {
    /**
     * Static instantiator function for the NodeView that can be passed to a new EditorView.
     * @param {Node} node            The node this view represents.
     * @param {EditorView} view      The parent EditorView.
     * @param {() => number} getPos  A function that returns the node's current position.
     * @returns {DisclosureWidget}
     */
    static view(node: Node, view: EditorView, getPos: () => number): DisclosureWidget;
    /**
     * Return the specs for the disclosure widget nodes.
     * @type {Record<string, NodeSpec>}
     */
    static get nodes(): Record<string, NodeSpec>;
    /**
     * @param {Node} node            The node this view represents.
     * @param {EditorView} view      The parent EditorView.
     * @param {() => number} getPos  A function that returns the node's current position.
     */
    constructor(node: Node, view: EditorView, getPos: () => number);
    /**
     * The outer DOM node that represents the document node.
     * @type {HTMLDetailsElement}
     */
    dom: HTMLDetailsElement;
    /**
     * The DOM node to render the document node's children into.
     * @type {HTMLDetailsElement}
     */
    contentDOM: HTMLDetailsElement;
    /**
     * A function that returns the node's current position.
     * @type {() => number}
     */
    getPos: () => number;
    /**
     * When the EditorView updates itself, determine if this view can update to the given node.
     * @param {Node} node  The node.
     * @returns {boolean}
     */
    update(node: Node): boolean;
    #private;
}
