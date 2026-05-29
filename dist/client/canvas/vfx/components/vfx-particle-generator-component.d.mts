/**
 * @import {ParticleGeneratorConfiguration, ParticleGeneratorRotationOptions} from "../../animation/_types.mjs";
 */
/**
 * @typedef VFXParticleGeneratorData
 * @property {string[]} textures                           Texture paths for particles
 * @property {string} mode                                 Generator mode: "ambient" or "effect" (default "effect")
 * @property {number} count                                Target particle count (default 50)
 * @property {object|null} area                            Spawn area; a point, rect, circle, ring, or line object.
 *                                                         Supports reference resolution (e.g. {reference: "target"}).
 * @property {{min: number, max: number|null}} lifetime    Particle lifetime in ms. If max is null, min is used as a
 *                                                         fixed value. Otherwise, spawns with a random lifetime in
 *                                                         [min, max] (default min 1000).
 * @property {{in: number, out: number}|null} fade         Fade-in and fade-out durations in ms (default null)
 * @property {{min: number, max: number}} alpha            Alpha range [min, max] (default 1)
 * @property {{min: number, max: number}} scale            Scale range [min, max] (default 1)
 * @property {{angle: number, speed: number, x: number, y: number}|null} velocity
 *                                                         Initial particle velocity. Specify either x/y components
 *                                                         or speed (px/s) and angle (degrees). (default null)
 * @property {ParticleGeneratorRotationOptions} [rotation] Rotation configuration for particles.
 * @property {number} blend                                PIXI blend mode (default NORMAL = 0)
 * @property {number} elevation                            Layer elevation for the particle container (default 0)
 * @property {number} sort                                 Sort order within the elevation layer (default 0)
 * @property {number} [duration]                           How long the generator runs in ms before soft-stopping
 *                                                         to let existing particles expire. If absent, runs until
 *                                                         the component is explicitly stopped.
 * @property {number} initial                              Proportion of count to spawn immediately on start [0, 1]
 *                                                         (default 0.25)
 * @property {number} spawnRate                            Maximum particles spawned per second during auto-spawn
 *                                                         (default 300)
 * @property {number} [perFrame=5]                         Deprecated since v14. Migrated to `spawnRate`.
 * @property {ParticleGeneratorConfiguration} config
 * Additional ParticleGenerator configuration passed directly to the constructor. Can include orbit, follow,
 * constraints, drift, blur, clip, anchor, callbacks, and any other {@link ParticleGeneratorConfiguration} fields.
 * When effects are built directly in code, this can also include a custom batchable `shaderClass` that is
 * compatible with SpriteMesh and whose plugin was already registered.
 * Values here override any explicitly-set schema fields of the same name.
 * @property {PointSourcePolygon|{x: number, y: number, type: string, radius: number|null}|null} pointSourceMask
 * An optional mask for clipping particles to wall boundaries. Accepts either a pre-computed PointSourcePolygon
 * (shared via VFXReferenceField resolution) or a serializable config object {x, y, type, radius} from which a polygon
 * is computed at draw time. Supports reference resolution for efficient reuse across multiple components within the
 * same effect.
 */
/**
 * A VFX component that creates and manages a {@link foundry.canvas.animation.ParticleGenerator}.
 * Handles the full lifecycle: loading textures, constructing the generator config, starting and
 * stopping the generator in sync with the VFX timeline.
 *
 * The generator always runs with `manual: false` so particles are spawned automatically. Provide
 * a `duration` to limit how long the generator emits; after that time it soft-stops and lets any
 * in-flight particles expire naturally. If no `duration` is given the generator runs indefinitely
 * until the component is stopped externally.
 *
 * @example A burst of sparks at an impact point
 * ```js
 * const vfxConfig = {
 *   name: "sparkBurst",
 *   components: {
 *     sparks: {
 *       type: "particleGenerator",
 *       textures: ["assets/particles/spark.png"],
 *       area: {reference: "target"},
 *       count: 40,
 *       spawnRate: 90,
 *       duration: 1200,
 *       lifetime: {min: 300, max: 700},
 *       fade: {in: 50, out: 200},
 *       scale: {min: 0.2, max: 0.6},
 *       velocity: {speed: 4, angle: 0},
 *       config: {
 *         constraints: {mode: "none"},
 *         drift: {enabled: true, intensity: 0.4}
 *       }
 *     }
 *   },
 *   timeline: [{component: "sparks"}]
 * };
 * const effect = new foundry.canvas.vfx.VFXEffect(vfxConfig);
 * const target = game.user.targets.first();
 * effect.play({target: target.center});
 * ```
 * @extends {VFXComponent<VFXParticleGeneratorData>}
 */
