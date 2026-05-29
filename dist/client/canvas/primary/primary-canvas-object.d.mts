/**
 * A mixin which decorates a DisplayObject with additional properties expected for rendering in the PrimaryCanvasGroup.
 * @category Mixins
 * @param {typeof PIXI.DisplayObject} DisplayObject   The parent DisplayObject class being mixed
 */
export default function PrimaryCanvasObjectMixin(DisplayObject: typeof PIXI.DisplayObject): {
    new (...args: any[]): {
        cullable: boolean;
        /**
         * An optional reference to the object that owns this PCO.
         * This property does not affect the behavior of the PCO itself.
         * @type {*}
         * @default null
         */
        object: any;
        /**
         * The entry in the quadtree.
         * @type {QuadtreeObject|null}
         */
        "__#27@#quadtreeEntry": QuadtreeObject | null;
        /**
         * Update the quadtree entry?
         * @type {boolean}
         */
        "__#27@#quadtreeDirty": boolean;
        /**
         * The elevation of this object.
         * @type {number}
         */
        elevation: number;
        "__#27@#elevation": number;
        /**
         * A key which resolves ties amongst objects at the same elevation within the same layer.
         * @type {number}
         */
        sort: number;
        "__#27@#sort": number;
        /**
         * A key which resolves ties amongst objects at the same elevation of different layers.
         * @type {number}
         */
        sortLayer: number;
        "__#27@#sortLayer": number;
        /**
         * A key which resolves ties amongst objects at the same elevation within the same layer and same sort.
         * @type {number}
         */
        zIndex: number;
        _zIndex: any;
        /**
         * Event fired when this display object is added to a parent.
         * @param {PIXI.Container} parent   The new parent container.
         * @protected
         */
        _onAdded(parent: PIXI.Container): void;
        /**
         * Event fired when this display object is removed from its parent.
         * @param {PIXI.Container} parent   Parent from which the PCO is removed.
         * @protected
         */
        _onRemoved(parent: PIXI.Container): void;
        /** @inheritDoc */
        updateCanvasTransform(): void;
        /** @inheritDoc */
        _onCanvasBoundsUpdate(): void;
        /**
         * Update the quadtree.
         * @param {boolean} [remove=false]    Remove the quadtree entry?
         */
        "__#27@#updateQuadtree"(remove?: boolean | undefined): void;
        /**
         * Does this object render to the depth buffer?
         * @type {boolean}
         */
        readonly shouldRenderDepth: boolean;
        /** @type {boolean} */
        "__#27@#shouldRenderDepth": boolean;
        /**
         * Flag the depth as dirty if necessary.
         */
        "__#27@#updateDepth"(): void;
        /**
         * Does this object render to the depth buffer?
         * @returns {boolean}
         * @protected
         */
        _shouldRenderDepth(): boolean;
        /**
         * Render the depth of this object.
         * @param {PIXI.Renderer} renderer
         */
        renderDepthData(renderer: PIXI.Renderer): void;
        /**
         * The transform matrix from local space to canvas space.
         * @type {PIXI.Matrix}
         */
        canvasTransform: PIXI.Matrix;
        /**
         * The update ID of canvas transform matrix.
         * @type {number}
         * @internal
         */
        _canvasTransformID: number;
        /**
         * The update ID of the local transform of this object.
         * @type {number}
         */
        "__#28@#canvasTransformLocalID": number;
        /**
         * The update ID of the canvas transform of the parent.
         * @type {number}
         */
        "__#28@#canvasTransformParentID": number;
        /**
         * The canvas bounds of this object.
         * @type {PIXI.Rectangle}
         */
        canvasBounds: PIXI.Rectangle;
        /**
         * The canvas bounds of this object.
         * @type {PIXI.Bounds}
         * @protected
         */
        _canvasBounds: PIXI.Bounds;
        /**
         * The update ID of the canvas bounds.
         * Increment to force recalculation.
         * @type {number}
         * @protected
         */
        _canvasBoundsID: number;
        /**
         * Reset the parent ID of the canvas transform.
         */
        "__#28@#resetCanvasTransformParentID"(): void;
        /**
         * Calculate the canvas bounds of this object.
         * @protected
         */
        _calculateCanvasBounds(): void;
        /**
         * Called when the canvas transform changed.
         * @protected
         */
        _onCanvasTransformUpdate(): void;
        /**
         * Is the given point in canvas space contained in this object?
         * @param {PIXI.IPointData} point    The point in canvas space.
         * @returns {boolean}
         */
        containsCanvasPoint(point: PIXI.IPointData): boolean;
    };
};
/**
 * A mixin which decorates a DisplayObject with additional properties for canvas transforms and bounds.
 * @category Mixins
 * @param {typeof PIXI.DisplayObject} DisplayObject   The parent DisplayObject class being mixed
 */
export function CanvasTransformMixin(DisplayObject: typeof PIXI.DisplayObject): {
    new (...args: any[]): {
        /**
         * The transform matrix from local space to canvas space.
         * @type {PIXI.Matrix}
         */
        canvasTransform: PIXI.Matrix;
        /**
         * The update ID of canvas transform matrix.
         * @type {number}
         * @internal
         */
        _canvasTransformID: number;
        /**
         * The update ID of the local transform of this object.
         * @type {number}
         */
        "__#28@#canvasTransformLocalID": number;
        /**
         * The update ID of the canvas transform of the parent.
         * @type {number}
         */
        "__#28@#canvasTransformParentID": number;
        /**
         * The canvas bounds of this object.
         * @type {PIXI.Rectangle}
         */
        canvasBounds: PIXI.Rectangle;
        /**
         * The canvas bounds of this object.
         * @type {PIXI.Bounds}
         * @protected
         */
        _canvasBounds: PIXI.Bounds;
        /**
         * The update ID of the canvas bounds.
         * Increment to force recalculation.
         * @type {number}
         * @protected
         */
        _canvasBoundsID: number;
        /**
         * Reset the parent ID of the canvas transform.
         */
        "__#28@#resetCanvasTransformParentID"(): void;
        /**
         * Calculate the canvas bounds of this object.
         * @protected
         */
        _calculateCanvasBounds(): void;
        /**
         * Recalculate the canvas transform and bounds of this object and its children, if necessary.
         */
        updateCanvasTransform(): void;
        /**
         * Called when the canvas transform changed.
         * @protected
         */
        _onCanvasTransformUpdate(): void;
        /**
         * Called when the canvas bounds changed.
         * @protected
         */
        _onCanvasBoundsUpdate(): void;
        /**
         * Is the given point in canvas space contained in this object?
         * @param {PIXI.IPointData} point    The point in canvas space.
         * @returns {boolean}
         */
        containsCanvasPoint(point: PIXI.IPointData): boolean;
    };
};
