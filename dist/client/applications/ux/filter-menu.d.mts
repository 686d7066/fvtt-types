/**
 * @import {ContextMenuEntry, ContextMenuOptions} from "./context-menu.mjs";
 */
/**
 * @typedef _FilterMenuOptions
 * @property {() => ContextMenuEntry[]} [menuItems]  The menu item generator.
 */
/**
 * @typedef {ContextMenuOptions & _FilterMenuOptions} FilterMenuOptions
 */
/**
 * A specialized subclass of ContextMenu designed for displaying a menu of filter options.
 * @extends {ContextMenu}
 */
export default class FilterMenu extends ContextMenu {
    /**
     * @param {HTMLElement} container        The HTML element that contains the context menu targets.
     * @param {string} selector              A CSS selector which activates the context menu.
     * @param {FilterMenuOptions} [options]  Additional options to configure the context menu.
     */
    constructor(container: HTMLElement, selector: string, options?: FilterMenuOptions | undefined);
    /** @inheritDoc */
    _preRenderEntries(options?: {}): Promise<void>;
    #private;
}
export type _FilterMenuOptions = {
    /**
     * The menu item generator.
     */
    menuItems?: (() => ContextMenuEntry[]) | undefined;
};
export type FilterMenuOptions = ContextMenuOptions & _FilterMenuOptions;
import ContextMenu from "./context-menu.mjs";
import type { ContextMenuEntry } from "./context-menu.mjs";
import type { ContextMenuOptions } from "./context-menu.mjs";
