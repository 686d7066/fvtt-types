/**
 * @import {CanvasViewPosition, DeepReadonly, ElevatedPoint} from "../_types.mjs";
 * @import {SceneDimensions, SceneViewOptions, RegionSurface, TokenData, TokenMovementInstruction, TokenMovementOptions,
 *   TokenMovementWaypoint, TokenResizingInstruction} from "./_types.mjs";
 * @import TokenDocument from "./token.mjs";
 * @import {BaseShapeData} from "../../common/data/_module.mjs";
 * @import {EdgeRestrictionType, WallRestrictionType} from "../../common/constants.mjs";
 * @import Region from "../canvas/placeables/region.mjs";
 * @import RegionDocument from "./region.mjs";
 * @import User from "./user.mjs";
 * @import {DatabaseCreateOperation, DatabaseUpdateOperation} from "../../common/abstract/_types.mjs";
 * @import {LevelTexture, SceneData} from "../../common/documents/_types.mjs";
 * @import Level from "./level.mjs";
 */
/**
 * The client-side Scene document which extends the common BaseScene model.
 * @extends BaseScene
 * @mixes ClientDocumentMixin
 * @category Documents
 *
 * @see {@link foundry.documents.collections.Scenes}: The world-level collection of Scene documents
 * @see {@link foundry.applications.sheets.SceneConfig}: The Scene configuration application
 */
