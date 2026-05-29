/**
 * @import {LevelData} from "./_types.mjs";
 */
/**
 * The Level Document.
 * Defines the DataSchema and common behaviors for a Level which are shared between both client and server.
 * @extends {Document<LevelData>}
 * @category Documents
 *
 * @example Create Scene Levels
 * ```js
 * await canvas.scene.createEmbeddedDocuments("Level", [
 *   {
 *     name: "Basement",
 *     elevation: {bottom: -10, top: 0},
 *     background: {
 *       src: "worlds/scene-levels-test/assets/cabin/BasementBackground.webp"
 *     },
 *     foreground: {
 *       src: "worlds/scene-levels-test/assets/cabin/BasementForeground.webp"
 *     }
 *   },
 *   {
 *     name: "Downstairs",
 *     elevation: {bottom: 0, top: 10},
 *     background: {
 *       src: "worlds/scene-levels-test/assets/cabin/DownstairsBackground.webp"
 *     },
 *     foreground: {
 *       src: "worlds/scene-levels-test/assets/cabin/DownstairsForeground.webp"
 *     }
 *   },
 *   {
 *     name: "Upstairs",
 *     elevation: {bottom: 10, top: 20},
 *     background: {
 *       src: "worlds/scene-levels-test/assets/cabin/UpstairsBackground.webp"
 *     },
 *     foreground: {
 *       src: "worlds/scene-levels-test/assets/cabin/UpstairsForeground.webp"
 *     }
 *   }
 * ]);
 * ```
 */
export default class BaseLevel extends Document<LevelData, foundry.abstract.types.DocumentConstructionContext> {
    /** @inheritdoc */
    static metadata: object;
    /** @inheritDoc */
    static defineSchema(): {
        _id: fields.DocumentIdField;
        name: fields.StringField;
        elevation: fields.SchemaField;
        background: fields.SchemaField;
        foreground: fields.SchemaField;
        fog: fields.SchemaField;
        textures: fields.SchemaField;
        visibility: fields.SchemaField;
        sort: fields.IntegerSortField;
        flags: fields.DocumentFlagsField;
    };
    constructor(data?: Partial<LevelData> | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DocumentConstructionContext | undefined);
}
import type { LevelData } from "./_types.mjs";
import Document from "../abstract/document.mjs";
import * as fields from "../data/fields.mjs";
