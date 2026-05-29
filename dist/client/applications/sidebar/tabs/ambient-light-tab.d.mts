/**
 * The AmbientLight-specific placeables tab.
 * @extends {PlaceableTab}
 */
export default class AmbientLightTab extends PlaceableTab {
    /** @override */
    static override FILTER_CLASS: typeof AmbientLightFilter;
    constructor(...args: any[]);
    /** @inheritDoc */
    _matchesFilter(entry: any): boolean;
    /** @inheritDoc */
    _hasAdvancedFilters(): any;
}
import PlaceableTab from "./placeable-tab.mjs";
import AmbientLightFilter from "../filters/ambient-light-filter.mjs";
