export * from "../../common/documents/_types.mjs";
/**
 * The data that is planned to be imported for the adventure, categorized into new documents that will be created and
 * existing documents that will be updated.
 */
export type AdventureImportData = {
    /**
     * Arrays of document data to create, organized by document name
     */
    toCreate: Record<string, object[]>;
    /**
     * Arrays of document data to update, organized by document name
     */
    toUpdate: Record<string, object[]>;
    /**
     * The total count of documents to import
     */
    documentCount: number;
};
/**
 * A callback function that is invoked and awaited during import data preparation before the adventure import proceeds.
 * This can be used to perform custom pre-processing on the import data.
 */
export type AdventurePreImportCallback = (data: AdventureImportData, options: AdventureImportOptions) => Promise<void>;
/**
 * Options which customize how the adventure import process is orchestrated.
 * Modules can use the preImportAdventure hook to extend these options by adding preImport or postImport callbacks.
 */
export type AdventureImportOptions = {
    /**
     * Display a warning dialog if existing documents would be overwritten
     */
    dialog?: boolean | undefined;
    /**
     * A subset of adventure fields to import
     */
    importFields?: string[] | undefined;
    /**
     * An array of awaited pre-import callbacks
     */
    preImport?: AdventurePreImportCallback[] | undefined;
    /**
     * An array of awaited post-import callbacks
     */
    postImport?: AdventurePostImportCallback[] | undefined;
};
/**
 * A report of the world Document instances that were created or updated during the import process.
 */
export type AdventureImportResult = {
    /**
     * Documents created as a result of the import, grouped by document name
     */
    created: Record<string, Document[]>;
    /**
     * Documents updated as a result of the import, grouped by document name
     */
    updated: Record<string, Document[]>;
    /**
     * The server-side timestamp when the content was imported.
     */
    importedTime: number;
};
/**
 * A callback function that is invoked and awaited after import but before the overall import workflow concludes.
 * This can be used to perform additional custom adventure setup steps.
 */
export type AdventurePostImportCallback = (result: AdventureImportResult, options: AdventureImportOptions) => Promise<void>;
/**
 * {@ignore}
 */
export type _ActiveEffectChangeData = {
    /**
     * The parent Effect
     */
    effect?: ActiveEffect | undefined;
    /**
     * The order in which this change is applied among other changes in a common phase
     */
    priority: number;
};
/**
 * {@interface}
 */
export type ActiveEffectChangeData = EffectChangeData & _ActiveEffectChangeData;
/**
 * A function to render a stringified HTMLLIElement in the changes tab of {@link ActiveEffectConfig}
 */
export type ActiveEffectChangeRenderer = (context: {
    change: object;
    index: number;
    fields: DataSchema;
    defaultPriority: number;
}) => Promise<string>;
/**
 * A function that applies the change to a document
 */
export type ActiveEffectChangeHandler = (targetDoc: Actor | Item | TokenDocument, change: ActiveEffectChangeData, options?: {
    field?: DataField | undefined;
    replacementData?: Record<string, unknown> | undefined;
    modifyTarget?: boolean | undefined;
} | undefined) => Promise<Record<string, unknown> | void>;
/**
 * {@ignore}
 */
export type _ActiveEffectDuration = {
    /**
     * The total duration in seconds
     */
    seconds: number | null;
    /**
     * The remaining effect duration in a quantity of the configured unit
     */
    remaining: number;
    /**
     * The remaining effect duration in seconds, given it is possible to express
     */
    secondsRemaining?: number | undefined;
    /**
     * A formatted string label that represents the remaining duration
     */
    label: string;
    /**
     * An internal flag used determine when to recompute seconds-based duration
     */
    _worldTime?: number | undefined;
    /**
     * An internal flag used determine when to recompute turns-based duration
     */
    _combatTime?: number | undefined;
};
/**
 * {@interface}
 */
export type ActiveEffectDuration = EffectDurationData & _ActiveEffectDuration;
/**
 * A node of a Folder-content tree
 */
