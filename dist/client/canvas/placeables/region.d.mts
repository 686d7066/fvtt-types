declare const Region_base: {
    new (document: CanvasDocument): {
        _measurementLines: PIXI.Graphics;
        _measurementLabels: PIXI.Container;
        _measurementSolidLineStyle: PIXI.ILineStyleOptions;
        _measurementDashLineStyle: PIXI.ILineStyleOptions;
        readonly hoveredHandle: foundry.canvas.containers.ShapeControlsHandle | null;
        _hoveredHandle: foundry.canvas.containers.ShapeControlsHandle | null;
        readonly bounds: any;
        readonly center: any;
        _getTargetAlpha(): number;
        _overlapsSelection(rectangle: any): boolean;
        _onClickLeft(event: any): false | undefined;
        _onClickLeft2(event: any): any;
        _canDragLeftStart(user: any, event: any, options: any): any;
        _onDragLeftStart(event: any): any;
        _onDragLeftMove(event: any): any;
        _updateDragPreviews(event: PIXI.FederatedEvent): void;
        _onDragLeftDrop(event: any): any;
        _onDragLeftCancel(event: any): any;
        _initializeDragLeft(event: any): void;
        _initializeDragShape(event: PIXI.FederatedEvent): BaseShapeData;
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
        _finalizeDragLeft(event: any): void;
        _draw(options: any): void;
        _getMeasurementTextStyle(): PIXI.TextStyle;
        _getMeasuredShapes(): BaseShapeData[];
        _formatMeasuredDistance(distance: number): string;
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
/**
 * @import {BaseShapeData} from "../../../common/data/_module.mjs";
 * @import {GridOffset2D} from "../../../common/grid/_types.mjs";
 * @import {DeepReadonly, Point} from "../../../common/_types.mjs";
 * @import {RegionAnimationState} from "./_types.mjs";
 * @import {TokenDocument} from "../../documents/_module.mjs";
 */
/**
 * A Region is an implementation of PlaceableObject which represents a Region document
 * within a viewed Scene on the game canvas.
 * @category Canvas
 * @see {@link foundry.documents.RegionDocument}
 * @see {@link foundry.canvas.layers.RegionLayer}
 */
export default class Region extends Region_base {
    /** @override */
    static override RENDER_FLAGS: {
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
        refreshShapes: {
            propagate: string[];
        };
        refreshGeometry: {
            propagate: string[];
        };
        refreshBorder: {};
        refreshMeasurements: {};
    };
    /**
     * @deprecated since v13
     * @ignore
     */
    static get CLIPPER_SCALING_FACTOR(): number;
    /**
     * @deprecated since v13
     * @ignore
     */
    static get MOVEMENT_SEGMENT_TYPES(): Readonly<{
        readonly EXIT: -1;
        readonly MOVE: 0;
        readonly ENTER: 1;
    }>;
    /**
     * The geometry of this Region.
     *
     * The value of this property must not be mutated.
     * @type {RegionGeometry}
     */
    get geometry(): RegionGeometry;
    /** @override */
    override get isVisible(): any;
    /**
     * The animation state of this Region.
     * @type {DeepReadonly<RegionAnimationState>}
     */
    get animationState(): DeepReadonly<RegionAnimationState>;
    /**
     * Is this Region currently animating?
     * @type {boolean}
     */
    get isAnimating(): boolean;
    /** @override */
    override getSnappedPosition(position: any): void;
    /** @override */
    override _pasteObject(offset: any, _options: any): {
        shapes: any[];
        levels: any[];
    };
    /** @inheritDoc */
    _draw(options: any): Promise<void>;
    cursor: string | undefined;
    /**
     * Re-draw the shape controls.
     * @internal
     */
    _redrawShapeControls(): void;
    /** @inheritDoc */
    _destroy(options: any): void;
    /** @override */
    override _getMeasuredShapes(): any;
    /** @inheritDoc */
    _applyRenderFlags(flags: any): void;
    /**
     * Refresh the shapes of the Region.
     * @protected
     */
    protected _refreshShapes(): void;
    /**
     * Refresh the geometry of the Region.
     * @protected
     */
    protected _refreshGeometry(): void;
    /**
     * Refresh the border of the Region.
     * @protected
     */
    protected _refreshBorder(): void;
    /**
     * Get the grid space offsets that are covered by this Region.
     * @returns {GridOffset2D[]}
     * @protected
     */
    protected _getCoveredGridSpaceOffsets(): GridOffset2D[];
    /**
     * Update the animation state of this Region based on the animation state.
     * @internal
     */
    _onTokenAnimationFrame(): void;
    /**
     * Called when the animation state of the Region has changed.
     * @protected
     */
    protected _onAnimationStateChange(): void;
    /** @override */
    override _canHUD(user: any, event: any): boolean;
    /** @inheritDoc */
    _onHoverIn(event: any, options?: {}): boolean | void;
    /** @inheritDoc */
    _onHoverOut(event: any, options?: {}): void;
    /** @inheritDoc */
    _onControl(options: any): void;
    /** @inheritDoc */
    _onRelease(options: any): void;
    /** @inheritDoc */
    _updateDragPreviews(event: any): void;
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
    /**
     * @deprecated since v13
     * @ignore
     */
    get bottom(): any;
    /**
     * @deprecated since v13
     * @ignore
     */
    get top(): any;
    /**
     * @deprecated since v13
     * @ignore
     */
    get shapes(): any;
    /**
     * @deprecated since v13
     * @ignore
     */
    get polygons(): any;
    /**
     * @deprecated since v13
     * @ignore
     */
    get polygonTree(): any;
    /**
     * @deprecated since v13
     * @ignore
     */
    get clipperPaths(): any;
    /**
     * @deprecated since v13
     * @ignore
     */
    get triangulation(): any;
    /**
     * @deprecated since v13
     * @ignore
     */
    segmentizeMovement(waypoints: any, samples: any, options: any): any;
    /**
     * @deprecated since v13
     * @ignore
     */
    testPoint(point: any, elevation: any): any;
    #private;
}
import type { BaseShapeData } from "../../../common/data/_module.mjs";
import PlaceableObject from "./placeable-object.mjs";
import RegionGeometry from "./regions/geometry.mjs";
import type { RegionAnimationState } from "./_types.mjs";
import type { DeepReadonly } from "../../../common/_types.mjs";
import type { GridOffset2D } from "../../../common/grid/_types.mjs";
export {};
