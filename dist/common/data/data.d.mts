export { default as ActiveEffectTypeDataModel } from "./active-effect.mjs";
/**
 * @import EmbeddedCollectionDelta from "../abstract/embedded-collection-delta.mjs";
 * @import BaseActor from "../documents/actor.mjs";
 * @import {Point} from "../_types.mjs";
 * @import {GridOffset2D} from "../grid/_types.mjs";
 * @import {PrototypeTokenData} from "../documents/_types.mjs";
 * @import {TokenShapeType} from "../constants.mjs";
 * @import {TextureDataFitMode} from "../constants.mjs";
 * @import {DataFieldOptions, FilePathFieldOptions, LightAnimationData} from "./_types.mjs";
 */
/**
 * A reusable document structure for the internal data used to render the appearance of a light source.
 * This is re-used by both the AmbientLightData and TokenData classes.
 *
 * @property {boolean} negative           Is this light source a negative source? (i.e. darkness source)
 * @property {number} priority            The priority of this source
 * @property {number} alpha               An opacity for the emitted light, if any
 * @property {number} angle               The angle of emission for this point source
 * @property {number} bright              The allowed radius of bright vision or illumination
 * @property {number} color               A tint color for the emitted light, if any
 * @property {number} coloration          The coloration technique applied in the shader
 * @property {number} contrast            The amount of contrast this light applies to the background texture
 * @property {number} dim                 The allowed radius of dim vision or illumination
 * @property {number} attenuation         Fade the difference between bright, dim, and dark gradually?
 * @property {number} luminosity          The luminosity applied in the shader
 * @property {number} saturation          The amount of color saturation this light applies to the background texture
 * @property {number} shadows             The depth of shadows this light applies to the background texture
 * @property {LightAnimationData} animation  An animation configuration for the source
 * @property {{min: number, max: number}} darkness  A darkness range (min and max) for which the source should be active
 */
export class LightData extends DataModel<object, foundry.abstract.types.DataModelConstructionContext> {
    static defineSchema(): {
        negative: fields.BooleanField;
        priority: fields.NumberField;
        alpha: fields.AlphaField;
        angle: fields.AngleField;
        bright: fields.NumberField;
        color: fields.ColorField;
        coloration: fields.NumberField;
        dim: fields.NumberField;
        attenuation: fields.AlphaField;
        luminosity: fields.NumberField;
        saturation: fields.NumberField;
        contrast: fields.NumberField;
        shadows: fields.NumberField;
        animation: fields.SchemaField;
        darkness: fields.SchemaField;
    };
    constructor(data?: object | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DataModelConstructionContext | undefined);
}
/**
 * Extend the base TokenData to define a PrototypeToken which exists within a parent Actor.
 * @extends DataModel<PrototypeTokenData>
 * @property {boolean} randomImg      Does the prototype token use a random wildcard image?
 */
export class PrototypeToken extends DataModel<PrototypeTokenData, foundry.abstract.types.DataModelConstructionContext> {
    /** @override */
    static override defineSchema(): {
        texture: TextureData;
        sort: fields.NumberField;
        locked: fields.BooleanField;
        lockRotation: fields.BooleanField;
        rotation: fields.AngleField;
        alpha: fields.AlphaField;
        hidden: fields.BooleanField;
        disposition: fields.NumberField;
        displayBars: fields.NumberField;
        bar1: fields.SchemaField;
        bar2: fields.SchemaField;
        light: fields.EmbeddedDataField;
        sight: fields.SchemaField;
        detectionModes: fields.TypedObjectField;
        occludable: fields.SchemaField;
        ring: fields.SchemaField;
        turnMarker: fields.SchemaField;
        movementAction: fields.StringField;
        _movementHistory: fields.ArrayField<fields.SchemaField>;
        _regions: fields.ArrayField<fields.ForeignDocumentField>;
        flags: fields.DocumentFlagsField;
        _id: fields.DocumentIdField;
        name: fields.StringField;
        displayName: fields.NumberField;
        actorId: fields.ForeignDocumentField;
        actorLink: fields.BooleanField;
        delta: foundry.data.ActorDeltaField;
    };
    /** @ignore */
    static get database(): foundry.data.ClientDatabaseBackend;
    constructor(data?: {}, options?: {});
    /**
     * The Actor which owns this Prototype Token
     * @type {BaseActor}
     */
    get actor(): BaseActor;
    /** @inheritDoc */
    _initializeSource(data: any, options?: {}): object;
    /**
     * @see {@link foundry.abstract.Document#update}
     * @ignore
     */
    update(data: any, options: any): Promise<foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext> | undefined>;
    /**
     * @see {@link foundry.abstract.Document#getFlag}
     * @ignore
     */
    getFlag(...args: any[]): any;
    /**
     * @see {@link foundry.abstract.Document#getFlag}
     * @ignore
     */
    setFlag(...args: any[]): Promise<foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext>>;
    /**
     * @see {@link foundry.abstract.Document#unsetFlag}
     * @ignore
     */
    unsetFlag(...args: any[]): Promise<foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext>>;
    /**
     * @see {@link foundry.abstract.Document#testUserPermission}
     * @ignore
     */
    testUserPermission(user: any, permission: any, { exact }?: {
        exact?: boolean | undefined;
    }): boolean;
    /**
     * @see {@link foundry.documents.BaseActor#isOwner}
     * @ignore
     */
    get isOwner(): any;
}
/**
 * The data model for the the core.prototypeTokenOverrides setting.
 */