export type FolderChildNode = {
    /**
     * Whether this is the root node of a tree
     */
    root: boolean;
    /**
     * The Folder document represented by this node
     */
    folder: Folder;
    /**
     * This node's depth number in the tree
     */
    depth: number;
    /**
     * Whether the Folder is visible to the current User
     */
    visible: boolean;
    /**
     * Child nodes of this node
     */
    children: FolderChildNode[];
    /**
     * Loose contents in this node
     */
    entries: Document[] | CompendiumCollection<Document>[];
};
export type CombatHistoryData = {
    round: number;
    turn: number | null;
    tokenId: string | null;
    combatantId: string | null;
};
export type CombatTurnEventContext = {
    /**
     * The round
     */
    round: number;
    /**
     * The turn
     */
    turn: number;
    /**
     * Was skipped?
     */
    skipped: boolean;
};
export type CombatRoundEventContext = Omit<CombatTurnEventContext, "turn">;
export type RegionEvent<Data = object> = {
    /**
     * The name of the event
     */
    name: string;
    /**
     * The data of the event
     */
    data: object;
    /**
     * The Region the event was triggered on
     */
    region: RegionDocument;
    /**
     * The User that triggered the event
     */
    user: User;
};
export type RegionRegionBoundaryEvent = RegionEvent<{}>;
export type RegionRegionAnimationEvent = RegionEvent<{}>;
export type RegionBehaviorActivatedEvent = RegionEvent<{}>;
export type RegionBehaviorDeactivatedEvent = RegionEvent<{}>;
export type RegionBehaviorViewedEvent = RegionEvent<{}>;
export type RegionBehaviorUnviewedEvent = RegionEvent<{}>;
export type RegionTokenEnterExitEventData = {
    /**
     * The Token that entered/exited the Region
     */
    token: TokenDocument;
    /**
     * The movement if the Token entered/exited by moving out of the Region
     */
    movement: TokenMovementOperation | null;
};
export type RegionTokenEnterExitEvent = RegionEvent<RegionTokenEnterExitEventData>;
export type RegionTokenEnterEvent = RegionTokenEnterExitEvent;
export type RegionTokenExitEvent = RegionTokenEnterExitEvent;
export type RegionTokenMoveEventData = {
    /**
     * The Token that moved into/out of/within the Region
     */
    token: TokenDocument;
    /**
     * The movement
     */
    movement: TokenMovementOperation;
};
export type RegionTokenMoveEvent = RegionEvent<RegionTokenMoveEventData>;
export type RegionTokenMoveInEvent = RegionTokenMoveEvent;
export type RegionTokenMoveOutEvent = RegionTokenMoveEvent;
export type RegionTokenMoveWithinEvent = RegionTokenMoveEvent;
export type RegionTokenAnimateEventData = {
    /**
     * The Token that animated into/out of the Region
     */
    token: TokenDocument;
    /**
     * The position of the Token when it moved into/out of the Region
     */
    position: TokenPosition;
};
export type RegionTokenAnimateEvent = RegionEvent<RegionTokenAnimateEventData>;
export type RegionTokenAnimateInEvent = RegionTokenAnimateEvent;
export type RegionTokenAnimateOutEvent = RegionTokenAnimateEvent;
export type RegionTokenTurnEventData = {
    /**
     * The Token that started/ended its Combat turn
     */
    token: TokenDocument;
    /**
     * The Combatant of the Token that started/ended its Combat turn
     */
    combatant: Combatant;
    /**
     * The Combat
     */
    combat: Combat;
    /**
     * The round of this turn
     */
    round: number;
    /**
     * The turn that started/ended
     */
    turn: number;
    /**
     * Was the turn skipped?
     */
    skipped: boolean;
};
export type RegionTokenTurnEvent = RegionEvent<RegionTokenTurnEventData>;
export type RegionTokenTurnStartEvent = RegionTokenTurnEvent;
export type RegionTokenTurnEndEvent = RegionTokenTurnEvent;
export type RegionTokenRoundEventData = {
    /**
     * The Token
     */
    token: TokenDocument;
    /**
     * The Combatant of the Token
     */
    combatant: Combatant;
    /**
     * The Combat
     */
    combat: Combat;
    /**
     * The round that started/ended
     */
    round: number;
    /**
     * Was the round skipped?
     */
    skipped: boolean;
};
export type RegionTokenRoundEvent = RegionEvent<RegionTokenRoundEventData>;
export type RegionTokenRoundStartEvent = RegionTokenRoundEvent;
export type RegionTokenRoundEndEvent = RegionTokenRoundEvent;
export type RegionMovementSegment = {
    /**
     * The type of this segment (see {@link CONST.REGION_MOVEMENT_SEGMENTS}).
     */
    type: RegionMovementSegmentType;
    /**
     * The waypoint that this segment starts from.
     */
    from: ElevatedPoint;
    /**
     * The waypoint that this segment goes to.
     */
    to: ElevatedPoint;
    /**
     * Teleport between the waypoints?
     */
    teleport: boolean;
};
export type RegionSegmentizeMovementPathWaypoint = {
    /**
     * The x-coordinate in pixels (integer).
     */
    x: number;
    /**
     * The y-coordinate in pixels (integer).
     */
    y: number;
    /**
     * The elevation in grid units.
     */
    elevation: number;
    /**
     * Teleport from the previous to this waypoint? Default: `false`.
     */
    teleport?: boolean | undefined;
};
/**
 * An object containing the executed Roll and the produced results
 */
