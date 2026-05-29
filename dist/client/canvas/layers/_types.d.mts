export type AmbientSoundPlaybackConfig = {
    /**
     * The Sound node which should be controlled for playback
     */
    sound: Sound;
    /**
     * The SoundSource which defines the area of effect for the sound
     */
    source: PointSoundSource;
    /**
     * An AmbientSound object responsible for the sound, or undefined
     */
    object: AmbientSound;
    /**
     * The coordinates of the closest listener or undefined if there is none
     */
    listener: ElevatedPoint;
    /**
     * The minimum distance between a listener and the AmbientSound origin
     */
    distance: number;
    /**
     * Is the closest listener muffled
     */
    muffled: boolean;
    /**
     * Is playback constrained or muffled by walls and surfaces?
     */
    walls: boolean;
    /**
     * The final volume at which the Sound should be played
     */
    volume: number;
};
export type CanvasHistoryEvent = {
    /**
     * The type of operation stored as history
     */
    type: "create" | "update" | "delete";
    /**
     * The data corresponding to the action which may later be un-done
     */
    data: object[];
    /**
     * The options of the undo operation
     */
    options: object;
};
export type PlaceablesLayerOptions = {
    /**
     * Can placeable objects in this layer be controlled?
     */
    controllableObjects: boolean;
    /**
     * Can placeable objects in this layer be rotated?
     */
    rotatableObjects: boolean;
    /**
     * Can placeable objects in this layer be moved via keyboard?
     */
    keyboardMovableObjects: boolean;
    /**
     * Confirm placeable object deletion with a dialog?
     */
    confirmDeleteKey: boolean;
    /**
     *   Confirm before creating the drawn object (for the given tools)?
     */
    confirmBeforeCreation: boolean | string[] | (() => boolean);
    /**
     *   Control the drawn object that has been created (for the given tools)?
     */
    controlObjectAfterCreation: boolean | string[] | (() => boolean);
    /**
     * The class used to represent an object on this layer.
     */
    objectClass: PlaceableObject;
    /**
     * Does this layer use a quadtree to track object positions?
     */
    quadtree: boolean;
};
export type _CanvasVisionContainerSight = {
    /**
     * FOV that should not be committed to fog exploration.
     */
    preview: PIXI.LegacyGraphics;
};
/**
 * The sight part of {@link foundry.canvas.layers.types.CanvasVisionContainer}.
 * The blend mode is MAX_COLOR.
 */
export type CanvasVisionContainerSight = PIXI.LegacyGraphics & _CanvasVisionContainerSight;
export type _CanvasVisionContainerLight = {
    /**
     * FOV that should not be committed to fog exploration.
     */
    preview: PIXI.LegacyGraphics;
    /**
     * The sprite with the texture of FOV of cached light sources.
     */
    cached: SpriteMesh;
    /**
     * The light perception polygons of vision
     * sources and the FOV of vision sources that
     * provide vision.
     */
    mask: PIXI.LegacyGraphics & {
        preview: PIXI.LegacyGraphics;
    };
};
/**
 * The light part of {@link foundry.canvas.layers.types.CanvasVisionContainer}.
 * The blend mode is MAX_COLOR.
 */
export type CanvasVisionContainerLight = PIXI.LegacyGraphics & _CanvasVisionContainerLight;
export type _CanvasVisionContainerDarkness = {
    /**
     * Darkness source erasing fog of war.
     */
    darkness: PIXI.LegacyGraphics;
};
/**
 * The sight part of {@link foundry.canvas.layers.types.CanvasVisionContainer}.
 * The blend mode is ERASE.
 */
export type CanvasVisionContainerDarkness = PIXI.LegacyGraphics & _CanvasVisionContainerDarkness;
export type _CanvasVisionContainer = {
    /**
     * Areas visible because of light sources and light perception.
     */
    light: CanvasVisionContainerLight;
    /**
     * Areas visible because of FOV of vision sources.
     */
    sight: CanvasVisionContainerSight;
    /**
     * Areas erased by darkness sources.
     */
    darkness: CanvasVisionContainerDarkness;
};
/**
 * The currently visible areas.
 */
