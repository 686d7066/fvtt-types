declare const RegionLayer_base: {
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
        _createDragShapeData(event: PIXI.FederatedEvent /** @deprecated since v13 */): object;
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
        _prepareKeyboardRotationUpdates(objects: foundry.canvas.placeables.PlaceableObject[], dx: -1 | 0 | 1, dy: -1 | 0 | 1, dz: -1 | 0 | 1): [updates: object[], options? /**
         * Place a Region at the cursor.
         * The Region can have multiple shapes but must have at least one.
         * Each shape is placed one after the other in the given order.
         * Only one Region can be placed at a time.
         * The placed Region shapes can be rotated with the mouse wheel unless `allowRotation` is false.
         * Left-click confirms the placement of a shape. Right-click skips the placement of a shape.
         * The Region layer is activated unless the Token layer is active.
         * @param {Partial<RegionData>} data          The data of the Region to place
         * @param {RegionPlacementOptions} [options]  Additional options
         * @returns {Promise<RegionDocument|null>}    The Region document that was placed or null if
         *   - the placements of all shapes were skipped unless `allowEmpty` is true,
         *   - the dismiss key was pressed,
         *   - the placement was rejected by `preCommit`,
         *   - the game was paused, the user is not a GM, and the `create` option is true, or
         *   - the Region creation was rejected by preCreate.
         * @example Attach a 10-foot emanation to a token.
         * ```js
         * await canvas.regions.placeRegion({
         *   name: "Aura",
         *   shapes: [{
         *     type: "emanation",
         *     base: {type: "token", x: 0, y: 0, width: 1, height: 1, shape: CONST.TOKEN_SHAPES.RECTANGLE_1},
         *     radius: 10 * canvas.dimensions.distancePixels,
         *     gridBased: true
         *   }],
         *   color: game.user.color,
         *   restriction: {enabled: true},
         *   levels: [canvas.level.id],
         *   highlightMode: "coverage",
         *   displayMeasurements: true,
         *   visibility: CONST.REGION_VISIBILITY.ALWAYS,
         *   ownership: {[game.user.id]: CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER}
         * }, {attachToToken: true});
         * ```
         * @example Place four 40-foot radius circles.
         * ```js
         * const radius = 40 * canvas.dimensions.distancePixels;
         * const shapes = [];
         * for ( let i = 0; i < 4; i++ ) shapes.push({type: "circle", x: 0, y: 0, radius, gridBased: true});
         * await canvas.regions.placeRegion({
         *   name: "Meteor Swarm",
         *   shapes,
         *   color: game.user.color,
         *   restriction: {enabled: true},
         *   levels: [canvas.level.id],
         *   highlightMode: "coverage",
         *   displayMeasurements: true,
         *   visibility: CONST.REGION_VISIBILITY.ALWAYS,
         *   ownership: {[game.user.id]: CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER}
         * });
         * ```
         * @example Spawn 10 tokens with random actor and random rotation in a placed circle with 30 grid units radius.
         * ```js
         * ui.notifications.info("Choose the placement for the spawn area.");
         * const spawnArea = await canvas.regions.placeRegion({
         *   name: "Spawn Area",
         *   shapes: [{
         *     type: "circle",
         *     x: 0,
         *     y: 0,
         *     radius: canvas.dimensions.distancePixels * 30
         *   }],
         *   restriction: {enabled: true},
         *   levels: [canvas.level.id]
         * }, {create: false});
         * if ( spawnArea ) {
         *   const {count: numTokensToSpawn=0} = await foundry.applications.api.DialogV2.input({
         *    window: {
         *       title: "How many tokens to you want to spawn?"
         *    },
         *    content: `<input type="number" name="count" min="0" step="1" value="10">`
         *   }) ?? {};
         *   const actors = game.actors.contents;
         *   const tokensToSpawn = [];
         *   for ( let i = 0; i < numTokensToSpawn; i++ ) {
         *     const actor = actors[Math.floor(Math.random() * actors.length)];
         *     const token = await actor.getTokenDocument({
         *       rotation: Math.random() * 360
         *     }, {parent: spawnArea.parent});
         *     tokensToSpawn.push(token);
         *   }
         *   const spawnedTokens = await spawnArea.spawnTokens(tokensToSpawn);
         * }
         * ```
         */: object];
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
 * @import Region from "../placeables/region.mjs";
 * @import {RegionData} from "../../../common/documents/_types.mjs";
 * @import {Point} from "../../../common/_types.mjs";
 * @import { DatabaseCreateOperation } from "../../../common/abstract/_types.mjs";
 * @import TokenLayer from "./tokens.mjs";
 * @import {RegionPlacementOptions} from "./_types.mjs";
 */
/**
 * The Regions Container.
 * @category Canvas
 */
export default class RegionLayer extends RegionLayer_base {
    /** @inheritdoc */
    static paletteClass: typeof RegionPalette;
    /**
     * The method to sort the Regions.
     * @type {Function}
     */
    static "__#137@#sortRegions": Function;
    /** @override */
    static override prepareSceneControls(): {
        name: string;
        order: number;
        title: string;
        layer: string;
        icon: string;
        visible: boolean;
        onChange: (event: any, active: any) => void;
        onToolChange: (event: any, tool: any, active: any) => void;
        tools: {
            select: {
                name: string;
                order: number;
                title: string;
                icon: string;
                interaction: boolean;
                control: boolean;
                toolclip: {
                    src: string;
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            templateMode: {
                name: string;
                order: number;
                title: string;
                icon: string;
                toggle: boolean;
                active: boolean;
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
                onChange: (event: any, toggled: any) => void;
            };
            rectangle: {
                name: string;
                order: number;
                title: string;
                icon: string;
                control: boolean;
                creation: boolean;
                shapeData: {
                    type: string;
                    x: number;
                    y: number;
                    width: number;
                    height: number;
                };
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            circle: {
                name: string;
                order: number;
                title: string;
                icon: string;
                control: boolean;
                creation: boolean;
                shapeData: {
                    type: string;
                    x: number;
                    y: number;
                    radius: number;
                };
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            ellipse: {
                name: string;
                order: number;
                title: string;
                icon: string;
                visible: boolean;
                control: boolean;
                creation: boolean;
                shapeData: {
                    type: string;
                    x: number;
                    y: number;
                    radiusX: number;
                    radiusY: number;
                };
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            cone: {
                name: string;
                order: number;
                title: string;
                icon: string;
                control: boolean;
                creation: boolean;
                shapeData: {
                    type: string;
                    x: number;
                    y: number;
                    radius: number;
                    angle: number;
                };
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            ring: {
                name: string;
                order: number;
                title: string;
                icon: string;
                control: boolean;
                creation: boolean;
                shapeData: {
                    type: string;
                    x: number;
                    y: number;
                    radius: number;
                    innerWidth: number;
                    outerWidth: any;
                };
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            line: {
                name: string;
                order: number;
                title: string;
                icon: string;
                control: boolean;
                creation: boolean;
                shapeData: {
                    type: string;
                    x: number;
                    y: number;
                    length: number;
                    width: any;
                };
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            emanation: {
                name: string;
                order: number;
                title: string;
                icon: string;
                control: boolean;
                creation: boolean;
                shapeData: {
                    type: string;
                    base: {
                        type: string;
                        x: number;
                        y: number;
                        width: number;
                        height: number;
                        shape: 0 | 4;
                    };
                    radius: number;
                };
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            polygon: {
                name: string;
                order: number;
                title: string;
                icon: string;
                visible: boolean;
                control: boolean;
                creation: boolean;
                shapeData: {
                    type: string;
                    points: number[];
                };
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            hole: {
                name: string;
                order: number;
                title: string;
                icon: string;
                toggle: boolean;
                visible: boolean;
                active: boolean;
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
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            togglePalette: {
                order: number;
                active: boolean;
                visible: any;
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
                 * Is the tool an on-or-off toggle?
                 */
                toggle?: boolean | undefined;
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
    /**
     * The highlight meshes of the Regions.
     * @type {PIXI.Container}
     * @internal
     */
    _highlights: PIXI.Container;
    /**
     * The shape clipboard.
     * @type {{shape: BaseShapeData|null; cut: boolean}}
     * @internal
     */
    _shapeClipboard: {
        shape: BaseShapeData | null;
        cut: boolean;
    };
    /**
     * The placement context.
     * @type {{
     *   data: RegionData;
     *   layer: RegionLayer|TokenLayer;
     *   regionIndex: number;
     *   regionCount: number;
     *   preview: Region;
     *   shapes: BaseShapeData[];
     *   shape: BaseShapeData;
     *   create: boolean;
     *   createOptions: Partial<Omit<DatabaseCreateOperation, "parent">>;
     *   destroyPreview: boolean;
     *   allowRotation: boolean;
     *   allowEmpty: boolean;
     *   attachToToken: boolean;
     *   onMove: (args: {event: PIXI.FederatedEvent; preview: Region;  document: RegionDocument; shape: BaseShapeData;
     *     index: number; count: number; position: Point; snap: boolean}) => boolean|void;
     *   onRotate: (args: {event: WheelEvent; preview: Region; document: RegionDocument; shape: BaseShapeData;
     *     index: number; count: number; precise: boolean}) => boolean|void;
     *   onChange: (args: {preview: Region; document: RegionDocument; shape: BaseShapeData; index: number;
     *     count: number}) => void;
     *   preConfirm: (args: {event: PIXI.FederatedEvent; document: RegionDocument; shape: BaseShapeData;
     *     index: number; count: number}) => boolean|void;
     *   preSkip: (args: {event: PIXI.FederatedEvent; document: RegionDocument; shape: BaseShapeData;
     *     index: number; count: number}) => boolean|void;
     *   preCommit: (documents: ReadonlyArray<RegionDocument>) => Promise<any|void>|void;
     *   resolve: (document: RegionDocument|null) => void;
     *   reject: (error: Error) => void;
     *   rotationNotification: boolean;
     * }|null}
     * @internal
     */
    _placementContext: {
        data: RegionData;
        layer: RegionLayer | TokenLayer;
        regionIndex: number;
        regionCount: number;
        preview: Region;
        shapes: BaseShapeData[];
        shape: BaseShapeData;
        create: boolean;
        createOptions: Partial<Omit<DatabaseCreateOperation, "parent">>;
        destroyPreview: boolean;
        allowRotation: boolean;
        allowEmpty: boolean;
        attachToToken: boolean;
        onMove: (args: {
            event: PIXI.FederatedEvent;
            preview: Region;
            document: RegionDocument;
            shape: BaseShapeData;
            index: number;
            count: number;
            position: Point;
            snap: boolean;
        }) => boolean | void;
        onRotate: (args: {
            event: WheelEvent;
            preview: Region;
            document: RegionDocument;
            shape: BaseShapeData;
            index: number;
            count: number;
            precise: boolean;
        }) => boolean | void;
        onChange: (args: {
            preview: Region;
            document: RegionDocument;
            shape: BaseShapeData;
            index: number;
            count: number;
        }) => void;
        preConfirm: (args: {
            event: PIXI.FederatedEvent;
            document: RegionDocument;
            shape: BaseShapeData;
            index: number;
            count: number;
        }) => boolean | void;
        preSkip: (args: {
            event: PIXI.FederatedEvent;
            document: RegionDocument;
            shape: BaseShapeData;
            index: number;
            count: number;
        }) => boolean | void;
        preCommit: (documents: ReadonlyArray<RegionDocument>) => Promise<any | void> | void;
        resolve: (document: RegionDocument | null) => void;
        reject: (error: Error) => void;
        rotationNotification: boolean;
    } | null;
    set templateMode(value: boolean);
    /**
     * Is Measured Template Mode enabled?
     * @type {boolean}
     */
    get templateMode(): boolean;
    /**
     * Is the palette toggle visible?
     * @type {boolean}
     * @internal
     */
    _togglePaletteVisible: boolean;
    /** @inheritDoc */
    storeHistory(type: any, data: any, options: any): void;
    /** @inheritDoc */
    copyObjects(options: any): readonly foundry.canvas.placeables.PlaceableObject[];
    /** @override */
    override getZIndex(): any;
    /**
     * Highlight the shape or clear the highlight.
     * @param {BaseShapeData|null} shape    The shape to highlight, or null to clear the highlight
     * @internal
     */
    _highlightShape(shape: BaseShapeData | null): void;
    /**
     * Place a Region at the cursor.
     * The Region can have multiple shapes but must have at least one.
     * Each shape is placed one after the other in the given order.
     * Only one Region can be placed at a time.
     * The placed Region shapes can be rotated with the mouse wheel unless `allowRotation` is false.
     * Left-click confirms the placement of a shape. Right-click skips the placement of a shape.
     * The Region layer is activated unless the Token layer is active.
     * @param {Partial<RegionData>} data          The data of the Region to place
     * @param {RegionPlacementOptions} [options]  Additional options
     * @returns {Promise<RegionDocument|null>}    The Region document that was placed or null if
     *   - the placements of all shapes were skipped unless `allowEmpty` is true,
     *   - the dismiss key was pressed,
     *   - the placement was rejected by `preCommit`,
     *   - the game was paused, the user is not a GM, and the `create` option is true, or
     *   - the Region creation was rejected by preCreate.
     * @example Attach a 10-foot emanation to a token.
     * ```js
     * await canvas.regions.placeRegion({
     *   name: "Aura",
     *   shapes: [{
     *     type: "emanation",
     *     base: {type: "token", x: 0, y: 0, width: 1, height: 1, shape: CONST.TOKEN_SHAPES.RECTANGLE_1},
     *     radius: 10 * canvas.dimensions.distancePixels,
     *     gridBased: true
     *   }],
     *   color: game.user.color,
     *   restriction: {enabled: true},
     *   levels: [canvas.level.id],
     *   highlightMode: "coverage",
     *   displayMeasurements: true,
     *   visibility: CONST.REGION_VISIBILITY.ALWAYS,
     *   ownership: {[game.user.id]: CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER}
     * }, {attachToToken: true});
     * ```
     * @example Place four 40-foot radius circles.
     * ```js
     * const radius = 40 * canvas.dimensions.distancePixels;
     * const shapes = [];
     * for ( let i = 0; i < 4; i++ ) shapes.push({type: "circle", x: 0, y: 0, radius, gridBased: true});
     * await canvas.regions.placeRegion({
     *   name: "Meteor Swarm",
     *   shapes,
     *   color: game.user.color,
     *   restriction: {enabled: true},
     *   levels: [canvas.level.id],
     *   highlightMode: "coverage",
     *   displayMeasurements: true,
     *   visibility: CONST.REGION_VISIBILITY.ALWAYS,
     *   ownership: {[game.user.id]: CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER}
     * });
     * ```
     * @example Spawn 10 tokens with random actor and random rotation in a placed circle with 30 grid units radius.
     * ```js
     * ui.notifications.info("Choose the placement for the spawn area.");
     * const spawnArea = await canvas.regions.placeRegion({
     *   name: "Spawn Area",
     *   shapes: [{
     *     type: "circle",
     *     x: 0,
     *     y: 0,
     *     radius: canvas.dimensions.distancePixels * 30
     *   }],
     *   restriction: {enabled: true},
     *   levels: [canvas.level.id]
     * }, {create: false});
     * if ( spawnArea ) {
     *   const {count: numTokensToSpawn=0} = await foundry.applications.api.DialogV2.input({
     *    window: {
     *       title: "How many tokens to you want to spawn?"
     *    },
     *    content: `<input type="number" name="count" min="0" step="1" value="10">`
     *   }) ?? {};
     *   const actors = game.actors.contents;
     *   const tokensToSpawn = [];
     *   for ( let i = 0; i < numTokensToSpawn; i++ ) {
     *     const actor = actors[Math.floor(Math.random() * actors.length)];
     *     const token = await actor.getTokenDocument({
     *       rotation: Math.random() * 360
     *     }, {parent: spawnArea.parent});
     *     tokensToSpawn.push(token);
     *   }
     *   const spawnedTokens = await spawnArea.spawnTokens(tokensToSpawn);
     * }
     * ```
     */
    placeRegion(data: Partial<RegionData>, { create, createOptions, allowRotation, allowEmpty, attachToToken, onMove, onRotate, onChange, preConfirm, preSkip, preCommit, _destroyPreview, _regionIndex, _regionCount }?: RegionPlacementOptions | undefined): Promise<RegionDocument | null>;
    /**
     * Place one or multiple Regions at the cursor.
     * The Region can have multiple shapes but must have at least one.
     * Each Region is placed one after the other in the given order.
     * Each shape of a Region is placed one after the other in the given order.
     * The placed Region shapes can be rotated with the mouse wheel unless `allowRotation` is false.
     * Left-click confirms the placement of a shape. Right-click skips the placement of a shape.
     * @param {Iterable<Partial<RegionData>>} data The data of the Regions to place
     * @param {RegionPlacementOptions} [options]   Additional options
     * @returns {Promise<RegionDocument[]|null>}   The Region documents that were placed and not rejected by preCreate,
     *   or null if
     *   - the placement was rejected by `preCommit`,
     *   - the dismiss key was pressed, or
     *   - the game was paused, the user is not a GM, and the `create` option is true.
     * @example Place three 20-foot token emanations.
     * ```js
     * const data = [];
     * for ( let i = 0; i < 3; i++ ) data.push({
     *   name: `Emanation (${i + 1})`,
     *   shapes: [{
     *     type: "emanation",
     *     base: {
     *       type: "token",
     *       x: 0,
     *       y: 0,
     *       width: 1,
     *       height: 1,
     *       shape: CONST.TOKEN_SHAPES.ELLIPSE_1
     *     },
     *     radius: 20 * canvas.dimensions.distancePixels,
     *     gridBased: true
     *   }],
     *   restriction: {enabled: true},
     *   levels: [canvas.level.id],
     *   displayMeasurements: true,
     *   visibility: CONST.REGION_VISIBILITY.ALWAYS,
     *   ownership: {[game.user.id]: CONST.DOCUMENT_OWNERSHIP_LEVELS.OWNER}
     * });
     * await canvas.regions.placeRegions(data, {attachToToken: true});
     */
    placeRegions(data: Iterable<Partial<RegionData>>, { create, createOptions, allowRotation, allowEmpty, attachToToken, onMove, onRotate, onChange, preConfirm, preSkip, preCommit }?: RegionPlacementOptions | undefined): Promise<RegionDocument[] | null>;
    /** @override */
    override _createDragPreviewData(event: any): {
        name: any;
        color: any;
        levels: (string | null)[];
        restriction: {
            enabled: boolean;
            type: string;
        };
        visibility: 2;
        highlightMode: string;
        displayMeasurements: boolean;
        ownership: {};
    };
    /** @inheritDoc */
    _updateDragPreview(event: any): void;
    /** @inheritDoc */
    _onMouseWheel(event: any): void;
    /**
     * Cancel the placement.
     * @internal
     */
    _cancelPlacement(): void;
    /** @inheritDoc */
    _confirmDeleteKey(documents: any): true | Promise<boolean>;
    #private;
}
import type { Point } from "../../../common/_types.mjs";
import type { RegionData } from "../../../common/documents/_types.mjs";
import type TokenLayer from "./tokens.mjs";
import type Region from "../placeables/region.mjs";
import type { DatabaseCreateOperation } from "../../../common/abstract/_types.mjs";
import RegionDocument from "../../documents/region.mjs";
import type { RegionPlacementOptions } from "./_types.mjs";
import RegionPalette from "../../applications/sheets/palette/region-palette.mjs";
export {};
