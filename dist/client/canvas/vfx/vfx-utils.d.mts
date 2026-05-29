/**
 * Interpolate rotation in radians between two angles.
 * @param {number} r1
 * @param {number} r2
 * @param {number} i
 * @returns {number}
 */
export function interpolateRotation(r1: number, r2: number, i: number): number;
/**
 * Parse rotation options normalized to radians from shared config objects
 * @param {object} data
 * @param {number} [data.angle]         Initial rotation in degrees
 * @param {number} [data.rotation]      Initial rotation in radians
 * @param {Point} [data.rotateTowards]  Incremental rotation towards a destination position
 * @param {Point} [data.origin]         Rotate from an origin position, needed if using rotateTowards
 * @returns {number}
 */
export function parseRotation(data: {
    angle?: number | undefined;
    rotation?: number | undefined;
    rotateTowards?: any;
    origin?: any;
}): number;
/**
 * Resolves a component animation by name.
 * @param {string} functionName     Name of the animation object in `foundry.vfx.CONFIG.animations`
 * @returns {VFXComponentAnimation} The resolved animations object
 */
export function resolveAnimation(functionName: string): VFXComponentAnimation;
/**
 * Resolves an anime.js easing function by name and initializes it with parameters.
 * @param {string} functionName         Name of the easing function
 * @param {any[]} easingParams          Optional positional parameters to initialize the easing function
 * @returns {(time: number) => number}  The resolved easing function
 */
export function resolveEasing(functionName: string, easingParams: any[]): (time: number) => number;
/**
 * Generates points along a cubic Hermite spline segment.
 * @param {VFXBasePathPoint} p0     Start control point
 * @param {Point} m0                Tangent vector at start point
 * @param {VFXBasePathPoint} p1     End control point
 * @param {Point} m1                Tangent vector at end point
 * @param {number} numPoints        Number of points to generate along the segment
 * @param {string[]} [auxiliary]    An array of auxiliary numeric attributes to interpolate
 * @returns {VFXBasePathPoint[]}    Array of points which may be augmented with additional auxiliary attributes
 */
export function generateHermiteSegment(p0: VFXBasePathPoint, m0: Point, p1: VFXBasePathPoint, m1: Point, numPoints: number, auxiliary?: string[] | undefined): VFXBasePathPoint[];
/**
 * Interpolate auxiliary attributes between two points.
 * @param {VFXBasePathPoint} p0     Start control point
 * @param {VFXBasePathPoint} p1     End control point
 * @param {number} t                Interpolation parameter
 * @param {string[]} [auxiliary]    An array of auxiliary numeric attributes to interpolate. These attributes must be
 *                                  present all points. Attributes are either interpolated or carried forward from
 *                                  their last-observed value.
 * @returns {object}                Interpolated auxiliary properties
 */
export function interpolateProperties(p0: VFXBasePathPoint, p1: VFXBasePathPoint, t: number, auxiliary?: string[] | undefined): object;
import type { VFXComponentAnimation } from "./_types.mjs";
import type { VFXBasePathPoint } from "./_types.mjs";
