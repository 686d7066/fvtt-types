declare const ControlIcon_base: {
    new (...args: any[]): {
        renderFlags: foundry.canvas.interaction.RenderFlags;
        applyRenderFlags(): void;
    };
    RENDER_FLAGS: Record<string, PIXI>;
    RENDER_FLAG_PRIORITY: string;
};
/**
 * A generic helper for drawing a standard Control Icon.
 */
export default class ControlIcon extends ControlIcon_base {
    /** @override */
    static override RENDER_FLAGS: {
        redraw: {
            propagate: string[];
        };
        refresh: {};
    };
    /**
     * @param {object} [options]
     * @param {PIXI.Texture|string} [options.texture]   The (URL of the) icon texture
     * @param {number} [options.size]                   The size of the icon
     * @param {PIXI.ColorSource} [options.tint]         The icon tint
     * @param {PIXI.ColorSource} [options.borderColor]  The border color
     * @param {number} [options.elevation]              The elevation
     */
    constructor({ texture, size, borderColor, tint, elevation }?: {
        texture?: PIXI.Texture | string;
        size?: number | undefined;
        tint?: any;
        borderColor?: any;
        elevation?: number | undefined;
    } | undefined);
    /**
     * The background of this control icon.
     * @type {PIXI.Graphics}
     */
    bg: PIXI.Graphics;
    /**
     * The icon of this control icon.
     * @type {PIXI.Sprite}
     */
    icon: PIXI.Sprite;
    /**
     * The border of this control icon.
     * @type {PIXI.Graphics}
     */
    border: PIXI.Graphics;
    /**
     * The tooltip of this control icon.
     * @type {PreciseText}
     */
    tooltip: PreciseText;
    hitArea: any;
    interactiveChildren: boolean;
    eventMode: string;
    cursor: string;
    set texture(value: any);
    /**
     * The (URL of the) icon texture used by this control icon.
     * @type {PIXI.Texture|string}
     */
    get texture(): any;
    set size(value: number);
    /**
     * The size of the control icon.
     * @type {number}
     */
    get size(): number;
    set elevation(value: number);
    /**
     * The elevation of the control icon, which is displayed in its tooltip text.
     * @type {number}
     */
    get elevation(): number;
    /**
     * Draw the visualization of this control icon.
     * @returns {Promise<this>}
     */
    draw(): Promise<this>;
    /**
     * Draw this control icon.
     * @returns {Promise<void>}
     * @protected
     */
    protected _draw(): Promise<void>;
    /**
     * Clear this control icon.
     * @protected
     */
    protected _clear(): void;
    /**
     * Refresh the visualization of this control icon.
     * @protected
     */
    protected _refresh(): void;
    /**
     * Refresh the visualization of this control icon.
     * @overload
     */
    refresh(): any;
    /**
     * @overload
     * @param {object} options
     * @deprecated since v14
     * @ignore
     */
    refresh(options: object): any;
    visible: any;
    /** @inheritDoc */
    destroy(options: any): void;
    /**
     * @deprecated since v14
     * @ignore
     */
    get rect(): number[];
    /**
     * @deprecated since v14
     * @ignore
     */
    get tintColor(): any;
    /**
     * @deprecated since v14
     * @ignore
     */
    get borderColor(): any;
    set iconSrc(value: any);
    /**
     * @deprecated since v14
     * @ignore
     */
    get iconSrc(): any;
    #private;
}
import PreciseText from "./precise-text.mjs";
export {};
