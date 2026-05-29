/**
 * Rain shader effect.
 */
export default class RainShader extends AbstractWeatherShader {
    /** @override */
    static override get defaultUniforms(): {
        opacity: number;
        intensity: number;
        strength: number;
        rotation: number;
        resolution: number[];
        useOcclusion: boolean;
        occlusionTexture: PIXI.Texture | null;
        reverseOcclusion: boolean;
        occlusionWeights: number[];
        useTerrain: boolean;
        terrainTexture: PIXI.Texture | null;
        reverseTerrain: boolean;
        terrainWeights: number[];
        alpha: number;
        tint: number[];
        screenDimensions: [number, number];
        effectDimensions: [number, number];
        depthElevation: number;
        time: number;
    };
    /** @override */
    static override _createFragmentShader(): string;
}
import AbstractWeatherShader from "./base-weather.mjs";
