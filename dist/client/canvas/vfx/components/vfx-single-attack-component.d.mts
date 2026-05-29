/**
 * @import {DataSchema} from "../../../../common/abstract/_types.mjs";
 * @import {VFXBasePathPoint, VFXComponentAnimation, VFXPositionalSoundData} from "../_types.mjs";
 */
/** @typedef {"charge"|"projectile"|"impact"} VFXSingleAttackStepName */
/**
 * @typedef VFXSingleAttackStep
 * @property {string|null} texture
 * @property {VFXPositionalSoundData|null} sound
 * @property {number} [duration]
 * @property {number} [size]
 * @property {{x: number, y: number}} [scale]
 * @property {{function: string, params: object}[]} [animations]
 */
/**
 * @typedef VFXSingleAttackData
 * @property {VFXBasePathPoint[]} path
 * @property {VFXSingleAttackStep} charge
 * @property {VFXSingleAttackStep & {speed?: number}} projectile
 * @property {VFXSingleAttackStep} impact
 */
/**
 * A base class VFX component used for single actor -> target direct attacks.
 *
 * This provides a convenience layer that can include any or all of the following:
 * 1. Pre-attack charge-up sprite animation
 * 2. Pre-attack charge-up audio
 * 3. Attack projectile sprite
 * 4. Attack projectile audio
 * 5. Pre-impact audio
 * 6. Impact sprite animation
 * 7. Impact (or pre-impact) audio
 *
 * @example A projectile with an impact animation
 * ```js
 * const vfxConfig = {
 *   name: "arrowShot",
 *   components: {
 *     arrowShot: {
 *       type: "singleAttack",
 *       path: [{reference: "token", deltas: {sort: 1}}, {reference: "target", deltas: {sort: 1}}],
 *       charge: {
 *         duration: 1000,
 *         animations: [{function: "drawBack"}],
 *         sound: {
 *          src: "assets/sounds/BowAttack1.ogg",
 *          align: 2
 *         }
 *       },
 *       projectile: {
 *        texture: "assets/arrow/arrow-wood.png",
 *        animations: [{function: "followPath"}],
 *        size: 3, // feet
 *        speed: 150 // feet-per-second
 *       },
 *       impact: {
 *         texture: "assets/impact/BloodSplatter1.png",
 *         duration: 2000,
 *         sound: {
 *            src: "assets/sounds/ArrowHit1.wav",
 *            align: 1
 *         }
 *       }
 *     }
 *   },
 *   timeline: [{component: "arrowShot"}]
 * };
 * const effect = new foundry.canvas.vfx.VFXEffect(vfxConfig);
 * const target = game.user.targets.first();
 * effect.play({
 *   token: {..._token.center, elevation: _token.document.elevation, sort: _token.document.sort},
 *   target: {...target.center, elevation: target.document.elevation, sort: target.document.sort}
 * });
 * ```
 * @extends {VFXComponent<VFXSingleAttackData>}
 */
export default class VFXSingleAttackComponent extends VFXComponent<VFXSingleAttackData> {
    /**
     * The steps of the single attack sequence.
     * @type {VFXSingleAttackStepName[]}
     */
    static STEPS: VFXSingleAttackStepName[];
    /** @inheritDoc */
    static defineSchema(): {
        path: ArrayField<VFXReferenceObjectField<any>>;
        pathType: SchemaField;
        charge: SchemaField;
        projectile: SchemaField;
        impact: SchemaField;
        type: StringField;
    };
    /**
     * A reused sub-schema definition shared across all three of the charge, projectile, and impact steps.
     * @returns {DataSchema}
     */
    static "__#224@#attackStepSchema"(): DataSchema;
    constructor(data?: Partial<VFXSingleAttackData> | undefined, { parent, schema, strict, ...options }?: any);
    /**
     * The configured origin point of the path.
     * This is recorded at the beginning of the _draw workflow once references are resolved.
     * @type {VFXBasePathPoint}
     */
    origin: VFXBasePathPoint;
    /**
     * The configured destination point of the path.
     * This is recorded at the beginning of the _draw workflow once references are resolved.
     * @type {VFXBasePathPoint}
     */
    destination: VFXBasePathPoint;
    /**
     * Basic charge animation. It is expected for subclasses to override this to refine the effect.
     * @param {Record<string, number>} timings
     * @protected
     */
    protected _animateCharge(timings: Record<string, number>): void;
    /**
     * Basic projectile animation. It is expected for subclasses to override this to refine the effect.
     * @param {Record<string, number>} timings
     * @protected
     */
    protected _animateProjectile(timings: Record<string, number>): void;
    /**
     * Basic impact animation. It is expected for subclasses to override this to refine the effect.
     * @param {Record<string, number>} timings
     * @protected
     */
    protected _animateImpact(timings: Record<string, number>): void;
    /**
     * Compute timings for each step start, end, and sound.
     * @returns {Record<string, number>}
     * @protected
     */
    protected _getTimings(): Record<string, number>;
    #private;
}
export type VFXSingleAttackStepName = "charge" | "projectile" | "impact";
export type VFXSingleAttackStep = {
    texture: string | null;
    sound: VFXPositionalSoundData | null;
    duration?: number | undefined;
    size?: number | undefined;
    scale?: {
        x: number;
        y: number;
    } | undefined;
    animations?: {
        function: string;
        params: object;
    }[] | undefined;
};
export type VFXSingleAttackData = {
    path: VFXBasePathPoint[];
    charge: VFXSingleAttackStep;
    projectile: VFXSingleAttackStep & {
        speed?: number;
    };
    impact: VFXSingleAttackStep;
};
import VFXComponent from "../vfx-component.mjs";
import type { VFXBasePathPoint } from "../_types.mjs";
import { VFXReferenceObjectField } from "../fields/_module.mjs";
import { ArrayField } from "../../../../common/data/fields.mjs";
import { SchemaField } from "../../../../common/data/fields.mjs";
import { StringField } from "../../../../common/data/fields.mjs";
import type { DataSchema } from "../../../../common/abstract/_types.mjs";
import type { VFXPositionalSoundData } from "../_types.mjs";
