/**
 * @import BaseLevel from "./level.mjs";
 */
/**
 * The Scene Document.
 * Defines the DataSchema and common behaviors for a Scene which are shared between both client and server.
 * @extends {Document<SceneData>}
 * @mixes SceneData
 * @category Documents
 */
export default class BaseScene extends Document<SceneData, foundry.abstract.types.DocumentConstructionContext> {
    /** @inheritdoc */
    static metadata: object;
    /** @inheritDoc */
    static defineSchema(): {
        _id: fields.DocumentIdField;
        name: fields.StringField;
        active: fields.BooleanField;
        navigation: fields.BooleanField;
        navOrder: fields.NumberField;
        navName: fields.StringField;
        thumb: fields.FilePathField;
        width: fields.NumberField;
        height: fields.NumberField;
        padding: fields.NumberField;
        shiftX: fields.NumberField;
        shiftY: fields.NumberField;
        initial: fields.SchemaField;
        initialLevel: fields.DocumentIdField;
        grid: fields.SchemaField;
        tokenVision: fields.BooleanField;
        fog: fields.SchemaField;
        environment: fields.SchemaField;
        transition: fields.SchemaField;
        drawings: fields.EmbeddedCollectionField;
        tokens: fields.EmbeddedCollectionField;
        levels: fields.EmbeddedCollectionField;
        lights: fields.EmbeddedCollectionField;
        notes: fields.EmbeddedCollectionField;
        sounds: fields.EmbeddedCollectionField;
        regions: fields.EmbeddedCollectionField;
        tiles: fields.EmbeddedCollectionField;
        walls: fields.EmbeddedCollectionField;
        playlist: fields.ForeignDocumentField;
        playlistSound: fields.ForeignDocumentField;
        journal: fields.ForeignDocumentField;
        journalEntryPage: fields.ForeignDocumentField;
        weather: fields.StringField;
        folder: fields.ForeignDocumentField;
        sort: fields.IntegerSortField;
        ownership: fields.DocumentOwnershipField;
        flags: fields.DocumentFlagsField;
        _stats: fields.DocumentStatsField;
    };
    /**
     * A mapping of top-level scene properties to their corresponding properties on the child level.
     * @type {Readonly<string[][]>}
     * @internal
     */
    static _LEVELS_PROPERTY_MAP: Readonly<string[][]>;
    /**
     * The default grid defined by the system.
     * @type {BaseGrid}
     */
    static get defaultGrid(): BaseGrid;
    static "__#40@#defaultGrid": any;
    /**
     * The gridless version of the default grid defined by the system.
     * @type {GridlessGrid}
     */
    static get defaultGridlessGrid(): GridlessGrid;
    static "__#40@#defaultGridlessGrid": any;
    /**
     * Initialize both the grid instance and its gridless version.
     */
    static "__#40@#initializeDefaultGrids"(): void;
    /** @inheritdoc */
    static migrateData(source: any): object;
    /** @inheritdoc */
    static shimData(source: any, options: any): object;
    /**
     * Put an alias for deprecated fog.exploration
     * @param {BaseScene} scene
     * @deprecated since v14
     */
    static "__#40@#shimFogExploration"(scene: BaseScene): void;
    constructor(data?: any, { parent, schema, strict, ...options }?: foundry.abstract.types.DocumentConstructionContext | undefined);
    /**
     * The initial Level of the Scene. By default the first Level.
     * @type {BaseLevel}
     */
    get initialLevel(): BaseLevel;
    /**
     * A convenience getter for the Scene's first created Level. This should not be relied on in multi-level scenes to
     * mean the first level by sort order.
     * @type {BaseLevel}
     */
    get firstLevel(): BaseLevel;
    /** @inheritDoc */
    _initialize(options: any): void;
    /** @inheritDoc */
    updateSource(changes?: {}, options?: {}): object;
}
import Document from "../abstract/document.mjs";
import type BaseLevel from "./level.mjs";
import * as fields from "../data/fields.mjs";
import GridlessGrid from "../grid/gridless.mjs";
