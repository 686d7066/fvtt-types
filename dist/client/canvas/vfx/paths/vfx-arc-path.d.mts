/**
 * @import {VFXBasePathPoint} from "../_types.mjs"
 */
/**
 * Generate an arcing path between provided control points using cubic hermite splines.
 * @param {VFXBasePathPoint[]} waypoints    Explicit waypoints to interpolate
 * @param {object} params                   Spline interpolation parameters
 * @returns {VFXPath}                       A generated arc path
 */
export default function arcPath(waypoints: VFXBasePathPoint[], params?: object): VFXPath;
/**
 * Generate cubic hermite spline points for a pair of control points.
 * @param {VFXBasePathPoint} origin           Starting point of the arc
 * @param {VFXBasePathPoint} destination      Ending point of the arc
 * @param {object} options                    Configuration options
 * @param {number} [options.peakRatio=0.5]      Position along path where arc peaks (0-1)
 * @param {number} [options.peakHeight=0.3]     Height of arc as ratio of path length
 * @param {number} [options.direction=1]        Direction of arc perpendicular to path (1 for "up", -1 for "down")
 * @param {number} [options.numPoints]          Number of points to generate (default: half of distance in pixels)
 * @param {number} [options.tangentScale=1]     Scaling factor for tangent vectors. Determines how curvy the arc is
 * @param {string[]} [options.auxiliary]        An array of auxiliary parameter names
 * @returns {VFXBasePathPoint[]}              Array of path points
 */
export function generateArcPoints(origin: VFXBasePathPoint, destination: VFXBasePathPoint, { numPoints, peakRatio, peakHeight, direction, tangentScale, auxiliary }?: {
    peakRatio?: number | undefined;
    peakHeight?: number | undefined;
    direction?: number | undefined;
    numPoints?: number | undefined;
    tangentScale?: number | undefined;
    auxiliary?: string[] | undefined;
}): VFXBasePathPoint[];
import type { VFXBasePathPoint } from "../_types.mjs";
import VFXPath from "../vfx-path.mjs";
