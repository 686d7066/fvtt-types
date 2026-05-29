/**
 * A dialog that provides bulk operation or default values for newly-created regions.
 * @extends {RegionConfig}
 * @mixes PlaceablePaletteMixin
 */
export default class RegionPalette extends RegionConfig {
    /** @override */
    static override DEFAULT_OPTIONS: {
        id: string;
        initialData: {
            name: string;
            ownership: {
                default: 3;
            };
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
    static override _getDefaultLevelData(): {
        levels: (string | null)[];
        elevation: {
            bottom: any;
            top: any;
        };
    };
    /** @override */
    static override get schema(): any;
    /** @inheritDoc */
    _applyPreset(formData: any, options?: {}): void;
    /** @override */
    override _preparePartContext(partId: any, context: any, options: any): Promise<any>;
    /** @inheritDoc */
    _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void | this>;
}
import RegionConfig from "../region-config.mjs";
