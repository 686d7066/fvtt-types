/**
 * @import {ActiveEffectData, EffectDurationData} from "./_types.mjs";
 * @import {DocumentPermissionTest} from "../abstract/_types.mjs";
 * @import {SerializableBuiltin} from "../_types.mjs";
 */
/**
 * The ActiveEffect Document.
 * Defines the DataSchema and common behaviors for an ActiveEffect which are shared between both client and server.
 * @extends {Document<ActiveEffectData>}
 * @mixes ActiveEffectData
 * @category Documents
 */
export default class BaseActiveEffect extends Document<ActiveEffectData, foundry.abstract.types.DocumentConstructionContext> {
    /** @inheritDoc */
    static metadata: object;
    /** @inheritdoc */
    static defineSchema(): {
        _id: fields.DocumentIdField;
        name: fields.StringField;
        img: fields.FilePathField;
        type: fields.DocumentTypeField;
        system: fields.TypeDataField;
        disabled: fields.BooleanField;
        start: fields.SchemaField;
        duration: fields.SchemaField;
        description: fields.HTMLField;
        origin: fields.DocumentUUIDField;
        tint: fields.ColorField;
        transfer: fields.BooleanField;
        statuses: fields.SetField;
        showIcon: fields.NumberField;
        folder: fields.ForeignDocumentField;
        sort: fields.IntegerSortField;
        flags: fields.DocumentFlagsField;
        _stats: fields.DocumentStatsField;
    };
    /**
     * The default icon used for newly created ActiveEffect documents
     * @type {string}
     */
    static DEFAULT_ICON: string;
    /** @override */
    static override canUserCreate(user: any): any;
    static "__#64@#canCreate"(user: foundry.documents.BaseUser, document: Document, data?: object | undefined): boolean;
    static "__#64@#MODES_TO_TYPES": {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
    };
    static "__#64@#TYPES_TO_MODES": {};
    /** @inheritDoc */
    static migrateData(source: any): object;
    /**
     * Migrate a single change value
     * @param {unknown} value
     * @returns {SerializableBuiltin}
     */
    static "__#64@#migrateChangeValue"(value: unknown): SerializableBuiltin;
    /**
     * Migrate legacy duration data into its current schema-defined structure.
     * @param {object} source Possibly unmigrated source data
     */
    static "__#64@#migrateDuration"(source: object): void;
    /** @inheritDoc */
    static shimData(data: any, options: any): object;
    /**
     * Add shims to the changes array.
     * @param {EffectChangeData[]} changes
     * @internal
     */
    static _shimChanges(changes: EffectChangeData[]): void;
    /**
     * Shim several legacy duration properties for backward compatibility
     * @param {Partial<EffectDurationData>} duration
     * @param {string} oldKey The legacy property name
     * @param {() => unknown} [get] A getter function for special cases
     */
    static "__#64@#shimDurationField"(duration: Partial<EffectDurationData>, oldKey: string, get?: (() => unknown) | undefined): void;
    constructor(data?: Partial<ActiveEffectData> | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DocumentConstructionContext | undefined);
    /** @inheritDoc */
    _preCreate(data: any, options: any, user: any): Promise<false | undefined>;
}
import type { ActiveEffectData } from "./_types.mjs";
import Document from "../abstract/document.mjs";
import * as fields from "../data/fields.mjs";
import type { SerializableBuiltin } from "../_types.mjs";
import type { EffectDurationData } from "./_types.mjs";