export type RollTableDraw = {
    /**
     * The Dice roll which generated the draw
     */
    roll: Roll;
    /**
     * An array of drawn TableResult documents
     */
    results: TableResult[];
};
export type SceneDimensions = {
    /**
     * The width of the canvas.
     */
    width: number;
    /**
     * The height of the canvas.
     */
    height: number;
    /**
     * The grid size.
     */
    size: number;
    /**
     * The canvas rectangle.
     */
    rect: PIXI.Rectangle;
    /**
     * The X coordinate of the scene rectangle within the larger canvas.
     */
    sceneX: number;
    /**
     * The Y coordinate of the scene rectangle within the larger canvas.
     */
    sceneY: number;
    /**
     * The width of the scene.
     */
    sceneWidth: number;
    /**
     * The height of the scene.
     */
    sceneHeight: number;
    /**
     * The scene rectangle.
     */
    sceneRect: PIXI.Rectangle;
    /**
     * The number of distance units in a single grid space.
     */
    distance: number;
    /**
     * The factor to convert distance units to pixels.
     */
    distancePixels: number;
    /**
     * The units of distance.
     */
    units: string;
    /**
     * The aspect ratio of the scene rectangle.
     */
    ratio: number;
    /**
     * The length of the longest line that can be drawn on the canvas.
     */
    maxR: number;
    /**
     * The number of grid rows on the canvas.
     */
    rows: number;
    /**
     * The number of grid columns on the canvas.
     */
    columns: number;
};
export type SceneViewOptions = {
    /**
     * The ID of the Level to view
     */
    level?: string | undefined;
    /**
     * The IDs of initially controlled tokens
     */
    controlledTokens?: string[] | undefined;
    /**
     * The transition animation to used when viewing the scene
     */
    transition?: {
        /**
         * The type of the transition animation
         */
        type?: string | undefined;
        /**
         * The duration of the transition animation
         */
        duration?: number | undefined;
    } | undefined;
};
export type TrackedAttributesDescription = {
    /**
     * A list of property key arrays to attributes with both a value and a max property.
     */
    bar: string[][];
    /**
     * A list of property key arrays to attributes that have only a value property.
     */
    value: string[][];
};
export type TokenMovementWaypoint = {
    /**
     * The top-left x-coordinate in pixels (integer).
     * Default: the previous or source x-coordinate.
     */
    x: number;
    /**
     * The top-left y-coordinate in pixels (integer).
     * Default: the previous or source y-coordinate.
     */
    y: number;
    /**
     * The elevation in grid units.
     * Default: the previous or source elevation.
     */
    elevation: number;
    /**
     * The width in grid spaces (positive).
     * Default: the previous or source width.
     */
    width: number;
    /**
     * The height in grid spaces (positive).
     * Default: the previous or source height.
     */
    height: number;
    /**
     * The depth in grid spaces (nonnegative).
     * Default: the previous or source depth.
     */
    depth: number;
    /**
     * The shape type (see {@link CONST.TOKEN_SHAPES}).
     * Default: the previous or source shape.
     */
    shape: TokenShapeType;
    /**
     * The level ID. Default: the previous or source level ID.
     */
    level: string;
    /**
     * The movement action from the previous to this waypoint.
     * Default: the prepared movement action.
     */
    action: string;
    /**
     * Was this waypoint snapped to the grid? Default: `false`.
     */
    snapped: boolean;
    /**
     * Was this waypoint explicitly placed by the user? Default: `false`.
     */
    explicit: boolean;
    /**
     * Is this waypoint a checkpoint? There's an update/movement operation
     * for each checkpoint in a movement path. At a checkpoint the movement
     * can be stopped or paused. Default: `false`.
     */
    checkpoint: boolean;
};
/**
 * {@ignore}
 */
