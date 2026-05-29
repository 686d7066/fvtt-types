declare const FogManager_base: {
    new (): {
        "__#232@#events": Record<string, Map<foundry.utils.types.EmittedEventListener, {
            fn: foundry.utils.types.EmittedEventListener;
            once: boolean;
        }>>;
        addEventListener(type: string, listener: foundry.utils.types.EmittedEventListener, { once }?: {
            once?: boolean | undefined;
        } | undefined): void;
        removeEventListener(type: string, listener: foundry.utils.types.EmittedEventListener): void;
        dispatchEvent(event: Event): boolean;
    };
    emittedEvents: string[];
};
/**
 * @import Semaphore from "../../../common/utils/semaphore.mjs";
 * @import {CanvasVisibilityTextureConfiguration, FogExplorationData, Point} from "../../_types.mjs";
 * @import FogExploration from "../../documents/fog-exploration.mjs";
 */
/**
 * A fog of war management class which is the singleton canvas.fog instance.
 * @category Canvas
 * @see {EventEmitterMixin}
 */
export default class FogManager extends FogManager_base {
    /** @override */
    static override emittedEvents: readonly ["explored"];
    /**
     * The FogExploration document which applies to this canvas view
     * @type {FogExploration|null}
     */
    exploration: FogExploration | null;
    /**
     * Track whether we have pending fog updates which have not yet been saved to the database
     * @type {boolean}
     * @internal
     */
    _updated: boolean;
    /**
     * Texture extractor
     * @type {TextureExtractor}
     */
    get extractor(): TextureExtractor;
    /**
     * The exploration SpriteMesh which holds the fog exploration texture.
     * @type {SpriteMesh}
     */
    get sprite(): SpriteMesh;
    /**
     * The configured options used for the saved fog-of-war texture.
     * @type {CanvasVisibilityTextureConfiguration}
     */
    get textureConfiguration(): CanvasVisibilityTextureConfiguration;
    /**
     * Does the currently viewed Scene support Token field of vision?
     * @type {boolean}
     */
    get tokenVision(): boolean;
    /**
     * Does the currently viewed Scene support fog of war exploration?
     * @type {boolean}
     */
    get fogExploration(): boolean;
    /**
     * Does the currently viewed Scene is in shared fog exploration?
     * @type {boolean}
     */
    get sharedExploration(): boolean;
    /**
     * Is this position explored?
     * @param {Point} position      The position to be tested
     * @returns {boolean}           Is this position explored?
     */
    isPointExplored({ x, y }: Point): boolean;
    /**
     * Create a valid FogExploration document for the current canvas context.
     * @param {Partial<FogExplorationData>} [data={}]
     * @returns {FogExploration}
     * @protected
     */
    protected _createExplorationDocument(data?: any): FogExploration;
    /**
     * Create the exploration display object with or without a provided texture.
     * @param {PIXI.Texture|PIXI.RenderTexture} [tex] Optional exploration texture.
     * @returns {SpriteMesh}
     * @internal
     */
    _createExplorationObject(tex?: PIXI.Texture | PIXI.RenderTexture): SpriteMesh;
    /**
     * Initialize fog of war - resetting it when switching scenes or re-drawing the canvas
     * @returns {Promise<void>}
     */
    initialize(): Promise<void>;
    /**
     * Clear the fog and reinitialize properties (commit and save in non reset mode)
     * @returns {Promise<void>}
     */
    clear(): Promise<void>;
    /**
     * Destroy this FogManager.
     */
    destroy(): void;
    /**
     * Once a new Fog of War location is explored, composite the explored container with the current staging sprite.
     * Once the number of refresh is > to the commit threshold, save the fog texture to the database.
     */
    commit(): void;
    /**
     * Load existing fog of war data from local storage and populate the initial exploration sprite.
     * @param {object} [options]
     * @param {boolean} [options.preserve=false]  Preserve current fog until the new one is ready.
     * @returns {Promise<PIXI.Texture|void>}
     */
    load({ preserve }?: {
        preserve?: boolean | undefined;
    } | undefined): Promise<PIXI.Texture | void>;
    /**
     * Unionize exploration inputs for initial scene load.
     * Override this method to change union rules or to return additional exploration data (ex: positions).
     * This method must not perform any persistent DB operations.
     * @param {FogExploration[]} fogs
     * @returns {Promise<{texture: PIXI.RenderTexture, updateData: object|null}>}
     * @protected
     */
    protected _unionizeSharedExploration(fogs: FogExploration[]): Promise<{
        texture: PIXI.RenderTexture;
        updateData: object | null;
    }>;
    /**
     * Apply shared exploration received from another client.
     * Subclasses may override this method to customize how explored texture and positions are merged locally.
     * @param {string} explored
     * @param {object} [positions]
     * @returns {Promise<object>}
     * @protected
     */
    protected _applySharedExploration(explored: string, positions?: object | undefined): Promise<object>;
    /**
     * Create a render texture for the exploration sprite if needed.
     * @returns {Promise<PIXI.RenderTexture>}
     * @protected
     */
    protected _createExplorationRenderTexture(): Promise<PIXI.RenderTexture>;
    /**
     * Dispatch a request to reset the fog of war exploration status for all users within this Scene.
     * Once the server has deleted existing FogExploration documents, the _onReset handler will re-draw the canvas.
     * @returns {Promise<void>}
     */
    reset(): Promise<void>;
    /**
     * Request a fog of war save operation.
     * Note: if a save operation is pending, we're waiting for its conclusion.
     * @param {object} [options]
     * @param {boolean} [options.share=false]  Broadcast the fog to other clients for local unionization.
     * @returns {Promise<void>}
     */
    save({ share }?: {
        share?: boolean | undefined;
    } | undefined): Promise<void>;
    /**
     * Synchronize one user's version of the Fog of War for this scene to other users.
     * Note: This API is experimental and may be removed in later versions *without deprecation*. It is intended for
     * one-time corrections of users' fog explorations, and should not be used for real-time synchronization of fog
     * exploration.
     * @param {User} from        The user whose Fog of War to use as the source of truth.
     * @param {User[]} [to]      A list of users that should have their Fog of War synced. If none are specified then all
     *                           users will be synced.
     * @returns {Promise<void>}  A promise that resolves when synchronization has been completed.
     */
    sync(from: User, to?: User[] | undefined): Promise<void>;
    /**
     * The configured options used for fog base64 extraction.
     * @returns {{type: string, quality: number}}
     * @protected
     */
    protected _getBase64ExtractionConfiguration(): {
        type: string;
        quality: number;
    };
    /**
     * Extract fog data as a base64 string
     * @returns {Promise<string>}
     * @protected
     */
    protected _extractBase64(): Promise<string>;
    /**
     * Prepare the data that will be used to update the FogExploration document.
     * @param {string} base64Image              The extracted base64 image data
     * @returns {Partial<FogExplorationData>}   Exploration data to update
     * @protected
     */
    protected _prepareFogUpdateData(base64Image: string): Partial<FogExplorationData>;
    /**
     * If fog of war data is reset from the server, deactivate the current fog and initialize the exploration.
     * @returns {Promise<void>}
     * @internal
     */
    _handleReset(): Promise<void>;
    #private;
}
import type FogExploration from "../../documents/fog-exploration.mjs";
import TextureExtractor from "../texture-extractor.mjs";
import SpriteMesh from "../containers/elements/sprite-mesh.mjs";
import type { CanvasVisibilityTextureConfiguration } from "../../_types.mjs";
import type { Point } from "../../_types.mjs";
export {};
