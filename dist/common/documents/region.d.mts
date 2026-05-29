/**
 * @import {RegionData, UserData} from "./_types.mjs";
 * @import {DocumentPermissionTest} from "../abstract/_types.mjs";
 * @import BaseGrid from "../grid/base.mjs";
 */
/**
 * The Region Document.
 * Defines the DataSchema and common behaviors for a Region which are shared between both client and server.
 * @extends {Document<RegionData>}
 * @mixes RegionData
 * @category Documents
 */
export default class BaseRegion extends Document<RegionData, foundry.abstract.types.DocumentConstructionContext> {
    /** @inheritdoc */
    static metadata: object;
    /** @inheritdoc */
    static defineSchema(): {
        _id: fields.DocumentIdField;
        name: fields.StringField;
        color: fields.ColorField;
        shapes: fields.ShapesField;
        elevation: fields.SchemaField;
        levels: fields.SceneLevelsSetField;
        restriction: fields.SchemaField;
        attachment: fields.SchemaField;
        behaviors: fields.EmbeddedCollectionField;
        visibility: fields.NumberField;
        highlightMode: fields.StringField;
        displayMeasurements: fields.BooleanField;
        hidden: fields.BooleanField;
        locked: fields.BooleanField;
        ownership: fields.DocumentOwnershipField;
        flags: fields.DocumentFlagsField;
        /** @internal */
        _shapeConstraints: fields.ArrayField<fields.ArrayField<fields.NumberField>>;
    };
    /** @override */
    static override canUserCreate(user: any): any;
    static "__#74@#canCreate"(user: foundry.documents.BaseUser, document: Document, data?: object | undefined): boolean;
    static "__#74@#canUpdate"(user: foundry.documents.BaseUser, document: Document, data?: object | undefined): boolean;
    /**
     * Migrate MeasuredTemplate data to Region data.
     * @param {object} template                             The MeasuredTemplate data
     * @param {object} [context]                            The migration context
     * @param {BaseGrid} [context.grid]                     The grid
     * @param {boolean} [context.gridTemplates]             Grid-shaped?
     * @param {"round"|"flat"} [context.coneTemplateType]   The cone curvature
     * @param {UserData[]} [context.users]                  The users
     * @returns {RegionData}                                The Region data
     * @internal
     */
    static _migrateMeasuredTemplateData(template: object, { grid, gridTemplates, coneTemplateType, users }?: {
        grid?: BaseGrid<foundry.grid.types.GridCoordinates2D, foundry.grid.types.GridCoordinates3D> | undefined;
        gridTemplates?: boolean | undefined;
        coneTemplateType?: "flat" | "round" | undefined;
        users?: UserData[] | undefined;
    } | undefined): RegionData;
    constructor(data?: Partial<RegionData> | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DocumentConstructionContext | undefined);
    /** @override */
    override getUserLevel(user: any): any;
    /** @override */
    override _preUpdate(changes: any, options: any, user: any): Promise<void>;
}
import type { RegionData } from "./_types.mjs";
import Document from "../abstract/document.mjs";
import * as fields from "../data/fields.mjs";
import type BaseGrid from "../grid/base.mjs";
import type { UserData } from "./_types.mjs";