export default class VFXParticleGeneratorComponent extends VFXComponent<VFXParticleGeneratorData> {
    /** @inheritDoc */
    static defineSchema(): {
        alpha: SchemaField;
        area: VFXReferenceField;
        blend: NumberField;
        count: VFXReferenceField;
        duration: NumberField;
        elevation: NumberField;
        fade: SchemaField;
        initial: NumberField;
        lifetime: SchemaField;
        mode: StringField;
        config: ObjectField;
        spawnRate: NumberField;
        rotation: SchemaField;
        scale: SchemaField;
        sort: NumberField;
        textures: ArrayField<StringField>;
        velocity: SchemaField;
        pointSourceMask: VFXPointSourcePolygonField;
        type: StringField;
    };
    /** @inheritDoc */
    static migrateData(data: any): object;
    constructor(data?: Partial<VFXParticleGeneratorData> | undefined, { parent, schema, strict, ...options }?: any);
    #private;
}
export type VFXParticleGeneratorData = {
    /**
     * Texture paths for particles
     */
    textures: string[];
    /**
     * Generator mode: "ambient" or "effect" (default "effect")
     */
    mode: string;
    /**
     * Target particle count (default 50)
     */
    count: number;
    /**
     * Spawn area; a point, rect, circle, ring, or line object.
     * Supports reference resolution (e.g. {reference: "target"}).
     */
    area: object | null;
    /**
     * Particle lifetime in ms. If max is null, min is used as a
     * fixed value. Otherwise, spawns with a random lifetime in
     * [min, max] (default min 1000).
     */
    lifetime: {
        min: number;
        max: number | null;
    };
    /**
     * Fade-in and fade-out durations in ms (default null)
     */
    fade: {
        in: number;
        out: number;
    } | null;
    /**
     * Alpha range [min, max] (default 1)
     */
    alpha: {
        min: number;
        max: number;
    };
    /**
     * Scale range [min, max] (default 1)
     */
    scale: {
        min: number;
        max: number;
    };
    /**
     *                                                         Initial particle velocity. Specify either x/y components
     *                                                         or speed (px/s) and angle (degrees). (default null)
     */
    velocity: {
        angle: number;
        speed: number;
        x: number;
        y: number;
    } | null;
    /**
     * Rotation configuration for particles.
     */
    rotation?: ParticleGeneratorRotationOptions | undefined;
    /**
     * PIXI blend mode (default NORMAL = 0)
     */
    blend: number;
    /**
     * Layer elevation for the particle container (default 0)
     */
    elevation: number;
    /**
     * Sort order within the elevation layer (default 0)
     */
    sort: number;
    /**
     * How long the generator runs in ms before soft-stopping
     *                            to let existing particles expire. If absent, runs until
     *                            the component is explicitly stopped.
     */
    duration?: number | undefined;
    /**
     * Proportion of count to spawn immediately on start [0, 1]
     * (default 0.25)
     */
    initial: number;
    /**
     * Maximum particles spawned per second during auto-spawn
     * (default 300)
     */
    spawnRate: number;
    /**
     * Deprecated since v14. Migrated to `spawnRate`.
     */
    perFrame?: number | undefined;
    /**
     * Additional ParticleGenerator configuration passed directly to the constructor. Can include orbit, follow,
     * constraints, drift, blur, clip, anchor, callbacks, and any other {@link ParticleGeneratorConfiguration} fields.
     * When effects are built directly in code, this can also include a custom batchable `shaderClass` that is
     * compatible with SpriteMesh and whose plugin was already registered.
     * Values here override any explicitly-set schema fields of the same name.
     */
    config: ParticleGeneratorConfiguration;
    /**
     * An optional mask for clipping particles to wall boundaries. Accepts either a pre-computed PointSourcePolygon
     * (shared via VFXReferenceField resolution) or a serializable config object {x, y, type, radius} from which a polygon
     * is computed at draw time. Supports reference resolution for efficient reuse across multiple components within the
     * same effect.
     */
    pointSourceMask: PointSourcePolygon | {
        x: number;
        y: number;
        type: string;
        radius: number | null;
    } | null;
};
import VFXComponent from "../vfx-component.mjs";
import { SchemaField } from "../../../../common/data/fields.mjs";
import { VFXReferenceField } from "../fields/_module.mjs";
import { NumberField } from "../../../../common/data/fields.mjs";
import { StringField } from "../../../../common/data/fields.mjs";
import { ObjectField } from "../../../../common/data/fields.mjs";
import { ArrayField } from "../../../../common/data/fields.mjs";
import { VFXPointSourcePolygonField } from "../fields/_module.mjs";
import type { ParticleGeneratorRotationOptions } from "../../animation/_types.mjs";
import type { ParticleGeneratorConfiguration } from "../../animation/_types.mjs";
