/**
 * The gridless grid class.
 */
export default class GridlessGrid extends BaseGrid<foundry.grid.types.GridCoordinates2D, foundry.grid.types.GridCoordinates3D> {
    constructor(config: foundry.grid.types.GridConfiguration);
    /**
     * @override
     * @readonly
     */
    override readonly type: 0;
    /** @override */
    override calculateDimensions(sceneWidth: any, sceneHeight: any, padding: any): {
        width: any;
        height: any;
        x: number;
        y: number;
        rows: number;
        columns: number;
    };
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
    override getAdjacentOffsets(coords: any): never[];
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
        x: any;
        y: any;
        elevation: any;
    } | {
        x: any;
        y: any;
        elevation?: undefined;
    };
    /** @override */
    override getTopLeftPoint(coords: any): {
        x: any;
        y: any;
        elevation?: undefined;
    } | {
        x: any;
        y: any;
        elevation: any;
    };
    /** @override */
    override getCenterPoint(coords: any): {
        x: any;
        y: any;
        elevation?: undefined;
    } | {
        x: any;
        y: any;
        elevation: any;
    };
    /** @override */
    override getVertices(coords: any): never[];
    /** @override */
    override getSnappedPoint({ x, y, elevation }: {
        x: any;
        y: any;
        elevation: any;
    }, behavior: any): {
        x: any;
        y: any;
        elevation: any;
    } | {
        x: any;
        y: any;
        elevation?: undefined;
    };
    /** @override */
    override _measurePath(waypoints: any, { cost }: {
        cost: any;
    }, result: any): void;
    /** @override */
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
    }, radius: any): any[];
    /** @override */
    override getCone(origin: any, radius: any, direction: any, angle: any): any[];
    /** @override */
    override getEllipse({ x, y }: {
        x: any;
        y: any;
    }, radiusX: any, radiusY: any, rotation: any): any[];
}
import BaseGrid from "./base.mjs";
