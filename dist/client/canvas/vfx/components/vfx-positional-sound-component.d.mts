/**
 * @import {VFXPositionalSoundData} from "../_types.mjs";
 */
/**
 * @typedef _VFXPositionalSoundData
 * @property {number} x             The x coordinate of the sound origin
 * @property {number} y             The y coordinate of the sound origin
 * @property {number} elevation     The elevation of the sound origin
 * @property {number} [angle]       The angle of the sound cone in degrees
 * @property {number} [rotation]    The direction of sound emission in degrees
 * @property {boolean} gmAlways     Whether the GM always hears the sound regardless of position (default true)
 * @property {{type: string, intensity: number}|null} [baseEffect]    Audio effect applied when the sound is not muffled
 * @property {{type: string, intensity: number}|null} [muffledEffect] Audio effect applied when the sound is muffled
 * @property {number} fade          Fade-in duration in milliseconds (default 0)
 * @property {number} [duration]    Component duration in milliseconds; defaults to the sound's natural duration
 * @property {string} channel       Audio channel for playback (default "environment")
 */
/**
 * @typedef {VFXPositionalSoundData & _VFXPositionalSoundData} VFXPositionalSoundComponentData
 */
/**
 * A component for playing positional sound effects that are synchronized with the VFX timeline.
 * This component provides serializable and persisted data storage around the `Sound#playAtPosition` API.
 *
 * @example A thunderclap at a specific location
 * ```js
 * const vfxConfig = {
 *   name: "thunderclap",
 *   components: {
 *     thunder: {
 *       type: "positionalSound",
 *       src: "assets/sounds/thunder.ogg",
 *       x: 3200,
 *       y: 2400,
 *       radius: 120,
 *       volume: 0.8,
 *       channel: "environment"
 *     }
 *   },
 *   timeline: [{component: "thunder"}]
 * };
 * const effect = new foundry.canvas.vfx.VFXEffect(vfxConfig);
 * effect.play();
 * ```
 * @extends {VFXComponent<VFXPositionalSoundComponentData>}
 */
export default class VFXPositionalSoundComponent extends VFXComponent<VFXPositionalSoundComponentData> {
    /** @inheritDoc */
    static defineSchema(): {
        channel: StringField;
        duration: NumberField;
        easing: BooleanField;
        elevation: NumberField;
        fade: NumberField;
        gmAlways: BooleanField;
        angle: AngleField;
        baseEffect: SchemaField;
        muffledEffect: SchemaField;
        radius: NumberField;
        rotation: AngleField;
        src: StringField;
        volume: AlphaField;
        walls: BooleanField;
        x: NumberField;
        y: NumberField;
        type: StringField;
    };
    constructor(data?: Partial<VFXPositionalSoundComponentData> | undefined, { parent, schema, strict, ...options }?: any);
    #private;
}
export type _VFXPositionalSoundData = {
    /**
     * The x coordinate of the sound origin
     */
    x: number;
    /**
     * The y coordinate of the sound origin
     */
    y: number;
    /**
     * The elevation of the sound origin
     */
    elevation: number;
    /**
     * The angle of the sound cone in degrees
     */
    angle?: number | undefined;
    /**
     * The direction of sound emission in degrees
     */
    rotation?: number | undefined;
    /**
     * Whether the GM always hears the sound regardless of position (default true)
     */
    gmAlways: boolean;
    /**
     * Audio effect applied when the sound is not muffled
     */
    baseEffect?: {
        type: string;
        intensity: number;
    } | null | undefined;
    /**
     * Audio effect applied when the sound is muffled
     */
    muffledEffect?: {
        type: string;
        intensity: number;
    } | null | undefined;
    /**
     * Fade-in duration in milliseconds (default 0)
     */
    fade: number;
    /**
     * Component duration in milliseconds; defaults to the sound's natural duration
     */
    duration?: number | undefined;
    /**
     * Audio channel for playback (default "environment")
     */
    channel: string;
};
export type VFXPositionalSoundComponentData = VFXPositionalSoundData & _VFXPositionalSoundData;
import VFXComponent from "../vfx-component.mjs";
import { StringField } from "../../../../common/data/fields.mjs";
import { NumberField } from "../../../../common/data/fields.mjs";
import { BooleanField } from "../../../../common/data/fields.mjs";
import { AngleField } from "../../../../common/data/fields.mjs";
import { SchemaField } from "../../../../common/data/fields.mjs";
import { AlphaField } from "../../../../common/data/fields.mjs";
import type { VFXPositionalSoundData } from "../_types.mjs";
