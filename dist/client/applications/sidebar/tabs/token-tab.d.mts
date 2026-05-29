/**
 * The Token-specific placeables tab.
 * @extends {PlaceableTab}
 */
export default class TokenTab extends PlaceableTab {
    /** @override */
    static override DEFAULT_OPTIONS: {
        actions: {
            selectGroup: Function;
        };
    };
    /**
     * Handle selecting a group of tokens.
     * @this {TokenTab}
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target.
     */
    static "__#353@#onSelectGroup"(this: TokenTab, event: PointerEvent, target: HTMLElement): void;
    /** @inheritDoc */
    _prepareDirectoryContext(context: any, options: any): Promise<any>;
    /** @inheritDoc */
    _prepareEntry(entry: any, context: any): Promise<any>;
    #private;
}
import PlaceableTab from "./placeable-tab.mjs";
