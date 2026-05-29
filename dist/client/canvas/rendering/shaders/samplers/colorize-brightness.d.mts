/**
 * A colorization shader which keeps brightness contrary to "normal tinting"
 */
export default class ColorizeBrightnessShader extends BaseSamplerShader {
    /** @override */
    static override classPluginName: null;
    /** @override */
    static override get defaultUniforms(): {
        tintAlpha: number[];
        tintLinear: number[];
        sampler: null;
        screenDimensions: number[];
        grey: boolean;
        intensity: number;
    };
}
import BaseSamplerShader from "./base-sampler.mjs";
