declare const CanvasVisibility_base: {
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
 * @import {Point, ElevatedPoint, CanvasVisibilityTestConfiguration,
 *   CanvasVisibilityTextureConfiguration} from "../../_types.mjs";
 * @import {PointLightSource, PointVisionSource} from "../sources/_module.mjs";
 * @import {CanvasVisionContainer} from "../layers/_types.mjs";
 * @import {LightingVisibility} from "../perception/_types.mjs";
 */
/**
 * The visibility group which implements dynamic vision, lighting, and fog of war
 * This group uses an event-driven workflow to perform the minimal required calculation in response to changes.
 *
 * ### Hook Events
 * - {@link hookEvents.initializeVisionMode}
 * - {@link hookEvents.initializeVisionSources}
 * - {@link hookEvents.sightRefresh}
 * - {@link hookEvents.visibilityRefresh}
 *
 * @category Canvas
 */
export default class CanvasVisibility extends CanvasVisibility_base {
    /** @override */
    static override groupName: string;
    /**
     * The maximum allowable visibility texture size.
     * @type {number}
     */
    static "__#156@#MAXIMUM_VISIBILITY_TEXTURE_SIZE": number;
    /**
     * Give the visibility requirement of the lighting background shader.
     * @param {VisionMode} visionMode             The single Vision Mode active at the moment (if any).
     * @returns {LightingVisibility}
     */
    static "__#156@#requireBackgroundShader"(visionMode: VisionMode): LightingVisibility;
    /**
     * The currently revealed vision.
     * @type {CanvasVisionContainer}
     */
    vision: CanvasVisionContainer;
    /**
     * The surface exposure.
     * @type {PIXI.Container}
     */
    surfaceExposure: PIXI.Container;
    /**
     * The exploration container which tracks exploration progress.
     * @type {PIXI.Container}
     */
    explored: PIXI.Container;
    /**
     * The optional visibility overlay sprite that should be drawn instead of the unexplored color in the fog of war.
     * @type {PIXI.Sprite}
     */
    visibilityOverlay: PIXI.Sprite;
    /**
     * The active vision source data object
     * @type {{source: PointVisionSource|null, activeLightingOptions: object}}
     */
    visionModeData: {
        source: PointVisionSource | null;
        activeLightingOptions: object;
    };
    /**
     * Define whether each lighting layer is enabled, required, or disabled by this vision mode.
     * The value for each lighting channel is a number in LIGHTING_VISIBILITY
     * @type {{illumination: number, background: number, coloration: number,
     * darkness: number, any: boolean}}
     */
    lightingVisibility: {
        illumination: number;
        background: number;
        coloration: number;
        darkness: number;
        any: boolean;
    };
    /**
     * A status flag for whether the group initialization workflow has succeeded.
     * @type {boolean}
     */
    get initialized(): boolean;
    /**
     * Indicates whether containment filtering is required when rendering vision into a texture.
     * @type {boolean}
     */
    get needsContainment(): boolean;
    /**
     * Does the currently viewed Scene support Token field of vision?
     * @type {boolean}
     */
    get tokenVision(): boolean;
    /**
     * The configured options used for the saved fog-of-war texture.
     * @type {CanvasVisibilityTextureConfiguration}
     */
    get textureConfiguration(): CanvasVisibilityTextureConfiguration;
    /**
     * Optional overrides for exploration sprite dimensions.
     * @type {PIXI.Rectangle|undefined}
     */
    set explorationRect(rect: any);
    /**
     * Initialize all Token vision sources which are present on this group.
     */
    initializeSources(): void;
    /**
     * Initialize the vision mode.
     */
    initializeVisionMode(): void;
    /** @override */
    override _draw(options: any): Promise<void>;
    filter: foundry.canvas.rendering.filters.AbstractBaseFilter | undefined;
    filters: foundry.canvas.rendering.filters.AbstractBaseFilter[] | undefined;
    filterArea: any;
    visible: boolean | undefined;
    /** @inheritDoc */
    _tearDown(options: any): Promise<void>;
    /**
     * Update the display of the visibility group.
     * Organize sources into rendering queues and draw lighting containers for each source
     */
    refresh(): void;
    /**
     * Update vision (and fog if necessary)
     */
    refreshVisibility(): void;
    /**
     * Reset the exploration container with the fog sprite
     */
    resetExploration(): void;
    /**
     * Restrict the visibility of certain canvas assets (like Tokens or DoorControls) based on the visibility polygon
     * These assets should only be displayed if they are visible given the current player's field of view
     */
    restrictVisibility(): void;
    /**
     * Test whether a target point on the Canvas is visible based on the current vision and LOS polygons.
     * @param {Point|ElevatedPoint|Point[]|ElevatedPoint[]} points  The point or points in space to test
     * @param {object} [options]                Additional options which modify visibility testing.
     * @param {number} [options.tolerance=2]    A numeric radial offset which allows for a non-exact match.
     *                                          For example, if tolerance is 2 then the test will pass if the point
     *                                          is within 2px of a vision polygon.
     * @param {object|null} [options.object]    An optional reference to the object whose visibility is being tested
     * @returns {boolean}                       Whether the point is currently visible.
     */
    testVisibility(points: Point | ElevatedPoint | Point[] | ElevatedPoint[], options?: {
        tolerance?: number | undefined;
        object?: object | null | undefined;
    } | undefined): boolean;
    /**
     * Create the visibility test config.
     * @param {Point[]|ElevatedPoint[]} points  The points in space to test
     * @param {object} [options]                Additional options which modify visibility testing.
     * @param {number} [options.tolerance=2]    A numeric radial offset which allows for a non-exact match.
     *                                          For example, if tolerance is 2 then the test will pass if the point
     *                                          is within 2px of a vision polygon.
     * @param {object|null} [options.object]    An optional reference to the object whose visibility is being tested
     * @returns {CanvasVisibilityTestConfiguration}
     * @internal
     */
    _createVisibilityTestConfig(points: Point[] | ElevatedPoint[], { tolerance, object }?: {
        tolerance?: number | undefined;
        object?: object | null | undefined;
    } | undefined): CanvasVisibilityTestConfiguration;
    #private;
}
import type { CanvasVisionContainer } from "../layers/_types.mjs";
import type { PointVisionSource } from "../sources/_module.mjs";
import type { CanvasVisibilityTextureConfiguration } from "../../_types.mjs";
import type { Point } from "../../_types.mjs";
import type { ElevatedPoint } from "../../_types.mjs";
import type { CanvasVisibilityTestConfiguration } from "../../_types.mjs";
import VisionMode from "../perception/vision-mode.mjs";
import type { LightingVisibility } from "../perception/_types.mjs";
export {};
