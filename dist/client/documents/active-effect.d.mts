/**
 * @import {ActiveEffectChangeData, ActiveEffectChangeHandler, ActiveEffectData,
 *   ActiveEffectDuration, EffectDurationData} from "./_types.mjs";
 * @import {DocumentConstructionContext} from "../../common/abstract/_types.mjs";
 * @import Document from "../../common/abstract/document.mjs";
 * @import {DataField} from "../../common/data/fields.mjs";
 * @import {ActiveEffectChangeTypeConfig} from "../config.mjs";
 * @import {Combat, Combatant} from "./_module.mjs";
 */
/**
 * The client-side ActiveEffect document which extends the common BaseActiveEffect model.
 * Each ActiveEffect belongs to the effects collection of its parent Document.
 * Each ActiveEffect contains a ActiveEffectData object which provides its source data.
 *
 * ### Hook Events
 * - {@link hookEvents.applyActiveEffect}
 *
 * @extends BaseActiveEffect
 * @mixes ClientDocumentMixin
 * @category Documents
 *
 * @see {@link Actor}: The Actor document which contains ActiveEffect embedded documents
 * @see {@link Item}: The Item document which contains ActiveEffect embedded documents
 *
 * @property {ActiveEffectDuration} duration        Expanded effect duration data.
 */
