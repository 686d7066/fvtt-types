declare const Drawing_base: {
    new (document: CanvasDocument): {
        _measurementLines: PIXI.Graphics;
        _measurementLabels: PIXI.Container;
        _measurementSolidLineStyle: PIXI.
        /**
         * The border frame and resizing handles for the drawing.
         * @type {PIXI.Container}
         */
        ILineStyleOptions;
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
        _initializeDragShape(event: PIXI.FederatedEvent): foundry.data.BaseShapeData;
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
        _getMeasuredShapes(): foundry.data.BaseShapeData[];
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
 * The Drawing object is an implementation of the PlaceableObject container.
 * Each Drawing is a placeable object in the DrawingsLayer.
 * @category Canvas
 * @see {@link foundry.documents.DrawingDocument}
 * @see {@link foundry.canvas.layers.DrawingsLayer}
 */
export default class Drawing extends Drawing_base {
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
        refreshTransform: {
            propagate: string[];
            alias: boolean;
        };
        refreshPosition: {};
        refreshRotation: {};
        refreshSize: {
            propagate: string[];
        };
        refreshShape: {};
        refreshText: {};
        refreshElevation: {};
        /** @deprecated since v14 */
        refreshFrame: {
            deprecated: {
                since: number;
                until: number;
            };
            alias: boolean;
        };
    };
    /**
     * The rate at which points are sampled (in milliseconds) during a freehand drawing workflow
     * @type {number}
     */
    static FREEHAND_SAMPLE_RATE: number;
    /**
     * A convenience reference to the possible shape types.
     * @enum {string}
     */
    static SHAPE_TYPES: {
        RECTANGLE: string;
        CIRCLE: string;
        ELLIPSE: string;
        POLYGON: string;
    };
    /**
     * Get a vectorized rescaling transformation for drawing data and dimensions passed in parameter
     * @param {Object} original     The original drawing data
     * @param {number} dx           The pixel distance dragged in the horizontal direction
     * @param {number} dy           The pixel distance dragged in the vertical direction
     * @returns {object}            The adjusted shape data
     */
    static rescaleDimensions(original: Object, dx: number, dy: number): object;
    /**
     * Adjust the location, dimensions, and points of the Drawing before committing the change.
     * @param {object} data   The DrawingData pending update
     * @returns {object}      The adjusted data
     */
    static normalizeShape(data: object): object;
    /**
     * The texture that is used to fill this Drawing, if any.
     * @type {PIXI.Texture|null}
     */
    texture: PIXI.Texture | null;
    /**
     * The border frame and resizing handles for the drawing.
     * @type {PIXI.Container}
     */
    frame: PIXI.Container;
    /**
     * A text label that may be displayed as part of the interface layer for the Drawing.
     * @type {PreciseText|null}
     */
    text: PreciseText | null;
    /**
     * The drawing shape which is rendered as a PIXI.Graphics in the interface or a PrimaryGraphics in the Primary Group.
     * @type {PrimaryGraphics|PIXI.Graphics}
     */
    shape: PrimaryGraphics | PIXI.Graphics;
    /**
     * A convenient reference for whether the current User is the author of the Drawing document.
     * @type {boolean}
     */
    get isAuthor(): boolean;
    /**
     * A Boolean flag for whether the Drawing utilizes a tiled texture background?
     * @type {boolean}
     */
    get isTiled(): boolean;
    /**
     * A Boolean flag for whether the Drawing is a Polygon type (either linear or freehand)?
     * @type {boolean}
     */
    get isPolygon(): boolean;
    /**
     * Does the Drawing have text that is displayed?
     * @type {boolean}
     */
    get hasText(): boolean;
    /**
     * The shape type that this Drawing represents. A value in Drawing.SHAPE_TYPES.
     * @see {@link Drawing.SHAPE_TYPES}
     * @type {string}
     */
    get type(): string;
    /**
     * The shape controls of this Drawing.
     * @type {PIXI.Container}
     */
    controls: PIXI.Container;
    /**
     * The pending text.
     * @type {string}
     * @internal
     */
    _pendingText: string;
    /**
     * The registered keydown listener.
     * @type {Function|null}
     * @internal
     */
    _onkeydown: Function | null;
    /** @inheritDoc */
    _destroy(options: any): void;
    /** @inheritDoc */
    _draw(options: any): Promise<void>;
    cursor: string | undefined;
    /**
     * Get the line style used for drawing the shape of this Drawing.
     * @returns {object}    The line style options (`PIXI.ILineStyleOptions`).
     * @protected
     */
    protected _getLineStyle(): object;
    /**
     * Get the fill style used for drawing the shape of this Drawing.
     * @returns {object}    The fill style options (`PIXI.IFillStyleOptions`).
     * @protected
     */
    protected _getFillStyle(): object;
    /**
     * Prepare the text style used to instantiate a PIXI.Text or PreciseText instance for this Drawing document.
     * @returns {PIXI.TextStyle}
     * @protected
     */
    protected _getTextStyle(): PIXI.TextStyle;
    /** @inheritDoc */
    _applyRenderFlags(flags: any): void;
    /**
     * Refresh the position.
     * @protected
     */
    protected _refreshPosition(): void;
    /**
     * Refresh the rotation.
     * @protected
     */
    protected _refreshRotation(): void;
    /**
     * Clear and then draw the shape.
     * @protected
     */
    protected _refreshShape(): void;
    /**
     * Update sorting of this Drawing relative to other PrimaryCanvasGroup siblings.
     * Called when the elevation or sort order for the Drawing changes.
     * @protected
     */
    protected _refreshElevation(): void;
    /**
     * Refresh the content and appearance of text.
     * @protected
     */
    protected _refreshText(): void;
    /** @inheritDoc */
    _onControl(options: any): void;
    /** @inheritDoc */
    _onRelease(options: any): void;
    /**
     * Enable text editing for this drawing.
     * @param {object} [options]
     */
    enableTextEditing(options?: object | undefined): void;
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onDelete(options: any, userId: any): void;
    /** @override */
    override _initializeDragShape(event: any): any;
    /** @override */
    override _updateDragPreviews(event: any): void;
    /** @override */
    override _prepareDragLeftDropUpdates(event: any): {
        _id: any;
        x: any;
        y: any;
    }[];
    #private;
}
import PlaceableObject from "./placeable-object.mjs";
import PreciseText from "../containers/elements/precise-text.mjs";
export {};
