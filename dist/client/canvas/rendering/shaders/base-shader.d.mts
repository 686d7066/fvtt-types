/**
 * This class defines an interface which all shaders utilize.
 * @extends {PIXI.Shader}
 * @property {PIXI.Program} program The program to use with this shader.
 * @property {object} uniforms      The current uniforms of the Shader.
 * @mixes BaseShaderMixin
 * @abstract
 */
declare class AbstractBaseShader {
    /** @override */
    static override create(uniforms: any, options: any): AbstractBaseShader;
    constructor(program: any, uniforms: any);
    /**
     * The initial values of the shader uniforms.
     * @type {object}
     */
    initialUniforms: object;
    /**
     * Reset the shader uniforms back to their initial values.
     */
    reset(): void;
    /**
     * Perform operations which are required before binding the Shader to the Renderer.
     * @param {PIXI.DisplayObject} mesh      The mesh display object linked to this shader.
     * @param {PIXI.Renderer} renderer       The renderer
     * @protected
     */
    protected _preRender(_mesh: any, _renderer: any): void;
}
declare namespace AbstractBaseShader {
    let _isShaderFieldCompatible: boolean;
}
export default AbstractBaseShader;
