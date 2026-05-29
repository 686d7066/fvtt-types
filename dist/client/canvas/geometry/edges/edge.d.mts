/**
 * @import {Point} from "../../../../common/_types.mjs";
 * @import {EdgeRestrictionType, EdgeDirection, EdgeSenseType} from "../../../../common/constants.mjs";
 * @import {LineIntersection} from "../../../../common/utils/_types.mjs";
 * @import PolygonVertex from "./vertex.mjs";
 * @import {EdgeCreationOptions, EdgeThresholdData} from "../_types.mjs";
 */
/**
 * A data structure used to represent potential edges used by the ClockwiseSweepPolygon.
 * Edges are not polygon-specific, meaning they can be reused across many polygon instances.
 */
export default class Edge {
    /**
     * Identify intersections between a provided iterable of edges.
     * @param {Iterable<Edge>} edges    An iterable of edges
     * @param {string} level            The ID of the Level the edges are in
     */
    static identifyEdgeIntersections(edges: Iterable<Edge>, level: string): void;
    /**
     * Construct an Edge by providing the following information.
     * @param {Point} a                         The first endpoint of the edge
     * @param {Point} b                         The second endpoint of the edge
     * @param {EdgeCreationOptions} [options]   Additional options which describe the edge
     */
    constructor(a: Point, b: Point, { id, object, direction, type, light, darkness, move, sight, sound, threshold, priority }?: EdgeCreationOptions | undefined);
    /**
     * The first endpoint of the edge.
     * @type {PIXI.Point}
     */
    a: PIXI.Point;
    /**
     * The second endpoint of the edge.
     * @type {PIXI.Point}
     */
    b: PIXI.Point;
    type: foundry.canvas.geometry.types.EdgeType;
    /**
     * A string used to uniquely identify this edge, if any.
     * @type {string|undefined}
     */
    id: string | undefined;
    /**
     * The Document/PlaceableObject the edge belongs to, if any.
     * @type {Document|PlaceableObject|undefined}
     */
    object: Document | PlaceableObject | undefined;
    /**
     * The direction of effect for the edge.
     * @type {EdgeDirection}
     */
    direction: EdgeDirection;
    /**
     * How this edge restricts light.
     * @type {EdgeSenseType}
     */
    light: EdgeSenseType;
    /**
     * How this edge restricts darkness.
     * @type {EdgeSenseType}
     */
    darkness: EdgeSenseType;
    /**
     * How this edge restricts movement.
     * @type {EdgeSenseType}
     */
    move: EdgeSenseType;
    /**
     * How this edge restricts sight.
     * @type {EdgeSenseType}
     */
    sight: EdgeSenseType;
    /**
     * How this edge restricts sound.
     * @type {EdgeSenseType}
     */
    sound: EdgeSenseType;
    /**
     * Specialized threshold data for this edge.
     * @type {EdgeThresholdData|null}
     */
    threshold: EdgeThresholdData | null;
    priority: number;
    /**
     * The endpoint of the edge which is oriented towards the top-left.
     */
    nw: Point;
    /**
     * The endpoint of the edge which is oriented towards the bottom-right.
     */
    se: Point;
    /**
     * The rectangular bounds of the edge. Used by the quadtree.
     * @type {PIXI.Rectangle}
     */
    bounds: PIXI.Rectangle;
    /**
     * Record other edges which this one intersects with by level.
     * @type {{[level: string]: {edge: Edge; intersection: LineIntersection}[]}}
     */
    intersections: {
        [level: string]: {
            edge: Edge;
            intersection: LineIntersection;
        }[];
    };
    /**
     * A PolygonVertex instance.
     * Used as part of ClockwiseSweepPolygon computation.
     * @type {PolygonVertex|undefined}
     */
    vertexA: PolygonVertex | undefined;
    /**
     * A PolygonVertex instance.
     * Used as part of ClockwiseSweepPolygon computation.
     * @type {PolygonVertex|undefined}
     */
    vertexB: PolygonVertex | undefined;
    /**
     * Is this edge limited for a particular type?
     * @param {EdgeRestrictionType} type
     * @returns {boolean}
     */
    isLimited(type: EdgeRestrictionType): boolean;
    /**
     * Create a copy of the Edge which can be safely mutated.
     * @returns {Edge}
     */
    clone(): Edge;
    /**
     * Get an intersection point between this Edge and another.
     * @param {Edge} other
     * @returns {LineIntersection|void}
     */
    getIntersection(other: Edge): LineIntersection | void;
    /**
     * Test whether to apply a proximity threshold to this edge.
     * If the proximity threshold is met, this edge excluded from perception calculations.
     * @param {string} sourceType     Sense type for the source
     * @param {Point} sourceOrigin    The origin or position of the source on the canvas
     * @param {number} [externalRadius=0] The external radius of the source
     * @returns {boolean}             True if the edge has a threshold greater than 0 for the source type,
     *                                and the source type is within that distance.
     */
    applyThreshold(sourceType: string, sourceOrigin: Point, externalRadius?: number | undefined): boolean;
    /**
     * Determine the orientation of this Edge with respect to a reference point.
     * @param {Point} point       Some reference point, relative to which orientation is determined
     * @returns {number}          An orientation in CONST.EDGE_DIRECTIONS which indicates whether the Point is left,
     *                            right, or collinear (both) with the Edge
     */
    orientPoint(point: Point): number;
    /**
     * Record the intersections between two edges.
     * @param {Edge} other          Another edge to test and record
     * @param {string} level        The ID of the Level the edges are in
     */
    recordIntersections(other: Edge, level: string): void;
    /**
     * Remove intersections of this edge with all other edges.
     * @param {string} level    The ID of the Level the edges are in
     */
    removeIntersections(level: string): void;
}
import Document from "../../../../common/abstract/document.mjs";
import PlaceableObject from "../../placeables/placeable-object.mjs";
import type { EdgeDirection } from "../../../../common/constants.mjs";
import type { EdgeSenseType } from "../../../../common/constants.mjs";
import type { EdgeThresholdData } from "../_types.mjs";
import type { Point } from "../../../../common/_types.mjs";
import type { LineIntersection } from "../../../../common/utils/_types.mjs";
import type PolygonVertex from "./vertex.mjs";
import type { EdgeRestrictionType } from "../../../../common/constants.mjs";
import type { EdgeCreationOptions } from "../_types.mjs";
