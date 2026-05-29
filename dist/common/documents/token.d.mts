/**
 * @import {Point, ElevatedPoint, DeepReadonly} from "../_types.mjs";
 * @import {TokenShapeType} from "../constants.mjs";
 * @import {TokenHexagonalOffsetsData, TokenHexagonalShapeData, TokenDimensions, TokenPosition} from "./_types.mjs";
 * @import {GridOffset2D, GridOffset3D} from "../grid/_types.mjs";
 * @import {TokenData} from "./_types.mjs";
 * @import {SquareGrid} from "../grid/_module.mjs";
 * @import {DataModelUpdateOptions, DocumentPermissionTest} from "../abstract/_types.mjs";
 */
/**
 * The Token Document.
 * Defines the DataSchema and common behaviors for a Token which are shared between both client and server.
 * @extends {Document<TokenData>}
 * @mixes TokenData
 * @category Documents
 */
export default class BaseToken extends Document<TokenData, foundry.abstract.types.DocumentConstructionContext> {
    /** @inheritdoc */
    static metadata: object;
    /** @inheritdoc */
    static defineSchema(): {
        texture: TextureData;
        sort: fields.NumberField;
        locked: fields.BooleanField;
        lockRotation: fields.BooleanField;
        rotation: fields.AngleField;
        alpha: fields.AlphaField;
        hidden: fields.BooleanField;
        disposition: fields.NumberField;
        displayBars: fields.NumberField;
        bar1: fields.SchemaField;
        bar2: fields.SchemaField;
        light: fields.EmbeddedDataField;
        sight: fields.SchemaField;
        detectionModes: fields.TypedObjectField;
        occludable: fields.SchemaField;
        ring: fields.SchemaField;
        turnMarker: fields.SchemaField;
        movementAction: fields.StringField;
        /** @internal */
        _movementHistory: fields.ArrayField<fields.SchemaField>;
        /** @internal */
        _regions: fields.ArrayField<fields.ForeignDocumentField>;
        flags: fields.DocumentFlagsField;
        _id: fields.DocumentIdField;
        name: fields.StringField;
        displayName: fields.NumberField;
        actorId: fields.ForeignDocumentField;
        actorLink: fields.BooleanField;
        delta: ActorDeltaField;
    };
    /**
     * Define the movement fields.
     * @param {object} options
     * @param {boolean} [options.noInitials=false]   If true, `initial` is undefined for all movement fields
     * @returns {object}
     */
    static "__#41@#defineMovementFields"({ noInitials }?: {
        noInitials?: boolean | undefined;
    }): object;
    /**
     * The fields of the data model for which changes count as a movement action.
     * @type {Readonly<["x", "y", "elevation", "width", "height", "depth", "shape", "level"]>}
     * @readonly
     */
    static readonly MOVEMENT_FIELDS: Readonly<["x", "y", "elevation", "width", "height", "depth", "shape", "level"]>;
    /**
     * Are the given positions equal?
     * @param {TokenPosition} position1
     * @param {TokenPosition} position2
     * @returns {boolean}
     */
    static arePositionsEqual(position1: TokenPosition, position2: TokenPosition): boolean;
    /**
     * The default icon used for newly created Token documents
     * @type {string}
     */
    static DEFAULT_ICON: string;
    /**
     * Get the snapped position on a square grid.
     * @param {SquareGrid} grid     The square grid
     * @param {Point} position      The position that is snapped or grid offset
     * @param {number} width        The width in grid spaces (positive multiple of 0.5)
     * @param {number} height       The height in grid spaces (positive multiple of 0.5)
     * @returns {Point}             The snapped position
     */
    static "__#41@#getSnappedPositionInSquareGrid"(grid: SquareGrid, position: Point, width: number, height: number): Point;
    /**
     * Get the snapped position on a hexagonal grid.
     * @param {SquareGrid} grid       The hexagonal grid
     * @param {Point} position        The position that is snapped or grid offset
     * @param {number} width          The width in grid spaces (positive multiple of 0.5)
     * @param {number} height         The height in grid spaces (positive multiple of 0.5)
     * @param {TokenShapeType} shape  The shape (one of {@link CONST.TOKEN_SHAPES})
     * @returns {Point}               The snapped position
     */
    static "__#41@#getSnappedPositionInHexagonalGrid"(grid: SquareGrid, position: Point, width: number, height: number, shape: CONST.TokenShapeType): Point;
    /**
     * The cache of hexagonal offsets.
     * @type {Map<string, DeepReadonly<TokenHexagonalOffsetsData>>}
     */
    static "__#41@#hexagonalOffsets": Map<string, DeepReadonly<TokenHexagonalOffsetsData>>;
    /**
     * Get the hexagonal offsets given the type, width, and height.
     * @param {number} width                                 The width of the Token (positive multiple of 0.5)
     * @param {number} height                                The height of the Token (positive multiple of 0.5)
     * @param {TokenShapeType} shape                         The shape (one of {@link CONST.TOKEN_SHAPES})
     * @param {boolean} columns                              Column-based instead of row-based hexagonal grid?
     * @returns {DeepReadonly<TokenHexagonalOffsetsData>}    The hexagonal offsets
     * @internal
     */
    static _getHexagonalOffsets(width: number, height: number, shape: CONST.TokenShapeType, columns: boolean): DeepReadonly<TokenHexagonalOffsetsData>;
    /**
     * The cache of hexagonal shapes.
     * @type {Map<string, DeepReadonly<TokenHexagonalShapeData>>}
     */
    static "__#41@#hexagonalShapes": Map<string, DeepReadonly<TokenHexagonalShapeData>>;
    /**
     * Get the hexagonal shape given the type, width, and height.
     * @param {number} width                                    The width of the Token (positive)
     * @param {number} height                                   The height of the Token (positive)
     * @param {TokenShapeType} shape                            The shape (one of {@link CONST.TOKEN_SHAPES})
     * @param {boolean} columns                                 Column-based instead of row-based hexagonal grid?
     * @returns {DeepReadonly<TokenHexagonalShapeData>|null}    The hexagonal shape or null if there is no shape
     *                                                          for the given combination of arguments
     * @internal
     */
    static _getHexagonalShape(width: number, height: number, shape: CONST.TokenShapeType, columns: boolean): DeepReadonly<TokenHexagonalShapeData> | null;
    /**
     * Create the row-based hexagonal ellipse/trapezoid given the type, width, and height.
     * @param {number} width                   The width of the Token (positive)
     * @param {number} height                  The height of the Token (positive)
     * @param {number} shape                   The shape type (must be ELLIPSE_1, ELLIPSE_1, TRAPEZOID_1, or TRAPEZOID_2)
     * @returns {TokenHexagonalShapeData|null} The hexagonal shape or null if there is no shape for the given combination
     *                                         of arguments
     */
    static "__#41@#createHexagonalEllipseOrTrapezoid"(width: number, height: number, shape: number): TokenHexagonalShapeData | null;
    /**
     * Create the row-based hexagonal rectangle given the type, width, and height.
     * @param {number} width                      The width of the Token (positive)
     * @param {number} height                     The height of the Token (positive)
     * @param {TokenShapeType} shape              The shape type (must be RECTANGLE_1 or RECTANGLE_2)
     * @returns {TokenHexagonalShapeData|null}    The hexagonal shape or null if there is no shape
     *                                            for the given combination of arguments
     */
    static "__#41@#createHexagonalRectangle"(width: number, height: number, shape: CONST.TokenShapeType): TokenHexagonalShapeData | null;
    /** @inheritDoc */
    static migrateData(data: any): object;
    /** @inheritdoc */
    static shimData(data: any, options: any): object;
    constructor(data?: Partial<TokenData> | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DocumentConstructionContext | undefined);
    /** @inheritDoc */
    _initializeSource(data: any, options: any): object;
    /**
     * Prepare changes to a descendent delta collection.
     * @param {object} changes                  Candidate source changes.
     * @param {DataModelUpdateOptions} options  Options which determine how the new data is merged.
     * @internal
     */
    _prepareDeltaUpdate(changes?: object, options?: DataModelUpdateOptions): void;
    /** @inheritDoc */
    updateSource(changes?: {}, options?: {}): object;
    /** @inheritDoc */
    clone(data?: {}, context?: {}): Document<object, foundry.abstract.types.DocumentConstructionContext> | Promise<Document<object, foundry.abstract.types.DocumentConstructionContext>>;
    /**
     * Get the snapped position of the Token.
     * @param {Partial<ElevatedPoint & Omit<TokenDimensions, "depth">>} [data]  The position and dimensions
     * @returns {ElevatedPoint}                                                 The snapped position
     */
    getSnappedPosition(data?: Partial<ElevatedPoint & Omit<TokenDimensions, "depth">> | undefined): ElevatedPoint;
    /**
     * Get the top-left grid offset of the Token.
     * @param {Partial<ElevatedPoint & Omit<TokenDimensions, "depth">>} [data]  The position and dimensions
     * @returns {GridOffset3D}                                                  The top-left grid offset
     * @internal
     */
    _positionToGridOffset(data?: Partial<ElevatedPoint & Omit<TokenDimensions, "depth">> | undefined): GridOffset3D;
    /**
     * Get the position of the Token from the top-left grid offset.
     * @param {GridOffset3D } offset                            The top-left grid offset
     * @param {Partial<Omit<TokenDimensions, "depth">>} [data]  The dimensions that override the current dimensions
     * @returns {ElevatedPoint}                                 The snapped position
     * @internal
     */
    _gridOffsetToPosition(offset: GridOffset3D, data?: Partial<Omit<TokenDimensions, "depth">> | undefined): ElevatedPoint;
    /**
     * Get the width and height of the Token in pixels.
     * @param {Partial<{width: number; height: number}>} [data] The width and/or height in grid units (must be positive)
     * @returns {{width: number; height: number}} The width and height in pixels
     */
    getSize(data?: Partial<{
        width: number;
        height: number;
    }> | undefined): {
        width: number;
        height: number;
    };
    /**
     * Get the center point of the Token's base.
     *
     * This elevation of the center point is always equal to the elevation of the Token. The center point
     * is independent of the Token's depth.
     * @param {Partial<ElevatedPoint & Omit<TokenDimensions, "depth">>} [data]  The position and dimensions
     * @returns {ElevatedPoint}                                                 The center point
     */
    getCenterPoint(data?: Partial<ElevatedPoint & Omit<TokenDimensions, "depth">> | undefined): ElevatedPoint;
    /**
     * Get the grid space polygon of the Token.
     * Returns undefined in gridless grids because there are no grid spaces.
     * @param {Partial<Omit<TokenDimensions, "depth">>} [data]  The dimensions
     * @returns {Point[]|void}                                  The grid space polygon or undefined if gridless
     */
    getGridSpacePolygon(data?: Partial<Omit<TokenDimensions, "depth">> | undefined): Point[] | void;
    /** @override */
    override getUserLevel(user: any): any;
    /**
     * @deprecated since v13
     * @ignore
     */
    get hexagonalShape(): any;
}
/**
 * A special subclass of EmbeddedDocumentField which allows construction of the ActorDelta to be lazily evaluated.
 */
export class ActorDeltaField extends fields.EmbeddedDocumentField {
}
import type { TokenData } from "./_types.mjs";
import Document from "../abstract/document.mjs";
import type { DataModelUpdateOptions } from "../abstract/_types.mjs";
import type { ElevatedPoint } from "../_types.mjs";
import type { TokenDimensions } from "./_types.mjs";
import type { GridOffset3D } from "../grid/_types.mjs";
import type { Point } from "../_types.mjs";
import { TextureData } from "../data/data.mjs";
import * as fields from "../data/fields.mjs";
import type { TokenPosition } from "./_types.mjs";
import type { SquareGrid } from "../grid/_module.mjs";
import * as CONST from "../constants.mjs";
import type { TokenHexagonalOffsetsData } from "./_types.mjs";
import type { DeepReadonly } from "../_types.mjs";
import type { TokenHexagonalShapeData } from "./_types.mjs";
