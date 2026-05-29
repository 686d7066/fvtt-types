export type ParticleGeneratorMode = "ambient" | "effect";
/**
 * A numeric range:
 * - number: a fixed value
 * - [min, max]: a uniform range
 * - {min, max}: a uniform range
 */
export type ParticleGeneratorRange = number | number[] | {
    min: number;
    max: number;
};
export type ParticleGeneratorCurvePoint = {
    /**
     * Normalized lifetime position, from 0 to 1.
     */
    time: number;
    /**
     * Value at this lifetime position.
     */
    value: number;
};
/**
 * A user-defined function that computes a particle value during particle update.
 */
export type ParticleGeneratorValueFunction = (particle: ParticleMesh, dt: number) => number;
/**
 * Advanced particle value configuration.
 * If a base range is combined with a curve, the owning attribute decides how they compose.
 * `fn` is a complete override and must not be combined with the other fields.
 */
export type ParticleGeneratorValueOptions = {
    /**
     * Minimum base value sampled once per particle.
     */
    min?: number | undefined;
    /**
     * Maximum base value sampled once per particle.
     */
    max?: number | undefined;
    /**
     * Optional curve over normalized lifetime. Points must start at
     * time 0, end at time 1, and use strictly increasing times.
     */
    curve?: ParticleGeneratorCurvePoint[] | undefined;
    /**
     * Complete custom value function.
     */
    fn?: ParticleGeneratorValueFunction | undefined;
};
export type ParticleGeneratorValue = number | number[] | ParticleGeneratorValueOptions;
export type ParticleGeneratorColorCurvePoint = {
    /**
     * Normalized lifetime position, from 0 to 1.
     */
    time: number;
    /**
     * A color source at this lifetime position.
     */
    value: ColorSource;
};
/**
 * A user-defined function that computes a particle color during particle update.
 */
export type ParticleGeneratorColorFunction = (particle: ParticleMesh, dt: number) => number;
/**
 * Advanced particle color configuration.
 * `fn` is a complete override and must not be combined with `curve`.
 */
