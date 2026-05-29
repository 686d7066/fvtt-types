export type ClipperPoint = {
    X: number;
    Y: number;
};
export type EdgeType = "wall" | "source" | "innerBounds" | "outerBounds";
export type EdgeThresholdData = {
    /**
     * Minimum distance in pixels from a light source for which this edge blocks light
     */
    light?: number | undefined;
    /**
     * Minimum distance in pixels from a light source for which this edge blocks darkness
     */
    darkness?: number | undefined;
    /**
     * Minimum distance in pixels from a vision source for which this edge blocks vision
     */
    sight?: number | undefined;
    /**
     * Minimum distance in pixels from a sound source for which this edge blocks sound
     */
    sound?: number | undefined;
    /**
     * Whether to attenuate the source radius when passing through the edge
     */
    attenuation?: boolean | undefined;
};
/**
 * Additional options which describe the edge
 */
export type EdgeCreationOptions = {
    /**
     * A string used to uniquely identify this edge
     */
    id?: string | undefined;
    /**
     * A Document/PlaceableObject that is responsible for this edge, if any
     */
    object?: Document<object, foundry.abstract.types.DocumentConstructionContext> | PlaceableObject | undefined;
    /**
     * The type of edge
     */
    type?: EdgeType | undefined;
    /**
     * How this edge restricts light
     */
    light?: EdgeSenseType | undefined;
    /**
     * How this edge restricts darkness
     */
    darkness?: EdgeSenseType | undefined;
    /**
     * How this edge restricts movement
     */
    move?: EdgeSenseType | undefined;
    /**
     * How this edge restricts sight
     */
    sight?: EdgeSenseType | undefined;
    /**
     * How this edge restricts sound
     */
    sound?: EdgeSenseType | undefined;
    /**
     * A direction of effect for the edge
     */
    direction?: EdgeDirection | undefined;
    /**
     * Configuration of threshold data for this edge
     */
    threshold?: EdgeThresholdData | null | undefined;
    /**
     * A source priority for this edge. Default: `0`.
     */
    priority?: number | undefined;
};
export type PointSourcePolygonType = EdgeRestrictionType | "universal";
export type PointSourcePolygonConfig = {
    /**
     * The type of polygon being computed
     */
    type: PointSourcePolygonType;
    /**
     * The Level the polygon is computed in. Defaults to the viewed Level.
     */
    level?: Level | undefined;
    /**
     * The angle of emission, if limited
     */
    angle?: number | undefined;
    /**
     * The desired density of padding rays, a number per PI
     */
    density?: number | undefined;
    /**
     * A limited radius of the resulting polygon
     */
    radius?: number | undefined;
    /**
     * The external radius
     */
    externalRadius?: number | undefined;
    /**
     * The direction of facing, required if the angle is limited
     */
    rotation?: number | undefined;
    /**
     * Additional options passed through to surface
     *   exposure generator
     */
    surfaceExposure?: ElevatedSurfaceExposureOptions | undefined;
    /**
     * Compute the polygon with threshold wall constraints applied
     */
    useThreshold?: boolean | undefined;
    /**
     * Display debugging visualization and logging for the polygon
     */
    debug?: boolean | undefined;
    /**
     * The object (if any) that spawned this polygon.
     */
    source?: any;
    /**
     * Limiting polygon boundary shapes
     */
    boundaryShapes?: any[] | undefined;
    /**
     * Does this polygon have a limited radius?
     */
    hasLimitedRadius?: boolean | undefined;
    /**
     * Does this polygon have a limited angle?
     */
    hasLimitedAngle?: boolean | undefined;
    /**
     * The computed bounding box for the polygon
     */
    boundingBox?: any;
};
export type ElevatedSurfaceExposureOptions = {
    /**
     * Points with at most this distance (grid units) from the surface are exposed.
     *   Default: `0`.
     */
    threshold?: number | undefined;
};
/**
 * Modes:
 * - Never (`0`): The edges of this type are never included.
 * - Maybe (`1`): The edges of this type are tested for inclusion.
 * - Always (`2`): The edges of this type are always included.
 */
export type ClockwiseSweepEdgeConfig = {
    mode: 0 | 1 | 2;
    priority: number;
};
export type _ClockwiseSweepPolygonConfig = {
    /**
     * Customize how edge direction of one-way edges is applied
     */
    edgeDirectionMode?: EdgeDirectionMode | undefined;
    /**
     * Edges with priority less than this priority are ignored
     */
    priority?: number | undefined;
    /**
     * Edge types configured as `false` is equivalent to those edges never being included.
     * Edge types configured as `true` are included conditionally depending on the type of polygon and the type of edge.
     */
    edgeTypes?: Partial<Record<EdgeType, boolean | Partial<ClockwiseSweepEdgeConfig>>> | undefined;
};
export type ClockwiseSweepPolygonConfig = PointSourcePolygonConfig & _ClockwiseSweepPolygonConfig;
export type RayIntersection = {
    /**
     * The x-coordinate of intersection
     */
    x: number;
    /**
     * The y-coordinate of intersection
     */
    y: number;
    /**
     * The proximity to the Ray origin, as a ratio of distance
     */
    t0: number;
    /**
     * The proximity to the Ray destination, as a ratio of distance
     */
    t1: number;
};
export type QuadtreeObject = {
    r: PIXI.Rectangle;
    t: any;
    n?: Set<Quadtree> | undefined;
};
export type VertexMap = Map<number, PolygonVertex>;
export type EdgeSet = Set<Edge>;
export type PolygonRay = Ray;
import type Document from "../../../common/abstract/document.mjs";
import type { PlaceableObject } from "../placeables/_module.mjs";
import type { EdgeSenseType } from "../../../common/constants.mjs";
import type { EdgeDirection } from "../../../common/constants.mjs";
import type { EdgeRestrictionType } from "../../../common/constants.mjs";
import type Level from "../../documents/level.mjs";
import type { EdgeDirectionMode } from "../../../common/constants.mjs";
import type PolygonVertex from "./edges/vertex.mjs";
