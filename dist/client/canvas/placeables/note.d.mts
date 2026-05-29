/**
 * A Note is an implementation of PlaceableObject which represents an annotated location within the Scene.
 * Each Note links to a JournalEntry document and represents its location on the map.
 * @category Canvas
 * @see {@link foundry.documents.NoteDocument}
 * @see {@link foundry.canvas.layers.NotesLayer}
 */
export default class Note extends PlaceableObject {
    /** @override */
    static override RENDER_FLAGS: {
        redraw: {
            propagate: string[];
        };
        refresh: {
            propagate: string[];
            alias: boolean;
        };
        refreshState: {
            propagate: string[];
        };
        refreshVisibility: {};
        refreshTransform: {
            propagate: string[];
            alias: boolean;
        };
        refreshPosition: {};
        refreshSize: {};
        refreshTooltip: {};
        refreshElevation: {
            propagate: string[];
        };
    };
    /**
     * The tooltip.
     * @type {PreciseText}
     */
    tooltip: PreciseText;
    /**
     * The associated JournalEntry which is referenced by this Note
     * @type {JournalEntry}
     */
    get entry(): JournalEntry;
    /**
     * The specific JournalEntryPage within the associated JournalEntry referenced by this Note.
     */
    get page(): any;
    /**
     * A convenient reference for whether the current User is the author of the Note document.
     * @type {boolean}
     */
    get isAuthor(): boolean;
    /** @override */
    override get isVisible(): any;
    /** @override */
    override _overlapsSelection(rectangle: any): any;
    /** @override */
    override _draw(options: any): Promise<void>;
    /**
     * Draw the control icon.
     * @returns {ControlIcon}
     * @protected
     */
    protected _drawControlIcon(): ControlIcon;
    /**
     * Draw the tooltip.
     * @returns {PreciseText}
     * @protected
     */
    protected _drawTooltip(): PreciseText;
    /**
     * Refresh the tooltip.
     * @protected
     */
    protected _refreshTooltip(): void;
    /**
     * Define a PIXI TextStyle object which is used for the tooltip displayed for this Note
     * @returns {PIXI.TextStyle}
     * @protected
     */
    protected _getTextStyle(): PIXI.TextStyle;
    /** @inheritDoc */
    _applyRenderFlags(flags: any): void;
    /**
     * Refresh the position of the Note. Called with the coordinates change.
     * @protected
     */
    protected _refreshPosition(): void;
    /**
     * Refresh the size of the Note.
     * @protected
     */
    protected _refreshSize(): void;
    /**
     * Refresh the elevation of the control icon.
     * @protected
     */
    protected _refreshElevation(): void;
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
    /** @override */
    override _canHover(user: any): boolean;
    /** @override */
    override _canView(user: any): any;
    /** @inheritdoc */
    _onClickLeft2(event: any): Promise<ImagePopout> | undefined;
}
import PlaceableObject from "./placeable-object.mjs";
import PreciseText from "../containers/elements/precise-text.mjs";
import ControlIcon from "../containers/elements/control-icon.mjs";
import ImagePopout from "../../applications/apps/image-popout.mjs";
