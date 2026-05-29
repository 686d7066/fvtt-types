/**
 * @import {VFXBasePathPoint} from "../_types.mjs"
 */
/**
 * Generate an oscillating weave path between provided control points using cubic hermite splines.
 * @param {VFXBasePathPoint[]} waypoints    Explicit waypoints to interpolate
 * @param {object} params                   Spline interpolation parameters
 * @returns {VFXPath}                       A generated weave path
 */
export default function weavePath(waypoints: VFXBasePathPoint[], params?: object): VFXPath;
/**
 * Generate cubic hermite spline points for a pair of control points.
 * @param {VFXBasePathPoint} origin           Starting point of the arc
 * @param {VFXBasePathPoint} destination      Ending point of the arc
 * @param {object} options                    Configuration options
 * @param {number} [options.arcCount=1]         Number of Hermite arcs (1 = single arc, 2 = up/down pair, etc.)
 * @param {number} [options.amplitude=0.15]     Ratio of the path length that determines the peak displacement
 *                                              of the arcs (1 = full path length)
 * @param {number} [options.tangentScale=1]     Multiplier applied to the Hermite tangents
 * @param {number} [options.direction=1]        Starting direction of the weave (1 = "up", -1 = "down")
 * @param {number} [options.segmentPoints=8]    Points generated per Hermite segment
 * @param {string[]} [options.auxiliary]        An array of auxiliary parameter names
 * @returns {VFXBasePathPoint[]}              Array of path points
 */
export function generateWeavePoints(origin: VFXBasePathPoint, destination: VFXBasePathPoint, { arcCount, amplitude, tangentScale, direction, segmentPoints, auxiliary }?: {
    arcCount?: number | undefined;
    amplitude?: number | undefined;
    tangentScale?: number | undefined;
    direction?: number | undefined;
    segmentPoints?: number | undefined;
    auxiliary?: string[] | undefined;
}): VFXBasePathPoint[];
import type { VFXBasePathPoint } from "../_types.mjs";
import VFXPath from "../vfx-path.mjs";
