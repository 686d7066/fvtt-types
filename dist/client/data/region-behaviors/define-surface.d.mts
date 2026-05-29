/**
 * @import {RegionBehaviorViewedEvent, RegionBehaviorUnviewedEvent, RegionRegionBoundaryEvent,
 *   RegionBehaviorActivatedEvent, RegionBehaviorDeactivatedEvent} from "../../documents/_types.mjs";
 */
/**
 * The data model for a behavior that defines surface(s) that can restrict light, movement, sight, and sound.
 *
 * @property {"bottom"|"top"|"both"} surface  Is the surface at the bottom or top of the elevation range?
 *                                            Or are there surfaces at both the bottom and the top?
 * @property {boolean} light                  Does the surface restrict light?
 * @property {boolean} move                   Does the surface restrict movement?
 * @property {boolean} sight                  Does the surface restrict sight?
 * @property {boolean} sound                  Does the surface restrict sound?
 * @property {boolean} occlusion              Does the surface cause occlusion?
 * @property {boolean} exposure               Does the surface cause exposure?
 * @property {boolean} culling                Does the surface cause culling?
 */
export default class DefineSurfaceRegionBehaviorType extends RegionBehaviorType {
    /** @override */
    static override LOCALIZATION_PREFIXES: string[];
    /** @override */
    static override defineSchema(): {
        placement: fields.StringField;
        light: fields.BooleanField;
        move: fields.BooleanField;
        sight: fields.BooleanField;
        sound: fields.BooleanField;
        occlusion: fields.BooleanField;
        exposure: fields.BooleanField;
        culling: fields.BooleanField;
    };
    /**
     * Called when the behavior is activated.
     * @param {RegionBehaviorActivatedEvent} event
     * @this {DefineSurfaceRegionBehaviorType}
     */
    static "__#254@#onBehaviorActivated"(this: DefineSurfaceRegionBehaviorType, event: RegionBehaviorActivatedEvent): Promise<void>;
    /**
     * Called when the behavior is deactivated.
     * @param {RegionBehaviorDeactivatedEvent} event
     * @this {DefineSurfaceRegionBehaviorType}
     */
    static "__#254@#onBehaviorDeactivated"(this: DefineSurfaceRegionBehaviorType, event: RegionBehaviorDeactivatedEvent): Promise<void>;
    /**
     * Called when the behavior is viewed.
     * @param {RegionBehaviorViewedEvent} event
     * @this {DefineSurfaceRegionBehaviorType}
     */
    static "__#254@#onBehaviorViewed"(this: DefineSurfaceRegionBehaviorType, event: RegionBehaviorViewedEvent): Promise<void>;
    /**
     * Called when the behavior is unviewed.
     * @param {RegionBehaviorUnviewedEvent} event
     * @this {DefineSurfaceRegionBehaviorType}
     */
    static "__#254@#onBehaviorUnviewed"(this: DefineSurfaceRegionBehaviorType, event: RegionBehaviorUnviewedEvent): Promise<void>;
    /**
     * Called when the boundary of an event has changed.
     * @param {RegionRegionBoundryEvent} event
     * @this {DefineSurfaceRegionBehaviorType}
     */
    static "__#254@#onRegionBoundary"(this: DefineSurfaceRegionBehaviorType, event: RegionRegionBoundryEvent): Promise<void>;
    /** @override */
    static override events: {
        behaviorActivated: Function;
        behaviorDeactivated: Function;
        behaviorViewed: Function;
        behaviorUnviewed: Function;
        regionBoundary: Function;
    };
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
    /**
     * Restricts darkness? Darkness is restricted if and only if light is restricted.
     * @type {boolean}
     */
    get darkness(): boolean;
    #private;
}
import RegionBehaviorType from "./base.mjs";
import * as fields from "../../../common/data/fields.mjs";
import type { RegionBehaviorActivatedEvent } from "../../documents/_types.mjs";
import type { RegionBehaviorDeactivatedEvent } from "../../documents/_types.mjs";
import type { RegionBehaviorViewedEvent } from "../../documents/_types.mjs";
import type { RegionBehaviorUnviewedEvent } from "../../documents/_types.mjs";
