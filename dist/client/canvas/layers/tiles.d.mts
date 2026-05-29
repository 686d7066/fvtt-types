declare const TilesLayer_base: {
    new (): {
        _mouseWheelContext: {
            preview: foundry.canvas.placeables.PlaceableObject;
            shape: foundry.data.BaseShapeData;
        } | null;
        "__#127@#mouseWheelKeyUpListener": () => void;
        readonly "__#127@#multipleShapes": boolean;
        "__#127@#getTargetedObjects"(): foundry.canvas.placeables.PlaceableObject[];
        getSnappedPoint(point: any): foundry.types.Point;
        _deactivate(): void;
        _tearDown(options: any): Promise<void>;
        _onClickLeft(event: any): void;
        _onClickLeft2(event: any): void;
        _canDragLeftStart(user: any, event: any): boolean;
        _onDragLeftStart(event: any): void;
        _onDragLeftMove(event: any): void;
        _onDragLeftDrop(event: any): void;
        _commitDragLeftDrop(event: any): Promise<void>;
        _onDragLeftCancel(event: any): void;
        _createDragShapeData(event: PIXI.FederatedEvent): object;
        _updateDragPreview(event: PIXI.FederatedEvent): void;
        _onMouseWheel(event: any): false | undefined;
        "__#127@#createMouseWheelContext"(shape: foundry.data.BaseShapeData): object;
        "__#127@#commitMouseWheel"(): Promise<void>;
        _cancelMouseWheel(): void;
        _updateMouseWheelShape(event: WheelEvent): void;
        _updateMouseWheelPreview(): void;
        _prepareMouseWheelUpdate(): object | [data: object, options?: object];
        objects: PIXI.Container | null;
        _configPreview: PIXI.Container | null;
        preview: PIXI.Container | null;
        history: foundry.canvas.layers.types.CanvasHistoryEvent[];
        clipboard: {
            objects: foundry.canvas.placeables.PlaceableObject[];
            cut: boolean;
        };
        quadtree: foundry.canvas.geometry.Quadtree | null;
        readonly documentCollection: foundry.documents.abstract.DocumentCollection<any> | null;
        readonly hasPreview: boolean;
        readonly hud: foundry.applications.hud.BasePlaceableHUD<any, any, any> | null;
        readonly paletteCreateData: object;
        readonly placeables: foundry.canvas.placeables.PlaceableObject[];
        readonly controlled: foundry.canvas.placeables.PlaceableObject[];
        controllableObjects(): Generator<foundry.canvas.placeables.PlaceableObject>;
        readonly controlledObjects: Map<string, foundry.canvas.placeables.PlaceableObject>;
        "__#199@#controlledObjects": Map<any, any>;
        hover: foundry.canvas.placeables.PlaceableObject | null;
        "__#199@#hover": null;
        highlightObjects: boolean;
        _throttleRotateMany: (options: object) => Promise<foundry.canvas.placeables.PlaceableObject[]>;
        getMaxSort(): number;
        _sendToBackOrBringToFront(front: boolean): boolean | void;
        _highlightObjects(active: any): void;
        viewedDocuments(): Generator<any, void, unknown>;
        _draw(options: any): Promise<void>;
        createObject(document: ClientDocument): foundry.canvas.placeables.PlaceableObject;
        _activate(): void;
        clearPreviewContainer(): void;
        get(objectId: string): foundry.canvas.placeables.PlaceableObject;
        controlAll(options?: object | undefined): foundry.canvas.placeables.PlaceableObject[];
        releaseAll(options?: object | undefined): number;
        rotateMany({ angle, delta, snap, ids, includeLocked }?: {
            angle?: number | undefined;
            delta?: number | undefined;
            snap?: number | undefined;
            ids?: any[] | undefined;
            includeLocked?: boolean | undefined;
        }): Promise<foundry.canvas.placeables.PlaceableObject[]>;
        moveMany({ dx, dy, dz, rotate, ids, includeLocked }?: {
            dx?: 0 | 1 | -1 | undefined;
            dy?: 0 | 1 | -1 | undefined;
            dz?: 0 | 1 | -1 | undefined;
            rotate?: boolean | undefined;
            ids?: string[] | undefined;
            includeLocked?: boolean | undefined;
        }): Promise<foundry.canvas.placeables.PlaceableObject[]>;
        _prepareKeyboardMovementUpdates(objects: foundry.canvas.placeables.PlaceableObject[], dx: -1 | 0 | 1, dy: -1 | 0 | 1, dz: -1 | 0 | 1): [updates: object[], options?: object];
        _prepareKeyboardRotationUpdates(objects: foundry.canvas.placeables.PlaceableObject[], dx: -1 | 0 | 1, dy: -1 | 0 | 1, dz: -1 | 0 | 1): [updates: object[], options?: object];
        setAllRenderFlags(flags: Record<string, boolean>): void;
        _getMovableObjects(ids: string[] | undefined, includeLocked: boolean): foundry.canvas.placeables.PlaceableObject[];
        _getCopyableObjects(options: {
            cut: boolean;
        }): foundry.canvas.placeables.PlaceableObject[];
        undoHistory(): Promise<Document[]>;
        _onUndoCreate(event: Event): Promise<Document[]>;
        _onUndoUpdate(event: Event): Promise<Document[]>;
        _onUndoDelete(event: Event): Promise<Document[]>;
        deleteAll(): Promise<Document[]>;
        storeHistory(type: "create" | "update" | "delete", data: object[], options?: object | undefined): void;
        _storeHistory(type: "create" | "update" | "delete", data: object[], options?: object | undefined): void;
        copyObjects({ cut }?: {
            cut?: boolean | undefined;
        } | undefined): ReadonlyArray<foundry.canvas.placeables.PlaceableObject>;
        pasteObjects(position: Point, { hidden, snap }?: {
            hidden?: boolean | undefined;
            snap?: boolean | undefined;
        } | undefined): Promise<Document[]>;
        selectObjects({ x, y, width, height, releaseOptions, controlOptions }?: {
            x?: number | undefined;
            y?: number | undefined;
            width?: number | undefined;
            height?: number | undefined;
            releaseOptions?: object | undefined;
            controlOptions?: object | undefined;
        } | undefined, { releaseOthers }?: {
            releaseOthers?: boolean | undefined;
        } | undefined): boolean;
        updateAll(transformation: Function | object, condition?: Function | null, options?: object | undefined): Promise<Document[]>;
        _canvasCoordinatesFromDrop(event: DragEvent, { center }?: {
            center?: boolean | undefined;
        } | undefined): number[] | boolean;
        _createPreview(createData: object, { renderSheet, top, left }?: {
            renderSheet?: boolean | undefined;
            top?: number | undefined;
            left?: number | undefined;
        } | undefined): foundry.canvas.placeables.PlaceableObject;
        _isCreationToolActive(): boolean;
        _createDragPreviewData(event: PIXI.FederatedEvent): object;
        _onClickRight(event: any): false | undefined;
        _onDeleteKey(event: any): boolean;
        "__#199@#onDeleteKey"(toDelete: Document): Promise<void>;
        _confirmDeleteKey(documents: Document): Promise<boolean>;
        _onSelectAllKey(event: any): boolean;
        _onDismissKey(event: any): boolean;
        _onUndoKey(event: any): boolean;
        _onCutKey(event: any): boolean;
        _onCopyKey(event: any): boolean;
        _onPasteKey(event: any): boolean;
        getDocuments(): any[];
        readonly active: boolean;
        "__#48@#active": boolean;
        eventMode: string;
        activate({ tool }?: {
            tool?: string | undefined;
        } | undefined): InteractionLayer;
        zIndex: number | undefined;
        interactiveChildren: boolean;
        deactivate(): InteractionLayer;
        _onClickRight2(event: PIXI.FederatedEvent): void;
        _onCycleViewKey(event: KeyboardEvent): boolean;
        options: {
            name: string;
        };
        readonly name: string;
        readonly hookName: string;
        "__#46@#drawing": Promise<foundry.canvas.layers.CanvasLayer>;
        "__#46@#drawn": boolean;
        draw(options?: object | undefined): Promise<CanvasLayer>;
        tearDown(options?: foundry.types.CanvasTearDownOptions | undefined): Promise<CanvasLayer>;
        renderable: boolean | undefined;
        getZIndex(): number;
    };
    readonly layerOptions: object;
    documentName: string;
    readonly placeableClass: typeof import("../placeables/placeable-object.mjs").default;
    readonly CREATION_STATES: {
        NONE: number;
        POTENTIAL: number;
        CONFIRMED: number;
        COMPLETED: number;
    };
    TOGGLE_PALETTE: Partial<import("../../applications/ui/scene-controls.mjs").SceneControlTool>;
    prepareSceneControls(): import("../../applications/ui/scene-controls.mjs").SceneControl | null;
    readonly instance: foundry.canvas.layers.CanvasLayer;
};
/**
 * @import Tile from "../placeables/tile.mjs";
 */
