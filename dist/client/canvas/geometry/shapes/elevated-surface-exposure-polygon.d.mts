/**
 * @import {ClipperPoint} from "../../../_types.mjs";
 * @import {ElevatedSurfaceExposureOptions} from "../_types.mjs";
 * @import PointSourcePolygon from "./source-polygon.mjs";
 */
/**
 * This class computes the elevated surface exposure polygon tree.
 */
export default class ElevatedSurfaceExposureGenerator {
    /**
     * Compute the elevated surface exposure for the given source polygon using the
     * {@link ElevatedSurfaceExposureGenerator}.
     * @param {PointSourcePolygon} polygon                  The source polygon the exposure is computed for
     * @param {ElevatedSurfaceExposureOptions} [options]    The surface exposure options
     * @returns {PolygonTree|null}                          The computed elevated surface exposure or null if empty
     */
    static compute(polygon: PointSourcePolygon, options?: ElevatedSurfaceExposureOptions | undefined): PolygonTree | null;
    /**
     * @param {PointSourcePolygon} polygon                  The source polygon the exposure is computed for
     * @param {ElevatedSurfaceExposureOptions} [options]    The surface exposure options
     */
    constructor(polygon: PointSourcePolygon, options?: ElevatedSurfaceExposureOptions | undefined);
    /**
     * The source polygon the exposure is computed for.
     * @type {PointSourcePolygon}
     */
    get polygon(): PointSourcePolygon<foundry.canvas.geometry.types.PointSourcePolygonConfig>;
    /**
     * Points with at most this distance (grid units) from the surface are exposed.
     * @type {number}
     */
    get threshold(): number;
    /**
     * The result of the computation, which is null if the surface exposure is empty.
     * @type {PolygonTree|null}
     * @throws {Error} If {@link ElevatedSurfaceExposureGenerator#compute} wasn't called yet.
     */
    get result(): PolygonTree | null;
    /**
     * Compute the surface exposure.
     * @returns {PolygonTree|null}    The computed elevated surface exposure or null if empty
     */
    compute(): PolygonTree | null;
    #private;
}
import type PointSourcePolygon from "./source-polygon.mjs";
import { PolygonTree } from "../../../data/polygon-tree.mjs";
import type { ElevatedSurfaceExposureOptions } from "../_types.mjs";
