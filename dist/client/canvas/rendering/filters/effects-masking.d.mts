/**
 * This filter handles masking and post-processing for visual effects.
 */
export default class VisualEffectsMaskingFilter extends AbstractBaseMaskFilter {
    /**
     * Masking modes.
     * @enum {number}
     */
    static FILTER_MODES: Readonly<{
        readonly BACKGROUND: 0;
        readonly ILLUMINATION: 1;
        readonly COLORATION: 2;
    }>;
    /** @override */
    static override get defaultUniforms(): {
        tint: number[];
        screenDimensions: number[];
        enableVisionMasking: boolean;
        visionTexture: null;
        darknessLevelTexture: null;
        exposure: number;
        contrast: number;
        saturation: number;
        mode: number;
        ambientDarkness: number[];
        ambientDaylight: number[];
        replacementColor: number[];
    };
    /** @override */
    static override _createFragmentShader(options: any): string;
    /** @override */
    static override create({ postProcessModes, ...uniforms }: {} | undefined, options: any): foundry.canvas.rendering.filters.AbstractBaseFilter;
    /**
     * Filter post-process techniques.
     * @enum {{id: string, glsl: string}}
     */
    static POST_PROCESS_TECHNIQUES: {
        EXPOSURE: {
            id: string;
            glsl: string;
        };
        CONTRAST: {
            id: string;
            glsl: string;
        };
        SATURATION: {
            id: string;
            glsl: string;
        };
    };
    /**
     * Memory allocations and headers for the VisualEffectsMaskingFilter
     * @returns {string}                   The filter header according to the filter mode.
     */
    static fragmentHeader: string;
    /**
     * The fragment core code.
     * @type {string}
     */
    static fragmentCore: string;
    /**
     * Construct filter post-processing code according to provided value.
     * @param {string[]} postProcessModes  Post-process modes to construct techniques.
     * @returns {string}                   The constructed shader code for post-process techniques.
     */
    static fragmentPostProcess(postProcessModes?: string[]): string;
    /**
     * Update the filter shader with new post-process modes.
     * @param {string[]} [postProcessModes=[]]   New modes to apply.
     * @param {object} [uniforms={}]             Uniforms value to update.
     */
    updatePostprocessModes(postProcessModes?: string[] | undefined, uniforms?: object | undefined): void;
    program: any;
    /**
     * Remove all post-processing modes and reset some key uniforms.
     */
    reset(): void;
    #private;
}
import AbstractBaseMaskFilter from "./base-mask-filter.mjs";
