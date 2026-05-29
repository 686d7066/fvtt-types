/**
 * @import {DepthBatchData} from "../_types.mjs"
 */
/**
 * The depth sampler shader.
 */
export default class DepthSamplerShader extends BaseSamplerShader {
    /** @override */
    static override classPluginName: string;
    /** @override */
    static override batchGeometry: {
        id: string;
        size: number;
        normalized: boolean;
        type: any;
    }[];
    /** @override */
    static override get defaultUniforms(): {
        screenDimensions: number[];
        sampler: null;
        occlusionTexture: null;
        textureAlphaThreshold: number;
        depthElevation: number;
        occlusionElevation: number;
        fadeOcclusion: number;
        radialOcclusion: number;
        visionOcclusion: number;
        surfaceOcclusion: number;
        restrictsLight: boolean;
        restrictsWeather: boolean;
    };
    /** @override */
    static override batchDefaultUniforms(maxTex: any): {
        screenDimensions: number[];
        occlusionTexture: any;
    };
    /** @override */
    static override _preRenderBatch(batchRenderer: any): void;
    /** @override */
    static override _packInterleavedGeometry(element: any, attributeBuffer: any, indexBuffer: any, aIndex: any, iIndex: any): void;
    /**
     * The batch vertex shader source. Subclasses can override it.
     * @type {string}
     * @protected
     */
    protected static _batchVertexShader: string;
    /**
     * The batch fragment shader source. Subclasses can override it.
     * @type {string}
     * @protected
     */
    protected static _batchFragmentShader: string;
    /**
     * The vertex shader source. Subclasses can override it.
     * @type {string}
     * @protected
     */
    protected static _vertexShader: string;
    /**
     * The fragment shader source. Subclasses can override it.
     * @type {string}
     * @protected
     */
    protected static _fragmentShader: string;
    /**
     * The restriction options bit mask constants.
     * @type {string}
     */
    static "__#31@#OPTIONS_CONSTANTS": string;
    /**
     * The fragment source.
     * @type {string}
     */
    static "__#31@#FRAGMENT_MAIN": string;
}
import BaseSamplerShader from "../base-sampler.mjs";
