export type BaseEffectSourceOptions = {
    /**
     * An optional PlaceableObject which is responsible for this source
     */
    object?: any;
    /**
     * A unique ID for this source. This will be set automatically if an
     *         object is provided, otherwise is required.
     */
    sourceId?: string | undefined;
};
export type BaseEffectSourceData = {
    /**
     * The x-coordinate of the source location
     */
    x: number;
    /**
     * The y-coordinate of the source location
     */
    y: number;
    /**
     * The elevation of the point source
     */
    elevation: number;
    /**
     * The ID of the Level the point source is in
     */
    level: string;
    /**
     * Whether or not the source is disabled
     */
    disabled: boolean;
};
/**
 * {@ignore}
 */
export type _RenderedEffectSourceData = {
    /**
     * An animation configuration for the source
     */
    animation: object;
    /**
     * A color applied to the rendered effect
     */
    color: number | null;
    /**
     * An integer seed to synchronize (or de-synchronize) animations
     */
    seed: number | null;
    /**
     * Is this source a temporary preview?
     */
    preview: boolean;
};
/**
 * {@interface}
 */
export type RenderedEffectSourceData = BaseEffectSourceData & _RenderedEffectSourceData;
export type RenderedEffectSourceAnimationConfig = {
    /**
     * The human-readable (localized) label for the animation
     */
    label?: string | undefined;
    /**
     * The animation function that runs every frame
     */
    animation?: Function | undefined;
    /**
     * A custom illumination shader used by this animation
     */
    illuminationShader?: any;
    /**
     * A custom coloration shader used by this animation
     */
    colorationShader?: any;
    /**
     * A custom background shader used by this animation
     */
    backgroundShader?: any;
    /**
     * A custom darkness shader used by this animation
     */
    darknessShader?: any;
    /**
     * The animation seed
     */
    seed?: number | undefined;
    /**
     * The animation time
     */
    time?: number | undefined;
};
export type RenderedEffectLayerConfig = {
    /**
     * The default shader used by this layer
     */
    defaultShader: typeof AdaptiveLightingShader;
    /**
     * The blend mode used by this layer
     */
    blendMode: PIXI.BLEND_MODES;
};
export type RenderedEffectSourceLayer = {
    /**
     * Is this layer actively rendered?
     */
    active: boolean;
    /**
     * Do uniforms need to be reset?
     */
    reset: boolean;
    /**
     * Is this layer temporarily suppressed?
     */
    suppressed: boolean;
    /**
     * The rendered mesh for this layer
     */
    mesh: PointSourceMesh;
    /**
     * The shader instance used for the layer
     */
    shader: AdaptiveLightingShader;
};
/**
 * {@ignore}
 */
export type _VisionSourceData = {
    /**
     * The amount of contrast
     */
    contrast: number;
    /**
     * Strength of the attenuation between bright, dim, and dark
     */
    attenuation: number;
    /**
     * The amount of color saturation
     */
    saturation: number;
    /**
     * The vision brightness.
     */
    brightness: number;
    /**
     * The vision mode.
     */
    visionMode: string;
    /**
     * The range of light perception.
     */
    lightRadius: number;
    /**
     * Is this vision source blinded?
     */
    blinded: boolean;
};
/**
 * {@interface}
 */
export type VisionSourceData = RenderedEffectSourceData & _VisionSourceData;
