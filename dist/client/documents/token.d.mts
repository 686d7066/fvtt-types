/**
 * @import {DeepReadonly, ElevatedPoint, Point, TokenConstrainMovementPathOptions} from "../_types.mjs";
 * @import {RegionEventType, TokenShapeType} from "../../common/constants.mjs";
 * @import {
 *   TokenMeasuredMovementWaypoint, TokenResumeMovementCallback, TokenMovementContinuationData,
 *   TokenMovementCostFunction, TokenMovementData, TokenMovementOperation, TokenMovementSegmentData,
 *   TokenMovementWaypoint, TokenRegionMovementSegment, TokenProcessedMovementWaypoint,
 *   TrackedAttributesDescription, TokenMovementContinuationHandle, TokenMovementMethod,
 *   TokenMovementCostAggregator, TokenPreMovementOperation,
 *   TokenMovementOptions, TokenMeasurableMovementWaypoint
 * } from "./_types.mjs";
 * @import {TokenData, TokenDimensions, TokenOverrides, TokenPosition} from "../../common/documents/_types.mjs";
 * @import {Actor, Combat, Combatant, RegionDocument, Scene, User} from "./_module.mjs";
 * @import {DatabaseUpdateOperation, DatabaseWriteOperation} from "../../common/abstract/_types.mjs";
 * @import Collection from "../../common/utils/collection.mjs";
 * @import DataModel from "../../common/abstract/data.mjs";
 * @import {SchemaField} from "../../common/data/fields.mjs";
 * @import {BaseGrid, HexagonalGrid} from "../../common/grid/_module.mjs";
 * @import {GridMeasurePathResult, GridMeasurePathWaypointData3D, GridOffset3D} from "../../common/grid/_types.mjs";
 */
/**
 * The client-side Token document which extends the common BaseToken document model.
 *
 * The following fields must no be altered from source during data preparation:
 * `x`, `y`, `elevation`, `width`, `height`, `depth`, `shape`, `level`.
 *
 * ### Hook Events
 * - {@link hookEvents.moveToken}
 * - {@link hookEvents.pauseToken}
 * - {@link hookEvents.preMoveToken}
 * - {@link hookEvents.stopToken}
 * - {@link hookEvents.recordToken}
 *
 * @extends BaseToken
 * @mixes CanvasDocumentMixin
 * @category Documents
 *
 * @see {@link foundry.documents.Scene}: The Scene document type which contains Token documents
 * @see {@link foundry.applications.sheets.TokenConfig}: The Token configuration application
 */
