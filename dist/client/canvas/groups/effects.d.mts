declare const EffectsCanvasGroup_base: {
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
 * @import {PointLightSource, PointVisionSource} from "../sources/_module.mjs";
 * @import {ElevatedPoint} from "../../_types.mjs";
 * @import Collection from "../../../common/utils/collection.mjs";
 */
/**
 * A container group which contains visual effects rendered above the primary group.
 *
 * TODO:
 *  The effects canvas group is now only performing shape initialization, logic that needs to happen at
 *  the placeable or object level is now their burden.
 *  - [DONE] Adding or removing a source from the EffectsCanvasGroup collection.
 *  - [TODO] A change in a darkness source should re-initialize all overlaping light and vision source.
 *
 * ### Hook Events
 * - {@link hookEvents.lightingRefresh}
 *
 * @category Canvas
 */
export default class EffectsCanvasGroup extends EffectsCanvasGroup_base {
    /**
     * The name of the darkness level animation.
     * @type {string}
     */
    static "__#155@#DARKNESS_ANIMATION_NAME": string;
    /**
     * Whether to currently animate light sources.
     * @type {boolean}
     */
    animateLightSources: boolean;
    /**
     * Whether to currently animate vision sources.
     * @type {boolean}
     */
    animateVisionSources: boolean;
    /**
     * A mapping of light sources which are active within the rendered Scene.
     * @type {Collection<string, PointLightSource>}
     */
    lightSources: Collection<string, PointLightSource>;
    /**
     * A mapping of darkness sources which are active within the rendered Scene.
     * @type {Collection<string, PointDarknessSource>}
     */
    darknessSources: Collection<string, PointDarknessSource>;
    /**
     * A Collection of vision sources which are currently active within the rendered Scene.
     * @type {Collection<string, PointVisionSource>}
     */
    visionSources: Collection<string, PointVisionSource>;
    /**
     * A set of vision mask filters used in visual effects group
     * @type {Set<VisualEffectsMaskingFilter>}
     */
    visualEffectsMaskingFilters: Set<VisualEffectsMaskingFilter>;
    /**
     * Iterator for all light and darkness sources.
     * @returns {Generator<PointDarknessSource|PointLightSource, void, void>}
     * @yields PointDarknessSource|PointLightSource
     */
    allSources(): Generator<PointDarknessSource | PointLightSource, void, void>;
    /** @override */
    override _createLayers(): {
        background: CanvasBackgroundAlterationEffects | undefined;
        illumination: CanvasIlluminationEffects | undefined;
        coloration: CanvasColorationEffects | undefined;
        darkness: CanvasDarknessEffects | undefined;
    };
    /**
     * A layer of background alteration effects which change the appearance of the primary group render texture.
     * @type {CanvasBackgroundAlterationEffects}
     */
    background: CanvasBackgroundAlterationEffects | undefined;
    /**
     * A layer which adds illumination-based effects to the scene.
     * @type {CanvasIlluminationEffects}
     */
    illumination: CanvasIlluminationEffects | undefined;
    /**
     * A layer which adds color-based effects to the scene.
     * @type {CanvasColorationEffects}
     */
    coloration: CanvasColorationEffects | undefined;
    /**
     * A layer which adds darkness effects to the scene.
     * @type {CanvasDarknessEffects}
     */
    darkness: CanvasDarknessEffects | undefined;
    /**
     * Clear all effects containers and animated sources.
     */
    clearEffects(): void;
    /** @override */
    override _draw(options: any): Promise<void>;
    /**
     * Initialize positive light sources which exist within the active Scene.
     * Packages can use the "initializeLightSources" hook to programmatically add light sources.
     */
    initializeLightSources(): void;
    /**
     * Initialize all sources that generate edges (Darkness and certain Light sources).
     * Darkness sources always generate edges. Light sources only do so if their priority is strictly greater than 0.
     * The `edgesSources` array will be rebuilt and sorted by descending priority, in the case of a tie,
     * DarknessSources take precedence. Otherwise, the existing array is used as-is.
     * Regardless of whether the array is rebuilt, each source is re-initialized to ensure their geometry is refreshed.
     */
    initializePriorityLightSources(): void;
    /**
     * Refresh the state and uniforms of all light sources and darkness sources objects.
     */
    refreshLightSources(): void;
    /**
     * Refresh the state and uniforms of all VisionSource objects.
     */
    refreshVisionSources(): void;
    /**
     * Refresh the active display of lighting.
     */
    refreshLighting(): void;
    /**
     * Test whether the point is inside light.
     * @param {ElevatedPoint} point        The point to test.
     * @param {object} [options={}]
     * @param {(source: PointLightSource) => boolean} [options.condition]  Optional condition a source must satisfy in
     * order to be tested.
     * @returns {boolean} Is inside light?
     */
    testInsideLight(point: ElevatedPoint, options?: {
        condition?: ((source: PointLightSource) => boolean) | undefined;
    } | undefined): boolean;
    /**
     * Test whether the point is inside darkness.
     * @param {ElevatedPoint} point        The point to test.
     * @param {object} [options={}]
     * @param {(source: PointDarknessSource) => boolean} [options.condition]  Optional condition a source must satisfy in
     * order to be tested.
     * @returns {boolean} Is inside darkness?
     */
    testInsideDarkness(point: ElevatedPoint, options?: {
        condition?: ((source: PointDarknessSource) => boolean) | undefined;
    } | undefined): boolean;
    /**
     * Get the darkness level at the given point.
     * @param {ElevatedPoint} point    The point.
     * @returns {number}               The darkness level.
     */
    getDarknessLevel(point: ElevatedPoint, _elevation: any): number;
    /** @override */
    override _tearDown(options: any): Promise<void>;
    /**
     * Activate vision masking for visual effects
     * @param {boolean} [enabled=true]    Whether to enable or disable vision masking
     */
    toggleMaskingFilters(enabled?: boolean | undefined): void;
    /**
     * Activate post-processing effects for a certain effects channel.
     * @param {string} filterMode                     The filter mode to target.
     * @param {string[]} [postProcessingModes=[]]     The post-processing modes to apply to this filter.
     * @param {Object} [uniforms={}]                  The uniforms to update.
     */
    activatePostProcessingFilters(filterMode: string, postProcessingModes?: string[] | undefined, uniforms?: Object | undefined): void;
    /**
     * Reset post-processing modes on all Visual Effects masking filters.
     */
    resetPostProcessingFilters(): void;
    /**
     * Activate light source animation for AmbientLight objects within this layer
     */
    activateAnimation(): void;
    /**
     * Deactivate light source animation for AmbientLight objects within this layer
     */
    deactivateAnimation(): void;
    /**
     * Animate a smooth transition of the darkness overlay to a target value.
     * Only begin animating if another animation is not already in progress.
     * @param {number} target     The target darkness level between 0 and 1
     * @param {number} duration   The desired animation time in milliseconds. Default is 10 seconds
     * @returns {Promise}         A Promise which resolves once the animation is complete
     */
    animateDarkness(target?: number, { duration }?: number): Promise<any>;
    /**
     * @deprecated since v13
     * @ignore
     */
    initializeDarknessSources(): void;
    #private;
}
import type { PointLightSource } from "../sources/_module.mjs";
import type Collection from "../../../common/utils/collection.mjs";
import PointDarknessSource from "../sources/point-darkness-source.mjs";
import type { PointVisionSource } from "../sources/_module.mjs";
import CanvasBackgroundAlterationEffects from "../layers/effects/background-effects.mjs";
import CanvasIlluminationEffects from "../layers/effects/illumination-effects.mjs";
import CanvasColorationEffects from "../layers/effects/coloration-effects.mjs";
import CanvasDarknessEffects from "../layers/effects/darkness-effects.mjs";
import type { ElevatedPoint } from "../../_types.mjs";
export {};
