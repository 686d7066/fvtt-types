/**
 * @import Note from "../placeables/note.mjs";
 */
/**
 * The Notes Layer which contains Note canvas objects.
 * @category Canvas
 */
export default class NotesLayer extends PlaceablesLayer {
    /** @inheritdoc */
    static get layerOptions(): object;
    /** @inheritdoc */
    static paletteClass: typeof NotePalette;
    /**
     * The named core setting which tracks the toggled visibility state of map notes
     * @type {string}
     */
    static TOGGLE_SETTING: string;
    /**
     * Register game settings used by the NotesLayer
     */
    static registerSettings(): void;
    /** @override */
    static override prepareSceneControls(): {
        name: string;
        order: number;
        title: string;
        layer: string;
        icon: string;
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
            };
            journal: {
                name: string;
                order: number;
                title: string;
                visible: boolean;
                icon: string;
                interaction: boolean;
                control: boolean;
                creation: boolean;
            };
            toggle: {
                name: string;
                order: number;
                title: string;
                icon: string;
                toggle: boolean;
                active: any;
                onChange: (event: any, toggled: any) => Promise<any>;
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
            clear: {
                name: string;
                order: number;
                title: string;
                icon: string;
                onChange: () => any;
                button: boolean;
            };
        };
        activeTool: string;
    };
    /** @override */
    override interactiveChildren: any;
    /** @inheritDoc */
    _getCopyableObjects(options: any): foundry.canvas.placeables.PlaceableObject[];
    /**
     * Pan to a given note on the layer.
     * @param {Note} note                      The note to pan to.
     * @param {object} [options]               Options which modify the pan operation.
     * @param {number} [options.scale=1.5]     The resulting zoom level.
     * @param {number} [options.duration=250]  The speed of the pan animation in milliseconds.
     * @returns {Promise<void>}                A Promise which resolves once the pan animation has concluded.
     */
    panToNote(note: Note, { scale, duration }?: {
        scale?: number | undefined;
        duration?: number | undefined;
    } | undefined): Promise<void>;
    /** @inheritdoc */
    _onClickLeft(event: any): Promise<void>;
    /**
     * Handle JournalEntry document drop data
     * @param {DragEvent} event   The drag drop event
     * @param {object} data       The dropped data transfer data
     * @protected
     */
    protected _onDropData(event: DragEvent, data: object): Promise<false | foundry.canvas.placeables.PlaceableObject>;
    #private;
}
import PlaceablesLayer from "./base/placeables-layer.mjs";
import type Note from "../placeables/note.mjs";
import NotePalette from "../../applications/sheets/palette/note-palette.mjs";