export default class TokenDocument extends BaseToken {
    /**
     * Keys targetable by a ActiveEffectChanges. Width, height, depth, and shape are included but not automatically
     * applied to Token data.
     * @readonly
     * @internal
     */
    static readonly _ACTIVE_EFFECT_TARGETABLE_KEYS: readonly ["name", "width", "height", "depth", "shape", "texture", "alpha", "disposition", "light", "sight", "detectionModes", "ring", "turnMarker", "movementAction", "flags"];
    /**
     * A global guard which prevents ActorDelta documents from materializing until after all world documents are first
     * initialized. While true, the `TokenDocument#actor` getter will return null instead of the synthetic Actor instance.
     * This guard is released upon completion of `Game#initializeDocuments`.
     * @type {boolean}
     * @internal
     */
    static _preventActorDeltaAccess: boolean;
    /**
     * The key that is used to start (resume) planned (initially paused) movement.
     * @type {symbol}
     */
    static "__#200@#START_MOVEMENT_KEY": symbol;
    /**
     * Shared rectangle instance.
     * @type {PIXI.Rectangle}
     */
    static "__#200@#SHARED_RECTANGLE": PIXI.Rectangle;
    /**
     * The list of movement operation properties that are writeable in preUpdateMovement.
     * @type {string[]}
     */
    static "__#200@#WRITEABLE_MOVEMENT_OPERATION_PROPERTIES": string[];
    /**
     * Infer the subject texture path if one is existing.
     * @param {string} src        The path to test.
     * @returns {string|null}     The inferred path, or null otherwise.
     */
    static "__#200@#inferSubjectTexture"(src: string): string | null;
    /**
     * Remove waypoints that were added to measure the path correctly.
     * @param {(ElevatedPoint & GridMeasurePathWaypointData3D & TokenMovementSegmentData)[]} path   The measurement path
     * @param {GridMeasurePathResult} result                                                        The measurement result
     */
    static "__#200@#removeResizeSegmentsFromMeasurementResult"(path: (ElevatedPoint & GridMeasurePathWaypointData3D & TokenMovementSegmentData)[], result: GridMeasurePathResult): void;
    /**
     * Create the cost function for {@link foundry.grid.BaseGrid#measurePath}.
     * The `from` and `to` parameters of the cost function are top-left offsets
     * ({@link foundry.documents.BaseToken##getTopLeftGridOffset}).
     * @param {BaseGrid} grid                                    The grid
     * @param {TokenMovementCostFunction|number|undefined} cost  The cost function for a single step or predetermined cost
     * @param {TokenMovementCostAggregator} aggregator           The cost aggregator
     * @param {number} width                                     The width in grid spaces (positive)
     * @param {number} height                                    The height in grid spaces (positive)
     * @param {number} depth                                     The depth in grid spaces (nonnegative)
     * @param {TokenShapeType} shape                             The shape (one of {@link CONST.TOKEN_SHAPES})
     * @returns {TokenMovementCostFunction|number|undefined}     The cost function for measuring
     */
    static "__#200@#createMovementCostFunction"(grid: BaseGrid, cost: TokenMovementCostFunction | number | undefined, aggregator: TokenMovementCostAggregator, width: number, height: number, depth: number, shape: TokenShapeType): TokenMovementCostFunction | number | undefined;
    /**
     * Create the cost function for {@link foundry.grid.SquareGrid#measurePath}.
     * @param {TokenMovementCostFunction} cost         The cost function for a single step
     * @param {TokenMovementCostAggregator} aggregator The cost aggregator
     * @param {number} width                           The width in grid spaces (positive)
     * @param {number} height                          The height in grid spaces (positive)
     * @param {number} depth                           The depth in grid spaces (nonnegative)
     * @returns {TokenMovementCostFunction}            The combined cost function
     */
    static "__#200@#createSquareMovementCostFunction"(cost: TokenMovementCostFunction, aggregator: TokenMovementCostAggregator, width: number, height: number, depth: number): TokenMovementCostFunction;
    /**
     * Create the cost function for {@link foundry.grid.HexagonalGrid#measurePath}.
     * @param {HexagonalGrid} grid                       The hexagonal grid
     * @param {TokenMovementCostFunction} cost           The cost function for a single step
     * @param {TokenMovementCostAggregator} aggregator   The cost aggregator
     * @param {number} width                             The width in grid spaces (positive)
     * @param {number} height                            The height in grid spaces (positive)
     * @param {number} depth                             The depth in grid spaces (nonnegative)
     * @param {TokenShapeType} shape                     The shape type (one of {@link CONST.TOKEN_SHAPES})
     * @returns {TokenMovementCostFunction}              The combined cost function
     */
    static "__#200@#createHexagonalMovementCostFunction"(grid: HexagonalGrid, cost: TokenMovementCostFunction, aggregator: TokenMovementCostAggregator, width: number, height: number, depth: number, shape: TokenShapeType): TokenMovementCostFunction;
    /**
     * Create or remove Combatants for an array of provided Token objects.
     * @param {TokenDocument[]} tokens      The tokens which should be added to the Combat
     * @param {object} [options={}]         Options which modify the toggle operation
     * @param {Combat} [options.combat]       A specific Combat instance which should be modified. If undefined, the
     *                                        current active combat will be modified if one exists. Otherwise, a new
     *                                        Combat encounter will be created if the requesting user is a Gamemaster.
     * @returns {Promise<Combatant[]>}      An array of created Combatant documents
     */
    static createCombatants(tokens: TokenDocument[], { combat }?: {
        combat?: Combat | undefined;
    } | undefined): Promise<Combatant[]>;
    /**
     * Remove Combatants for the array of provided Tokens.
     * @param {TokenDocument[]} tokens      The tokens which should removed from the Combat
     * @param {object} [options={}]         Options which modify the operation
     * @param {Combat} [options.combat]       A specific Combat instance from which Combatants should be deleted
     * @returns {Promise<Combatant[]>}      An array of deleted Combatant documents
     */
    static deleteCombatants(tokens: TokenDocument[], { combat }?: {
        combat?: Combat | undefined;
    } | undefined): Promise<Combatant[]>;
    /** @inheritDoc */
    static _preCreateOperation(documents: any, operation: any, user: any): Promise<false | undefined>;
    /** @inheritDoc */
    static _preUpdateOperation(documents: any, operation: any, user: any): Promise<false | undefined>;
    /** @type {TOKEN_SHAPES[]} */
    static "__#200@#VALID_SHAPES": Readonly<{
        readonly ELLIPSE_1: 0;
        readonly ELLIPSE_2: 1;
        readonly TRAPEZOID_1: 2;
        readonly TRAPEZOID_2: 3;
        readonly RECTANGLE_1: 4;
        readonly RECTANGLE_2: 5;
    }>[];
    /** @type {Set<string>} */
    static "__#200@#VALID_MOVEMENT_WAYPOINT_PROPERTIES": Set<string>;
    /**
     * Finalize movement operation.
     * @param {TokenDocument[]} documents           Document instances to be updated
     * @param {DatabaseUpdateOperation} operation   Parameters of the database update operation
     * @param {User} user                           The User requesting the update operation
     */
    static "__#200@#preUpdateOperationMovement"(documents: TokenDocument[], operation: DatabaseUpdateOperation, user: User): void;
    /**
     * Convert a set of {x, y, elevation} changes in a Token document update into an array of waypoints.
     * @param {TokenDocument} document
     * @param {Partial<TokenData>} changes
     * @param {DatabaseUpdateOperation} operation
     * @returns {TokenMovementWaypoint[]}
     */
    static "__#200@#inferMovementWaypoints"(document: TokenDocument, changes: Partial<TokenData>, operation: DatabaseUpdateOperation): TokenMovementWaypoint[];
    /**
     * Filter nonintermediate waypoints.
     * @param {TokenMeasuredMovementWaypoint[]} waypoints    The waypoints
     * @returns {TokenMovementWaypoint[]}                    The nonintermediate waypoints
     */
    static "__#200@#filterNonintermediateWaypoints"(waypoints: TokenMeasuredMovementWaypoint[]): TokenMovementWaypoint[];
    /**
     * Identify and update the regions this Token is going to be in if necessary.
     * @param {TokenDocument[]} documents           Document instances to be updated
     * @param {DatabaseUpdateOperation} operation   Parameters of the database update operation
     */
    static "__#200@#preUpdateOperationRegions"(documents: TokenDocument[], operation: DatabaseUpdateOperation): void;
    /** @inheritDoc */
    static _onCreateOperation(documents: any, operation: any, user: any): Promise<void>;
    /**
     * Add deprecated getters for the teleport and forced option.
     * @param {DatabaseUpdateOperation} operation
     * @internal
     * @deprecated since v13
     */
    static _addTeleportAndForcedShims(operation: DatabaseUpdateOperation): void;
    /** @inheritDoc */
    static _onUpdateOperation(documents: any, operation: any, user: any): Promise<void>;
    /**
     * Handle TOKEN_ENTER, TOKEN_EXIT, TOKEN_MOVE_IN, and TOKEN_MOVE_OUT region events.
     * @param {TokenDocument[]} documents           Document instances to be updated
     * @param {DatabaseUpdateOperation} operation   Parameters of the database update operation
     * @param {User} user                           The User requesting the update operation
     */
    static "__#200@#onUpdateHandleEnterExitMoveInOutRegionEvents"(documents: TokenDocument[], operation: DatabaseUpdateOperation, user: User): void;
    /**
     * Handle {@link TokenDocument#_onUpdateMovement} and `moveToken` hook calls.
     * @param {TokenDocument[]} documents           Document instances to be updated
     * @param {DatabaseUpdateOperation} operation   Parameters of the database update operation
     * @param {User} user                           The User requesting the update operation
     */
    static "__#200@#onUpdateOperationMovement"(documents: TokenDocument[], operation: DatabaseUpdateOperation, user: User): void;
    /**
     * Handle TOKEN_MOVE_WITHIN region events.
     * @param {TokenDocument[]} documents           Document instances to be updated
     * @param {DatabaseUpdateOperation} operation   Parameters of the database update operation
     * @param {User} user                           The User requesting the update operation
     */
    static "__#200@#onUpdateHandleMoveWithinRegionEvents"(documents: TokenDocument[], operation: DatabaseUpdateOperation, user: User): void;
    /**
     * Continue movement for tokens which are on a multi-checkpoint path of waypoints.
     * @param {TokenDocument[]} documents           Document instances to be updated
     * @param {DatabaseUpdateOperation} operation   Parameters of the database update operation
     * @param {User} user                           The User requesting the update operation
     * @returns {Promise<void>}                     This function must not be awaited!
     */
    static "__#200@#onUpdateContinueMovement"(documents: TokenDocument[], operation: DatabaseUpdateOperation, user: User): Promise<void>;
    /** @inheritDoc */
    static _onDeleteOperation(documents: any, operation: any, user: any): Promise<void>;
    /**
     * Are these changes moving the Token (from the given origin if provided)?
     * @param {object} changes          The (candidate) changes
     * @param {TokenPosition} [origin]  The origin
     * @returns {boolean}               Is movement?
     * @internal
     */
    static _isMovementUpdate(changes: object, origin?: TokenPosition | undefined): boolean;
    /**
     * Get an Array of attribute choices which could be tracked for Actors in the Combat Tracker
     * @param {object|DataModel|typeof DataModel|SchemaField|string} [data]  The object to explore for attributes, or an
     *                                                                       Actor type.
     * @param {string[]} [_path]
     * @returns {TrackedAttributesDescription}
     */
    static getTrackedAttributes(data?: string | object | typeof DataModel | DataModel<object, foundry.abstract.types.DataModelConstructionContext> | SchemaField | undefined, _path?: string[] | undefined): TrackedAttributesDescription;
    /**
     * Retrieve an Array of attribute choices from a plain object.
     * @param {object} data  The object to explore for attributes.
     * @param {string[]} _path
     * @returns {TrackedAttributesDescription}
     * @protected
     */
    protected static _getTrackedAttributesFromObject(data: object, _path?: string[]): TrackedAttributesDescription;
    /**
     * Retrieve an Array of attribute choices from a SchemaField.
     * @param {SchemaField} schema  The schema to explore for attributes.
     * @param {string[]} _path
     * @returns {TrackedAttributesDescription}
     * @protected
     */
    protected static _getTrackedAttributesFromSchema(schema: SchemaField, _path?: string[]): TrackedAttributesDescription;
    /**
     * Retrieve any configured attributes for a given Actor type.
     * @param {string} [type]  The Actor type.
     * @returns {TrackedAttributesDescription|void}
     * @protected
     */
    protected static _getConfiguredTrackedAttributes(type?: string | undefined): TrackedAttributesDescription | void;
    /**
     * Inspect the Actor data model and identify the set of attributes which could be used for a Token Bar.
     * @param {object} attributes       The tracked attributes which can be chosen from
     * @returns {object}                A nested object of attribute choices to display
     */
    static getTrackedAttributeChoices(attributes: object): object;
    /**
     * Property overrides copied from this TokenDocument's associated Actor
     * @type {Record<string, unknown>}
     * @protected
     */
    protected overrides: Record<string, unknown>;
    /**
     * Old overrides for synthetic actors, kept separately due to particularities of ActorDelta data re-initialization
     * @type {Record<string, unknown>|null}
     * @private
     */
    private _priorOverrides;
    /**
     * A semantically-intuitive alias of {@link TokenDocument#parent}
     * @type {Scene|null}
     */
    get scene(): Scene | null;
    /**
     * The current movement data of this Token document.
     * @type {TokenMovementData}
     * @see {@link TokenDocument#move}
     */
    get movement(): TokenMovementData;
    /**
     * @type {TokenMovementData}
     * @internal
     */
    _movement: TokenMovementData;
    /**
     * The movement continuation state of this Token document.
     * @type {TokenMovementContinuationData}
     * @internal
     */
    _movementContinuation: TokenMovementContinuationData;
    /**
     * The movement promises with their resolvers.
     * @type {Map<string, Promise<boolean>>}
     * @internal
     */
    _returnedMovementPromises: Map<string, Promise<boolean>>;
    /**
     * The attachments of this Token.
     * @type {Readonly<{regions: ReadonlySet<RegionDocument>}>}
     * @readonly
     */
    readonly attachments: Readonly<{
        regions: ReadonlySet<RegionDocument>;
    }>;
    /**
     * A singleton collection which holds a reference to the synthetic token actor by its base actor's ID.
     * @type {Collection<string, Actor>}
     */
    actors: Collection<string, Actor>;
    /**
     * A reference to the Actor this Token modifies.
     * If actorLink is true, then the document is the primary Actor document.
     * Otherwise, the Actor document is a synthetic (ephemeral) document constructed using the Token's ActorDelta.
     * This synthetic Actor instance is only available after `Game#initializeDocuments` is complete.
     * @type {Actor|null}
     */
    get actor(): Actor | null;
    /**
     * A reference to the base, World-level Actor this token represents.
     * @type {Actor|null}
     */
    get baseActor(): Actor | null;
    /**
     * An indicator for whether the current User has full control over this Token document.
     * @type {boolean}
     */
    get isOwner(): boolean;
    /**
     * Test whether this TokenDocument would produce an ActorDelta if materialized.
     * @type {boolean}
     */
    get isLazyDelta(): boolean;
    /**
     * Force construction of the ActorDelta for this unlinked TokenDocument, bypassing the initialization guard.
     * @returns {Actor|null}
     * @internal
     */
    _forceDeltaActor(): Actor | null;
    /**
     * A workflow which occurs when the ActorDelta for an unlinked TokenDocument is materialized for the first time.
     * At the point this method is called, the delta property has transitioned from a lazy getter to a concrete value.
     * @protected
     */
    protected _onDeltaMaterialized(): void;
    /**
     * A convenient reference for whether this TokenDocument is linked to the Actor it represents, or is a synthetic copy
     * @type {boolean}
     */
    get isLinked(): boolean;
    /**
     * Does this TokenDocument have the SECRET disposition and is the current user lacking the necessary permissions
     * that would reveal this secret?
     * @type {boolean}
     */
    get isSecret(): boolean;
    /**
     * Return a reference to a Combatant that represents this Token, if one is present in the current encounter.
     * @type {Combatant|null}
     */
    get combatant(): Combatant | null;
    /**
     * An indicator for whether this Token is currently involved in the active combat encounter.
     * @type {boolean}
     */
    get inCombat(): boolean;
    /**
     * The movement history.
     * @type {TokenMeasuredMovementWaypoint[]}
     */
    get movementHistory(): TokenMeasuredMovementWaypoint[];
    /**
     * Check if the document has a distinct subject texture (inferred or explicit).
     * @type {boolean}
     */
    get hasDistinctSubjectTexture(): boolean;
    /**
     * The Regions this Token is currently in.
     * @type {Set<RegionDocument>}
     */
    regions: Set<RegionDocument>;
    /** @override */
    override includedInLevel(level: any): any;
    /** @inheritDoc */
    _initialize(options?: {}): void;
    /** @inheritDoc */
    prepareData(): void;
    /** @override */
    override prepareBaseData(): void;
    alpha: any;
    /** @inheritDoc */
    prepareEmbeddedDocuments(): void;
    /** @inheritDoc */
    prepareDerivedData(): void;
    /**
     * Infer the subject texture path to use for a token ring.
     * @returns {string}
     * @protected
     */
    protected _inferRingSubjectTexture(): string;
    /**
     * Infer the movement action.
     * The default implementation returns `CONFIG.Token.movement.defaultAction`.
     * @returns {string}
     * @protected
     */
    protected _inferMovementAction(): string;
    /**
     * Extend data in attribute-bar properties.
     * @protected
     */
    protected _prepareBars(): void;
    /**
     * Prepare detection modes which are available to the Token.
     * Ensure that every Token has the basic sight detection mode configured.
     * @protected
     */
    protected _prepareDetectionModes(): void;
    /**
     * A helper method to retrieve the underlying data behind one of the Token's attribute bars
     * @param {string} barName                The named bar to retrieve the attribute for
     * @param {object} [options]
     * @param {string} [options.alternative]  An alternative attribute path to get instead of the default one
     * @returns {object|null}                 The attribute displayed on the Token bar, if any
     */
    getBarAttribute(barName: string, { alternative }?: {
        alternative?: string | undefined;
    } | undefined): object | null;
    /**
     * Test whether a Token has a specific status effect.
     * @param {string} statusId     The status effect ID as defined in CONFIG.statusEffects
     * @returns {boolean}           Does the Actor of the Token have this status effect?
     */
    hasStatusEffect(statusId: string): boolean;
    /**
     * Move the Token through the given waypoint(s).
     *
     * ## Movement API
     *
     * ### Movement Control
     * - {@link TokenDocument#movement}
     * - {@link TokenDocument#movementHistory}
     * - {@link TokenDocument#move}
     * - {@link TokenDocument#resize}
     * - {@link TokenDocument#startMovement}
     * - {@link TokenDocument#pauseMovement}
     * - {@link TokenDocument#resumeMovement}
     * - {@link TokenDocument#stopMovement}
     * - {@link TokenDocument#clearMovementHistory}
     * - {@link TokenDocument#revertRecordedMovement}
     * - {@link TokenDocument#_shouldRecordMovementHistory}
     * - {@link foundry.documents.Scene#moveTokens}
     *
     * ### Hook Events / Document Event Handlers
     * - {@link hookEvents.preMoveToken} / {@link TokenDocument#_preUpdateMovement}
     * - {@link hookEvents.moveToken} / {@link TokenDocument#_onUpdateMovement}
     * - {@link hookEvents.pauseToken} / {@link TokenDocument#_onMovementPaused}
     * - {@link hookEvents.stopToken} / {@link TokenDocument#_onMovementStopped}
     * - {@link hookEvents.recordToken} / {@link TokenDocument#_onMovementRecorded}
     * - {@link hookEvents.planToken} / {@link TokenDocument#_onMovementPlanned}
     *
     * ### Movement Action
     * - {@link CONFIG.Token.movement | CONFIG.Token.movement.actions}
     * - {@link CONFIG.Token.movement | CONFIG.Token.movement.defaultAction}
     * - {@link TokenDocument#movementAction}
     * - {@link TokenDocument#_inferMovementAction}
     * - {@link foundry.canvas.placeables.Token#_getDragMovementAction}
     * - {@link foundry.canvas.placeables.Token#_getHUDMovementAction}
     * - {@link foundry.canvas.placeables.Token#_getKeyboardMovementAction}
     *
     * ### Movement Cost
     * - {@link CONFIG.Token.movement | CONFIG.Token.movement.costAggregator}
     * - {@link TokenDocument#measureMovementPath}
     * - {@link foundry.canvas.placeables.Token#measureMovementPath}
     * - {@link foundry.canvas.placeables.Token#_getMovementCostFunction}
     *
     * ### Movement Constraints, Terrain, and Pathfinding
     * - {@link CONFIG.Token.movement | CONFIG.Token.movement.TerrainData}
     * - {@link TokenDocument#getCompleteMovementPath}
     * - {@link TokenDocument#segmentizeRegionMovementPath}
     * - {@link foundry.canvas.placeables.Token#findMovementPath}
     * - {@link foundry.canvas.placeables.Token#constrainMovementPath}
     * - {@link foundry.canvas.placeables.Token#recalculatePlannedMovementPath}
     * - {@link foundry.canvas.placeables.Token#createTerrainMovementPath}
     * - {@link foundry.data.TerrainData}
     * - {@link foundry.data.regionBehaviors.ModifyMovementCostRegionBehaviorType}
     *
     * ### Movement Animation
     * - {@link CONFIG.Token.movement | CONFIG.Token.movement.defaultSpeed}
     * - {@link foundry.documents.types.TokenMovementData#animation}
     * - {@link foundry.canvas.placeables.Token#movementAnimationName}
     * - {@link foundry.canvas.placeables.Token#movementAnimationPromise}
     * - {@link foundry.canvas.placeables.Token#_getAnimationMovementSpeed}
     * - {@link foundry.canvas.placeables.Token#_modifyAnimationMovementSpeed}
     *
     * @param {Partial<TokenData & TokenMovementWaypoint> | Partial<TokenMovementWaypoint>[]} waypoints
     *   The waypoint(s) to move the Token through. If a single waypoint is provided, it may include addition token data.
     * @param {Partial<Omit<DatabaseUpdateOperation, "updates"> & TokenMovementOptions} [options]
     *   Parameters of the update and movement operation.
     * @returns {Promise<boolean>}  A Promise that resolves to true if the entire movement was completed, and otherwise
     *   resolves to false if the movement was stopped or prevented. While the movement is paused, this promise does not
     *   resolve.
     * @example Moving the token to new position including additional token data
     * ```js
     * const completed = await token.move({x: 100, y: 200, rotation: 45, texture: {tint: "#ff0000"}}, {showRuler: true});
     * if ( completed ) {
     *   // Movement was completed: the token arrived at the destination
     * } else {
     *   // Movement was stopped or prevented
     * }
     *
     * // The following is equivalent except for the return value
     * await token.update({x: 100, y: 200, rotation: 45,  texture: {tint: "#ff0000"}, {showRuler: true});
     * ```
     * @example Moving the token to along a path with multiple waypoints
     * ```js
     * const completed = await token.move(
     *   [
     *     {x: 100, y: 200}, // Move to the position (100, 200)
     *     {elevation: 5, explicit: true}, // Move to elevation 5 indicating that the user placed this waypoint
     *     {x: 500, y: 500, checkpoint: true}, // Move to (500, 500): the movement can be stopped/paused here
     *     {width: 2, height: 2, depth: 2}, // Change size
     *     {x: 1000, action: "swim"}, // Swim to (1000, 500)
     *     {x: 0, y: 0, snapped: true}, // Move to (0, 0) indicating that (0, 0) is a snapped position for the token
     *     {elevation: 10} // Move to elevation 10 (the last waypoint is always a checkpoint automatically)
     *   ],
     *   {
     *     autoRotate: true, // Enable auto rotation
     *     constrainOptions: {ignoreWalls: true, ignoreCost: true} // Allow the token to move through walls, surfaces, and
     *                                                             // impassable terrain
     *   }
     * );
     * if ( completed ) {
     *   // Movement was completed: the token arrived at the destination
     * } else {
     *   // Movement was stopped or prevented
     * }
     * ```
     */
    move(waypoints: Partial<TokenData & TokenMovementWaypoint> | Partial<TokenMovementWaypoint>[], options?: Partial<Omit<DatabaseUpdateOperation, "updates"> & TokenMovementOptions> | undefined): Promise<boolean>;
    /**
     * Undo all recorded movement or the recorded movement corresponding to given movement ID up to the last movement.
     * The token is displaced to the prior recorded position and the movement history it rolled back accordingly.
     * @param {string} [movementId]    The ID of the recorded movement to undo
     * @returns {Promise<boolean>}     True if the movement was undone, otherwise false
     */
    revertRecordedMovement(movementId?: string | undefined): Promise<boolean>;
    /**
     * Resize the Token such that its center point remains (almost) unchanged. The center point might change
     * slightly because the new (x, y) position is rounded.
     * @param {Partial<Omit<TokenData & TokenMovementWaypoint, "x"|"y"|"elevation">} dimensions
     *   The new dimensions and additional data.
     * @param {Partial<Omit<DatabaseUpdateOperation, "updates">& Omit<TokenMovementOptions, "autoRotate"
     *   |"showRuler"|"terrainOptions"|"constrainOptions"|"measureOptions">} [options]
     *                              Parameters of the update operation.
     * @returns {Promise<boolean>}  A Promise that resolves to true if the Token was resized, otherwise resolves to false.
     * @see {@link TokenDocument#move}
     */
    resize(dimensions: Partial<Omit<TokenData & TokenMovementWaypoint, "x" | "y" | "elevation">>, options?: Partial<Omit<DatabaseUpdateOperation, "updates"> & Omit<TokenMovementOptions, "measureOptions" | "terrainOptions" | "constrainOptions" | "autoRotate" | "showRuler">> | undefined): Promise<boolean>;
    /**
     * Stop the movement of this Token document. The movement cannot be continued after being stopped.
     * Only the User that initiated the movement can stop it.
     * @returns {boolean}    True if the movement was or is stopped, otherwise false
     */
    stopMovement(): boolean;
    /**
     * This function is called on Token documents that are still being moved by a User that just disconnected.
     * @internal
     */
    _stopMovementOnDisconnect(): void;
    /**
     * Pause the movement of this Token document. The movement can be resumed after being paused.
     * Only the User that initiated the movement can pause it.
     * Returns a callback that can be used to resume the movement later.
     * Only after all callbacks and keys have been called the movement of the Token is resumed.
     * If the callback is called within the update operation workflow, the movement is resumed after the workflow.
     * @overload
     * @returns {TokenResumeMovementCallback|null}  The callback to resume movement if the movement was or is paused,
     *                                              otherwise null
     * @example This is an Execute Script Region Behavior that makes the token invisible
     * ```js
     * // On TOKEN_MOVE_IN...
     * if ( !event.user.isSelf ) return;
     * const resumeMovement = event.data.token.pauseMovement();
     * if ( event.data.token.rendered ) await event.data.token.object.movementAnimationPromise;
     * await event.data.token.actor.toggleStatusEffect("invisible", {active: true});
     * const resumed = await resumeMovement();
     * ```
     */
    pauseMovement(): TokenResumeMovementCallback | null;
    /**
     * Pause the movement of this Token document. The movement can be resumed after being paused.
     * Only the User that initiated the movement can pause it.
     * Returns a promise that resolves to true if the movement was resumed by
     * {@link TokenDocument#resumeMovement} with the same key that was passed to this function.
     * Only after all callbacks and keys have been called the movement of the Token is resumed.
     * If the callback is called within the update operation workflow, the movement is resumed after the workflow.
     * @overload
     * @param {string} key               The key to resume movement with {@link TokenDocument#resumeMovement}
     * @returns {Promise<boolean>|null}  The continuation promise if the movement was paused, otherwise null
     * @example This is an Execute Script Region Behavior of a pressure plate that activates a trap
     * ```js
     * // On TOKEN_MOVE_IN...
     * if ( event.user.isSelf ) {
     *   event.data.token.pauseMovement(this.parent.uuid);
     * }
     * if ( game.user.isActiveGM ) {
     *   if ( event.data.token.rendered ) await event.data.token.object.movementAnimationPromise;
     *   const trapUuid; // The Region Behavior UUID of the trap
     *   const trapBehavior = await fromUuid(trapUuid);
     *   await trapBehavior.update({disabled: false});
     *   event.data.token.resumeMovement(event.data.movement.id, this.parent.uuid);
     * }
     * ```
     * @see {@link TokenDocument#resumeMovement}
     */
    pauseMovement(key: string): Promise<boolean> | null;
    /**
     * Start the currently planned movement or the planned movement corresponding to given movement ID.
     * Only owners of the Token can start the movement.
     * @param {string} [movementId]  The movement ID
     * @returns {Promise<boolean>}   True if the movement was started, false otherwise
     */
    startMovement(movementId?: string | undefined): Promise<boolean>;
    /**
     * Resume the movement given its ID and the key that was passed to {@link TokenDocument#pauseMovement}.
     * Only owners of this Token can resume the movement.
     * @param {string} movementId    The movement ID
     * @param {string} key           The key that was passed to {@link TokenDocument#pauseMovement}
     * @see {@link TokenDocument#pauseMovement}
     */
    resumeMovement(movementId: string, key: string): void;
    /**
     * Measure the movement path for this Token.
     * @param {TokenMeasurableMovementWaypoint[]} waypoints      The waypoints of movement
     * @param {object} [options]                                 Additional measurement options
     * @param {TokenMovementCostFunction} [options.cost]         The function that returns the cost
     *   for a given move between grid spaces (default is the distance travelled along the direct path)
     * @param {TokenMovementCostAggregator} [options.aggregator] The cost aggregator.
     *                                                           Default: `CONFIG.Token.movement.costAggregator`.
     * @returns {GridMeasurePathResult}
     */
    measureMovementPath(waypoints: TokenMeasurableMovementWaypoint[], { cost, aggregator }?: {
        cost?: TokenMovementCostFunction | undefined;
        aggregator?: TokenMovementCostAggregator | undefined;
    } | undefined): GridMeasurePathResult;
    /**
     * Get the path of movement with the intermediate steps of the direct path between waypoints.
     * @param {Partial<TokenProcessedMovementWaypoint>[]} waypoints  The waypoints of movement
     * @returns {TokenProcessedMovementWaypoint[]}                   The path of movement with all intermediate steps
     */
    getCompleteMovementPath(waypoints: Partial<TokenProcessedMovementWaypoint>[]): TokenProcessedMovementWaypoint[];
    /**
     * Get the offsets of grid spaces that are occupied by this Token at the current or given position.
     * The grid spaces the Token occupies are those that are covered by the Token's shape in the snapped position.
     * Walls and surfaces are considered.
     * Returns an empty array in gridless grids.
     * @param {Partial<Point & TokenDimensions>} [data] The position and dimensions
     * @returns {GridOffset3D[]}                        The offsets of occupied grid spaces
     */
    getOccupiedGridSpaceOffsets(data?: Partial<Point & TokenDimensions> | undefined): GridOffset3D[];
    /**
     * Add or remove this Token from a Combat encounter.
     * @param {object} [options={}]         Additional options passed to TokenDocument.createCombatants or
     *                                      TokenDocument.deleteCombatants
     * @param {boolean} [options.active]      Require this token to be an active Combatant or to be removed.
     *                                        Otherwise, the current combat state of the Token is toggled.
     * @returns {Promise<boolean>}          Is this Token now an active Combatant?
     */
    toggleCombatant({ active, ...options }?: {
        active?: boolean | undefined;
    } | undefined): Promise<boolean>;
    /**
     * Convenience method to change a token vision mode.
     * @param {string} visionMode                     The vision mode to apply to this token.
     * @param {boolean} [defaults=true]               If the vision mode should be updated with its defaults.
     * @returns {Promise<TokenDocument|undefined>}    The updated Document instance, or undefined not updated.
     */
    updateVisionMode(visionMode: string, defaults?: boolean | undefined): Promise<TokenDocument | undefined>;
    /** @inheritDoc */
    getEmbeddedCollection(embeddedName: any): any;
    /** @inheritDoc */
    _preCreate(data: any, options: any, user: any): Promise<false | undefined>;
    /** @inheritDoc */
    _onCreate(data: any, options: any, userId: any): void;
    /** @inheritDoc */
    _preUpdate(changed: any, options: any, user: any): Promise<false | undefined>;
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onDelete(options: any, userId: any): void;
    /**
     * Identify the Regions the Token currently is or is going to be in after the changes are applied.
     * @param {object} [changes]    The changes that will be applied to this Token
     * @returns {string[]}          The Region IDs this Token is in after the changes are applied (sorted)
     * @internal
     */
    _identifyRegions(changes?: object | undefined): string[];
    /**
     * Reject the movement or modify the update operation as needed based on the movement.
     * Called after the movement for this document update has been determined.
     * The waypoints of movement are final and cannot be changed. The movement can only be rejected entirely.
     * @param {TokenPreMovementOperation} movement                           The pending movement of this Token
     * @param {Partial<Omit<DatabaseUpdateOperation, "updates">>} operation  The update operation
     * @returns {Promise<boolean|void>}                                      If false, the movement is prevented
     * @protected
     */
    protected _preUpdateMovement(movement: TokenPreMovementOperation, operation: Partial<Omit<DatabaseUpdateOperation, "updates">>): Promise<boolean | void>;
    /**
     * Post-process an update operation of a movement.
     * @param {TokenMovementOperation} movement             The movement of this Token
     * @param {Partial<DatabaseUpdateOperation>} operation  The update operation
     * @param {User} user                                   The User that requested the update operation
     * @protected
     */
    protected _onUpdateMovement(movement: TokenMovementOperation, operation: Partial<DatabaseUpdateOperation>, user: User): void;
    /**
     * Called when the current movement is stopped.
     * @protected
     */
    protected _onMovementStopped(): void;
    /**
     * Called when the current movement is paused.
     * @protected
     */
    protected _onMovementPaused(): void;
    /**
     * Called when the current movement is planned.
     * @protected
     */
    protected _onMovementPlanned(): void;
    /**
     * Called when the movement is recorded or cleared.
     * @protected
     */
    protected _onMovementRecorded(): void;
    /**
     * Should the movement of this Token update be recorded in the movement history?
     * Called as part of the preUpdate workflow if the Token is moved.
     * @returns {boolean}    Should the movement of this Token update be recorded in the movement history?
     * @protected
     */
    protected _shouldRecordMovementHistory(): boolean;
    /**
     * Clear the movement history of this Token.
     * @returns {Promise<void>}
     */
    clearMovementHistory(): Promise<void>;
    /**
     * Is the Token document updated such that the Regions the Token is contained in may change?
     * Called as part of the preUpdate workflow.
     * @param {object} changes    The changes.
     * @returns {boolean}         Could this Token update change Region containment?
     * @protected
     */
    protected _couldRegionsChange(changes: object): boolean;
    /**
     * Test whether the Token is inside the Region.
     * This function determines the state of {@link TokenDocument#regions} and
     * {@link foundry.documents.RegionDocument#tokens}.
     * The Token and the Region must be in the same Scene.
     *
     * Implementations of this function are restricted in the following ways:
     *   - If the bounds (given by {@link TokenDocument#getSize}) of the Token do not intersect the
     *     Region, then the Token is not contained within the Region.
     *   - If the Token is inside the Region a particular elevation, then the Token is inside the Region at any elevation
     *     within the elevation range of the Region.
     *   - This function must not use prepared field values that are animated. In particular, it must use the source
     *     instead of prepared values of the following fields: `x`, `y`, `elevation`, `width`, `height`, and `shape`.
     *
     * If this function is overridden, then {@link TokenDocument#segmentizeRegionMovementPath} must be
     * overridden too.
     *
     * If an override of this function uses Token document fields other than `x`, `y`, `elevation`, `width`, `height`, and
     * `shape`, {@link TokenDocument#_couldRegionsChange} must be overridden to return true for changes
     * of these fields. If an override of this function uses non-Token properties other than `Scene#grid.type` and
     * `Scene#grid.size`,
     * {@link foundry.documents.Scene#updateTokenRegions} must be called when any of those properties change.
     * @param {RegionDocument} region                              The region.
     * @param {(Partial<ElevatedPoint & Omit<TokenPosition, "x"|"y"|"elevation">)} [data]
     *   The position and dimensions. Defaults to the values of the document source.
     * @returns {boolean}                                          Is inside the Region?
     */
    testInsideRegion(region: RegionDocument, data?: Partial<ElevatedPoint & Omit<TokenPosition, "x" | "y" | "elevation">> | undefined): boolean;
    /**
     * Get the movement origin of this Token.
     * This point is used to test collision with walls and surfaces.
     * @param {Partial<ElevatedPoint & TokenDimensions>} [data]  The position and dimensions
     * @returns {ElevatedPoint}                                  The movement origin
     */
    getMovementOrigin(data?: Partial<ElevatedPoint & TokenDimensions> | undefined): ElevatedPoint;
    /**
     * Get the origin of the light source of this Token.
     *
     * The default implementation returns the movement origin.
     * @param {Partial<ElevatedPoint & TokenDimensions>} [data]  The position and dimensions
     * @returns {ElevatedPoint}                                  The vision origin
     */
    getLightOrigin(data?: Partial<ElevatedPoint & TokenDimensions> | undefined): ElevatedPoint;
    /**
     * Get the origin of the vision source of this Token.
     *
     * The default implementation returns the movement origin.
     * @param {Partial<ElevatedPoint & TokenDimensions>} [data]  The position and dimensions
     * @returns {ElevatedPoint}                                  The light origin
     */
    getVisionOrigin(data?: Partial<ElevatedPoint & TokenDimensions> | undefined): ElevatedPoint;
    /**
     * Get the origin of the sound source of this Token.
     *
     * The default implementation returns the movement origin.
     * @param {Partial<ElevatedPoint & TokenDimensions>} [data]  The position and dimensions
     * @returns {ElevatedPoint}                                  The light origin
     */
    getSoundOrigin(data?: Partial<ElevatedPoint & TokenDimensions> | undefined): ElevatedPoint;
    /**
     * Get the listener position of this Token.
     *
     * The default implementation returns the movement origin.
     * @param {Partial<ElevatedPoint & TokenDimensions>} [data]  The position and dimensions
     * @returns {ElevatedPoint}                                  The listener position
     */
    getListenerPosition(data?: Partial<ElevatedPoint & TokenDimensions> | undefined): ElevatedPoint;
    /**
     * Get the points that are used to test region containment/segmentation (unless overridden)
     * for this Token. The test points are within the shape of the Token.
     *
     * Implementations of this function must use the prepared position and dimensions of this Token.
     * @param {(Partial<ElevatedPoint & TokenPosition>)} [data]    The position and dimensions. Defaults to the values of
     *                                                             the prepared document, not the document source.
     * @returns {Point[]}                                          The test points.
     */
    getContainmentTestPoints(data?: Partial<ElevatedPoint & TokenPosition> | undefined): Point[];
    /**
     * Get the points that are used to test visibility for this Token. The test points are within the shape of the Token.
     *
     * Implementations of this function must use the prepared position and dimensions of this Token.
     * @param {(Partial<ElevatedPoint & TokenPosition>)} [data]    The position and dimensions. Defaults to the values of
     *                                                             the prepared document, not the document source.
     * @returns {ElevatedPoint[]}                                  The test points.
     */
    getVisibilityTestPoints(data?: Partial<ElevatedPoint & TokenPosition> | undefined): ElevatedPoint[];
    /**
     * Get the points that are used to test occlusion for this Token. The test points are within the shape of the Token.
     *
     * Implementations of this function must use the prepared position and dimensions of this Token.
     * @param {(Partial<Point & Omit<TokenPosition, "elevation"|"depth">>)} [data]  The position and dimensions. Defaults
     *                                                                              to the values of the prepared
     *                                                                              document, not the document source.
     * @returns {Point[]}                                                           The test points.
     */
    getOcclusionTestPoints(data?: Partial<Point & Omit<TokenPosition, "elevation" | "depth">> | undefined): Point[];
    /**
     * Constrain the test points by walls and surfaces. The passed array of test points are modified in place.
     * If all points are discarded, the movement origin is added to the array of test points.
     * @param {(Point|ElevatedPoint)[]} points                     The test points, which are modified in place.
     * @param {(Partial<ElevatedPoint & TokenPosition>)} [data]    The position and dimensions. Defaults to the values of
     *                                                             the prepared document, not the document source.
     * @protected
     */
    protected _constrainTestPoints(points: (Point | ElevatedPoint)[], data?: Partial<ElevatedPoint & TokenPosition> | undefined): void;
    /**
     * Split the Token movement path through the Region into its segments.
     * The Token and the Region must be in the same Scene.
     *
     * Implementations of this function are restricted in the following ways:
     *   - The segments must go through the waypoints.
     *   - The *from* position matches the *to* position of the succeeding segment.
     *   - The Token must be contained (w.r.t. {@link TokenDocument#testInsideRegion}) within the Region
     *     at the *from* and *to* of MOVE segments.
     *   - The Token must be contained (w.r.t. {@link TokenDocument#testInsideRegion}) within the Region
     *     at the *to* position of ENTER segments.
     *   - The Token must be contained (w.r.t. {@link TokenDocument#testInsideRegion}) within the Region
     *     at the *from* position of EXIT segments.
     *   - The Token must not be contained (w.r.t. {@link TokenDocument#testInsideRegion}) within the
     *     Region at the *from* position of ENTER segments.
     *   - The Token must not be contained (w.r.t. {@link TokenDocument#testInsideRegion}) within the
     *     Region at the *to* position of EXIT segments.
     *   - This function must not use prepared field values that are animated. In particular, it must use the source
     *     instead of prepared values of the following fields: `x`, `y`, `elevation`, `width`, `height`, and `shape`.
     * @param {RegionDocument} region                                  The region
     * @param {Partial<TokenProcessedMovementWaypoint>[]} waypoints    The waypoints of movement
     * @returns {TokenRegionMovementSegment[]}                         The movement split into its segments
     */
    segmentizeRegionMovementPath(region: RegionDocument, waypoints: Partial<TokenProcessedMovementWaypoint>[]): TokenRegionMovementSegment[];
    /** @inheritDoc */
    _preCreateDescendantDocuments(parent: any, collection: any, data: any, options: any, userId: any): void;
    /** @inheritDoc */
    _preUpdateDescendantDocuments(parent: any, collection: any, changes: any, options: any, userId: any): void;
    /** @inheritDoc */
    _preDeleteDescendantDocuments(parent: any, collection: any, ids: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onCreateDescendantDocuments(parent: any, collection: any, documents: any, data: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onUpdateDescendantDocuments(parent: any, collection: any, documents: any, changes: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onDeleteDescendantDocuments(parent: any, collection: any, documents: any, ids: any, options: any, userId: any): void;
    /**
     * When the base Actor for a TokenDocument changes, we may need to update its Actor instance
     * @param {object} [update={}]                               The update delta
     * @param {Partial<DatabaseUpdateOperation>} [options={}]    The database operation that was performed
     * @internal
     */
    _onUpdateBaseActor(update?: object | undefined, options?: Partial<DatabaseUpdateOperation> | undefined): void;
    /**
     * Whenever the token's actor delta changes, or the base actor changes, perform associated refreshes.
     * @param {object|object[]} [update] The update delta
     * @param {Partial<DatabaseWriteOperation>} [operation] The database operation that was performed
     * @protected
     */
    protected _onRelatedUpdate(update?: object | object[] | undefined, operation?: Partial<DatabaseWriteOperation> | undefined): void;
    /**
     * Refresh this TokenDocument's overrides and transmit changes, if any, to its PlaceableObject for rendering.
     * @param {string} phase The application phase under which changes are to be applied
     */
    applyActiveEffects(phase: string): void;
    /**
     * Send emulated update data to the Token PlaceableObject
     * @param {object} priorOverrides Overrides prior to data reinitialization
     * @protected
     */
    protected _renderActiveEffectChanges(priorOverrides: object): void;
    /**
     * Callback invoked when {@link _onRelatedUpdate} detects overrides of at least one Token dimension. Enacting such
     * changes requires a server update and may involve nuances particular to a given system. While this method is async,
     * it is not awaited by the caller.
     * @param {Partial<TokenDimensions>} changes
     * @protected
     */
    protected _onOverrideSize(changes: Partial<TokenDimensions>): Promise<void>;
    /**
     * Get replacement data for ActiveEffect change application to this Token.
     * @returns {object}
     * @protected
     */
    protected _getReplacementData(): object;
    #private;
}
import BaseToken from "../../common/documents/token.mjs";
import type { Scene } from "./_module.mjs";
import type { TokenMovementData } from "./_types.mjs";
import type { TokenMovementContinuationData } from "./_types.mjs";
import type { RegionDocument } from "./_module.mjs";
import type { Actor } from "./_module.mjs";
import type Collection from "../../common/utils/collection.mjs";
import type { Combatant } from "./_module.mjs";
import type { TokenMeasuredMovementWaypoint } from "./_types.mjs";
import type { TokenData } from "../../common/documents/_types.mjs";
import type { TokenMovementWaypoint } from "./_types.mjs";
import type { DatabaseUpdateOperation } from "../../common/abstract/_types.mjs";
import type { TokenMovementOptions } from "./_types.mjs";
import type { TokenResumeMovementCallback } from "./_types.mjs";
import type { TokenMeasurableMovementWaypoint } from "./_types.mjs";
import type { TokenMovementCostFunction } from "./_types.mjs";
import type { TokenMovementCostAggregator } from "./_types.mjs";
import type { GridMeasurePathResult } from "../../common/grid/_types.mjs";
import type { TokenProcessedMovementWaypoint } from "./_types.mjs";
import type { Point } from "../_types.mjs";
import type { TokenDimensions } from "../../common/documents/_types.mjs";
import type { GridOffset3D } from "../../common/grid/_types.mjs";
import type { TokenPreMovementOperation } from "./_types.mjs";
import type { TokenMovementOperation } from "./_types.mjs";
import type { User } from "./_module.mjs";
import type { ElevatedPoint } from "../_types.mjs";
import type { TokenPosition } from "../../common/documents/_types.mjs";
import type { TokenRegionMovementSegment } from "./_types.mjs";
import type { DatabaseWriteOperation } from "../../common/abstract/_types.mjs";
import type { GridMeasurePathWaypointData3D } from "../../common/grid/_types.mjs";
import type { TokenMovementSegmentData } from "./_types.mjs";
import type { BaseGrid } from "../../common/grid/_module.mjs";
import type { TokenShapeType } from "../../common/constants.mjs";
import type { HexagonalGrid } from "../../common/grid/_module.mjs";
import type { Combat } from "./_module.mjs";
import type DataModel from "../../common/abstract/data.mjs";
import type { SchemaField } from "../../common/data/fields.mjs";
import type { TrackedAttributesDescription } from "./_types.mjs";
