/**
 * The Wall-specific placeables tab.
 * @extends {PlaceableTab}
 */
export default class WallTab extends PlaceableTab {
    /** @override */
    static override DEFAULT_OPTIONS: {
        actions: {
            selectGroup: Function;
        };
    };
    /**
     * Handle selecting a group of objects.
     * @this {WallTab}
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target.
     */
    static "__#354@#onSelectGroup"(this: WallTab, event: PointerEvent, target: HTMLElement): void;
    /** @inheritDoc */
    _prepareDirectoryContext(context: any, options: any): Promise<any>;
    /** @inheritDoc */
    _prepareEntry(entry: any, context: any): Promise<any>;
    /** @inheritDoc */
    _prepareSearchContext(context: any, options: any): Promise<any>;
    /** @inheritDoc */
    _matchesFilter(entry: any): any;
    /**
     * Handle adjusting the category filter.
     * @param {string} cat  The wall category to filter by.
     * @protected
     */
    protected _onFilterByCategory(cat: string): void;
    #private;
}
import PlaceableTab from "./placeable-tab.mjs";
