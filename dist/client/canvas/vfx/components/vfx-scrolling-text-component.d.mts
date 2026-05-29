/**
 * @typedef VFXScrollingTextData
 * @property {{x: number, y: number}} origin   The canvas point where the text originates
 * @property {string} content                  The text string to display
 * @property {number} duration                 The duration of the scrolling effect in milliseconds (default 2000)
 * @property {number} [distance]               The distance in pixels the text travels; defaults to twice the text size
 * @property {number} textAnchor               An anchor point in CONST.TEXT_ANCHOR_POINTS (default CENTER)
 * @property {number} scrollDirection          The direction the text scrolls in CONST.TEXT_ANCHOR_POINTS (default TOP)
 * @property {number} jitter                   Randomization between [0, 1] applied to the initial position (default 0)
 * @property {object} textStyle                Additional PIXI.TextStyle parameters applied to the text
 */
/**
 * A component for displaying scrolling text effects at a canvas location using the
 * `CanvasInterfaceGroup#createScrollingText` API.
 * This can be used for damage numbers, status effects, or other floating text animations.
 *
 * @example Damage number above a token
 * ```js
 * const vfxConfig = {
 *   name: "damageNumber",
 *   components: {
 *     text: {
 *       type: "scrollingText",
 *       origin: {reference: "target"},
 *       content: "-12",
 *       duration: 1500,
 *       scrollDirection: CONST.TEXT_ANCHOR_POINTS.TOP,
 *       textStyle: {fill: "#ff4444", fontSize: 28, fontWeight: "bold"}
 *     }
 *   },
 *   timeline: [{component: "text"}]
 * };
 * const effect = new foundry.canvas.vfx.VFXEffect(vfxConfig);
 * const target = game.user.targets.first();
 * effect.play({target: target.center});
 * ```
 * @extends {VFXComponent<VFXScrollingTextData>}
 */
export default class VFXScrollingTextComponent extends VFXComponent<VFXScrollingTextData> {
    /** @inheritDoc */
    static defineSchema(): {
        content: VFXReferenceField;
        distance: VFXReferenceField;
        duration: VFXReferenceField;
        jitter: VFXReferenceField;
        origin: VFXReferencePointField;
        scrollDirection: VFXReferenceField;
        textAnchor: VFXReferenceField;
        textStyle: VFXReferenceField;
        type: StringField;
    };
    constructor(data?: Partial<VFXScrollingTextData> | undefined, { parent, schema, strict, ...options }?: any);
}
export type VFXScrollingTextData = {
    /**
     * The canvas point where the text originates
     */
    origin: {
        x: number;
        y: number;
    };
    /**
     * The text string to display
     */
    content: string;
    /**
     * The duration of the scrolling effect in milliseconds (default 2000)
     */
    duration: number;
    /**
     * The distance in pixels the text travels; defaults to twice the text size
     */
    distance?: number | undefined;
    /**
     * An anchor point in CONST.TEXT_ANCHOR_POINTS (default CENTER)
     */
    textAnchor: number;
    /**
     * The direction the text scrolls in CONST.TEXT_ANCHOR_POINTS (default TOP)
     */
    scrollDirection: number;
    /**
     * Randomization between [0, 1] applied to the initial position (default 0)
     */
    jitter: number;
    /**
     * Additional PIXI.TextStyle parameters applied to the text
     */
    textStyle: object;
};
import VFXComponent from "../vfx-component.mjs";
import { VFXReferenceField } from "../fields/_module.mjs";
import { VFXReferencePointField } from "../fields/_module.mjs";
import { StringField } from "../../../../common/data/fields.mjs";
