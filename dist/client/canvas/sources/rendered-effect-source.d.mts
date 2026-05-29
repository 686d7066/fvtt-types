/**
 * @import {RenderedEffectLayerConfig, RenderedEffectSourceAnimationConfig,
 *   RenderedEffectSourceData, RenderedEffectSourceLayer} from "./_types.mjs";
 * @import {LightingLevel} from "../../../common/constants.mjs"
 * @import {AbstractBaseShader, AdaptiveBackgroundShader, AdaptiveColorationShader, AdaptiveDarknessShader,
 *   AdaptiveIlluminationShader, AdaptiveLightingShader} from "../rendering/shaders/_module.mjs";
 * @import {BaseEffectSourceData} from "./base-effect-source.mjs";
 */
/**
 * An abstract class which extends the base PointSource to provide common functionality for rendering.
 * This class is extended by both the LightSource and VisionSource subclasses.
 * @template {RenderedEffectSourceData} [TSourceData=RenderedEffectSourceData]
 * @template {PIXI.Polygon} [TSourceShape=PIXI.Polygon]
 * @extends {BaseEffectSource<TSourceData, TSourceShape>}
 * @abstract
 */
export default class RenderedEffectSource<TSourceData extends RenderedEffectSourceData = RenderedEffectSourceData, TSourceShape extends PIXI.Polygon = PIXI.Polygon> extends BaseEffectSource<TSourceData, TSourceShape> {
    /**
     * Keys of the data object which require shaders to be re-initialized.
     * @type {string[]}
     * @protected
     */
    protected static _initializeShaderKeys: string[];
    /**
     * Keys of the data object which require uniforms to be refreshed.
     * @type {string[]}
     * @protected
     */
    protected static _refreshUniformsKeys: string[];
    /**
     * Layers handled by this rendered source.
     * @type {Record<string, RenderedEffectLayerConfig>}
     * @protected
     */
    protected static get _layers(): Record<string, RenderedEffectLayerConfig>;
    /**
     * The offset in pixels applied to create soft edges.
     * @type {number}
     */
    static EDGE_OFFSET: number;
    /** @inheritDoc */
    static defaultData: {
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
    /**
     * Create a new shader using a provider shader class
     * @param {typeof AdaptiveLightingShader} cls   The shader class to create
     * @param {PointSourceMesh} container           The container which requires a new shader
     * @returns {AdaptiveLightingShader}            The shader instance used
     */
    static "__#215@#createShader"(cls: typeof AdaptiveLightingShader, container: PointSourceMesh): AdaptiveLightingShader;
    /**
     * Get corrected level according to level and active vision mode data.
     * @param {LightingLevel} level  The lighting level (one of {@link CONST.LIGHTING_LEVELS})
     * @returns {number} The corrected level.
     */
    static getCorrectedLevel(level: LightingLevel): number;
    /**
     * Get corrected color according to level, dim color, bright color and background color.
     * @param {LightingLevel} level The lighting level (one of {@link CONST.LIGHTING_LEVELS})
     * @param {Color} colorDim
     * @param {Color} colorBright
     * @param {Color} [colorBackground]
     * @returns {Color}
     */
    static getCorrectedColor(level: LightingLevel, colorDim: Color, colorBright: Color, colorBackground?: Color | undefined): Color;
    constructor(options?: foundry.canvas.sources.types.BaseEffectSourceOptions | undefined);
    /**
     * The animation configuration applied to this source
     * @type {RenderedEffectSourceAnimationConfig}
     */
    animation: RenderedEffectSourceAnimationConfig;
    /**
     * Track the status of rendering layers
     * @type {{
     *  background: RenderedEffectSourceLayer,
     *  coloration: RenderedEffectSourceLayer,
     *  illumination: RenderedEffectSourceLayer
     * }}
     */
    layers: {
        background: RenderedEffectSourceLayer;
        coloration: RenderedEffectSourceLayer;
        illumination: RenderedEffectSourceLayer;
    };
    /**
     * The color of the source as an RGB vector.
     * @type {[r: number, g: number, b: number]|null}
     */
    colorRGB: [r: number, g: number, b: number] | null;
    /**
     * PIXI Geometry generated to draw meshes.
     * @type {PIXI.Geometry|null}
     * @protected
     */
    protected _geometry: PIXI.Geometry | null;
    /**
     * Is the rendered source animated?
     * @type {boolean}
     */
    get isAnimated(): boolean;
    /**
     * Has the rendered source at least one active layer?
     * @type {boolean}
     */
    get hasActiveLayer(): boolean;
    /**
     * Is this RenderedEffectSource a temporary preview?
     * @returns {boolean}
     */
    get isPreview(): boolean;
    /**
     * A convenience accessor to the background layer mesh.
     * @type {PointSourceMesh}
     */
    get background(): PointSourceMesh;
    /**
     * A convenience accessor to the coloration layer mesh.
     * @type {PointSourceMesh}
     */
    get coloration(): PointSourceMesh;
    /**
     * A convenience accessor to the illumination layer mesh.
     * @type {PointSourceMesh}
     */
    get illumination(): PointSourceMesh;
    /** @inheritDoc */
    _initialize(data: any): void;
    /**
     * Decide whether to render soft edges with a blur.
     * @protected
     */
    protected _initializeSoftEdges(): void;
    /** @override */
    override _configure(changes: any): void;
    /**
     * Configure which shaders are used for each rendered layer.
     * @returns {Record<string, typeof AdaptiveLightingShader>}
     *   An object whose keys are layer identifiers and whose values are shader classes.
     * @protected
     */
    protected _configureShaders(): Record<string, typeof AdaptiveLightingShader>;
    /**
     * Specific configuration for a layer.
     * @param {object} layer
     * @param {string} layerId
     * @protected
     */
    protected _configureLayer(layer: object, layerId: string): void;
    /**
     * Create the geometry for the source shape that is used in shaders and compute its bounds for culling purpose.
     * Triangulate the form and create buffers.
     * @protected
     * @abstract
     */
    protected _updateGeometry(): void;
    /**
     * Render the containers used to represent this light source within the LightingLayer
     * @returns {Record<string, PIXI.Mesh|null>}
     */
    drawMeshes(): Record<string, PIXI.Mesh | null>;
    /**
     * Create a Mesh for a certain rendered layer of this source.
     * @param {string} layerId            The layer key in layers to draw
     * @returns {PIXI.Mesh|null}          The drawn mesh for this layer, or null if no mesh is required
     * @protected
     */
    protected _drawMesh(layerId: string): PIXI.Mesh | null;
    /**
     * Update shader uniforms used by every rendered layer.
     * @param {AbstractBaseShader} shader
     * @protected
     */
    protected _updateCommonUniforms(shader: AbstractBaseShader): void;
    /**
     * Update shader uniforms used for the background layer.
     * @protected
     */
    protected _updateBackgroundUniforms(): void;
    /**
     * Update shader uniforms used for the coloration layer.
     * @protected
     */
    protected _updateColorationUniforms(): void;
    /**
     * Update shader uniforms used for the illumination layer.
     * @protected
     */
    protected _updateIlluminationUniforms(): void;
    /**
     * Animate the PointSource, if an animation is enabled and if it currently has rendered containers.
     * @param {number} dt         Delta time.
     */
    animate(dt: number): any;
    /**
     * Generic time-based animation used for Rendered Point Sources.
     * @param {number} dt           Delta time.
     * @param {object} [options]    Options which affect the time animation
     * @param {number} [options.speed=5]            The animation speed, from 0 to 10
     * @param {number} [options.intensity=5]        The animation intensity, from 1 to 10
     * @param {boolean} [options.reverse=false]     Reverse the animation direction
     */
    animateTime(dt: number, { speed, intensity, reverse }?: {
        speed?: number | undefined;
        intensity?: number | undefined;
        reverse?: boolean | undefined;
    } | undefined): void;
    #private;
}
import type { RenderedEffectSourceData } from "./_types.mjs";
import BaseEffectSource from "./base-effect-source.mjs";
import type { RenderedEffectSourceAnimationConfig } from "./_types.mjs";
import type { RenderedEffectSourceLayer } from "./_types.mjs";
import PointSourceMesh from "../containers/elements/point-source-mesh.mjs";
import type { AdaptiveLightingShader } from "../rendering/shaders/_module.mjs";
import type { AbstractBaseShader } from "../rendering/shaders/_module.mjs";
import type { RenderedEffectLayerConfig } from "./_types.mjs";
import type { LightingLevel } from "../../../common/constants.mjs";
import Color from "../../../common/utils/color.mjs";
