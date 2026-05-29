/**
 * @callback AutocompleteCallback
 * @param {string} identifier        The identifier of the entry that was selected.
 * @param {string} label             The label of the entry that was selected.
 * @param {object} [options]
 * @param {string} [options.prefix]  The matched prefix that originally triggered this autocomplete menu.
 */
/**
 * @typedef AutocompleteEntry
 * @property {string} identifier  A unique identifier for the entry.
 * @property {string} label       A human-readable label for the entry.
 */
/**
 * A widget that provides a drop-down list of autocompletion options.
 */
export default class Autocomplete {
    /**
     * Handle keyboard navigation of the menu.
     * @param {KeyboardEvent} event  The originating event.
     */
    static "__#4@#onKeyDown"(event: KeyboardEvent): void;
    /**
     * Bind global autocomplete listeners to a given document.
     * @param {Document} document  The document.
     */
    static activateListeners(document: Document): void;
    /**
     * Retrieve the configured Autocomplete implementation.
     * @type {typeof Autocomplete}
     */
    static get implementation(): typeof Autocomplete;
    /**
     * @param {object} [options]
     * @param {AutocompleteCallback} [options.onSelect]  Callback to fire when an entry is selected.
     */
    constructor({ onSelect }?: {
        onSelect?: AutocompleteCallback | undefined;
    } | undefined);
    /**
     * The auto-complete menu.
     * @type {HTMLMenuElement}
     */
    get element(): HTMLMenuElement;
    /**
     * Commit a choice.
     */
    commit(): void;
    /**
     * Dismiss the auto-complete menu.
     */
    dismiss(): void;
    /**
     * Move the current auto-complete selection.
     * @param {number} increment  The number of entries to advance the selection. A negative number moves up, and a
     *                            positive number moves down.
     */
    select(increment?: number): void;
    /**
     * Activate an auto-complete menu.
     * @param {HTMLElement} target                               The element the autocomplete is being rendered for.
     * @param {AutocompleteEntry[]} entries                      The entries to render.
     * @param {object} [options]
     * @param {string} [options.prefix]                          The matched prefix that triggered the autocomplete menu.
     * @param {Partial<ApplicationPosition>} [options.position]  Position the menu. If omitted, the menu is positioned
     *                                                           underneath the target.
     */
    activate(target: HTMLElement, entries: AutocompleteEntry[], { prefix, position }?: {
        prefix?: string | undefined;
        position?: any;
    } | undefined): void;
    #private;
}
export type AutocompleteCallback = (identifier: string, label: string, options?: {
    prefix?: string | undefined;
} | undefined) => any;
export type AutocompleteEntry = {
    /**
     * A unique identifier for the entry.
     */
    identifier: string;
    /**
     * A human-readable label for the entry.
     */
    label: string;
};
