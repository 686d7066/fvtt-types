/**
 * A custom HTMLElement that is used to wrap enriched content that requires additional interactivity.
 */
export default class HTMLDocumentEmbedElement extends AdoptableHTMLElement {
    /**
     * The HTML tag named used by this element.
     * @type {string}
     */
    static tagName: string;
    /**
     * Invoke the Document#onEmbed callback when it is added to the DOM.
     */
    connectedCallback(): void;
}
import AdoptableHTMLElement from "./adoptable-element.mjs";
