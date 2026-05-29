/**
 * @import {Point, ElevatedPoint, DeepReadonly} from "../../../../common/_types.mjs";
 * @import {PolygonTree} from "../../../data/polygon-tree.mjs";
 * @import {RegionSurface} from "../../../documents/_types.mjs";
 */
/**
 * The occlusion mask which contains radial occlusion and vision occlusion from tokens.
 * Red channel: Fade occlusion.
 * Green channel: Radial occlusion.
 * Blue channel: Vision occlusion.
 * Alpha channel: Surface occlusion.
 * @category Canvas
 */
export default class CanvasOcclusionMask extends CachedContainer {
    /** @override */
    static override textureConfiguration: {
        scaleMode: any;
        format: any;
        multisample: any;
    };
    /**
     * Get all surfaces that are occluded given the point and elevation.
     * @param {Point} point                 The point that is tested for occlusion.
     * @param {number} elevation            The elevation of the point.
     * @param {RegionSurface[]} [surfaces]  The occludable surfaces, order by elevation in ascending order.
     * @yields {RegionSurface}              The occluded surfaces.
     */
    static "__#170@#getOccludedSurfaces"(point: Point, elevation: number, surfaces?: RegionSurface[] | undefined): Generator<RegionSurface | DeepReadonly<RegionSurface>, void, unknown>;
    constructor(...args: any[]);
    /**
     * Graphics in which token radial and vision occlusion shapes are drawn.
     * @type {PIXI.LegacyGraphics}
     */
    tokens: PIXI.LegacyGraphics;
    /**
     * Graphics in which surface occlusion shapes are drawn.
     * @type {PIXI.LegacyGraphics}
     */
    surfaces: PIXI.LegacyGraphics;
    /**
     * The set of currently occluded canvas objects.
     * @type {Set<PrimaryCanvasObject>}
     */
    get occluded(): Set<PrimaryCanvasObject>;
    /**
     * The occluded surfaces.
     * @type {ReadonlySet<DeepReadonly<RegionSurface>>}
     */
    get occludedSurfaces(): ReadonlySet<DeepReadonly<RegionSurface>>;
    /**
     * Is vision occlusion active?
     * @type {boolean}
     */
    get vision(): boolean;
    /**
     * Clear the occlusion mask.
     * @override
     */
    override clear(): this;
    /**
     * Map an elevation to a value in the range (0, 1] with 8-bit precision.
     * The radial and vision shapes are drawn with these values into the render texture.
     * @param {number} elevation    The elevation in distance units
     * @returns {number}            The value for this elevation in the range (0, 1] with 8-bit precision
     */
    mapElevation(elevation: number): number;
    /**
     * Update the occludable tokens.
     * @internal
     */
    _updateOccludableTokens(): void;
    /**
     * Draw occlusion shapes to the occlusion mask.
     * Fade occlusion draws to the red channel with varying intensity from [0, 1] based on elevation.
     * Radial occlusion draws to the green channel with varying intensity from [0, 1] based on elevation.
     * Vision occlusion draws to the blue channel with varying intensity from [0, 1] based on elevation.
     * Surface occlusion draws to the alpha channel with varying intensity from [0, 1] based on elevation.
     * @internal
     */
    _updateOcclusionMask(): void;
    /**
     * Update the current occlusion status of all PCOs.
     * @internal
     */
    _updateOccludedObjects(): void;
    /**
     * Determine the set of objects which should be currently occluded by a Token.
     * @param {Token[]} tokens                   The occludable Tokens
     * @returns {Set<PrimaryCanvasObjectMixin>}  The PCO objects which should be currently occluded
     * @protected
     */
    protected _identifyOccludedObjects(tokens: Token[]): Set<PrimaryCanvasObjectMixin>;
    /**
     * Determine the occluded surfaces.
     * @param {object} flags  The perception render flags that are processed
     * @internal
     */
    _updateOccludedSurfaces(flags: object): void;
    /**
     * @deprecated since v14
     * @ignore
     */
    updateOcclusion(): void;
    #private;
}
import CachedContainer from "../../containers/advanced/cached-container.mjs";
import type { RegionSurface } from "../../../documents/_types.mjs";
import type { DeepReadonly } from "../../../../common/_types.mjs";
import type { Point } from "../../../../common/_types.mjs";
