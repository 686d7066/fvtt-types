declare const PrimaryCanvasParticleContainer_base: {
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
 * A lightweight primary-canvas container designed for particle effects.
 * This container intentionally avoids any internal sorting or depth participation. Children render in insertion order.
 */
export default class PrimaryCanvasParticleContainer extends PrimaryCanvasParticleContainer_base {
    eventMode: string;
    interactiveChildren: boolean;
    sortableChildren: boolean;
    set elevation(value: number);
    /**
     * The elevation of this container.
     * @type {number}
     */
    get elevation(): number;
    set sort(value: number);
    /**
     * A key which resolves ties amongst objects at the same elevation within the same layer.
     * @type {number}
     */
    get sort(): number;
    /**
     * Particle containers do not render depth.
     * @returns {boolean}
     */
    get shouldRenderDepth(): boolean;
    /** @override */
    override renderDepthData(renderer: any): void;
    #private;
}
export {};
