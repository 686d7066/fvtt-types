/**
 * The Drawing-specific placeables tab.
 * @extends {PlaceableTab}
 */
export default class DrawingTab extends PlaceableTab {
    /** @override */
    static override DEFAULT_OPTIONS: {
        actions: {
            selectGroup: Function;
        };
    };
    /**
     * Handle selecting a group of objects.
     * @this {DrawingTab}
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target.
     */
    static "__#348@#onSelectGroup"(this: DrawingTab, event: PointerEvent, target: HTMLElement): void;
    /** @override */
    override _getEntryLabel(entry: any): any;
    /** @inheritDoc */
    _prepareDirectoryContext(context: any, options: any): Promise<any>;
    /** @inheritDoc */
    _prepareEntry(entry: any, context: any): Promise<any>;
}
import PlaceableTab from "./placeable-tab.mjs";
