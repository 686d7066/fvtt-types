/**
 * A dialog that provides bulk operation or default values for newly-created walls.
 * @extends {WallConfig}
 * @mixes PlaceablePaletteMixin
 */
export default class WallPalette extends WallConfig {
    /** @override */
    static override DEFAULT_OPTIONS: {
        id: string;
        initialData: {
            c: number[];
        };
    };
    /**
     * The setting key where default data is saved.
     * @type {string}
     */
    static SETTING_KEY: string;
    /** @override */
    static override COMMIT_TOOL: string;
    /**
     * The placeable document.
     * @type {string}
     */
    static documentName: string;
    /** @inheritDoc */
    static get schema(): any;
    /**
     * Handle clicking a preset button in the scene controls.
     * @param {PointerEvent} event
     */
    static onClickPreset(event: PointerEvent): void;
}
import WallConfig from "../wall-config.mjs";
