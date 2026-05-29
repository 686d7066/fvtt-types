/**
 * @import {Point, ElevatedPoint, ClipperPoint} from "../../../_types.mjs";
 * @import {PointSourcePolygonType, PointSourcePolygonConfig} from "../_types.mjs";
 * @import Scene from "../../../documents/scene.mjs";
 * @import Level from "../../../documents/level.mjs";
 */
/**
 * An extension of Polygon which is used to represent the line of sight for a point source.
 * @template {PointSourcePolygonConfig} [PolygonConfig=PointSourcePolygonConfig]
 */
export default class PointSourcePolygon<PolygonConfig extends PointSourcePolygonConfig = PointSourcePolygonConfig> {
    /**
     * Benchmark the performance of polygon computation for this source
     * @param {number} iterations                 The number of test iterations to perform
     * @param {Point|ElevatedPoint} origin        The origin point to benchmark
     * @param {PolygonConfig} config              The polygon configuration to benchmark
     */
    static benchmark(iterations: number, origin: Point | ElevatedPoint, config: PolygonConfig): Promise<void>;
    /**
     * Compute the polygon given a point origin and radius
     * @param {Point|ElevatedPoint} origin            The origin source point. The elevation defaults to
     *                                                the elevation of config.source if passed and otherwise 0.
     * @param {PolygonConfig} [config={}]             Configuration options which customize the polygon computation
     * @returns {PointSourcePolygon}                  The computed polygon instance
     */
    static create(origin: Point | ElevatedPoint, config?: any): PointSourcePolygon;
    /**
     * Test whether a Ray between the origin and destination points would collide with a boundary of this Polygon.
     * A valid wall restriction type is compulsory and must be passed into the config options.
     * @param {Point|ElevatedPoint} origin            An origin point. The elevation defaults to
     *                                                the elevation of config.source if passed and otherwise 0.
     * @param {Point|ElevatedPoint} destination       A destination point. The elevation defaults to the elevation
     *                                                of the origin.
     * @param {PolygonConfig} config                  The configuration that defines a certain Polygon type
     * @param {"any"|"all"|"closest"} [config.mode]   The collision mode to test: "any", "all", or "closest"
     * @param {number} [config.tMin]                  Intersections of the ray and an edge with t-value at most
     *                                                `tMin` are not considered collisions. Default: `0`.
     * @param {number} [config.tMax]                  Intersections of the ray and an edge with t-value greater than
     *                                                `tMax` are not considered collisions. Default: `1`.
     * @returns {boolean|PolygonVertex|PolygonVertex[]|null} The collision result depends on the mode of the test:
     *                                                * any: returns a boolean for whether any collision occurred
     *                                                * all: returns a sorted array of PolygonVertex instances
     *                                                * closest: returns a PolygonVertex instance or null
     */
    static testCollision(origin: Point | ElevatedPoint, destination: Point | ElevatedPoint, { mode, tMin, tMax, ...config }?: PolygonConfig): boolean | PolygonVertex | PolygonVertex[] | null;
    /**
     * Augment a PointSourcePolygon by adding additional coverage for shapes permitted by threshold walls.
     * @param {PointSourcePolygon} polygon        The computed polygon
     * @returns {PointSourcePolygon}              The augmented polygon
     */
    static applyThresholdAttenuation(polygon: PointSourcePolygon): PointSourcePolygon;
    /**
     * Identifies edges in the Scene that include an active threshold.
     * Utilizes the Quadtree for efficient spatial querying to retrieve relevant edges.
     * @param {ElevatedPoint} origin The origin point from which to calculate thresholds.
     * @param {object} config Configuration object containing threshold parameters.
     * @param {string} config.type The type of the source.
     * @param {number} config.radius The radius of the source.
     * @param {number} config.externalRadius The external radius of the source.
     * @param {Level} config.level The Level the polygon is in
     * @returns {{edges: Set<Edge>, nAttenuated: number}} An object containing the array of
     *   edges that meet the threshold criteria and the total attenuation value.
     */
    static "__#140@#getThresholdEdges"(origin: ElevatedPoint, config: {
        type: string;
        radius: number;
        externalRadius: number;
        level: Level;
    }): {
        edges: Set<Edge>;
        nAttenuated: number;
    };
    /**
     * For each threshold wall that this source passes through construct a shape representing the attenuated source.
     * The attenuated shape is a circle with a radius modified by origin proximity to the threshold wall.
     * Intersect the attenuated shape against the LOS with threshold walls considered.
     * The result is the LOS for the attenuated light source.
     * @param {PointSourcePolygon} thresholdPolygon   The computed polygon with thresholds applied
     * @param {Set<Edge>} edges                       The identified set of threshold walls
     * @returns {ClipperPoint[][]}                    The resulting array of intersected threshold shapes
     */
    static "__#140@#createThresholdShapes"(thresholdPolygon: PointSourcePolygon, edges: Set<Edge>): ClipperPoint[][];
    /**
     * Calculate the attenuation of the source as it passes through the threshold wall.
     * The distance of perception through the threshold wall depends on proximity of the source from the wall.
     * @param {Edge} edge         The Edge for which this threshold applies
     * @param {ElevatedPoint} origin  Origin point on the canvas for this source
     * @param {number} radius     Radius to use for this source, before considering attenuation
     * @param {number} externalRadius The external radius of the source
     * @param {string} type       Sense type for the source
     * @returns {{inside: number, outside: number}} The inside and outside portions of the radius
     */
    static "__#140@#calculateThresholdAttenuation"(edge: Edge, origin: ElevatedPoint, radius: number, externalRadius: number, type: string): {
        inside: number;
        outside: number;
    };
    /**
     * Union the attenuated shape-LOS intersections with the closed LOS.
     * The portion of the light sources "inside" the threshold walls are not modified from their default radius or shape.
     * Clipper can union everything at once. Use a positive fill to avoid checkerboard; fill any overlap.
     * @param {PointSourcePolygon} los    The LOS polygon with threshold walls inactive
     * @param {ClipperPoints[]} shapes    Attenuation shapes for threshold walls
     * @returns {PIXI.Polygon}            The combined LOS polygon with threshold shapes
     */
    static "__#140@#combineThresholdShapes"(los: PointSourcePolygon, shapes: ClipperPoints[]): PIXI.Polygon;
    /**
     * @deprecated since v14
     * @ignore
     */
    static get WALL_DIRECTION_MODES(): Readonly<{
        readonly NORMAL: 0;
        readonly REVERSED: 1;
        readonly BOTH: 2;
    }>;
    /**
     * The rectangular bounds of this polygon
     * @type {PIXI.Rectangle}
     */
    bounds: PIXI.Rectangle;
    /**
     * The origin point of the source polygon.
     * @type {ElevatedPoint}
     */
    origin: ElevatedPoint;
    /**
     * The configuration of this polygon.
     * @type {PolygonConfig}
     */
    config: PolygonConfig;
    /**
     * The area of surfaces that is visible to this polygon, if any.
     * @type {PolygonTree|null}
     */
    surfaceExposure: PolygonTree | null;
    /**
     * The level the polygon is computed it.
     * @type {Level}
     */
    get level(): Level;
    /**
     * The level the polygon is computed it.
     * @type {Scene}
     */
    get scene(): Scene;
    /**
     * An indicator for whether this polygon is constrained by some boundary shape?
     * @type {boolean}
     */
    get isConstrained(): boolean;
    /**
     * Create a clone of this polygon.
     * This overrides the default PIXI.Polygon#clone behavior.
     * @override
     * @returns {PointSourcePolygon}    A cloned instance
     */
    override clone(): PointSourcePolygon;
    /**
     * Compute the polygon using the origin and configuration options.
     * @returns {PointSourcePolygon}    The computed polygon
     */
    compute(): PointSourcePolygon;
    /**
     * Perform the implementation-specific computation
     * @protected
     */
    protected _compute(): void;
    /**
     * Customize the provided configuration object for this polygon type.
     * @param {Point|ElevatedPoint} origin          The provided polygon origin. The elevation defaults to
     *                                              the elevation of config.source if passed and otherwise 0.
     * @param {PolygonConfig} config                The provided configuration object
     */
    initialize(origin: Point | ElevatedPoint, config: PolygonConfig): void;
    /**
     * Apply a constraining boundary shape to an existing PointSourcePolygon.
     * Return a new instance of the polygon with the constraint applied.
     * The new instance is only a "shallow clone", as it shares references to component properties with the original.
     * @param {PIXI.Circle|PIXI.Rectangle|PIXI.Polygon} constraint      The constraining boundary shape
     * @param {object} [intersectionOptions]                            Options passed to the shape intersection method
     * @returns {PointSourcePolygon}                                    A new constrained polygon
     */
    applyConstraint(constraint: PIXI.Circle | PIXI.Rectangle | PIXI.Polygon, intersectionOptions?: object | undefined): PointSourcePolygon;
    /** @inheritDoc */
    contains(x: any, y: any): any;
    /**
     * Constrain polygon points by applying boundary shapes.
     * @protected
     */
    protected _constrainBoundaryShapes(): void;
    points: any;
    /**
     * Determine the set of collisions which occurs for a Ray.
     * @param {Ray} ray                           The Ray to test
     * @param {"any"|"all"|"closest"} mode        The collision mode being tested
     * @param {ElevatedPoint} destination         The destination
     * @param {number} tMin                       Intersections of the ray and an edge with t-value at most
     *                                            `tMin` are not considered collisions. Default: `0`.
     * @param {number} tMax                       Intersections of the ray and an edge with t-value greater than
     *                                            `tMax` are not considered collisions. Default: `1`.
     * @returns {boolean|PolygonVertex|PolygonVertex[]|null} The collision test result
     * @protected
     * @abstract
     */
    protected _testCollision(ray: Ray, mode: "any" | "all" | "closest", destination: ElevatedPoint, tMin: number, tMax: number): boolean | PolygonVertex | PolygonVertex[] | null;
    /**
     * Visualize the polygon, displaying its computed area and applied boundary shapes.
     * @returns {PIXI.Graphics|undefined}     The rendered debugging shape
     */
    visualize(): PIXI.Graphics | undefined;
    /**
     * Determine if the shape is a complete circle.
     * The config object must have an angle and a radius properties.
     */
    isCompleteCircle(): boolean;
    #private;
}
import type { PointSourcePolygonConfig } from "../_types.mjs";
import type { ElevatedPoint } from "../../../_types.mjs";
import type Level from "../../../documents/level.mjs";
import type Scene from "../../../documents/scene.mjs";
import type { Point } from "../../../_types.mjs";
import Ray from "./ray.mjs";
import type { ClipperPoint } from "../../../_types.mjs";
