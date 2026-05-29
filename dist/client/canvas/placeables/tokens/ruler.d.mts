/**
 * @import {GridMeasurePathResultWaypoint, GridOffset3D} from "../../../../common/grid/_types.mjs";
 * @import {DeepReadonly, TokenPlannedMovementWaypoint, TokenRulerWaypoint} from "../../../_types.mjs";
 * @import {TokenMovementWaypoint, TokenMeasuredMovementWaypoint} from "../../../documents/_types.mjs";
 * @import GridHighlight from "../../containers/elements/grid-highlight.mjs"
 */
/**
 * The default implementation of the Token ruler.
 */
export default class TokenRuler extends BaseTokenRuler {
    /**
     * A handlebars template used to render each waypoint label.
     * @type {string}
     */
    static WAYPOINT_LABEL_TEMPLATE: string;
    /**
     * The waypoint draw functions.
     * @enum {(g: PIXI.Graphics, x: number, y: number, radius: number) => void}
     */
    static "__#195@#WAYPOINT_DRAW_FUNCTIONS": {
        circle: (g: any, x: any, y: any, radius: any) => void;
        square: (g: any, x: any, y: any, radius: any) => void;
        diamond: (g: any, x: any, y: any, radius: any) => void;
        triangleUp: (g: any, x: any, y: any, radius: any) => void;
        triangleDown: (g: any, x: any, y: any, radius: any) => void;
        hexagonFlat: (g: any, x: any, y: any, radius: any) => void;
        hexagonPointy: (g: any, x: any, y: any, radius: any) => void;
        octagon: (g: any, x: any, y: any, radius: any) => void;
    };
    constructor(token: any);
    /**
     * Configure the properties of the outline.
     * Called in {@link TokenRuler#draw}.
     * @returns {{thickness: number; color: PIXI.ColorSource}}    The thickness in pixels and the color
     * @protected
     */
    protected _configureOutline(): {
        thickness: number;
        color: PIXI.ColorSource;
    };
    /**
     * Configure the properties of the dash line.
     * Called in {@link TokenRuler#draw}.
     * @returns {{dash: number; gap: number; speed: number}}
     *   The dash in pixels, the gap in pixels, and the speed in pixels per second
     * @protected
     */
    protected _configureDashLine(): {
        dash: number;
        gap: number;
        speed: number;
    };
    /**
     * Prepare the path.
     * @param {TokenRulerWaypoint[]} path
     * @protected
     */
    protected _preparePath(path: TokenRulerWaypoint[]): void;
    /**
     * Should the ruler waypoint be rendered?
     * @param {DeepReadonly<TokenRulerWaypoint>} waypoint
     * @returns {boolean}
     * @protected
     */
    protected _shouldRenderWaypoint(waypoint: DeepReadonly<TokenRulerWaypoint>): boolean;
    /**
     * Accumulate waypoint data. Skipped waypoints and the next rendered waypoint are accumulated.
     *
     * The base implementation accumulates the waypoint cost.
     * @param {Partial<TokenRulerWaypoint>} accumulator      The accumulated waypoint data
     * @param {DeepReadonly<TokenRulerWaypoint>} waypoint    A waypoint to be accumulated
     * @protected
     */
    protected _accumulateWaypointData(accumulator: Partial<TokenRulerWaypoint>, waypoint: DeepReadonly<TokenRulerWaypoint>): void;
    /** @override */
    override refresh({ passedWaypoints, pendingWaypoints, plannedMovement }: {
        passedWaypoints: any;
        pendingWaypoints: any;
        plannedMovement: any;
    }): void;
    /**
     * Get the context used to render a ruler waypoint label.
     * @param {DeepReadonly<TokenRulerWaypoint>} waypoint
     * @param {object} state
     * @returns {object|void}
     * @protected
     */
    protected _getWaypointLabelContext(waypoint: DeepReadonly<TokenRulerWaypoint>, state: object): object | void;
    /**
     * Get the style of the waypoint at the given waypoint.
     * @param {DeepReadonly<TokenRulerWaypoint>} waypoint       The waypoint
     * @returns {{
     *   radius: number;
     *   shape?: "circle"|"square"|"diamond"|"triangleUp"|"triangleDown"|"hexagonFlat"|"hexagonPointy"|"octagon";
     *   color?: PIXI.ColorSource;
     *   alpha?: number;
     * }}  The shape, radius, color, and alpha of the waypoint. If the radius is 0, no waypoint marker is drawn.
     * @protected
     */
    protected _getWaypointStyle(waypoint: DeepReadonly<TokenRulerWaypoint>): {
        radius: number;
        shape?: "circle" | "square" | "diamond" | "triangleUp" | "triangleDown" | "hexagonFlat" | "hexagonPointy" | "octagon";
        color?: PIXI.ColorSource;
        alpha?: number;
    };
    /**
     * Get the style of the segment from the previous to the given waypoint.
     * @param {DeepReadonly<TokenRulerWaypoint>} waypoint      The waypoint
     * @returns {{width: number; color?: PIXI.ColorSource; alpha?: number}}
     *   The line width, color, and alpha of the segment.  If the width is 0, no segment is drawn.
     * @protected
     */
    protected _getSegmentStyle(waypoint: DeepReadonly<TokenRulerWaypoint>): {
        width: number;
        color?: PIXI.ColorSource;
        alpha?: number;
    };
    /**
     * Get the style to be used to highlight the grid offset.
     * @param {DeepReadonly<TokenRulerWaypoint>} waypoint    The waypoint
     * @param {DeepReadonly<GridOffset3D>} offset  An occupied grid offset at the given waypoint that is to be highlighted
     * @returns {{color?: PIXI.ColorSource; alpha?: number; texture?: PIXI.Texture; matrix?: PIXI.Matrix | null}}
     *   The color, alpha, texture, and texture matrix to be used to draw the grid space.
     *   If the alpha is 0, the grid space is not highlighted.
     * @protected
     */
    protected _getGridHighlightStyle(waypoint: DeepReadonly<TokenRulerWaypoint>, offset: DeepReadonly<GridOffset3D>): {
        color?: PIXI.ColorSource;
        alpha?: number;
        texture?: PIXI.Texture;
        matrix?: PIXI.Matrix | null;
    };
    #private;
}
import BaseTokenRuler from "./base-ruler.mjs";
import type { TokenRulerWaypoint } from "../../../_types.mjs";
import type { DeepReadonly } from "../../../_types.mjs";
import type { GridOffset3D } from "../../../../common/grid/_types.mjs";
