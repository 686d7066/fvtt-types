/**
 * @import {AllowedAttributeConfiguration, ManagedAttributesSpec} from "./_types.mjs";
 */
/**
 * A class responsible for injecting attribute capture logic into the ProseMirror schema.
 */
export default class AttributeCapture {
    /**
     * Augments the schema definition to allow each node or mark to capture all the attributes on an element and preserve
     * them when re-serialized back into the DOM.
     * @param {NodeSpec|MarkSpec} spec  The schema specification.
     */
    attributeCapture(spec: NodeSpec | MarkSpec): void;
    /**
     * Capture all allowable attributes present on an HTML element and store them in an object for preservation in the
     * schema.
     * @param {HTMLElement} el                 The element.
     * @param {ManagedAttributesSpec} managed  An object containing the attributes, styles, and classes that are managed
     *                                         by the ProseMirror node and should not be preserved.
     * @returns {Record<string, string>}
     * @internal
     */
    _captureAttributes(el: HTMLElement, managed?: ManagedAttributesSpec): Record<string, string>;
    /**
     * Capture all classes present on an HTML element.
     * @param {HTMLElement} el                 The element.
     * @param {ManagedAttributesSpec} managed  An object containing the classes that are managed by the ProseMirror node
     *                                         and should not be preserved.
     * @returns {string}
     * @internal
     */
    _captureClasses(el: HTMLElement, managed?: ManagedAttributesSpec): string;
    #private;
}
import type { ManagedAttributesSpec } from "./_types.mjs";
