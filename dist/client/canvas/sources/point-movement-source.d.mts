/**
 * A specialized subclass of the BaseEffectSource which describes a movement-based source.
 * @extends {BaseEffectSource}
 * @mixes PointEffectSource
 */
export default class PointMovementSource extends BaseEffectSource<foundry.canvas.sources.types.BaseEffectSourceData, PIXI.Polygon> {
    constructor(options?: foundry.canvas.sources.types.BaseEffectSourceOptions | undefined);
}
import BaseEffectSource from "./base-effect-source.mjs";
