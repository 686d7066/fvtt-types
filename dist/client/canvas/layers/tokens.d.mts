/**
 * @import {Rectangle, TokenFindMovementPathOptions, TokenPlannedMovement} from "../../_types.mjs";
 * @import Token from "../placeables/token.mjs";
 * @import User from "../../documents/user.mjs";
 * @import {TokenData, TokenPosition} from "../../../common/documents/_types.mjs";
 * @import {TokenMovementOptions, TokenMovementWaypoint} from "../../documents/_types.mjs";
 */
/**
 * The Tokens Container.
 * @category Canvas
 */
export default class TokenLayer extends PlaceablesLayer {
    /** @inheritdoc */
    static get layerOptions(): object;
    /** @override */
    static override prepareSceneControls(): {
        name: string;
        order: number;
        title: string;
        icon: string;
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
                    src: string;
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
                onChange: (_event: any, _active: any) => void;
            };
            target: {
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
            ruler: {
                name: string;
                order: number;
                title: string;
                icon: string;
                control: boolean;
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            unconstrainedMovement: {
                name: string;
                order: number;
                title: string;
                icon: string;
                toggle: boolean;
                active: any;
                visible: boolean;
                onChange: (event: any, toggled: any) => void;
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
        };
        activeTool: string;
    };
    /**
     * The ruler paths.
     * @type {PIXI.Container}
     * @internal
     */
    _rulerPaths: PIXI.Container;
    /**
     * The current index position in the tab cycle
     * @type {number|null}
     * @internal
     */
    _tabIndex: number | null;
    /**
     * The Token that the drag workflow was initiated on, if there's a drag workflow in progress.
     * Set in {@link foundry.canvas.placeables.Token#_onDragLeftStart} and
     * {@link foundry.canvas.placeables.Token#_onDragLeftCancel}.
     * @type {Token|null}
     * @internal
     */
    _draggedToken: Token | null;
    /**
     * The currently selected movement action override.
     * @type {string|null}
     * @internal
     */
    _dragMovementAction: string | null;
    /**
     * The movement planning context.
     * @type {{
     *   object: Token;
     *   allowedActions: string[]|null;
     *   direct: boolean;
     *   minCost: number;
     *   maxCost: number;
     *   minDistance: number;
     *   maxDistance: number;
     *   preventDrop: boolean;
     *   terrainOptions: Omit<TokenCreateTerrainMovementPathOptions, "preview">;
     *   constrainOptions: Omit<TokenConstrainMovementPathOptions, "preview"|"history"|"measureOptions">;
     *   measureOptions: Omit<TokenMeasureMovementPathOptions, "preview">;
     *   pathfindingOptions: Omit<TokenFindMovementPathOptions, "preview"|"terrainOptions"|"constrainOptions"|
     *     "measureOptions">;
     *   moveOptions: Omit<TokenMovementOptions, "id"|"method"|"terrainOptions"|"constrainOptions"|"measureOptions"|
     *     "planned">;
     *   result: {
     *     id: string;
     *     origin: TokenPosition;
     *     destination: TokenPosition;
     *     waypoints: TokenMovementWaypoint[];
     *   }|null;
     *   resolve: (document: {
     *     id: string;
     *     origin: TokenPosition;
     *     destination: TokenPosition;
     *     waypoints: TokenMovementWaypoint[];
     *   }|null) => void;
     *   reject: (error: Error) => void;
     *   violations: string[];
     * }|null}
     * @internal
     */
    _movementPlanningContext: {
        object: Token;
        allowedActions: string[] | null;
        direct: boolean;
        minCost: number;
        maxCost: number;
        minDistance: number;
        maxDistance: number;
        preventDrop: boolean;
        terrainOptions: Omit<TokenCreateTerrainMovementPathOptions, "preview">;
        constrainOptions: Omit<TokenConstrainMovementPathOptions, "preview" | "history" | "measureOptions">;
        measureOptions: Omit<TokenMeasureMovementPathOptions, "preview">;
        pathfindingOptions: Omit<TokenFindMovementPathOptions, "preview" | "terrainOptions" | "constrainOptions" | "measureOptions">;
        moveOptions: Omit<TokenMovementOptions, "id" | "method" | "terrainOptions" | "constrainOptions" | "measureOptions" | "planned">;
        result: {
            id: string;
            origin: TokenPosition;
            destination: TokenPosition;
            waypoints: TokenMovementWaypoint[];
        } | null;
        resolve: (document: {
            id: string;
            origin: TokenPosition;
            destination: TokenPosition;
            waypoints: TokenMovementWaypoint[];
        } | null) => void;
        reject: (error: Error) => void;
        violations: string[];
    } | null;
    /**
     * The placement context.
     * @type {{
     *   previews: Token[];
     *   placed: TokenDocument[];
     *   index: number;
     *   resolve: (document: TokenDocument[]) => void;
     *   reject: (error: Error) => void;
     *   create: boolean;
     *   createOptions: Partial<Omit<DatabaseCreateOperation, "parent">>;
     *   allowRotation: boolean;
     *   onMove: (args: {event: PIXI.FederatedEvent; preview: Token;  document: TokenDocument;
     *     index: number; count: number; position: Point; snap: boolean}) => boolean|void;
     *   onRotate: (args: {event: WheelEvent; preview: Token; document: TokenDocument;
     *     index: number; count: number; precise: boolean}) => boolean|void;
     *   onChange: (args: {preview: Token; document: TokenDocument; index: number;
     *     count: number}) => void;
     *   preConfirm: (args: {event: PIXI.FederatedEvent; document: TokenDocument;
     *     index: number; count: number}) => boolean|void;
     *   preSkip: (args: {event: PIXI.FederatedEvent; document: TokenDocument;
     *     index: number; count: number}) => boolean|void;
     *   preCommit: (documents: ReadonlyArray<TokenDocument>) => Promise<any|void>|void;
     *   rotationNotification: boolean;
     * }|null}
     * @internal
     */
    _placementContext: {
        previews: Token[];
        placed: TokenDocument[];
        index: number;
        resolve: (document: TokenDocument[]) => void;
        reject: (error: Error) => void;
        create: boolean;
        createOptions: Partial<Omit<DatabaseCreateOperation, "parent">>;
        allowRotation: boolean;
        onMove: (args: {
            event: PIXI.FederatedEvent;
            preview: Token;
            document: TokenDocument;
            index: number;
            count: number;
            position: Point;
            snap: boolean;
        }) => boolean | void;
        onRotate: (args: {
            event: WheelEvent;
            preview: Token;
            document: TokenDocument;
            index: number;
            count: number;
            precise: boolean;
        }) => boolean | void;
        onChange: (args: {
            preview: Token;
            document: TokenDocument;
            index: number;
            count: number;
        }) => void;
        preConfirm: (args: {
            event: PIXI.FederatedEvent;
            document: TokenDocument;
            index: number;
            count: number;
        }) => boolean | void;
        preSkip: (args: {
            event: PIXI.FederatedEvent;
            document: TokenDocument;
            index: number;
            count: number;
        }) => boolean | void;
        preCommit: (documents: ReadonlyArray<TokenDocument>) => Promise<any | void> | void;
        rotationNotification: boolean;
    } | null;
    set occlusionMode(value: number);
    /**
     * The set of tokens that trigger occlusion (a union of {@link CONST.TOKEN_OCCLUSION_MODES}).
     * @type {number}
     */
    get occlusionMode(): number;
    /** @override */
    override get hud(): foundry.applications.hud.TokenHUD;
    /**
     * An Array of tokens which belong to actors which are owned
     * @type {Token[]}
     */
    get ownedTokens(): Token[];
    /**
     * A Set of Token objects which currently display a combat turn marker.
     * @type {Set<Token>}
     */
    turnMarkers: Set<Token>;
    /** @override */
    override getSnappedPoint(point: any): foundry.types.Point;
    /** @override */
    override _prepareKeyboardMovementUpdates(objects: any, dx: any, dy: any, dz: any): ({
        _id: any;
    }[] | {
        movement: {};
    })[];
    /**
     * Target all Token instances which fall within a coordinate rectangle.
     * @param {Rectangle} rectangle                    The selection rectangle.
     * @param {object} [options]                      Additional options to configure targeting behaviour.
     * @param {boolean} [options.releaseOthers=true]  Whether or not to release other targeted tokens
     */
    targetObjects({ x, y, width, height }: Rectangle, { releaseOthers }?: {
        releaseOthers?: boolean | undefined;
    } | undefined): void;
    /**
     * Assign multiple token targets
     * @param {string[]|Set<string>} targetIds    The array or set of Token IDs.
     * @param {object} [options]                  Additional options to configure targeting behaviour.
     * @param {"replace"|"acquire"|"release"} [options.mode="replace"]   The mode that determines the targeting behavior.
     *   - `"replace"` (default): Replace the current set of targeted Tokens with provided set of Tokens.
     *   - `"acquire"`: Acquire the given Tokens as targets without releasing already targeted Tokens.
     *   - `"release"`: Release the given Tokens as targets.
     */
    setTargets(targetIds: string[] | Set<string>, { mode }?: {
        mode?: "replace" | "acquire" | "release" | undefined;
    } | undefined): void;
    /**
     * Cycle the controlled token by rotating through the list of Owned Tokens that are available within the Scene
     * Tokens are currently sorted in order of their TokenID
     *
     * @param {boolean} forwards  Which direction to cycle. A truthy value cycles forward, while a false value
     *                            cycles backwards.
     * @param {boolean} reset     Restart the cycle order back at the beginning?
     * @returns {Token|null}       The Token object which was cycled to, or null
     */
    cycleTokens(forwards: boolean, reset: boolean): Token | null;
    /**
     * Immediately conclude the animation of any/all tokens
     */
    concludeAnimation(): void;
    _t: number | undefined;
    /**
     * Recalculate the planned movement paths of all Tokens for the current User.
     */
    recalculatePlannedMovementPaths(): void;
    /**
     * Handle broadcast planned movement update.
     * @param {User} user    The User the planned movement data belongs to
     * @param {{[tokenId: string]: TokenPlannedMovement|null} | null} plannedMovements    The planned movement data
     * @internal
     */
    _updatePlannedMovements(user: User, plannedMovements: {
        [tokenId: string]: TokenPlannedMovement | null;
    } | null): void;
    /**
     * Provide an array of Tokens which are eligible subjects for tile occlusion.
     * By default, only tokens which are currently controlled or owned by a player are included as subjects.
     * @returns {Token[]}
     * @protected
     */
    protected _getOccludableTokens(): Token[];
    /** @inheritDoc */
    _getMovableObjects(ids: any, includeLocked: any): foundry.canvas.placeables.PlaceableObject[];
    /** @inheritDoc */
    _getCopyableObjects(options: any): foundry.canvas.placeables.PlaceableObject[];
    /** @override */
    override storeHistory(type: any, data: any, options: any): void;
    /** @override */
    override _onCycleViewKey(event: any): boolean;
    /** @override */
    override _confirmDeleteKey(documents: any): Promise<any>;
    /**
     * Place Tokens at the cursor.
     * Each Token is placed one after the other in the given order.
     * The placed Tokens can be rotated with the mouse wheel unless the `allowRotation` is false.
     * @param {Iterable<Partial<TokenData>>} data  The data of the Tokens to place
     * @param {object} [options]               Additional options
     * @param {boolean} [options.create=true]  Create the Tokens? If false, the preview documents is returned.
     *                                         Default: `true`. Non-GMs cannot create Tokens while the game is paused.
     * @param {Partial<Omit<DatabaseCreateOperation, "parent">>} [options.createOptions]  Optional creation options.
     *   By default the creation option `controlObject` is true.
     * @param {boolean} [options.allowRotation=true]  Allow rotation of the Tokens? Default: `true`.
     * @param {(args: {event: PIXI.FederatedEvent; preview: Token; document: TokenDocument; index: number; count: number;
     *     position: Point; snap: boolean}) => boolean|void} [options.onMove]
     *   Called when the pointer is moved and after starting the placement of the next Token on confirm and skip. This
     *   callback replaces the default behavior if false is returned. If false is returned, the callback should modify
     *   the passed `document` and set the render flags on `preview` corresponding to the applied changes.
     * @param {(args: {event: WheelEvent; preview: Token; document: TokenDocument; index: number; count: number;
     *     precise: boolean}) => boolean|void} [options.onRotate]
     *   Called when the mouse wheel is scrolled. This callback replaces the default behavior if false is returned.
     *   If false is returned, the callback should modify the `document` and set the render flags on `preview`
     *   corresponding to the applied changes.
     * @param {(args: {preview: Token; document: TokenDocument; index: number; count: number}) => void} [options.onChange]
     *   Called when the position or rotation of the Token that is placed has changed.
     * @param {(args: {event: PIXI.FederatedEvent; document: TokenDocument; index: number;
     *     count: number}) => boolean|void} [options.preConfirm]
     *   Called before the confirmation (left-click) of a Token placement. This callback may return false to prevent
     *   the placement of the Token and display a warning.
     * @param {(args: {event: PIXI.FederatedEvent; document: TokenDocument; index: number;
     *     count: number}) => boolean|void} [options.preSkip]
     *   Called before skipping (right-click) of a Token placement. This callback may return false to prevent
     *   skipping of the Token and display a warning.
     * @param {(documents: ReadonlyArray<TokenDocument>) => Promise<any|void>|void} [options.preCommit]
     *   Called at the end of the workflow before the Token documents are created/returned. This callback may return
     *   a falsely value other than undefined to prevent the Tokens from being created/returned.
     * @returns {Promise<TokenDocument[]>} The Token documents that were placed and not rejected by preCreate.
     *   If the dismiss key was pressed, the placement was rejected by `preCommit`, or the game was paused, the user is
     *   not a GM, and the `create` option is true, and empty array is returned.
     * @example Place 3 tokens with random actor.
     * ```js
     * const {count: numTokensToSpawn=3} = await foundry.applications.api.DialogV2.input({
     *  window: {
     *     title: "How many tokens to you want to place?"
     *  },
     *  content: `<input type="number" name="count" min="0" step="1" value="3">`
     * }) ?? {};
     * const actors = game.actors.contents;
     * const tokensToPlace = [];
     * for ( let i = 0; i < numTokensToSpawn; i++ ) {
     *   const actor = actors[Math.floor(Math.random() * actors.length)];
     *   const token = await actor.getTokenDocument({level: canvas.level.id}, {parent: canvas.scene});
     *   tokensToPlace.push(token.toObject());
     * }
     * const placedTokens = await canvas.tokens.placeTokens(tokensToPlace);
     * ```
     */
    placeTokens(data: Iterable<Partial<TokenData>>, { create, createOptions, allowRotation, onMove, onRotate, onChange, preConfirm, preSkip, preCommit }?: {
        create?: boolean | undefined;
        createOptions?: Partial<Omit<DatabaseCreateOperation, "parent">> | undefined;
        allowRotation?: boolean | undefined;
        onMove?: ((args: {
            event: PIXI.FederatedEvent;
            preview: Token;
            document: TokenDocument;
            index: number;
            count: number;
            position: Point;
            snap: boolean;
        }) => boolean | void) | undefined;
        onRotate?: ((args: {
            event: WheelEvent;
            preview: Token;
            document: TokenDocument;
            index: number;
            count: number;
            precise: boolean;
        }) => boolean | void) | undefined;
        onChange?: ((args: {
            preview: Token;
            document: TokenDocument;
            index: number;
            count: number;
        }) => void) | undefined;
        preConfirm?: ((args: {
            event: PIXI.FederatedEvent;
            document: TokenDocument;
            index: number;
            count: number;
        }) => boolean | void) | undefined;
        preSkip?: ((args: {
            event: PIXI.FederatedEvent;
            document: TokenDocument;
            index: number;
            count: number;
        }) => boolean | void) | undefined;
        preCommit?: ((documents: ReadonlyArray<TokenDocument>) => Promise<any | void> | void) | undefined;
    } | undefined): Promise<TokenDocument[]>;
    /**
     * Handle dropping of ActiveEffect data onto a Token, creating a new ActiveEffect on the corresponding Actor.
     * @param {DragEvent} event
     * @param {{type: "ActiveEffect"; uuid: string; x: number; y: number}} data
     * @internal
     */
    _onDropActiveEffect(event: DragEvent, data: {
        type: "ActiveEffect";
        uuid: string;
        x: number;
        y: number;
    }): Promise<void>;
    /**
     * Handle dropping of Actor data onto the Scene canvas
     * @param {DragEvent} event
     * @param {{type: "Actor"; uuid: string; x: number; y: number; elevation?: number}} data
     * @internal
     */
    _onDropActorData(event: DragEvent, data: {
        type: "Actor";
        uuid: string;
        x: number;
        y: number;
        elevation?: number;
    }): Promise<any>;
    /** @inheritDoc */
    _onClickLeft(event: any): any;
    /** @inheritDoc */
    _onClickLeft2(event: any): void;
    /** @inheritDoc */
    _onClickRight(event: any): void;
    /** @inheritDoc */
    _onClickRight2(event: any): void;
    /** @override */
    override _onMouseWheel(event: any): void | Promise<foundry.canvas.placeables.PlaceableObject[]>;
    /**
     * Cancel the placement.
     * @internal
     */
    _cancelPlacement(): void;
    /**
     * Cancel movement planning.
     * @internal
     */
    _cancelMovementPlanning(): void;
    #private;
}
import PlaceablesLayer from "./base/placeables-layer.mjs";
import type Token from "../placeables/token.mjs";
import type { TokenFindMovementPathOptions } from "../../_types.mjs";
import type { TokenMovementOptions } from "../../documents/_types.mjs";
import type { TokenPosition } from "../../../common/documents/_types.mjs";
import type { TokenMovementWaypoint } from "../../documents/_types.mjs";
import { TokenDocument } from "../../documents/_module.mjs";
import type { Rectangle } from "../../_types.mjs";
import type User from "../../documents/user.mjs";
import type { TokenPlannedMovement } from "../../_types.mjs";
import type { TokenData } from "../../../common/documents/_types.mjs";
