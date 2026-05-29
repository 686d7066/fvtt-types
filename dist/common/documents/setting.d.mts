/**
 * @import {SettingData} from "./_types.mjs";
 * @import {DocumentPermissionTest} from "../abstract/_types.mjs";
 */
/**
 * The Setting Document.
 * Defines the DataSchema and common behaviors for a Setting which are shared between both client and server.
 * @extends {Document<SettingData>}
 * @mixes SettingData
 * @category Documents
 */
export default class BaseSetting extends Document<SettingData, foundry.abstract.types.DocumentConstructionContext> {
    /** @inheritdoc */
    static metadata: object;
    /** @inheritdoc */
    static defineSchema(): {
        _id: fields.DocumentIdField;
        key: fields.StringField;
        value: fields.JSONField;
        user: fields.ForeignDocumentField;
        _stats: fields.DocumentStatsField;
    };
    /**
     * The settings that only full GMs can modify.
     * @type {string[]}
     * @internal
     */
    static _GAMEMASTER_ONLY_KEYS: string[];
    /**
     * The settings that assistant GMs can modify regardless of their permission.
     * @type {string[]}
     * @internal
     */
    static _ALLOWED_ASSISTANT_KEYS: string[];
    /** @override */
    static override canUserCreate(user: any): any;
    static "__#76@#canModify"(user: BaseUser, document: Document, data?: object | undefined): boolean;
    constructor(data?: Partial<SettingData> | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DocumentConstructionContext | undefined);
}
import type { SettingData } from "./_types.mjs";
import Document from "../abstract/document.mjs";
import * as fields from "../data/fields.mjs";
import BaseUser from "./user.mjs";
