/**
 * @import {SquareGridConfiguration, GridOffset2D, GridOffset3D, GridCoordinates2D,
 *   GridCoordinates3D} from "./_types.mjs"
 * @import {Point} from "../_types.mjs"
 * @import {GridDiagonalRule} from "../constants.mjs"
 */
/**
 * The square grid class.
 */
export default class SquareGrid extends BaseGrid<GridCoordinates2D, GridCoordinates3D> {
    /**
     * The square grid constructor.
     * @param {SquareGridConfiguration} config   The grid configuration
     */
    constructor(config: SquareGridConfiguration);
    /**
     * The rule for diagonal measurement (see {@link CONST.GRID_DIAGONALS}).
     * @type {GridDiagonalRule}
     * @readonly
     */
    readonly diagonals: GridDiagonalRule;
    /**
     * @override
     * @readonly
     */
    override readonly type: 1;
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
    }): number[];
    /** @override */
    override getAdjacentOffsets(coords: any): {
        i: any;
        j: any;
    }[] | {
        i: any;
        j: any;
        k: any;
    }[];
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
    override getShiftedPoint(point: any, direction: any): {
        x: number;
        y: number;
        elevation?: undefined;
    } | {
        x: number;
        y: number;
        elevation: number;
    };
    /** @override */
    override getTopLeftPoint(coords: any): {
        x: number;
        y: number;
        elevation?: undefined;
    } | {
        x: number;
        y: number;
        elevation: number;
    };
    /** @override */
    override getCenterPoint(coords: any): {
        x: number;
        y: number;
        elevation?: undefined;
    } | {
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
    }): {
        x: any;
        y: any;
        elevation: any;
    } | {
        x: any;
        y: any;
        elevation?: undefined;
    } | undefined;
    /** @override */
    override _measurePath(waypoints: any, { cost }: {
        cost: any;
    }, result: any): void;
    /** @override */
    override getDirectPath(waypoints: any): GridOffset2D[];
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
    override getCircle(center: any, radius: any): Point[];
    /** @inheritDoc */
    getEllipse(center: any, radiusX: any, radiusY: any, rotation: any): Point[];
    /** @inheritDoc */
    getRing(center: any, radius: any, innerWidth: any, outerWidth: any): Point[][];
    /** @override */
    override calculateDimensions(sceneWidth: any, sceneHeight: any, padding: any): {
        width: any;
        height: any;
        x: number;
        y: number;
        rows: number;
        columns: number;
    };
    #private;
}
import type { GridCoordinates2D } from "./_types.mjs";
import type { GridCoordinates3D } from "./_types.mjs";
import BaseGrid from "./base.mjs";
import type { GridDiagonalRule } from "../constants.mjs";
import type { GridOffset2D } from "./_types.mjs";
import type { Point } from "../_types.mjs";
import type { SquareGridConfiguration } from "./_types.mjs";
