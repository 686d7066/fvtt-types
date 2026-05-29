/**
 * The Tile-specific placeables tab.
 * @extends {PlaceableTab}
 */
export default class TileTab extends PlaceableTab {
    /** @override */
    static override FILTER_CLASS: typeof TileFilter;
    constructor(...args: any[]);
    /** @override */
    override _getEntryLabel(entry: any): any;
    /** @inheritDoc */
    _matchesFilter(entry: any): boolean;
    /** @inheritDoc */
    _hasAdvancedFilters(): any;
}
import PlaceableTab from "./placeable-tab.mjs";
import TileFilter from "../filters/tile-filter.mjs";
