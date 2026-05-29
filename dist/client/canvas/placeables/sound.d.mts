declare const AmbientSound_base: {
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
        "__#212@#lastQuadtreeBounds": PIXI.
        /**
         * Update the set of effects which are applied to the managed Sound.
         * @param {object} [options]
         * @param {boolean} [options.muffled]     Is the sound currently muffled?
         */
        Rectangle;
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
 * An AmbientSound is an implementation of PlaceableObject which represents a dynamic audio source within the Scene.
 * @category Canvas
 * @see {@link foundry.documents.AmbientSoundDocument}
 * @see {@link foundry.canvas.layers.SoundsLayer}
 */
export default class AmbientSound extends AmbientSound_base {
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
        refreshSize: {
            propagate: string[];
        };
        refreshField: {};
        refreshTooltip: {};
        refreshMeasurements: {};
        /** @deprecated since v14 */
        refreshElevation: {
            propagate: string[];
            deprecated: {
                since: number;
                until: number;
            };
            alias: boolean;
        };
    };
    /**
     * The Sound which manages playback for this AmbientSound effect
     * @type {Sound|null}
     */
    sound: Sound | null;
    /**
     * A SoundSource object which manages the area of effect for this ambient sound
     * @type {PointSoundSource}
     */
    source: PointSoundSource;
    /**
     * The area that is affected by this ambient sound.
     * @type {PIXI.Graphics}
     */
    field: PIXI.Graphics;
    /**
     * The shape controls.
     * @type {AmbientSoundShapeControls}
     */
    controls: AmbientSoundShapeControls;
    /**
     * The tooltip text of this AmbientSound, which contains its elevation.
     * @type {PreciseText}
     */
    tooltip: PreciseText;
    /**
     * Create a Sound used to play this AmbientSound object
     * @returns {Sound|null}
     * @protected
     */
    protected _createSound(): Sound | null;
    /**
     * Update the set of effects which are applied to the managed Sound.
     * @param {object} [options]
     * @param {boolean} [options.muffled]     Is the sound currently muffled?
     */
    applyEffects({ muffled }?: {
        muffled?: boolean | undefined;
    } | undefined): void;
    /**
     * Is this ambient sound is currently audible based on its hidden state and the darkness level of the Scene?
     * @type {boolean}
     */
    get isAudible(): boolean;
    /**
     * A convenience accessor for the sound radius in pixels
     * @type {number}
     */
    get radius(): number;
    /** @override */
    override _overlapsSelection(rectangle: any): any;
    /**
     * Toggle playback of the sound depending on whether it is audible.
     * @param {boolean} isAudible     Is the sound audible?
     * @param {number} [volume]       The target playback volume
     * @param {object} [options={}]   Additional options which affect sound synchronization
     * @param {number} [options.fade=250]       A duration in milliseconds to fade volume transition
     * @param {boolean} [options.muffled=false] Is the sound current muffled?
     * @returns {Promise<void>}       A promise which resolves once sound playback is synchronized
     */
    sync(isAudible: boolean, volume?: number | undefined, { fade, muffled }?: {
        fade?: number | undefined;
        muffled?: boolean | undefined;
    } | undefined): Promise<void>;
    /** @inheritDoc */
    _draw(options: any): Promise<void>;
    cursor: string | undefined;
    /** @override */
    override _destroy(options: any): void;
    /** @inheritDoc */
    _applyRenderFlags(flags: any): void;
    /**
     * Refresh the shape of the sound field-of-effect. This is refreshed when the SoundSource fov polygon changes.
     * @protected
     */
    protected _refreshField(): void;
    /**
     * Refresh the position of the AmbientSound. Called with the coordinates change.
     * @protected
     */
    protected _refreshPosition(): void;
    /**
     * Refresh the size of the AmbientSound.
     * @protected
     */
    protected _refreshSize(): void;
    /**
     * Refresh the tooltip.
     * @protected
     */
    protected _refreshTooltip(): void;
    /**
     * Return the text which should be displayed in the tooltip.
     * @returns {string}
     * @protected
     */
    protected _getTooltipText(): string;
    /**
     * Get the text style that should be used for the tooltip.
     * @returns {PIXI.TextStyle}
     * @protected
     */
    protected _getTextStyle(): PIXI.TextStyle;
    /**
     * Compute the field-of-vision for an object, determining its effective line-of-sight and field-of-vision polygons
     * @param {object} [options={}]   Options which modify how the audio source is updated
     * @param {boolean} [options.deleted]  Indicate that this SoundSource has been deleted.
     */
    initializeSoundSource({ deleted }?: {
        deleted?: boolean | undefined;
    } | undefined): void;
    /**
     * Get the sound source data.
     * @returns {BaseEffectSourceData}
     * @protected
     */
    protected _getSoundSourceData(): BaseEffectSourceData;
    /** @inheritDoc */
    _onCreate(data: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onDelete(options: any, userId: any): void;
    /** @inheritdoc */
    _canHUD(user: any, event: any): any;
    /** @inheritdoc */
    _canConfigure(user: any, event: any): boolean;
    /** @override */
    override _onControl(options: any): void;
    /** @override */
    override _onRelease(options: any): void;
    /** @override */
    override _onClickRight(event: any): void;
    /** @override */
    override _updateDragPreviews(event: any): void;
    #private;
}
import PlaceableObject from "./placeable-object.mjs";
import AmbientSoundShapeControls from "./sounds/shape-controls.mjs";
import PreciseText from "../containers/elements/precise-text.mjs";
export {};
