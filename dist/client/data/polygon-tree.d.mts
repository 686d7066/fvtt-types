/**
 * @import {DeepReadonly, Point, ClipperPoint} from "../_types.mjs";
 */
/**
 * The node of a {@link foundry.data.PolygonTree}.
 */
export class PolygonTreeNode {
    /**
     * Create a node from the Clipper path and add it to the children of the parent.
     * @param {ClipperPoint[]} clipperPath The clipper path of this node.
     * @param {PolygonTreeNode|null} parent    The parent node or `null` if root.
     * @internal
     */
    static _fromClipperPath(clipperPath: ClipperPoint[], parent: PolygonTreeNode | null): PolygonTreeNode;
    /**
     * Create a PolygonTreeNode.
     * @param {PolygonTreeNode|null} parent    The parent node.
     * @internal
     */
    constructor(parent: PolygonTreeNode | null);
    /**
     * The parent of this node or `null` if this is the root node.
     * @type {PolygonTreeNode|null}
     */
    get parent(): PolygonTreeNode | null;
    /**
     * The children of this node.
     *
     * The value of this property must not be mutated.
     * @type {ReadonlyArray<PolygonTreeNode>}
     */
    get children(): readonly PolygonTreeNode[];
    /**
     * The depth of this node.
     * The depth of the root node is 0.
     * @type {number}
     */
    get depth(): number;
    /**
     * Is this a hole?
     * The root node is a hole.
     * @type {boolean}
     */
    get isHole(): boolean;
    /**
     * Is the (sub)tree empty?
     * @type {boolean}
     */
    get isEmpty(): boolean;
    /**
     * The Clipper path of this node.
     * It is empty in case of the root node.
     *
     * The value of this property must not be mutated.
     * @type {DeepReadonly<ClipperPoint[]>|null}
     */
    get clipperPath(): readonly DeepReadonly<ClipperPoint>[] | null;
    /**
     * The polygon of this node.
     * It is `null` in case of the root node.
     *
     * The value of this property must not be mutated.
     * @type {PIXI.Polygon|null}
     */
    get polygon(): any;
    /**
     * The points of the polygon ([x0, y0, x1, y1, ...]).
     * They are `null` in case of the root node.
     *
     * The value of this property must not be mutated.
     * @type {ReadonlyArray<number>|null}
     */
    get points(): readonly number[] | null;
    /**
     * The path of the polygon ([{x: x0, y: y0}, {x: x1, y: y1}, ...]).
     * They are `null` in case of the root node.
     *
     * The value of this property must not be mutated.
     * @type {ReadonlyArray<Point>|null}
     */
    get path(): readonly Point[] | null;
    /**
     * The bounds of the polygon, or the combined bounds of all children in case of the root node.
     *
     * The value of this property must not be mutated.
     * @type {PIXI.Rectangle}
     */
    get bounds(): PIXI.Rectangle;
    /**
     * The area of this node.
     * @type {number}
     */
    get area(): number;
    /**
     * Find the node in this (sub)tree that contains the given point.
     * @param {Point} point              The point.
     * @returns {PolygonTreeNode|null}   The (sub)node that contains the point, if any.
     *                                   Cannot return null for {@link PolygonTree}; instead
     *                                   the root node (the tree itself) is returned.
     */
    findContainingNode(point: Point): PolygonTreeNode | null;
    /**
     * Test whether given point is contained within this (sub)tree.
     * If `distance` is is nonzero, true is returned if and only if the signed distance from the point to the boundary of
     * the (sub)tree is less than or equal to `distance`. The signed distance is positive for points in the exterior of
     * the (sub)tree and negative for points within the interior of the (sub)tree.
     * @param {Point} point           The point.
     * @param {number} [distance=0]   The tolerance of the containment test.
     * @returns {boolean}
     * @example Test whether the point (x, y) is contained within the polygon tree
     * ```js
     * polygonTree.testPoint({x, y}, r);
     * ```
     * @example Test whether the circle at (x, y) with radius r (positive) intersects the polygon tree
     * ```js
     * polygonTree.testPoint({x, y}, r);
     * ```
     * @example Test whether the circle at (x, y) with radius r (positive) is contained within the polygon tree
     * ```js
     * polygonTree.testPoint({x, y}, -r);
     * ```
     */
    testPoint(point: Point, distance?: number | undefined): boolean;
    /**
     * Test circle containment/intersection with this (sub)tree.
     * @param {Point} center     The center point of the circle.
     * @param {number} radius    The radius of the circle.
     * @returns {-1|0|1}          - -1: the circle is in the exterior and does not intersect the boundary.
     *                            - 0: the circle is intersects the boundary.
     *                            - 1: the circle is in the interior and does not intersect the boundary.
     */
    testCircle(center: Point, radius: number): -1 | 0 | 1;
    /**
     * Find a point inside this polygon tree that is closest to the given reference point.
     * @param {Point} point    The reference point.
     * @returns {Point}        The closest point to the reference point in the polygon tree.
     */
    findClosestPoint(point: Point): Point;
    /**
     * Iterate over recursively over the children in depth-first order.
     * @returns {Generator<PolygonTreeNode>}
     * @yields {PolygonTreeNode}
     */
    [Symbol.iterator](): Generator<PolygonTreeNode>;
    #private;
}
/**
 * A polygon tree.
 */
