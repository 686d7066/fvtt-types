declare const PrimaryCanvasContainer_base: {
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
 * Primary canvas container are reserved for advanced usage.
 * They allow to group PrimarySpriteMesh in a single Container.
 * The container elevation is replacing individual sprite elevation.
 */
export default class PrimaryCanvasContainer extends PrimaryCanvasContainer_base {
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
     * To know if this container has at least one children that should render its depth.
     * @returns {boolean}
     */
    get shouldRenderDepth(): boolean;
    /** @override */
    override sortChildren(): void;
    sortDirty: boolean | undefined;
    /** @override */
    override renderDepthData(renderer: any): void;
    #private;
}
export {};
