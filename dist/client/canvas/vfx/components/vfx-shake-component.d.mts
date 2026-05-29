/**
 * @typedef VFXShakeData
 * @property {string} target           The canvas property key of the display object to shake (default "stage")
 * @property {number} duration         The active shake duration in milliseconds (default 5000)
 * @property {number} maxDisplacement  The maximum displacement in pixels at the start of the shake (default 35)
 * @property {number} returnSpeed      The return-to-origin interpolation factor per tick in [0, 1] (default 0.1)
 * @property {number|null} seed        An optional seed for a deterministic, reproducible shake pattern (default null)
 * @property {number} smoothness       Shake smoothness in [0, 1]; higher values produce lower-frequency motion (default 0.5)
 */
/**
 * A component that applies a canvas shake effect to a target PIXI display object using the
 * `CanvasShakeEffect` API. Primarily intended for camera shakes (`canvas.stage`) but can also
 * target individual canvas layers or groups.
 *
 * @example A screen shake on impact
 * ```js
 * const vfxConfig = {
 *   name: "impactShake",
 *   components: {
 *     screenShake: {
 *       type: "shake",
 *       target: "stage",
 *       duration: 800,
 *       maxDisplacement: 18,
 *       smoothness: 0.4
 *     }
 *   },
 *   timeline: [{component: "screenShake"}]
 * };
 * const effect = new foundry.canvas.vfx.VFXEffect(vfxConfig);
 * effect.play();
 * ```
 * @extends {VFXComponent<VFXShakeData>}
 */
export default class VFXShakeComponent extends VFXComponent<VFXShakeData> {
    /** @inheritDoc */
    static defineSchema(): {
        duration: NumberField;
        maxDisplacement: NumberField;
        returnSpeed: NumberField;
        seed: NumberField;
        smoothness: NumberField;
        target: VFXReferenceField;
        type: StringField;
    };
    constructor(data?: Partial<VFXShakeData> | undefined, { parent, schema, strict, ...options }?: any);
    #private;
}
export type VFXShakeData = {
    /**
     * The canvas property key of the display object to shake (default "stage")
     */
    target: string;
    /**
     * The active shake duration in milliseconds (default 5000)
     */
    duration: number;
    /**
     * The maximum displacement in pixels at the start of the shake (default 35)
     */
    maxDisplacement: number;
    /**
     * The return-to-origin interpolation factor per tick in [0, 1] (default 0.1)
     */
    returnSpeed: number;
    /**
     * An optional seed for a deterministic, reproducible shake pattern (default null)
     */
    seed: number | null;
    /**
     * Shake smoothness in [0, 1]; higher values produce lower-frequency motion (default 0.5)
     */
    smoothness: number;
};
import VFXComponent from "../vfx-component.mjs";
import { NumberField } from "../../../../common/data/fields.mjs";
import { VFXReferenceField } from "../fields/_module.mjs";
import { StringField } from "../../../../common/data/fields.mjs";
