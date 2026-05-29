/**
 * A dialog that provides bulk operation or default values for newly-created tiles.
 * @extends {TileConfig}
 * @mixes PlaceablePaletteMixin
 */
export default class TilePalette extends TileConfig {
    /** @override */
    static override DEFAULT_OPTIONS: {
        id: string;
        initialData: {
            width: number;
            height: number;
        };
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
    /** @inheritDoc */
    get createData(): any;
    /** @override */
    override _preparePartContext(partId: any, context: any): Promise<any>;
    #private;
}
import TileConfig from "../tile-config.mjs";
