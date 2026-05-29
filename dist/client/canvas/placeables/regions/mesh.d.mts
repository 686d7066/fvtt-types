/**
 * @import {Point} from "../../../../common/_types.mjs";
 * @import Region from "../region.mjs";
 */
/**
 * A mesh of a {@link foundry.canvas.placeables.Region}.
 */
export default class RegionMesh {
    /**
     * Shared point instance.
     * @type {PIXI.Point}
     */
    static "__#126@#SHARED_POINT": PIXI.Point;
    /**
     * Shared triangle polygon instance.
     * @type {PIXI.Polygon}
     */
    static "__#126@#SHARED_TRIANGLE": PIXI.Polygon;
    /**
     * Create a RegionMesh.
     * @param {Region} region                       The Region to create the RegionMesh from.
     * @param {AbstractBaseShader} [shaderClass]    The shader class to use.
     */
    constructor(region: Region, shaderClass?: AbstractBaseShader | undefined);
    set geometry(value: any);
    /**
     * The geometry of this RegionMesh.
     * @type {RegionGeometry | PIXI.Geometry}
     */
    get geometry(): any;
    /**
     * The Region of this RegionMesh.
     * @type {Region}
     */
    get region(): Region;
    /**
     * The shader bound to this RegionMesh.
     * @type {AbstractBaseShader}
     */
    get shader(): AbstractBaseShader;
    set blendMode(value: PIXI.BLEND_MODES);
    /**
     * The blend mode assigned to this RegionMesh.
     * @type {PIXI.BLEND_MODES}
     */
    get blendMode(): PIXI.BLEND_MODES;
    /**
     * Used to track a tint or alpha change to execute a recomputation of _cachedTint.
     * @type {boolean}
     * @protected
     */
    protected _tintAlphaDirty: boolean;
    set tint(tint: number);
    /**
     * The tint applied to the mesh. This is a hex value.
     *
     * A value of 0xFFFFFF will remove any tint effect.
     * @type {number}
     * @defaultValue 0xFFFFFF
     */
    get tint(): number;
    /**
     * The tint applied to the mesh. This is a hex value. A value of 0xFFFFFF will remove any tint effect.
     * @type {PIXI.Color}
     * @protected
     */
    protected _tintColor: PIXI.Color;
    /**
     * Cached tint value for the shader uniforms.
     * @type {[red: number, green: number, blue: number, alpha: number]}
     * @protected
     */
    protected _cachedTint: [red: number, green: number, blue: number, alpha: number];
    /**
     * Initialize shader based on the shader class type.
     * @param {typeof AbstractBaseShader} shaderClass The shader class, which must inherit from AbstractBaseShader.
     */
    setShaderClass(shaderClass: typeof AbstractBaseShader): void;
    /** @override */
    override updateTransform(): void;
    /** @override */
    override _render(renderer: any): void;
    /** @override */
    override _calculateBounds(): void;
    /**
     * Tests if a point is inside this RegionMesh.
     * @param {Point} point
     * @returns {boolean}
     */
    containsPoint(point: Point): boolean;
    /** @override */
    override destroy(options: any): void;
    #private;
}
import type Region from "../region.mjs";
import AbstractBaseShader from "../../rendering/shaders/base-shader.mjs";
import type { Point } from "../../../../common/_types.mjs";
