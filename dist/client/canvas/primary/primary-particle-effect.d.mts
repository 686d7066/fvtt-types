declare const PrimaryParticleEffect_base: {
    new (...args: any[]): {
        canvasTransform: PIXI.Matrix;
        _canvasTransformID: number;
        "__#28@#canvasTransformLocalID": number;
        "__#28@#canvasTransformParentID": number;
        canvasBounds: PIXI.Rectangle;
        _canvasBounds: PIXI.Bounds;
        _canvasBoundsID: number;
        "__#28@#resetCanvasTransformParentID"(): void;
        _calculateCanvasBounds(): void;
        updateCanvasTransform(): void;
        _onCanvasTransformUpdate(): void;
        _onCanvasBoundsUpdate(): void;
        containsCanvasPoint(point: PIXI.IPointData): boolean;
    };
};
/**
 * A configurable particle effect meant to be used in the PrimaryCanvasGroup.
 * You must provide a full configuration object.
 * @deprecated since v14
 * @ignore
 */
export default class PrimaryParticleEffect extends PrimaryParticleEffect_base {
    constructor(config?: {});
    cullable: boolean;
    set sort(value: number);
    /**
     * A key which resolves ties amongst objects at the same elevation within the same layer.
     * @type {number}
     */
    get sort(): number;
    set elevation(value: number);
    /**
     * The elevation of this container.
     * @type {number}
     */
    get elevation(): number;
    /**
     * Always false for a Primary Particle Effect.
     * @returns {boolean}
     */
    get shouldRenderDepth(): boolean;
    /** @override */
    override destroy(...args: any[]): void;
    /**
     * Initialize the emitter with optional configuration.
     * @param {object} [config]      Optional config object.
     * @param {boolean} [play=false] Should we play immediately? False by default.
     */
    initialize(config?: object | undefined, play?: boolean | undefined): void;
    /**
     * Begin animation for the configured emitter.
     */
    play(): void;
    /**
     * Stop animation for the configured emitter.
     */
    stop(): void;
    #private;
}
export {};
