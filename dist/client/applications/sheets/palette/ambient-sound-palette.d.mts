/**
 * A dialog that provides bulk operation or default values for newly-created ambient sounds.
 * @extends {AmbientSoundConfig}
 * @mixes PlaceablePaletteMixin
 */
export default class AmbientSoundPalette extends AmbientSoundConfig {
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
    /** @inheritDoc */
    get createData(): any;
    /** @override */
    override _preparePartContext(partId: any, context: any): Promise<any>;
}
import AmbientSoundConfig from "../ambient-sound-config.mjs";
