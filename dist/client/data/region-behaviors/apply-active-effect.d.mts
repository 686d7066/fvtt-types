/**
 * @import {ActiveEffectData, RegionTokenEnterEvent, RegionTokenExitEvent} from "../../documents/_types.mjs";
 * @import {ActiveEffect, Actor} from "../../documents/_module.mjs";
 */
/**
 * The data model for a behavior that applies Active Effects to Tokens within the Region.
 *
 * This is a behavior that applies the configured Active Effects to the Token's Actor when the Token enters the region.
 * Once the Token exists the Region, these Active Effects are removed from the Token's Actor.
 *
 * For example, this behavior could apply a Slowed effect in a blizzard region, or grant extra cover and concealment
 * in areas of tall grass.
 *
 * @property {Set<ActiveEffect>} effects    The Active Effects that are applied to Token within the Region.
 */
export default class ApplyActiveEffectRegionBehaviorType extends RegionBehaviorType {
    /** @override */
    static override LOCALIZATION_PREFIXES: string[];
    /** @override */
    static override defineSchema(): {
        effects: fields.SetField;
    };
    /**
     * Apply the Active Effects when the Token enters the Region.
     * @param {RegionTokenEnterEvent} event
     * @this {ApplyActiveEffectRegionBehaviorType}
     */
    static "__#252@#onTokenEnter"(this: ApplyActiveEffectRegionBehaviorType, event: RegionTokenEnterEvent): Promise<void>;
    /**
     * Un-apply the Active Effects when the Token exists the Region.
     * @param {RegionTokenExitEvent} event
     * @this {ApplyActiveEffectRegionBehaviorType}
     */
    static "__#252@#onTokenExit"(this: ApplyActiveEffectRegionBehaviorType, event: RegionTokenExitEvent): Promise<void>;
    /** @override */
    static override events: {
        tokenEnter: Function;
        tokenExit: Function;
    };
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
    #private;
}
import RegionBehaviorType from "./base.mjs";
import * as fields from "../../../common/data/fields.mjs";
import type { RegionTokenEnterEvent } from "../../documents/_types.mjs";
import type { RegionTokenExitEvent } from "../../documents/_types.mjs";
