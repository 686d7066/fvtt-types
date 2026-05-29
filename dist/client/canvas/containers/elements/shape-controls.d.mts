declare const ShapeControls_base: {
    new (...args: any[]): {
        renderFlags: foundry.canvas.interaction.RenderFlags;
        applyRenderFlags(): void;
    };
    RENDER_FLAGS: Record<string, PIXI>;
    RENDER_FLAG_PRIORITY: string;
};
/**
 * @import {BaseShapeData} from "../../../../common/data/_module.mjs";
 * @import Document from "../../../../common/abstract/document.mjs";
 * @import {PlaceableObject} from "../../placeables/_module.mjs";
 * @import {PlaceablesLayer} from "../../layers/_module.mjs";
 * @import {Point, DeepReadonly} from "../../../../common/_types.mjs";
 */
/**
 * Controls for a shape.
 * @template {Document} DocumentClass
 * @template {PlaceableObject} ObjectClass
 * @template {PlaceablesLayer} LayerClass
 * @template {BaseShapeData} [ShapeClass=BaseShapeData]
 */
export class ShapeControls<DocumentClass extends Document, ObjectClass extends PlaceableObject, LayerClass extends PlaceablesLayer, ShapeClass extends BaseShapeData = BaseShapeData> extends ShapeControls_base {
    /** @override */
    static override RENDER_FLAGS: {
        redraw: {
            propagate: string[];
        };
        refresh: {};
    };
    /**
     * Create and draw the drag preview for a placeable object.
     * @param {ObjectClass} object    The original placeable object
     * @returns {ObjectClass}         The preview of the placeable object.
     * @internal
     */
    static _createDragPreview(object: ObjectClass): ObjectClass;
    /**
     * @param {ShapeClass} shape    The shape.
     */
    constructor(shape: ShapeClass);
    /**
     * The shape.
     * @type {ShapeClass}
     */
    get shape(): ShapeClass;
    /**
     * The Document of this shape.
     * @type {DocumentClass}
     */
    get document(): DocumentClass;
    /**
     * The PlaceableObject of this shape.
     * @type {ObjectClass}
     */
    get object(): ObjectClass;
    /**
     * The PlaceableLayer of this shape.
     * @type {LayerClass}
     */
    get layer(): LayerClass;
    /**
     * The border of the shape.
     * @type {PIXI.Graphics}
     */
    get border(): PIXI.Graphics;
    /**
     * The handles of the shape.
     * @type {PIXI.Container<ShapeControlsHandle>}
     */
    get handles(): PIXI.Container<ShapeControlsHandle>;
    set tint(tint: number);
    /**
     * The tint applied to these controls.
     * @type {number}
     * @defaultValue 0xFFFFFF
     */
    get tint(): number;
    /**
     * Are the controls editable?
     * @type {boolean}
     * @defaultValue true
     */
    editable: boolean;
    set dashed(value: boolean);
    /**
     * Is the border dashed?
     * @type {boolean}
     * @defaultValue false
     */
    get dashed(): boolean;
    /**
     * Refresh the visualization of these controls.
     * @protected
     */
    protected _refresh(): void;
    /**
     * Refresh the visualization of these controls.
     */
    refresh(): void;
    /**
     * Draw the shape.
     * @param {PIXI.Graphics} graphics
     * @protected
     */
    protected _drawShape(graphics: PIXI.Graphics): void;
    /**
     * Draw the visualization of these controls.
     * @returns {Promise<this>}
     */
    draw(): Promise<this>;
    /**
     * Draw these controls.
     * @returns {Promise<void>}
     * @protected
     */
    protected _draw(): Promise<void>;
    /**
     * Clear these controls.
     * @protected
     */
    protected _clear(): void;
    /** @inheritDoc */
    destroy(options: any): void;
    /**
     * Can the handle be dragged?
     * @param {PIXI.FederatedEvent} event      The pointer event
     * @param {{notify: boolean}} [options]    Options, used internally
     * @returns {boolean}
     * @protected
     */
    protected _canDragStart(event: PIXI.FederatedEvent, options?: {
        notify: boolean;
    } | undefined): boolean;
    /**
     * Handle the drag start event of a handle.
     * @param {PIXI.FederatedEvent} event    The pointer event.
     * @protected
     */
    protected _onDragStart(event: PIXI.FederatedEvent): void;
    /**
     * Handle the drag move event of a handle.
     * @param {PIXI.FederatedEvent} event    The pointer event.
     * @protected
     */
    protected _onDragMove(event: PIXI.FederatedEvent): void;
    /**
     * Update the drag preview. Called when the shape has changed.
     * @param {PIXI.FederatedEvent} event    The pointer event.
     * @protected
     */
    protected _updateDragPreview(event: PIXI.FederatedEvent): void;
    /** @inheritDoc */
    _onDragDrop(event: any): void;
    /**
     * Prepare the database update that should occur as the result of a drop operation.
     * @param {PIXI.FederatedEvent} event                    The pointer event.
     * @returns {object|[data: object, options?: object]}    The update data and options (optional)
     * @protected
     */
    protected _prepareDragDropUpdate(event: PIXI.FederatedEvent): object | [data: object, options?: object];
    /**
     * Handle the drag cancel event of a handle.
     * @param {PIXI.FederatedEvent} event    The pointer event.
     * @protected
     */
    protected _onDragCancel(event: PIXI.FederatedEvent): void;
    /**
     * Handle the double left-click event of a handle.
     * @param {PIXI.FederatedEvent} event    The pointer event.
     * @protected
     */
    protected _onClick2(event: PIXI.FederatedEvent): void;
    #private;
}
/**
 * A handle of a shape controls element.
 */
export class ShapeControlsHandle {
    /**
     * @param {ShapeControls} controls    The controls this handle belongs to.
     * @param {string} name               The name of this handle.
     */
    constructor(controls: ShapeControls<any, any, any, BaseShapeData>, name: string);
    name: string;
    cursor: string;
    eventMode: string;
    /**
     * The controls that this handle belongs to.
     * @type {ShapeControls}
     */
    get controls(): ShapeControls<any, any, any, BaseShapeData>;
    /**
     * Is hovered?
     * @type {boolean}
     */
    get hovered(): boolean;
    /**
     * Draw the handle.
     * @param {{size: number; outlineThickness: number}} style    The style.
     * @returns {Promise<void>}
     */
    draw({ size, offset, outlineThickness }: {
        size: number;
        outlineThickness: number;
    }): Promise<void>;
    #private;
}
import type Document from "../../../../common/abstract/document.mjs";
import type { PlaceableObject } from "../../placeables/_module.mjs";
import type { PlaceablesLayer } from "../../layers/_module.mjs";
import type { BaseShapeData } from "../../../../common/data/_module.mjs";
export {};