export class PrototypeTokenOverrides extends DataModel<object, foundry.abstract.types.DataModelConstructionContext> {
    /** @override */
    static override defineSchema(): {};
    /**
     * Localize all non-recursive data fields on first load of the application.
     * @param {fields.DataField[]} [fields] Subfields of a recursive field
     * @param {Record<string, string>} [cache] A running cache of localization results
     */
    static localizeFields(fields?: fields.DataField[] | undefined, cache?: Record<string, string> | undefined): void;
    /**
     * The named of the world setting that stores the prototype token overrides
     * @type {"prototypeTokenOverrides"}
     */
    static SETTING: "prototypeTokenOverrides";
    /**
     * Set or clear the cached overrides.
     * @param {PrototypeTokenOverrides|null} value
     */
    static set overrides(value: PrototypeTokenOverrides | null);
    /**
     * A cached copy of the currently-configured overrides
     * @returns {PrototypeTokenOverrides}
     */
    static get overrides(): PrototypeTokenOverrides;
    /**
     * @type {PrototypeTokenOverrides|null}
     */
    static "__#240@#overrides": PrototypeTokenOverrides | null;
    /** Have the fields been localized? Done later since this model may be initialized before i18n is ready. */
    static "__#240@#localized": boolean;
    /**
     * Apply configured overrides to prototype token data.
     * @param {object} source The prototype token source data on which to operate
     * @param {string} [actorType] The prototype parent's actor type: used to retrieve type-specific overrides
     */
    static applyOverrides(source: object, actorType?: string | undefined): void;
    /**
     * Apply configured overrides to all Actor documents within the World.
     */
    static applyAll(): void;
    constructor(data?: object | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DataModelConstructionContext | undefined);
}
/**
 * A data model intended to be used as an inner EmbeddedDataField which defines a geometric shape.
 *
 * @property {string} type                The type of shape, a value in ShapeData.TYPES.
 *                                        For rectangles, the x/y coordinates are the top-left corner.
 *                                        For circles, the x/y coordinates are the center of the circle.
 *                                        For polygons, the x/y coordinates are the first point of the polygon.
 * @property {number|null} width          For rectangles, the pixel width of the shape.
 * @property {number|null} height         For rectangles, the pixel width of the shape.
 * @property {number|null} radius         For circles, the pixel radius of the shape.
 * @property {number[]} [points]          For polygons, the array of polygon coordinates which comprise the shape.
 */
export class ShapeData extends DataModel<object, foundry.abstract.types.DataModelConstructionContext> {
    static defineSchema(): {
        type: fields.StringField;
        width: fields.NumberField;
        height: fields.NumberField;
        radius: fields.NumberField;
        points: fields.ArrayField<fields.NumberField>;
    };
    /**
     * The primitive shape types which are supported
     * @enum {string}
     */
    static TYPES: {
        RECTANGLE: string;
        CIRCLE: string;
        ELLIPSE: string;
        POLYGON: string;
    };
    constructor(data?: object | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DataModelConstructionContext | undefined);
}
/**
 * A data model intended to be used as an inner EmbeddedDataField which defines a geometric shape.
 * @abstract
 *
 * @property {string} type             The type of shape, a value in BaseShapeData.TYPES
 * @property {boolean} hole            Is this shape a hole?
 * @property {number} rotation         The rotation
 */
