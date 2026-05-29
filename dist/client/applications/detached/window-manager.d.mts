/**
 * @import { DetachedWindowOptions } from "../_types.mjs";
 */
/**
 * @typedef DetachedWindowDescriptor
 * @property {WindowProxy} window                       The window instance.
 * @property {Map<string, ApplicationV2>} applications  A mapping of applications rendered in the window.
 */
/**
 * A singleton class that provides an API for spawning and managing detached windows.
 */
export default class DetachedWindowManager {
    /**
     * The currently-focused window.
     * @type {WindowProxy|null}
     */
    get focused(): Window | null;
    /**
     * A registry of detached window instances.
     * @type {Map<string, DetachedWindowDescriptor>}
     */
    get windows(): Map<string, DetachedWindowDescriptor>;
    /**
     * Check if a detached window contains any applications, and closes it if there are none.
     * @param {WindowProxy} win  The window.
     */
    checkEmpty(win: WindowProxy): void;
    /**
     * Open a window detached from the main application window.
     * @param {DetachedWindowOptions} [options]
     * @returns {Promise<WindowProxy>}
     */
    openWindow({ id, position, timeout, source }?: DetachedWindowOptions | undefined): Promise<WindowProxy>;
    /**
     * Adopt nodes into a new host window and append them to the given target.
     * @param {HTMLElement} target  The target.
     * @param {...Node} nodes       The nodes.
     */
    adoptNodes(target: HTMLElement, ...nodes: Node[]): void;
    /**
     * Copy attributes between two elements.
     * @param {HTMLElement} from                  The element to copy from.
     * @param {HTMLElement} to                    The element to copy to.
     * @param {object} [options]
     * @param {Iterable<string>} [options.attrs]  Copy only the specified attributes.
     */
    copyAttributes(from: HTMLElement, to: HTMLElement, { attrs }?: {
        attrs?: Iterable<string> | undefined;
    } | undefined): void;
    /**
     * Import nodes into a new host window and append them to the given target.
     * @param {HTMLElement} target  The target.
     * @param {...Node} nodes       The nodes.
     */
    importNodes(target: HTMLElement, ...nodes: Node[]): void;
    /**
     * Performs a DOM query across all detached windows and the main workspace, and return the first match.
     * @param {string} selector  The query selector.
     * @returns {HTMLElement|null}
     */
    querySelector(selector: string): HTMLElement | null;
    /**
     * Perform a DOM query across all detached windows and the main workspace, and return all matches.
     * @param {string} selector  The query selector.
     * @returns {HTMLElement[]}
     */
    querySelectorAll(selector: string): HTMLElement[];
    /**
     * Handle tear-down when a detached window is closed.
     * @param {WindowProxy} win  The window instance.
     * @internal
     */
    _onWindowClosed(win: WindowProxy): void;
    #private;
}
export type DetachedWindowDescriptor = {
    /**
     * The window instance.
     */
    window: WindowProxy;
    /**
     * A mapping of applications rendered in the window.
     */
    applications: Map<string, ApplicationV2>;
};
import type { DetachedWindowOptions } from "../_types.mjs";