export type _TokenProcessedMovementWaypoint = {
    /**
     * The terrain data of this segment. Default: `null`.
     */
    terrain: DataModel | null;
    /**
     * Is this waypoint intermediate? Default: `false`.
     */
    intermediate: boolean;
};
/**
 * {@interface}
 */
export type TokenProcessedMovementWaypoint = TokenMovementWaypoint & _TokenProcessedMovementWaypoint;
/**
 * {@ignore}
 */
export type _TokenMeasuredMovementWaypoint = {
    /**
     * The ID of the user that moved the token to from the previous to this waypoint.
     */
    userId: string;
    /**
     * The ID of the movement from the previous to this waypoint, or null if pending
     * but not planned.
     */
    movementId: string | null;
    /**
     * The ID of the subpath, which is equal to the movement ID of the first waypoint
     * in the subpath.
     */
    subpathId: string;
    /**
     * The movement cost from the previous to this waypoint (nonnegative).
     */
    cost: number;
};
/**
 * {@interface}
 */
export type TokenMeasuredMovementWaypoint = TokenProcessedMovementWaypoint & _TokenMeasuredMovementWaypoint;
export type TokenMovementSegmentData = {
    /**
     * The width in grid spaces (positive).
     */
    width: number;
    /**
     * The height in grid spaces (positive).
     */
    height: number;
    /**
     * The depth in grid spaces (nonnegative).
     */
    depth: number;
    /**
     * The shape type (see {@link CONST.TOKEN_SHAPES}).
     */
    shape: TokenShapeType;
    /**
     * The level ID.
     */
    level: string;
    /**
     * The movement action of this segment.
     */
    action: string;
    /**
     * The config of the movement action.
     */
    actionConfig: TokenMovementActionConfig;
    /**
     * The terrain data of this segment.
     */
    terrain: DataModel | null;
    /**
     * Teleported?
     */
    teleport: boolean;
};
export type TokenMeasurableMovementWaypointData = {
    /**
     * A predetermined cost (nonnegative) or cost function
     *     to be used instead of `options.cost`.
     */
    cost?: number | TokenMovementCostFunction | undefined;
};
export type TokenMeasurableMovementWaypoint = Partial<TokenProcessedMovementWaypoint> & TokenMeasurableMovementWaypointData;
export type TokenMovementCostFunction = GridMeasurePathCostFunction3D<TokenMovementSegmentData>;
export type TokenMovementCostAggregator = (results: Array<DeepReadonly<{
    from: GridOffset3D;
    to: GridOffset3D;
    cost: number;
}>>, distance: number, segment: DeepReadonly<TokenMovementSegmentData>) => number;
export type TokenRegionMovementSegment = {
    /**
     * The type of this segment (see {@link CONST.REGION_MOVEMENT_SEGMENTS}).
     */
    type: RegionMovementSegmentType;
    /**
     * The waypoint that this segment starts from.
     */
    from: TokenPosition;
    /**
     * The waypoint that this segment goes to.
     */
    to: TokenPosition;
    /**
     * The movement action between the waypoints.
     */
    action: string;
    /**
     * The terrain data of this segment.
     */
    terrain: DataModel | null;
    /**
     * Is the destination snapped to the grid?
     */
    snapped: boolean;
};
export type TokenMovementSectionData = {
    /**
     * The waypoints of the movement path
     */
    waypoints: TokenMeasuredMovementWaypoint[];
    /**
     * The distance of the movement path
     */
    distance: number;
    /**
     * The cost of the movement path
     */
    cost: number;
    /**
     * The number of spaces moved along the path
     */
    spaces: number;
    /**
     * The number of diagonals moved along the path
     */
    diagonals: number;
};
export type TokenMovementHistoryData = {
    /**
     * The recorded waypoints of the movement path
     */
    recorded: TokenMovementSectionData;
    /**
     * The unrecored waypoints of the movement path
     */
    unrecorded: TokenMovementSectionData;
    /**
     * The distance of the combined movement path
     */
    distance: number;
    /**
     * The cost of the combined movement path
     */
    cost: number;
    /**
     * The number of spaces moved along the combined path
     */
    spaces: number;
    /**
     * The number of diagonals moved along the combined path
     */
    diagonals: number;
};
export type TokenMovementMethod = "api" | "config" | "hud" | "dragging" | "keyboard" | "paste" | "undo";
export type TokenMovementState = "completed" | "paused" | "planned" | "pending" | "stopped";
/**
 * The token movement data that describes the current/last movement of the token.
 * NONE of the properties are writable.
 */
