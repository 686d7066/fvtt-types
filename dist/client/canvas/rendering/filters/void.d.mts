/**
 * A minimalist filter (just used for blending)
 */
export default class VoidFilter extends AbstractBaseFilter {
    /** @override */
    static override _createFragmentShader(): string;
}
import AbstractBaseFilter from "./base-filter.mjs";
