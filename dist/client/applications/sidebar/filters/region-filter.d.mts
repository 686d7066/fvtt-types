/**
 * An advanced filter dialog for the Regions placeable tab.
 * @extends {PlaceableFilter}
 */
export default class RegionFilter extends PlaceableFilter {
    /** @override */
    static override DEFAULT_OPTIONS: {
        id: string;
    };
    /** @inheritDoc */
    _onChangeForm(formConfig: any, event: any): void;
}
import PlaceableFilter from "./placeable-filter.mjs";
