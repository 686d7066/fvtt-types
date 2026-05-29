declare const Tile_base: {
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
 * A Tile is an implementation of PlaceableObject which represents a static piece of artwork or prop within the Scene.
 * @category Canvas
 * @see {@link foundry.documents.TileDocument}
 * @see {@link foundry.canvas.layers.TilesLayer}
 */
export default class Tile extends Tile_base {
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
        refreshPosition: {
            propagate: string[];
        };
        refreshRotation: {
            propagate: string[];
        };
        refreshSize: {
            propagate: string[];
        };
        refreshMesh: {};
        refreshElevation: {
            propagate: string[];
        };
        refreshPerception: {};
        refreshVideo: {};
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
     * @deprecated since v14
     * @ignore
     */
    static createPreview(data: any): PlaceableObject;
    /**
     * The Tile border frame
     * @type {PIXI.Container}
     */
    frame: PIXI.Container;
    /**
     * The shape controls.
     * @type {TileShapeControls}
     */
    controls: TileShapeControls;
    /**
     * The primary tile image texture
     * @type {PIXI.Texture|PIXI.Spritesheet|null}
     */
    texture: PIXI.Texture | PIXI.Spritesheet | null;
    /**
     * A Tile background which is displayed if no valid image texture is present
     * @type {PIXI.Sprite|null}
     */
    bg: PIXI.Sprite | null;
    /**
     * A reference to the SpriteMesh which displays this Tile in the PrimaryCanvasGroup.
     * @type {PrimarySpriteMesh|null}
     */
    mesh: PrimarySpriteMesh | null;
    /**
     * Get the native aspect ratio of the base texture for the Tile sprite
     * @type {number}
     */
    get aspectRatio(): number;
    /**
     * The HTML source element for the primary Tile texture
     * @type {PIXI.ImageSource|null}
     */
    get sourceElement(): any;
    /**
     * Does this Tile depict an animated video texture?
     * @type {boolean}
     */
    get isVideo(): boolean;
    /**
     * Is this tile occluded?
     * @returns {boolean}
     */
    get occluded(): boolean;
    /**
     * Is the tile video playing?
     * @type {boolean}
     */
    get playing(): boolean;
    /**
     * The effective volume at which this Tile should be playing, including the global ambient volume modifier
     * @type {number}
     */
    get volume(): number;
    /** @inheritDoc */
    _draw(options: any): Promise<void>;
    cursor: string | undefined;
    /** @inheritdoc */
    _destroy(options: any): void;
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
     * Refresh the size.
     * @protected
     */
    protected _refreshSize(): void;
    /**
     * Refresh the appearance of the tile.
     * @protected
     */
    protected _refreshMesh(): void;
    /**
     * Refresh the elevation.
     * @protected
     */
    protected _refreshElevation(): void;
    /**
     * Refresh changes to the video playback state.
     * @protected
     */
    protected _refreshVideo(): void;
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
    #private;
}
import PlaceableObject from "./placeable-object.mjs";
import TileShapeControls from "./tiles/shape-controls.mjs";
export {};