export type CanvasVisionContainer = PIXI.Container & _CanvasVisionContainer;
export type RegionPlacementOptions = {
    /**
     * Create the Region? If false, the preview document is returned.
     *   Default: `true`. Non-GMs cannot create Regions while the game is paused.
     */
    create?: boolean | undefined;
    /**
     * Optional creation options.
     * By default the creation option `controlObject` is true.
     */
    createOptions?: Partial<Omit<DatabaseCreateOperation, "parent">> | undefined;
    /**
     * Allow rotation of the Region? Default: `true`.
     */
    allowRotation?: boolean | undefined;
    /**
     * Create/return an empty Region if all shapes are skipped?
     *     Default: `false`.
     */
    allowEmpty?: boolean | undefined;
    /**
     * Attach the Region to Tokens? If true, the initial elevation range
     * passed in `data` is relative to the attached Token. Default: `false`.
     */
    attachToToken?: boolean | undefined;
    /**
     * Called when the pointer is moved and after starting the placement of the next shape on confirm and skip. This
     * callback replaces the default behavior if false is returned. If false is returned, the callback should modify
     * the passed `shape` and may additionally modify `preview.document` and set the render flags on `preview`
     * corresponding to the applied changes.
     */
    onMove?: ((args: {
        event: PIXI.FederatedEvent;
        preview: Region;
        document: RegionDocument;
        regionIndex: number;
        regionCount: number;
        shape: BaseShapeData;
        shapeIndex: number;
        shapeCount: number;
        position: Point;
        snap: boolean;
    }) => boolean | void) | undefined;
    /**
     * Called when the mouse wheel is scrolled. This callback replaces the default behavior if false is returned.
     * If false is returned, the callback should modify the `shape` and may additionally modify `preview.document`
     * and set the render flags on `preview` corresponding to the applied changes.
     */
    onRotate?: ((args: {
        event: WheelEvent;
        preview: Region;
        document: RegionDocument;
        regionIndex: number;
        regionCount: number;
        shape: BaseShapeData;
        shapeIndex: number;
        shapeCount: number;
        precise: boolean;
    }) => boolean | void) | undefined;
    /**
     * Called when the Region shape that is placed has changed.
     */
    onChange?: ((args: {
        preview: Region;
        document: RegionDocument;
        regionIndex: number;
        regionCount: number;
        shape: BaseShapeData;
        shapeIndex: number;
        shapeCount: number;
    }) => void) | undefined;
    /**
     * Called before the confirmation (left-click) of a shape placement. This callback may return false to prevent
     * the placement of the Region shape and display a warning.
     */
    preConfirm?: ((args: {
        event: PIXI.FederatedEvent;
        document: RegionDocument;
        regionIndex: number;
        regionCount: number;
        shape: BaseShapeData;
        shapeIndex: number;
        shapeCount: number;
    }) => boolean | void) | undefined;
    /**
     * Called before skipping (right-click) of a shape placement. This callback may return false to prevent
     * skipping of the Region shape and display a warning.
     */
    preSkip?: ((args: {
        event: PIXI.FederatedEvent;
        document: RegionDocument;
        regionIndex: number;
        regionCount: number;
        shape: BaseShapeData;
        shapeIndex: number;
        shapeCount: number;
    }) => boolean | void) | undefined;
    /**
     * Called at the end of the workflow before the Region documents are created/returned. This callback may return
     * a falsely value other than undefined to prevent the Regions from being created/returned.
     */
    preCommit?: ((documents: ReadonlyArray<RegionDocument>) => Promise<any | void> | void) | undefined;
};
import type Sound from "../../audio/sound.mjs";
import type PointSoundSource from "../sources/point-sound-source.mjs";
import type { AmbientSound } from "../placeables/_module.mjs";
import type { ElevatedPoint } from "../../_types.mjs";
import type { PlaceableObject } from "../placeables/_module.mjs";