/**
 * A PlaceablesLayer designed for rendering the visual Scene for a specific vertical cross-section.
 * @category Canvas
 */
export default class TilesLayer extends TilesLayer_base {
    /** @inheritdoc */
    static paletteClass: typeof TilePalette;
    /** @override */
    static override prepareSceneControls(): {
        name: string;
        order: number;
        title: string;
        layer: string;
        icon: string;
        visible: boolean;
        onChange: (event: any, active: any) => void;
        onToolChange: (_event: any, tool: any, active: any) => void;
        tools: {
            select: {
                name: string;
                order: number;
                title: string;
                icon: string;
                interaction: boolean;
                control: boolean;
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            tile: {
                name: string;
                order: number;
                title: string;
                icon: string;
                creation: boolean;
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            browse: {
                name: string;
                order: number;
                title: string;
                icon: string;
                button: boolean;
                onChange: () => Promise<FilePicker>;
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            snap: {
                name: string;
                order: number;
                title: string;
                icon: string;
                toggle: boolean;
                visible: boolean;
                active: boolean;
                onChange: (event: any, toggled: any) => any;
            };
            togglePalette: {
                order: number;
                /**
                 * An identifier for the tool, unique among the tools of its SceneControl
                 */
                name?: string | undefined;
                /**
                 * A title for the tool: can be a localization path
                 */
                title?: string | undefined;
                /**
                 * One or more icon classes for the tool, typically Font Awesome classes such as
                 * "fa-solid fa-face-smile"
                 */
                icon?: string | undefined;
                /**
                 * Whether the tool should be visible to the current User
                 */
                visible?: boolean | undefined;
                /**
                 * Is the tool an on-or-off toggle?
                 */
                toggle?: boolean | undefined;
                /**
                 * Is the tool the currently the active one? Not applicable to toggles or buttons.
                 */
                active?: boolean | undefined;
                /**
                 * Is the tool a "button" in the sense of immediately resolving on click without
                 *  becoming the active tool?
                 */
                button?: boolean | undefined;
                /**
                 * Does this tool allow interaction with placeables?
                 */
                interaction?: boolean | undefined;
                /**
                 * Does this tool allow placeables to be controlled?
                 */
                control?: boolean | undefined;
                /**
                 * Does this tool create placeables?
                 */
                creation?: boolean | undefined;
                /**
                 * Default creation data
                 */
                createData?: object | undefined;
                /**
                 * The data of the shape this tool creates
                 */
                shapeData?: object | undefined;
                /**
                 * A callback invoked when the tool is activated or
                 *  deactivated
                 */
                onChange?: ((event: Event, active: boolean) => void) | undefined;
                /**
                 * Configuration for rendering the tool's toolclip
                 */
                toolclip?: import("../../applications/ui/scene-controls.mjs").ToolclipConfiguration | undefined;
            };
        };
        activeTool: string;
    };
    /** @inheritdoc */
    get hud(): foundry.applications.hud.TileHUD;
    /**
     * An array of Tile objects which are rendered within the objects container
     * @type {Tile[]}
     */
    get tiles(): Tile[];
    /** @override */
    override _createDragPreviewData(event: any): object;
    /** @override */
    override _createDragShapeData(event: any): {
        type: string;
        x: number;
        y: number;
        width: number;
        height: number;
        anchorX: number;
        anchorY: number;
    };
    /** @override */
    override _updateDragPreview(event: any): void;
    /**
     * Handle drop events for Tile data on the Tiles Layer
     * @param {DragEvent} event     The concluding drag event
     * @param {object} data         The extracted Tile data
     * @protected
     */
    protected _onDropData(event: DragEvent, data: object): Promise<false | foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext> | foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext>[] | undefined>;
    /**
     * Prepare the data object when a new Tile is dropped onto the canvas
     * @param {DragEvent} event     The concluding drag event
     * @param {object} data         The extracted Tile data
     * @returns {object}            The prepared data to create
     * @protected
     */
    protected _getDropData(event: DragEvent, data: object): object;
}
import type Tile from "../placeables/tile.mjs";
import TilePalette from "../../applications/sheets/palette/tile-palette.mjs";
import FilePicker from "../../applications/apps/file-picker.mjs";
export {};
