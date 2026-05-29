/**
 * @import {TimerOptions, TimelineOptions, DefaultsParams, Timeline} from "animejs"
 * @import {DataModelConstructionContext} from "../../../common/abstract/_types.mjs";
 * @import VFXComponent from "./vfx-component.mjs";
 */
/**
 * @typedef VFXEffectData
 * @property {string} name
 * @property {Record<string, object>} components
 * @property {VFXTimelineSequenceEntry[]} timeline
 */
/**
 * @typedef VFXTimelineSequenceEntry
 * @property {string} component             The labeled component in sequence.
 * @property {number|string} [position]     The animejs offset position. Can be a number for absolute timeline values,
 *                                          a label (including optional prefixing to reference other effects),
 *                                          or a relative value (e.g. "+1000" for 1s after the previous effect).
 *                                          It can also be a combination of label and offset (e.g.
 *                                          "effect.impact-=1000" for 1s before the `effect.impact` label)
 */
/**
 * A specialized DataModel subclass used to configure VFXEffects in a way that can be serialized for storage in
 * database or transmission over socket. VFXEffect instances involve animation components which are animated over a
 * configured timeline.
 * Playback for a VFXEffect can only happen once. The intended paradigm to repeat an effect multiple times requires
 * cloning it before each successive playback.
 *
 * @extends {DataModel<VFXEffectData, DataModelConstructionContext>}
 * @mixes VFXEffectData
 */
export default class VFXEffect extends DataModel<VFXEffectData, DataModelConstructionContext> {
    /** @override */
    static override defineSchema(): {
        name: StringField;
        components: TypedObjectField;
        timeline: ArrayField<SchemaField>;
    };
    constructor(data?: Partial<VFXEffectData> | undefined, { parent, schema, strict, ...options }?: DataModelConstructionContext | undefined);
    /**
     * Is this VFXEffect currently playing?
     * @type {boolean}
     */
    get playing(): boolean;
    /**
     * VFXComponents that are included in this animation
     * @type {Record<string, VFXComponent>}
     */
    components: Record<string, VFXComponent<any>>;
    /**
     * Has playback of this effect started?
     * @type {boolean}
     */
    get started(): boolean;
    /**
     * Load necessary materials for all animation components.
     * @returns {Promise<void>}
     */
    load(): Promise<void>;
    /**
     * Perform initial drawing of every animation component.
     * @returns {Promise<void>}
     */
    draw(): Promise<void>;
    /**
     * Add managed display objects for each component to the primary canvas container.
     */
    attach(): void;
    /** @override */
    override clone(data?: {}, context?: {}): any;
    /**
     * Begin playback of a VFXEffect using provided reference data.
     * @param {Record<string, any>} [references]    A record of references used to resolve model data
     * @returns {Promise<boolean>}                  A Promise which resolves to signal whether playback fully completed
     * @throws {Error}                              An error if playback from this VFXEffect has already started or if
     *                                              playback failed for some reason.
     */
    play(references?: Record<string, any> | undefined): Promise<boolean>;
    /**
     * Stop animation, but treat the animation as successfully completed.
     * @returns {Promise<void>}
     */
    stop(): Promise<void>;
    /**
     * Cancel animation and treat the animation as unsuccessful.
     * @returns {Promise<void>}
     */
    cancel(): Promise<void>;
    /**
     * Resolve all reference fields within this model against provided reference data.
     * This is idempotent: fields that have already been resolved to concrete values are skipped on subsequent calls.
     * This is invoked automatically as part of {@link VFXEffect#play}, after which point all references must be final.
     * It can be called manually before {@link VFXEffect#play} to assume direct control over reference resolution before
     * effect playback begins.
     * @param {Record<string, any>} [references]  A record of references used to resolve model data
     * @throws {DataModelValidationError|Error}   An error if references were unable to resolve
     */
    resolveReferences(references?: Record<string, any> | undefined): void;
    #private;
}
export type VFXEffectData = {
    name: string;
    components: Record<string, object>;
    timeline: VFXTimelineSequenceEntry[];
};
export type VFXTimelineSequenceEntry = {
    /**
     * The labeled component in sequence.
     */
    component: string;
    /**
     * The animejs offset position. Can be a number for absolute timeline values,
     *      a label (including optional prefixing to reference other effects),
     *      or a relative value (e.g. "+1000" for 1s after the previous effect).
     *      It can also be a combination of label and offset (e.g.
     *      "effect.impact-=1000" for 1s before the `effect.impact` label)
     */
    position?: string | number | undefined;
};
import type { DataModelConstructionContext } from "../../../common/abstract/_types.mjs";
import DataModel from "../../../common/abstract/data.mjs";
import type VFXComponent from "./vfx-component.mjs";
import { StringField } from "../../../common/data/fields.mjs";
import { TypedObjectField } from "../../../common/data/fields.mjs";
import { SchemaField } from "../../../common/data/fields.mjs";
import { ArrayField } from "../../../common/data/fields.mjs";
