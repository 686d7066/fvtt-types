/**
 * An advanced filter dialog for the Tiles placeable tab.
 * @extends {PlaceableFilter}
 */
export default class TileFilter extends PlaceableFilter {
    static DEFAULT_OPTIONS: {
        id: string;
    };
    /** @inheritDoc */
    _onChangeForm(formConfig: any, event: any): void;
}
import PlaceableFilter from "./placeable-filter.mjs";
