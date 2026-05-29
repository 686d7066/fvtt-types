/**
 * @import {TileData} from "./_types.mjs";
 */
/**
 * The Tile Document.
 * Defines the DataSchema and common behaviors for a Tile which are shared between both client and server.
 * @extends {Document<TileData>}
 * @mixes TileData
 * @category Documents
 */
export default class BaseTile extends Document<TileData, foundry.abstract.types.DocumentConstructionContext> {
    /** @inheritdoc */
    static metadata: object;
    /** @inheritdoc */
    static defineSchema(): {
        _id: fields.DocumentIdField;
        name: fields.StringField;
        texture: TextureData;
        width: fields.NumberField;
        height: fields.NumberField;
        x: fields.NumberField;
        y: fields.NumberField;
        elevation: fields.NumberField;
        levels: fields.SceneLevelsSetField;
        sort: fields.NumberField;
        rotation: fields.AngleField;
        alpha: fields.AlphaField;
        hidden: fields.BooleanField;
        locked: fields.BooleanField;
        restrictions: fields.SchemaField;
        occlusion: fields.SchemaField;
        video: fields.SchemaField;
        flags: fields.DocumentFlagsField;
    };
    /** @inheritDoc */
    static migrateData(data: any): object;
    /** @inheritDoc */
    static shimData(data: any, options: any): object;
    constructor(data?: Partial<TileData> | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DocumentConstructionContext | undefined);
    /** @override */
    override getUserLevel(user: any): any;
}
import type { TileData } from "./_types.mjs";
import Document from "../abstract/document.mjs";
import * as fields from "../data/fields.mjs";
import { TextureData } from "../data/data.mjs";
