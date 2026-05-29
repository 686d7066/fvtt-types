/**
 * Fog shader effect.
 */
export default class FogShader extends AbstractWeatherShader {
    /** @override */
    static override get defaultUniforms(): {
        intensity: number;
        rotation: number;
        slope: number;
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
    /**
     * Configure the number of octaves into the shaders.
     * @param {number} mode
     * @returns {string}
     */
    static OCTAVES(mode: number): string;
    /**
     * Configure the fog complexity according to mode (performance).
     * @param {number} mode
     * @returns {string}
     */
    static FOG(mode: number): string;
    /** @override */
    static override _createFragmentShader(): string;
}
import AbstractWeatherShader from "./base-weather.mjs";
