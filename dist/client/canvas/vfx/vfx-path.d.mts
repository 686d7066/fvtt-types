/**
 * @import {VFXBasePathPoint, VFXPathPoint} from "./_types.mjs";
 */
/**
 * A class responsible for constructing a path of points used for animation.
 */
export default class VFXPath {
    /**
     * Get a configured path generator from CONFIG.Canvas.vfx.paths.
     * @param {string} pathName             The named path type
     * @returns {VFXPathGenerator}          The path generator function
     */
    static getPathGenerator(pathName: string): VFXPathGenerator;
    /**
     * Create a VFXPath instance of a certain named path type defined in CONFIG.Canvas.vfx.paths.
     * @param {string} pathName             The named path type to construct
     * @param {VFXBasePathPoint[]} points   Path points to construct
     * @param {object} parameters           Additional parameters used to construct the path
     * @returns {VFXPath}                   The generated path
     */
    static create(pathName: string, points: VFXBasePathPoint[], parameters?: object): VFXPath;
    /**
     * Construct a VFXPath by providing an array of base point data.
     * @param {VFXBasePathPoint[]} points
     */
    constructor(points: VFXBasePathPoint[]);
    /**
     * The array of points in the path
     * @type {VFXPathPoint[]}
     */
    get pathPoints(): VFXPathPoint[];
    get pathLength(): number;
    /**
     * Get the interpolated point for a value x on [0, 1]
     * @param {number} x        The animation progress on [0, 1]
     * @param {number} index    A known index of the path which was already reached
     * @returns {VFXPathPoint}
     */
    interpolatedPoint(x: number, index?: number): VFXPathPoint;
    /**
     * Compute an interpolated point along the path at a given distance.
     * @param {number} distance     The desired distance along the path
     * @returns {VFXPathPoint}      An interpolated point for object position at that distance
     */
    interpolatedPointAtDistance(distance: number): VFXPathPoint;
    #private;
}
import type { VFXPathPoint } from "./_types.mjs";
import type { VFXBasePathPoint } from "./_types.mjs";
