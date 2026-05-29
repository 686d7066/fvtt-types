/**
 * The Note-specific placeables tab.
 * @extends {PlaceableTab}
 */
export default class NoteTab extends PlaceableTab {
    /** @override */
    override _getEntryLabel(entry: any): any;
    /** @inheritDoc */
    _prepareEntry(entry: any, context: any): Promise<any>;
}
import PlaceableTab from "./placeable-tab.mjs";
