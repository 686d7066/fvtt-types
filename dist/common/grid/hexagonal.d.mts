/**
 * @import {HexagonalGridConfiguration, GridOffset2D, GridOffset3D, HexagonalGridCube2D, HexagonalGridCube3D,
 *   HexagonalGridCoordinates2D, HexagonalGridCoordinates3D} from "./_types.mjs"
 * @import {Point, ElevatedPoint} from "../_types.mjs"
 * @import {GridDiagonalRule} from "../constants.mjs"
 */
/**
 * The hexagonal grid class.
 * @extends {BaseGrid<HexagonalGridCoordinates2D, HexagonalGridCoordinates3D>}
 */
export default class HexagonalGrid extends BaseGrid<HexagonalGridCoordinates2D, HexagonalGridCoordinates3D> {
    /**
     * Calculate the total size of the canvas with padding applied, as well as the top-left coordinates of the inner
     * rectangle that houses the scene. (Legacy)
     * @param {number} columns            Column or row orientation?
     * @param {number} legacySize         The legacy size of the grid.
     * @param {number} sceneWidth         The width of the scene.
     * @param {number} sceneHeight        The height of the scene.
     * @param {number} padding            The percentage of padding.
     * @returns {{width: number, height: number, x: number, y: number, rows: number, columns: number}}
     * @internal
     * @ignore
     */
    static _calculatePreV10Dimensions(columns: number, legacySize: number, sceneWidth: number, sceneHeight: number, padding: number): {
        width: number;
        height: number;
        x: number;
        y: number;
        rows: number;
        columns: number;
    };
    /**
     * Round the fractional cube coordinates (q, r, s) / (q, r, s, k).
     * The k-coordinate is floored.
     * @see {@link https://www.redblobgames.com/grids/hexagons/}
     * @overload
     * @param {HexagonalGridCube2D} cube    The fractional cube coordinates
     * @returns {HexagonalGridCube2D}       The rounded integer cube coordinates
     */
    static cubeRound(cube: HexagonalGridCube2D): HexagonalGridCube2D;
    /**
     * @overload
     * @param {HexagonalGridCube3D} cube    The fractional cube coordinates
     * @returns {HexagonalGridCube3D}       The rounded integer cube coordinates
     */
    static cubeRound(cube: HexagonalGridCube3D): HexagonalGridCube3D;
    /**
     * Measure the distance in hexagons between two cube coordinates.
     * @see {@link https://www.redblobgames.com/grids/hexagons/}
     * @param {HexagonalGridCube2D} a    The first cube coordinates
     * @param {HexagonalGridCube2D} b    The second cube coordinates
     * @returns {number}                 The distance between the two cube coordinates in hexagons
     */
    static cubeDistance(a: HexagonalGridCube2D, b: HexagonalGridCube2D): number;
    /**
     * Used by {@link HexagonalGrid#snapToCenter}.
     * @type {Point}
     */
    static "__#39@#TEMP_POINT": Point;
    /**
     * Used by {@link HexagonalGrid#snapToCenter}.
     * Always an odd grid!
     * @type {HexagonalGrid}
     */
    static "__#39@#TEMP_GRID": HexagonalGrid;
    /**
     * The hexagonal grid constructor.
     * @param {HexagonalGridConfiguration} config   The grid configuration
     */
    constructor(config: HexagonalGridConfiguration);
    /**
     * @override
     * @readonly
     */
    override readonly type: 2 | 3 | 4 | 5;
    /**
     * Is this grid column-based (flat-topped) or row-based (pointy-topped)?
     * @type {boolean}
     * @readonly
     */
    readonly columns: boolean;
    /**
     * Is this grid even or odd?
     * @type {boolean}
     * @readonly
     */
    readonly even: boolean;
    /**
     * The rule for diagonal measurement (see {@link CONST.GRID_DIAGONALS}).
     * @type {GridDiagonalRule}
     * @readonly
     */
    readonly diagonals: GridDiagonalRule;
    /** @override */
    override getOffset(coords: any): {
        i: any;
        j: any;
        k: any;
    } | {
        i: any;
        j: any;
        k?: undefined;
    };
    /** @override */
    override getOffsetRange({ x, y, width, height }: {
        x: any;
        y: any;
        width: any;
        height: any;
    }): any[];
    /** @override */
    override getAdjacentOffsets(coords: any): ({
        i: any;
        j: any;
        k: any;
    } | {
        i: any;
        j: any;
        k?: undefined;
    })[];
    /** @override */
    override testAdjacency(coords1: any, coords2: any): boolean;
    /** @override */
    override getShiftedOffset(coords: any, direction: any): {
        i: any;
        j: any;
        k: any;
    } | {
        i: any;
        j: any;
        k?: undefined;
    };
    /** @override */
    override getShiftedPoint(point: any, direction: any): Point | {
        x: number;
        y: number;
        elevation: number;
    };
    /**
     * Returns the cube coordinates of the grid space corresponding to the given coordinates.
     * @overload
     * @param {HexagonalGridCoordinates2D} coords    The coordinates
     * @returns {HexagonalGridCube2D}                The cube coordinates
     */
    getCube(coords: HexagonalGridCoordinates2D): HexagonalGridCube2D;
    /**
     * @overload
     * @param {HexagonalGridCoordinates3D} coords    The coordinates
     * @returns {HexagonalGridCube3D}                The cube coordinates
     */
    getCube(coords: HexagonalGridCoordinates3D): HexagonalGridCube3D;
    /**
     * Returns the cube coordinates of grid spaces adjacent to the one corresponding to the given coordinates.
     * @overload
     * @param {HexagonalGridCoordinates2D} coords   The coordinates
     * @returns {HexagonalGridCube2D[]}             The adjacent cube coordinates
     */
    getAdjacentCubes(coords: HexagonalGridCoordinates2D): HexagonalGridCube2D[];
    /**
     * @overload
     * @param {HexagonalGridCoordinates3D} coords   The coordinates
     * @returns {HexagonalGridCube3D[]}             The adjacent cube coordinates
     */
    getAdjacentCubes(coords: HexagonalGridCoordinates3D): HexagonalGridCube3D[];
    /**
     * Returns the cube coordinates of the grid space corresponding to the given coordinates
     * shifted by one grid space in the given direction.
     * @overload
     * @param {HexagonalGridCoordinates2D} coords    The coordinates
     * @param {number} direction                     The direction (see {@link CONST.MOVEMENT_DIRECTIONS})
     * @returns {HexagonalGridCube2D}                The cube coordinates
     */
    getShiftedCube(coords: HexagonalGridCoordinates2D, direction: number): HexagonalGridCube2D;
    /**
     * @overload
     * @param {HexagonalGridCoordinates3D} coords    The coordinates
     * @param {number} direction                     The direction (see {@link CONST.MOVEMENT_DIRECTIONS})
     * @returns {HexagonalGridCube3D}                The cube coordinates
     */
    getShiftedCube(coords: HexagonalGridCoordinates3D, direction: number): HexagonalGridCube3D;
    /** @override */
    override getTopLeftPoint(coords: any): {
        x: number;
        y: number;
        elevation: number;
    } | {
        x: number;
        y: number;
        elevation?: undefined;
    };
    /** @override */
    override getCenterPoint(coords: any): Point | {
        x: number;
        y: number;
        elevation: number;
    };
    /** @override */
    override getVertices(coords: any): {
        x: number;
        y: number;
    }[];
    /** @override */
    override getSnappedPoint(point: any, { mode, resolution }: {
        mode: any;
        resolution?: number | undefined;
    }): any;
    /** @inheritdoc */
    calculateDimensions(sceneWidth: any, sceneHeight: any, padding: any): {
        width: any;
        height: any;
        x: number;
        y: number;
        rows: number;
        columns: number;
    };
    /** @override */
    override _measurePath(waypoints: any, { cost }: {
        cost: any;
    }, result: any): void;
    /**
     * @see {@link https://www.redblobgames.com/grids/hexagons/#line-drawing}
     * @override
     */
    override getDirectPath(waypoints: any): ({
        i: any;
        j: any;
        k: any;
    } | {
        i: any;
        j: any;
        k?: undefined;
    })[];
    /** @override */
    override getTranslatedPoint(point: any, direction: any, distance: any): {
        x: any;
        y: any;
        elevation: any;
    } | {
        x: any;
        y: any;
        elevation?: undefined;
    };
    /** @override */
    override getCircle({ x, y }: {
        x: any;
        y: any;
    }, radius: any): {
        x: any;
        y: any;
    }[];
    /**
     * Convert point coordinates (x, y) / (x, y, elevation) into cube coordinates (q, r, s) / (q, r, s, k).
     * Inverse of {@link HexagonalGrid#cubeToPoint}.
     * @see {@link https://www.redblobgames.com/grids/hexagons/}
     * @overload
     * @param {Point} point              The point
     * @returns {HexagonalGridCube2D}    The (fractional) cube coordinates
     */
    pointToCube(point: Point): HexagonalGridCube2D;
    /**
     * @overload
     * @param {ElevatedPoint} point      The point
     * @returns {HexagonalGridCube3D}    The (fractional) cube coordinates
     */
    pointToCube(point: ElevatedPoint): HexagonalGridCube3D;
    /**
     * Convert cube coordinates (q, r, s) / (q, r, s, k) into point coordinates (x, y) / (x, y, elevation).
     * Inverse of {@link HexagonalGrid#pointToCube}.
     * @see {@link https://www.redblobgames.com/grids/hexagons/}
     * @overload
     * @param {HexagonalGridCube2D} cube    The cube coordinates
     * @returns {Point}                     The point coordinates
     */
    cubeToPoint(cube: HexagonalGridCube2D): Point;
    /**
     * @overload
     * @param {HexagonalGridCube3D} cube    The cube coordinates
     * @returns {ElevatedPoint}             The point coordinates
     */
    cubeToPoint(cube: HexagonalGridCube3D): ElevatedPoint;
    /**
     * Convert offset coordinates (i, j) / (i, j, k) into integer cube coordinates (q, r, s) / (q, r, s, k).
     * Inverse of {@link HexagonalGrid#cubeToOffset}.
     * @see {@link https://www.redblobgames.com/grids/hexagons/}
     * @overload
     * @param {GridOffset2D} offset      The offset coordinates
     * @returns {HexagonalGridCube2D}    The integer cube coordinates
     */
    offsetToCube(offset: GridOffset2D): HexagonalGridCube2D;
    /**
     * @overload
     * @param {GridOffset3D} offset      The offset coordinates
     * @returns {HexagonalGridCube3D}    The integer cube coordinates
     */
    offsetToCube(offset: GridOffset3D): HexagonalGridCube3D;
    /**
     * Convert integer cube coordinates (q, r, s) / (q, r, s, k) into offset coordinates (i, j) / (i, j, k).
     * Inverse of {@link HexagonalGrid#offsetToCube}.
     * @see {@link https://www.redblobgames.com/grids/hexagons/}
     * @overload
     * @param {HexagonalGridCube2D} cube    The cube coordinates
     * @returns {GridOffset2D}              The offset coordinates
     */
    cubeToOffset(cube: HexagonalGridCube2D): GridOffset2D;
    /**
     * @overload
     * @param {HexagonalGridCube3D} cube    The cube coordinates
     * @returns {GridOffset3D}              The offset coordinates
     */
    cubeToOffset(cube: HexagonalGridCube3D): GridOffset3D;
    #private;
}
import type { HexagonalGridCoordinates2D } from "./_types.mjs";
import type { HexagonalGridCoordinates3D } from "./_types.mjs";
import BaseGrid from "./base.mjs";
import type { GridDiagonalRule } from "../constants.mjs";
import type { Point } from "../_types.mjs";
import type { HexagonalGridCube2D } from "./_types.mjs";
import type { HexagonalGridCube3D } from "./_types.mjs";
import type { ElevatedPoint } from "../_types.mjs";
import type { GridOffset2D } from "./_types.mjs";
import type { GridOffset3D } from "./_types.mjs";
import type { HexagonalGridConfiguration } from "./_types.mjs";
