/**
 * The shader used by {@link foundry.canvas.placeables.regions.RegionMesh}.
 */
export default class RegionShader extends AbstractBaseShader {
    /** @override */
    static override _createVertexShader(): string;
    /** @override */
    static override _createFragmentShader(): string;
    /** @override */
    static override get defaultUniforms(): {
        canvasDimensions: number[];
        sceneDimensions: number[];
        screenDimensions: number[];
        tintAlpha: number[];
    };
    /** @override */
    override _preRender(mesh: any, renderer: any): void;
}
import AbstractBaseShader from "../base-shader.mjs";
