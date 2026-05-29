/**
 * An abstract filter which provides a framework for reusable definition
 * @extends {PIXI.Filter}
 * @mixes BaseShaderMixin
 * @abstract
 */
export default class AbstractBaseFilter {
    /** @override */
    static override create(uniforms: any, options: any): AbstractBaseFilter;
}
