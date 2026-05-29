/**
 * A dialog that provides bulk operation or default values for newly-created ambient lights.
 * @extends {AmbientLightConfig}
 * @mixes PlaceablePaletteMixin
 */
export default class AmbientLightPalette extends AmbientLightConfig {
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
    static override PARTS: {
        body: {
            template: string;
        };
        footer: {
            template: string;
        };
    };
    /** @override */
    static override get schema(): any;
    /** @override */
    override _preparePartContext(partId: any, context: any): Promise<any>;
}
import AmbientLightConfig from "../ambient-light-config.mjs";
