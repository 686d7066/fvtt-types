/**
 * This class defines an interface for masked custom filters
 */
export default class AbstractBaseMaskFilter extends AbstractBaseFilter {
    /** @override */
    static override _createVertexShader(): string;
    /** @override */
    override apply(filterManager: any, input: any, output: any, clear: any, currentState: any): void;
}
import AbstractBaseFilter from "./base-filter.mjs";
