declare const SoundsLayer_base: {
    new (): {
        _mouseWheelContext: {
            preview: foundry.canvas.placeables.PlaceableObject;
            shape: foundry.data.BaseShapeData;
        } | null;
        "__#127@#mouseWheelKeyUpListener": () => void;
        readonly "__#127@#multipleShapes": boolean;
        "__#127@#getTargetedObjects"(): foundry.canvas.placeables.PlaceableObject[];
        getSnappedPoint(point: any): Point;
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
 * @import Collection from "../../../common/utils/collection.mjs";
 * @import {ElevatedPoint, Point} from "../../_types.mjs";
 * @import {AmbientSoundPlaybackConfig} from "./_types.mjs";
 * @import {PointEffectSourceData} from "../sources/point-effect-source.mjs";
 * @import {PositionalSoundPlaybackOptions} from "../../audio/sound.mjs";
 */
/**
 * This Canvas Layer provides a container for AmbientSound objects.
 * @category Canvas
 */
export default class SoundsLayer extends SoundsLayer_base {
    /** @inheritdoc */
    static paletteClass: typeof AmbientSoundPalette;
    /** @override */
    static override prepareSceneControls(): {
        name: string;
        order: number;
        title: string;
        layer: string;
        icon: string;
        visible: boolean;
        onChange: (_event: any, active: any) => void;
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
            sound: {
                name: string;
                order: number;
                title: string;
                icon: string;
                interaction: boolean;
                control: boolean;
                creation: boolean;
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            preview: {
                name: string;
                order: number;
                title: string;
                icon: string;
                toggle: boolean;
                active: any;
                onChange: (_event: any, toggled: any) => void;
                toolclip: {
                    heading: string;
                    items: {
                        paragraph: string;
                    }[];
                };
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
            clear: {
                name: string;
                order: number;
                title: string;
                icon: string;
                onChange: () => any;
                button: boolean;
            };
        };
        activeTool: string;
    };
    constructor(...args: any[]);
    /**
     * Track whether to actively preview ambient sounds with mouse cursor movements
     * @type {boolean}
     */
    livePreview: boolean;
    /**
     * A mapping of ambient audio sources which are active within the rendered Scene
     * @type {Collection<string, PointSoundSource>}
     */
    sources: Collection<string, PointSoundSource>;
    /**
     * Initialize all AmbientSound sources which are present on this layer
     */
    initializeSources(): void;
    /**
     * Update all AmbientSound effects in the layer by toggling their playback status.
     * Sync audio for the positions of tokens which are capable of hearing.
     * @param {object} [options={}]   Additional options forwarded to AmbientSound synchronization
     */
    refresh(options?: object | undefined): void;
    /**
     * Preview ambient audio for a given position
     * @param {Point|ElevatedPoint} position    The position to preview
     */
    previewSound(position: Point | ElevatedPoint): void;
    /**
     * Terminate playback of all ambient audio sources
     */
    stopAll(): void;
    /**
     * Get an array of listener positions for Tokens which are able to hear environmental sound.
     * @returns {ElevatedPoint[]}
     */
    getListenerPositions(): ElevatedPoint[];
    /**
     * Sync the playing state and volume of all AmbientSound objects based on the position of listener points
     * @param {ElevatedPoint[]} listeners    Locations of listeners which have the capability to hear
     * @param {object} [options={}]          Additional options forwarded to AmbientSound synchronization
     * @protected
     */
    protected _syncPositions(listeners: ElevatedPoint[], options?: object | undefined): void;
    /**
     * Configure playback by assigning the muffled state and final playback volume for the sound.
     * This method should mutate the config object by assigning the volume and muffled properties.
     * @param {AmbientSoundPlaybackConfig} config
     * @internal
     */
    _configurePlayback(config: AmbientSoundPlaybackConfig): void;
    /**
     * Actions to take when the darkness level of the Scene is changed
     * @param {PIXI.FederatedEvent} event
     * @internal
     */
    _onDarknessChange(event: PIXI.FederatedEvent): void;
    /**
     * Play a one-shot Sound originating from a predefined point on the canvas.
     * The sound plays locally for the current client only.
     * To play a sound for all connected clients use {@link SoundsLayer#emitAtPosition}.
     *
     * @param {string} src                    The sound source path to play
     * @param {Point|ElevatedPoint} origin    The canvas coordinates from which the sound originates
     * @param {number} radius                 The radius of effect in distance units
     * @param {PositionalSoundPlaybackOptions} options  Options passed to {@link Sound#playAtPosition}
     * @returns {Promise<Sound|null>}         A Promise which resolves to the played Sound, or null
     *
     * @example Play the sound of a trap springing
     * ```js
     * const src = "modules/my-module/sounds/spring-trap.ogg";
     * const origin = {x: 5200, y: 3700};  // The origin point for the sound
     * const radius = 30;                  // Audible in a 30-foot radius
     * await canvas.sounds.playAtPosition(src, origin, radius);
     * ```
     *
     * @example A Token casts a spell
     * ```js
     * const src = "modules/my-module/sounds/spells-sprite.ogg";
     * const origin = token.center;         // The origin point for the sound
     * const radius = 60;                   // Audible in a 60-foot radius
     * await canvas.sounds.playAtPosition(src, origin, radius, {
     *   walls: false,                      // Not constrained by walls and surfaces with a lowpass muffled effect
     *   muffledEffect: {type: "lowpass", intensity: 6},
     *   sourceData: {
     *     angle: 120,                      // Sound emitted at a limited angle
     *     rotation: 270                    // Configure the direction of sound emission
     *   }
     *   playbackOptions: {
     *     loopStart: 12,                   // Audio sprite timing
     *     loopEnd: 16,
     *     fade: 300,                      // Fade-in 300ms
     *     onended: () => console.log("Do something after the spell sound has played")
     *   }
     * });
     * ```
     */
    playAtPosition(src: string, origin: Point | ElevatedPoint, radius: number, options?: PositionalSoundPlaybackOptions): Promise<Sound | null>;
    /**
     * Emit playback to other connected clients to occur at a specified position.
     * @param {...*} args           Arguments passed to SoundsLayer#playAtPosition
     * @returns {Promise<void>}     A Promise which resolves once playback for the initiating client has completed
     */
    emitAtPosition(...args: any[]): Promise<void>;
    /**
     * Handle mouse cursor movements which may cause ambient audio previews to occur
     * @param {PIXI.Point} currentPos
     * @internal
     */
    _onMouseMove(currentPos: PIXI.Point): void;
    /** @override */
    override _createDragShapeData(event: any): {
        type: string;
        x: number;
        y: number;
        radius: number;
    };
    /** @override */
    override _updateDragPreview(event: any): void;
    /**
     * Handle PlaylistSound document drop data.
     * @param {DragEvent} event  The drag drop event
     * @param {object} data      The dropped transfer data.
     * @protected
     */
    protected _onDropData(event: DragEvent, data: object): Promise<false | foundry.canvas.placeables.PlaceableObject>;
    #private;
}
import type { Point } from "../../_types.mjs";
import type Collection from "../../../common/utils/collection.mjs";
import type { ElevatedPoint } from "../../_types.mjs";
import type { AmbientSoundPlaybackConfig } from "./_types.mjs";
import type { PositionalSoundPlaybackOptions } from "../../audio/sound.mjs";
import Sound from "../../audio/sound.mjs";
import AmbientSoundPalette from "../../applications/sheets/palette/ambient-sound-palette.mjs";
export {};