declare class ActiveEffect extends BaseActiveEffect {
    /**
     * A cached compilation of core and registered application phases, along with their labels
     * @type {Record<string, {label: string; hint: string}>}
     */
    static get CHANGE_PHASES(): Record<string, {
        label: string;
        hint: string;
    }>;
    /** @type {Record<string, {label: string; hint: string}>} */
    static "__#89@#CHANGE_PHASES": Record<string, {
        label: string;
        hint: string;
    }>;
    /**
     * A cached compilation of core and registered change types, along with their labels and default priorities
     * @type {Record<string, ActiveEffectChangeTypeConfig>}
     */
    static get CHANGE_TYPES(): Record<string, ActiveEffectChangeTypeConfig>;
    /** @type {Record<string, ActiveEffectChangeTypeConfig>} */
    static "__#89@#CHANGE_TYPES": Record<string, ActiveEffectChangeTypeConfig>;
    /**
     * A cached compilation of core and registered expiry events
     * @type {Record<string, string>}
     */
    static get EXPIRY_EVENTS(): Record<string, string>;
    /** @type {Record<string, string>} */
    static "__#89@#EXPIRY_EVENTS": Record<string, string>;
    /**
     * A helper class that accepts registration of ActiveEffects and manages their prepared duration and expiry data.
     * @type {ActiveEffectRegistry}
     */
    static readonly registry: ActiveEffectRegistry;
    /**
     * Create an ActiveEffect instance from some status effect ID.
     * Delegates to {@link ActiveEffect._fromStatusEffect} to create the ActiveEffect instance
     * after creating the ActiveEffect data from the status effect data if `CONFIG.statusEffects`.
     * @param {string} statusId                             The status effect ID.
     * @param {DocumentConstructionContext} [options]       Additional options to pass to the ActiveEffect constructor.
     * @returns {Promise<ActiveEffect>}                     The created ActiveEffect instance.
     *
     * @throws {Error} An error if there is no status effect in `CONFIG.statusEffects` with the given status ID and if
     * the status has implicit statuses but doesn't have a static _id.
     */
    static fromStatusEffect(statusId: string, options?: DocumentConstructionContext | undefined): Promise<ActiveEffect>;
    /**
     * Create an ActiveEffect instance from status effect data.
     * Called by {@link ActiveEffect.fromStatusEffect}.
     * @param {string} statusId                          The status effect ID.
     * @param {ActiveEffectData} effectData              The status effect data.
     * @param {DocumentConstructionContext} [options]    Additional options to pass to the ActiveEffect constructor.
     * @returns {Promise<ActiveEffect>}                  The created ActiveEffect instance.
     * @protected
     */
    protected static _fromStatusEffect(statusId: string, effectData: ActiveEffectData, options?: DocumentConstructionContext | undefined): Promise<ActiveEffect>;
    /**
     * Apply this ActiveEffect to a target Document.
     * @param {Actor|Item|TokenDocument} targetDoc The Document to which this effect should be applied
     * @param {ActiveEffectChangeData} change      The change data being applied
     * @param {object} [options]                   Options affecting the change application
     * @param {object} [options.replacementData]   Data used to resolve "@" expressions in a string value
     * @param {boolean} [options.modifyTarget]     Modify the target Document with the updated value.
     * @returns {Record<string, unknown>} An object of property keys and their updated values
     */
    static applyChange(targetDoc: Actor | Item | TokenDocument, change: ActiveEffectChangeData, { replacementData, modifyTarget }?: {
        replacementData?: object | undefined;
        modifyTarget?: boolean | undefined;
    } | undefined): Record<string, unknown>;
    /**
     * Apply EffectChangeData to a field within a Document.
     * @param {Actor|Item|TokenDocument} targetDoc The model instance.
     * @param {EffectChangeData} change            The change to apply.
     * @param {object} [options]                   Additional options to configure the change application.
     * @param {DataField} [options.field]          The field: if not supplied, it will be retrieved from the supplied
     *                                             Document.
     * @param {Record<string, unknown>} [options.replacementData] Data used to resolve "@" expressions.
     * @param {boolean} [options.modifyTarget]     Modify the target Document with the updated value.
     * @returns {unknown} The updated value.
     */
    static applyChangeField(targetDoc: Actor | Item | TokenDocument, change: EffectChangeData, { field, replacementData, modifyTarget }?: {
        field?: DataField | undefined;
        replacementData?: Record<string, unknown> | undefined;
        modifyTarget?: boolean | undefined;
    } | undefined): unknown;
    /**
     * Apply this ActiveEffect to a provided Actor using a heuristic to infer the value types based on the current value
     * and/or the default value in the template.json.
     * @param {Actor|Item|TokenDocument|DataModel} targetDoc  The Document or DataModel to which this effect should be
     *                                                        applied
     * @param {ActiveEffectChangeData} change                 The change data being applied.
     * @param {Record<string, unknown>} changes               The aggregate update paths and their updated values.
     * @param {object} [options]
     * @param {Record<string, unknown>} [options.replacementData] Data used to resolve "@" expressions.
     * @param {boolean} [options.modifyTarget]                    Modify the target Document with the updated value.
     * @protected
     */
    protected static _applyChangeUnguided(targetDoc: Actor | Item | TokenDocument | DataModel, change: ActiveEffectChangeData, changes: Record<string, unknown>, { replacementData, modifyTarget }?: {
        replacementData?: Record<string, unknown> | undefined;
        modifyTarget?: boolean | undefined;
    } | undefined): void;
    /**
     * Cast raw EffectChangeData change data to the desired data type.
     * @param {unknown} raw              The raw value
     * @param {string} type              The target data type that the raw value should be cast to match
     * @param {Record<string, unknown>} [replacementData] Data used to resolve "@" expressions
     * @returns {unknown}                The parsed delta cast to the target data type
     * @throws {Error}                   An error in case of data-replacement failure
     */
    static "__#89@#castDelta"(raw: unknown, type: string, replacementData?: Record<string, unknown> | undefined): unknown;
    /**
     * Recursively replace data references in a string change value.
     * @param {string} raw
     * @param {Record<string, unknown>} data An object providing replacements
     * @returns {string|null} The string with all data references resolved
     * @throws {Error} An Error if data replacement failed
     * @protected
     */
    protected static _replaceDataRefs(raw: string, data: Record<string, unknown>): string | null;
    /**
     * Cast a raw EffectChangeData change data to an Array of an inner type.
     * @param {unknown} data             The change data
     * @param {string} type              The target data type of inner array elements
     * @param {Record<string, unknown>} [replacementData] Data used to resolve "@" expressions
     * @returns {unknown[]}              The parsed delta cast as a typed array
     */
    static "__#89@#castArray"(data: unknown, type: string, replacementData?: Record<string, unknown> | undefined): unknown[];
    /**
     * Apply an ActiveEffect that uses an "add" change type.
     * The way that effects are added depends on the data type of the current value.
     *
     * If the current value is null, the change value is assigned directly.
     * If the current type is a string, the change value is concatenated.
     * If the current type is a number, the change value is cast to numeric and added.
     * If the current type is an array, the change value is appended to the existing array if it matches in type.
     *
     * @param {Actor|Item|TokenDocument} targetDoc The Document to which this effect should be applied
     * @param {EffectChangeData} change            The change data being applied
     * @param {unknown} current                    The current value being modified
     * @param {unknown} delta                      The parsed value of the change object
     * @param {object} changes                     An object which accumulates changes to be applied
     * @protected
     */
    protected static _applyChangeAdd(targetDoc: Actor | Item | TokenDocument, change: EffectChangeData, current: unknown, delta: unknown, changes: object): void;
    /**
     * Apply an ActiveEffect that uses a "subtract" change type.
     * The way that effects are added depends on the data type of the current value.
     *
     * If the current value is null, the change value is assigned directly.
     * If the current type is a string, the change value is replaced in the current value with the empty string.
     * If the current type is a number, the change value is cast to numeric and subtracted.
     * If the current type is an array, the change value is spliced out of the array if present.
     *
     * @param {Actor|Item|TokenDocument} targetDoc The Document to which this effect should be applied
     * @param {EffectChangeData} change            The change data being applied
     * @param {unknown} current                    The current value being modified
     * @param {unknown} delta                      The parsed value of the change object
     * @param {object} changes                     An object which accumulates changes to be applied
     * @protected
     */
    protected static _applyChangeSubtract(targetDoc: Actor | Item | TokenDocument, change: EffectChangeData, current: unknown, delta: unknown, changes: object): void;
    /**
     * Apply an ActiveEffect that uses a MULTIPLY application mode.
     * Changes which MULTIPLY must be numeric to allow for multiplication.
     * @param {Actor|Item|TokenDocument} targetDoc The Document to which this effect should be applied
     * @param {EffectChangeData} change            The change data being applied
     * @param {unknown} current                    The current value being modified
     * @param {unknown} delta                      The parsed value of the change object
     * @param {object} changes                     An object which accumulates changes to be applied
     * @protected
     */
    protected static _applyChangeMultiply(targetDoc: Actor | Item | TokenDocument, change: EffectChangeData, current: unknown, delta: unknown, changes: object): void;
    /**
     * Apply an ActiveEffect that uses an OVERRIDE application mode.
     * Numeric data is overridden by numbers, while other data types are overridden by any value
     * @param {Actor|Item|TokenDocument} targetDoc The Document to which this effect should be applied
     * @param {EffectChangeData} change            The change data being applied
     * @param {unknown} current                    The current value being modified
     * @param {unknown} delta                      The parsed value of the change object
     * @param {object} changes                     An object which accumulates changes to be applied
     * @protected
     */
    protected static _applyChangeOverride(targetDoc: Actor | Item | TokenDocument, change: EffectChangeData, current: unknown, delta: unknown, changes: object): void;
    /**
     * Apply an ActiveEffect that uses an UPGRADE, or DOWNGRADE application mode.
     * Changes which UPGRADE or DOWNGRADE must be numeric to allow for comparison.
     * @param {Actor|Item|TokenDocument} targetDoc The Document to which this effect should be applied
     * @param {EffectChangeData} change            The change data being applied
     * @param {unknown} current                    The current value being modified
     * @param {unknown} delta                      The parsed value of the change object
     * @param {object} changes                     An object which accumulates changes to be applied
     * @protected
     */
    protected static _applyChangeUpgrade(targetDoc: Actor | Item | TokenDocument, change: EffectChangeData, current: unknown, delta: unknown, changes: object): void;
    /**
     * Apply an ActiveEffect that uses a CUSTOM change type.
     * @param {Actor|Item|TokenDocument} targetDoc The Document to which this effect should be applied
     * @param {EffectChangeData} change            The change data being applied
     * @param {unknown} current                    The current value being modified
     * @param {unknown} delta                      The parsed value of the change object
     * @param {object} changes                     An object which accumulates changes to be applied
     * @protected
     */
    protected static _applyChangeCustom(targetDoc: Actor | Item | TokenDocument, change: EffectChangeData, current: unknown, delta: unknown, changes: object): void;
    /**
     * Retrieve the initial duration configuration.
     * @param {Combat|null} [combat]
     * @returns {EffectStartData}
     */
    static getEffectStart(combat?: Combat | null | undefined): EffectStartData;
    /**
     * @deprecated since v14
     * @ignore
     */
    static applyField(model: any, change: any, field: any): unknown;
    /**
     * @returns {{start: EffectStartData}}
     * @deprecated since v14
     * @ignore
     */
    static getInitialDuration(): {
        start: EffectStartData;
    };
    /**
     * The Actor in which this ActiveEffect is embedded, either directly or as a grandchild Document
     * @type {Actor|null}
     */
    get actor(): Actor | null;
    /**
     * The Item in which this ActiveEffect is embedded
     * @type {Item|null}
     */
    get item(): Item | null;
    /**
     * Provide a thumbnail image path used to represent this document.
     * @type {string}
     */
    get thumbnail(): string;
    /**
     * Is there some system logic (or, absent that, an expired status) that makes this Active Effect ineligible for
     * application?
     * @type {boolean}
     */
    get isSuppressed(): boolean;
    /**
     * Retrieve the Document that this ActiveEffect targets for modification.
     * @type {Document|null}
     */
    get target(): Document<object, DocumentConstructionContext> | null;
    /**
     * Whether this Active Effect is currently applying its changes to the target
     * @type {boolean}
     */
    get active(): boolean;
    /**
     * Whether this Active Effect currently modify an Actor
     * @type {boolean}
     */
    get modifiesActor(): boolean;
    /**
     * Whether this Active Effect has a temporary duration
     * @type {boolean}
     */
    get isTemporary(): boolean;
    /**
     * Whether this Active Effect is eligible to be registered with the {@link ActiveEffectRegistry}
     */
    get isExpiryTrackable(): any;
    /**
     * The source name of the Active Effect. The source is retrieved synchronously.
     * Therefore "Unknown" (localized) is returned if the origin points to a document inside a compendium.
     * Returns "None" (localized) if it has no origin, and "Unknown" (localized) if the origin cannot be resolved.
     * @type {string}
     */
    get sourceName(): string;
    /** @inheritDoc */
    _initialize(options?: {}): void;
    /** @override */
    override prepareBaseData(): void;
    /** @override */
    override prepareDerivedData(): void;
    /**
     * Update derived Active Effect duration data.
     * @param {object} [context] Contextual information indicating what lead to this call
     * @returns {ActiveEffectDuration}
     */
    updateDuration(context?: object | undefined): ActiveEffectDuration;
    duration: ActiveEffectDuration | undefined;
    /**
     * Compute derived data related to active effect duration.
     * @param {EffectDurationData} [duration] Unprepared duration data
     * @param {object} [context]              Contextual information indicating what lead to this call
     * @returns {ActiveEffectDuration}
     * @protected
     */
    protected _prepareDuration(duration?: EffectDurationData | undefined, context?: object | undefined): ActiveEffectDuration;
    /**
     * Prepare duration data from time-based (minutes, seconds, etc.) source data.
     * @param {EffectDurationData} duration Unprepared duration data
     * @param {object} [context]            Contextual information indicating what lead to this call
     * @returns {ActiveEffectDuration}
     * @protected
     */
    protected _prepareTimeBasedDuration(duration: EffectDurationData, context?: object | undefined): ActiveEffectDuration;
    /**
     * Prepare duration data from combat-based (rounds or turns) source data.
     * @param {EffectDurationData} duration Unprepared duration data
     * @param {object} [context]            Contextual information indicating what lead to this call
     * @returns {ActiveEffectDuration}
     * @protected
     */
    protected _prepareCombatBasedDuration(duration: EffectDurationData, context?: object | undefined): ActiveEffectDuration;
    /** @inheritDoc */
    toCompendium(pack: any, options: any): any;
    /**
     * A determination of whether the ActiveEffect's expiry event was reached. This check is independent of whether the
     * duration was also reached.
     * @param {string} event     The event that triggered this check
     * @param {object} [context] Contextual information for use in the determination
     * @returns {boolean}
     */
    isExpiryEvent(event: string, context?: object | undefined): boolean;
    /** @inheritDoc */
    _onCreate(data: any, options: any, userId: any): void;
    /** @inheritDoc */
    _preUpdate(data: any, options: any, user: any): Promise<false | undefined>;
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onDelete(options: any, userId: any): void;
    /**
     * Display changes to active effects as scrolling Token status text.
     * @param {boolean} enabled     Is the active effect currently enabled?
     * @protected
     */
    protected _displayScrollingStatus(enabled: boolean): void;
    /**
     * @returns {unknown}
     * @deprecated since v14
     * @ignore
     */
    apply(actor: any, change: any): unknown;
    /**
     * @returns {unknown}
     * @deprecated since v14
     * @ignore
     */
    _applyLegacy(actor: any, change: any, changes: any): unknown;
    /**
     * @returns {unknown}
     * @deprecated since v14
     * @ignore
     */
    _applyAdd(actor: any, change: any, current: any, delta: any, changes: any): unknown;
    /**
     * @returns {unknown}
     * @deprecated since v14
     * @ignore
     */
    _applyMultiply(actor: any, change: any, current: any, delta: any, changes: any): unknown;
    /**
     * @returns {unknown}
     * @deprecated since v14
     * @ignore
     */
    _applyOverride(actor: any, change: any, current: any, delta: any, changes: any): unknown;
    /**
     * @returns {unknown}
     * @deprecated since v14
     * @ignore
     */
    _applyUpgrade(actor: any, change: any, current: any, delta: any, changes: any): unknown;
    /**
     * @returns {unknown}
     * @deprecated since v14
     * @ignore
     */
    _applyCustom(actor: any, change: any, current: any, delta: any, changes: any): unknown;
}
export default ActiveEffect;
import BaseActiveEffect from "../../common/documents/active-effect.mjs";
import Actor from "./actor.mjs";
import Item from "./item.mjs";
import type { DocumentConstructionContext } from "../../common/abstract/_types.mjs";
import type Document from "../../common/abstract/document.mjs";
import type { ActiveEffectDuration } from "./_types.mjs";
import type { EffectDurationData } from "./_types.mjs";
import type { ActiveEffectChangeTypeConfig } from "../config.mjs";
import ActiveEffectRegistry from "../helpers/active-effect-registry.mjs";
import type { ActiveEffectData } from "./_types.mjs";
import type { ActiveEffectChangeData } from "./_types.mjs";
import type { DataField } from "../../common/data/fields.mjs";
import type { Combat } from "./_module.mjs";
