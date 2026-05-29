/**
 * @import {CanvasTearDownOptions} from "../_types.mjs";
 */
/**
 * A framework for imbuing special scripted behaviors into a single specific Scene.
 * Managed scenes are registered in CONFIG.Canvas.managedScenes.
 *
 * The SceneManager instance is called at various points in the Scene rendering life-cycle.
 *
 * This also provides a framework for registering additional hook events which are required only for the life-cycle of
 * the managed Scene.
 *
 * @example Registering a custom SceneManager
 * ```js
 * // Define a custom SceneManager subclass
 * class MyCustomSceneManager extends SceneManager {
 *   async _onInit() {
 *     console.log(`Initializing managed Scene "${this.scene.name}"`);
 *   }
 *
 *   _getAvailableLevels(defaultLevels) {
 *     // Return a custom subset of levels for this Scene
 *     return new Set([this.scene.levels.get(someLevelId)]);
 *   }
 *
 *   async _onDraw() {
 *     console.log(`Drawing managed Scene "${this.scene.name}"`);
 *   }
 *
 *   async _onReady() {
 *     console.log(`Readying managed Scene "${this.scene.name}"`);
 *   }
 *
 *   async _onTearDown({nextScene}) {
 *     console.log(`Deconstructing "${this.scene.name}", next up: ${nextScene?.name ?? "blank canvas"}`);
 *   }
 *
 *   _registerHooks() {
 *     this.registerHook("updateToken", this.#onUpdateToken.bind(this));
 *   }
 *
 *   #onUpdateToken(document, updateData, options, userId) {
 *     console.log("Updating a token within the managed Scene");
 *   }
 * }
 *
 * // Register MyCustomSceneManager to be used for a specific Scene
 * CONFIG.Canvas.sceneManagers = {
 *   [sceneId]: MyCustomSceneManager
 * }
 * ```
 */
export default class SceneManager {
    /**
     * The SceneManager is constructed by passing a reference to the active Scene document.
     * @param {Scene} scene
     */
    constructor(scene: Scene);
    /**
     * The managed Scene.
     * @type {Scene}
     */
    get scene(): Scene;
    /**
     * Configure which level of the Scene should be initially viewed for a managed Scene.
     * This initial level could be user-specific.
     * @returns {string|void}
     * @protected
     */
    protected _determineInitialLevel(): string | void;
    /**
     * Configure which levels of the Scene are available to the current user.
     * @param {Set<Level>} defaultLevels  The levels that are available to the current user by default.
     * @returns {Set<Level>|void}         Return a Set of Level documents to override the default token-ownership logic,
     *                                    or return nothing to fall back to the default behavior.
     * @protected
     */
    protected _getAvailableLevels(defaultLevels: Set<Level>): Set<Level> | void;
    /**
     * Additional behaviors to perform when the Canvas is first initialized for the Scene.
     * @returns {Promise<void>}
     * @protected
     */
    protected _onInit(): Promise<void>;
    /**
     * Additional behaviors to perform after core groups and layers are drawn to the canvas.
     * @returns {Promise<void>}
     * @protected
     */
    protected _onDraw(): Promise<void>;
    /**
     * Additional behaviors to perform after the Canvas is fully initialized for the Scene.
     * @returns {Promise<void>}
     * @protected
     */
    protected _onReady(): Promise<void>;
    /**
     * Additional behaviors to perform when the Scene is deactivated.
     * @param {CanvasTearDownOptions} options  Options which configure how the canvas is deconstructed.
     * @returns {Promise<void>}
     * @protected
     */
    protected _onTearDown(options: CanvasTearDownOptions): Promise<void>;
    /**
     * Register additional hook functions are only used while this Scene is active and is automatically deactivated.
     * Hooks should be registered in this function by calling this._registerHook(hookName, handler)
     * @protected
     */
    protected _registerHooks(): void;
    /**
     * Register additional hook functions are only used while this Scene is active and is automatically deactivated.
     * @param {string} hookName
     * @param {Function} handler
     */
    registerHook(hookName: string, handler: Function): void;
    /**
     * Deactivate Hook functions that were added specifically for this Scene.
     * @protected
     */
    protected _deactivateHooks(): void;
    #private;
}
import type { CanvasTearDownOptions } from "../_types.mjs";