export class BaseShapeData extends DataModel<object, foundry.abstract.types.DataModelConstructionContext> {
    /**
     * The possible shape types.
     * @type {Readonly<{
     *   rectangle: foundry.data.RectangleShapeData;
     *   circle: foundry.data.CircleShapeData;
     *   ellipse: foundry.data.EllipseShapeData;
     *   emanation: foundry.data.EmanationShapeData;
     *   cone: foundry.data.ConeShapeData;
     *   ring: foundry.data.RingShapeData;
     *   line: foundry.data.LineShapeData;
     *   polygon: foundry.data.PolygonShapeData;
     *   token: foundry.data.TokenShapeData;
     *   grid: foundry.data.GridShapeData;
     * }>}
     */
    static get TYPES(): Readonly<{
        rectangle: foundry.data.RectangleShapeData;
        circle: foundry.data.CircleShapeData;
        ellipse: foundry.data.EllipseShapeData;
        emanation: foundry.data.EmanationShapeData;
        cone: foundry.data.ConeShapeData;
        ring: foundry.data.RingShapeData;
        line: foundry.data.LineShapeData;
        polygon: foundry.data.PolygonShapeData;
        token: foundry.data.TokenShapeData;
        grid: foundry.data.GridShapeData;
    }>;
    static "__#239@#TYPES": any;
    /**
     * The type of this shape.
     * @type {string}
     */
    static TYPE: string;
    /** @override */
    static override defineSchema(): {
        type: fields.StringField;
        hole: fields.BooleanField;
    };
    constructor(data: any, options: any);
    /**
     * The index of this shape within the array of shapes in its parent.
     * See {@link foundry.data.fields.ShapesField}.
     * @type {number|undefined}
     * @internal
     */
    _index: number | undefined;
}
/**
 * The data model for a rectangle shape.
 *
 * @property {number} x               The x-coordinate of the origin in pixels.
 * @property {number} y               The y-coordinate of the origin in pixels.
 * @property {number} width           The width of the rectangle in pixels.
 * @property {number} height          The height of the rectangle in pixels.
 * @property {number} anchorX         The x-coordinate of the anchor.
 * @property {number} anchorY         The y-coordinate of the anchor.
 * @property {number} rotation        The rotation around the origin of the rectangle in degrees.
 * @property {boolean} gridBased      If the shape is grid-based, its dimensions are converted into grid units
 *                                    by dividing each by the grid size and multiplying by the grid distance. The shape
 *                                    is then constructed using these dimensions conforming to the grid's metric.
 */
export class RectangleShapeData extends BaseShapeData {
    /** @inheritdoc */
    static defineSchema(): {
        type: fields.StringField;
        hole: fields.BooleanField;
    } & {
        x: fields.NumberField;
        y: fields.NumberField;
        width: fields.NumberField;
        height: fields.NumberField;
        anchorX: fields.NumberField;
        anchorY: fields.NumberField;
        rotation: fields.AngleField;
        gridBased: fields.BooleanField;
    };
}
/**
 * The data model for a circle shape.
 *
 * @property {number} x               The x-coordinate of the center point in pixels.
 * @property {number} y               The y-coordinate of the center point in pixels.
 * @property {number} radius          The radius of the circle in pixels.
 * @property {boolean} gridBased      If the shape is grid-based, its dimensions are converted into grid units
 *                                    by dividing each by the grid size and multiplying by the grid distance. The shape
 *                                    is then constructed using these dimensions conforming to the grid's metric.
 */
export class CircleShapeData extends BaseShapeData {
    /** @inheritdoc */
    static defineSchema(): {
        type: fields.StringField;
        hole: fields.BooleanField;
    } & {
        x: fields.NumberField;
        y: fields.NumberField;
        radius: fields.NumberField;
        gridBased: fields.BooleanField;
    };
}
/**
 * The data model for an ellipse shape.
 *
 * @property {number} x               The x-coordinate of the center point in pixels.
 * @property {number} y               The y-coordinate of the center point in pixels.
 * @property {number} radiusX         The x-radius of the circle in pixels.
 * @property {number} radiusY         The y-radius of the circle in pixels.
 * @property {number} rotation        The rotation around the center of the rectangle in degrees.
 * @property {boolean} gridBased      If the shape is grid-based, its dimensions are converted into grid units
 *                                    by dividing each by the grid size and multiplying by the grid distance. The shape
 *                                    is then constructed using these dimensions conforming to the grid's metric.
 */
