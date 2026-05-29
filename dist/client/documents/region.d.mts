/**
 * @import {Point, ElevatedPoint, ClipperPoint, DeepReadonly, TokenPanningOptions} from "../_types.mjs";
 * @import {RegionData, RegionSocketEvent, TokenCoordinates, TokenData} from "../../common/documents/_types.mjs";
 * @import {RegionEvent, RegionMovementSegment, RegionSegmentizeMovementPathWaypoint} from "./_types.mjs";
 * @import Scene from "./scene.mjs";
 * @import {PointSourcePolygon} from "../canvas/geometry/_module.mjs";
 * @import {PointSourcePolygonConfig} from "../canvas/geometry/_types.mjs";
 * @import {DatabaseCreateOperation} from "../../common/abstract/_types.mjs";
 */
/**
 * The client-side Region document which extends the common BaseRegion model.
 * @extends BaseRegion
 * @mixes CanvasDocumentMixin
 * @category Documents
 *
 * @see {@link foundry.documents.Scene}: The Scene document type which contains Region documents
 * @see {@link foundry.applications.sheets.RegionConfig}: The Region configuration application
 */
export default class RegionDocument extends BaseRegion {
    /**
     * Shared point instance.
     * @type {Point}
     */
    static "__#107@#SHARED_POINT": Point;
    /**
     * The minimum distance from the boundary for a point to be considered interior/exterior.
     * @type {number}
     */
    static "__#107@#MIN_BOUNDARY_DISTANCE": number;
    /** @inheritDoc */
    static _preCreateOperation(documents: any, operation: any, user: any): Promise<false | undefined>;
    /** @inheritDoc */
    static _preUpdateOperation(documents: any, operation: any, user: any): Promise<false | undefined>;
    /**
     * Create an emanation Region for the Token and attach it to the Token.
     * @param {TokenDocument} token                    The Token to attach the emanation Region to
     * @param {number} range                           The range of the emanation in grid units
     * @param {Omit<RegionData, "shapes"|"elevation">} regionData   The Region data of the emanation
     * @param {options} [options]                      Additional options
     * @param {boolean} [options.excludeToken=false]   Exclude the Token's own shape from the area of the emanation?
     * @param {boolean} [options.gridBased=false]      Should the emanation conform to the grid's metric?
     * @param {Partial<Omit<DatabaseCreateOperation, "parent">>} [options.createOptions]  Optional creation options
     * @returns {Promise<RegionDocument|void>}         The created Region document unless the creation was prevented
     */
    static createTokenEmanation(token: TokenDocument, range: number, regionData: Omit<RegionData, "shapes" | "elevation">, { excludeToken, gridBased, createOptions }?: any): Promise<RegionDocument | void>;
    /**
     * Activate the Socket event listeners.
     * @param {io.Socket} socket    The active game socket
     * @internal
     */
    static _activateSocketListeners(socket: io.Socket): void;
    /**
     * Handle the Region event received via the socket.
     * @param {RegionSocketEvent} socketEvent    The socket Region event
     */
    static "__#107@#onSocketEvent"(socketEvent: RegionSocketEvent): Promise<void>;
    /**
     * Update the tokens of the given regions.
     * @param {RegionDocument[]} regions           The Regions documents, which must be all in the same Scene
     * @param {object} [options={}]                Additional options
     * @param {{[tokenId: string]: string[]}} [options.attachments] The IDs of regions that are attached to
     *  the tokens. If this is set, the region were updated as as part of a token movement.
     * @param {boolean} [options.deleted=false]    Are the Region documents deleted?
     */
    static "__#107@#updateTokens"(regions: RegionDocument[], { attachments, deleted }?: {
        attachments?: {
            [tokenId: string]: string[];
        } | undefined;
        deleted?: boolean | undefined;
    } | undefined): Promise<void>;
    /** @inheritDoc */
    static _onCreateOperation(documents: any, operation: any, user: any): Promise<void>;
    /** @inheritDoc */
    static _onUpdateOperation(documents: any, operation: any, user: any): Promise<void>;
    /** @inheritDoc */
    static _onDeleteOperation(documents: any, operation: any, user: any): Promise<void>;
    /**
     * Does this Region have a single shape that is not a hole?
     * @type {boolean}
     */
    get isSingleShape(): boolean;
    /**
     * The polygons of this Region.
     *
     * The value of this property must not be mutated.
     *
     * Alias for `this.polygonTree.polygons`.
     * @type {ReadonlyArray<PIXI.Polygon>}
     */
    get polygons(): readonly PIXI.Polygon[];
    /**
     * The polygon tree of this Region.
     *
     * The value of this property must not be mutated.
     * @type {PolygonTree}
     */
    get polygonTree(): PolygonTree;
    /**
     * The Clipper paths of this Region.
     *
     * The value of this property must not be mutated.
     *
     * Alias for `this.polygonTree.clipperPaths`.
     * @type {DeepReadonly<ClipperPoint[][]>}
     */
    get clipperPaths(): readonly (readonly DeepReadonly<ClipperPoint>[])[];
    /**
     * The Clipper polygon tree of this Region.
     *
     * The value of this property must not be mutated.
     * @type {ClipperLib.PolyTree}
     */
    get clipperPolyTree(): ClipperLib.PolyTree;
    /**
     * The triangulation of this Region.
     *
     * The value of this property must not be mutated.
     *
     * Alias for `this.polygonTree.triangulation`.
     * @type {Readonly<{vertices: Float32Array; indices: Uint16Array|Uint32Array}>}
     */
    get triangulation(): Readonly<{
        vertices: Float32Array;
        indices: Uint16Array | Uint32Array;
    }>;
    /**
     * The bounds of this Region.
     *
     * The value of this property must not be mutated.
     *
     * Alias for `this.polygonTree.bounds`.
     * @type {PIXI.Rectangle}
     */
    get bounds(): PIXI.Rectangle;
    /**
     * The area of this Region.
     *
     * Alias for `this.polygonTree.area`.
     * @type {number}
     */
    get area(): number;
    /**
     * The tokens inside this region.
     * @type {ReadonlySet<TokenDocument>}
     * @readonly
     */
    readonly tokens: ReadonlySet<TokenDocument>;
    /**
     * This makes sure that the second preparation during world initialization knows to add the region
     * to the attachments of the attached token.
     * It abuses the subclass property instantiation issue.
     * @ignore
     */
    attachment: any;
    /** @inheritDoc */
    prepareBaseData(): void;
    /** @inheritDoc */
    clone(data: any, context: any): foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext> | Promise<foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext>>;
    /**
     * Clamp the given elevation (of a token with a depth) to the elevation range of this Region.
     *
     * The elevation is clamped such that the head of the token is in the range if possible, but
     * the feet are never outside of the range.
     * @param {number} elevation    The elevation (of the token)
     * @param {number} [depth=0]    The depth of the token
     * @returns {number}            The clamped elevation
     */
    clampElevation(elevation: number, depth?: number | undefined): number;
    /**
     * Test whether the given point is inside this Region.
     * @param {ElevatedPoint} point    The point.
     * @returns {boolean}              Is the point inside this Region?
     */
    testPoint(point: ElevatedPoint): boolean;
    /**
     * Create the Clipper polygon tree for this Region.
     * @param {BaseShapeData[]} shapes
     * @param {object[]|null} shapeConstraints
     * @returns {ClipperLib.PolyTree}
     * @internal
     */
    _createClipperPolyTree(shapes: BaseShapeData[], shapeConstraints: object[] | null): ClipperLib.PolyTree;
    /**
     * Split the movement path into its segments.
     * @param {RegionSegmentizeMovementPathWaypoint[]} waypoints    The waypoints of movement.
     * @param {Point[]} samples                       The points relative to the waypoints that are tested.
     *                                                Whenever one of them is inside the region, the moved object
     *                                                is considered to be inside the region.
     * @returns {RegionMovementSegment[]}             The movement split into its segments.
     */
    segmentizeMovementPath(waypoints: RegionSegmentizeMovementPathWaypoint[], samples: Point[]): RegionMovementSegment[];
    /**
     * Update the shape constraints of this Region. If `save` is true, the shape constraints are updated
     * only if the current User is designated for it.
     * @param {object} [options]                Additional options
     * @param {boolean} [options.save=false]    Persist the shape constraints changes? Default: `false`.
     */
    updateShapeConstraints({ save }?: {
        save?: boolean | undefined;
    } | undefined): void;
    /**
     * Update the point sources of this Region document.
     * @param {object} [changes]     The changes that will be applied to this Region.
     * @returns {number[][]|null}    The computed shape constraint for each shape, if restricted/possible.
     * @internal
     */
    _computeShapeConstraints(changes?: object | undefined): number[][] | null;
    /**
     * Compute the shape constraint for the given origin and config.
     * @param {ElevatedPoint} origin               The origin of the constraint.
     * @param {PointSourcePolygonConfig} config    The config of the constraint.
     * @returns {PointSourcePolygon}               The shape constraint.
     * @protected
     */
    protected _computeShapeConstraint(origin: ElevatedPoint, config: PointSourcePolygonConfig): PointSourcePolygon;
    /** @inheritDoc */
    _updateCommit(copy: any, diff: any, options: any, state: any): void;
    /** @inheritDoc */
    _onCreate(data: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onDelete(options: any, userId: any): void;
    /**
     * Called when the scene's grid is changed.
     * @param {object} changed   The changes to the grid.
     * @internal
     */
    _onGridChange(changed: object): void;
    /**
     * Clear the polygon tree.
     * @internal
     */
    _clearPolygonTree(): void;
    /**
     * Called when the polygon tree of the Region has changed.
     * @protected
     */
    protected _onPolygonTreeChange(): void;
    /** @inheritDoc */
    _refreshViewedState(): Promise<void>;
    /**
     * Teleport a Token into this Region.
     *
     * The Token may be in the same Scene as this Region, or in a different Scene.
     * The current User must be an owner of the Token Document in order to teleport it.
     * For teleportation to a different Scene the current User requires `TOKEN_CREATE` and
     * `TOKEN_DELETE` permissions. If the Token is teleported to different Scene, it is deleted
     * and a new Token Document in the other Scene is created.
     *
     * This function can work with ephemeral (non-persisted) Region documents.
     * @param {TokenDocument} token              An existing Token Document to teleport.
     * @param {object} [options]                 Additional options.
     * @param {"random"|"center"|"relative"} [options.placement="random"]  The placement. Default: `"random"`.
     * @param {boolean} [options.snap=true]      Attempt to teleport the tokens to a snapped position. Default: `true`.
     * @param {Point} [options.offset]           The relative offset position.
     * @param {boolean} [options.avoidOccupied=true]  Avoid occupied grid spaces when placing randomly with snapping.
     *                                                Default: `true`.
     * @param {boolean|TokenPanningOptions} [options.pan=true]
     *   Pan the canvas (with transition animation) to the destination if the token is controlled? Default: `true`.
     * @param {Partial<TokenData>} [options.updateData]   Additonal Token update data.
     * @returns {Promise<TokenDocument>}         The same Token Document if teleported within the same Scene,
     *                                           or a new Token Document if teleported to a different Scene
     * @throws {Error}                           If failed to teleport the Token document.
     * @example Teleport a single token with random rotation
     * ```js
     * await region.teleportToken(token, {
     *   updateData: {
     *     rotation: Math.random() * 360
     *   }
     * });
     * ```
     */
    teleportToken(token: TokenDocument, options?: {
        placement?: "random" | "center" | "relative" | undefined;
        snap?: boolean | undefined;
        offset?: Point | undefined;
        avoidOccupied?: boolean | undefined;
        pan?: boolean | TokenPanningOptions | undefined;
        updateData?: Partial<TokenData> | undefined;
    } | undefined): Promise<TokenDocument>;
    /**
     * Teleport Tokens into this Region.
     *
     * The Tokens may be in the same Scene as this Region, or in a different Scene.
     * The current User must be an owner of the Token Documents in order to teleport them.
     * For teleportation to a different Scene the current User requires `TOKEN_CREATE` and
     * `TOKEN_DELETE` permissions. If a Token is teleported to different Scene, it is deleted
     * and a new Token Document in the other Scene is created.
     *
     * This function can work ephemeral (non-persisted) Region documents.
     * @param {Iterable<TokenDocument>} tokens   Existing Token Documents to teleport.
     * @param {object} [options]                 Additional options.
     * @param {"random"|"center"|"relative"} [options.placement="random"]  The placement. Default: `"random"`.
     * @param {boolean} [options.snap=true]      Attempt to teleport the tokens to a snapped position. Default: `true`.
     * @param {Point} [options.offset]           The relative offset position.
     * @param {boolean} [options.avoidOccupied=true]  Avoid occupied grid spaces when placing randomly with snapping.
     *                                                Default: `true`.
     * @param {string} [options.level]                The destination Level ID, which must be a Level this Region is in.
     *                                                Default: the Level of the Region if it is in only one Level.
     * @param {boolean|TokenPanningOptions} [options.pan=true]
     *   Pan the canvas (with transition animation) to the destination if the token is controlled? Default: `true`.
     * @param {Map<TokenDocument, Partial<TokenData>>} [options.updateData]  Additonal update data.
     * @returns {Promise<Map<TokenDocument, TokenDocument>>}  The mapping of deleted to created Token Documents.
     * @throws {Error}                           If the current User doesn't have the necessary permissions, Token
     *                                           Documents could not be created/updated/deleted or there's no valid
     *                                           placement.
     * @example Teleport multiple tokens with random rotation
     * ```js
     * const updateData = new Map();
     * for ( const token of tokens ) {
     *   updateData.set(token, {
     *     rotation: Math.random() * 360
     *   });
     * }
     * await region.teleportTokens(tokens, {updateData});
     * ```
     */
    teleportTokens(tokens: Iterable<TokenDocument>, { placement, snap, offset, avoidOccupied, level, pan, updateData }?: {
        placement?: "random" | "center" | "relative" | undefined;
        snap?: boolean | undefined;
        offset?: Point | undefined;
        avoidOccupied?: boolean | undefined;
        level?: string | undefined;
        pan?: boolean | TokenPanningOptions | undefined;
        updateData?: Map<TokenDocument, Partial<TokenData>> | undefined;
    } | undefined): Promise<Map<TokenDocument, TokenDocument>>;
    /**
     * Spawn Tokens into this Region.
     *
     * The current User must be an owner of the Token Documents and have the `TOKEN_CREATE` permission
     * in order to spawn them.
     *
     * This function can work ephemeral (non-persisted) Region documents.
     * @param {Iterable<Partial<TokenData>|TokenDocument>} tokenData       The data of tokens or Token documents to spawn.
     * @param {object} [options]                                           Additional options.
     * @param {"random"|"center"|"relative"} [options.placement="random"]  The placement. Default: `"random"`.
     * @param {boolean} [options.snap=true]      Attempt to spawn the tokens to a snapped position. Default: `true`.
     * @param {Point} [options.offset]           The relative offset position. Default: `true`.
     * @param {boolean} [options.avoidOccupied=true]  Avoid occupied grid spaces when placing randomly with snapping.
     *                                                Default: `true`.
     * @param {string} [options.level]                The destination Level ID, which must be a Level this Region is in.
     *                                                Default: the Level of the Region if it is in only one Level.
     * @param {boolean} [options.create=true]         Persist the spawned tokens to the database (default true) or
     *                                                otherwise return an array of ephemeral TokenDocument instances.
     * @param {Partial<Omit<DatabaseCreateOperation, "parent">>} [options.createOptions]  Additional create options.
     * @returns {Promise<TokenDocument[]>}       The array of Token Documents that where created, which might be
     *                                           less than request the creation was disallowed by a preCreate handler
     * @throws {Error}                           If the current User doesn't have the necessary permissions, the Token
     *                                           Document could not be created or there's no valid placement.
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
    spawnTokens(tokenData: Iterable<Partial<TokenData> | TokenDocument>, { placement, snap, offset, avoidOccupied, level, create, createOptions }?: {
        placement?: "random" | "center" | "relative" | undefined;
        snap?: boolean | undefined;
        offset?: Point | undefined;
        avoidOccupied?: boolean | undefined;
        level?: string | undefined;
        create?: boolean | undefined;
        createOptions?: Partial<Omit<DatabaseCreateOperation, "parent">> | undefined;
    } | undefined): Promise<TokenDocument[]>;
    /**
     * Trigger the Region event.
     * @param {string} eventName        The event name
     * @param {object} eventData        The event data
     * @returns {Promise<void>}
     * @internal
     */
    _triggerEvent(eventName: string, eventData: object): Promise<void>;
    /**
     * Handle the Region event.
     * @param {RegionEvent} event    The Region event
     * @returns {Promise<void>}
     * @internal
     */
    _handleEvent(event: RegionEvent): Promise<void>;
    /** @inheritDoc */
    _onCreateDescendantDocuments(parent: any, collection: any, documents: any, data: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onUpdateDescendantDocuments(parent: any, collection: any, documents: any, changes: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onDeleteDescendantDocuments(parent: any, collection: any, documents: any, ids: any, options: any, userId: any): void;
    /**
     * Present a Dialog form to confirm the removal of a shape.
     * @param {BaseShapeData|number} shapeOrIndex  The shape or shape index.
     * @param {object} [options]                   Additional options passed to `DialogV2.confirm`
     * @returns {Promise<boolean>}
     */
    removeShapeDialog(shapeOrIndex: BaseShapeData | number, options?: object | undefined): Promise<boolean>;
    /**
     * @deprecated since v14
     * @ignore
     */
    get regionShapes(): any;
    /** @ignore */
    get _regionShapes(): any;
    #private;
}
import BaseRegion from "../../common/documents/region.mjs";
import { PolygonTree } from "../data/polygon-tree.mjs";
import type { ClipperPoint } from "../_types.mjs";
import type { DeepReadonly } from "../_types.mjs";
import TokenDocument from "./token.mjs";
import type { ElevatedPoint } from "../_types.mjs";
import { BaseShapeData } from "../../common/data/_module.mjs";
import type { RegionSegmentizeMovementPathWaypoint } from "./_types.mjs";
import type { Point } from "../_types.mjs";
import type { RegionMovementSegment } from "./_types.mjs";
import type { PointSourcePolygonConfig } from "../canvas/geometry/_types.mjs";
import type { PointSourcePolygon } from "../canvas/geometry/_module.mjs";
import type { TokenPanningOptions } from "../_types.mjs";
import type { TokenData } from "../../common/documents/_types.mjs";
import type { DatabaseCreateOperation } from "../../common/abstract/_types.mjs";
import type { RegionEvent } from "./_types.mjs";
import type { RegionData } from "../../common/documents/_types.mjs";
import type { RegionSocketEvent } from "../../common/documents/_types.mjs";
