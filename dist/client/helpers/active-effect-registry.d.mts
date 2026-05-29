/**
 * @import {ActiveEffect, Actor, Combat, Combatant, Item} from "../documents/_module.mjs";
 */
/**
 * A singleton helper class that tracks the duration and expiry of {@link ActiveEffect}s
 * @extends IterableWeakSet<ActiveEffect>
 */
export default class ActiveEffectRegistry extends IterableWeakSet<ActiveEffect> {
    constructor(entries?: Iterable<ActiveEffect, void, unknown> | undefined);
    /**
     * Has the registry been populated for the first time?
     * @type {boolean}
     */
    get initialized(): boolean;
    /**
     * Populate the registry for the first time.
     * @internal
     */
    _initialize(): void;
    /**
     * Register a single ActiveEffect document. If the document is already registered but no longer eligible for
     * registration, it will be deleted.
     * @param {ActiveEffect} effect
     * @override
     */
    override add(effect: ActiveEffect): this;
    /**
     * Register the ActiveEffects embedded on an Actor or Item.
     * @param {Actor|Item} document
     * @returns {this}
     */
    addFromParent(document: Actor | Item): this;
    /**
     * Unregister the ActiveEffects embedded on an Actor or Item.
     * @param {Actor|Item} document
     * @returns {boolean} Did any deletions occur?
     */
    deleteFromParent(document: Actor | Item): boolean;
    /**
     * Refresh the durations of registered ActiveEffects and perform the configured action for expired effects.
     * @param {string} event                The expiry or other event that triggered this call
     * @param {object} [context]            Additional contextual data relevant to the event
     * @param {Combat} [context.combat]     The Combat associated with this event
     * @param {Set<Actor>} [context.actors] Limit the refresh to effects belonging to the provided list of actors.
     * @see {@link CONFIG.ActiveEffect.expiryAction}
     */
    refresh(event: string, context?: {
        combat?: Combat | undefined;
        actors?: Set<Actor> | undefined;
    } | undefined): Promise<void>;
    #private;
}
import type { ActiveEffect } from "../documents/_module.mjs";
import { IterableWeakSet } from "../../common/utils/_module.mjs";
import type { Actor } from "../documents/_module.mjs";
import type { Item } from "../documents/_module.mjs";
import type { Combat } from "../documents/_module.mjs";
