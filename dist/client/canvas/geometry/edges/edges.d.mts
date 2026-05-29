/**
 * A specialized Map class that manages all edges used to restrict perception in a Scene.
 * Integrates with a Quadtree for efficient spatial queries.
 * @extends {Map<string, Edge>}
 */
export default class CanvasEdges extends Map<string, Edge> {
    /**
     * Maximum number of objects per node in the Quadtree.
     * @type {number}
     */
    static "__#104@#QUADTREE_MAX_OBJECTS": number;
    /**
     * Maximum depth of the Quadtree.
     * @type {number}
     */
    static "__#104@#QUADTREE_MAX_DEPTH": number;
    constructor(level: any);
    /**
     * The Level these edges belong to.
     * @type {Level}
     */
    get level(): Level;
    /** @inheritDoc */
    set(id: any, edge: any): this;
    /** @inheritDoc */
    delete(id: any): boolean;
    /** @inheritDoc */
    clear(): this;
    /**
     * Retrieves edges that overlap with a given rectangle.
     * Utilizes the Quadtree for efficient spatial querying.
     * This function computes edge intersections if necessary.
     * @param {PIXI.Rectangle} rect The rectangle to query against.
     * @param {object} options
     * @param {boolean} [options.includeInnerBounds=false] Should inner bounds be added?
     * @param {boolean} [options.includeOuterBounds=true] Should outer bounds be added?
     * @param {(edge: Edge) => boolean} [options.collisionTest] Collision function to test edge inclusion.
     * @param {boolean} [options.collisionTestBounds=false] Apply collision test to bounds?
     * @returns {Set<Edge>} A set of Edge instances that intersect with the provided rectangle.
     */
    getEdges(rect: PIXI.Rectangle, { includeInnerBounds, includeOuterBounds, collisionTest, collisionTestBounds }?: {
        includeInnerBounds?: boolean | undefined;
        includeOuterBounds?: boolean | undefined;
        collisionTest?: ((edge: Edge) => boolean) | undefined;
        collisionTestBounds?: boolean | undefined;
    }): Set<Edge>;
    /**
     * @deprecated since v14
     * @ignore
     */
    inititalize(): void;
    /**
     * @deprecated since v14
     * @ignore
     */
    refresh(): void;
    #private;
}
import Edge from "./edge.mjs";
