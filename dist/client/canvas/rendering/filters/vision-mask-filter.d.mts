export default class VisionMaskFilter extends AbstractBaseMaskFilter {
    /** @override */
    static override _createFragmentShader(): string;
    /** @override */
    static override defaultUniforms: {
        uMaskSampler: null;
    };
    /** @override */
    static override create(): foundry.canvas.rendering.filters.AbstractBaseFilter;
    /**
     * Is this filter currently suppressed?
     * @type {boolean}
     */
    suppressed: boolean;
    override set enabled(value: boolean | undefined);
    /**
     * This filter is enabled if and only if it is not suppressed and `canvas.visibility.visible` is true.
     * This property cannot be set. Set {@link VisionMaskFilter#suppressed} to disable this filter.
     * @override
     */
    override get enabled(): boolean | undefined;
}
import AbstractBaseMaskFilter from "./base-mask-filter.mjs";