export type TokenMovementData = {
    /**
     * The ID of the movement
     */
    id: string;
    /**
     * The ID of the subpath, which is equal to the movement ID of the first
     * waypoint in the subpath
     */
    subpathId: string;
    /**
     * The chain of prior movement IDs that this movement is a continuation of
     */
    chain: string[];
    /**
     * The origin of movement
     */
    origin: TokenPosition;
    /**
     * The destination of movement
     */
    destination: TokenPosition;
    /**
     * The waypoints and measurements of the passed path
     */
    passed: TokenMovementSectionData;
    /**
     * The waypoints and measurements of the pending path
     */
    pending: TokenMovementSectionData;
    /**
     * The waypoints and measurements of the history path
     */
    history: TokenMovementHistoryData;
    /**
     * Was a new subpath started?
     */
    split: boolean;
    /**
     * Was the movement constrained?
     */
    constrained: boolean;
    /**
     * Was the movement recorded in the movement history?
     */
    recorded: boolean;
    /**
     * The method of movement
     */
    method: TokenMovementMethod;
    /**
     *                                         The terrain movement options
     */
    terrainOptions: Omit<TokenCreateTerrainMovementPathOptions, "preview">;
    /**
     *                                         The options to constrain movement
     */
    constrainOptions: Omit<TokenConstrainMovementPathOptions, "preview" | "history" | "measureOptions">;
    /**
     *                                         The options to measure movement
     */
    measureOptions: Omit<TokenMeasureMovementPathOptions, "preview">;
    /**
     * Automatically rotate the token in the direction of movement?
     */
    autoRotate: boolean;
    /**
     * Show the ruler during the movement animation of the token?
     */
    showRuler: boolean;
    /**
     * The user that moved the token
     */
    user: User;
    /**
     * The state of the movement
     */
    state: TokenMovementState;
    /**
     * The update options of the movement operation
     */
    updateOptions: object;
    /**
     * The promise that resolves once the entire movement is finished.
     * It resolves to true if the movement completed, otherwise false.
     */
    finished: Promise<boolean>;
    /**
     *   The promise that resolves when the animation of this movement starts, the promise that resolves when
     *   the animation of this movement ends, and the duration of the animation of this movement.
     */
    animation: {
        started: Promise<void>;
        ended: Promise<void>;
        duration: number;
    };
};
/**
 * The pre-movement operation data of a token movement.
 * ONLY `autoRotate` and `showRuler` are writable.
 */
export type TokenPreMovementOperation = {
    /**
     * The ID of the movement.
     * This property is NOT writable.
     */
    id: string;
    /**
     * The ID of the subpath, which is equal to the movement ID of the first
     * waypoint in the subpath.
     * This property is NOT writable.
     */
    subpathId: string;
    /**
     * The chain of prior movement IDs that this movement is a continuation of.
     * This property is NOT writable.
     */
    chain: string[];
    /**
     * The origin of movement.
     * This property is NOT writable.
     */
    origin: TokenPosition;
    /**
     * The destination of movement.
     * This property is NOT writable.
     */
    destination: TokenPosition;
    /**
     * The waypoints and measurements of the passed path.
     * This property is NOT writable.
     */
    passed: TokenMovementSectionData;
    /**
     * The waypoints and measurements of the pending path.
     * This property is NOT writable.
     */
    pending: TokenMovementSectionData;
    /**
     * The waypoints and measurements of the history path.
     * This property is NOT writable.
     */
    history: TokenMovementHistoryData;
    /**
     * Was a new subpath started?
     * This property is NOT writable.
     */
    split: boolean;
    /**
     * Was the movement constrained?
     * This property is NOT writable.
     */
    constrained: boolean;
    /**
     * Was the movement recorded in the movement history?
     * This property is NOT writable.
     */
    recorded: boolean;
    /**
     * The method of movement.
     * This property is NOT writable.
     */
    method: TokenMovementMethod;
    /**
     *                                         The terrain movement options.
     *                                         This property is NOT writable.
     */
    terrainOptions: Omit<TokenCreateTerrainMovementPathOptions, "preview">;
    /**
     *                                         The options to constrain movement.
     *                                         This property is NOT writable.
     */
    constrainOptions: Omit<TokenConstrainMovementPathOptions, "preview" | "history" | "measureOptions">;
    /**
     *                                         The options to measure movement.
     *                                         This property is NOT writable.
     */
    measureOptions: Omit<TokenMeasureMovementPathOptions, "preview">;
    /**
     * Automatically rotate the token in the direction of movement?
     * This property IS writable.
     */
    autoRotate: boolean;
    /**
     * Show the ruler during the movement animation of the token?
     * This property IS writable.
     */
    showRuler: boolean;
};
/**
 * The (post-)movement operation data of a token movement.
 * NONE of the properties are writable.
 */
