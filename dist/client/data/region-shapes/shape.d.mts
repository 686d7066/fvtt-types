/**
 * A shape of a {@link foundry.documents.RegionDocument}.
 * @template {BaseShapeData} [ShapeData=BaseShapeData]
 * @deprecated since v14
 * @ignore
 */
export class RegionShape<ShapeData extends BaseShapeData = BaseShapeData> {
    /**
     * Create the RegionShape from the shape data.
     * @param {CircleShapeData|EllipseShapeData|PolygonShapeData|RectangleShapeData} data    The shape data.
     * @returns {RegionShape}
     */
    static create(data: CircleShapeData | EllipseShapeData | PolygonShapeData | RectangleShapeData): RegionShape;
    /** @ignore */
    static _create(data: any): RegionShape<any>;
    /**
     * Create a RegionShape.
     * @param {ShapeData} data    The shape data.
     * @internal
     */
    constructor(data: ShapeData);
    /**
     * The data of this shape.
     * It is owned by the shape and must not be modified.
     * @type {ShapeData}
     */
    get data(): ShapeData;
    /**
     * Is this a hole?
     * @type {boolean}
     */
    get isHole(): boolean;
    /**
     * The Clipper paths of this shape.
     * The winding numbers are 1 or 0.
     * @type {ReadonlyArray<ReadonlyArray<ClipperLib.IntPoint>>}
     */
    get clipperPaths(): readonly (readonly ClipperLib.IntPoint[])[];
    /**
     * The Clipper polygon tree of this shape.
     * @type {ClipperLib.PolyTree}
     */
    get clipperPolyTree(): ClipperLib.PolyTree;
    #private;
}
/**
 * A circle of a {@link foundry.documents.RegionDocument}.
 * @extends {RegionShape<CircleShapeData>}
 * @deprecated since v14
 * @ignore
 */
export class RegionCircleShape extends RegionShape<CircleShapeData> {
    /**
     * Create a RegionShape.
     * @param {ShapeData} data    The shape data.
     * @internal
     */
    constructor(data: CircleShapeData);
}
/**
 * An ellipse of a {@link foundry.documents.RegionDocument}.
 * @extends {RegionShape<EllipseShapeData>}
 * @deprecated since v14
 * @ignore
 */
export class RegionEllipseShape extends RegionShape<EllipseShapeData> {
    /**
     * Create a RegionShape.
     * @param {ShapeData} data    The shape data.
     * @internal
     */
    constructor(data: EllipseShapeData);
}
/**
 * A polygon of a {@link foundry.documents.RegionDocument}.
 * @extends {RegionShape<PolygonShapeData>}
 * @deprecated since v14
 * @ignore
 */
export class RegionPolygonShape extends RegionShape<PolygonShapeData> {
    /**
     * Create a RegionShape.
     * @param {ShapeData} data    The shape data.
     * @internal
     */
    constructor(data: PolygonShapeData);
}
/**
 * A rectangle of a {@link foundry.documents.RegionDocument}.
 * @extends {RegionShape<RectangleShapeData>}
 * @deprecated since v14
 * @ignore
 */
export class RegionRectangleShape extends RegionShape<RectangleShapeData> {
    /**
     * Create a RegionShape.
     * @param {ShapeData} data    The shape data.
     * @internal
     */
    constructor(data: RectangleShapeData);
}
