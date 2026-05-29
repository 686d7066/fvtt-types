/**
 * @import {ChatMessageData} from "./_types.mjs";
 * @import {DocumentPermissionTest} from "../abstract/_types.mjs";
 */
/**
 * The ChatMessage Document.
 * Defines the DataSchema and common behaviors for a ChatMessage which are shared between both client and server.
 * @extends {Document<ChatMessageData>}
 * @mixes ChatMessageData
 * @category Documents
 */
export default class BaseChatMessage extends Document<ChatMessageData, foundry.abstract.types.DocumentConstructionContext> {
    /** @inheritdoc */
    static metadata: object;
    /** @inheritdoc */
    static defineSchema(): {
        _id: fields.DocumentIdField;
        type: fields.DocumentTypeField;
        system: fields.TypeDataField;
        style: fields.NumberField;
        author: fields.DocumentAuthorField;
        timestamp: fields.NumberField;
        flavor: fields.HTMLField;
        title: fields.StringField;
        content: fields.HTMLField;
        speaker: fields.SchemaField;
        whisper: fields.ArrayField<fields.ForeignDocumentField>;
        blind: fields.BooleanField;
        rolls: fields.ArrayField<fields.JSONField>;
        sound: fields.FilePathField;
        emote: fields.BooleanField;
        flags: fields.DocumentFlagsField;
        _stats: fields.DocumentStatsField;
    };
    static "__#67@#canCreate"(user: foundry.documents.BaseUser, document: Document, data?: object | undefined): boolean;
    /**
     * Validate that Rolls belonging to the ChatMessage document are valid
     * @param {string} rollJSON     The serialized Roll data
     */
    static "__#67@#validateRoll"(rollJSON: string): void;
    constructor(data?: Partial<ChatMessageData> | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DocumentConstructionContext | undefined);
    /** @inheritDoc */
    getUserLevel(user: any): any;
    /** @inheritDoc */
    _preUpdate(changed: any, options: any, user: any): Promise<false | undefined>;
}
import type { ChatMessageData } from "./_types.mjs";
import Document from "../abstract/document.mjs";
import * as fields from "../data/fields.mjs";
