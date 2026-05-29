/**
 * @import Level from "../../documents/level.mjs";
 * @import CanvasLayer from "../layers/base/canvas-layer.mjs";
 * @import {CanvasTearDownOptions} from "../../_types.mjs";
 */
/**
 * A mixin which decorates any container with base canvas common properties.
 * @category Mixins
 * @param {typeof Container} ContainerClass  The parent Container class being mixed.
 */
export default function CanvasGroupMixin(ContainerClass: typeof Container): {
    new (...args: any[]): {
        sortableChildren: boolean;
        /**
         * A mapping of CanvasLayer classes which belong to this group.
         * @type {Record<string, CanvasLayer>}
         */
        layers: Record<string, CanvasLayer>;
        /**
         * The canonical name of the canvas group is the name of the constructor that is the immediate child of the
         * defined base class.
         * @type {string}
         */
        readonly name: string;
        /**
         * The name used by hooks to construct their hook string.
         * Note: You should override this getter if hookName should not return the class constructor name.
         * @type {string}
         */
        readonly hookName: string;
        /**
         * Create CanvasLayer instances which belong to the canvas group.
         * @protected
         */
        _createLayers(): {};
        /**
         * An internal reference to a Promise in-progress to draw the canvas group.
         * @type {Promise<this>}
         */
        "__#206@#drawing": Promise<any>;
        /**
         * Is the group drawn?
         * @type {boolean}
         */
        "__#206@#drawn": boolean;
        /**
         * Draw the canvas group and all its components.
         * @param {object} [options]    Options which configure how the group is drawn.
         *                              Forwarded to {@link foundry.canvas.layers.CanvasLayer#draw}.
         * @returns {Promise<this>}     A Promise which resolves once the group is fully drawn.
         */
        draw(options?: object | undefined): Promise<any>;
        /**
         * Draw the canvas group and all its component layers.
         * @param {object} options      Options which configure how the group is drawn.
         *                              Forwarded to {@link foundry.canvas.layers.CanvasLayer#draw}.
         * @returns {Promise<this>}     A Promise which resolves once the group is fully drawn.
         * @protected
         */
        _draw(options: object): Promise<any>;
        /**
         * Remove and destroy all layers from the base canvas.
         * @param {CanvasTearDownOptions} [options]  Options which configure how the group is deconstructed.
         *                                           Forwarded to {@link foundry.canvas.layers.CanvasLayer#tearDown}
         * @returns {Promise<this>}
         */
        tearDown(options?: CanvasTearDownOptions | undefined): Promise<any>;
        /**
         * Remove and destroy all layers from the base canvas.
         * @param {CanvasTearDownOptions} options  Options which configure how the group is deconstructed.
         *                                         Forwarded to {@link foundry.canvas.layers.CanvasLayer#tearDown}
         * @protected
         */
        _tearDown(options: CanvasTearDownOptions): Promise<void>;
    };
    /**
     * The name of this canvas group.
     * @type {string|undefined}
     * @abstract
     */
    groupName: string | undefined;
    /**
     * If this canvas group should teardown non-layers children.
     * @type {boolean}
     */
    tearDownChildren: boolean;
};
import type CanvasLayer from "../layers/base/canvas-layer.mjs";
import type { CanvasTearDownOptions } from "../../_types.mjs";
