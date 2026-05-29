/**
 * @import BaseEffectSource from "./base-effect-source.mjs"
 * @import {EdgeCreationOptions, ClockwiseSweepPolygonConfig} from "../geometry/_types.mjs";
 */
/**
 * @typedef PointEffectSourceData
 * @property {number} radius              The radius of the source
 * @property {number} externalRadius      A secondary radius used for limited angles
 * @property {number} rotation            The angle of rotation for this point source
 * @property {number} angle               The angle of emission for this point source
 * @property {boolean} walls              Whether or not the source is constrained by walls and surfaces
 * @property {number} priority            Strength of this source to beat or not negative/positive sources
 */
/**
 * Provides a common framework for effect sources that emanate from a central point and extend within a specific radius.
 * This mixin can be used to manage any effect with a point-based origin, such as light, darkness, or other effects.
 * @template {class} T
 * @param {T} BaseSource  The base source class to extend
 */
export default function PointEffectSourceMixin<T extends abstract new (...args: any) => any>(BaseSource: T): {
    new (options?: foundry.canvas.sources.types.BaseEffectSourceOptions | undefined): {
        /**
         * The Edge instances added by this source.
         * @type {Edge[]}
         */
        edges: Edge[];
        /**
         * Whether this Point Effect source can create edges or not.
         * Overriding classes can define dynamic behavior if needed.
         * Default to false so that typical point sources do not create edges.
         * @type {boolean}
         */
        readonly requiresEdges: boolean;
        /**
         * A convenience reference to the radius of the source.
         * @type {number}
         */
        readonly radius: number;
        /**
         * The priority of this point effect source.
         * @type {number}
         */
        readonly priority: number;
        /**
         * The (elevated) origin of this point effect source.
         * @type {ElevatedPoint}
         */
        readonly origin: ElevatedPoint;
        "__#141@#origin": {
            x: number;
            y: number;
            elevation: number;
        };
        /** @inheritDoc */
        _configure(changes: any): void;
        /** @inheritDoc */
        _initialize(data: any): void;
        /** @inheritDoc */
        _initializeSoftEdges(): void;
        /**
         * Configure the parameters of the polygon that is generated for this source.
         * @returns {ClockwiseSweepPolygonConfig}
         * @protected
         */
        _getPolygonConfiguration(): ClockwiseSweepPolygonConfig;
        /** @inheritDoc */
        _createShapes(): void;
        shape: PointSourcePolygon<foundry.canvas.geometry.types.PointSourcePolygonConfig>;
        /** @inheritDoc */
        _destroy(): void;
        /** @override */
        _drawMesh(layerId: any): any;
        /** @override */
        _updateGeometry(): void;
        _geometry: any;
        /**
         * Create the Edge instances that correspond to this source.
         * @protected
         */
        _createEdges(): void;
        /**
         * Get the options used for Edge creation.
         * @returns {EdgeCreationOptions}
         * @protected
         * @abstract
         */
        _getEdgeCreationOptions(): EdgeCreationOptions;
        /**
         * Remove edges from the active Edges collection.
         * @protected
         */
        _deleteEdges(): void;
        object: object | null;
        readonly sourceId: string;
        data: any;
        _flags: Record<string, boolean | number>;
        readonly x: number;
        readonly y: number;
        readonly elevation: number;
        readonly level: foundry.documents.Level;
        "__#214@#level": any;
        readonly effectsCollection: foundry.utils.Collection<string, BaseEffectSource<foundry.canvas.sources.types.BaseEffectSourceData, PIXI.Polygon>>;
        readonly updateId: number;
        "__#214@#updateId": number;
        readonly active: boolean;
        readonly attached: boolean;
        "__#214@#attached": boolean;
        readonly suppressed: boolean;
        suppression: Record<string, boolean>;
        initialize(data?: any, { reset }?: {
            reset?: boolean | undefined;
        }): any;
        refresh(): void;
        _refresh(): void;
        destroy(): void;
        add(): void;
        remove(): void;
        testPoint(point: foundry.types.ElevatedPoint): boolean;
    };
    /** @inheritDoc */
    defaultData: {
        radius: number;
        externalRadius: number;
        rotation: number;
        angle: number;
        walls: boolean;
        priority: number;
        /**
         * The x-coordinate of the source location
         */
        x: number;
        /**
         * The y-coordinate of the source location
         */
        y: number;
        /**
         * The elevation of the point source
         */
        elevation: number;
        /**
         * The ID of the Level the point source is in
         */
        level: string;
        /**
         * Whether or not the source is disabled
         */
        disabled: boolean;
    };
    sourceType: string;
    effectsCollection: string;
};
export type PointEffectSourceData = {
    /**
     * The radius of the source
     */
    radius: number;
    /**
     * A secondary radius used for limited angles
     */
    externalRadius: number;
    /**
     * The angle of rotation for this point source
     */
    rotation: number;
    /**
     * The angle of emission for this point source
     */
    angle: number;
    /**
     * Whether or not the source is constrained by walls and surfaces
     */
    walls: boolean;
    /**
     * Strength of this source to beat or not negative/positive sources
     */
    priority: number;
};
import type { ClockwiseSweepPolygonConfig } from "../geometry/_types.mjs";
import PointSourcePolygon from "../geometry/shapes/source-polygon.mjs";
import type { EdgeCreationOptions } from "../geometry/_types.mjs";
import type BaseEffectSource from "./base-effect-source.mjs";