export type TokenMovementOperation = {
    /**
     * The ID of the movement
     */
    id: string;
    /**
     * The ID of the subpath, which is equal to the movement ID of the first
     * waypoint in the subpath.
     */
    subpathId: string;
    /**
     * The chain of prior movement IDs that this movement is a continuation of
     */
    chain: string[];
    /**
     * The origin of movement
     */
    origin: TokenPosition;
    /**
     * The destination of movement
     */
    destination: TokenPosition;
    /**
     * The waypoints and measurements of the passed path
     */
    passed: TokenMovementSectionData;
    /**
     * The waypoints and measurements of the pending path
     */
    pending: TokenMovementSectionData;
    /**
     * The waypoints and measurements of the history path
     */
    history: TokenMovementHistoryData;
    /**
     * Was a new subpath started?
     */
    split: boolean;
    /**
     * Was the movement constrained?
     */
    constrained: boolean;
    /**
     * Was the movement recorded in the movement history?
     */
    recorded: boolean;
    /**
     * The method of movement
     */
    method: TokenMovementMethod;
    /**
     *                                         The terrain movement options
     */
    terrainOptions: Omit<TokenCreateTerrainMovementPathOptions, "preview">;
    /**
     *                                         The options to constrain movement
     */
    constrainOptions: Omit<TokenConstrainMovementPathOptions, "preview" | "history" | "measureOptions">;
    /**
     *                                         The options to measure movement
     */
    measureOptions: Omit<TokenMeasureMovementPathOptions, "preview">;
    /**
     * Automatically rotate the token in the direction of movement?
     */
    autoRotate: boolean;
    /**
     * Show the ruler during the movement animation of the token?
     */
    showRuler: boolean;
    /**
     * The promise that resolves once the entire movement is finished.
     * It resolves to true if the movement completed, otherwise false.
     */
    finished: Promise<boolean>;
    /**
     *   The promise that resolves when the animation of this movement starts, the promise that resolves when
     *   the animation of this movement ends, and the duration of the animation of this movement.
     */
    animation: {
        started: Promise<void>;
        ended: Promise<void>;
        duration: number;
    };
};
export type TokenMovementInstructionOptions = {
    /**
     * The movement ID, which must be unique. Default: auto-generated.
     */
    id?: string | undefined;
    /**
     * The method of movement. Default: {@link TokenMovementOptions#method}.
     */
    method?: TokenMovementMethod | undefined;
    /**
     * Automatically rotate the token in the direction of movement?
     * Default: {@link TokenMovementOptions#autoRotate}.
     */
    autoRotate?: boolean | undefined;
    /**
     * Show the ruler during the movement animation of the token?
     * Default: {@link TokenMovementOptions#showRuler}.
     */
    showRuler?: boolean | undefined;
    /**
     * The terrain movement options. Default: {@link TokenMovementOptions#terrainOptions}.
     */
    terrainOptions?: Omit<TokenCreateTerrainMovementPathOptions, "preview"> | undefined;
    /**
     * The options to constrain movement. Default: {@link TokenMovementOptions#constrainOptions}.
     */
    constrainOptions?: Omit<TokenConstrainMovementPathOptions, "preview" | "history" | "measureOptions"> | undefined;
    /**
     * The options to measure movement.
     * Default: {@link TokenMovementOptions#measureOptions}.
     */
    measureOptions?: Omit<TokenMeasureMovementPathOptions, "preview"> | undefined;
    /**
     * Start a new subpath? Default: {@link TokenMovementOptions#split}.
     */
    split?: boolean | undefined;
    /**
     * Don't start the movement yet? Default: {@link TokenMovementOptions#planned}.
     */
    planned?: boolean | undefined;
};
export type TokenMovementInstructionDestination = {
    /**
     * The destination which may include additional
     * token data.
     */
    destination: Partial<TokenData & TokenMovementWaypoint>;
};
export type TokenMovementInstructionWaypoints = {
    /**
     * The waypoints to move the token through.
     */
    waypoints: Partial<TokenMovementWaypoint>[];
};
export type TokenMovementInstruction = (TokenMovementInstructionDestination | TokenMovementInstructionWaypoints) & TokenMovementInstructionOptions;
/**
 * Resize the Token such that its center point remains (almost) unchanged. The center point might change
 * slightly because the new (x, y) position is rounded.
 */
