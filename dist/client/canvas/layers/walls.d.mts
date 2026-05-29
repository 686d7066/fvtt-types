/**
 * @import Wall from "../placeables/wall.mjs";
 * @import {WallData} from "../../../common/documents/_types.mjs";
 */
/**
 * The Walls canvas layer which provides a container for Wall objects within the rendered Scene.
 * @category Canvas
 */
export default class WallsLayer extends PlaceablesLayer {
    /** @inheritDoc */
    static get layerOptions(): object;
    /** @inheritdoc */
    static paletteClass: typeof WallPalette;
    /**
     * Given a point and the coordinates of a wall, determine which endpoint is closer to the point
     * @param {Point} point         The origin point of the new Wall placement
     * @param {Wall} wall           The existing Wall object being chained to
     * @returns {PointArray}        The [x,y] coordinates of the starting endpoint
     */
    static getClosestEndpoint(point: Point, wall: Wall): PointArray;
    /** @override */
    static override prepareSceneControls(): {
        name: string;
        order: number;
        title: string;
        layer: string;
        icon: string;
        visible: boolean;
        onChange: (event: any, active: any) => void;
        onToolChange: (_event: any, tool: any, active: any) => void;
        tools: {
            select: {
                name: string;
                order: number;
                title: string;
                icon: string;
                interaction: boolean;
                control: boolean;
                toolclip: {
                    src: string;
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            wall: {
                name: string;
                order: number;
                title: string;
                icon: string;
                interaction: boolean;
                control: boolean;
                creation: boolean;
                toolclip: {
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
            };
            solid: {
                name: string;
                order: number;
                title: string;
                icon: string;
                button: boolean;
                createData: object;
                toolclip: {
                    src: string;
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
                onChange: typeof WallPalette.onClickPreset;
            };
            terrain: {
                name: string;
                order: number;
                title: string;
                icon: string;
                button: boolean;
                createData: object;
                toolclip: {
                    src: string;
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
                onChange: typeof WallPalette.onClickPreset;
            };
            invisible: {
                name: string;
                order: number;
                title: string;
                icon: string;
                button: boolean;
                createData: object;
                toolclip: {
                    src: string;
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
                onChange: typeof WallPalette.onClickPreset;
            };
            ethereal: {
                name: string;
                order: number;
                title: string;
                icon: string;
                button: boolean;
                createData: object;
                toolclip: {
                    src: string;
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
                onChange: typeof WallPalette.onClickPreset;
            };
            doors: {
                name: string;
                order: number;
                title: string;
                icon: string;
                button: boolean;
                createData: object;
                toolclip: {
                    src: string;
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
                onChange: typeof WallPalette.onClickPreset;
            };
            secret: {
                name: string;
                order: number;
                title: string;
                icon: string;
                button: boolean;
                createData: object;
                toolclip: {
                    src: string;
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
                onChange: typeof WallPalette.onClickPreset;
            };
            window: {
                name: string;
                order: number;
                title: string;
                icon: string;
                button: boolean;
                readonly createData: object;
                toolclip: {
                    src: string;
                    heading: string;
                    items: import("../../applications/ui/scene-controls.mjs").ToolclipConfigurationItem[];
                };
                onChange: typeof WallPalette.onClickPreset;
            };
            snap: {
                name: string;
                order: number;
                title: string;
                icon: string;
                toggle: boolean;
                visible: boolean;
                active: boolean;
                onChange: (event: any, toggled: any) => any;
                toolclip: {
                    src: string;
                    heading: string;
                    items: {
                        paragraph: string;
                    }[];
                };
            };
            togglePalette: {
                order: number;
                /**
                 * An identifier for the tool, unique among the tools of its SceneControl
                 */
                name?: string | undefined;
                /**
                 * A title for the tool: can be a localization path
                 */
                title?: string | undefined;
                /**
                 * One or more icon classes for the tool, typically Font Awesome classes such as
                 * "fa-solid fa-face-smile"
                 */
                icon?: string | undefined;
                /**
                 * Whether the tool should be visible to the current User
                 */
                visible?: boolean | undefined;
                /**
                 * Is the tool an on-or-off toggle?
                 */
                toggle?: boolean | undefined;
                /**
                 * Is the tool the currently the active one? Not applicable to toggles or buttons.
                 */
                active?: boolean | undefined;
                /**
                 * Is the tool a "button" in the sense of immediately resolving on click without
                 *  becoming the active tool?
                 */
                button?: boolean | undefined;
                /**
                 * Does this tool allow interaction with placeables?
                 */
                interaction?: boolean | undefined;
                /**
                 * Does this tool allow placeables to be controlled?
                 */
                control?: boolean | undefined;
                /**
                 * Does this tool create placeables?
                 */
                creation?: boolean | undefined;
                /**
                 * Default creation data
                 */
                createData?: object | undefined;
                /**
                 * The data of the shape this tool creates
                 */
                shapeData?: object | undefined;
                /**
                 * A callback invoked when the tool is activated or
                 *  deactivated
                 */
                onChange?: ((event: Event, active: boolean) => void) | undefined;
                /**
                 * Configuration for rendering the tool's toolclip
                 */
                toolclip?: import("../../applications/ui/scene-controls.mjs").ToolclipConfiguration | undefined;
            };
            closeDoors: {
                name: string;
                order: number;
                title: string;
                icon: string;
                button: boolean;
                onChange: () => void;
            };
            clear: {
                name: string;
                order: number;
                title: string;
                icon: string;
                button: boolean;
                onChange: () => any;
            };
        };
        activeTool: string;
    };
    /**
     * A graphics layer used to display chained Wall selection
     * @type {PIXI.Graphics}
     */
    chain: PIXI.Graphics;
    /**
     * Track whether we are currently within a chained placement workflow
     * @type {boolean}
     * @internal
     */
    _chain: boolean;
    /**
     * Reference the last interacted wall endpoint for the purposes of chaining
     * @type {{point: PointArray}}
     * @internal
     */
    _last: {
        point: PointArray;
    };
    /**
     * An Array of Wall instances in the current Scene which act as Doors.
     * @type {Wall[]}
     */
    get doors(): Wall[];
    /** @override */
    override getSnappedPoint(point: any): foundry.types.Point;
    /** @inheritDoc */
    releaseAll(options: any): number;
    /**
     * Get the wall endpoint coordinates for a given point.
     * @param {Point} point                    The candidate wall endpoint.
     * @param {object} [options]
     * @param {boolean} [options.snap=true]    Snap to the grid?
     * @returns {[x: number, y: number]}       The wall endpoint coordinates.
     * @internal
     */
    _getWallEndpointCoordinates(point: Point, { snap }?: {
        snap?: boolean | undefined;
    } | undefined): [x: number, y: number];
    /**
     * Identify the interior enclosed by the given walls.
     * @param {Wall[]} walls        The walls that enclose the interior.
     * @returns {PIXI.Polygon[]}    The polygons of the interior.
     * @license MIT
     */
    identifyInteriorArea(walls: Wall[]): PIXI.Polygon[];
    /** @override */
    override _createDragPreviewData(event: any): object;
    /** @override */
    override _onDragLeftMove(event: any): void;
    /**
     * Custom undo for wall creation while chaining is active.
     * @param {object} event
     * @returns {Promise<Document[]>}
     * @protected
     */
    protected _onUndoCreate(event: object): Promise<Document[]>;
}
import PlaceablesLayer from "./base/placeables-layer.mjs";
import type Wall from "../placeables/wall.mjs";
import WallPalette from "../../applications/sheets/palette/wall-palette.mjs";
