/**
 * Invisibility effect filter for placeables.
 */
export default class InvisibilityFilter extends AbstractBaseFilter {
    /** @override */
    static override _createFragmentShader(): string;
    /** @override */
    static override get defaultUniforms(): {
        uSampler: null;
        color: number[];
    };
}
import AbstractBaseFilter from "./base-filter.mjs";
