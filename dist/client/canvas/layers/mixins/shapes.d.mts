/**
 * @import PlaceablesLayer from "../base/placeables-layer.mjs";
 * @import PlaceableObject from "../../placeables/placeable-object.mjs";
 */
/**
 * A mixin for UX shared between PlaceablesLayer with objects that have shapes.
 * @param {typeof PlaceablesLayer} Base    The PlaceablesLayer (sub)class.
 */
export default function ShapeLayerMixin(Base: typeof PlaceablesLayer): {
    new (): {
        /**
         * The mouse wheel context.
         * @type {{preview: PlaceableObject; shape: BaseShapeData}|null}
         * @internal
         */
        _mouseWheelContext: {
            preview: PlaceableObject;
            shape: BaseShapeData;
        } | null;
        /**
         * Listen for SHIFT/CTRL keyup events during mouse wheel rotation.
         * @type {() => void}
         */
        "__#127@#mouseWheelKeyUpListener": () => void;
        /**
         * Can an object have multiple shapes?
         * @type {boolean}
         */
        readonly "__#127@#multipleShapes": boolean;
        /**
         * The objects of this layer that are either controlled or have their sheet rendered.
         * @type {PlaceableObject[]}
         */
        "__#127@#getTargetedObjects"(): PlaceableObject[];
        /** @override */
        getSnappedPoint(point: any): foundry.types.Point;
        /** @inheritDoc */
        _deactivate(): void;
        /** @inheritDoc */
        _tearDown(options: any): Promise<void>;
        /** @inheritDoc */
        _onClickLeft(event: any): void;
        /** @inheritDoc */
        _onClickLeft2(event: any): void;
        /** @inheritDoc */
        _canDragLeftStart(user: any, event: any): boolean;
        /** @inheritDoc */
        _onDragLeftStart(event: any): void;
        /** @override */
        _onDragLeftMove(event: any): void;
        /** @inheritDoc */
        _onDragLeftDrop(event: any): void;
        /** @inheritDoc */
        _commitDragLeftDrop(event: any): Promise<void>;
        /** @inheritDoc */
        _onDragLeftCancel(event: any): void;
        /**
         * Create the shape data from the drag start event.
         * @param {PIXI.FederatedEvent} event    The pointer event
         * @returns {object}                     The initial shape data
         * @protected
         */
        _createDragShapeData(event: PIXI.FederatedEvent): object;
        /**
         * Update the drag preview. Called when the shape has changed.
         * @param {PIXI.FederatedEvent} event    The pointer event
         * @protected
         */
        _updateDragPreview(event: PIXI.FederatedEvent): void;
        /** @override */
        _onMouseWheel(event: any): false | undefined;
        /**
         * Create the mouse wheel context.
         * @param {BaseShapeData} shape    The shape that is to be rotated.
         * @returns {object}
         */
        "__#127@#createMouseWheelContext"(shape: BaseShapeData): object;
        /**
         * Commit the mouse wheel rotation update.
         * @returns {Promise<void>}
         */
        "__#127@#commitMouseWheel"(): Promise<void>;
        /**
         * Cancel mouse wheel rotation.
         * @protected
         */
        _cancelMouseWheel(): void;
        /**
         * Rotate the shape of the preview.
         * @param {WheelEvent} event   The mouse wheel event
         */
        _updateMouseWheelShape(event: WheelEvent): void;
        /**
         * Update the mouse wheel rotation preview.
         * @protected
         */
        _updateMouseWheelPreview(): void;
        /**
         * Prepare the database update that should occur as the result of a mouse wheel rotation.
         * @returns {object|[data: object, options?: object]}    The update data and options (optional)
         * @protected
         */
        _prepareMouseWheelUpdate(): object | [data: object, options?: object];
        objects: PIXI.Container /**
         * The mouse wheel context.
         * @type {{preview: PlaceableObject; shape: BaseShapeData}|null}
         * @internal
         */ | null;
        _configPreview: PIXI.Container | null;
        preview: PIXI.
        /**
         * Listen for SHIFT/CTRL keyup events during mouse wheel rotation.
         * @type {() => void}
         */
        Container | null;
        history: foundry.canvas.layers.types.CanvasHistoryEvent[];
        clipboard: {
            objects: PlaceableObject[];
            cut: boolean;
        };
        quadtree: foundry.canvas.geometry.Quadtree | null;
        readonly documentCollection: foundry.documents.abstract.DocumentCollection<any> | null;
        readonly hasPreview: boolean;
        readonly hud: foundry.applications.hud.BasePlaceableHUD<any, any, any> | null;
        readonly paletteCreateData: object;
        readonly placeables: PlaceableObject[];
        readonly controlled: PlaceableObject[];
        controllableObjects(): Generator<PlaceableObject>;
        readonly controlledObjects: Map<string, PlaceableObject>;
        "__#199@#controlledObjects": Map<any, any>;
        hover: PlaceableObject | null;
        "__#199@#hover": null;
        highlightObjects: boolean;
        _throttleRotateMany: (options: object) => Promise<PlaceableObject[]>;
        getMaxSort(): number;
        _sendToBackOrBringToFront(front: boolean): boolean | void;
        _highlightObjects(active: any): void;
        viewedDocuments(): Generator<any, void, unknown>;
        _draw(options: any): Promise<void>;
        createObject(document: ClientDocument): PlaceableObject;
        _activate(): void;
        clearPreviewContainer(): void;
        get(objectId: string): PlaceableObject;
        controlAll(options?: object | undefined): PlaceableObject[];
        releaseAll(options?: object | undefined): number;
        rotateMany({ angle, delta, snap, ids, includeLocked }?: {
            angle?: number | undefined;
            delta?: number | undefined;
            snap?: number | undefined;
            ids?: any[] | undefined;
            includeLocked?: boolean | undefined;
        }): Promise<PlaceableObject[]>;
        moveMany({ dx, dy, dz, rotate, ids, includeLocked }?: {
            dx?: 0 | 1 | -1 | undefined;
            dy?: 0 | 1 | -1 | undefined;
            dz?: 0 | 1 | -1 | undefined;
            rotate?: boolean | undefined;
            ids?: string[] | undefined;
            includeLocked?: boolean | undefined;
        }): Promise<PlaceableObject[]>;
        _prepareKeyboardMovementUpdates(objects: PlaceableObject[], dx: -1 | 0 | 1, dy: -1 | 0 | 1, dz: -1 | 0 | 1): [updates: object[], options?: object];
        _prepareKeyboardRotationUpdates(objects: PlaceableObject[], dx: -1 | 0 | 1, dy: -1 | 0 | 1, dz: -1 | 0 | 1): [updates: object[], options?: object];
        setAllRenderFlags(flags: Record<string, boolean>): void;
        _getMovableObjects(ids: string[] | undefined, includeLocked: boolean): PlaceableObject[];
        _getCopyableObjects(options: {
            cut: boolean;
        }): PlaceableObject[];
        undoHistory(): Promise<Document[]>;
        _onUndoCreate(event: Event): Promise<Document[]>;
        _onUndoUpdate(event: Event): Promise<Document[]>;
        _onUndoDelete(event: Event): Promise<Document[]>;
        deleteAll(): Promise<Document[]>;
        storeHistory(type: "create" | "update" | "delete", data: object[], options?: object | undefined): void;
        _storeHistory(type: "create" | "update" | "delete", data: object[], options?: object | undefined): void;
        copyObjects({ cut }?: {
            cut?: boolean | undefined;
        } | undefined): ReadonlyArray<PlaceableObject>;
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
        } | undefined): PlaceableObject;
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
    /** @inheritDoc */
    readonly layerOptions: object;
    documentName: string;
    readonly placeableClass: typeof PlaceableObject;
    readonly CREATION_STATES: {
        NONE: number;
        POTENTIAL: number;
        CONFIRMED: number;
        COMPLETED: number;
    };
    TOGGLE_PALETTE: Partial<import("../../../applications/ui/scene-controls.mjs").SceneControlTool>;
    prepareSceneControls(): import("../../../applications/ui/scene-controls.mjs").SceneControl | null;
    readonly instance: foundry.canvas.layers.CanvasLayer;
};
import type PlaceablesLayer from "../base/placeables-layer.mjs";
import type PlaceableObject from "../../placeables/placeable-object.mjs";
import { BaseShapeData } from "../../../../common/data/data.mjs";
