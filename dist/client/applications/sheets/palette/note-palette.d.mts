/**
 * A dialog that provides bulk operation or default values for newly-created notes.
 * @extends {NoteConfig}
 * @mixes PlaceablePaletteMixin
 */
export default class NotePalette extends NoteConfig {
    /** @override */
    static override DEFAULT_OPTIONS: {
        id: string;
    };
    /**
     * The setting key where default data is saved.
     * @type {string}
     */
    static SETTING_KEY: string;
    /**
     * The placeable document.
     * @type {string}
     */
    static documentName: string;
    /** @override */
    static override TABS: {};
    /** @override */
    static override get schema(): any;
    /** @override */
    override _preparePartContext(partId: any, context: any, options: any): Promise<any>;
    /** @inheritDoc */
    _determineMultiFields(docs: any): any;
}
import NoteConfig from "../note-config.mjs";
