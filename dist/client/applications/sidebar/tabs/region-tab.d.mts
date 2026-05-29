/**
 * The Region-specific placeables tab.
 * @extends {PlaceableTab}
 */
export default class RegionTab extends PlaceableTab {
    /** @override */
    static override FILTER_CLASS: typeof RegionFilter;
    constructor(...args: any[]);
    /** @inheritDoc */
    _prepareEntry(entry: any, context: any): Promise<any>;
    /** @inheritDoc */
    _matchesFilter(entry: any): boolean;
    #private;
}
import PlaceableTab from "./placeable-tab.mjs";
import RegionFilter from "../filters/region-filter.mjs";