export class EllipseShapeData extends BaseShapeData {
    /** @inheritdoc */
    static defineSchema(): {
        type: fields.StringField;
        hole: fields.BooleanField;
    } & {
        x: fields.NumberField;
        y: fields.NumberField;
        radiusX: fields.NumberField;
        radiusY: fields.NumberField;
        rotation: fields.AngleField;
        gridBased: fields.BooleanField;
    };
}
/**
 * The data model for an emanation shape.
 *
 * @property {BaseShapeData} base     The base shape of the emanation.
 * @property {number} radius          The radius of the emanation in pixels.
 * @property {boolean} gridBased      If the shape is grid-based, its dimensions are converted into grid units
 *                                    by dividing each by the grid size and multiplying by the grid distance. The shape
 *                                    is then constructed using these dimensions conforming to the grid's metric.
 */
export class EmanationShapeData extends BaseShapeData {
    /** @inheritdoc */
    static defineSchema(): {
        type: fields.StringField;
        hole: fields.BooleanField;
    } & {
        base: fields.TypedSchemaField;
        radius: fields.NumberField;
        gridBased: fields.BooleanField;
    };
}
/**
 * The data model for a cone shape.
 *
 * @property {number} x               The x-coordinate of the center point in pixels.
 * @property {number} y               The y-coordinate of the center point in pixels.
 * @property {number} radius          The radius of the cone in pixels.
 * @property {number} angle           The angle of the cone in degrees.
 * @property {number} rotation        The direction of the cone in degrees.
 * @property {"round"|"flat"|"semicircle"} curvature    The curvature.
 * @property {boolean} gridBased      If the shape is grid-based, its dimensions are converted into grid units
 *                                    by dividing each by the grid size and multiplying by the grid distance. The shape
 *                                    is then constructed using these dimensions conforming to the grid's metric.
 */
export class ConeShapeData extends BaseShapeData {
    /** @inheritdoc */
    static defineSchema(): {
        type: fields.StringField;
        hole: fields.BooleanField;
    } & {
        x: fields.NumberField;
        y: fields.NumberField;
        radius: fields.NumberField;
        angle: fields.AngleField;
        rotation: fields.AngleField;
        curvature: fields.StringField;
        gridBased: fields.BooleanField;
    };
    /** @override */
    static override validateJoint(data: any): void;
}
/**
 * The data model for a ring shape.
 *
 * @property {number} x               The x-coordinate of the origin in pixels.
 * @property {number} y               The y-coordinate of the origin in pixels.
 * @property {number} radius          The radius of the ring in pixels.
 * @property {number} innerWidth      The inner width of the ring in pixels.
 * @property {number} outerWidth      The inner width of the ring in pixels.
 * @property {boolean} gridBased      If the shape is grid-based, its dimensions are converted into grid units
 *                                    by dividing each by the grid size and multiplying by the grid distance. The shape
 *                                    is then constructed using these dimensions conforming to the grid's metric.
 */
export class RingShapeData extends BaseShapeData {
    /** @inheritdoc */
    static defineSchema(): {
        type: fields.StringField;
        hole: fields.BooleanField;
    } & {
        x: fields.NumberField;
        y: fields.NumberField;
        radius: fields.NumberField;
        innerWidth: fields.NumberField;
        outerWidth: fields.NumberField;
        gridBased: fields.BooleanField;
    };
}
/**
 * The data model for a line shape.
 *
 * @property {number} x               The x-coordinate of the origin in pixels.
 * @property {number} y               The y-coordinate of the origin in pixels.
 * @property {number} length          The length of the line in pixels.
 * @property {number} width           The width of the line in pixels.
 * @property {number} rotation        The rotation around the origin of the line in degrees.
 * @property {boolean} gridBased      If the shape is grid-based, its dimensions are converted into grid units
 *                                    by dividing each by the grid size and multiplying by the grid distance. The shape
 *                                    is then constructed using these dimensions conforming to the grid's metric.
 */
