/**
 * A dialog that provides bulk operation or default values for newly-created drawings.
 * @extends {DrawingConfig}
 * @mixes PlaceablePaletteMixin
 */
export default class DrawingPalette extends DrawingConfig {
    /** @override */
    static override DEFAULT_OPTIONS: {
        id: string;
        initialData: {
            shape: {
                type: string;
                width: number;
                height: number;
                points: number[];
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
    static override get schema(): foundry.data.fields.SchemaField;
    /**
     * Migrate existing default drawing settings into the palette.
     * @internal
     */
    static _migrateDefaultDrawingConfig(): void;
}
import DrawingConfig from "../drawing-config.mjs";
