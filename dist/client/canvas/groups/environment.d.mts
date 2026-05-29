declare const EnvironmentCanvasGroup_base: {
    new (...args: any[]): {
        sortableChildren: boolean;
        layers: Record<string, foundry.canvas.layers.CanvasLayer>;
        readonly name: string;
        readonly hookName: string;
        _createLayers(): {};
        "__#206@#drawing": Promise<any>;
        "__#206@#drawn": boolean;
        draw(options?: object | undefined): Promise<any>;
        _draw(options: object): Promise<any>;
        tearDown(options?: foundry.types.CanvasTearDownOptions | undefined): Promise<any>;
        _tearDown(options: foundry.types.CanvasTearDownOptions): Promise<void>;
    };
    groupName: string | undefined;
    tearDownChildren: boolean;
};
/**
 * @import GlobalLightSource from "../sources/global-light-source.mjs";
 */
/**
 * @typedef CanvasEnvironmentConfig
 * @property {ColorSource} [backgroundColor]              The background canvas color
 * @property {ColorSource} [brightestColor]               The brightest ambient color
 * @property {ColorSource} [darknessColor]                The color of darkness
 * @property {ColorSource} [daylightColor]                The ambient daylight color
 * @property {ColorSource} [fogExploredColor]             The color applied to explored areas
 * @property {ColorSource} [fogUnexploredColor]           The color applied to unexplored areas
 * @property {SceneEnvironmentData} [environment]         The scene environment data
 */
/**
 * A container group which contains the primary canvas group and the effects canvas group.
 * @category Canvas
 */
export default class EnvironmentCanvasGroup extends EnvironmentCanvasGroup_base {
    /** @override */
    static override groupName: string;
    /**
     * Fallback colors.
     * @enum {Color}
     */
    static "__#154@#fallbackColors": {
        darknessColor: number;
        daylightColor: number;
        brightestColor: number;
        backgroundColor: number;
        fogUnexplored: number;
        fogExplored: number;
    };
    eventMode: string;
    /**
     * The global light source attached to the environment
     * @type {GlobalLightSource}
     */
    globalLightSource: GlobalLightSource;
    /**
     * Colors exposed by the manager.
     * @enum {Color}
     */
    colors: {
        darkness: undefined;
        halfdark: undefined;
        background: undefined;
        dim: undefined;
        bright: undefined;
        ambientBrightest: undefined;
        ambientDaylight: undefined;
        ambientDarkness: undefined;
        sceneBackground: undefined;
        fogExplored: undefined;
        fogUnexplored: undefined;
    };
    /**
     * Weights used by the manager to compute colors.
     * @enum {number}
     */
    weights: {
        dark: undefined;
        halfdark: undefined;
        dim: undefined;
        bright: undefined;
    };
    /**
     * Get the darkness level of this scene.
     * @returns {number}
     */
    get darknessLevel(): number;
    /** @override */
    override _draw(options: any): Promise<void>;
    /**
     * @typedef {PIXI.FederatedEvent} CanvasEnvironmentDarknessChangeEvent
     * @param {"darknessChange"} type
     * @param {{darknessLevel: number, priorDarknessLevel: number}} environmentData
     */
    /**
     * @callback CanvasEnvironmentDarknessChange
     * @param {CanvasEnvironmentDarknessChangeEvent} event
     */
    /**
     * Initialize the scene environment options.
     * @param {CanvasEnvironmentConfig} config
     * @fires {hookEvents:initializeCanvasEnvironment}
     * @fires {CanvasEnvironmentDarknessChange}
     */
    initialize(config?: CanvasEnvironmentConfig): void;
    #private;
}
export type CanvasEnvironmentConfig = {
    /**
     * The background canvas color
     */
    backgroundColor?: any;
    /**
     * The brightest ambient color
     */
    brightestColor?: any;
    /**
     * The color of darkness
     */
    darknessColor?: any;
    /**
     * The ambient daylight color
     */
    daylightColor?: any;
    /**
     * The color applied to explored areas
     */
    fogExploredColor?: any;
    /**
     * The color applied to unexplored areas
     */
    fogUnexploredColor?: any;
    /**
     * The scene environment data
     */
    environment?: any;
};
import type GlobalLightSource from "../sources/global-light-source.mjs";
export {};