export type ParticleGeneratorColorValueOptions = {
    /**
     * Optional color curve over normalized lifetime. Points must
     * start at time 0, end at time 1, and use strictly increasing times.
     */
    curve?: ParticleGeneratorColorCurvePoint[] | undefined;
    /**
     * Complete custom color function.
     */
    fn?: ParticleGeneratorColorFunction | undefined;
};
export type ParticleGeneratorColorValue = ColorSource | ParticleGeneratorColorValueOptions;
export type ParticleGeneratorPoint = PIXI.IPointData;
export type ParticleGeneratorRectangle = PIXI.Rectangle | {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * An anchor source used to attach spawn areas and behaviors to a moving object.
 * Supported sources:
 * - A {@link PlaceableObject} (for example a Token): uses {@link ParticleGeneratorAnchorPoint} to choose a point.
 * - A point in scene coordinates.
 * - A function which returns a point-like object in scene coordinates.
 */
export type ParticleGeneratorAnchor = PIXI.IPointData | (() => ParticleGeneratorPoint) | null;
/**
 * Which point to use when anchoring to an object.
 * - "center": use `source.center` when available (recommended for Tokens).
 * - "position": use `{x: source.x, y: source.y}`.
 * - function: invoked as (source) => ({x, y}).
 */
export type ParticleGeneratorAnchorPoint = "center" | "position" | ((source: object) => ParticleGeneratorPoint);
export type ParticleGeneratorBehaviorId = "default" | "orbit" | "follow";
export type ParticleGeneratorOrbitOptions = {
    /**
     * Orbit radius in pixels.
     * If null, use the particle's initial distance from the anchor.
     */
    radius?: ParticleGeneratorRange | null | undefined;
    /**
     * Angular speed in degrees per second.
     */
    angularSpeed?: ParticleGeneratorRange | undefined;
    /**
     * Initial angle in degrees.
     * Only used when {@link ParticleGeneratorOrbitOptions#radius} is provided.
     */
    phase?: ParticleGeneratorRange | undefined;
    /**
     * Radial speed in pixels per second.
     */
    radialSpeed?: ParticleGeneratorRange | undefined;
    /**
     * Orbit direction.
     */
    direction?: 1 | -1 | "random" | undefined;
    /**
     * If set, override sprite rotation each frame.
     */
    rotation?: "none" | "tangent" | "radial" | undefined;
};
export type ParticleGeneratorFollowOptions = {
    /**
     * Fixed local offset from the anchor in pixels.
     * If null, use the particle's initial offset from the anchor.
     */
    offset?: ParticleGeneratorPoint | null;
    /**
     * A 0..1 smoothing factor. 1 snaps to the target every frame.
     */
    stiffness?: number | undefined;
};
export type ParticleGeneratorBehavior = {
    /**
     * Called once during construction.
     */
    initialize?: ((generator: ParticleGenerator) => void) | undefined;
    /**
     * Called for each spawned particle.
     */
    spawn?: ((particle: ParticleMesh, ctx: object) => void) | undefined;
    /**
     * Called for each particle during update.
     * Return true to indicate the behavior handled positional integration for this particle.
     */
    update?: ((particle: ParticleMesh, dt: number, ctx: object) => boolean | void) | undefined;
};
export type ParticleGeneratorAreaSampleMode = "interior" | "boundary";
/**
 * Source data for a {@link foundry.data.BaseShapeData} subclass.
 */
export type ParticleGeneratorShapeDataSource = {
    /**
     * A valid type from {@link foundry.data.BaseShapeData.TYPES}.
     */
    type: string;
};
export type ParticleGeneratorPointList = ParticleGeneratorPoint[];
export type ParticleGeneratorPolylineDefinition = ParticleGeneratorPointList | ParticleGeneratorPointList[];
/**
 * A spawn area definition in scene coordinates.
 * When an {@link ParticleGeneratorAnchor} is provided, object-based areas are interpreted as offsets relative
 * to the anchor point. To provide an absolute rectangle while anchored, pass a {@link PIXI.Rectangle}.
 * {@link foundry.data.BaseShapeData} instances and source data are always interpreted in absolute scene coordinates.
 * Supported shapes:
 * - Point: `{x, y}`
 * - Rect: `{x, y, width, height}` or `PIXI.Rectangle`
 * - Circle: `{x, y, radius}`
 * - Ring: `{x, y, innerRadius, outerRadius}` or `{x, y, radius: [inner, outer]}`
 * - Line: `{from: {x, y}, to: {x, y}}`
 * - Points: `{points: [{x, y}, ...]}` or `{shape: "points", points: [{x, y}, ...]}`
 * - Polyline: `{path: [{x, y}, ...]}`, `{shape: "path", path: [...]}`, or
 *   `{shape: "polyline", points: [{x, y}, ...]}`
 * - Ellipse: `{x, y, radiusX, radiusY}`, `{shape: "ellipse", x, y, radiusX, radiusY}`, with optional
 *   `holeScale`, `minAngle`, `maxAngle`, `shapeRotation`, and `affectRotation`.
 * - Shape instance: {@link foundry.data.BaseShapeData}
 * - Shape source data: `{type: "circle", x, y, radius}` using the {@link foundry.data.BaseShapeData} schema.
 * Plain object areas without a `type` are inferred from their properties.
 */
export type ParticleGeneratorArea = PIXI.Rectangle | foundry.data.PolygonTree | foundry.data.BaseShapeData | ParticleGeneratorShapeDataSource | ParticleGeneratorPoint | {
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    x: number;
    y: number;
    radius: number | number[];
} | {
    x: number;
    y: number;
    innerRadius: number;
    outerRadius: number;
} | {
    from: ParticleGeneratorPoint;
    to: ParticleGeneratorPoint;
} | {
    points: ParticleGeneratorPointList;
    shape?: "points";
} | {
    path: ParticleGeneratorPolylineDefinition;
    shape?: "path" | "polyline";
} | {
    points: ParticleGeneratorPolylineDefinition;
    shape: "polyline";
} | {
    x: number;
    y: number;
    radiusX: number;
    radiusY: number;
    shape?: "ellipse";
    holeScale?: number;
    minAngle?: number;
    maxAngle?: number;
    shapeRotation?: number;
    rotation?: number;
    affectRotation?: boolean;
};
export type ParticleGeneratorFadeOptions = {
    /**
     * Fade-in duration in milliseconds, or a fraction of lifetime if 0 < value < 1.
     */
    in?: number | undefined;
    /**
     * Fade-out duration in milliseconds, or a fraction of lifetime if 0 < value < 1.
     */
    out?: number | undefined;
};
/**
 * Particle rotation configuration that controls initial rotation of spawned particles and their rotational speed.
 *
 * Initial rotation is determined as:
 * 1. Base: Zero or, if `alignVelocity` is true, the particle's velocity angle
 * 2. Offset: `initial` is added to the base
 * 3. Spread: a random value in `[-spread, spread]` is added, default full-circle randomization
 *
 * After spawn, `speed` (degrees per second) governs ongoing rotation.
 */
export type ParticleGeneratorRotationOptions = {
    /**
     * Align initial rotation to the particle's velocity direction.
     */
    alignVelocity?: boolean | undefined;
    /**
     * Fixed rotation offset in radians, additive to the base.
     */
    initial?: number | undefined;
    /**
     * Symmetric random spread in radians around the base+initial.
     *             0 means no randomization; Math.PI gives full-circle random.
     */
    spread?: number | undefined;
    /**
     * Rotation speed over the particle lifetime. Initially specified
     *    in degrees-per-second, internally managed in radians-per-second.
     */
    speed?: ParticleGeneratorValue | undefined;
};
/**
 * A user-defined function that computes a particle velocity vector in pixels per second.
 * The function may either write into `out` and return void, or return a point-like velocity object.
 */
export type ParticleGeneratorVelocityFunction = (particle: ParticleMesh, dt: number, out: PIXI.Point) => PIXI.IPointData | void | null;
export type ParticleGeneratorVelocityOptions = ParticleGeneratorPoint | {
    x: ParticleGeneratorRange;
    y: ParticleGeneratorRange;
} | {
    speed: ParticleGeneratorValue;
    angle: ParticleGeneratorRange;
} | {
    fn: ParticleGeneratorVelocityFunction;
};
export type ParticleGeneratorConstraintMode = "none" | "kill" | "clamp" | "wrap" | "bounce";
export type ParticleGeneratorDebugTintMode = "random" | "palette" | "byTexture";
export type ParticleGeneratorDebugTintOptions = {
    /**
     * How to apply debug tinting.
     */
    mode?: ParticleGeneratorDebugTintMode | undefined;
    /**
     * A list of 0xRRGGBB colors used for "palette" or "byTexture" modes.
     */
    palette?: number[] | undefined;
};
export type ParticleGeneratorDebugOptions = {
    /**
     * If true, fall back to {@link PIXI.Texture.WHITE} when no textures are
     *  configured.
     */
    useWhiteTexture?: boolean | undefined;
    /**
     * Optional automatic tinting for spawned
     *   particles.
     */
    tint?: boolean | ParticleGeneratorDebugTintOptions | null | undefined;
    /**
     * Whether to collect debug statistics.
     */
    stats?: boolean | undefined;
    /**
     * Whether to capture per-tick timings (requires stats).
     */
    profile?: boolean | undefined;
};
export type ParticleGeneratorDebugStats = {
    /**
     * Current number of active particles.
     */
    active: number;
    /**
     * Current number of pooled particles.
     */
    pool: number;
    /**
     * Current adjusted target particle count.
     */
    target: number;
    /**
     * Number of spawn attempts.
     */
    spawnAttempts: number;
    /**
     * Number of successfully spawned particles.
     */
    spawned: number;
    /**
     * Spawn attempts rejected by probability (auto-spawn only).
     */
    spawnRejectedProbability: number;
    /**
     * Spawn attempts rejected by
     * {@link ParticleGeneratorConfiguration#positionTest}.
     */
    spawnRejectedPositionTest: number;
    /**
     * Spawn attempts rejected because no valid spawn area was available.
     */
    spawnRejectedNoArea: number;
    /**
     * Particles recycled due to lifetime expiration.
     */
    recycledLifetime: number;
    /**
     * Particles recycled due to constraint handling.
     */
    recycledConstraint: number;
    /**
     * Particles recycled/cleared due to a hard stop.
     */
    recycledStop: number;
    /**
     * Number of newly-visible rectangles this frame (ambient mode).
     */
    newlyVisibleAreaCount: number;
    /**
     * Time spent updating particles during the most recent tick (milliseconds).
     */
    updateMS: number;
    /**
     * Time spent auto-spawning particles during the most recent tick (milliseconds).
     */
    spawnMS: number;
    /**
     * Total tick time for the most recent tick (milliseconds).
     */
    tickMS: number;
};
export type ParticleGeneratorClipOptions = {
    /**
     * Whether to apply a managed clip mask.
     * If null, defaults to true in ambient mode and false in effect mode.
     */
    enabled?: boolean | null | undefined;
    /**
     * Optional clip rectangle in scene coordinates.
     * If omitted, a shape-based spawn area is used when available. Otherwise the generator bounds are used.
     */
    rect?: ParticleGeneratorRectangle | null;
};
export type ParticleGeneratorPositionTest = (x: number, y: number, context: {
    generator: ParticleGenerator;
    particle: ParticleMesh;
}) => boolean;
export type ParticleGeneratorParticleCallback = (particle: ParticleMesh, context: {
    generator: ParticleGenerator;
}) => void;
export type ParticleGeneratorDeathCallback = (particle: ParticleMesh, context: {
    generator: ParticleGenerator;
    reason: string;
}) => void;
export type ParticleGeneratorTickCallback = (dt: number, generator: ParticleGenerator) => void;
export type ParticleGeneratorConfiguration = {
    /**
     * The runtime mode.
     * - "ambient": maintains a stable density in the visible region (viewport-based budget).
     * - "effect": spawns in a defined area; particles are lifetime-driven unless constrained.
     */
    mode?: ParticleGeneratorMode | undefined;
    /**
     * Optional generator bounds in scene coordinates.
     * This is used for coordinate conversion, viewport clamping, and optional clipping.
     * Defaults to the current Scene dimensions.
     */
    bounds?: ParticleGeneratorRectangle | null;
    /**
     * The target particle count.
     * - In "ambient" mode, this is the maximum for the full bounds and is scaled by visible area.
     * - In "effect" mode, this is the absolute target.
     */
    count?: number | undefined;
    /**
     * The maximum number of particles that may be spawned per second
     * (auto-spawn mode).
     */
    spawnRate?: number | undefined;
    /**
     * Deprecated since v14. Use `spawnRate` instead. If `spawnRate` is omitted or null,
     * this legacy per-frame value is converted using the Pixi ticker target frame rate.
     */
    perFrame?: number | undefined;
    /**
     * The initial proportion (0..1) of the computed target particle count to spawn on
     * start.
     */
    initial?: number | undefined;
    /**
     * If true, particles are never spawned automatically.
     * If null, defaults to true in "effect" mode unless `spawnRate` is explicitly configured and false in "ambient"
     * mode. Legacy `perFrame` does not change the default.
     */
    manual?: boolean | null | undefined;
    /**
     * The chance (0..1) that a spawn attempt actually creates a particle.
     */
    probability?: number | undefined;
    /**
     * A proportion (0..1+) of extra area around the visible region used for spawning.
     * For example, 0.2 extends the spawn region by 20% in each dimension.
     */
    viewPadding?: number | undefined;
    /**
     * If true, prioritize spawning particles in newly-visible areas when the view
     * changes (pan/zoom).
     */
    newlyVisible?: boolean | undefined;
    /**
     * If true, particles spawned in padded regions can start partially
     * through their lifetime.
     */
    randomizeAgeInPadding?: boolean | undefined;
    /**
     * The default spawn area in "effect" mode (scene coordinates).
     */
    area?: ParticleGeneratorArea | null;
    /**
     * Which part of the spawn area to sample.
     */
    sampleMode?: ParticleGeneratorAreaSampleMode | undefined;
    /**
     * An optional spawn validator.
     * The function is invoked as (x, y, {generator, particle}) and must return true if the location is valid.
     * Coordinates are scene coordinates in pixels. The generator evaluates a single candidate position per spawn attempt.
     */
    positionTest?: ParticleGeneratorPositionTest | null | undefined;
    /**
     * How to handle particles leaving the constraint
     * area.
     * If null, defaults to "kill" in ambient mode and "none" in effect mode.
     */
    constraintMode?: ParticleGeneratorConstraintMode | null | undefined;
    /**
     * The constraint area.
     * - "budget": the padded viewport rectangle.
     * - "view": the unpadded viewport rectangle.
     * - "world": the generator bounds.
     * - Rectangle: a custom rectangle in scene coordinates.
     * If null, defaults to "budget" in ambient mode when constraintMode is not "none".
     */
    constraintArea?: "budget" | "view" | "world" | ParticleGeneratorRectangle | null;
    /**
     * Bounce restitution factor (0..1) used when constraintMode is "bounce".
     */
    restitution?: number | undefined;
    /**
     * Clip (=> mask) configuration. Use true for default clipping. If no clip rectangle is provided and
     * {@link ParticleGeneratorConfiguration#area} is a {@link foundry.data.BaseShapeData}, that shape is used.
     */
    clip?: ParticleGeneratorClipOptions | ParticleGeneratorRectangle | boolean;
    /**
     * An explicit mask for the
     * particle container. Accepts either a pre-built PIXI.DisplayObject, a PIXI shape, or a
     * {@link foundry.data.BaseShapeData} which is drawn into a PIXI.Graphics.
     * Presence implies masking is desired, and this mask takes precedence over `clip`.
     */
    mask?: PIXI.DisplayObject | PIXI.IShape | foundry.data.BaseShapeData | null;
    /**
     * The particle lifetime in milliseconds.
     */
    lifetime?: ParticleGeneratorRange | undefined;
    /**
     * Fade envelope configuration.
     */
    fade?: ParticleGeneratorFadeOptions | undefined;
    /**
     * The particle velocity in pixels per second.
     */
    velocity?: ParticleGeneratorVelocityOptions | null;
    /**
     * Rotation configuration for particles.
     */
    rotation?: ParticleGeneratorRotationOptions | undefined;
    /**
     * Optional random drift configuration.
     */
    drift?: {
        enabled: boolean;
        intensity: number;
    } | undefined;
    /**
     * The particle texture sources.
     * Each entry may be a PIXI.Texture or a string path usable by foundry.canvas.getTexture/PIXI.Texture.from.
     */
    textures?: any[] | undefined;
    /**
     * Optional sprite anchor override for particle textures.
     * If null, each texture's `defaultAnchor` is used.
     */
    particleAnchor?: ParticleGeneratorPoint | null;
    /**
     * Optional shader class used to render particles.
     * Defaults to {@link BaseSamplerShader}. Batchable shaders are the fast path for sustained effects.
     * ParticleGenerator creates plain {@link SpriteMesh} instances, so shaders which require
     * {@link foundry.canvas.primary.PrimarySpriteMesh} occlusion or depth data are not supported.
     */
    shaderClass?: typeof BaseSamplerShader | null | undefined;
    /**
     * The blend mode used to render particles.
     */
    blend?: any;
    /**
     * An optional blur filter applied to the internal container.
     */
    blur?: number | {
        intensity: number;
        quality?: number;
    } | {
        enabled: boolean;
        intensity: number;
        quality?: number;
    } | null | undefined;
    /**
     * The alpha value for particles.
     */
    alpha?: ParticleGeneratorValue | undefined;
    /**
     * The scale value for particles.
     */
    scale?: ParticleGeneratorValue | undefined;
    /**
     * The tint color for particles.
     */
    tint?: ParticleGeneratorColorValue | undefined;
    /**
     * The elevation for the particle container.
     */
    elevation?: number | undefined;
    /**
     * The sorting key for the particle container.
     */
    sort?: number | undefined;
    /**
     * The parent container which receives the internal particle container. Defaults
     * to canvas.primary.
     */
    container?: any;
    /**
     * The ticker used to drive the update loop. Defaults to
     * {@link CanvasAnimation.ticker}.
     */
    ticker?: any;
    /**
     * An optional anchor used to attach areas and behaviors.
     */
    anchor?: ParticleGeneratorAnchor;
    /**
     * Which point to use when anchoring.
     */
    anchorPoint?: ParticleGeneratorAnchorPoint | undefined;
    /**
     * A fixed offset (scene pixels) applied to the anchor.
     */
    anchorOffset?: ParticleGeneratorPoint | null;
    /**
     * Optional behavior.
     */
    behavior?: ParticleGeneratorBehavior | ParticleGeneratorBehaviorId | null | undefined;
    /**
     * Orbit behavior options.
     */
    orbit?: ParticleGeneratorOrbitOptions | undefined;
    /**
     * Follow behavior options.
     */
    follow?: ParticleGeneratorFollowOptions | undefined;
    /**
     * An optional callback called after the particle has been placed and configured.
     * This is a handy place to attach custom per-particle data for batch shaders.
     */
    onSpawn?: ParticleGeneratorParticleCallback | null | undefined;
    /**
     * An optional callback called each frame for each live particle, after position, rotation, tint, and alpha have been
     * computed.
     */
    onUpdate?: ParticleGeneratorParticleCallback | null | undefined;
    /**
     * An optional callback called when a particle is recycled.
     */
    onDeath?: ParticleGeneratorDeathCallback | null | undefined;
    /**
     * An optional callback called per frame (not per particle!).
     */
    onTick?: ParticleGeneratorTickCallback | null | undefined;
    /**
     * Optional debugging helpers.
     */
    debug?: boolean | ParticleGeneratorDebugOptions | null | undefined;
};
export type ParticleMesh = SpriteMesh & {
    generator: ParticleGenerator;
    elapsedTime: number;
    time: number;
    lifetime: number;
    fadeInDuration: number;
    fadeOutDuration: number;
    maxAlpha: number;
    _baseScale: number;
    _baseTint: number;
    _baseSpeed?: number;
    _baseRotationSpeed: number;
    rotationSpeed: number;
    movementSpeed: PIXI.Point;
    _movementDirectionX?: number;
    _movementDirectionY?: number;
    _movementDriftX?: number;
    _movementDriftY?: number;
    _velocityFunctionBounceX?: number;
    _velocityFunctionBounceY?: number;
};
export type ParticleGeneratorPolylineSegment = {
    ax: number;
    ay: number;
    bx: number;
    by: number;
    length: number;
};
export type ParticleGeneratorLocalArea = {
    type: "shape" | "polygonTree" | "point" | "points" | "polyline" | "ellipse" | "ambientRect" | "line";
    data?: foundry.data.PolygonTree | foundry.data.BaseShapeData | undefined;
    sampleMode?: ParticleGeneratorAreaSampleMode | undefined;
    x?: number | undefined;
    y?: number | undefined;
    points?: ParticleGeneratorPointList | undefined;
    segments?: ParticleGeneratorPolylineSegment[] | undefined;
    cumulativeLengths?: number[] | undefined;
    totalLength?: number | undefined;
    fallbackPoint?: ParticleGeneratorPoint | null;
    radiusX?: number | undefined;
    radiusY?: number | undefined;
    minAngle?: number | undefined;
    maxAngle?: number | undefined;
    shapeRotation?: number | undefined;
    affectRotation?: boolean | undefined;
    cosRotation?: number | undefined;
    sinRotation?: number | undefined;
    holeAreaScale?: number | undefined;
    rect?: any;
    ax?: number | undefined;
    ay?: number | undefined;
    bx?: number | undefined;
    by?: number | undefined;
};
export type CanvasAnimationAttribute = {
    /**
     * The attribute name being animated
     */
    attribute: string;
    /**
     * The object within which the attribute is stored
     */
    parent: object;
    /**
     * The destination value of the attribute
     */
    to: number | Color;
    /**
     * An initial value of the attribute, otherwise `parent[attribute]` is used
     */
    from?: number | Color | undefined;
    /**
     * The computed delta between to and from
     */
    delta?: number | undefined;
    /**
     * The amount of the total delta which has been animated
     */
    done?: number | undefined;
    /**
     * Is this a color animation that applies to RGB channels
     */
    color?: boolean | undefined;
};
export type CanvasAnimationEasingFunction = "easeInOutCosine" | "easeOutCircle" | "easeInCircle" | ((percentage: number) => number);
export type CanvasAnimationOptions = {
    /**
     * A DisplayObject which defines context to the PIXI.Ticker function
     */
    context?: any;
    /**
     * A unique name which can be used to reference the in-progress animation
     */
    name?: string | symbol | undefined;
    /**
     * A duration in milliseconds over which the animation should occur
     */
    duration?: number | undefined;
    /**
     * The current time of the animation, in milliseconds
     */
    time?: number | undefined;
    /**
     * A priority in PIXI.UPDATE_PRIORITY which defines when the animation
     *             should be evaluated related to others
     */
    priority?: number | undefined;
    /**
     * An easing function used to translate animation time or
     *  the string name of a static member of CanvasAnimation
     */
    easing?: CanvasAnimationEasingFunction | undefined;
    /**
     * A callback function which fires after every frame
     */
    ontick?: ((elapsedMS: number, animation: CanvasAnimationData) => void) | undefined;
    /**
     * The animation isn't started until this promise resolves
     */
    wait?: Promise<any> | undefined;
};
export type _CanvasAnimationData = {
    /**
     * The animation function being executed each frame
     */
    fn: () => void;
    /**
     * The attributes being animated
     */
    attributes: CanvasAnimationAttribute[];
    /**
     * The current state of the animation
     * (see {@link foundry.canvas.animation.CanvasAnimation.STATES})
     */
    state: number;
    /**
     * A Promise which resolves once the animation is complete
     */
    promise: Promise<boolean>;
    /**
     * The resolution function, allowing animation to be ended early
     */
    resolve: (completed: boolean) => void;
    /**
     * The rejection function, allowing animation to be ended early
     */
    reject: (error: Error) => void;
};
export type CanvasAnimationData = _CanvasAnimationData & CanvasAnimationOptions;
import type { ColorSource } from "../../../common/_types.mjs";
import type ParticleGenerator from "./particle-generator.mjs";
import type BaseSamplerShader from "../rendering/shaders/samplers/base-sampler.mjs";
import type SpriteMesh from "../containers/elements/sprite-mesh.mjs";
import type { Color } from "../../../common/utils/_module.mjs";
