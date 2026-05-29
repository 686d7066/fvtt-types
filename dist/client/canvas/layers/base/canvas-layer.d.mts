/**
 * @import {CanvasTearDownOptions} from "../../../_types.mjs";
 */
/**
 * An abstract pattern for primary layers of the game canvas to implement.
 * @category Canvas
 * @abstract
 * @interface
 */
export default class CanvasLayer {
    /**
     * Customize behaviors of this CanvasLayer by modifying some behaviors at a class level.
     * @type {{name: string; zIndex: number}}
     */
    static get layerOptions(): {
        name: string;
        zIndex: number;
    };
    /**
     * Return a reference to the active instance of this canvas layer
     * @type {CanvasLayer}
     */
    static get instance(): CanvasLayer;
    /**
     * Options for this layer instance.
     * @type {{name: string}}
     */
    options: {
        name: string;
    };
    interactiveChildren: boolean;
    /**
     * The canonical name of the CanvasLayer is the name of the constructor that is the immediate child of the
     * defined baseClass for the layer type.
     * @type {string}
     *
     * @example
     * canvas.lighting.name -> "LightingLayer"
     */
    get name(): string;
    /**
     * The name used by hooks to construct their hook string.
     * Note: You should override this getter if hookName should not return the class constructor name.
     * @type {string}
     */
    get hookName(): string;
    /**
     * Draw the canvas layer, rendering its internal components and returning a Promise.
     * The Promise resolves to the drawn layer once its contents are successfully rendered.
     * @param {object} [options]      Options which configure how the layer is drawn
     * @returns {Promise<CanvasLayer>}
     */
    draw(options?: object | undefined): Promise<CanvasLayer>;
    /**
     * The inner _draw method which must be defined by each CanvasLayer subclass.
     * @param {object} options      Options which configure how the layer is drawn
     * @protected
     */
    protected _draw(options: object): Promise<void>;
    zIndex: number | undefined;
    /**
     * Deconstruct data used in the current layer in preparation to re-draw the canvas
     * @param {CanvasTearDownOptions} [options]  Options which configure how the layer is deconstructed
     * @returns {Promise<CanvasLayer>}
     */
    tearDown(options?: CanvasTearDownOptions | undefined): Promise<CanvasLayer>;
    renderable: boolean | undefined;
    /**
     * The inner _tearDown method which may be customized by each CanvasLayer subclass.
     * @param {CanvasTearDownOptions} options  Options which configure how the layer is deconstructed
     * @protected
     */
    protected _tearDown(options: CanvasTearDownOptions): Promise<void>;
    /**
     * Get the zIndex that should be used for ordering this layer vertically relative to others in the same Container.
     * @returns {number}
     */
    getZIndex(): number;
    #private;
}
import type { CanvasTearDownOptions } from "../../../_types.mjs";