export class LineShapeData extends BaseShapeData {
    /** @inheritdoc */
    static defineSchema(): {
        type: fields.StringField;
        hole: fields.BooleanField;
    } & {
        x: fields.NumberField;
        y: fields.NumberField;
        length: fields.NumberField;
        width: fields.NumberField;
        rotation: fields.AngleField;
        gridBased: fields.BooleanField;
    };
}
/**
 * The data model for a polygon shape.
 *
 * @property {number[]} points      The points of the polygon ([x0, y0, x1, y1, ...]).
 *                                  The polygon must not be self-intersecting if it is supposed to be filled.
 *                                  The polygon must not contained zero-length edges except for
 *                                  the edge from the last to the first point.
 * @property {Point|null} origin    The origin of the polygon. If null, it defaults to the center-of-mass.
 */
export class PolygonShapeData extends BaseShapeData {
    /** @inheritdoc */
    static defineSchema(): {
        type: fields.StringField;
        hole: fields.BooleanField;
    } & {
        points: fields.ArrayField<fields.NumberField>;
        origin: fields.SchemaField;
    };
}
/**
 * The data model for a token shape.
 *
 * @property {number} x                  The top-left x-coordinate in pixels (integer).
 * @property {number} y                  The top-left y-coordinate in pixels (integer).
 * @property {number} width              The width in grid spaces (positive).
 * @property {number} height             The height in grid spaces (positive).
 * @property {TokenShapeType} shape      The shape type (see {@link CONST.TOKEN_SHAPES}).
 */
export class TokenShapeData extends BaseShapeData {
    /** @inheritdoc */
    static defineSchema(): {
        type: fields.StringField;
        hole: fields.BooleanField;
    } & {
        x: fields.NumberField;
        y: fields.NumberField;
        width: fields.NumberField;
        height: fields.NumberField;
        shape: fields.NumberField;
    };
}
/**
 * The data model for a shape that is the union of grid spaces.
 *
 * @property {GridOffset2D[]} offsets    The grid offsets covered by this shape
 * @property {Point|null} origin         The optional grid space origin, which is by default
 *                                       the center point of the first grid space in `offsets`
 */
export class GridShapeData extends BaseShapeData {
    /** @inheritdoc */
    static defineSchema(): {
        type: fields.StringField;
        hole: fields.BooleanField;
    } & {
        offsets: fields.GridOffsetsField;
        origin: fields.SchemaField;
    };
}
/**
 * A {@link foundry.data.fields.SchemaField} subclass used to represent texture data.
 * @property {string|null} src            The URL of the texture source.
 * @property {number} anchorX             The X coordinate of the texture anchor.
 * @property {number} anchorY             The Y coordinate of the texture anchor.
 * @property {number} scaleX              The scale of the texture in the X dimension.
 * @property {number} scaleY              The scale of the texture in the Y dimension.
 * @property {TextureDataFitMode} fit     The texture fit mode.
 * @property {string} tint                The tint applied to the texture.
 * @property {number} alphaThreshold      Only pixels with an alpha value at or above this value are consider solid
 *                                        w.r.t. to occlusion testing and light/weather blocking.
 */
export class TextureData extends fields.SchemaField {
    /**
     * @param {DataFieldOptions} options        Options which are forwarded to the SchemaField constructor
     * @param {Pick<FilePathFieldOptions, "categories"|"initial"|"wildcard"|"label">} srcOptions
     *                                          Additional options for the src field
     */
    constructor(options?: DataFieldOptions, { categories, initial, wildcard, label }?: Pick<FilePathFieldOptions, "categories" | "initial" | "wildcard" | "label">);
}
/**
 * A minimal data model used to represent a tombstone entry inside an {@link foundry.abstract.EmbeddedCollectionDelta}.
 *
 * @property {string} _id              The _id of the base Document that this tombstone represents.
 * @property {boolean} _tombstone      A property that identifies this entry as a tombstone.
 */
export class TombstoneData extends DataModel<object, foundry.abstract.types.DataModelConstructionContext> {
    /** @override */
    static override defineSchema(): {
        _id: fields.DocumentIdField;
        _tombstone: fields.BooleanField;
    };
    constructor(data?: object | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DataModelConstructionContext | undefined);
}
import DataModel from "../abstract/data.mjs";
import * as fields from "./fields.mjs";
import type { PrototypeTokenData } from "../documents/_types.mjs";
import type BaseActor from "../documents/actor.mjs";
import type { DataFieldOptions } from "./_types.mjs";
import type { FilePathFieldOptions } from "./_types.mjs";