export default class Scene extends BaseScene {
    /**
     * Prepare the grid instances from the grid config of this scene if it doesn't exist yet.
     * @param {Scene} scene
     */
    static "__#139@#prepareGrids"(scene: Scene): void;
    /** @inheritDoc */
    static _preCreateOperation(documents: any, operation: any, user: any): Promise<void>;
    /** @inheritDoc */
    static _onUpdateOperation(documents: any, operation: any, user: any): Promise<void>;
    /** @inheritDoc */
    static getCollectionName(name: any): string | null;
    /**
     * Track the viewed position of each scene (while in memory only, not persisted)
     * When switching back to a previously viewed scene, we can automatically pan to the previous position.
     * @type {CanvasViewPosition}
     * @internal
     */
    _viewPosition: CanvasViewPosition;
    /**
     * Track whether the scene is the active view and which level is viewed
     * @type {string|null}
     * @internal
     */
    _view: string | null;
    /**
     * The grid instance.
     * @type {BaseGrid}
     */
    grid: BaseGrid;
    /**
     * The gridless version of the grid instance.
     * @type {GridlessGrid}
     */
    gridlessGrid: GridlessGrid;
    /**
     * Determine the canvas dimensions this Scene would occupy, if rendered
     * @type {SceneDimensions}
     */
    dimensions: SceneDimensions;
    /**
     * Have the edges of this Scene been initialized already?
     *
     * The property becomes true we moment {@link Scene#initializeEdges} is called.
     * @type {boolean}
     */
    get initializedEdges(): boolean;
    /**
     * The levels that are available to this User. By default GMs and scenes without token vision can access all levels;
     * players can only access levels where they have OBSERVER of a Token.
     * A SceneManager may override this via {@link SceneManager#_getAvailableLevels}.
     * @type {Set<Level>}
     */
    get availableLevels(): Set<Level>;
    /**
     * @type {Set<Level>|null}
     * @protected
     */
    protected _availableLevels: Set<Level> | null;
    /**
     * Provide a thumbnail image path used to represent this document.
     * @type {string|null}
     */
    get thumbnail(): string | null;
    /**
     * A convenience accessor for whether the Scene is currently viewed
     * @type {boolean}
     */
    get isView(): boolean;
    /** @inheritDoc */
    _configure(options?: {}): void;
    /** @inheritDoc */
    _updateCommit(copy: any, diff: any, options: any, state: any): void;
    /**
     * Pull the specified users to this Scene.
     * @param {Iterable<User|string>} users     The User documents or IDs.
     * @param {SceneViewOptions} [viewOptions]  The view options.
     * @example Pull all users to the viewed scene.
     * ```js
     * canvas.scene.pullUsers(game.users);
     * ```
     */
    pullUsers(users: Iterable<User | string>, viewOptions?: SceneViewOptions | undefined): void;
    /**
     * Set this Scene as currently active.
     * @param {object} [options]  Additional options
     * @param {SceneViewOptions} [options.viewOptions]  The view options
     * @param {boolean} [options.pullUsers]  Pull all Users to this Scene if it is already active?
     * @param {Partial<Omit<SceneData, "active">>} [options.updateData]                   Additional update data
     * @param {Partial<Omit<DatabaseUpdateOperation, "updates">>} [options.updateOptions] The update operation options
     * @returns {Promise<this>}  A Promise which resolves to this Scene once it has been successfully activated
     */
    activate({ viewOptions, pullUsers, updateData, updateOptions }?: {
        viewOptions?: SceneViewOptions | undefined;
        pullUsers?: boolean | undefined;
        updateData?: Partial<Omit<SceneData, "active">> | undefined;
        updateOptions?: Partial<Omit<DatabaseUpdateOperation, "updates">> | undefined;
    } | undefined): Promise<this>;
    /**
     * Set this scene as the current view
     * @param {SceneViewOptions} [options]   The view options
     * @returns {Promise<Scene>}
     */
    view(options?: SceneViewOptions | undefined): Promise<Scene>;
    /**
     * Unview this Scene, if it is the viewed Scene, clearing the game canvas.
     */
    unview(): Promise<this | undefined>;
    /** @override */
    override clone(createData?: {}, options?: {}): foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext> | Promise<foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext>>;
    /** @inheritDoc */
    prepareBaseData(): void;
    playlistSound: any;
    /** @inheritDoc */
    prepareEmbeddedDocuments(): void;
    /** @inheritDoc */
    prepareDerivedData(): void;
    /**
     * The levels that are available to this User. By default GMs and scenes without token vision can access all levels;
     * players can only access levels where they have OBSERVER of a Token.
     * @param {object} [options]
     * @param {SceneManager|null} [options.manager]    A SceneManager whose {@link SceneManager#_getAvailableLevels}
     *                                                 override should be applied to the base set.
     * @returns {Set<Level>}
     * @protected
     */
    protected _getAvailableLevels({ manager }?: {
        manager?: SceneManager | null;
    } | undefined): Set<Level>;
    /**
     * Get the Canvas dimensions which would be used to display this Scene.
     * Apply padding to enlarge the playable space and round to the nearest 2x grid size to ensure symmetry.
     * The rounding accomplishes that the padding buffer around the map always contains whole grid spaces.
     * @returns {SceneDimensions}
     */
    getDimensions(): SceneDimensions;
    /** @inheritDoc */
    _onClickDocumentLink(event: any): any;
    /**
     * Clear the movement history of all Tokens within this Scene.
     * @returns {Promise<void>}
     */
    clearMovementHistories(): Promise<void>;
    /**
     * For the given Tokens in this Scene identify the Regions that each Token is contained in and update the regions of
     * each Token accordingly.
     *
     * This function doesn't need to be called by the systems/modules unless
     * {@link foundry.documents.TokenDocument#testInsideRegion} is overridden and non-Token properties other than
     * `Scene#grid.type` and `Scene#grid.size` change that are used in the override of
     * {@link foundry.documents.TokenDocument#testInsideRegion}.
     * @param {Iterable<TokenDocument>} [tokens]  The Tokens whoses regions should be updates: if not provided, all Tokens
     *                                            will be updated.
     * @returns {Promise<TokenDocument[]>}        The array of Tokens whose regions changed
     */
    updateTokenRegions(tokens?: Iterable<TokenDocument> | undefined): Promise<TokenDocument[]>;
    /**
     * Update the shape constraints of all Regions the current User is designated for
     * (for the given restriction types).
     * @param {Iterable<EdgeRestrictionType>} [types]    The types to update. Default: all.
     */
    updateRegionShapeConstraints(types?: Iterable<"darkness" | "light" | "sight" | "sound" | "move"> | undefined): void;
    /**
     * Update the shape constraints of the given Regions if the current User is designated for it.
     * @param {Region} region
     * @internal
     */
    _updateRegionShapeConstraints(region: Region): void;
    /**
     * Move/resize multiple Tokens.
     * @param {{[id: string]: TokenMovementInstruction|TokenResizingInstruction}} instructions
     *   The movement/resizing instructions.
     * @param {Partial<Omit<DatabaseUpdateOperation, "updates"> & Omit<TokenMovementOptions, "id">} [options]
     *   Parameters of the update and movement operation.
     * @returns {Promise<{[id: string]: boolean}>} A Promise that resolves once all movement instructions are finished.
     *   The resolved value is an object with token IDs as keys and booleans as values that indicate whether the movement
     *   the token with the corresponding ID was completed (`true`) or stopped/prevented (`false`).
     * @see {@link foundry.documents.TokenDocument#move}
     * @see {@link foundry.documents.TokenDocument#resize}
     * @example
     * ```js
     * const results = await scene.moveTokens({
     *    // Moving the token to new position including additional token data
     *   "cGYT0rR0YbtFkhzT": {
     *     destination: {x: 100, y: 200, rotation: 45, texture: {tint: "#ff0000"}},
     *     showRuler: false, // This overrides `options.showRuler`
     *   },
     *   // Moving the token to along a path with multiple waypoints
     *   "wBFpJuZuleEtVNw1": {
     *     waypoints: [
     *       {x: 100, y: 200}, // Move to the position (100, 200)
     *       {elevation: 5, explicit: true}, // Move to elevation 5 indicating that the user placed this waypoint
     *       {x: 500, y: 500, checkpoint: true}, // Move to (500, 500): the movement can be stopped/paused here
     *       {width: 2, height: 2, depth: 2}, // Change size
     *       {x: 1000, action: "swim"}, // Swim to (1000, 500)
     *       {x: 0, y: 0, snapped: true}, // Move to (0, 0) indicating that (0, 0) is a snapped position for the token
     *       {elevation: 10} // Move to elevation 10 (the last waypoint is always a checkpoint automatically)
     *     ],
     *     autoRotate: true,
     *     constrainOptions: {ignoreWalls: true, ignoreCost: true} // Allow the token to move through walls, surfaces, and
     *                                                             // impassable terrain
     *   },
     *   // Resizing the token including additional token data
     *   "VupAIbzpX6SHqtaH": {
     *     dimensions: {width: 3, height: 3, depth: 3, rotation: 45, texture: {tint: "#ff0000"}}
     *   }
     * }, {
     *   showRuler: true // This applies to all instructions that do not define `showRuler`
     * })
     * if ( results["cGYT0rR0YbtFkhzT"] ) {
     *   // The movement of Token [cGYT0rR0YbtFkhzT] was completed: it arrived at the destination
     * } else {
     *   // The movement of Token [cGYT0rR0YbtFkhzT] was stopped or prevented
     * }
     * if ( results["wBFpJuZuleEtVNw1"] ) {
     *   // The movement of Token [wBFpJuZuleEtVNw1] was completed: it arrived at the destination
     * } else {
     *   // The movement of Token [wBFpJuZuleEtVNw1] was stopped or prevented
     * }
     * if ( results["VupAIbzpX6SHqtaH"] ) {
     *   // The resizing of Token [VupAIbzpX6SHqtaH] was completed
     * } else {
     *   // The resizing of Token [VupAIbzpX6SHqtaH] was prevented
     * }
     * ```
     */
    moveTokens(instructions: {
        [id: string]: TokenMovementInstruction | TokenResizingInstruction;
    }, options?: Partial<Omit<DatabaseUpdateOperation, "updates"> & Omit<TokenMovementOptions, "id">> | undefined): Promise<{
        [id: string]: boolean;
    }>;
    /**
     * Invalidate cached surface data.
     * @internal
     */
    _invalidateSurfaces(): void;
    /**
     * Get all surfaces or surfaces matching the filter, ordered by elevation in ascending order.
     * @param {object} [options]                    Additional options
     * @param {EdgeRestrictionType} [options.type]  Only return surfaces that restrict this type
     * @param {Level|string} [options.level]        Only return surfaces that are included in this Level
     * @param {boolean} [options.occlusion]   Only return surfaces that have this value as {@link RegionSurface#occlusion}
     * @param {boolean} [options.exposure]    Only return surfaces that have this value as {@link RegionSurface#exposure}
     * @param {boolean} [options.culling]     Only return surfaces that have this value as {@link RegionSurface#culling}
     * @returns {DeepReadonly<RegionSurface[]>}
     */
    getSurfaces({ type, level, occlusion, exposure, culling }?: {
        type?: "darkness" | "light" | "sight" | "sound" | "move" | undefined;
        level?: string | Level | undefined;
        occlusion?: boolean | undefined;
        exposure?: boolean | undefined;
        culling?: boolean | undefined;
    } | undefined): DeepReadonly<RegionSurface[]>;
    /**
     * Test for surface collision for a movement between two points.
     * @param {ElevatedPoint} origin                 The origin.
     * @param {ElevatedPoint} destination            The destination.
     * @param {object} config                        Configuration.
     * @param {EdgeRestrictionType} [config.type]    The restriction type. Default: `"move"`.
     * @param {"any"|"all"|"closest"} [config.mode]  The collision mode. Default: `"any"`.
     * @param {"below"|"above"} [config.side]        The side of the surface that counts as colliding
     *                                               when the ray originates on the surface. Default: `"below"`.
     *                                               - `"below"`: Treats the surface as solid in the negative z-direction.
     *                                                 Rays originating on the surface will collide if they point downward
     *                                                 (z < 0) and will not collide if they point upward.
     *                                               - `"above"`: Treats the surface as solid in the positive z-direction.
     *                                                 Rays originating on the surface will collide if they point upward
     *                                                 (z > 0) and will not collide if they point downward.
     * @param {number} [config.tMin]                 Intersections of the ray and a surface with t-value less than
     *                                               `tMin` are not considered collisions. Default: `0`.
     * @param {number} [config.tMax]                 Intersections of the ray and a surface with t-value greater than
     *                                               `tMax` are not considered collisions. Default: `1`.
     * @param {Level|string} config.level            The Level or Level ID to test collision in.
     * @returns {boolean|ElevatedPoint|ElevatedPoint[]|null}  The collision result depends on the mode of the test:
     *                                                 - `"any"`: Returns a boolean for whether any collision occurred.
     *                                                 - `"all"`: Returns a sorted array of `ElevatedPoint` instances.
     *                                                 - `"closest"`: Returns an `ElevatedPoint` instance or null.
     */
    testSurfaceCollision(origin: ElevatedPoint, destination: ElevatedPoint, { type, mode, side, tMin, tMax, level }: {
        type?: "darkness" | "light" | "sight" | "sound" | "move" | undefined;
        mode?: "any" | "closest" | "all" | undefined;
        side?: "below" | "above" | undefined;
        tMin?: number | undefined;
        tMax?: number | undefined;
        level: Level | string;
    }): boolean | ElevatedPoint | ElevatedPoint[] | null;
    /**
     * Cycle the currently viewed Level for this Scene.
     * @param {-1|1} direction
     * @returns {Promise<void>}
     */
    cycleLevel(direction: -1 | 1): Promise<void>;
    /**
     * Get textures that should be used for the currently active level.
     * @returns {(LevelTexture & {level: Level; name: string; elevation: number; sort: number; zIndex: number;
     *   isBackground: boolean; isUpper: boolean})[]}
     * @internal
     */
    _configureLevelTextures(): (LevelTexture & {
        level: Level;
        name: string;
        elevation: number;
        sort: number;
        zIndex: number;
        isBackground: boolean;
        isUpper: boolean;
    })[];
    /**
     * Reset the edges of this Scene.
     * @internal
     */
    _resetEdges(): void;
    /**
     * Initialize the edges of this Scene unless they already have been inititalized.
     */
    initializeEdges(): void;
    /** @inheritDoc */
    _preCreate(data: any, options: any, user: any): Promise<false | undefined>;
    /** @inheritDoc */
    _onCreate(data: any, options: any, userId: any): void;
    /** @inheritDoc */
    _preUpdate(changed: any, options: any, user: any): Promise<false | Readonly<{
        id: number;
        type: string;
        timestamp: number;
        message: string;
        error?: Error | undefined;
        permanent: boolean;
        console: boolean;
        active: boolean;
        progress: boolean;
        pct: number;
        element?: HTMLLIElement | undefined;
        remove?: (() => void) | undefined;
        update?: ((pct: number) => void) | undefined;
    }> | undefined>;
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): Promise<any> | undefined;
    thumb: any;
    /** @inheritDoc */
    _onDelete(options: any, userId: any): void;
    /**
     * Handle Scene activation workflow if the active state is changed to true.
     * @param {boolean} active                                             Is the scene now active?
     * @param {DatabaseCreateOperation|DatabaseUpdateOperation} operation  The database operation
     * @protected
     */
    protected _onActivate(active: boolean, operation: DatabaseCreateOperation | DatabaseUpdateOperation): void;
    /** @inheritDoc */
    _preCreateDescendantDocuments(parent: any, collection: any, data: any, options: any, userId: any): void;
    /** @inheritDoc */
    _preUpdateDescendantDocuments(parent: any, collection: any, changes: any, options: any, userId: any): void;
    /** @inheritDoc */
    _preDeleteDescendantDocuments(parent: any, collection: any, ids: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onCreateDescendantDocuments(parent: any, collection: any, documents: any, changes: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onUpdateDescendantDocuments(parent: any, collection: any, documents: any, changes: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onDeleteDescendantDocuments(parent: any, collection: any, documents: any, ids: any, options: any, userId: any): void;
    /** @inheritDoc */
    toCompendium(pack: any, options?: {}): any;
    /**
     * Create a 300px by 100px thumbnail image for this scene background
     * @param {object} [options]              Options which modify thumbnail creation
     * @param {string|Level} [options.level]  The Level to generated the thumbnail for. Defaults to the initial level.
     * @param {number} [options.width=300]    The desired thumbnail width. Default is 300px
     * @param {number} [options.height=100]   The desired thumbnail height. Default is 100px;
     * @param {string} [options.format="image/webp"]  Which image format should be used? image/png, image/jpeg,
     *                                                or image/webp. Default is image/webp.
     * @param {number} [options.quality=0.8]  What compression quality should be used for jpeg or webp, between 0 and 1.
     *                                        Default is 0.8.
     * @returns {Promise<{thumb: string; width: number; height: number; format: string; quality: number}>}
     *   The created thumbnail data.
     */
    createThumbnail(options?: {
        level?: string | Level | undefined;
        width?: number | undefined;
        height?: number | undefined;
        format?: string | undefined;
        quality?: number | undefined;
    } | undefined): Promise<{
        thumb: string;
        width: number;
        height: number;
        format: string;
        quality: number;
    }>;
    /** @inheritDoc */
    getEmbeddedCollection(embeddedName: any): any;
    /**
     * @deprecated since v14
     * @ignore
     */
    get templates(): foundry.abstract.EmbeddedCollection<foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext>>;
    /**
     * @deprecated since v14
     * @ignore
     */
    get background(): {
        offsetX: any;
        offsetY: any;
    };
    /**
     * @deprecated since v14
     * @ignore
     */
    get backgroundColor(): any;
    /**
     * @deprecated since v14
     * @ignore
     */
    get foreground(): any;
    /**
     * @deprecated since v14
     * @ignore
     */
    get foregroundElevation(): any;
    #private;
}
import BaseScene from "../../common/documents/scene.mjs";
import type { CanvasViewPosition } from "../_types.mjs";
import BaseGrid from "../../common/grid/base.mjs";
import GridlessGrid from "../../common/grid/gridless.mjs";
import type { SceneDimensions } from "./_types.mjs";
import type Level from "./level.mjs";
import type User from "./user.mjs";
import type { SceneViewOptions } from "./_types.mjs";
import type { SceneData } from "../../common/documents/_types.mjs";
import type { DatabaseUpdateOperation } from "../../common/abstract/_types.mjs";
import type TokenDocument from "./token.mjs";
import type Region from "../canvas/placeables/region.mjs";
import type { TokenMovementInstruction } from "./_types.mjs";
import type { TokenResizingInstruction } from "./_types.mjs";
import type { TokenMovementOptions } from "./_types.mjs";
import type { RegionSurface } from "./_types.mjs";
import type { DeepReadonly } from "../_types.mjs";
import type { ElevatedPoint } from "../_types.mjs";
import type { LevelTexture } from "../../common/documents/_types.mjs";
import type { DatabaseCreateOperation } from "../../common/abstract/_types.mjs";
