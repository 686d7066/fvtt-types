/**
 * @import {VFXBasePathPoint, VFXPositionalSoundData} from "../_types.mjs";
 */
/**
 * @typedef VFXSingleImpactData
 * @property {VFXBasePathPoint} position
 * @property {string} texture
 * @property {VFXPositionalSoundData|null} sound
 * @property {number} duration
 * @property {number} [size]
 * @property {{x: number, y: number}} [scale]
 * @property {{function: string, params: object}[]} [animations]
 */
/**
 * A VFX component used to add a single impact effect at a certain location.
 * This component handles basic impacts that can be represented as the combination of a sprite and a sound.
 *
 * @example A blood splatter impact
 * ```js
 * const vfxConfig = {
 *   name: "bloodSplatter",
 *   components: {
 *     splash: {
 *       type: "singleImpact",
 *       position: {reference: "target", deltas: {sort: 1}},
 *       texture: "assets/impact/BloodSplatter1.png",
 *       size: 2,
 *       duration: 2000,
 *       sound: {
 *         src: "assets/sounds/ArrowHit1.wav",
 *         align: 1
 *       }
 *     }
 *   },
 *   timeline: [{component: "splash"}]
 * };
 * const effect = new foundry.canvas.vfx.VFXEffect(vfxConfig);
 * const target = game.user.targets.first();
 * effect.play({
 *   target: {...target.center, elevation: target.document.elevation, sort: target.document.sort}
 * });
 * ```
 * @extends {VFXComponent<VFXSingleImpactData>}
 */
export default class VFXSingleImpactComponent extends VFXComponent<VFXSingleImpactData> {
    /** @inheritDoc */
    static defineSchema(): {
        position: VFXReferenceObjectField<any>;
        texture: StringField;
        duration: NumberField;
        scale: VFXReferencePointField;
        size: VFXReferenceField;
        sound: SchemaField;
        animations: ArrayField<SchemaField>;
        type: StringField;
    };
    constructor(data?: Partial<VFXSingleImpactData> | undefined, { parent, schema, strict, ...options }?: any);
    #private;
}
export type VFXSingleImpactData = {
    position: VFXBasePathPoint;
    texture: string;
    sound: VFXPositionalSoundData | null;
    duration: number;
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
import VFXComponent from "../vfx-component.mjs";
import { VFXReferenceObjectField } from "../fields/_module.mjs";
import { StringField } from "../../../../common/data/fields.mjs";
import { NumberField } from "../../../../common/data/fields.mjs";
import { VFXReferencePointField } from "../fields/_module.mjs";
import { VFXReferenceField } from "../fields/_module.mjs";
import { SchemaField } from "../../../../common/data/fields.mjs";
import { ArrayField } from "../../../../common/data/fields.mjs";
import type { VFXBasePathPoint } from "../_types.mjs";
import type { VFXPositionalSoundData } from "../_types.mjs";
