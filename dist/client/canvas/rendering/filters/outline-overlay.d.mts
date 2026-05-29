/**
 * A filter which implements an outline.
 * Inspired from https://github.com/pixijs/filters/tree/main/filters/outline
 * @license MIT
 */
export default class OutlineOverlayFilter extends AbstractBaseFilter {
    /** @inheritdoc */
    static get defaultUniforms(): {
        outlineColor: number[];
        thickness: number[];
        alphaThreshold: number;
        knockout: boolean;
        wave: boolean;
    };
    /** @override */
    static override _createVertexShader(): string;
    /**
     * Dynamically create the fragment shader used for filters of this type.
     * @returns {string}
     */
    static _createFragmentShader(): string;
    /**
     * Quality of the outline according to performance mode.
     * @returns {number}
     */
    static get "__#375@#quality"(): number;
    /** @override */
    override padding: number;
    /** @override */
    override autoFit: boolean;
    /**
     * If the filter is animated or not.
     * @type {boolean}
     */
    animated: boolean;
    set thickness(value: number);
    /**
     * The thickness of the outline.
     * @type {number}
     */
    get thickness(): number;
    /** @override */
    override apply(filterManager: any, input: any, output: any, clear: any): void;
    #private;
}
import AbstractBaseFilter from "./base-filter.mjs";
