/**
 * A lightweight screen/object shake utility.
 *
 * CanvasShakeEffect applies a smooth, time-based positional jitter to a target {@link PIXI.DisplayObject}
 * by offsetting its `x` and `y` coordinates relative to a captured reference point. The shake motion is produced using
 * two independent {@link foundry.canvas.animation.SmoothNoise} generators (one per axis) to avoid harsh,
 * frame-to-frame randomness and provide a more natural camera-like shake.
 *
 * The effect runs for {@link CanvasShakeEffect#duration} milliseconds, with a linearly decaying amplitude from
 * {@link CanvasShakeEffect#maxDisplacement} down to zero. After the active shake window ends, the target smoothly returns
 * to its reference point using {@link CanvasShakeEffect#returnSpeed} as a per-tick interpolation factor.
 *
 * If multiple shake instances target the same object, the newest shake replaces the currently active one using a
 * smooth transition, and the target returns to its original pre-shake position once shaking completes.
 * Important: Changes of `x` and `y` from external sources outside of CanvasShakeEffect are taken into account.
 *
 * Safety/termination conditions:
 * - If the target object is destroyed, the effect stops immediately.
 * - If {@link Canvas#photosensitiveMode} is enabled, the effect stops immediately.
 * - If {@link CanvasShakeEffect#maxDisplacement} or {@link CanvasShakeEffect#duration} are zero,
 *   the effect stops immediately.
 *
 * @example
 * // Shake a target for 6 seconds with a 20px peak amplitude
 * const shake = new foundry.canvas.animation.CanvasShakeEffect({
 *   target: canvas.stage,
 *   duration: 6000,
 *   maxDisplacement: 20,
 *   smoothness: 0.6,
 *   returnSpeed: 0.15,
 *   invalidateMasks: true
 * });
 * await shake.play();
 *
 * @example
 * // Use a custom ticker and a deterministic time offset
 * const shake = new foundry.canvas.animation.CanvasShakeEffect({
 *   target: someContainer,
 *   seed: 12345,
 *   ticker: myTicker
 * });
 * shake.play();
 */
export default class CanvasShakeEffect {
    /**
     * Duration in ms of the smooth takeover transition when a new shake replaces an active shake.
     * @type {number}
     */
    static TAKEOVER_DURATION_MS: number;
    /**
     * The unique shake state symbol. Stored as a non-enumerable property on the target.
     * @type {symbol}
     */
    static "__#369@#SHAKE_STATE": symbol;
    /**
     * Get or create the shared shake state for a target.
     * @param {PIXI.DisplayObject} target
     * @returns {object}
     */
    static "__#369@#getShakeState"(target: PIXI.DisplayObject): object;
    /**
     * Clear the shared shake state from a target if no shake remains active.
     * @param {PIXI.DisplayObject} target
     * @param {object} state
     */
    static "__#369@#clearShakeState"(target: PIXI.DisplayObject, state: object): void;
    /**
     * Create a new CanvasShakeEffect
     * @param {object} options
     * @param {PIXI.DisplayObject} [options.target=null] The target PIXI display object to shake. Defaults to canvas.stage
     * @param {number} [options.duration=5000]           Total shake duration in MS.
     * @param {number} [options.maxDisplacement=35]      Maximum displacement in pixels.
     * @param {number} [options.smoothness=0.5]          Smoothness in the range [0, 1]. Higher is smoother.
     * @param {number} [options.returnSpeed=0.1]         "Return to origin" lerp factor per tick in the range [0, 1].
     * @param {boolean} [options.invalidateMasks=false]  Should hidden canvas group masks be invalidated each frame?
     * @param {number|null} [options.seed=null]          Optional seed used to derive a deterministic time offset.
     * @param {PIXI.Ticker|null} [options.ticker=null]   Optional PIXI ticker. Defaults to {@link foundry.canvas.animation.CanvasAnimation.ticker}.
     */
    constructor({ target, duration, maxDisplacement, smoothness, returnSpeed, invalidateMasks, seed, ticker }: {
        target?: any;
        duration?: number | undefined;
        maxDisplacement?: number | undefined;
        smoothness?: number | undefined;
        returnSpeed?: number | undefined;
        invalidateMasks?: boolean | undefined;
        seed?: number | null | undefined;
        ticker?: PIXI.Ticker | null;
    });
    /**
     * Total shake duration in MS. After this duration elapses, the effect transitions into a return-to-origin phase.
     * @type {number}
     */
    duration: number;
    /**
     * Maximum displacement in pixels during the shake. This value is used as the target maximum offset along each axis.
     * @type {number}
     */
    maxDisplacement: number;
    /**
     * Smoothness parameter in the range [0, 1]. Higher values produce smoother, lower-frequency motion.
     * @type {number}
     */
    smoothness: number;
    /**
     * Return-to-origin interpolation factor per tick, in the range [0, 1].
     * Higher values restore the target to its reference point more quickly.
     * @type {number}
     */
    returnSpeed: number;
    /**
     * The deterministic time offset derived from {@link CanvasShakeEffect#seed}.
     * Applied to the elapsed time before generating noise.
     * @type {number}
     */
    randomOffset: number;
    /**
     * Whether the shake effect is currently active.
     * @type {boolean}
     * @readonly
     */
    readonly get playing(): boolean;
    /**
     * Start the shake effect.
     * Registers a ticker callback and returns a promise that resolves once the effect ends.
     * If the effect is already playing, returns the existing promise (or a resolved one as a fallback).
     * @returns {Promise<void>} A promise that resolves when the effect completes or is stopped.
     */
    play(): Promise<void>;
    startTime: any;
    /**
     * Stop the shake effect immediately. Removes the ticker callback, optionally snaps the target back to its base
     * position, and resolves the active promise.
     * @param {object} [options]
     * @param {boolean} [options.snap=true]     Snap the target back to its base position.
     * @param {boolean} [options.release=true]  Release the target shake state if no other shake is active.
     */
    stop({ snap, release }?: {
        snap?: boolean | undefined;
        release?: boolean | undefined;
    } | undefined): void;
    #private;
}
