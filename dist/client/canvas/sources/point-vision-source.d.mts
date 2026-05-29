/**
 * @import {VisionSourceData} from "./_types.mjs";
 * @import {LightingLevel} from "../../../common/constants.mjs";
 * @import {RenderedEffectSourceData} from "./rendered-effect-source.mjs";
 * @import {PointSourcePolygon} from "../geometry/_module.mjs";
 * @import VisionMode from "../perception/vision-mode.mjs";
 * @import AdaptiveVisionShader from "../rendering/shaders/vision/base-vision.mjs";
 */
/**
 * A specialized subclass of RenderedEffectSource which represents a source of point-based vision.
 * @extends {RenderedEffectSource<VisionSourceData, PointSourcePolygon>}
 */
export default class PointVisionSource extends RenderedEffectSource<VisionSourceData, PointSourcePolygon<foundry.canvas.geometry.types.PointSourcePolygonConfig>> {
    /**
     * The corresponding lighting levels for dim light.
     * @type {LightingLevel}
     * @protected
     */
    protected static _dimLightingLevel: LightingLevel;
    /**
     * The corresponding lighting levels for bright light.
     * @type {LightingLevel}
     * @protected
     */
    protected static _brightLightingLevel: LightingLevel;
    /** @inheritDoc */
    static defaultData: {
        contrast: number;
        attenuation: number;
        saturation: number;
        brightness: number;
        visionMode: string;
        lightRadius: null;
        animation: {};
        seed: null;
        preview: boolean;
        color: null;
        /**
         * The x-coordinate of the source location
         */
        x: number;
        /**
         * The y-coordinate of the source location
         */
        y: number;
        /**
         * The elevation of the point source
         */
        elevation: number;
        /**
         * The ID of the Level the point source is in
         */
        level: string;
        /**
         * Whether or not the source is disabled
         */
        disabled: boolean;
    };
    /** @override */
    static override get _layers(): {
        background: {
            defaultShader: typeof BackgroundVisionShader;
            blendMode: string;
        };
        coloration: {
            defaultShader: typeof ColorationVisionShader;
            blendMode: string;
        };
        illumination: {
            defaultShader: typeof IlluminationVisionShader;
            blendMode: string;
        };
    };
    constructor(options?: foundry.canvas.sources.types.BaseEffectSourceOptions | undefined);
    /**
     * The vision mode linked to this VisionSource
     * @type {VisionMode|null}
     */
    visionMode: VisionMode | null;
    /**
     * The vision mode activation flag for handlers
     * @type {boolean}
     * @internal
     */
    _visionModeActivated: boolean;
    /**
     * The unconstrained LOS polygon.
     * @type {PointSourcePolygon}
     */
    los: PointSourcePolygon;
    /**
     * The polygon of light perception.
     * @type {PointSourcePolygon}
     */
    light: PointSourcePolygon;
    /**
     * An alias for the shape of the vision source.
     * @type {PIXI.Polygon}
     */
    get fov(): PIXI.Polygon;
    /**
     * If this vision source background is rendered into the lighting container.
     * @type {boolean}
     */
    get preferred(): boolean;
    /**
     * Light perception radius of this vision source, taking into account if the source is blinded.
     * @type {number}
     */
    get lightRadius(): number;
    /** @override */
    override get radius(): any;
    /**
     * Is this source temporarily blinded?
     * @type {boolean}
     */
    get isBlinded(): boolean;
    /**
     * Records of blinding strings with a boolean value.
     * By default, if any of this record is true, the source is blinded.
     * @type {Record<string, boolean>}
     */
    blinded: Record<string, boolean>;
    /**
     * Data overrides that could happen with blindness vision mode.
     * @type {object}
     */
    visionModeOverrides: object;
    /**
     * Responsible for assigning the Vision Mode and calling the activation and deactivation handlers.
     * @protected
     */
    protected _updateVisionMode(): void;
    /** @override */
    override _configureLayer(layer: any, layerId: any): void;
    /** @inheritDoc */
    _getPolygonConfiguration(): any;
    /**
     * Creates the polygon that represents light perception.
     * If the light perception radius is unconstrained, no new polygon instance is created;
     * instead the LOS polygon of this vision source is returned.
     * @returns {PointSourcePolygon}    The new polygon or `this.los`.
     * @protected
     */
    protected _createLightPolygon(): PointSourcePolygon;
    /**
     * Create a restricted FOV polygon by limiting the radius of the unrestricted LOS polygon.
     * If the vision radius is unconstrained, no new polygon instance is created;
     * instead the LOS polygon of this vision source is returned.
     * @returns {PointSourcePolygon}    The new polygon or `this.los`.
     * @protected
     */
    protected _createRestrictedPolygon(): PointSourcePolygon;
    /** @override */
    override _configureShaders(): {};
    /** @inheritDoc */
    _updateCommonUniforms(shader: any): void;
    /**
     * Update layer uniforms according to vision mode uniforms, if any.
     * @param {AdaptiveVisionShader} shader        The shader being updated.
     * @param {Record<string, any>} vmUniforms     The targeted layer.
     * @protected
     */
    protected _updateVisionModeUniforms(shader: AdaptiveVisionShader, vmUniforms: Record<string, any>): void;
    #private;
}
import type { VisionSourceData } from "./_types.mjs";
import type { PointSourcePolygon } from "../geometry/_module.mjs";
import RenderedEffectSource from "./rendered-effect-source.mjs";
import type VisionMode from "../perception/vision-mode.mjs";
import type AdaptiveVisionShader from "../rendering/shaders/vision/base-vision.mjs";
import type { LightingLevel } from "../../../common/constants.mjs";
import BackgroundVisionShader from "../rendering/shaders/vision/background-vision.mjs";
import ColorationVisionShader from "../rendering/shaders/vision/coloration-vision.mjs";
import IlluminationVisionShader from "../rendering/shaders/vision/illumination-vision.mjs";