export type TokenResizingInstruction = {
    /**
     *                                           The new dimensions and additional data.
     */
    dimensions: Partial<Omit<TokenData & TokenMovementWaypoint, "x" | "y" | "elevation">>;
    /**
     * The movement ID, which must be unique. Default: auto-generated.
     */
    id?: string | undefined;
    /**
     * The method of movement. Default: {@link TokenMovementOptions#method}.
     */
    method?: TokenMovementMethod | undefined;
    /**
     * Resizing never auto rotates.
     */
    autoRotate?: false | undefined;
    /**
     * Resizing never shows the ruler.
     */
    showRuler?: false | undefined;
    /**
     * Resizing doesn't move through terrain.
     */
    terrainOptions?: {} | undefined;
    /**
     * Resizing always ignores walls, surfaces and
     *   impassable terrain.
     */
    constrainOptions?: {
        ignoreWalls: true;
        ignoreCost: true;
    } | undefined;
    /**
     * Resizing doesn't cost anything.
     */
    measureOptions?: {} | undefined;
    /**
     * Start a new subpath? Default: {@link TokenMovementOptions#split}.
     */
    split?: boolean | undefined;
    /**
     * Don't start the movement yet? Default: {@link TokenMovementOptions#planned}.
     */
    planned?: boolean | undefined;
};
export type TokenMovementOptions = {
    /**
     * The movement ID, which must be unique. Default: auto-generated.
     */
    id?: string | undefined;
    /**
     * The method of movement. Default: `"api"`.
     */
    method?: TokenMovementMethod | undefined;
    /**
     * Automatically rotate the token in the direction of movement? Default:
     * `game.settings.get("core", "tokenAutoRotate")` if `method` is `"dragging"` or `"keyboard"` otherwise `false`.
     */
    autoRotate?: boolean | undefined;
    /**
     * Show the ruler during the movement animation of the token? Default: `true` if
     * `method` is `"dragging"` otherwise `false`.
     * duration of movement. Default: `false`.
     */
    showRuler?: boolean | undefined;
    /**
     * The terrain movement options.
     */
    terrainOptions?: Omit<TokenCreateTerrainMovementPathOptions, "preview"> | undefined;
    /**
     * The options to constrain movement.
     */
    constrainOptions?: Omit<TokenConstrainMovementPathOptions, "preview" | "history" | "measureOptions"> | undefined;
    /**
     * The options to measure movement.
     */
    measureOptions?: Omit<TokenMeasureMovementPathOptions, "preview"> | undefined;
    /**
     * Start a new subpath? Default: `false` if it's movement
     *                            without history or keyboard movement that follows keyboard
     *                            movement, otherwise `true`.
     */
    split?: boolean | undefined;
    /**
     * Don't start the movement yet? Default: `false`.
     */
    planned?: boolean | undefined;
    /**
     * Pan the canvas (with transition animation) to the destination
     *     if the token is controlled? Default: `true`.
     */
    pan?: boolean | TokenPanningOptions | undefined;
    /**
     * Animate movement. Default: `true`.
     */
    animate?: boolean | undefined;
    /**
     * The animation options.
     */
    animation?: {
        /**
         * The duration of the animation in milliseconds (nonnegative).
         */
        duration?: number | undefined;
        /**
         * The base movement speed in grid size per second (positive).
         */
        movementSpeed?: number | undefined;
        /**
         * Set the duration of non-movement properties to the animation.
         */
        linkToMovement?: boolean | undefined;
        /**
         * The easing function of the animation of non-movement
         * properties. Default: `undefined` (linear).
         */
        easing?: CanvasAnimationEasingFunction | undefined;
    } | undefined;
};
export type TokenMovementContinuationData = {
    /**
     * The movement continuation ID, which is equal to the movement ID
     * unless planned, in which case the continuation ID is the
     * movement ID with the ".planned" suffix
     */
    id: string;
    /**
     * The number of continuations
     */
    continueCounter: number;
    /**
     * Was continued?
     */
    continued: boolean;
    /**
     * The continuation promise
     */
    continuePromise: Promise<boolean> | null;
    /**
     * The promise to wait for before continuing movement
     */
    waitPromise: Promise<void>;
    /**
     * Resolve function of the wait promise
     */
    resolveWaitPromise: () => {} | undefined;
    /**
     * The promise that resolves after the update workflow
     */
    postWorkflowPromise: Promise<void>;
    /**
     * The movement continuation states
     */
    states: {
        [movementId: string]: {
            handles: Map<string | symbol | null, TokenMovementContinuationHandle>;
            callbacks: Array<(continued: boolean) => void>;
            pending: Set<string>;
        };
    };
};
export type TokenMovementContinuationHandle = {
    /**
     * The continuation ID
     */
    continuationID: string;
    /**
     * The continuation callback
     */
    callback: () => Promise<boolean>;
    /**
     * The continuation promise
     */
    continuePromise: Promise<boolean> | undefined;
};
export type TokenResumeMovementCallback = () => Promise<boolean>;
export type WallCategory = "door" | "ethereal" | "invisible" | "normal" | "secret" | "terrain" | "window" | "blank";
export type RegionSurface = {
    /**
     * A key that uniquely identifies the surface
     */
    key: string;
    /**
     * The region of the surface
     */
    region: RegionDocument;
    /**
     * The elevation of the surface
     */
    elevation: number;
    /**
     * Does the surface restrict light?
     */
    light: boolean;
    /**
     * Does the surface restrict movement?
     */
    move: boolean;
    /**
     * Does the surface restrict sight?
     */
    sight: boolean;
    /**
     * Does the surface restrict sound?
     */
    sound: boolean;
    /**
     * Does the surface cause occlusion?
     */
    occlusion: boolean;
    /**
     * Does the surface cause exposure?
     */
    exposure: boolean;
    /**
     * Does the surface cause culling?
     */
    culling: boolean;
};
import type { Document } from "../../common/abstract/_module.mjs";
import type { ActiveEffect } from "./_module.mjs";
import type { EffectChangeData } from "../../common/documents/_types.mjs";
import type { DataSchema } from "../../common/abstract/_types.mjs";
import type { Actor } from "./_module.mjs";
import type { TokenDocument } from "./_module.mjs";
import type { DataField } from "../../common/data/fields.mjs";
import type { EffectDurationData } from "../../common/documents/_types.mjs";
import type { Folder } from "./_module.mjs";
import type { CompendiumCollection } from "./collections/_module.mjs";
import type { RegionDocument } from "./_module.mjs";
import type { User } from "./_module.mjs";
import type { TokenPosition } from "../../common/documents/_types.mjs";
import type { Combatant } from "./_module.mjs";
import type { Combat } from "./_module.mjs";
import type { RegionMovementSegmentType } from "../../common/constants.mjs";
import type { ElevatedPoint } from "../_types.mjs";
import type Roll from "../dice/roll.mjs";
import type { TableResult } from "./_module.mjs";
import type { TokenShapeType } from "../../common/constants.mjs";
import type { DataModel } from "../../common/abstract/_module.mjs";
import type { TokenMovementActionConfig } from "../_types.mjs";
import type { GridMeasurePathCostFunction3D } from "../../common/grid/_types.mjs";
import type { GridOffset3D } from "../../common/grid/_types.mjs";
import type { DeepReadonly } from "../_types.mjs";
import type { TokenCreateTerrainMovementPathOptions } from "../_types.mjs";
import type { TokenConstrainMovementPathOptions } from "../_types.mjs";
import type { TokenMeasureMovementPathOptions } from "../_types.mjs";
import type { TokenData } from "../../common/documents/_types.mjs";
import type { TokenPanningOptions } from "../_types.mjs";
import type { CanvasAnimationEasingFunction } from "../canvas/animation/_types.mjs";
