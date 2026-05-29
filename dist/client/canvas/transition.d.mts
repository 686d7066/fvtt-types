/**
 * Persistent overlay dedicated to scene transitions.
 */
export default class TransitionContainer extends UnboundContainer {
    /**
     * CanvasAnimation symbol used for scene transition animations.
     * @type {symbol}
     */
    static "__#147@#ANIMATION_SYMBOL": symbol;
    /**
     * Snapshot the current framebuffer into a render texture.
     * The overlay container hides itself during capture so it is not included.
     * @param {number[]} [clearColor=[0,0,0,0]] RGBA clear color in the 0-1 range.
     * @returns {PIXI.RenderTexture} The newly created render texture.
     */
    static "__#147@#capture"(clearColor?: number[] | undefined): PIXI.RenderTexture;
    constructor();
    visible: boolean;
    zIndex: number;
    eventMode: string;
    /**
     * Desired transition type to use for transitions when no explicit type is provided.
     * @type {string}
     */
    defaultTransitionType: string;
    /**
     * Default transition duration used by {@link TransitionContainer#_play}
     * when no explicit duration is provided (milliseconds).
     * @type {number}
     */
    defaultDuration: number;
    /**
     * Flag indicating whether this container is reserved for an external workflow.
     * When true, core scene transitions should not use this container.
     * @type {boolean}
     */
    isLocked: boolean;
    /**
     * Flag indicating whether a transition animation is currently running.
     * Prevents overlapping calls to {@link TransitionContainer#_play}.
     * @type {boolean}
     */
    get isRunning(): boolean;
    /**
     * Promise that resolves when the current transition finishes or is cancelled.
     * Reused to return the same promise on repeated {@link TransitionContainer#_play} calls.
     * @type {Promise<void>|null}
     */
    get promise(): Promise<void> | null;
    /**
     * Run a full transition around a given canvas operation.
     * Encapsulates captureCurrentScene => operation/scene switch => captureNextScene => play.
     *
     * If both {@link options.operation} and {@link options.nextScene} are provided, the operation runs first,
     * then the Scene is switched.
     *
     * If neither {@link options.operation} nor {@link options.nextScene} are provided, a simple demo transition
     * is performed from a black frame to the currently rendered Scene.
     *
     * @example Transition around a camera pan
     * ```js
     * await canvas.transition.run({
     *   operation: async () => {
     *     await canvas.animatePan({
     *       x: 2000,
     *       y: 1500,
     *       scale: 1.25,
     *       duration: 0
     *     });
     *   },
     *   duration: 800,
     *   transitionType: "dots"
     * });
     * ```
     *
     * @example Switch to another Scene with a transition
     * ```js
     * const scene = game.scenes.get("ABC123");
     * await canvas.transition.run({
     *   nextScene: scene,
     *   activate: true,
     *   duration: 1200,
     *   transitionType: "fade"
     * });
     * ```
     *
     * @example Demo the current Scene from black
     * ```js
     * await canvas.transition.run({
     *   fromBlack: true,
     *   duration: 800,
     *   transitionType: "swirl"
     * });
     * ```
     * @param {Function} [operation]              Async function performing canvas changes.
     * @param {Scene}    [nextScene]              Scene document to view or activate as the "next" scene.
     * @param {boolean}  [activate=false]         When true, call {@link Scene#activate} instead of {@link Scene#view}.
     * @param {number[]} [clearColor=[0,0,0,1]]   RGBA clear color in the 0-1 range.
     * @param {boolean}  [fromBlack=false]        When true, starts from a black frame instead of capturing.
     * @param {number}   [duration]               Duration in milliseconds. Defaults to {@link defaultDuration}.
     * @param {string}   [transitionType]         Transition type id to use for this run.
     * @param {Function} [easing=t=>t]            Easing function mapping [0,1] to [0,1].
     * @returns {Promise<void>} Promise that resolves when the transition completes.
     */
    run({ operation, nextScene, activate, clearColor, fromBlack, duration, transitionType, easing }?: Function | undefined): Promise<void>;
    /**
     * Cancel any currently running transition and await its termination.
     * @returns {Promise<void>}
     */
    cancel(): Promise<void>;
    /**
     * Capture the currently displayed scene into a render texture and show it.
     * If `black` is true, uses a solid black frame instead of capturing the scene.
     * @param {object}   [options]                       Capture options.
     * @param {number[]} [options.clearColor=[0,0,0,1]]  RGBA clear color in the 0-1 range.
     * @param {boolean}  [options.black=false]           When true, uses a black frame instead of capturing.
     * @returns {PIXI.RenderTexture|null} The render texture of the current scene, or null if black.
     * @internal
     */
    _captureCurrentScene({ clearColor, black }?: {
        clearColor?: number[] | undefined;
        black?: boolean | undefined;
    } | undefined): PIXI.RenderTexture | null;
    /**
     * Capture the next rendered frame of the new scene into a render texture.
     * Internally waits for the next `postrender` so all canvas groups and caches are fully updated before capturing.
     * The filter class and filter type are resolved from {@link CONFIG.Canvas.sceneTransitions}.
     *
     * @param {object}   [options]                       Capture options.
     * @param {number[]} [options.clearColor=[0,0,0,1]]  RGBA clear color in the 0-1 range.
     * @param {string}   [options.transitionType]        Transition type id to use for this capture.
     *                                                   Defaults to {@link TransitionContainer#defaultTransitionType}.
     * @returns {Promise<PIXI.RenderTexture>}            Promise resolving to the captured render texture.
     * @internal
     */
    _captureNextScene({ clearColor, transitionType }?: {
        clearColor?: number[] | undefined;
        transitionType?: string | undefined;
    } | undefined): Promise<PIXI.RenderTexture>;
    /**
     * Run the transition animation from the captured "from" texture to the "to" texture.
     * If a transition is already running, returns the existing promise.
     * If no filter has been prepared, resolves immediately.
     * @param {object}   [opts]                               Animation options.
     * @param {number}   [opts.duration=this.defaultDuration] Duration in milliseconds.
     * @param {Function} [opts.easing=t=>t]                   Easing function mapping [0,1] to [0,1].
     * @returns {Promise<void>} Promise that resolves when the transition completes.
     */
    _play({ duration, easing }?: {
        duration?: number | undefined;
        easing?: Function | undefined;
    } | undefined): Promise<void>;
    /**
     * Reset the internal state of the transition container.
     */
    _reset(): void;
    #private;
}
import UnboundContainer from "./containers/advanced/unbound-container.mjs";
