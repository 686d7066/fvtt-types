/**
 * @import PlaceableObject from "../placeable-object.mjs";
 * @import {BaseShapeData} from "../../../../common/data/_module.mjs";
 */
/**
 * A mixin for UX shared between PlaceableObjects that have shapes.
 * @param {typeof PlaceableObject} Base
 */
export default function ShapeObjectMixin(Base: typeof PlaceableObject): {
    new (document: CanvasDocument): {
        /**
         * The measurement lines.
         * @type {PIXI.Graphics}
         * @protected
         */
        _measurementLines: PIXI.Graphics;
        /**
         * The measurement labels.
         * @type {PIXI.Container}
         * @protected
         */
        _measurementLabels: PIXI.Container;
        /**
         * The solid measurement line style.
         * @type {PIXI.ILineStyleOptions}
         * @protected
         */
        _measurementSolidLineStyle: PIXI.ILineStyleOptions;
        /**
         * The dashed measurement line style.
         * @type {PIXI.ILineStyleOptions}
         * @protected
         */
        _measurementDashLineStyle: PIXI.ILineStyleOptions;
        /**
         * The controls handle that is currently hovered, if any.
         * @type {ShapeControlsHandle|null}
         */
        readonly hoveredHandle: ShapeControlsHandle | null;
        /**
         * @type {ShapeControlsHandle|null}
         * @internal
         */
        _hoveredHandle: ShapeControlsHandle | null;
        /** @override */
        readonly bounds: any;
        /** @override */
        readonly center: any;
        /** @override */
        _getTargetAlpha(): number;
        /** @override */
        _overlapsSelection(rectangle: any): boolean;
        /** @inheritDoc */
        _onClickLeft(event: any): false | undefined;
        /** @inheritDoc */
        _onClickLeft2(event: any): any;
        /** @inheritDoc */
        _canDragLeftStart(user: any, event: any, options: any): any;
        /** @inheritDoc */
        _onDragLeftStart(event: any): any;
        /** @inheritDoc */
        _onDragLeftMove(event: any): any;
        /**
         * Update the drag previews. Called when the shape has changed.
         * @param {PIXI.FederatedEvent} event    The pointer event
         * @protected
         */
        _updateDragPreviews(event: PIXI.FederatedEvent): void;
        /** @inheritDoc */
        _onDragLeftDrop(event: any): any;
        /** @inheritDoc */
        _onDragLeftCancel(event: any): any;
        /** @inheritDoc */
        _initializeDragLeft(event: any): void;
        /**
         * Initialize the shape for dragging.
         * @param {PIXI.FederatedEvent} event    The pointer event
         * @returns {BaseShapeData}              The shape that is dragged
         */
        _initializeDragShape(event: PIXI.FederatedEvent): BaseShapeData;
        /** @override */
        _prepareDragLeftDropUpdates(event: any): ({
            _id: any;
            shapes: any;
            shape?: undefined;
            x?: undefined;
            y?: undefined;
        } | {
            _id: any;
            shape: any;
            shapes?: undefined;
            x?: undefined;
            y?: undefined;
        } | {
            _id: any;
            x: any;
            y: any;
            shapes?: undefined;
            shape?: undefined;
        })[];
        /** @inheritDoc */
        _finalizeDragLeft(event: any): void;
        /** @inheritDoc */
        _draw(options: any): void;
        /**
         * Define a PIXI TextStyle object which is used for the measurement labels.
         * @returns {PIXI.TextStyle}
         * @protected
         */
        _getMeasurementTextStyle(): PIXI.TextStyle;
        /**
         * Get the shape that should be measured.
         * @returns {BaseShapeData[]}
         * @protected
         */
        _getMeasuredShapes(): BaseShapeData[];
        /**
         * Format a distance that is displayed in a measurement label.
         * @param {number} distance     The distance
         * @returns {string}            The distance label
         * @protected
         */
        _formatMeasuredDistance(distance: number): string;
        /**
         * Refresh the measurements.
         * @protected
         */
        _refreshMeasurements(): void;
        scene: foundry.documents.Scene;
        document: CanvasDocument;
        controlIcon: foundry.canvas.containers.ControlIcon | null;
        mouseInteractionManager: foundry.canvas.interaction.MouseInteractionManager | null;
        cullable: boolean;
        _previewType: "dragging" | "controls" | "wheel" | "creation" | "config" | "api" | null;
        readonly _original: PlaceableObject | undefined;
        "__#212@#original": PlaceableObject | undefined;
        "__#212@#lastQuadtreeBounds": PIXI.Rectangle;
        "__#212@#drawing": Promise<PlaceableObject>;
        "__#212@#drawn": boolean;
        readonly isOwner: boolean;
        readonly isVisible: boolean;
        readonly isInteractable: boolean;
        readonly interactionState: {
            NONE: number;
            HOVER: number;
            CLICKED: number;
            GRABBED: number;
            DRAG: number;
            DROP: number;
        } | undefined;
        readonly id: string;
        readonly objectId: string;
        readonly sourceId: string;
        readonly previewType: "dragging" | "controls|";
        readonly isPreview: boolean;
        readonly hasPreview: boolean;
        readonly layer: foundry.canvas.layers.PlaceablesLayer;
        readonly sheet: foundry.applications.api.DocumentSheetV2;
        readonly controlled: boolean;
        "__#212@#controlled": boolean;
        hover: boolean;
        "__#212@#hover": boolean;
        readonly hasActiveHUD: boolean;
        getSnappedPosition(position?: any): Point;
        _pasteObject(offset: Point, { hidden, snap, cut }?: {
            hidden?: boolean | undefined;
            snap?: boolean | undefined;
            cut?: boolean | undefined;
        } | undefined): object;
        applyRenderFlags(): void;
        _applyRenderFlags(flags: Record<string, boolean>): void;
        _refreshVisibility(): void;
        visible: any;
        _refreshState(): void;
        eventMode: string | undefined;
        alpha: number | undefined;
        zIndex: number | undefined;
        _clear(): void;
        destroy(options: any): any;
        _destroy(options?: object | undefined): void;
        draw(options?: object | undefined): Promise<PlaceableObject>;
        renderable: any;
        _partialDraw(fn: () => Promise<void>): Promise<PlaceableObject>;
        refresh(options?: object | undefined): PlaceableObject;
        _updateQuadtree(): void;
        _onCreate(data: object, options: object, userId: string): void;
        _onUpdate(changed: object, options: object, userId: string): void;
        _onDelete(options: object, userId: string): void;
        control(options?: {
            releaseOthers?: boolean | undefined;
            renderSidebar?: boolean | undefined;
            isNew?: boolean | undefined;
            force?: boolean | undefined;
            pan?: boolean | foundry.types.TokenPanningOptions | undefined;
            chain?: boolean | undefined;
        } | undefined): boolean;
        _onControl(options: object): void;
        release(options?: {
            renderSidebar?: boolean | undefined;
        }): boolean;
        _onRelease(options: object): void;
        clone(): PlaceableObject;
        _preview: any;
        rotate(angle: number, snap: number): Promise<PlaceableObject>;
        _updateRotation({ angle, delta, snap }?: {
            angle?: number | undefined;
            delta?: number | undefined;
            snap?: number | undefined;
        }): number;
        _getShiftedPosition(dx: -1 | 0 | 1, dy: -1 | 0 | 1, dz: -1 | 0 | 1): object;
        activateListeners(): void;
        _createInteractionManager(): foundry.canvas.interaction.MouseInteractionManager | null;
        can(user: foundry.documents.User, action: "hover" | "control" | "drag" | "view" | "configure" | "HUD" | "create" | "update" | "delete"): boolean;
        _canHUD(user: foundry.documents.User, event?: any): boolean;
        _canConfigure(user: foundry.documents.User, event?: any): boolean;
        _canControl(user: foundry.documents.User, event?: any): boolean;
        _canView(user: foundry.documents.User, event?: any): boolean;
        _canCreate(user: foundry.documents.User, event?: any): boolean;
        _canDrag(user: foundry.documents.User, event?: any): boolean;
        _canHover(user: foundry.documents.User, event?: PIXI.FederatedEvent | Event): boolean;
        _canUpdate(user: foundry.documents.User, event?: any): boolean;
        _canDelete(user: foundry.documents.User, event?: any): boolean;
        _onHoverIn(event: PIXI.FederatedEvent | Event, { hoverOutOthers, updateLegend }?: {
            hoverOutOthers?: boolean | undefined;
            updateLegend?: boolean | undefined;
        } | undefined): boolean | void;
        _onHoverOut(event: PIXI.FederatedEvent | Event, { updateLegend }?: {
            updateLegend?: boolean | undefined;
        } | undefined): void;
        _propagateLeftClick(event: PIXI.FederatedEvent): boolean;
        _onUnclickLeft(event: PIXI.FederatedEvent): void;
        _propagateRightClick(event: PIXI.FederatedEvent): boolean;
        _onClickRight(event: PIXI.FederatedEvent): void;
        _onUnclickRight(event: PIXI.FederatedEvent): void;
        _onClickRight2(event: PIXI.FederatedEvent): void;
        "__#212@#onDragLeftStart"(event: PIXI.FederatedEvent): boolean | void;
        _onDragStart(): void;
        _onDragEnd(): void;
        "__#212@#commitDragLeftDropUpdates"(updates: object[], options?: object | undefined): Promise<void>;
        "__#212@#onDragLeftCancel"(event: PIXI.FederatedEvent): boolean | void;
        "__#212@#onDragRightStart"(event: PIXI.FederatedEvent): false | void;
        _onDragRightStart(event: PIXI.FederatedEvent): false | void;
        _initializeDragRight(event: PIXI.FederatedEvent): void;
        _onDragRightMove(event: PIXI.FederatedEvent): void;
        _onDragRightDrop(event: PIXI.FederatedEvent): void;
        "__#212@#onDragRightCancel"(event: PIXI.FederatedEvent): boolean | void;
        _onDragRightCancel(event: PIXI.FederatedEvent): boolean | void;
        _finalizeDragRight(event: PIXI.FederatedEvent): void;
        _onLongPress(event: PIXI.FederatedEvent, origin: PIXI.Point): any;
        clear(): any;
        renderFlags: foundry.canvas.interaction.RenderFlags;
    };
    embeddedName: string;
    readonly implementation: typeof PlaceableObject;
    RENDER_FLAGS: {
        redraw: {
            propagate: string[];
        };
        refresh: {
            propagate: string[];
            alias: boolean;
        };
        refreshState: {
            propagate: string[];
        };
        refreshVisibility: {};
    };
    _getCopiedObjectsOrigin(copies: PlaceableObject[]): Point;
    _getShiftedPosition(dx: -1 | 0 | 1, dy: -1 | 0 | 1, dz: -1 | 0 | 1, position: ElevatedPoint, snapped: ElevatedPoint, grid: foundry.grid.BaseGrid): ElevatedPoint;
    RENDER_FLAG_PRIORITY: string;
};
import type PlaceableObject from "../placeable-object.mjs";
import { ShapeControlsHandle } from "../../containers/_module.mjs";
import type { BaseShapeData } from "../../../../common/data/_module.mjs";
