/**
 * @import {RegionBehaviorViewedEvent, RegionBehaviorUnviewedEvent,
 *   RegionRegionBoundaryEvent, RegionRegionAnimationEvent} from "../../documents/_types.mjs";
 */
/**
 * The data model for a behavior that allows to adjust the darkness level within the Region.
 */
export default class AdjustDarknessLevelRegionBehaviorType extends RegionBehaviorType {
    /** @override */
    static override LOCALIZATION_PREFIXES: string[];
    /**
     * Darkness level behavior modes.
     * @enum {number}
     */
    static get MODES(): Readonly<{
        /**
         * Override the darkness level with the modifier.
         */
        readonly OVERRIDE: 0;
        /**
         * Brighten the darkness level: `darknessLevel * (1 - modifier)`
         */
        readonly BRIGHTEN: 1;
        /**
         * Darken the darkness level: `1 - (1 - darknessLevel) * (1 - modifier)`.
         */
        readonly DARKEN: 2;
    }>;
    static "__#184@#MODES": Readonly<{
        /**
         * Override the darkness level with the modifier.
         */
        readonly OVERRIDE: 0;
        /**
         * Brighten the darkness level: `darknessLevel * (1 - modifier)`
         */
        readonly BRIGHTEN: 1;
        /**
         * Darken the darkness level: `1 - (1 - darknessLevel) * (1 - modifier)`.
         */
        readonly DARKEN: 2;
    }>;
    /** @override */
    static override defineSchema(): {
        mode: fields.NumberField;
        modifier: fields.AlphaField;
    };
    /**
     * Called when the darkness behavior is viewed.
     * @param {RegionBehaviorViewedEvent} event
     * @this {AdjustDarknessLevelRegionBehaviorType}
     */
    static "__#184@#onBehaviorViewed"(this: AdjustDarknessLevelRegionBehaviorType, event: RegionBehaviorViewedEvent): Promise<void>;
    /**
     * Called when the darkness behavior is unviewed.
     * @param {RegionBehaviorUnviewedEvent} event
     * @this {AdjustDarknessLevelRegionBehaviorType}
     */
    static "__#184@#onBehaviorUnviewed"(this: AdjustDarknessLevelRegionBehaviorType, event: RegionBehaviorUnviewedEvent): Promise<void>;
    /**
     * Called when the boundary has changed or the region was animated.
     * @param {RegionRegionBoundaryEvent|RegionRegionAnimationEvent} event
     * @this {AdjustDarknessLevelRegionBehaviorType}
     */
    static "__#184@#onRegionBoundaryOrAnimation"(this: AdjustDarknessLevelRegionBehaviorType, event: RegionRegionBoundaryEvent | RegionRegionAnimationEvent): Promise<void>;
    /** @override */
    static override events: {
        behaviorViewed: Function;
        behaviorUnviewed: Function;
        regionBoundary: Function;
        regionAnimation: Function;
    };
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
}
import RegionBehaviorType from "./base.mjs";
import * as fields from "../../../common/data/fields.mjs";
import type { RegionBehaviorViewedEvent } from "../../documents/_types.mjs";
import type { RegionBehaviorUnviewedEvent } from "../../documents/_types.mjs";
import type { RegionRegionBoundaryEvent } from "../../documents/_types.mjs";
import type { RegionRegionAnimationEvent } from "../../documents/_types.mjs";