export class PolygonTree extends PolygonTreeNode {
    /**
     * Create the tree from a Clipper polygon tree.
     * @param {ClipperLib.PolyTree} clipperPolyTree
     * @returns {PolygonTree}
     */
    static fromClipperPolyTree(clipperPolyTree: ClipperLib.PolyTree): PolygonTree;
    /**
     * Pick a sampling element from a cumulative weight table.
     * @param {Float64Array} weights  The cumulative weights.
     * @param {number} totalWeight    The total cumulative weight.
     * @returns {number}              The selected element index.
     */
    static "__#61@#selectSamplingIndex"(weights: Float64Array, totalWeight: number): number;
    /**
     * Create a PolygonTree.
     */
    constructor();
    /**
     * The polygons of this polygon tree.
     *
     * The value of this property must not be mutated.
     * @type {ReadonlyArray<PIXI.Polygon>}
     */
    get polygons(): readonly PIXI.Polygon[];
    /**
     * The Clipper paths of this polygon tree.
     *
     * The value of this property must not be mutated.
     * @type {DeepReadonly<ClipperPoint[][]>}
     */
    get clipperPaths(): readonly (readonly DeepReadonly<ClipperPoint>[])[];
    /**
     * The triangulation of this polygon tree.
     *
     * The value of this property must not be mutated.
     * @type {Readonly<{vertices: Float32Array; indices: Uint16Array|Uint32Array}>}
     */
    get triangulation(): Readonly<{
        vertices: Float32Array;
        indices: Uint16Array | Uint32Array;
    }>;
    /**
     * Draw the polygon tree into the Graphics element.
     * @param {PIXI.Graphics} graphics   The Graphics element.
     */
    drawShape(graphics: PIXI.Graphics): void;
    /**
     * Compute the intersection of the polygon tree with the given polygon.
     * @param {PIXI.Polygon} polygon       The polygon to intersect the polygon tree with.
     * @param {object} [options]           Additional options.
     * @param {number} [options.clipType]  The Clipper clip type. Default: `ClipperLib.ClipType.ctIntersection`.
     * @param {number} [options.fillType]  The Clipper fill type used for the polygon.
     *                                     Default: `ClipperLib.PolyFillType.pftEvenOdd`.
     * @returns {PolygonTree}              The result of the intersection.
     */
    intersectPolygon(polygon: PIXI.Polygon, options?: {
        clipType?: number | undefined;
        fillType?: number | undefined;
    } | undefined): PolygonTree;
    /**
     * Compute the intersection of the polygon tree with the given Clipper path.
     * @param {ClipperPoint[]} path        The Clipper path to intersect the polygon tree with
     *                                     (the scaling factor must be {@link CONST.CLIPPER_SCALING_FACTOR}).
     * @param {object} [options]           Additional options.
     * @param {number} [options.clipType]  The Clipper clip type. Default: `ClipperLib.ClipType.ctIntersection`.
     * @param {number} [options.fillType]  The Clipper fill type used for the Clipper path.
     *                                     Default: `ClipperLib.PolyFillType.pftEvenOdd`.
     * @returns {PolygonTree}              The result of the intersection.
     */
    intersectClipper(path: ClipperPoint[], { clipType, fillType }?: {
        clipType?: number | undefined;
        fillType?: number | undefined;
    } | undefined): PolygonTree;
    /**
     * Sample a point from the polygon tree interior.
     * @param {Point} [out]  A point to write to.
     * @returns {Point}      The sampled point.
     * @throws {Error}       If the polygon tree interior is empty.
     */
    sampleInterior(out?: Point | undefined): Point;
    /**
     * Sample a point from the polygon tree boundary.
     * @param {Point} [out]  A point to write to.
     * @returns {Point}      The sampled point.
     * @throws {Error}       If the polygon tree boundary is empty.
     */
    sampleBoundary(out?: Point | undefined): Point;
    #private;
}
import type { ClipperPoint } from "../_types.mjs";
import type { DeepReadonly } from "../_types.mjs";
import type { Point } from "../_types.mjs";
