/**
 * @import {ProseMirrorDropDownEntry} from "./_types.mjs";
 */
/**
 * A class responsible for creating a drop-down.
 */
export default class ProseMirrorDropDown {
    /**
     * Render a list of drop-down menu items.
     * @param {ProseMirrorDropDownEntry[]} entries  The menu items.
     * @returns {string}  HTML contents as a string.
     * @protected
     */
    protected static _renderMenu(entries: ProseMirrorDropDownEntry[]): string;
    /**
     * Render an individual drop-down menu item.
     * @param {ProseMirrorDropDownEntry} item  The menu item.
     * @returns {string}  HTML contents as a string.
     * @protected
     */
    protected static _renderMenuItem(item: ProseMirrorDropDownEntry): string;
    /**
     * A class responsible for rendering a menu drop-down.
     * @param {string} title                             The default title.
     * @param {ProseMirrorDropDownEntry[]} items         The configured menu items.
     * @param {object} [options]
     * @param {string} [options.cssClass]                The menu CSS class name. Required if providing an action.
     * @param {string} [options.icon]                    Use an icon for the dropdown rather than a text label.
     * @param {string} [options.menu]                    An associated menu that this item collapses under.
     * @param {function(MouseEvent)} [options.onAction]  A callback to fire when a menu item is clicked.
     * @param {number} [options.weight]                  The relative importance of an entry. Entries with lower weight
     *                                                   collapse first.
     */
    constructor(title: string, items: ProseMirrorDropDownEntry[], { cssClass, icon, menu, onAction, weight }?: {
        cssClass?: string | undefined;
        icon?: string | undefined;
        menu?: string | undefined;
        onAction?: ((arg0: MouseEvent) => any) | undefined;
        weight?: number | undefined;
    } | undefined);
    /**
     * An associated menu that this item collapses under.
     * @type {string}
     */
    get menu(): string;
    /**
     * The relative importance of this entry.
     * @type {number}
     */
    get weight(): number;
    /**
     * Attach event listeners.
     * @param {HTMLMenuElement} html  The root menu element.
     */
    activateListeners(html: HTMLMenuElement): void;
    /**
     * Construct the drop-down menu's HTML.
     * @returns {string}  HTML contents as a string.
     */
    render(): string;
    /**
     * Recurse through the menu structure and apply a function to each item in it.
     * @param {function(ProseMirrorDropDownEntry):boolean} fn  The function to call on each item. Return false to prevent
     *                                                         iterating over any further items.
     */
    forEachItem(fn: (arg0: ProseMirrorDropDownEntry) => boolean): void;
    #private;
}
import type { ProseMirrorDropDownEntry } from "./_types.mjs";
