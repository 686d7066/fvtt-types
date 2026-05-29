/**
 * @import {ApplicationClickAction, FormFooterButton} from "../_types.mjs";
 */
/**
 * The Application responsible for configuring a single Region document within a parent Scene.
 */
export default class RegionConfig extends PlaceableConfig {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        classes: string[];
        viewPermission: 2;
        window: {
            contentClasses: string[];
            icon: string;
        };
        position: {
            width: number;
        };
        form: {
            closeOnSubmit: boolean;
        };
        actions: {
            shapeCreateFromWalls: Function;
            shapeToggleHole: Function;
            shapeMoveUp: Function;
            shapeMoveDown: Function;
            shapeEdit: Function;
            shapeRemove: Function;
            shapeRemoveAll: Function;
            behaviorCreate: Function;
            behaviorDelete: Function;
            behaviorEdit: Function;
            behaviorToggle: Function;
        };
    };
    /** @override */
    static override PARTS: {
        tabs: {
            template: string;
        };
        appearance: {
            template: string;
        };
        shapes: {
            template: string;
            templates: string[];
            scrollable: string[];
        };
        placement: {
            template: string;
            scrollable: string[];
        };
        behaviors: {
            template: string;
            scrollable: string[];
        };
        footer: {
            template: string;
        };
    };
    /** @override */
    static override TABS: {
        sheet: {
            tabs: {
                id: string;
                icon: string;
            }[];
            initial: string;
            labelPrefix: string;
        };
    };
    /**
     * Handle button clicks to move the shape up.
     * @param {PointerEvent} event
     * @this {RegionConfig}
     */
    static "__#135@#onShapeMoveUp"(this: RegionConfig, event: PointerEvent): Promise<void>;
    /**
     * Handle button clicks to move the shape down.
     * @param {PointerEvent} event
     * @this {RegionConfig}
     */
    static "__#135@#onShapeMoveDown"(this: RegionConfig, event: PointerEvent): Promise<void>;
    /**
     * Handle button clicks to create shapes from the controlled walls.
     * @param {PointerEvent} event
     * @this {RegionConfig}
     */
    static "__#135@#onShapeCreateFromWalls"(this: RegionConfig, event: PointerEvent): Promise<void>;
    /**
     * Handle button clicks to toggle the hold field of a shape.
     * @param {PointerEvent} event
     * @this {RegionConfig}
     */
    static "__#135@#onShapeToggleHole"(this: RegionConfig, event: PointerEvent): Promise<void>;
    /**
     * Handle button clicks to edit a shape.
     * @param {PointerEvent} event
     * @this {RegionConfig}
     */
    static "__#135@#onShapeEdit"(this: RegionConfig, event: PointerEvent): void;
    /**
     * Handle button clicks to remove a shape.
     * @param {PointerEvent} event
     * @this {RegionConfig}
     */
    static "__#135@#onShapeRemove"(this: RegionConfig, event: PointerEvent): Promise<any>;
    /**
     * Handle button clicks to remove all shapes.
     * @param {PointerEvent} event
     * @this {RegionConfig}
     */
    static "__#135@#onShapeRemoveAll"(this: RegionConfig, event: PointerEvent): Promise<void>;
    static "__#135@#onBehaviorAdd"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /**
     * Handle button clicks to delete a behavior.
     * @param {PointerEvent} event
     * @this {RegionConfig}
     */
    static "__#135@#onBehaviorDelete"(this: RegionConfig, event: PointerEvent): Promise<void>;
    /**
     * Handle button clicks to edit a behavior.
     * @param {PointerEvent} event
     * @this {RegionConfig}
     */
    static "__#135@#onBehaviorEdit"(this: RegionConfig, event: PointerEvent): Promise<void>;
    /**
     * Handle button clicks to toggle a behavior.
     * @param {PointerEvent} event
     * @this {RegionConfig}
     */
    static "__#135@#onBehaviorToggle"(this: RegionConfig, event: PointerEvent): Promise<void>;
    /** @override */
    override _preparePartContext(partId: any, context: any): Promise<any>;
    /**
     * Update the Levels select element.
     * @param {Event} [event]    An input change event within the form
     * @protected
     */
    protected _updateLevelsSelectElement(event?: Event | undefined): void;
    /**
     * Update the Is Restricted select element.
     * @param {Event} [event]    An input change event within the form
     * @protected
     */
    protected _updateRestrictionEnabledElement(event?: Event | undefined): void;
    /** @inheritDoc */
    _processFormData(event: any, form: any, formData: any): object;
    /** @inheritDoc */
    _previewChanges(changes: any): void;
    /**
     * Define whether a user is able to begin a dragstart workflow for a given drag selector.
     * @param {string} selector       The candidate HTML selector for dragging
     * @returns {boolean}             Can the current user drag this selector?
     * @protected
     */
    protected _canDragStart(selector: string): boolean;
    /**
     * Define whether a user is able to conclude a drag-and-drop workflow for a given drop selector.
     * @param {string} selector       The candidate HTML selector for the drop target
     * @returns {boolean}             Can the current user drop on this selector?
     * @protected
     */
    protected _canDragDrop(selector: string): boolean;
    /**
     * An event that occurs when a drag workflow begins.
     * @param {DragEvent} event      The initiating drag start event
     * @returns {Promise<void>}
     * @protected
     */
    protected _onDragStart(event: DragEvent): Promise<void>;
    /**
     * An event that occurs when a drag workflow moves over a drop target.
     * @param {DragEvent} event
     * @protected
     */
    protected _onDragOver(event: DragEvent): void;
    /**
     * An event that occurs when data is dropped into a drop target.
     * @param {DragEvent} event
     * @returns {Promise<void>}
     * @protected
     */
    protected _onDrop(event: DragEvent): Promise<void>;
    #private;
}
import PlaceableConfig from "./placeable-config.mjs";
