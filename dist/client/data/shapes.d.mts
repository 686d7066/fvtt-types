declare const RectangleShapeData_base: {
    new (data: any, options: any): {
        /**
         * The scene that this shape is placed in, if any.
         * @type {Scene|null}
         */
        readonly scene: Scene | null;
        "__#108@#scene": any;
        /**
         * The grid that this shape is placed in.
         * @type {BaseGrid}
         */
        readonly grid: BaseGrid<foundry.grid.types.GridCoordinates2D, foundry.grid.types.GridCoordinates3D>;
        /**
         * The gridless version of the grid that this shape is placed in.
         * @type {GridlessGrid}
         */
        readonly gridlessGrid: GridlessGrid;
        /**
         * Is this shape empty?
         * @type {boolean}
         */
        readonly isEmpty: boolean;
        /**
         * The polygons of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ReadonlyArray<PIXI.Polygon>}
         */
        readonly polygons: readonly PIXI.Polygon[];
        /**
         * The polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {PolygonTree}
         */
        readonly polygonTree: PolygonTree;
        "__#108@#polygonTree": any;
        /**
         * The Clipper paths of this shape.
         * The winding numbers are 1 or 0.
         *
         * The value of this property must not be mutated.
         * @type {DeepReadonly<ClipperPoint[][]>}
         */
        readonly clipperPaths: readonly (readonly DeepReadonly<ClipperPoint>[])[];
        /**
         * The Clipper polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ClipperLib.PolyTree}
         */
        readonly clipperPolyTree: ClipperLib.PolyTree;
        "__#108@#clipperPolyTree": any;
        /**
         * The triangulation of this shape.
         *
         * The value of this property must not be mutated.
         * @type {Readonly<{vertices: Float32Array; indices: Uint16Array|Uint32Array}>}
         */
        readonly triangulation: Readonly<{
            vertices: Float32Array;
            indices: Uint16Array | Uint32Array;
        }>;
        /**
         * The bounds of this Region.
         *
         * The value of this property must not be mutated.
         * @type {PIXI.Rectangle}
         */
        readonly bounds: PIXI.Rectangle;
        /**
         * The origin of this shape.
         * @type {Readonly<Point>}
         */
        readonly origin: Readonly<Point>;
        "__#108@#origin": any;
        /**
         * The center point of this shape.
         * @type {Readonly<Point>}
         */
        readonly center: Readonly<Point>;
        "__#108@#center": any;
        /**
         * The area of this shape.
         * @type {number}
         */
        readonly area: number;
        "__#108@#area": any;
        /**
         * The measured segments of this shape.
         * Each segment consist of a ray, winding order, distance in grid units, and the angle in degrees if it has one.
         * The ray represents the measured segment. If the winding order is ...
         *  - 1, the segment is an edge in positive orientation.
         *  - -1, the segment is an edge in negative orientation.
         *  - 0, the segment is not an edge.
         *
         * The distance is the actual grid distance if the shape is grid-based.
         * Otherwise the distance is the distance in pixels divided by of the ratio of grid distance and grid size.
         * @type {DeepReadonly<{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]>}
         */
        readonly measuredSegments: readonly DeepReadonly<{
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }>[];
        "__#108@#measuredSegments": any;
        /**
         * The control handles of this shape.
         * Each handle has a position and a rotation in radians.
         * @type {DeepReadonly<{[name: string]: {position: Point; rotation: number; visible: boolean}}>}
         */
        readonly controlHandles: DeepReadonly<{
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        }>;
        "__#108@#controlHandles": any;
        /** @inheritDoc */
        _updateCommit(copy: any, diff: any, options: any, state: any): void;
        /** @inheritDoc */
        clone(data: any, context: any): foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext> | Promise<foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext>>;
        /**
         * Called when the shape was changed.
         * This function is not called when just the hole state is changed.
         * This function is not called if grid-based is changed and the grid is gridless.
         * @protected
         */
        _onShapeChange(): void;
        /**
         * Called when the grid this shape is placed in changes.
         * @param {object} changed    The changes to the grid.
         * @protected
         */
        _onGridChange(changed: object): void;
        /**
         * Is this shape currently affected by the grid?
         * @returns {boolean}
         */
        readonly isAffectedByGrid: boolean;
        /**
         * Whether the shape is identical to itself after a rotation around its origin.
         * @returns {boolean}
         */
        readonly hasRotationalSymmetry: boolean;
        /**
         * Create a ray.
         * @param {number} x             The x-coordinate of the origin of the ray.
         * @param {number} y             The y-coordinate of the origin of the ray.
         * @param {number} direction     The direction of the ray in degrees.
         * @param {number} length        The length of the ray in pixels.
         * @param {number} [alignment=0] The alignment to ray.
         * @returns {Ray}
         * @internal
         */
        _createRay(x: number, y: number, direction: number, length: number, alignment?: number | undefined): Ray;
        /**
         * Snap the given point.
         * @param {Point} point    The point that is to be snapped.
         * @returns {Point}        The snapped point.
         * @internal
         */
        _getSnappedPoint(point: Point): Point;
        /**
         * Get the size for the given ray defined by a length and direction.
         * @param {number} length       The length of the ray in pixels.
         * @param {number} direction    The direction of the ray in radians.
         * @param {object} [options]                   Additional options.
         * @param {boolean} [options.snap=false]       Snap the size to with defined grid snapping precision?
         * @param {boolean} [options.round]            Round the size to integer?
         * @param {boolean} [options.allowZero=false]  Allow the size to be zero?
         * @returns {number}            The snapped size in pixels.
         * @internal
         */
        _calculateSize(length: number, direction: number, { snap, round, allowZero }?: {
            snap?: boolean | undefined;
            round?: boolean | undefined;
            allowZero?: boolean | undefined;
        } | undefined): number;
        /**
         * Snap the given rotation.
         * @param {number} rotation    The rotation to be snapped in degrees.
         * @returns {number}           The snapped rotation in degrees.
         * @internal
         */
        _getSnappedRotation(rotation: number): number;
        /**
         * Test whether given point is contained within this shape.
         * @param {Point} point    The point.
         * @returns {boolean}
         */
        testPoint(point: Point): boolean;
        /**
         * Create the Clipper polygon tree of this shape.
         * This function may return a single positively-orientated and non-selfintersecting Clipper path instead of a tree,
         * which is automatically converted to a Clipper polygon tree.
         * This function is called only once. It is not called if the shape is empty.
         * @returns {ClipperLib.PolyTree|ClipperPoint[]|Point[]|number[]}
         * @protected
         * @abstract
         */
        _createClipperPolyTree(): ClipperLib.PolyTree | ClipperPoint[] | Point[] | number[];
        /**
         * Create the origin point of this shape.
         * @returns {Point}
         * @protected
         */
        _createOrigin(): Point;
        /**
         * Create the center point of this shape.
         * @returns {Point}
         * @protected
         */
        _createCenter(): Point;
        /**
         * Calculate the area of this shape.
         * @returns {number}
         * @protected
         */
        _calculateArea(): number;
        /**
         * Move the shape to the given origin.
         * @param {Point} origin                    The (unsnapped) origin.
         * @param {object} [options]                Additional options.
         * @param {boolean} [options.snap=false]    Snap the origin?
         */
        move(origin: Point, { snap }?: {
            snap?: boolean | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin (or pivot).
         * @param {number} angle           The angle in degrees.
         * @param {object} [options]       Additional options.
         * @param {Point} [options.pivot]  The pivot of rotation. Default: origin.
         */
        rotate(angle: number, { pivot }?: {
            pivot?: Point | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin.
         * @param {number} angle    The angle in degrees.
         * @protected
         */
        _rotate(angle: number): void;
        /**
         * Draw the shape into the Graphics element.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawShape(graphics: PIXI.Graphics): void;
        /**
         * Draw reference lines of the shape into the Graphics element, if it has any.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawReferenceLines(graphics: PIXI.Graphics): void;
        /**
         * Create a measured segment.
         * @param {number} x           The x-coordinate of the origin of the ray.
         * @param {number} y           The y-coordinate of the origin of the ray.
         * @param {number} direction   The direction of the ray in degrees.
         * @param {number} length      The length of the ray in pixels.
         * @param {number} alignment   The alignment of the ray.
         * @param {-1|0|1} winding     The winding order.
         * @param {number} [angle]     The angle in degrees.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}}
         * @internal
         */
        _createMeasuredSegment(x: number, y: number, direction: number, length: number, alignment: number, winding: -1 | 0 | 1, angle?: number | undefined): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        };
        /**
         * Create the measured segments of this shape.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]}
         * @protected
         * @abstract
         */
        _createMeasuredSegments(): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }[];
        /**
         * Get the control handles for this shape.
         * @returns {{[name: string]: {position: Point; rotation: number; visible: boolean}}}
         *   The position, rotation in radians, and visible state for each handle.
         * @abstract
         */
        _createControlHandles(): {
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        };
        /**
         * Move the control handle to the destination position.
         * @param {string} name                       The handle name.
         * @param {Point} destination                 The destination of the handle.
         * @param {object} [options]                  Additional options.
         * @param {boolean} [options.snap=false]      Snapping?
         * @param {boolean} [options.unlinked=false]  Unlinked scaling?
         *
         */
        moveControlHandle(name: string, destination: Point, options?: {
            snap?: boolean | undefined;
            unlinked?: boolean | undefined;
        } | undefined): void;
        /**
         * Transform this shape by moving a scale handle.
         * @param {string} fieldName    The field name of the axis that is scaled.
         * @param {Point} origin        The origin.
         * @param {number} direction    The direction of the axis in degrees.
         * @param {number} alignment    The alignment of the axis.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @param {boolean} [allowZero=false]    Allow zero size?
         * @param {number} [max]                 The maximum value.
         * @internal
         */
        _moveScaleHandle(fieldName: string, origin: Point, direction: number, alignment: number, destination: Point, snap: boolean, allowZero?: boolean | undefined, max?: number | undefined): void;
        /**
         * Transform this shape by moving a rotation handle.
         * @param {number} direction    The direction of the rotation handle in degrees.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveRotationHandle(direction: number, destination: Point, snap: boolean): void;
        /**
         * Transform this shape by moving the sweep handle.
         * @param {number} maxAngle     The maximum angle possible.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveSweepHandle(maxAngle: number, destination: Point, snap: boolean): void;
        /**
         * Handle the drag start event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @internal
         */
        _onDragStart(event: PIXI.FederatedEvent): void;
        /**
         * Handle the drag move event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @abstract
         * @internal
         */
        _onDragMove(event: PIXI.FederatedEvent): void;
        /**
         * Sample a point from the shape interior.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleInterior(out?: Point | undefined): Point;
        /**
         * Sample a point from the shape boundary.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleBoundary(out?: Point | undefined): Point;
        _index: number | undefined;
        _configure(options?: object | undefined): void;
        _source: object;
        parent: foundry.abstract.DataModel | null;
        readonly schema: import("./fields.mjs").DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
            joint: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): import("./fields.mjs").DataField | undefined;
        _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DataModelConstructionContext | undefined): object;
        _getInnerModel(field: import("./fields.mjs").DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, import("./fields.mjs").DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): import("../../common/data/validation-failure.mjs").DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): object;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    };
    /**
     * The distance snapping precision.
     * @type {number}
     */
    "__#108@#DISTANCE_SNAPPING_PRECISION": number;
    /**
     * The rotation snapping interval.
     * @type {number}
     */
    "__#108@#ROTATION_SNAPPING_INTERVAL": number;
    /**
     * Convert a path to a clipper path.
     * @param {ClipperPoint[]|Point[]|number[]} path    A path
     * @returns {ClipperPoint[]}
     * @internal
     */
    _toClipperPath(path: ClipperPoint[] | Point[] | number[]): ClipperPoint[];
    LOCALIZATION_PREFIXES: string[];
    readonly TYPES: Readonly<{
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
    TYPE: string;
    defineSchema(): {
        type: import("./fields.mjs").StringField;
        hole: import("./fields.mjs").BooleanField;
    };
    _schema: import("./fields.mjs").DataModelSchemaField;
    readonly schema: import("./fields.mjs").DataModelSchemaField;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: import("./_types.mjs").DataModelCleaningOptions | undefined, _state?: Partial<import("./_types.mjs").DataModelUpdateState> | undefined): object;
    _preCleanData(data: object, options: import("./_types.mjs").DataModelCleaningOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
    _cleanData(data: object, options: Readonly<import("./_types.mjs").DataModelCleaningOptions>, _state: import("./_types.mjs").DataModelUpdateState): object;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): object;
    migrateData(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined, _state?: import("./_types.mjs").DataModelUpdateState | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
/**
 * The data model for a rectangle shape.
 */
export class RectangleShapeData extends RectangleShapeData_base {
    /**
     * Get the rays for both axes.
     * @returns {{axisX: Ray; axisY: Ray}}
     * @internal
     */
    _getRays(): {
        axisX: Ray;
        axisY: Ray;
    };
    /** @override */
    override _createClipperPolyTree(): Point[];
    /** @override */
    override _createCenter(): {
        x: any;
        y: any;
    };
    /** @inheritDoc */
    sampleInterior(out: any): Point;
    /** @inheritDoc */
    sampleBoundary(out: any): Point;
    /** @inheritDoc */
    drawShape(graphics: any): void;
    /** @override */
    override _createMeasuredSegments(): {
        ray: Ray;
        winding: number;
        distance: number;
    }[];
    /** @override */
    override _createControlHandles(): {
        translate: {
            position: {
                x: any;
                y: any;
            };
            rotation: number;
            visible: boolean;
        };
        scale: {
            position: {
                x: any;
                y: any;
            };
            rotation: number;
            visible: boolean;
        };
        rotate: {
            position: any;
            rotation: number;
            visible: boolean;
        };
    };
    /** @override */
    override moveControlHandle(name: any, destination: any, { snap, unlinked }?: {
        snap?: boolean | undefined;
        unlinked?: boolean | undefined;
    }): void;
    /** @override */
    override _onDragMove(event: any): void;
    #private;
}
declare const CircleShapeData_base: {
    new (data: any, options: any): {
        /**
         * The scene that this shape is placed in, if any.
         * @type {Scene|null}
         */
        readonly scene: Scene | null;
        "__#108@#scene": any;
        /**
         * The grid that this shape is placed in.
         * @type {BaseGrid}
         */
        readonly grid: BaseGrid<foundry.grid.types.GridCoordinates2D, foundry.grid.types.GridCoordinates3D>;
        /**
         * The gridless version of the grid that this shape is placed in.
         * @type {GridlessGrid}
         */
        readonly gridlessGrid: GridlessGrid;
        /**
         * Is this shape empty?
         * @type {boolean}
         */
        readonly isEmpty: boolean;
        /**
         * The polygons of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ReadonlyArray<PIXI.Polygon>}
         */
        readonly polygons: readonly PIXI.Polygon[];
        /**
         * The polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {PolygonTree}
         */
        readonly polygonTree: PolygonTree;
        "__#108@#polygonTree": any;
        /**
         * The Clipper paths of this shape.
         * The winding numbers are 1 or 0.
         *
         * The value of this property must not be mutated.
         * @type {DeepReadonly<ClipperPoint[][]>}
         */
        readonly clipperPaths: readonly (readonly DeepReadonly<ClipperPoint>[])[];
        /**
         * The Clipper polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ClipperLib.PolyTree}
         */
        readonly clipperPolyTree: ClipperLib.PolyTree;
        "__#108@#clipperPolyTree": any;
        /**
         * The triangulation of this shape.
         *
         * The value of this property must not be mutated.
         * @type {Readonly<{vertices: Float32Array; indices: Uint16Array|Uint32Array}>}
         */
        readonly triangulation: Readonly<{
            vertices: Float32Array;
            indices: Uint16Array | Uint32Array;
        }>;
        /**
         * The bounds of this Region.
         *
         * The value of this property must not be mutated.
         * @type {PIXI.Rectangle}
         */
        readonly bounds: PIXI.Rectangle;
        /**
         * The origin of this shape.
         * @type {Readonly<Point>}
         */
        readonly origin: Readonly<Point>;
        "__#108@#origin": any;
        /**
         * The center point of this shape.
         * @type {Readonly<Point>}
         */
        readonly center: Readonly<Point>;
        "__#108@#center": any;
        /**
         * The area of this shape.
         * @type {number}
         */
        readonly area: number;
        "__#108@#area": any;
        /**
         * The measured segments of this shape.
         * Each segment consist of a ray, winding order, distance in grid units, and the angle in degrees if it has one.
         * The ray represents the measured segment. If the winding order is ...
         *  - 1, the segment is an edge in positive orientation.
         *  - -1, the segment is an edge in negative orientation.
         *  - 0, the segment is not an edge.
         *
         * The distance is the actual grid distance if the shape is grid-based.
         * Otherwise the distance is the distance in pixels divided by of the ratio of grid distance and grid size.
         * @type {DeepReadonly<{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]>}
         */
        readonly measuredSegments: readonly DeepReadonly<{
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }>[];
        "__#108@#measuredSegments": any;
        /**
         * The control handles of this shape.
         * Each handle has a position and a rotation in radians.
         * @type {DeepReadonly<{[name: string]: {position: Point; rotation: number; visible: boolean}}>}
         */
        readonly controlHandles: DeepReadonly<{
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        }>;
        "__#108@#controlHandles": any;
        /** @inheritDoc */
        _updateCommit(copy: any, diff: any, options: any, state: any): void;
        /** @inheritDoc */
        clone(data: any, context: any): foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext> | Promise<foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext>>;
        /**
         * Called when the shape was changed.
         * This function is not called when just the hole state is changed.
         * This function is not called if grid-based is changed and the grid is gridless.
         * @protected
         */
        _onShapeChange(): void;
        /**
         * Called when the grid this shape is placed in changes.
         * @param {object} changed    The changes to the grid.
         * @protected
         */
        _onGridChange(changed: object): void;
        /**
         * Is this shape currently affected by the grid?
         * @returns {boolean}
         */
        readonly isAffectedByGrid: boolean;
        /**
         * Whether the shape is identical to itself after a rotation around its origin.
         * @returns {boolean}
         */
        readonly hasRotationalSymmetry: boolean;
        /**
         * Create a ray.
         * @param {number} x             The x-coordinate of the origin of the ray.
         * @param {number} y             The y-coordinate of the origin of the ray.
         * @param {number} direction     The direction of the ray in degrees.
         * @param {number} length        The length of the ray in pixels.
         * @param {number} [alignment=0] The alignment to ray.
         * @returns {Ray}
         * @internal
         */
        _createRay(x: number, y: number, direction: number, length: number, alignment?: number | undefined): Ray;
        /**
         * Snap the given point.
         * @param {Point} point    The point that is to be snapped.
         * @returns {Point}        The snapped point.
         * @internal
         */
        _getSnappedPoint(point: Point): Point;
        /**
         * Get the size for the given ray defined by a length and direction.
         * @param {number} length       The length of the ray in pixels.
         * @param {number} direction    The direction of the ray in radians.
         * @param {object} [options]                   Additional options.
         * @param {boolean} [options.snap=false]       Snap the size to with defined grid snapping precision?
         * @param {boolean} [options.round]            Round the size to integer?
         * @param {boolean} [options.allowZero=false]  Allow the size to be zero?
         * @returns {number}            The snapped size in pixels.
         * @internal
         */
        _calculateSize(length: number, direction: number, { snap, round, allowZero }?: {
            snap?: boolean | undefined;
            round?: boolean | undefined;
            allowZero?: boolean | undefined;
        } | undefined): number;
        /**
         * Snap the given rotation.
         * @param {number} rotation    The rotation to be snapped in degrees.
         * @returns {number}           The snapped rotation in degrees.
         * @internal
         */
        _getSnappedRotation(rotation: number): number;
        /**
         * Test whether given point is contained within this shape.
         * @param {Point} point    The point.
         * @returns {boolean}
         */
        testPoint(point: Point): boolean;
        /**
         * Create the Clipper polygon tree of this shape.
         * This function may return a single positively-orientated and non-selfintersecting Clipper path instead of a tree,
         * which is automatically converted to a Clipper polygon tree.
         * This function is called only once. It is not called if the shape is empty.
         * @returns {ClipperLib.PolyTree|ClipperPoint[]|Point[]|number[]}
         * @protected
         * @abstract
         */
        _createClipperPolyTree(): ClipperLib.PolyTree | ClipperPoint[] | Point[] | number[];
        /**
         * Create the origin point of this shape.
         * @returns {Point}
         * @protected
         */
        _createOrigin(): Point;
        /**
         * Create the center point of this shape.
         * @returns {Point}
         * @protected
         */
        _createCenter(): Point;
        /**
         * Calculate the area of this shape.
         * @returns {number}
         * @protected
         */
        _calculateArea(): number;
        /**
         * Move the shape to the given origin.
         * @param {Point} origin                    The (unsnapped) origin.
         * @param {object} [options]                Additional options.
         * @param {boolean} [options.snap=false]    Snap the origin?
         */
        move(origin: Point, { snap }?: {
            snap?: boolean | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin (or pivot).
         * @param {number} angle           The angle in degrees.
         * @param {object} [options]       Additional options.
         * @param {Point} [options.pivot]  The pivot of rotation. Default: origin.
         */
        rotate(angle: number, { pivot }?: {
            pivot?: Point | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin.
         * @param {number} angle    The angle in degrees.
         * @protected
         */
        _rotate(angle: number): void;
        /**
         * Draw the shape into the Graphics element.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawShape(graphics: PIXI.Graphics): void;
        /**
         * Draw reference lines of the shape into the Graphics element, if it has any.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawReferenceLines(graphics: PIXI.Graphics): void;
        /**
         * Create a measured segment.
         * @param {number} x           The x-coordinate of the origin of the ray.
         * @param {number} y           The y-coordinate of the origin of the ray.
         * @param {number} direction   The direction of the ray in degrees.
         * @param {number} length      The length of the ray in pixels.
         * @param {number} alignment   The alignment of the ray.
         * @param {-1|0|1} winding     The winding order.
         * @param {number} [angle]     The angle in degrees.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}}
         * @internal
         */
        _createMeasuredSegment(x: number, y: number, direction: number, length: number, alignment: number, winding: -1 | 0 | 1, angle?: number | undefined): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        };
        /**
         * Create the measured segments of this shape.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]}
         * @protected
         * @abstract
         */
        _createMeasuredSegments(): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }[];
        /**
         * Get the control handles for this shape.
         * @returns {{[name: string]: {position: Point; rotation: number; visible: boolean}}}
         *   The position, rotation in radians, and visible state for each handle.
         * @abstract
         */
        _createControlHandles(): {
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        };
        /**
         * Move the control handle to the destination position.
         * @param {string} name                       The handle name.
         * @param {Point} destination                 The destination of the handle.
         * @param {object} [options]                  Additional options.
         * @param {boolean} [options.snap=false]      Snapping?
         * @param {boolean} [options.unlinked=false]  Unlinked scaling?
         *
         */
        moveControlHandle(name: string, destination: Point, options?: {
            snap?: boolean | undefined;
            unlinked?: boolean | undefined;
        } | undefined): void;
        /**
         * Transform this shape by moving a scale handle.
         * @param {string} fieldName    The field name of the axis that is scaled.
         * @param {Point} origin        The origin.
         * @param {number} direction    The direction of the axis in degrees.
         * @param {number} alignment    The alignment of the axis.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @param {boolean} [allowZero=false]    Allow zero size?
         * @param {number} [max]                 The maximum value.
         * @internal
         */
        _moveScaleHandle(fieldName: string, origin: Point, direction: number, alignment: number, destination: Point, snap: boolean, allowZero?: boolean | undefined, max?: number | undefined): void;
        /**
         * Transform this shape by moving a rotation handle.
         * @param {number} direction    The direction of the rotation handle in degrees.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveRotationHandle(direction: number, destination: Point, snap: boolean): void;
        /**
         * Transform this shape by moving the sweep handle.
         * @param {number} maxAngle     The maximum angle possible.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveSweepHandle(maxAngle: number, destination: Point, snap: boolean): void;
        /**
         * Handle the drag start event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @internal
         */
        _onDragStart(event: PIXI.FederatedEvent): void;
        /**
         * Handle the drag move event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @abstract
         * @internal
         */
        _onDragMove(event: PIXI.FederatedEvent): void;
        /**
         * Sample a point from the shape interior.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleInterior(out?: Point | undefined): Point;
        /**
         * Sample a point from the shape boundary.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleBoundary(out?: Point | undefined): Point;
        _index: number | undefined;
        _configure(options?: object | undefined): void;
        _source: object;
        parent: foundry.abstract.DataModel | null;
        readonly schema: import("./fields.mjs").DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
            joint: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): import("./fields.mjs").DataField | undefined;
        _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DataModelConstructionContext | undefined): object;
        _getInnerModel(field: import("./fields.mjs").DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, import("./fields.mjs").DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): import("../../common/data/validation-failure.mjs").DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): object;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    };
    /**
     * The distance snapping precision.
     * @type {number}
     */
    "__#108@#DISTANCE_SNAPPING_PRECISION": number;
    /**
     * The rotation snapping interval.
     * @type {number}
     */
    "__#108@#ROTATION_SNAPPING_INTERVAL": number;
    /**
     * Convert a path to a clipper path.
     * @param {ClipperPoint[]|Point[]|number[]} path    A path
     * @returns {ClipperPoint[]}
     * @internal
     */
    _toClipperPath(path: ClipperPoint[] | Point[] | number[]): ClipperPoint[];
    LOCALIZATION_PREFIXES: string[];
    readonly TYPES: Readonly<{
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
    TYPE: string;
    defineSchema(): {
        type: import("./fields.mjs").StringField;
        hole: import("./fields.mjs").BooleanField;
    };
    _schema: import("./fields.mjs").DataModelSchemaField;
    readonly schema: import("./fields.mjs").DataModelSchemaField;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: import("./_types.mjs").DataModelCleaningOptions | undefined, _state?: Partial<import("./_types.mjs").DataModelUpdateState> | undefined): object;
    _preCleanData(data: object, options: import("./_types.mjs").DataModelCleaningOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
    _cleanData(data: object, options: Readonly<import("./_types.mjs").DataModelCleaningOptions>, _state: import("./_types.mjs").DataModelUpdateState): object;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): object;
    migrateData(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined, _state?: import("./_types.mjs").DataModelUpdateState | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
/**
 * The data model for a circle shape.
 */
export class CircleShapeData extends CircleShapeData_base {
    /** @override */
    override _createClipperPolyTree(): any[];
    /** @inheritDoc */
    sampleInterior(out: any): any;
    /** @inheritDoc */
    sampleBoundary(out: any): any;
    /** @override */
    override _rotate(angle: any): void;
    /** @inheritDoc */
    drawShape(graphics: any): void;
    /** @override */
    override _createControlHandles(): {
        translate: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        scale: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
    };
    /** @override */
    override moveControlHandle(name: any, destination: any, { snap }?: {
        snap?: boolean | undefined;
    }): void;
    /** @override */
    override _onDragMove(event: any): void;
}
declare const EllipseShapeData_base: {
    new (data: any, options: any): {
        /**
         * The scene that this shape is placed in, if any.
         * @type {Scene|null}
         */
        readonly scene: Scene | null;
        "__#108@#scene": any;
        /**
         * The grid that this shape is placed in.
         * @type {BaseGrid}
         */
        readonly grid: BaseGrid<foundry.grid.types.GridCoordinates2D, foundry.grid.types.GridCoordinates3D>;
        /**
         * The gridless version of the grid that this shape is placed in.
         * @type {GridlessGrid}
         */
        readonly gridlessGrid: GridlessGrid;
        /**
         * Is this shape empty?
         * @type {boolean}
         */
        readonly isEmpty: boolean;
        /**
         * The polygons of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ReadonlyArray<PIXI.Polygon>}
         */
        readonly polygons: readonly PIXI.Polygon[];
        /**
         * The polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {PolygonTree}
         */
        readonly polygonTree: PolygonTree;
        "__#108@#polygonTree": any;
        /**
         * The Clipper paths of this shape.
         * The winding numbers are 1 or 0.
         *
         * The value of this property must not be mutated.
         * @type {DeepReadonly<ClipperPoint[][]>}
         */
        readonly clipperPaths: readonly (readonly DeepReadonly<ClipperPoint>[])[];
        /**
         * The Clipper polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ClipperLib.PolyTree}
         */
        readonly clipperPolyTree: ClipperLib.PolyTree;
        "__#108@#clipperPolyTree": any;
        /**
         * The triangulation of this shape.
         *
         * The value of this property must not be mutated.
         * @type {Readonly<{vertices: Float32Array; indices: Uint16Array|Uint32Array}>}
         */
        readonly triangulation: Readonly<{
            vertices: Float32Array;
            indices: Uint16Array | Uint32Array;
        }>;
        /**
         * The bounds of this Region.
         *
         * The value of this property must not be mutated.
         * @type {PIXI.Rectangle}
         */
        readonly bounds: PIXI.Rectangle;
        /**
         * The origin of this shape.
         * @type {Readonly<Point>}
         */
        readonly origin: Readonly<Point>;
        "__#108@#origin": any;
        /**
         * The center point of this shape.
         * @type {Readonly<Point>}
         */
        readonly center: Readonly<Point>;
        "__#108@#center": any;
        /**
         * The area of this shape.
         * @type {number}
         */
        readonly area: number;
        "__#108@#area": any;
        /**
         * The measured segments of this shape.
         * Each segment consist of a ray, winding order, distance in grid units, and the angle in degrees if it has one.
         * The ray represents the measured segment. If the winding order is ...
         *  - 1, the segment is an edge in positive orientation.
         *  - -1, the segment is an edge in negative orientation.
         *  - 0, the segment is not an edge.
         *
         * The distance is the actual grid distance if the shape is grid-based.
         * Otherwise the distance is the distance in pixels divided by of the ratio of grid distance and grid size.
         * @type {DeepReadonly<{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]>}
         */
        readonly measuredSegments: readonly DeepReadonly<{
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }>[];
        "__#108@#measuredSegments": any;
        /**
         * The control handles of this shape.
         * Each handle has a position and a rotation in radians.
         * @type {DeepReadonly<{[name: string]: {position: Point; rotation: number; visible: boolean}}>}
         */
        readonly controlHandles: DeepReadonly<{
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        }>;
        "__#108@#controlHandles": any;
        /** @inheritDoc */
        _updateCommit(copy: any, diff: any, options: any, state: any): void;
        /** @inheritDoc */
        clone(data: any, context: any): foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext> | Promise<foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext>>;
        /**
         * Called when the shape was changed.
         * This function is not called when just the hole state is changed.
         * This function is not called if grid-based is changed and the grid is gridless.
         * @protected
         */
        _onShapeChange(): void;
        /**
         * Called when the grid this shape is placed in changes.
         * @param {object} changed    The changes to the grid.
         * @protected
         */
        _onGridChange(changed: object): void;
        /**
         * Is this shape currently affected by the grid?
         * @returns {boolean}
         */
        readonly isAffectedByGrid: boolean;
        /**
         * Whether the shape is identical to itself after a rotation around its origin.
         * @returns {boolean}
         */
        readonly hasRotationalSymmetry: boolean;
        /**
         * Create a ray.
         * @param {number} x             The x-coordinate of the origin of the ray.
         * @param {number} y             The y-coordinate of the origin of the ray.
         * @param {number} direction     The direction of the ray in degrees.
         * @param {number} length        The length of the ray in pixels.
         * @param {number} [alignment=0] The alignment to ray.
         * @returns {Ray}
         * @internal
         */
        _createRay(x: number, y: number, direction: number, length: number, alignment?: number | undefined): Ray;
        /**
         * Snap the given point.
         * @param {Point} point    The point that is to be snapped.
         * @returns {Point}        The snapped point.
         * @internal
         */
        _getSnappedPoint(point: Point): Point;
        /**
         * Get the size for the given ray defined by a length and direction.
         * @param {number} length       The length of the ray in pixels.
         * @param {number} direction    The direction of the ray in radians.
         * @param {object} [options]                   Additional options.
         * @param {boolean} [options.snap=false]       Snap the size to with defined grid snapping precision?
         * @param {boolean} [options.round]            Round the size to integer?
         * @param {boolean} [options.allowZero=false]  Allow the size to be zero?
         * @returns {number}            The snapped size in pixels.
         * @internal
         */
        _calculateSize(length: number, direction: number, { snap, round, allowZero }?: {
            snap?: boolean | undefined;
            round?: boolean | undefined;
            allowZero?: boolean | undefined;
        } | undefined): number;
        /**
         * Snap the given rotation.
         * @param {number} rotation    The rotation to be snapped in degrees.
         * @returns {number}           The snapped rotation in degrees.
         * @internal
         */
        _getSnappedRotation(rotation: number): number;
        /**
         * Test whether given point is contained within this shape.
         * @param {Point} point    The point.
         * @returns {boolean}
         */
        testPoint(point: Point): boolean;
        /**
         * Create the Clipper polygon tree of this shape.
         * This function may return a single positively-orientated and non-selfintersecting Clipper path instead of a tree,
         * which is automatically converted to a Clipper polygon tree.
         * This function is called only once. It is not called if the shape is empty.
         * @returns {ClipperLib.PolyTree|ClipperPoint[]|Point[]|number[]}
         * @protected
         * @abstract
         */
        _createClipperPolyTree(): ClipperLib.PolyTree | ClipperPoint[] | Point[] | number[];
        /**
         * Create the origin point of this shape.
         * @returns {Point}
         * @protected
         */
        _createOrigin(): Point;
        /**
         * Create the center point of this shape.
         * @returns {Point}
         * @protected
         */
        _createCenter(): Point;
        /**
         * Calculate the area of this shape.
         * @returns {number}
         * @protected
         */
        _calculateArea(): number;
        /**
         * Move the shape to the given origin.
         * @param {Point} origin                    The (unsnapped) origin.
         * @param {object} [options]                Additional options.
         * @param {boolean} [options.snap=false]    Snap the origin?
         */
        move(origin: Point, { snap }?: {
            snap?: boolean | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin (or pivot).
         * @param {number} angle           The angle in degrees.
         * @param {object} [options]       Additional options.
         * @param {Point} [options.pivot]  The pivot of rotation. Default: origin.
         */
        rotate(angle: number, { pivot }?: {
            pivot?: Point | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin.
         * @param {number} angle    The angle in degrees.
         * @protected
         */
        _rotate(angle: number): void;
        /**
         * Draw the shape into the Graphics element.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawShape(graphics: PIXI.Graphics): void;
        /**
         * Draw reference lines of the shape into the Graphics element, if it has any.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawReferenceLines(graphics: PIXI.Graphics): void;
        /**
         * Create a measured segment.
         * @param {number} x           The x-coordinate of the origin of the ray.
         * @param {number} y           The y-coordinate of the origin of the ray.
         * @param {number} direction   The direction of the ray in degrees.
         * @param {number} length      The length of the ray in pixels.
         * @param {number} alignment   The alignment of the ray.
         * @param {-1|0|1} winding     The winding order.
         * @param {number} [angle]     The angle in degrees.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}}
         * @internal
         */
        _createMeasuredSegment(x: number, y: number, direction: number, length: number, alignment: number, winding: -1 | 0 | 1, angle?: number | undefined): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        };
        /**
         * Create the measured segments of this shape.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]}
         * @protected
         * @abstract
         */
        _createMeasuredSegments(): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }[];
        /**
         * Get the control handles for this shape.
         * @returns {{[name: string]: {position: Point; rotation: number; visible: boolean}}}
         *   The position, rotation in radians, and visible state for each handle.
         * @abstract
         */
        _createControlHandles(): {
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        };
        /**
         * Move the control handle to the destination position.
         * @param {string} name                       The handle name.
         * @param {Point} destination                 The destination of the handle.
         * @param {object} [options]                  Additional options.
         * @param {boolean} [options.snap=false]      Snapping?
         * @param {boolean} [options.unlinked=false]  Unlinked scaling?
         *
         */
        moveControlHandle(name: string, destination: Point, options?: {
            snap?: boolean | undefined;
            unlinked?: boolean | undefined;
        } | undefined): void;
        /**
         * Transform this shape by moving a scale handle.
         * @param {string} fieldName    The field name of the axis that is scaled.
         * @param {Point} origin        The origin.
         * @param {number} direction    The direction of the axis in degrees.
         * @param {number} alignment    The alignment of the axis.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @param {boolean} [allowZero=false]    Allow zero size?
         * @param {number} [max]                 The maximum value.
         * @internal
         */
        _moveScaleHandle(fieldName: string, origin: Point, direction: number, alignment: number, destination: Point, snap: boolean, allowZero?: boolean | undefined, max?: number | undefined): void;
        /**
         * Transform this shape by moving a rotation handle.
         * @param {number} direction    The direction of the rotation handle in degrees.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveRotationHandle(direction: number, destination: Point, snap: boolean): void;
        /**
         * Transform this shape by moving the sweep handle.
         * @param {number} maxAngle     The maximum angle possible.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveSweepHandle(maxAngle: number, destination: Point, snap: boolean): void;
        /**
         * Handle the drag start event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @internal
         */
        _onDragStart(event: PIXI.FederatedEvent): void;
        /**
         * Handle the drag move event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @abstract
         * @internal
         */
        _onDragMove(event: PIXI.FederatedEvent): void;
        /**
         * Sample a point from the shape interior.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleInterior(out?: Point | undefined): Point;
        /**
         * Sample a point from the shape boundary.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleBoundary(out?: Point | undefined): Point;
        _index: number | undefined;
        _configure(options?: object | undefined): void;
        _source: object;
        parent: foundry.abstract.DataModel | null;
        readonly schema: import("./fields.mjs").DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
            joint: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): import("./fields.mjs").DataField | undefined;
        _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DataModelConstructionContext | undefined): object;
        _getInnerModel(field: import("./fields.mjs").DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, import("./fields.mjs").DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): import("../../common/data/validation-failure.mjs").DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): object;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    };
    /**
     * The distance snapping precision.
     * @type {number}
     */
    "__#108@#DISTANCE_SNAPPING_PRECISION": number;
    /**
     * The rotation snapping interval.
     * @type {number}
     */
    "__#108@#ROTATION_SNAPPING_INTERVAL": number;
    /**
     * Convert a path to a clipper path.
     * @param {ClipperPoint[]|Point[]|number[]} path    A path
     * @returns {ClipperPoint[]}
     * @internal
     */
    _toClipperPath(path: ClipperPoint[] | Point[] | number[]): ClipperPoint[];
    LOCALIZATION_PREFIXES: string[];
    readonly TYPES: Readonly<{
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
    TYPE: string;
    defineSchema(): {
        type: import("./fields.mjs").StringField;
        hole: import("./fields.mjs").BooleanField;
    };
    _schema: import("./fields.mjs").DataModelSchemaField;
    readonly schema: import("./fields.mjs").DataModelSchemaField;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: import("./_types.mjs").DataModelCleaningOptions | undefined, _state?: Partial<import("./_types.mjs").DataModelUpdateState> | undefined): object;
    _preCleanData(data: object, options: import("./_types.mjs").DataModelCleaningOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
    _cleanData(data: object, options: Readonly<import("./_types.mjs").DataModelCleaningOptions>, _state: import("./_types.mjs").DataModelUpdateState): object;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): object;
    migrateData(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined, _state?: import("./_types.mjs").DataModelUpdateState | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
/**
 * The data model for an ellipse shape.
 */
export class EllipseShapeData extends EllipseShapeData_base {
    /**
     * Get the rays for both axes.
     * @returns {{axisX: Ray; axisY: Ray}}
     * @internal
     */
    _getRays(): {
        axisX: Ray;
        axisY: Ray;
    };
    /** @override */
    override _createClipperPolyTree(): any[];
    /** @inheritDoc */
    sampleInterior(out: any): any;
    /** @inheritDoc */
    drawShape(graphics: any): void;
    /** @override */
    override _createMeasuredSegments(): {
        ray: Ray;
        winding: number;
        distance: number;
    }[];
    /** @override */
    override _createControlHandles(): {
        translate: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        scaleX: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        scaleY: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        rotate: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
    };
    /** @override */
    override moveControlHandle(name: any, destination: any, { snap }?: {
        snap?: boolean | undefined;
    }): void;
    /** @override */
    override _onDragMove(event: any): void;
    #private;
}
declare const ConeShapeData_base: {
    new (data: any, options: any): {
        /**
         * The scene that this shape is placed in, if any.
         * @type {Scene|null}
         */
        readonly scene: Scene | null;
        "__#108@#scene": any;
        /**
         * The grid that this shape is placed in.
         * @type {BaseGrid}
         */
        readonly grid: BaseGrid<foundry.grid.types.GridCoordinates2D, foundry.grid.types.GridCoordinates3D>;
        /**
         * The gridless version of the grid that this shape is placed in.
         * @type {GridlessGrid}
         */
        readonly gridlessGrid: GridlessGrid;
        /**
         * Is this shape empty?
         * @type {boolean}
         */
        readonly isEmpty: boolean;
        /**
         * The polygons of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ReadonlyArray<PIXI.Polygon>}
         */
        readonly polygons: readonly PIXI.Polygon[];
        /**
         * The polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {PolygonTree}
         */
        readonly polygonTree: PolygonTree;
        "__#108@#polygonTree": any;
        /**
         * The Clipper paths of this shape.
         * The winding numbers are 1 or 0.
         *
         * The value of this property must not be mutated.
         * @type {DeepReadonly<ClipperPoint[][]>}
         */
        readonly clipperPaths: readonly (readonly DeepReadonly<ClipperPoint>[])[];
        /**
         * The Clipper polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ClipperLib.PolyTree}
         */
        readonly clipperPolyTree: ClipperLib.PolyTree;
        "__#108@#clipperPolyTree": any;
        /**
         * The triangulation of this shape.
         *
         * The value of this property must not be mutated.
         * @type {Readonly<{vertices: Float32Array; indices: Uint16Array|Uint32Array}>}
         */
        readonly triangulation: Readonly<{
            vertices: Float32Array;
            indices: Uint16Array | Uint32Array;
        }>;
        /**
         * The bounds of this Region.
         *
         * The value of this property must not be mutated.
         * @type {PIXI.Rectangle}
         */
        readonly bounds: PIXI.Rectangle;
        /**
         * The origin of this shape.
         * @type {Readonly<Point>}
         */
        readonly origin: Readonly<Point>;
        "__#108@#origin": any;
        /**
         * The center point of this shape.
         * @type {Readonly<Point>}
         */
        readonly center: Readonly<Point>;
        "__#108@#center": any;
        /**
         * The area of this shape.
         * @type {number}
         */
        readonly area: number;
        "__#108@#area": any;
        /**
         * The measured segments of this shape.
         * Each segment consist of a ray, winding order, distance in grid units, and the angle in degrees if it has one.
         * The ray represents the measured segment. If the winding order is ...
         *  - 1, the segment is an edge in positive orientation.
         *  - -1, the segment is an edge in negative orientation.
         *  - 0, the segment is not an edge.
         *
         * The distance is the actual grid distance if the shape is grid-based.
         * Otherwise the distance is the distance in pixels divided by of the ratio of grid distance and grid size.
         * @type {DeepReadonly<{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]>}
         */
        readonly measuredSegments: readonly DeepReadonly<{
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }>[];
        "__#108@#measuredSegments": any;
        /**
         * The control handles of this shape.
         * Each handle has a position and a rotation in radians.
         * @type {DeepReadonly<{[name: string]: {position: Point; rotation: number; visible: boolean}}>}
         */
        readonly controlHandles: DeepReadonly<{
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        }>;
        "__#108@#controlHandles": any;
        /** @inheritDoc */
        _updateCommit(copy: any, diff: any, options: any, state: any): void;
        /** @inheritDoc */
        clone(data: any, context: any): foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext> | Promise<foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext>>;
        /**
         * Called when the shape was changed.
         * This function is not called when just the hole state is changed.
         * This function is not called if grid-based is changed and the grid is gridless.
         * @protected
         */
        _onShapeChange(): void;
        /**
         * Called when the grid this shape is placed in changes.
         * @param {object} changed    The changes to the grid.
         * @protected
         */
        _onGridChange(changed: object): void;
        /**
         * Is this shape currently affected by the grid?
         * @returns {boolean}
         */
        readonly isAffectedByGrid: boolean;
        /**
         * Whether the shape is identical to itself after a rotation around its origin.
         * @returns {boolean}
         */
        readonly hasRotationalSymmetry: boolean;
        /**
         * Create a ray.
         * @param {number} x             The x-coordinate of the origin of the ray.
         * @param {number} y             The y-coordinate of the origin of the ray.
         * @param {number} direction     The direction of the ray in degrees.
         * @param {number} length        The length of the ray in pixels.
         * @param {number} [alignment=0] The alignment to ray.
         * @returns {Ray}
         * @internal
         */
        _createRay(x: number, y: number, direction: number, length: number, alignment?: number | undefined): Ray;
        /**
         * Snap the given point.
         * @param {Point} point    The point that is to be snapped.
         * @returns {Point}        The snapped point.
         * @internal
         */
        _getSnappedPoint(point: Point): Point;
        /**
         * Get the size for the given ray defined by a length and direction.
         * @param {number} length       The length of the ray in pixels.
         * @param {number} direction    The direction of the ray in radians.
         * @param {object} [options]                   Additional options.
         * @param {boolean} [options.snap=false]       Snap the size to with defined grid snapping precision?
         * @param {boolean} [options.round]            Round the size to integer?
         * @param {boolean} [options.allowZero=false]  Allow the size to be zero?
         * @returns {number}            The snapped size in pixels.
         * @internal
         */
        _calculateSize(length: number, direction: number, { snap, round, allowZero }?: {
            snap?: boolean | undefined;
            round?: boolean | undefined;
            allowZero?: boolean | undefined;
        } | undefined): number;
        /**
         * Snap the given rotation.
         * @param {number} rotation    The rotation to be snapped in degrees.
         * @returns {number}           The snapped rotation in degrees.
         * @internal
         */
        _getSnappedRotation(rotation: number): number;
        /**
         * Test whether given point is contained within this shape.
         * @param {Point} point    The point.
         * @returns {boolean}
         */
        testPoint(point: Point): boolean;
        /**
         * Create the Clipper polygon tree of this shape.
         * This function may return a single positively-orientated and non-selfintersecting Clipper path instead of a tree,
         * which is automatically converted to a Clipper polygon tree.
         * This function is called only once. It is not called if the shape is empty.
         * @returns {ClipperLib.PolyTree|ClipperPoint[]|Point[]|number[]}
         * @protected
         * @abstract
         */
        _createClipperPolyTree(): ClipperLib.PolyTree | ClipperPoint[] | Point[] | number[];
        /**
         * Create the origin point of this shape.
         * @returns {Point}
         * @protected
         */
        _createOrigin(): Point;
        /**
         * Create the center point of this shape.
         * @returns {Point}
         * @protected
         */
        _createCenter(): Point;
        /**
         * Calculate the area of this shape.
         * @returns {number}
         * @protected
         */
        _calculateArea(): number;
        /**
         * Move the shape to the given origin.
         * @param {Point} origin                    The (unsnapped) origin.
         * @param {object} [options]                Additional options.
         * @param {boolean} [options.snap=false]    Snap the origin?
         */
        move(origin: Point, { snap }?: {
            snap?: boolean | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin (or pivot).
         * @param {number} angle           The angle in degrees.
         * @param {object} [options]       Additional options.
         * @param {Point} [options.pivot]  The pivot of rotation. Default: origin.
         */
        rotate(angle: number, { pivot }?: {
            pivot?: Point | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin.
         * @param {number} angle    The angle in degrees.
         * @protected
         */
        _rotate(angle: number): void;
        /**
         * Draw the shape into the Graphics element.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawShape(graphics: PIXI.Graphics): void;
        /**
         * Draw reference lines of the shape into the Graphics element, if it has any.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawReferenceLines(graphics: PIXI.Graphics): void;
        /**
         * Create a measured segment.
         * @param {number} x           The x-coordinate of the origin of the ray.
         * @param {number} y           The y-coordinate of the origin of the ray.
         * @param {number} direction   The direction of the ray in degrees.
         * @param {number} length      The length of the ray in pixels.
         * @param {number} alignment   The alignment of the ray.
         * @param {-1|0|1} winding     The winding order.
         * @param {number} [angle]     The angle in degrees.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}}
         * @internal
         */
        _createMeasuredSegment(x: number, y: number, direction: number, length: number, alignment: number, winding: -1 | 0 | 1, angle?: number | undefined): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        };
        /**
         * Create the measured segments of this shape.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]}
         * @protected
         * @abstract
         */
        _createMeasuredSegments(): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }[];
        /**
         * Get the control handles for this shape.
         * @returns {{[name: string]: {position: Point; rotation: number; visible: boolean}}}
         *   The position, rotation in radians, and visible state for each handle.
         * @abstract
         */
        _createControlHandles(): {
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        };
        /**
         * Move the control handle to the destination position.
         * @param {string} name                       The handle name.
         * @param {Point} destination                 The destination of the handle.
         * @param {object} [options]                  Additional options.
         * @param {boolean} [options.snap=false]      Snapping?
         * @param {boolean} [options.unlinked=false]  Unlinked scaling?
         *
         */
        moveControlHandle(name: string, destination: Point, options?: {
            snap?: boolean | undefined;
            unlinked?: boolean | undefined;
        } | undefined): void;
        /**
         * Transform this shape by moving a scale handle.
         * @param {string} fieldName    The field name of the axis that is scaled.
         * @param {Point} origin        The origin.
         * @param {number} direction    The direction of the axis in degrees.
         * @param {number} alignment    The alignment of the axis.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @param {boolean} [allowZero=false]    Allow zero size?
         * @param {number} [max]                 The maximum value.
         * @internal
         */
        _moveScaleHandle(fieldName: string, origin: Point, direction: number, alignment: number, destination: Point, snap: boolean, allowZero?: boolean | undefined, max?: number | undefined): void;
        /**
         * Transform this shape by moving a rotation handle.
         * @param {number} direction    The direction of the rotation handle in degrees.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveRotationHandle(direction: number, destination: Point, snap: boolean): void;
        /**
         * Transform this shape by moving the sweep handle.
         * @param {number} maxAngle     The maximum angle possible.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveSweepHandle(maxAngle: number, destination: Point, snap: boolean): void;
        /**
         * Handle the drag start event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @internal
         */
        _onDragStart(event: PIXI.FederatedEvent): void;
        /**
         * Handle the drag move event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @abstract
         * @internal
         */
        _onDragMove(event: PIXI.FederatedEvent): void;
        /**
         * Sample a point from the shape interior.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleInterior(out?: Point | undefined): Point;
        /**
         * Sample a point from the shape boundary.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleBoundary(out?: Point | undefined): Point;
        _index: number | undefined;
        _configure(options?: object | undefined): void;
        _source: object;
        parent: foundry.abstract.DataModel | null;
        readonly schema: import("./fields.mjs").DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
            joint: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): import("./fields.mjs").DataField | undefined;
        _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DataModelConstructionContext | undefined): object;
        _getInnerModel(field: import("./fields.mjs").DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, import("./fields.mjs").DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): import("../../common/data/validation-failure.mjs").DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): object;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    };
    /**
     * The distance snapping precision.
     * @type {number}
     */
    "__#108@#DISTANCE_SNAPPING_PRECISION": number;
    /**
     * The rotation snapping interval.
     * @type {number}
     */
    "__#108@#ROTATION_SNAPPING_INTERVAL": number;
    /**
     * Convert a path to a clipper path.
     * @param {ClipperPoint[]|Point[]|number[]} path    A path
     * @returns {ClipperPoint[]}
     * @internal
     */
    _toClipperPath(path: ClipperPoint[] | Point[] | number[]): ClipperPoint[];
    LOCALIZATION_PREFIXES: string[];
    readonly TYPES: Readonly<{
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
    TYPE: string;
    defineSchema(): {
        type: import("./fields.mjs").StringField;
        hole: import("./fields.mjs").BooleanField;
    };
    _schema: import("./fields.mjs").DataModelSchemaField;
    readonly schema: import("./fields.mjs").DataModelSchemaField;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: import("./_types.mjs").DataModelCleaningOptions | undefined, _state?: Partial<import("./_types.mjs").DataModelUpdateState> | undefined): object;
    _preCleanData(data: object, options: import("./_types.mjs").DataModelCleaningOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
    _cleanData(data: object, options: Readonly<import("./_types.mjs").DataModelCleaningOptions>, _state: import("./_types.mjs").DataModelUpdateState): object;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): object;
    migrateData(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined, _state?: import("./_types.mjs").DataModelUpdateState | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
/**
 * The data model for a cone shape.
 */
export class ConeShapeData extends ConeShapeData_base {
    /**
     * Get the left, center, and right rays of this cone.
     * @returns {{left: Ray; center: Ray; right: Ray}}
     * @internal
     */
    _getRays(): {
        left: Ray;
        center: Ray;
        right: Ray;
    };
    /** @override */
    override _createCenter(): any;
    /** @override */
    override _createMeasuredSegments(): {
        ray: Ray;
        winding: number;
        distance: number;
        angle: any;
    }[];
    /** @override */
    override _createControlHandles(): {
        translate: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        scale: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        sweep: {
            position: Object;
            rotation: number;
            visible: boolean;
        };
        rotate: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
    };
    /** @override */
    override moveControlHandle(name: any, destination: any, { snap }?: {
        snap?: boolean | undefined;
    }): void;
    /** @override */
    override _onDragMove(event: any): void;
    #private;
}
declare const RingShapeData_base: {
    new (data: any, options: any): {
        /**
         * The scene that this shape is placed in, if any.
         * @type {Scene|null}
         */
        readonly scene: Scene | null;
        "__#108@#scene": any;
        /**
         * The grid that this shape is placed in.
         * @type {BaseGrid}
         */
        readonly grid: BaseGrid<foundry.grid.types.GridCoordinates2D, foundry.grid.types.GridCoordinates3D>;
        /**
         * The gridless version of the grid that this shape is placed in.
         * @type {GridlessGrid}
         */
        readonly gridlessGrid: GridlessGrid;
        /**
         * Is this shape empty?
         * @type {boolean}
         */
        readonly isEmpty: boolean;
        /**
         * The polygons of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ReadonlyArray<PIXI.Polygon>}
         */
        readonly polygons: readonly PIXI.Polygon[];
        /**
         * The polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {PolygonTree}
         */
        readonly polygonTree: PolygonTree;
        "__#108@#polygonTree": any;
        /**
         * The Clipper paths of this shape.
         * The winding numbers are 1 or 0.
         *
         * The value of this property must not be mutated.
         * @type {DeepReadonly<ClipperPoint[][]>}
         */
        readonly clipperPaths: readonly (readonly DeepReadonly<ClipperPoint>[])[];
        /**
         * The Clipper polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ClipperLib.PolyTree}
         */
        readonly clipperPolyTree: ClipperLib.PolyTree;
        "__#108@#clipperPolyTree": any;
        /**
         * The triangulation of this shape.
         *
         * The value of this property must not be mutated.
         * @type {Readonly<{vertices: Float32Array; indices: Uint16Array|Uint32Array}>}
         */
        readonly triangulation: Readonly<{
            vertices: Float32Array;
            indices: Uint16Array | Uint32Array;
        }>;
        /**
         * The bounds of this Region.
         *
         * The value of this property must not be mutated.
         * @type {PIXI.Rectangle}
         */
        readonly bounds: PIXI.Rectangle;
        /**
         * The origin of this shape.
         * @type {Readonly<Point>}
         */
        readonly origin: Readonly<Point>;
        "__#108@#origin": any;
        /**
         * The center point of this shape.
         * @type {Readonly<Point>}
         */
        readonly center: Readonly<Point>;
        "__#108@#center": any;
        /**
         * The area of this shape.
         * @type {number}
         */
        readonly area: number;
        "__#108@#area": any;
        /**
         * The measured segments of this shape.
         * Each segment consist of a ray, winding order, distance in grid units, and the angle in degrees if it has one.
         * The ray represents the measured segment. If the winding order is ...
         *  - 1, the segment is an edge in positive orientation.
         *  - -1, the segment is an edge in negative orientation.
         *  - 0, the segment is not an edge.
         *
         * The distance is the actual grid distance if the shape is grid-based.
         * Otherwise the distance is the distance in pixels divided by of the ratio of grid distance and grid size.
         * @type {DeepReadonly<{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]>}
         */
        readonly measuredSegments: readonly DeepReadonly<{
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }>[];
        "__#108@#measuredSegments": any;
        /**
         * The control handles of this shape.
         * Each handle has a position and a rotation in radians.
         * @type {DeepReadonly<{[name: string]: {position: Point; rotation: number; visible: boolean}}>}
         */
        readonly controlHandles: DeepReadonly<{
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        }>;
        "__#108@#controlHandles": any;
        /** @inheritDoc */
        _updateCommit(copy: any, diff: any, options: any, state: any): void;
        /** @inheritDoc */
        clone(data: any, context: any): foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext> | Promise<foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext>>;
        /**
         * Called when the shape was changed.
         * This function is not called when just the hole state is changed.
         * This function is not called if grid-based is changed and the grid is gridless.
         * @protected
         */
        _onShapeChange(): void;
        /**
         * Called when the grid this shape is placed in changes.
         * @param {object} changed    The changes to the grid.
         * @protected
         */
        _onGridChange(changed: object): void;
        /**
         * Is this shape currently affected by the grid?
         * @returns {boolean}
         */
        readonly isAffectedByGrid: boolean;
        /**
         * Whether the shape is identical to itself after a rotation around its origin.
         * @returns {boolean}
         */
        readonly hasRotationalSymmetry: boolean;
        /**
         * Create a ray.
         * @param {number} x             The x-coordinate of the origin of the ray.
         * @param {number} y             The y-coordinate of the origin of the ray.
         * @param {number} direction     The direction of the ray in degrees.
         * @param {number} length        The length of the ray in pixels.
         * @param {number} [alignment=0] The alignment to ray.
         * @returns {Ray}
         * @internal
         */
        _createRay(x: number, y: number, direction: number, length: number, alignment?: number | undefined): Ray;
        /**
         * Snap the given point.
         * @param {Point} point    The point that is to be snapped.
         * @returns {Point}        The snapped point.
         * @internal
         */
        _getSnappedPoint(point: Point): Point;
        /**
         * Get the size for the given ray defined by a length and direction.
         * @param {number} length       The length of the ray in pixels.
         * @param {number} direction    The direction of the ray in radians.
         * @param {object} [options]                   Additional options.
         * @param {boolean} [options.snap=false]       Snap the size to with defined grid snapping precision?
         * @param {boolean} [options.round]            Round the size to integer?
         * @param {boolean} [options.allowZero=false]  Allow the size to be zero?
         * @returns {number}            The snapped size in pixels.
         * @internal
         */
        _calculateSize(length: number, direction: number, { snap, round, allowZero }?: {
            snap?: boolean | undefined;
            round?: boolean | undefined;
            allowZero?: boolean | undefined;
        } | undefined): number;
        /**
         * Snap the given rotation.
         * @param {number} rotation    The rotation to be snapped in degrees.
         * @returns {number}           The snapped rotation in degrees.
         * @internal
         */
        _getSnappedRotation(rotation: number): number;
        /**
         * Test whether given point is contained within this shape.
         * @param {Point} point    The point.
         * @returns {boolean}
         */
        testPoint(point: Point): boolean;
        /**
         * Create the Clipper polygon tree of this shape.
         * This function may return a single positively-orientated and non-selfintersecting Clipper path instead of a tree,
         * which is automatically converted to a Clipper polygon tree.
         * This function is called only once. It is not called if the shape is empty.
         * @returns {ClipperLib.PolyTree|ClipperPoint[]|Point[]|number[]}
         * @protected
         * @abstract
         */
        _createClipperPolyTree(): ClipperLib.PolyTree | ClipperPoint[] | Point[] | number[];
        /**
         * Create the origin point of this shape.
         * @returns {Point}
         * @protected
         */
        _createOrigin(): Point;
        /**
         * Create the center point of this shape.
         * @returns {Point}
         * @protected
         */
        _createCenter(): Point;
        /**
         * Calculate the area of this shape.
         * @returns {number}
         * @protected
         */
        _calculateArea(): number;
        /**
         * Move the shape to the given origin.
         * @param {Point} origin                    The (unsnapped) origin.
         * @param {object} [options]                Additional options.
         * @param {boolean} [options.snap=false]    Snap the origin?
         */
        move(origin: Point, { snap }?: {
            snap?: boolean | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin (or pivot).
         * @param {number} angle           The angle in degrees.
         * @param {object} [options]       Additional options.
         * @param {Point} [options.pivot]  The pivot of rotation. Default: origin.
         */
        rotate(angle: number, { pivot }?: {
            pivot?: Point | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin.
         * @param {number} angle    The angle in degrees.
         * @protected
         */
        _rotate(angle: number): void;
        /**
         * Draw the shape into the Graphics element.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawShape(graphics: PIXI.Graphics): void;
        /**
         * Draw reference lines of the shape into the Graphics element, if it has any.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawReferenceLines(graphics: PIXI.Graphics): void;
        /**
         * Create a measured segment.
         * @param {number} x           The x-coordinate of the origin of the ray.
         * @param {number} y           The y-coordinate of the origin of the ray.
         * @param {number} direction   The direction of the ray in degrees.
         * @param {number} length      The length of the ray in pixels.
         * @param {number} alignment   The alignment of the ray.
         * @param {-1|0|1} winding     The winding order.
         * @param {number} [angle]     The angle in degrees.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}}
         * @internal
         */
        _createMeasuredSegment(x: number, y: number, direction: number, length: number, alignment: number, winding: -1 | 0 | 1, angle?: number | undefined): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        };
        /**
         * Create the measured segments of this shape.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]}
         * @protected
         * @abstract
         */
        _createMeasuredSegments(): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }[];
        /**
         * Get the control handles for this shape.
         * @returns {{[name: string]: {position: Point; rotation: number; visible: boolean}}}
         *   The position, rotation in radians, and visible state for each handle.
         * @abstract
         */
        _createControlHandles(): {
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        };
        /**
         * Move the control handle to the destination position.
         * @param {string} name                       The handle name.
         * @param {Point} destination                 The destination of the handle.
         * @param {object} [options]                  Additional options.
         * @param {boolean} [options.snap=false]      Snapping?
         * @param {boolean} [options.unlinked=false]  Unlinked scaling?
         *
         */
        moveControlHandle(name: string, destination: Point, options?: {
            snap?: boolean | undefined;
            unlinked?: boolean | undefined;
        } | undefined): void;
        /**
         * Transform this shape by moving a scale handle.
         * @param {string} fieldName    The field name of the axis that is scaled.
         * @param {Point} origin        The origin.
         * @param {number} direction    The direction of the axis in degrees.
         * @param {number} alignment    The alignment of the axis.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @param {boolean} [allowZero=false]    Allow zero size?
         * @param {number} [max]                 The maximum value.
         * @internal
         */
        _moveScaleHandle(fieldName: string, origin: Point, direction: number, alignment: number, destination: Point, snap: boolean, allowZero?: boolean | undefined, max?: number | undefined): void;
        /**
         * Transform this shape by moving a rotation handle.
         * @param {number} direction    The direction of the rotation handle in degrees.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveRotationHandle(direction: number, destination: Point, snap: boolean): void;
        /**
         * Transform this shape by moving the sweep handle.
         * @param {number} maxAngle     The maximum angle possible.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveSweepHandle(maxAngle: number, destination: Point, snap: boolean): void;
        /**
         * Handle the drag start event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @internal
         */
        _onDragStart(event: PIXI.FederatedEvent): void;
        /**
         * Handle the drag move event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @abstract
         * @internal
         */
        _onDragMove(event: PIXI.FederatedEvent): void;
        /**
         * Sample a point from the shape interior.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleInterior(out?: Point | undefined): Point;
        /**
         * Sample a point from the shape boundary.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleBoundary(out?: Point | undefined): Point;
        _index: number | undefined;
        _configure(options?: object | undefined): void;
        _source: object;
        parent: foundry.abstract.DataModel | null;
        readonly schema: import("./fields.mjs").DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
            joint: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): import("./fields.mjs").DataField | undefined;
        _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DataModelConstructionContext | undefined): object;
        _getInnerModel(field: import("./fields.mjs").DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, import("./fields.mjs").DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): import("../../common/data/validation-failure.mjs").DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): object;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    };
    /**
     * The distance snapping precision.
     * @type {number}
     */
    "__#108@#DISTANCE_SNAPPING_PRECISION": number;
    /**
     * The rotation snapping interval.
     * @type {number}
     */
    "__#108@#ROTATION_SNAPPING_INTERVAL": number;
    /**
     * Convert a path to a clipper path.
     * @param {ClipperPoint[]|Point[]|number[]} path    A path
     * @returns {ClipperPoint[]}
     * @internal
     */
    _toClipperPath(path: ClipperPoint[] | Point[] | number[]): ClipperPoint[];
    LOCALIZATION_PREFIXES: string[];
    readonly TYPES: Readonly<{
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
    TYPE: string;
    defineSchema(): {
        type: import("./fields.mjs").StringField;
        hole: import("./fields.mjs").BooleanField;
    };
    _schema: import("./fields.mjs").DataModelSchemaField;
    readonly schema: import("./fields.mjs").DataModelSchemaField;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: import("./_types.mjs").DataModelCleaningOptions | undefined, _state?: Partial<import("./_types.mjs").DataModelUpdateState> | undefined): object;
    _preCleanData(data: object, options: import("./_types.mjs").DataModelCleaningOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
    _cleanData(data: object, options: Readonly<import("./_types.mjs").DataModelCleaningOptions>, _state: import("./_types.mjs").DataModelUpdateState): object;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): object;
    migrateData(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined, _state?: import("./_types.mjs").DataModelUpdateState | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
/**
 * The data model for a ring shape.
 */
export class RingShapeData extends RingShapeData_base {
    /** @inheritDoc */
    sampleInterior(out: any): any;
    /** @inheritDoc */
    sampleBoundary(out: any): any;
    /** @override */
    override _rotate(angle: any): void;
    /** @inheritDoc */
    drawShape(graphics: any): void;
    /** @override */
    override drawReferenceLines(graphics: any): void;
    /** @override */
    override _createMeasuredSegments(): ({
        ray: Ray;
        winding: -1 | 0 | 1;
        distance: number;
        angle?: number;
    } | {
        ray: Ray;
        winding: number;
        distance: number;
    })[];
    /** @override */
    override _createControlHandles(): {
        translate: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        scale: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        inset: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        offset: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
    };
    /** @override */
    override moveControlHandle(name: any, destination: any, { snap }?: {
        snap?: boolean | undefined;
    }): void;
    /** @override */
    override _onDragMove(event: any): void;
    #private;
}
declare const LineShapeData_base: {
    new (data: any, options: any): {
        /**
         * The scene that this shape is placed in, if any.
         * @type {Scene|null}
         */
        readonly scene: Scene | null;
        "__#108@#scene": any;
        /**
         * The grid that this shape is placed in.
         * @type {BaseGrid}
         */
        readonly grid: BaseGrid<foundry.grid.types.GridCoordinates2D, foundry.grid.types.GridCoordinates3D>;
        /**
         * The gridless version of the grid that this shape is placed in.
         * @type {GridlessGrid}
         */
        readonly gridlessGrid: GridlessGrid;
        /**
         * Is this shape empty?
         * @type {boolean}
         */
        readonly isEmpty: boolean;
        /**
         * The polygons of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ReadonlyArray<PIXI.Polygon>}
         */
        readonly polygons: readonly PIXI.Polygon[];
        /**
         * The polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {PolygonTree}
         */
        readonly polygonTree: PolygonTree;
        "__#108@#polygonTree": any;
        /**
         * The Clipper paths of this shape.
         * The winding numbers are 1 or 0.
         *
         * The value of this property must not be mutated.
         * @type {DeepReadonly<ClipperPoint[][]>}
         */
        readonly clipperPaths: readonly (readonly DeepReadonly<ClipperPoint>[])[];
        /**
         * The Clipper polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ClipperLib.PolyTree}
         */
        readonly clipperPolyTree: ClipperLib.PolyTree;
        "__#108@#clipperPolyTree": any;
        /**
         * The triangulation of this shape.
         *
         * The value of this property must not be mutated.
         * @type {Readonly<{vertices: Float32Array; indices: Uint16Array|Uint32Array}>}
         */
        readonly triangulation: Readonly<{
            vertices: Float32Array;
            indices: Uint16Array | Uint32Array;
        }>;
        /**
         * The bounds of this Region.
         *
         * The value of this property must not be mutated.
         * @type {PIXI.Rectangle}
         */
        readonly bounds: PIXI.Rectangle;
        /**
         * The origin of this shape.
         * @type {Readonly<Point>}
         */
        readonly origin: Readonly<Point>;
        "__#108@#origin": any;
        /**
         * The center point of this shape.
         * @type {Readonly<Point>}
         */
        readonly center: Readonly<Point>;
        "__#108@#center": any;
        /**
         * The area of this shape.
         * @type {number}
         */
        readonly area: number;
        "__#108@#area": any;
        /**
         * The measured segments of this shape.
         * Each segment consist of a ray, winding order, distance in grid units, and the angle in degrees if it has one.
         * The ray represents the measured segment. If the winding order is ...
         *  - 1, the segment is an edge in positive orientation.
         *  - -1, the segment is an edge in negative orientation.
         *  - 0, the segment is not an edge.
         *
         * The distance is the actual grid distance if the shape is grid-based.
         * Otherwise the distance is the distance in pixels divided by of the ratio of grid distance and grid size.
         * @type {DeepReadonly<{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]>}
         */
        readonly measuredSegments: readonly DeepReadonly<{
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }>[];
        "__#108@#measuredSegments": any;
        /**
         * The control handles of this shape.
         * Each handle has a position and a rotation in radians.
         * @type {DeepReadonly<{[name: string]: {position: Point; rotation: number; visible: boolean}}>}
         */
        readonly controlHandles: DeepReadonly<{
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        }>;
        "__#108@#controlHandles": any;
        /** @inheritDoc */
        _updateCommit(copy: any, diff: any, options: any, state: any): void;
        /** @inheritDoc */
        clone(data: any, context: any): foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext> | Promise<foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext>>;
        /**
         * Called when the shape was changed.
         * This function is not called when just the hole state is changed.
         * This function is not called if grid-based is changed and the grid is gridless.
         * @protected
         */
        _onShapeChange(): void;
        /**
         * Called when the grid this shape is placed in changes.
         * @param {object} changed    The changes to the grid.
         * @protected
         */
        _onGridChange(changed: object): void;
        /**
         * Is this shape currently affected by the grid?
         * @returns {boolean}
         */
        readonly isAffectedByGrid: boolean;
        /**
         * Whether the shape is identical to itself after a rotation around its origin.
         * @returns {boolean}
         */
        readonly hasRotationalSymmetry: boolean;
        /**
         * Create a ray.
         * @param {number} x             The x-coordinate of the origin of the ray.
         * @param {number} y             The y-coordinate of the origin of the ray.
         * @param {number} direction     The direction of the ray in degrees.
         * @param {number} length        The length of the ray in pixels.
         * @param {number} [alignment=0] The alignment to ray.
         * @returns {Ray}
         * @internal
         */
        _createRay(x: number, y: number, direction: number, length: number, alignment?: number | undefined): Ray;
        /**
         * Snap the given point.
         * @param {Point} point    The point that is to be snapped.
         * @returns {Point}        The snapped point.
         * @internal
         */
        _getSnappedPoint(point: Point): Point;
        /**
         * Get the size for the given ray defined by a length and direction.
         * @param {number} length       The length of the ray in pixels.
         * @param {number} direction    The direction of the ray in radians.
         * @param {object} [options]                   Additional options.
         * @param {boolean} [options.snap=false]       Snap the size to with defined grid snapping precision?
         * @param {boolean} [options.round]            Round the size to integer?
         * @param {boolean} [options.allowZero=false]  Allow the size to be zero?
         * @returns {number}            The snapped size in pixels.
         * @internal
         */
        _calculateSize(length: number, direction: number, { snap, round, allowZero }?: {
            snap?: boolean | undefined;
            round?: boolean | undefined;
            allowZero?: boolean | undefined;
        } | undefined): number;
        /**
         * Snap the given rotation.
         * @param {number} rotation    The rotation to be snapped in degrees.
         * @returns {number}           The snapped rotation in degrees.
         * @internal
         */
        _getSnappedRotation(rotation: number): number;
        /**
         * Test whether given point is contained within this shape.
         * @param {Point} point    The point.
         * @returns {boolean}
         */
        testPoint(point: Point): boolean;
        /**
         * Create the Clipper polygon tree of this shape.
         * This function may return a single positively-orientated and non-selfintersecting Clipper path instead of a tree,
         * which is automatically converted to a Clipper polygon tree.
         * This function is called only once. It is not called if the shape is empty.
         * @returns {ClipperLib.PolyTree|ClipperPoint[]|Point[]|number[]}
         * @protected
         * @abstract
         */
        _createClipperPolyTree(): ClipperLib.PolyTree | ClipperPoint[] | Point[] | number[];
        /**
         * Create the origin point of this shape.
         * @returns {Point}
         * @protected
         */
        _createOrigin(): Point;
        /**
         * Create the center point of this shape.
         * @returns {Point}
         * @protected
         */
        _createCenter(): Point;
        /**
         * Calculate the area of this shape.
         * @returns {number}
         * @protected
         */
        _calculateArea(): number;
        /**
         * Move the shape to the given origin.
         * @param {Point} origin                    The (unsnapped) origin.
         * @param {object} [options]                Additional options.
         * @param {boolean} [options.snap=false]    Snap the origin?
         */
        move(origin: Point, { snap }?: {
            snap?: boolean | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin (or pivot).
         * @param {number} angle           The angle in degrees.
         * @param {object} [options]       Additional options.
         * @param {Point} [options.pivot]  The pivot of rotation. Default: origin.
         */
        rotate(angle: number, { pivot }?: {
            pivot?: Point | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin.
         * @param {number} angle    The angle in degrees.
         * @protected
         */
        _rotate(angle: number): void;
        /**
         * Draw the shape into the Graphics element.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawShape(graphics: PIXI.Graphics): void;
        /**
         * Draw reference lines of the shape into the Graphics element, if it has any.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawReferenceLines(graphics: PIXI.Graphics): void;
        /**
         * Create a measured segment.
         * @param {number} x           The x-coordinate of the origin of the ray.
         * @param {number} y           The y-coordinate of the origin of the ray.
         * @param {number} direction   The direction of the ray in degrees.
         * @param {number} length      The length of the ray in pixels.
         * @param {number} alignment   The alignment of the ray.
         * @param {-1|0|1} winding     The winding order.
         * @param {number} [angle]     The angle in degrees.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}}
         * @internal
         */
        _createMeasuredSegment(x: number, y: number, direction: number, length: number, alignment: number, winding: -1 | 0 | 1, angle?: number | undefined): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        };
        /**
         * Create the measured segments of this shape.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]}
         * @protected
         * @abstract
         */
        _createMeasuredSegments(): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }[];
        /**
         * Get the control handles for this shape.
         * @returns {{[name: string]: {position: Point; rotation: number; visible: boolean}}}
         *   The position, rotation in radians, and visible state for each handle.
         * @abstract
         */
        _createControlHandles(): {
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        };
        /**
         * Move the control handle to the destination position.
         * @param {string} name                       The handle name.
         * @param {Point} destination                 The destination of the handle.
         * @param {object} [options]                  Additional options.
         * @param {boolean} [options.snap=false]      Snapping?
         * @param {boolean} [options.unlinked=false]  Unlinked scaling?
         *
         */
        moveControlHandle(name: string, destination: Point, options?: {
            snap?: boolean | undefined;
            unlinked?: boolean | undefined;
        } | undefined): void;
        /**
         * Transform this shape by moving a scale handle.
         * @param {string} fieldName    The field name of the axis that is scaled.
         * @param {Point} origin        The origin.
         * @param {number} direction    The direction of the axis in degrees.
         * @param {number} alignment    The alignment of the axis.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @param {boolean} [allowZero=false]    Allow zero size?
         * @param {number} [max]                 The maximum value.
         * @internal
         */
        _moveScaleHandle(fieldName: string, origin: Point, direction: number, alignment: number, destination: Point, snap: boolean, allowZero?: boolean | undefined, max?: number | undefined): void;
        /**
         * Transform this shape by moving a rotation handle.
         * @param {number} direction    The direction of the rotation handle in degrees.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveRotationHandle(direction: number, destination: Point, snap: boolean): void;
        /**
         * Transform this shape by moving the sweep handle.
         * @param {number} maxAngle     The maximum angle possible.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveSweepHandle(maxAngle: number, destination: Point, snap: boolean): void;
        /**
         * Handle the drag start event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @internal
         */
        _onDragStart(event: PIXI.FederatedEvent): void;
        /**
         * Handle the drag move event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @abstract
         * @internal
         */
        _onDragMove(event: PIXI.FederatedEvent): void;
        /**
         * Sample a point from the shape interior.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleInterior(out?: Point | undefined): Point;
        /**
         * Sample a point from the shape boundary.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleBoundary(out?: Point | undefined): Point;
        _index: number | undefined;
        _configure(options?: object | undefined): void;
        _source: object;
        parent: foundry.abstract.DataModel | null;
        readonly schema: import("./fields.mjs").DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
            joint: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): import("./fields.mjs").DataField | undefined;
        _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DataModelConstructionContext | undefined): object;
        _getInnerModel(field: import("./fields.mjs").DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, import("./fields.mjs").DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): import("../../common/data/validation-failure.mjs").DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): object;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    };
    /**
     * The distance snapping precision.
     * @type {number}
     */
    "__#108@#DISTANCE_SNAPPING_PRECISION": number;
    /**
     * The rotation snapping interval.
     * @type {number}
     */
    "__#108@#ROTATION_SNAPPING_INTERVAL": number;
    /**
     * Convert a path to a clipper path.
     * @param {ClipperPoint[]|Point[]|number[]} path    A path
     * @returns {ClipperPoint[]}
     * @internal
     */
    _toClipperPath(path: ClipperPoint[] | Point[] | number[]): ClipperPoint[];
    LOCALIZATION_PREFIXES: string[];
    readonly TYPES: Readonly<{
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
    TYPE: string;
    defineSchema(): {
        type: import("./fields.mjs").StringField;
        hole: import("./fields.mjs").BooleanField;
    };
    _schema: import("./fields.mjs").DataModelSchemaField;
    readonly schema: import("./fields.mjs").DataModelSchemaField;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: import("./_types.mjs").DataModelCleaningOptions | undefined, _state?: Partial<import("./_types.mjs").DataModelUpdateState> | undefined): object;
    _preCleanData(data: object, options: import("./_types.mjs").DataModelCleaningOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
    _cleanData(data: object, options: Readonly<import("./_types.mjs").DataModelCleaningOptions>, _state: import("./_types.mjs").DataModelUpdateState): object;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): object;
    migrateData(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined, _state?: import("./_types.mjs").DataModelUpdateState | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
/**
 * The data model for a line shape.
 */
export class LineShapeData extends LineShapeData_base {
    /**
     * Get the rays for both axes.
     * @returns {{axisX: Ray; axisY: Ray}}
     * @internal
     */
    _getRays(): {
        axisX: Ray;
        axisY: Ray;
    };
    /** @override */
    override _createClipperPolyTree(): Point[];
    /** @override */
    override _createCenter(): Object;
    /** @inheritDoc */
    sampleInterior(out: any): Point;
    /** @inheritDoc */
    sampleBoundary(out: any): Point;
    /** @override */
    override _createMeasuredSegments(): {
        ray: Ray;
        winding: number;
        distance: number;
    }[];
    /** @override */
    override _createControlHandles(): {
        translate: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        scaleX: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        scaleY: {
            position: {
                x: any;
                y: any;
            };
            rotation: number;
            visible: boolean;
        };
        rotate: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
    };
    /** @override */
    override moveControlHandle(name: any, destination: any, { snap }?: {
        snap?: boolean | undefined;
    }): void;
    /** @override */
    override _onDragMove(event: any): void;
    #private;
}
declare const EmanationShapeData_base: {
    new (data: any, options: any): {
        /**
         * The scene that this shape is placed in, if any.
         * @type {Scene|null}
         */
        readonly scene: Scene | null;
        "__#108@#scene": any;
        /**
         * The grid that this shape is placed in.
         * @type {BaseGrid}
         */
        readonly grid: BaseGrid<foundry.grid.types.GridCoordinates2D, foundry.grid.types.GridCoordinates3D>;
        /**
         * The gridless version of the grid that this shape is placed in.
         * @type {GridlessGrid}
         */
        readonly gridlessGrid: GridlessGrid;
        /**
         * Is this shape empty?
         * @type {boolean}
         */
        readonly isEmpty: boolean;
        /**
         * The polygons of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ReadonlyArray<PIXI.Polygon>}
         */
        readonly polygons: readonly PIXI.Polygon[];
        /**
         * The polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {PolygonTree}
         */
        readonly polygonTree: PolygonTree;
        "__#108@#polygonTree": any;
        /**
         * The Clipper paths of this shape.
         * The winding numbers are 1 or 0.
         *
         * The value of this property must not be mutated.
         * @type {DeepReadonly<ClipperPoint[][]>}
         */
        readonly clipperPaths: readonly (readonly DeepReadonly<ClipperPoint>[])[];
        /**
         * The Clipper polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ClipperLib.PolyTree}
         */
        readonly clipperPolyTree: ClipperLib.PolyTree;
        "__#108@#clipperPolyTree": any;
        /**
         * The triangulation of this shape.
         *
         * The value of this property must not be mutated.
         * @type {Readonly<{vertices: Float32Array; indices: Uint16Array|Uint32Array}>}
         */
        readonly triangulation: Readonly<{
            vertices: Float32Array;
            indices: Uint16Array | Uint32Array;
        }>;
        /**
         * The bounds of this Region.
         *
         * The value of this property must not be mutated.
         * @type {PIXI.Rectangle}
         */
        readonly bounds: PIXI.Rectangle;
        /**
         * The origin of this shape.
         * @type {Readonly<Point>}
         */
        readonly origin: Readonly<Point>;
        "__#108@#origin": any;
        /**
         * The center point of this shape.
         * @type {Readonly<Point>}
         */
        readonly center: Readonly<Point>;
        "__#108@#center": any;
        /**
         * The area of this shape.
         * @type {number}
         */
        readonly area: number;
        "__#108@#area": any;
        /**
         * The measured segments of this shape.
         * Each segment consist of a ray, winding order, distance in grid units, and the angle in degrees if it has one.
         * The ray represents the measured segment. If the winding order is ...
         *  - 1, the segment is an edge in positive orientation.
         *  - -1, the segment is an edge in negative orientation.
         *  - 0, the segment is not an edge.
         *
         * The distance is the actual grid distance if the shape is grid-based.
         * Otherwise the distance is the distance in pixels divided by of the ratio of grid distance and grid size.
         * @type {DeepReadonly<{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]>}
         */
        readonly measuredSegments: readonly DeepReadonly<{
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }>[];
        "__#108@#measuredSegments": any;
        /**
         * The control handles of this shape.
         * Each handle has a position and a rotation in radians.
         * @type {DeepReadonly<{[name: string]: {position: Point; rotation: number; visible: boolean}}>}
         */
        readonly controlHandles: DeepReadonly<{
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        }>;
        "__#108@#controlHandles": any;
        /** @inheritDoc */
        _updateCommit(copy: any, diff: any, options: any, state: any): void;
        /** @inheritDoc */
        clone(data: any, context: any): foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext> | Promise<foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext>>;
        /**
         * Called when the shape was changed.
         * This function is not called when just the hole state is changed.
         * This function is not called if grid-based is changed and the grid is gridless.
         * @protected
         */
        _onShapeChange(): void;
        /**
         * Called when the grid this shape is placed in changes.
         * @param {object} changed    The changes to the grid.
         * @protected
         */
        _onGridChange(changed: object): void;
        /**
         * Is this shape currently affected by the grid?
         * @returns {boolean}
         */
        readonly isAffectedByGrid: boolean;
        /**
         * Whether the shape is identical to itself after a rotation around its origin.
         * @returns {boolean}
         */
        readonly hasRotationalSymmetry: boolean;
        /**
         * Create a ray.
         * @param {number} x             The x-coordinate of the origin of the ray.
         * @param {number} y             The y-coordinate of the origin of the ray.
         * @param {number} direction     The direction of the ray in degrees.
         * @param {number} length        The length of the ray in pixels.
         * @param {number} [alignment=0] The alignment to ray.
         * @returns {Ray}
         * @internal
         */
        _createRay(x: number, y: number, direction: number, length: number, alignment?: number | undefined): Ray;
        /**
         * Snap the given point.
         * @param {Point} point    The point that is to be snapped.
         * @returns {Point}        The snapped point.
         * @internal
         */
        _getSnappedPoint(point: Point): Point;
        /**
         * Get the size for the given ray defined by a length and direction.
         * @param {number} length       The length of the ray in pixels.
         * @param {number} direction    The direction of the ray in radians.
         * @param {object} [options]                   Additional options.
         * @param {boolean} [options.snap=false]       Snap the size to with defined grid snapping precision?
         * @param {boolean} [options.round]            Round the size to integer?
         * @param {boolean} [options.allowZero=false]  Allow the size to be zero?
         * @returns {number}            The snapped size in pixels.
         * @internal
         */
        _calculateSize(length: number, direction: number, { snap, round, allowZero }?: {
            snap?: boolean | undefined;
            round?: boolean | undefined;
            allowZero?: boolean | undefined;
        } | undefined): number;
        /**
         * Snap the given rotation.
         * @param {number} rotation    The rotation to be snapped in degrees.
         * @returns {number}           The snapped rotation in degrees.
         * @internal
         */
        _getSnappedRotation(rotation: number): number;
        /**
         * Test whether given point is contained within this shape.
         * @param {Point} point    The point.
         * @returns {boolean}
         */
        testPoint(point: Point): boolean;
        /**
         * Create the Clipper polygon tree of this shape.
         * This function may return a single positively-orientated and non-selfintersecting Clipper path instead of a tree,
         * which is automatically converted to a Clipper polygon tree.
         * This function is called only once. It is not called if the shape is empty.
         * @returns {ClipperLib.PolyTree|ClipperPoint[]|Point[]|number[]}
         * @protected
         * @abstract
         */
        _createClipperPolyTree(): ClipperLib.PolyTree | ClipperPoint[] | Point[] | number[];
        /**
         * Create the origin point of this shape.
         * @returns {Point}
         * @protected
         */
        _createOrigin(): Point;
        /**
         * Create the center point of this shape.
         * @returns {Point}
         * @protected
         */
        _createCenter(): Point;
        /**
         * Calculate the area of this shape.
         * @returns {number}
         * @protected
         */
        _calculateArea(): number;
        /**
         * Move the shape to the given origin.
         * @param {Point} origin                    The (unsnapped) origin.
         * @param {object} [options]                Additional options.
         * @param {boolean} [options.snap=false]    Snap the origin?
         */
        move(origin: Point, { snap }?: {
            snap?: boolean | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin (or pivot).
         * @param {number} angle           The angle in degrees.
         * @param {object} [options]       Additional options.
         * @param {Point} [options.pivot]  The pivot of rotation. Default: origin.
         */
        rotate(angle: number, { pivot }?: {
            pivot?: Point | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin.
         * @param {number} angle    The angle in degrees.
         * @protected
         */
        _rotate(angle: number): void;
        /**
         * Draw the shape into the Graphics element.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawShape(graphics: PIXI.Graphics): void;
        /**
         * Draw reference lines of the shape into the Graphics element, if it has any.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawReferenceLines(graphics: PIXI.Graphics): void;
        /**
         * Create a measured segment.
         * @param {number} x           The x-coordinate of the origin of the ray.
         * @param {number} y           The y-coordinate of the origin of the ray.
         * @param {number} direction   The direction of the ray in degrees.
         * @param {number} length      The length of the ray in pixels.
         * @param {number} alignment   The alignment of the ray.
         * @param {-1|0|1} winding     The winding order.
         * @param {number} [angle]     The angle in degrees.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}}
         * @internal
         */
        _createMeasuredSegment(x: number, y: number, direction: number, length: number, alignment: number, winding: -1 | 0 | 1, angle?: number | undefined): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        };
        /**
         * Create the measured segments of this shape.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]}
         * @protected
         * @abstract
         */
        _createMeasuredSegments(): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }[];
        /**
         * Get the control handles for this shape.
         * @returns {{[name: string]: {position: Point; rotation: number; visible: boolean}}}
         *   The position, rotation in radians, and visible state for each handle.
         * @abstract
         */
        _createControlHandles(): {
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        };
        /**
         * Move the control handle to the destination position.
         * @param {string} name                       The handle name.
         * @param {Point} destination                 The destination of the handle.
         * @param {object} [options]                  Additional options.
         * @param {boolean} [options.snap=false]      Snapping?
         * @param {boolean} [options.unlinked=false]  Unlinked scaling?
         *
         */
        moveControlHandle(name: string, destination: Point, options?: {
            snap?: boolean | undefined;
            unlinked?: boolean | undefined;
        } | undefined): void;
        /**
         * Transform this shape by moving a scale handle.
         * @param {string} fieldName    The field name of the axis that is scaled.
         * @param {Point} origin        The origin.
         * @param {number} direction    The direction of the axis in degrees.
         * @param {number} alignment    The alignment of the axis.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @param {boolean} [allowZero=false]    Allow zero size?
         * @param {number} [max]                 The maximum value.
         * @internal
         */
        _moveScaleHandle(fieldName: string, origin: Point, direction: number, alignment: number, destination: Point, snap: boolean, allowZero?: boolean | undefined, max?: number | undefined): void;
        /**
         * Transform this shape by moving a rotation handle.
         * @param {number} direction    The direction of the rotation handle in degrees.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveRotationHandle(direction: number, destination: Point, snap: boolean): void;
        /**
         * Transform this shape by moving the sweep handle.
         * @param {number} maxAngle     The maximum angle possible.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveSweepHandle(maxAngle: number, destination: Point, snap: boolean): void;
        /**
         * Handle the drag start event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @internal
         */
        _onDragStart(event: PIXI.FederatedEvent): void;
        /**
         * Handle the drag move event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @abstract
         * @internal
         */
        _onDragMove(event: PIXI.FederatedEvent): void;
        /**
         * Sample a point from the shape interior.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleInterior(out?: Point | undefined): Point;
        /**
         * Sample a point from the shape boundary.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleBoundary(out?: Point | undefined): Point;
        _index: number | undefined;
        _configure(options?: object | undefined): void;
        _source: object;
        parent: foundry.abstract.DataModel | null;
        readonly schema: import("./fields.mjs").DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
            joint: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): import("./fields.mjs").DataField | undefined;
        _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DataModelConstructionContext | undefined): object;
        _getInnerModel(field: import("./fields.mjs").DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, import("./fields.mjs").DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): import("../../common/data/validation-failure.mjs").DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): object;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    };
    /**
     * The distance snapping precision.
     * @type {number}
     */
    "__#108@#DISTANCE_SNAPPING_PRECISION": number;
    /**
     * The rotation snapping interval.
     * @type {number}
     */
    "__#108@#ROTATION_SNAPPING_INTERVAL": number;
    /**
     * Convert a path to a clipper path.
     * @param {ClipperPoint[]|Point[]|number[]} path    A path
     * @returns {ClipperPoint[]}
     * @internal
     */
    _toClipperPath(path: ClipperPoint[] | Point[] | number[]): ClipperPoint[];
    LOCALIZATION_PREFIXES: string[];
    readonly TYPES: Readonly<{
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
    TYPE: string;
    defineSchema(): {
        type: import("./fields.mjs").StringField;
        hole: import("./fields.mjs").BooleanField;
    };
    _schema: import("./fields.mjs").DataModelSchemaField;
    readonly schema: import("./fields.mjs").DataModelSchemaField;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: import("./_types.mjs").DataModelCleaningOptions | undefined, _state?: Partial<import("./_types.mjs").DataModelUpdateState> | undefined): object;
    _preCleanData(data: object, options: import("./_types.mjs").DataModelCleaningOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
    _cleanData(data: object, options: Readonly<import("./_types.mjs").DataModelCleaningOptions>, _state: import("./_types.mjs").DataModelUpdateState): object;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): object;
    migrateData(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined, _state?: import("./_types.mjs").DataModelUpdateState | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
/**
 * The data model for an emanation shape.
 */
export class EmanationShapeData extends EmanationShapeData_base {
    /** @override */
    override get isEmpty(): any;
    /** @override */
    override get isAffectedByGrid(): any;
    /** @override */
    override get hasRotationalSymmetry(): any;
    /** @override */
    override _createOrigin(): any;
    /** @override */
    override move(origin: any, options: any): void;
    /** @override */
    override _rotate(angle: any): void;
    /** @override */
    override drawReferenceLines(graphics: any): void;
    /** @override */
    override _createMeasuredSegments(): any[];
    /** @override */
    override _createControlHandles(): any;
    /** @override */
    override moveControlHandle(name: any, destination: any, options?: {}): void;
    /** @override */
    override _onDragMove(event: any): void;
    #private;
}
declare const PolygonShapeData_base: {
    new (data: any, options: any): {
        /**
         * The scene that this shape is placed in, if any.
         * @type {Scene|null}
         */
        readonly scene: Scene | null;
        "__#108@#scene": any;
        /**
         * The grid that this shape is placed in.
         * @type {BaseGrid}
         */
        readonly grid: BaseGrid<foundry.grid.types.GridCoordinates2D, foundry.grid.types.GridCoordinates3D>;
        /**
         * The gridless version of the grid that this shape is placed in.
         * @type {GridlessGrid}
         */
        readonly gridlessGrid: GridlessGrid;
        /**
         * Is this shape empty?
         * @type {boolean}
         */
        readonly isEmpty: boolean;
        /**
         * The polygons of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ReadonlyArray<PIXI.Polygon>}
         */
        readonly polygons: readonly PIXI.Polygon[];
        /**
         * The polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {PolygonTree}
         */
        readonly polygonTree: PolygonTree;
        "__#108@#polygonTree": any;
        /**
         * The Clipper paths of this shape.
         * The winding numbers are 1 or 0.
         *
         * The value of this property must not be mutated.
         * @type {DeepReadonly<ClipperPoint[][]>}
         */
        readonly clipperPaths: readonly (readonly DeepReadonly<ClipperPoint>[])[];
        /**
         * The Clipper polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ClipperLib.PolyTree}
         */
        readonly clipperPolyTree: ClipperLib.PolyTree;
        "__#108@#clipperPolyTree": any;
        /**
         * The triangulation of this shape.
         *
         * The value of this property must not be mutated.
         * @type {Readonly<{vertices: Float32Array; indices: Uint16Array|Uint32Array}>}
         */
        readonly triangulation: Readonly<{
            vertices: Float32Array;
            indices: Uint16Array | Uint32Array;
        }>;
        /**
         * The bounds of this Region.
         *
         * The value of this property must not be mutated.
         * @type {PIXI.Rectangle}
         */
        readonly bounds: PIXI.Rectangle;
        /**
         * The origin of this shape.
         * @type {Readonly<Point>}
         */
        readonly origin: Readonly<Point>;
        "__#108@#origin": any;
        /**
         * The center point of this shape.
         * @type {Readonly<Point>}
         */
        readonly center: Readonly<Point>;
        "__#108@#center": any;
        /**
         * The area of this shape.
         * @type {number}
         */
        readonly area: number;
        "__#108@#area": any;
        /**
         * The measured segments of this shape.
         * Each segment consist of a ray, winding order, distance in grid units, and the angle in degrees if it has one.
         * The ray represents the measured segment. If the winding order is ...
         *  - 1, the segment is an edge in positive orientation.
         *  - -1, the segment is an edge in negative orientation.
         *  - 0, the segment is not an edge.
         *
         * The distance is the actual grid distance if the shape is grid-based.
         * Otherwise the distance is the distance in pixels divided by of the ratio of grid distance and grid size.
         * @type {DeepReadonly<{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]>}
         */
        readonly measuredSegments: readonly DeepReadonly<{
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }>[];
        "__#108@#measuredSegments": any;
        /**
         * The control handles of this shape.
         * Each handle has a position and a rotation in radians.
         * @type {DeepReadonly<{[name: string]: {position: Point; rotation: number; visible: boolean}}>}
         */
        readonly controlHandles: DeepReadonly<{
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        }>;
        "__#108@#controlHandles": any;
        /** @inheritDoc */
        _updateCommit(copy: any, diff: any, options: any, state: any): void;
        /** @inheritDoc */
        clone(data: any, context: any): foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext> | Promise<foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext>>;
        /**
         * Called when the shape was changed.
         * This function is not called when just the hole state is changed.
         * This function is not called if grid-based is changed and the grid is gridless.
         * @protected
         */
        _onShapeChange(): void;
        /**
         * Called when the grid this shape is placed in changes.
         * @param {object} changed    The changes to the grid.
         * @protected
         */
        _onGridChange(changed: object): void;
        /**
         * Is this shape currently affected by the grid?
         * @returns {boolean}
         */
        readonly isAffectedByGrid: boolean;
        /**
         * Whether the shape is identical to itself after a rotation around its origin.
         * @returns {boolean}
         */
        readonly hasRotationalSymmetry: boolean;
        /**
         * Create a ray.
         * @param {number} x             The x-coordinate of the origin of the ray.
         * @param {number} y             The y-coordinate of the origin of the ray.
         * @param {number} direction     The direction of the ray in degrees.
         * @param {number} length        The length of the ray in pixels.
         * @param {number} [alignment=0] The alignment to ray.
         * @returns {Ray}
         * @internal
         */
        _createRay(x: number, y: number, direction: number, length: number, alignment?: number | undefined): Ray;
        /**
         * Snap the given point.
         * @param {Point} point    The point that is to be snapped.
         * @returns {Point}        The snapped point.
         * @internal
         */
        _getSnappedPoint(point: Point): Point;
        /**
         * Get the size for the given ray defined by a length and direction.
         * @param {number} length       The length of the ray in pixels.
         * @param {number} direction    The direction of the ray in radians.
         * @param {object} [options]                   Additional options.
         * @param {boolean} [options.snap=false]       Snap the size to with defined grid snapping precision?
         * @param {boolean} [options.round]            Round the size to integer?
         * @param {boolean} [options.allowZero=false]  Allow the size to be zero?
         * @returns {number}            The snapped size in pixels.
         * @internal
         */
        _calculateSize(length: number, direction: number, { snap, round, allowZero }?: {
            snap?: boolean | undefined;
            round?: boolean | undefined;
            allowZero?: boolean | undefined;
        } | undefined): number;
        /**
         * Snap the given rotation.
         * @param {number} rotation    The rotation to be snapped in degrees.
         * @returns {number}           The snapped rotation in degrees.
         * @internal
         */
        _getSnappedRotation(rotation: number): number;
        /**
         * Test whether given point is contained within this shape.
         * @param {Point} point    The point.
         * @returns {boolean}
         */
        testPoint(point: Point): boolean;
        /**
         * Create the Clipper polygon tree of this shape.
         * This function may return a single positively-orientated and non-selfintersecting Clipper path instead of a tree,
         * which is automatically converted to a Clipper polygon tree.
         * This function is called only once. It is not called if the shape is empty.
         * @returns {ClipperLib.PolyTree|ClipperPoint[]|Point[]|number[]}
         * @protected
         * @abstract
         */
        _createClipperPolyTree(): ClipperLib.PolyTree | ClipperPoint[] | Point[] | number[];
        /**
         * Create the origin point of this shape.
         * @returns {Point}
         * @protected
         */
        _createOrigin(): Point;
        /**
         * Create the center point of this shape.
         * @returns {Point}
         * @protected
         */
        _createCenter(): Point;
        /**
         * Calculate the area of this shape.
         * @returns {number}
         * @protected
         */
        _calculateArea(): number;
        /**
         * Move the shape to the given origin.
         * @param {Point} origin                    The (unsnapped) origin.
         * @param {object} [options]                Additional options.
         * @param {boolean} [options.snap=false]    Snap the origin?
         */
        move(origin: Point, { snap }?: {
            snap?: boolean | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin (or pivot).
         * @param {number} angle           The angle in degrees.
         * @param {object} [options]       Additional options.
         * @param {Point} [options.pivot]  The pivot of rotation. Default: origin.
         */
        rotate(angle: number, { pivot }?: {
            pivot?: Point | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin.
         * @param {number} angle    The angle in degrees.
         * @protected
         */
        _rotate(angle: number): void;
        /**
         * Draw the shape into the Graphics element.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawShape(graphics: PIXI.Graphics): void;
        /**
         * Draw reference lines of the shape into the Graphics element, if it has any.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawReferenceLines(graphics: PIXI.Graphics): void;
        /**
         * Create a measured segment.
         * @param {number} x           The x-coordinate of the origin of the ray.
         * @param {number} y           The y-coordinate of the origin of the ray.
         * @param {number} direction   The direction of the ray in degrees.
         * @param {number} length      The length of the ray in pixels.
         * @param {number} alignment   The alignment of the ray.
         * @param {-1|0|1} winding     The winding order.
         * @param {number} [angle]     The angle in degrees.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}}
         * @internal
         */
        _createMeasuredSegment(x: number, y: number, direction: number, length: number, alignment: number, winding: -1 | 0 | 1, angle?: number | undefined): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        };
        /**
         * Create the measured segments of this shape.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]}
         * @protected
         * @abstract
         */
        _createMeasuredSegments(): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }[];
        /**
         * Get the control handles for this shape.
         * @returns {{[name: string]: {position: Point; rotation: number; visible: boolean}}}
         *   The position, rotation in radians, and visible state for each handle.
         * @abstract
         */
        _createControlHandles(): {
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        };
        /**
         * Move the control handle to the destination position.
         * @param {string} name                       The handle name.
         * @param {Point} destination                 The destination of the handle.
         * @param {object} [options]                  Additional options.
         * @param {boolean} [options.snap=false]      Snapping?
         * @param {boolean} [options.unlinked=false]  Unlinked scaling?
         *
         */
        moveControlHandle(name: string, destination: Point, options?: {
            snap?: boolean | undefined;
            unlinked?: boolean | undefined;
        } | undefined): void;
        /**
         * Transform this shape by moving a scale handle.
         * @param {string} fieldName    The field name of the axis that is scaled.
         * @param {Point} origin        The origin.
         * @param {number} direction    The direction of the axis in degrees.
         * @param {number} alignment    The alignment of the axis.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @param {boolean} [allowZero=false]    Allow zero size?
         * @param {number} [max]                 The maximum value.
         * @internal
         */
        _moveScaleHandle(fieldName: string, origin: Point, direction: number, alignment: number, destination: Point, snap: boolean, allowZero?: boolean | undefined, max?: number | undefined): void;
        /**
         * Transform this shape by moving a rotation handle.
         * @param {number} direction    The direction of the rotation handle in degrees.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveRotationHandle(direction: number, destination: Point, snap: boolean): void;
        /**
         * Transform this shape by moving the sweep handle.
         * @param {number} maxAngle     The maximum angle possible.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveSweepHandle(maxAngle: number, destination: Point, snap: boolean): void;
        /**
         * Handle the drag start event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @internal
         */
        _onDragStart(event: PIXI.FederatedEvent): void;
        /**
         * Handle the drag move event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @abstract
         * @internal
         */
        _onDragMove(event: PIXI.FederatedEvent): void;
        /**
         * Sample a point from the shape interior.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleInterior(out?: Point | undefined): Point;
        /**
         * Sample a point from the shape boundary.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleBoundary(out?: Point | undefined): Point;
        _index: number | undefined;
        _configure(options?: object | undefined): void;
        _source: object;
        parent: foundry.abstract.DataModel | null;
        readonly schema: import("./fields.mjs").DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
            joint: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): import("./fields.mjs").DataField | undefined;
        _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DataModelConstructionContext | undefined): object;
        _getInnerModel(field: import("./fields.mjs").DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, import("./fields.mjs").DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): import("../../common/data/validation-failure.mjs").DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): object;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    };
    /**
     * The distance snapping precision.
     * @type {number}
     */
    "__#108@#DISTANCE_SNAPPING_PRECISION": number;
    /**
     * The rotation snapping interval.
     * @type {number}
     */
    "__#108@#ROTATION_SNAPPING_INTERVAL": number;
    /**
     * Convert a path to a clipper path.
     * @param {ClipperPoint[]|Point[]|number[]} path    A path
     * @returns {ClipperPoint[]}
     * @internal
     */
    _toClipperPath(path: ClipperPoint[] | Point[] | number[]): ClipperPoint[];
    LOCALIZATION_PREFIXES: string[];
    readonly TYPES: Readonly<{
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
    TYPE: string;
    defineSchema(): {
        type: import("./fields.mjs").StringField;
        hole: import("./fields.mjs").BooleanField;
    };
    _schema: import("./fields.mjs").DataModelSchemaField;
    readonly schema: import("./fields.mjs").DataModelSchemaField;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: import("./_types.mjs").DataModelCleaningOptions | undefined, _state?: Partial<import("./_types.mjs").DataModelUpdateState> | undefined): object;
    _preCleanData(data: object, options: import("./_types.mjs").DataModelCleaningOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
    _cleanData(data: object, options: Readonly<import("./_types.mjs").DataModelCleaningOptions>, _state: import("./_types.mjs").DataModelUpdateState): object;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): object;
    migrateData(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined, _state?: import("./_types.mjs").DataModelUpdateState | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
/**
 * The data model for a polygon shape.
 */
export class PolygonShapeData extends PolygonShapeData_base {
    /**
     * A shared point instance.
     * @type {PIXI.Point}
     */
    static "__#115@#SHARED_POINT": PIXI.Point;
    /** @override */
    override _createOrigin(): any;
    /** @override */
    override _getSnappedPoint(point: any): Point;
    /** @override */
    override _calculateSize(length: any, direction: any, { snap, round, allowZero }?: {
        snap?: boolean | undefined;
        round?: boolean | undefined;
        allowZero?: boolean | undefined;
    }): number;
    /** @override */
    override move(origin: any, { snap }?: {
        snap?: boolean | undefined;
    }): void;
    /** @override */
    override _rotate(angle: any): void;
    /** @override */
    override _createControlHandles(): {
        translate: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        scale: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
        rotate: {
            position: Point;
            rotation: number;
            visible: boolean;
        };
    };
    /** @override */
    override moveControlHandle(name: any, destination: any, { snap }?: {
        snap?: boolean | undefined;
    }): void;
    /** @override */
    override _onDragStart(event: any): void;
    /** @override */
    override _onDragMove(event: any): void;
    #private;
}
declare const TokenShapeData_base: {
    new (data: any, options: any): {
        /**
         * The scene that this shape is placed in, if any.
         * @type {Scene|null}
         */
        readonly scene: Scene | null;
        "__#108@#scene": any;
        /**
         * The grid that this shape is placed in.
         * @type {BaseGrid}
         */
        readonly grid: BaseGrid<foundry.grid.types.GridCoordinates2D, foundry.grid.types.GridCoordinates3D>;
        /**
         * The gridless version of the grid that this shape is placed in.
         * @type {GridlessGrid}
         */
        readonly gridlessGrid: GridlessGrid;
        /**
         * Is this shape empty?
         * @type {boolean}
         */
        readonly isEmpty: boolean;
        /**
         * The polygons of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ReadonlyArray<PIXI.Polygon>}
         */
        readonly polygons: readonly PIXI.Polygon[];
        /**
         * The polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {PolygonTree}
         */
        readonly polygonTree: PolygonTree;
        "__#108@#polygonTree": any;
        /**
         * The Clipper paths of this shape.
         * The winding numbers are 1 or 0.
         *
         * The value of this property must not be mutated.
         * @type {DeepReadonly<ClipperPoint[][]>}
         */
        readonly clipperPaths: readonly (readonly DeepReadonly<ClipperPoint>[])[];
        /**
         * The Clipper polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ClipperLib.PolyTree}
         */
        readonly clipperPolyTree: ClipperLib.PolyTree;
        "__#108@#clipperPolyTree": any;
        /**
         * The triangulation of this shape.
         *
         * The value of this property must not be mutated.
         * @type {Readonly<{vertices: Float32Array; indices: Uint16Array|Uint32Array}>}
         */
        readonly triangulation: Readonly<{
            vertices: Float32Array;
            indices: Uint16Array | Uint32Array;
        }>;
        /**
         * The bounds of this Region.
         *
         * The value of this property must not be mutated.
         * @type {PIXI.Rectangle}
         */
        readonly bounds: PIXI.Rectangle;
        /**
         * The origin of this shape.
         * @type {Readonly<Point>}
         */
        readonly origin: Readonly<Point>;
        "__#108@#origin": any;
        /**
         * The center point of this shape.
         * @type {Readonly<Point>}
         */
        readonly center: Readonly<Point>;
        "__#108@#center": any;
        /**
         * The area of this shape.
         * @type {number}
         */
        readonly area: number;
        "__#108@#area": any;
        /**
         * The measured segments of this shape.
         * Each segment consist of a ray, winding order, distance in grid units, and the angle in degrees if it has one.
         * The ray represents the measured segment. If the winding order is ...
         *  - 1, the segment is an edge in positive orientation.
         *  - -1, the segment is an edge in negative orientation.
         *  - 0, the segment is not an edge.
         *
         * The distance is the actual grid distance if the shape is grid-based.
         * Otherwise the distance is the distance in pixels divided by of the ratio of grid distance and grid size.
         * @type {DeepReadonly<{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]>}
         */
        readonly measuredSegments: readonly DeepReadonly<{
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }>[];
        "__#108@#measuredSegments": any;
        /**
         * The control handles of this shape.
         * Each handle has a position and a rotation in radians.
         * @type {DeepReadonly<{[name: string]: {position: Point; rotation: number; visible: boolean}}>}
         */
        readonly controlHandles: DeepReadonly<{
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        }>;
        "__#108@#controlHandles": any;
        /** @inheritDoc */
        _updateCommit(copy: any, diff: any, options: any, state: any): void;
        /** @inheritDoc */
        clone(data: any, context: any): foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext> | Promise<foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext>>;
        /**
         * Called when the shape was changed.
         * This function is not called when just the hole state is changed.
         * This function is not called if grid-based is changed and the grid is gridless.
         * @protected
         */
        _onShapeChange(): void;
        /**
         * Called when the grid this shape is placed in changes.
         * @param {object} changed    The changes to the grid.
         * @protected
         */
        _onGridChange(changed: object): void;
        /**
         * Is this shape currently affected by the grid?
         * @returns {boolean}
         */
        readonly isAffectedByGrid: boolean;
        /**
         * Whether the shape is identical to itself after a rotation around its origin.
         * @returns {boolean}
         */
        readonly hasRotationalSymmetry: boolean;
        /**
         * Create a ray.
         * @param {number} x             The x-coordinate of the origin of the ray.
         * @param {number} y             The y-coordinate of the origin of the ray.
         * @param {number} direction     The direction of the ray in degrees.
         * @param {number} length        The length of the ray in pixels.
         * @param {number} [alignment=0] The alignment to ray.
         * @returns {Ray}
         * @internal
         */
        _createRay(x: number, y: number, direction: number, length: number, alignment?: number | undefined): Ray;
        /**
         * Snap the given point.
         * @param {Point} point    The point that is to be snapped.
         * @returns {Point}        The snapped point.
         * @internal
         */
        _getSnappedPoint(point: Point): Point;
        /**
         * Get the size for the given ray defined by a length and direction.
         * @param {number} length       The length of the ray in pixels.
         * @param {number} direction    The direction of the ray in radians.
         * @param {object} [options]                   Additional options.
         * @param {boolean} [options.snap=false]       Snap the size to with defined grid snapping precision?
         * @param {boolean} [options.round]            Round the size to integer?
         * @param {boolean} [options.allowZero=false]  Allow the size to be zero?
         * @returns {number}            The snapped size in pixels.
         * @internal
         */
        _calculateSize(length: number, direction: number, { snap, round, allowZero }?: {
            snap?: boolean | undefined;
            round?: boolean | undefined;
            allowZero?: boolean | undefined;
        } | undefined): number;
        /**
         * Snap the given rotation.
         * @param {number} rotation    The rotation to be snapped in degrees.
         * @returns {number}           The snapped rotation in degrees.
         * @internal
         */
        _getSnappedRotation(rotation: number): number;
        /**
         * Test whether given point is contained within this shape.
         * @param {Point} point    The point.
         * @returns {boolean}
         */
        testPoint(point: Point): boolean;
        /**
         * Create the Clipper polygon tree of this shape.
         * This function may return a single positively-orientated and non-selfintersecting Clipper path instead of a tree,
         * which is automatically converted to a Clipper polygon tree.
         * This function is called only once. It is not called if the shape is empty.
         * @returns {ClipperLib.PolyTree|ClipperPoint[]|Point[]|number[]}
         * @protected
         * @abstract
         */
        _createClipperPolyTree(): ClipperLib.PolyTree | ClipperPoint[] | Point[] | number[];
        /**
         * Create the origin point of this shape.
         * @returns {Point}
         * @protected
         */
        _createOrigin(): Point;
        /**
         * Create the center point of this shape.
         * @returns {Point}
         * @protected
         */
        _createCenter(): Point;
        /**
         * Calculate the area of this shape.
         * @returns {number}
         * @protected
         */
        _calculateArea(): number;
        /**
         * Move the shape to the given origin.
         * @param {Point} origin                    The (unsnapped) origin.
         * @param {object} [options]                Additional options.
         * @param {boolean} [options.snap=false]    Snap the origin?
         */
        move(origin: Point, { snap }?: {
            snap?: boolean | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin (or pivot).
         * @param {number} angle           The angle in degrees.
         * @param {object} [options]       Additional options.
         * @param {Point} [options.pivot]  The pivot of rotation. Default: origin.
         */
        rotate(angle: number, { pivot }?: {
            pivot?: Point | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin.
         * @param {number} angle    The angle in degrees.
         * @protected
         */
        _rotate(angle: number): void;
        /**
         * Draw the shape into the Graphics element.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawShape(graphics: PIXI.Graphics): void;
        /**
         * Draw reference lines of the shape into the Graphics element, if it has any.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawReferenceLines(graphics: PIXI.Graphics): void;
        /**
         * Create a measured segment.
         * @param {number} x           The x-coordinate of the origin of the ray.
         * @param {number} y           The y-coordinate of the origin of the ray.
         * @param {number} direction   The direction of the ray in degrees.
         * @param {number} length      The length of the ray in pixels.
         * @param {number} alignment   The alignment of the ray.
         * @param {-1|0|1} winding     The winding order.
         * @param {number} [angle]     The angle in degrees.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}}
         * @internal
         */
        _createMeasuredSegment(x: number, y: number, direction: number, length: number, alignment: number, winding: -1 | 0 | 1, angle?: number | undefined): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        };
        /**
         * Create the measured segments of this shape.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]}
         * @protected
         * @abstract
         */
        _createMeasuredSegments(): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }[];
        /**
         * Get the control handles for this shape.
         * @returns {{[name: string]: {position: Point; rotation: number; visible: boolean}}}
         *   The position, rotation in radians, and visible state for each handle.
         * @abstract
         */
        _createControlHandles(): {
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        };
        /**
         * Move the control handle to the destination position.
         * @param {string} name                       The handle name.
         * @param {Point} destination                 The destination of the handle.
         * @param {object} [options]                  Additional options.
         * @param {boolean} [options.snap=false]      Snapping?
         * @param {boolean} [options.unlinked=false]  Unlinked scaling?
         *
         */
        moveControlHandle(name: string, destination: Point, options?: {
            snap?: boolean | undefined;
            unlinked?: boolean | undefined;
        } | undefined): void;
        /**
         * Transform this shape by moving a scale handle.
         * @param {string} fieldName    The field name of the axis that is scaled.
         * @param {Point} origin        The origin.
         * @param {number} direction    The direction of the axis in degrees.
         * @param {number} alignment    The alignment of the axis.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @param {boolean} [allowZero=false]    Allow zero size?
         * @param {number} [max]                 The maximum value.
         * @internal
         */
        _moveScaleHandle(fieldName: string, origin: Point, direction: number, alignment: number, destination: Point, snap: boolean, allowZero?: boolean | undefined, max?: number | undefined): void;
        /**
         * Transform this shape by moving a rotation handle.
         * @param {number} direction    The direction of the rotation handle in degrees.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveRotationHandle(direction: number, destination: Point, snap: boolean): void;
        /**
         * Transform this shape by moving the sweep handle.
         * @param {number} maxAngle     The maximum angle possible.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveSweepHandle(maxAngle: number, destination: Point, snap: boolean): void;
        /**
         * Handle the drag start event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @internal
         */
        _onDragStart(event: PIXI.FederatedEvent): void;
        /**
         * Handle the drag move event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @abstract
         * @internal
         */
        _onDragMove(event: PIXI.FederatedEvent): void;
        /**
         * Sample a point from the shape interior.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleInterior(out?: Point | undefined): Point;
        /**
         * Sample a point from the shape boundary.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleBoundary(out?: Point | undefined): Point;
        _index: number | undefined;
        _configure(options?: object | undefined): void;
        _source: object;
        parent: foundry.abstract.DataModel | null;
        readonly schema: import("./fields.mjs").DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
            joint: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): import("./fields.mjs").DataField | undefined;
        _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DataModelConstructionContext | undefined): object;
        _getInnerModel(field: import("./fields.mjs").DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, import("./fields.mjs").DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): import("../../common/data/validation-failure.mjs").DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): object;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    };
    /**
     * The distance snapping precision.
     * @type {number}
     */
    "__#108@#DISTANCE_SNAPPING_PRECISION": number;
    /**
     * The rotation snapping interval.
     * @type {number}
     */
    "__#108@#ROTATION_SNAPPING_INTERVAL": number;
    /**
     * Convert a path to a clipper path.
     * @param {ClipperPoint[]|Point[]|number[]} path    A path
     * @returns {ClipperPoint[]}
     * @internal
     */
    _toClipperPath(path: ClipperPoint[] | Point[] | number[]): ClipperPoint[];
    LOCALIZATION_PREFIXES: string[];
    readonly TYPES: Readonly<{
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
    TYPE: string;
    defineSchema(): {
        type: import("./fields.mjs").StringField;
        hole: import("./fields.mjs").BooleanField;
    };
    _schema: import("./fields.mjs").DataModelSchemaField;
    readonly schema: import("./fields.mjs").DataModelSchemaField;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: import("./_types.mjs").DataModelCleaningOptions | undefined, _state?: Partial<import("./_types.mjs").DataModelUpdateState> | undefined): object;
    _preCleanData(data: object, options: import("./_types.mjs").DataModelCleaningOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
    _cleanData(data: object, options: Readonly<import("./_types.mjs").DataModelCleaningOptions>, _state: import("./_types.mjs").DataModelUpdateState): object;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): object;
    migrateData(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined, _state?: import("./_types.mjs").DataModelUpdateState | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
/**
 * The data model for a token shape.
 */
export class TokenShapeData extends TokenShapeData_base {
    /**
     * Get the token shape.
     * @type {CircleShapeData|EllipseShapeData|PolygonShapeData}
     * @internal
     */
    _getTokenShape(): CircleShapeData | EllipseShapeData | PolygonShapeData;
    /** @inheritDoc */
    sampleInterior(out: any): any;
    /** @inheritDoc */
    sampleBoundary(out: any): any;
    /** @override */
    override move(origin: any, { snap }?: {
        snap?: boolean | undefined;
    }): void;
    /** @override */
    override _rotate(angle: any): void;
    /** @override */
    override _createControlHandles(): {
        translate: {
            position: Readonly<Point>;
            rotation: number;
            visible: boolean;
        };
    };
    /** @override */
    override moveControlHandle(name: any, destination: any, { snap }?: {
        snap?: boolean | undefined;
    }): void;
    /** @override */
    override _onDragMove(event: any): void;
    #private;
}
declare const GridShapeData_base: {
    new (data: any, options: any): {
        /**
         * The scene that this shape is placed in, if any.
         * @type {Scene|null}
         */
        readonly scene: Scene | null;
        "__#108@#scene": any;
        /**
         * The grid that this shape is placed in.
         * @type {BaseGrid}
         */
        readonly grid: BaseGrid<foundry.grid.types.GridCoordinates2D, foundry.grid.types.GridCoordinates3D>;
        /**
         * The gridless version of the grid that this shape is placed in.
         * @type {GridlessGrid}
         */
        readonly gridlessGrid: GridlessGrid;
        /**
         * Is this shape empty?
         * @type {boolean}
         */
        readonly isEmpty: boolean;
        /**
         * The polygons of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ReadonlyArray<PIXI.Polygon>}
         */
        readonly polygons: readonly PIXI.Polygon[];
        /**
         * The polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {PolygonTree}
         */
        readonly polygonTree: PolygonTree;
        "__#108@#polygonTree": any;
        /**
         * The Clipper paths of this shape.
         * The winding numbers are 1 or 0.
         *
         * The value of this property must not be mutated.
         * @type {DeepReadonly<ClipperPoint[][]>}
         */
        readonly clipperPaths: readonly (readonly DeepReadonly<ClipperPoint>[])[];
        /**
         * The Clipper polygon tree of this shape.
         *
         * The value of this property must not be mutated.
         * @type {ClipperLib.PolyTree}
         */
        readonly clipperPolyTree: ClipperLib.PolyTree;
        "__#108@#clipperPolyTree": any;
        /**
         * The triangulation of this shape.
         *
         * The value of this property must not be mutated.
         * @type {Readonly<{vertices: Float32Array; indices: Uint16Array|Uint32Array}>}
         */
        readonly triangulation: Readonly<{
            vertices: Float32Array;
            indices: Uint16Array | Uint32Array;
        }>;
        /**
         * The bounds of this Region.
         *
         * The value of this property must not be mutated.
         * @type {PIXI.Rectangle}
         */
        readonly bounds: PIXI.Rectangle;
        /**
         * The origin of this shape.
         * @type {Readonly<Point>}
         */
        readonly origin: Readonly<Point>;
        "__#108@#origin": any;
        /**
         * The center point of this shape.
         * @type {Readonly<Point>}
         */
        readonly center: Readonly<Point>;
        "__#108@#center": any;
        /**
         * The area of this shape.
         * @type {number}
         */
        readonly area: number;
        "__#108@#area": any;
        /**
         * The measured segments of this shape.
         * Each segment consist of a ray, winding order, distance in grid units, and the angle in degrees if it has one.
         * The ray represents the measured segment. If the winding order is ...
         *  - 1, the segment is an edge in positive orientation.
         *  - -1, the segment is an edge in negative orientation.
         *  - 0, the segment is not an edge.
         *
         * The distance is the actual grid distance if the shape is grid-based.
         * Otherwise the distance is the distance in pixels divided by of the ratio of grid distance and grid size.
         * @type {DeepReadonly<{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]>}
         */
        readonly measuredSegments: readonly DeepReadonly<{
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }>[];
        "__#108@#measuredSegments": any;
        /**
         * The control handles of this shape.
         * Each handle has a position and a rotation in radians.
         * @type {DeepReadonly<{[name: string]: {position: Point; rotation: number; visible: boolean}}>}
         */
        readonly controlHandles: DeepReadonly<{
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        }>;
        "__#108@#controlHandles": any;
        /** @inheritDoc */
        _updateCommit(copy: any, diff: any, options: any, state: any): void;
        /** @inheritDoc */
        clone(data: any, context: any): foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext> | Promise<foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext>>;
        /**
         * Called when the shape was changed.
         * This function is not called when just the hole state is changed.
         * This function is not called if grid-based is changed and the grid is gridless.
         * @protected
         */
        _onShapeChange(): void;
        /**
         * Called when the grid this shape is placed in changes.
         * @param {object} changed    The changes to the grid.
         * @protected
         */
        _onGridChange(changed: object): void;
        /**
         * Is this shape currently affected by the grid?
         * @returns {boolean}
         */
        readonly isAffectedByGrid: boolean;
        /**
         * Whether the shape is identical to itself after a rotation around its origin.
         * @returns {boolean}
         */
        readonly hasRotationalSymmetry: boolean;
        /**
         * Create a ray.
         * @param {number} x             The x-coordinate of the origin of the ray.
         * @param {number} y             The y-coordinate of the origin of the ray.
         * @param {number} direction     The direction of the ray in degrees.
         * @param {number} length        The length of the ray in pixels.
         * @param {number} [alignment=0] The alignment to ray.
         * @returns {Ray}
         * @internal
         */
        _createRay(x: number, y: number, direction: number, length: number, alignment?: number | undefined): Ray;
        /**
         * Snap the given point.
         * @param {Point} point    The point that is to be snapped.
         * @returns {Point}        The snapped point.
         * @internal
         */
        _getSnappedPoint(point: Point): Point;
        /**
         * Get the size for the given ray defined by a length and direction.
         * @param {number} length       The length of the ray in pixels.
         * @param {number} direction    The direction of the ray in radians.
         * @param {object} [options]                   Additional options.
         * @param {boolean} [options.snap=false]       Snap the size to with defined grid snapping precision?
         * @param {boolean} [options.round]            Round the size to integer?
         * @param {boolean} [options.allowZero=false]  Allow the size to be zero?
         * @returns {number}            The snapped size in pixels.
         * @internal
         */
        _calculateSize(length: number, direction: number, { snap, round, allowZero }?: {
            snap?: boolean | undefined;
            round?: boolean | undefined;
            allowZero?: boolean | undefined;
        } | undefined): number;
        /**
         * Snap the given rotation.
         * @param {number} rotation    The rotation to be snapped in degrees.
         * @returns {number}           The snapped rotation in degrees.
         * @internal
         */
        _getSnappedRotation(rotation: number): number;
        /**
         * Test whether given point is contained within this shape.
         * @param {Point} point    The point.
         * @returns {boolean}
         */
        testPoint(point: Point): boolean;
        /**
         * Create the Clipper polygon tree of this shape.
         * This function may return a single positively-orientated and non-selfintersecting Clipper path instead of a tree,
         * which is automatically converted to a Clipper polygon tree.
         * This function is called only once. It is not called if the shape is empty.
         * @returns {ClipperLib.PolyTree|ClipperPoint[]|Point[]|number[]}
         * @protected
         * @abstract
         */
        _createClipperPolyTree(): ClipperLib.PolyTree | ClipperPoint[] | Point[] | number[];
        /**
         * Create the origin point of this shape.
         * @returns {Point}
         * @protected
         */
        _createOrigin(): Point;
        /**
         * Create the center point of this shape.
         * @returns {Point}
         * @protected
         */
        _createCenter(): Point;
        /**
         * Calculate the area of this shape.
         * @returns {number}
         * @protected
         */
        _calculateArea(): number;
        /**
         * Move the shape to the given origin.
         * @param {Point} origin                    The (unsnapped) origin.
         * @param {object} [options]                Additional options.
         * @param {boolean} [options.snap=false]    Snap the origin?
         */
        move(origin: Point, { snap }?: {
            snap?: boolean | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin (or pivot).
         * @param {number} angle           The angle in degrees.
         * @param {object} [options]       Additional options.
         * @param {Point} [options.pivot]  The pivot of rotation. Default: origin.
         */
        rotate(angle: number, { pivot }?: {
            pivot?: Point | undefined;
        } | undefined): void;
        /**
         * Rotate the shape by the given angle in degrees around the origin.
         * @param {number} angle    The angle in degrees.
         * @protected
         */
        _rotate(angle: number): void;
        /**
         * Draw the shape into the Graphics element.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawShape(graphics: PIXI.Graphics): void;
        /**
         * Draw reference lines of the shape into the Graphics element, if it has any.
         * @param {PIXI.Graphics} graphics   The Graphics element
         */
        drawReferenceLines(graphics: PIXI.Graphics): void;
        /**
         * Create a measured segment.
         * @param {number} x           The x-coordinate of the origin of the ray.
         * @param {number} y           The y-coordinate of the origin of the ray.
         * @param {number} direction   The direction of the ray in degrees.
         * @param {number} length      The length of the ray in pixels.
         * @param {number} alignment   The alignment of the ray.
         * @param {-1|0|1} winding     The winding order.
         * @param {number} [angle]     The angle in degrees.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}}
         * @internal
         */
        _createMeasuredSegment(x: number, y: number, direction: number, length: number, alignment: number, winding: -1 | 0 | 1, angle?: number | undefined): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        };
        /**
         * Create the measured segments of this shape.
         * @returns {{ray: Ray; winding: -1|0|1; distance: number; angle?: number}[]}
         * @protected
         * @abstract
         */
        _createMeasuredSegments(): {
            ray: Ray;
            winding: -1 | 0 | 1;
            distance: number;
            angle?: number;
        }[];
        /**
         * Get the control handles for this shape.
         * @returns {{[name: string]: {position: Point; rotation: number; visible: boolean}}}
         *   The position, rotation in radians, and visible state for each handle.
         * @abstract
         */
        _createControlHandles(): {
            [name: string]: {
                position: Point;
                rotation: number;
                visible: boolean;
            };
        };
        /**
         * Move the control handle to the destination position.
         * @param {string} name                       The handle name.
         * @param {Point} destination                 The destination of the handle.
         * @param {object} [options]                  Additional options.
         * @param {boolean} [options.snap=false]      Snapping?
         * @param {boolean} [options.unlinked=false]  Unlinked scaling?
         *
         */
        moveControlHandle(name: string, destination: Point, options?: {
            snap?: boolean | undefined;
            unlinked?: boolean | undefined;
        } | undefined): void;
        /**
         * Transform this shape by moving a scale handle.
         * @param {string} fieldName    The field name of the axis that is scaled.
         * @param {Point} origin        The origin.
         * @param {number} direction    The direction of the axis in degrees.
         * @param {number} alignment    The alignment of the axis.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @param {boolean} [allowZero=false]    Allow zero size?
         * @param {number} [max]                 The maximum value.
         * @internal
         */
        _moveScaleHandle(fieldName: string, origin: Point, direction: number, alignment: number, destination: Point, snap: boolean, allowZero?: boolean | undefined, max?: number | undefined): void;
        /**
         * Transform this shape by moving a rotation handle.
         * @param {number} direction    The direction of the rotation handle in degrees.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveRotationHandle(direction: number, destination: Point, snap: boolean): void;
        /**
         * Transform this shape by moving the sweep handle.
         * @param {number} maxAngle     The maximum angle possible.
         * @param {Point} destination   The handle destination.
         * @param {boolean} snap        Snap?
         * @internal
         */
        _moveSweepHandle(maxAngle: number, destination: Point, snap: boolean): void;
        /**
         * Handle the drag start event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @internal
         */
        _onDragStart(event: PIXI.FederatedEvent): void;
        /**
         * Handle the drag move event for the creation of this shape.
         * @param {PIXI.FederatedEvent} event    The pointer event.
         * @abstract
         * @internal
         */
        _onDragMove(event: PIXI.FederatedEvent): void;
        /**
         * Sample a point from the shape interior.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleInterior(out?: Point | undefined): Point;
        /**
         * Sample a point from the shape boundary.
         * @param {Point} [out]    A point to write to.
         * @returns {Point}        The sampled point.
         * @throws {Error}         If the shape is empty.
         */
        sampleBoundary(out?: Point | undefined): Point;
        _index: number | undefined;
        _configure(options?: object | undefined): void;
        _source: object;
        parent: foundry.abstract.DataModel | null;
        readonly schema: import("./fields.mjs").DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
            joint: import("../../common/data/validation-failure.mjs").DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): import("./fields.mjs").DataField | undefined;
        _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DataModelConstructionContext | undefined): object;
        _getInnerModel(field: import("./fields.mjs").DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, import("./fields.mjs").DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): import("../../common/data/validation-failure.mjs").DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: import("./_types.mjs").DataModelUpdateState): object;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    };
    /**
     * The distance snapping precision.
     * @type {number}
     */
    "__#108@#DISTANCE_SNAPPING_PRECISION": number;
    /**
     * The rotation snapping interval.
     * @type {number}
     */
    "__#108@#ROTATION_SNAPPING_INTERVAL": number;
    /**
     * Convert a path to a clipper path.
     * @param {ClipperPoint[]|Point[]|number[]} path    A path
     * @returns {ClipperPoint[]}
     * @internal
     */
    _toClipperPath(path: ClipperPoint[] | Point[] | number[]): ClipperPoint[];
    LOCALIZATION_PREFIXES: string[];
    readonly TYPES: Readonly<{
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
    TYPE: string;
    defineSchema(): {
        type: import("./fields.mjs").StringField;
        hole: import("./fields.mjs").BooleanField;
    };
    _schema: import("./fields.mjs").DataModelSchemaField;
    readonly schema: import("./fields.mjs").DataModelSchemaField;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: import("./_types.mjs").DataModelCleaningOptions | undefined, _state?: Partial<import("./_types.mjs").DataModelUpdateState> | undefined): object;
    _preCleanData(data: object, options: import("./_types.mjs").DataModelCleaningOptions, _state: import("./_types.mjs").DataModelUpdateState): void;
    _cleanData(data: object, options: Readonly<import("./_types.mjs").DataModelCleaningOptions>, _state: import("./_types.mjs").DataModelUpdateState): object;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined): object;
    migrateData(source: object, options?: Readonly<import("./_types.mjs").DataModelCleaningOptions> | undefined, _state?: import("./_types.mjs").DataModelUpdateState | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
/**
 * The data model for a shape that is the union of grid spaces.
 */
export class GridShapeData extends GridShapeData_base {
    /** @override */
    override testPoint(point: any): boolean;
    /** @override */
    override _createOrigin(): any;
    /** @override */
    override move(origin: any, { snap }?: {
        snap?: boolean | undefined;
    }): void;
    /**
     * @override
     * @see {@link https://www.redblobgames.com/grids/hexagons/implementation.html#rotation}
     */
    override _rotate(angle: any): void;
    /** @override */
    override _createControlHandles(): {
        translate: {
            position: Readonly<Point>;
            rotation: number;
            visible: boolean;
        };
        rotate: {
            position: Readonly<Point>;
            rotation: number;
            visible: boolean;
        };
    };
    /** @override */
    override moveControlHandle(name: any, destination: any, { snap }?: {
        snap?: boolean | undefined;
    }): void;
    /** @override */
    override _onDragMove(event: any): void;
    #private;
}
import Scene from "../documents/scene.mjs";
import type BaseGrid from "../../common/grid/base.mjs";
import type GridlessGrid from "../../common/grid/gridless.mjs";
import { PolygonTree } from "./polygon-tree.mjs";
import type { ClipperPoint } from "../_types.mjs";
import type { DeepReadonly } from "../_types.mjs";
import type { Point } from "../_types.mjs";
import { Ray } from "../canvas/geometry/_module.mjs";
export {};
