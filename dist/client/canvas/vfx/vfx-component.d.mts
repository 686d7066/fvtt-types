/**
 * @import { DataField } from "../../../common/data/fields.mjs";
 * @import { DataFieldOptions, DataFieldContext, DataModelConstructionContext } from "../../../common/data/_types.mjs"
 * @import { VFXCanvasContainer } from '../canvas/vfx-canvas-container.mjs'
 */
/**
 * Will be extended later to support spritesheet frames and animations
 * @typedef {string} VFXTextureConfig
 **/
/**
 * @template {object} ModelData
 * @extends {foundry.abstract.DataModel<ModelData, DataModelConstructionContext>}
 */
export default class VFXComponent<ModelData extends object> extends DataModel<ModelData, DataModelConstructionContext> {
    /**
     * The type of this component. Must be overridden in the subclass.
     * @type {string}
     */
    static TYPE: string;
    /** @override */
    static override defineSchema(): {
        type: StringField;
    };
    constructor(data?: Partial<ModelData> | undefined, { parent, schema, strict, ...options }?: any);
    /**
     * A component-specific sub-timeline.
     * @type {animejs.Timeline}
     */
    get timeline(): animejs.Timeline;
    /**
     * Have the materials for this component been loaded?
     * @type {boolean}
     */
    get loaded(): boolean;
    /**
     * Is the animation for this component playing?
     * @returns {boolean}
     */
    get playing(): boolean;
    /**
     * Asset paths required to be loaded for this component.
     * @type {Set<string>}
     */
    get assetPaths(): Set<string>;
    /**
     * A registry of display objects which are managed by this component.
     * @type {Record<string, PIXI.DisplayObject[]>}
     */
    get managedDisplayObjects(): Record<string, PIXI.DisplayObject[]>;
    /**
     * Adds a DisplayObject to the set of managed primary display objects.
     * Entries in this list will be added to the primary canvas container when the component is attached and
     * removed when the component is destroyed.
     * @template {PIXI.DisplayObject} DisplayObject
     * @param {DisplayObject} object        The object to manage
     * @param {string} [group="primary"]    A canvas group that should contain the object
     * @returns {DisplayObject}
     */
    addManagedDisplayObject<DisplayObject extends PIXI.DisplayObject>(object: DisplayObject, group?: string | undefined): DisplayObject;
    /**
     * Load this component.
     * @returns {Promise<void>}
     */
    load(): Promise<void>;
    /**
     * Perform subclass-specific loading steps to prepare assets for rendering.
     * @protected
     * @returns {Promise<void>}
     */
    protected _load(): Promise<void>;
    /**
     * Prepare the timeline and create display objects used by this component.
     * Components should override the _draw method to implement subclass-specific steps.
     * @returns {Promise<void>}
     */
    draw(): Promise<void>;
    /**
     * Perform subclass-specific drawing steps to configure the component timeline and create display objects.
     * @protected
     * @returns {Promise<void>}
     */
    protected _draw(): Promise<void>;
    /**
     * Attach display objects used by this component to the canvas containers that should render them.
     */
    attach(): void;
    /**
     * Perform subclass-specific attachment steps to customize how display objects are added to the canvas.
     * @protected
     */
    protected _attach(): void;
    /**
     * Stop playback of this component and destroy its contents.
     * @returns {Promise<void>}
     */
    stop(): Promise<void>;
    /**
     * Cancel playback of this component and destroy its contents.
     * @returns {Promise<void>}
     */
    cancel(): Promise<void>;
    /**
     * Perform subclass-specific steps to discontinue component playback.
     * @protected
     * @returns {Promise<void>}
     */
    protected _stop(): Promise<void>;
    /**
     * Perform subclass-specific teardown steps to destroy and dispose of component materials.
     */
    _destroy(): void;
    #private;
}
/**
 * Will be extended later to support spritesheet frames and animations
 */
export type VFXTextureConfig = string;
import DataModel from "../../../common/abstract/data.mjs";
import { StringField } from "../../../common/data/fields.mjs";
