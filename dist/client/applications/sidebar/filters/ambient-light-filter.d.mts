/**
 * @import {ContextMenuCallback} from "../../ux/context-menu.mjs";
 */
/**
 * An advanced filter dialog for the AmbientLight placeable tab.
 * @extends {PlaceableFilter}
 */
export default class AmbientLightFilter extends PlaceableFilter {
    /** @override */
    static override DEFAULT_OPTIONS: {
        id: string;
    };
    /** @inheritDoc */
    _onChangeForm(formConfig: any, event: any): void;
    #private;
}
import PlaceableFilter from "./placeable-filter.mjs";
