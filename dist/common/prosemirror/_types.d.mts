export type ProseMirrorContentLinkOptions = {
    /**
     * The parent document housing this editor.
     */
    document?: Document<object, foundry.abstract.types.DocumentConstructionContext> | undefined;
    /**
     * Whether to generate links relative to the parent document.
     */
    relativeLinks?: boolean | undefined;
};
export type ProseMirrorMenuOptions = {
    /**
     * A function to call when the save button is pressed.
     */
    onSave?: Function | undefined;
    /**
     * Whether this editor instance is intended to be destroyed when saved.
     */
    destroyOnSave?: boolean | undefined;
    /**
     * Whether to display a more compact version of the menu.
     */
    compact?: boolean | undefined;
};
export type ProseMirrorMenuItem = {
    /**
     * A string identifier for this menu item.
     */
    action: string;
    /**
     * The description of the menu item.
     */
    title: string;
    /**
     * An optional class to apply to the menu item.
     */
    class?: string | undefined;
    /**
     * An optional style to apply to the title text.
     */
    style?: string | undefined;
    /**
     * The menu item's icon HTML.
     */
    icon?: string | undefined;
    /**
     * The mark to apply to the selected text.
     */
    mark?: any;
    /**
     * The node to wrap the selected text in.
     */
    node?: any;
    /**
     * An object of attributes for the node or mark.
     */
    attrs?: object | undefined;
    /**
     * Entries with the same group number will be grouped together in the drop-down.
     *             Lower-numbered groups appear higher in the list.
     */
    group?: number | undefined;
    /**
     * A numeric priority which determines whether this item is displayed as the
     *          dropdown title. Lower priority takes precedence.
     */
    priority?: number | undefined;
    /**
     * The relative importance of an entry. Lower-weight entries are collapsed under
     *            menus before higher-weight entries when the viewport is constrained. Entries
     *            with no weight are never collapsed.
     */
    weight?: number | undefined;
    /**
     * An associated menu item that this entry collapses under. When this entry is
     *              visible, its associated menu item is hidden.
     */
    menu?: string | undefined;
    /**
     * The command to run when the menu item is clicked.
     */
    cmd?: ProseMirrorCommand | undefined;
    /**
     * Whether the current item is active under the given selection or cursor.
     */
    active?: boolean | undefined;
};
export type _ProseMirrorDropDownEntry = {
    /**
     * Any child entries.
     */
    children?: ProseMirrorDropDownEntry[] | undefined;
};
export type ProseMirrorDropDownEntry = ProseMirrorMenuItem & _ProseMirrorDropDownEntry;
export type ProseMirrorDropDownConfig = {
    /**
     * The default title of the drop-down.
     */
    title: string;
    /**
     * The menu CSS class.
     */
    cssClass: string;
    /**
     * An optional icon to use instead of a text label.
     */
    icon?: string | undefined;
    /**
     * The drop-down entries.
     */
    entries: ProseMirrorDropDownEntry[];
};
export type ProseMirrorCommand = (state: EditorState, dispatch: Function, view: EditorView) => boolean;
export type ProseMirrorMenuResizeState = {
    /**
     * The widths of menu items that are currently hidden.
     */
    hiddenWidth: number;
    /**
     * Cached references to rendered drop-down menu entries.
     */
    menus: Record<string, HTMLElement>;
    /**
     * The resize observer.
     */
    observer: ResizeObserver;
    /**
     * Cached references to
     * rendered menu items and their sizes, ordered by weight and grouped by
     * menu.
     */
    sizes: {
        elements: HTMLElement[];
        menu: string;
        weight: number;
        width: number;
    }[];
};
export type MenuToggleBlockWrapCommand = (node: NodeType, attrs?: object | undefined) => ProseMirrorCommand;
export type ProseMirrorNodeOutput = (node: Node) => DOMOutputSpec;
export type ProseMirrorMarkOutput = (mark: Mark, inline: boolean) => DOMOutputSpec;
export type ProseMirrorSliceTransformer = (node: Node) => Node | void;
import type { Document } from "../abstract/_module.mjs";
