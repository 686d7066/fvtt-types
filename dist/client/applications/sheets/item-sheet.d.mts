/**
 * @import {Item, Actor} from "../../documents/_module.mjs";
 */
/**
 * A base class for providing Item Sheet behavior using ApplicationV2.
 */
export default class ItemSheetV2 extends DocumentSheetV2 {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        position: {
            width: number;
        };
    };
    /**
     * The Item document managed by this sheet.
     * @type {Item}
     */
    get item(): Item;
    /**
     * The Actor instance which owns this Item, if any.
     * @type {Actor|null}
     */
    get actor(): Actor | null;
    /**
     * Return a cached copy of a DragDrop instance, creating one on first access.
     * @type {DragDrop}
     * @protected
     */
    protected get _dragDrop(): DragDrop;
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
     * An event that occurs when a drag workflow begins for a draggable ActiveEffect on the sheet.
     * @param {DragEvent} event       The initiating drag start event
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
    /**
     * Handle a dropped document on the ItemSheet
     * @template {Document} TDocument
     * @param {DragEvent} event         The initiating drop event
     * @param {TDocument} document       The resolved Document class
     * @returns {Promise<TDocument|null>} A Document of the same type as the dropped one in case of a successful result,
     *                                    or null in case of failure or no action being taken
     * @protected
     */
    protected _onDropDocument<TDocument extends Document>(event: DragEvent, document: TDocument): Promise<TDocument | null>;
    /**
     * Handle a dropped Active Effect on the Item Sheet.
     * The default implementation creates an Active Effect embedded document on the Item.
     * @param {DragEvent} event       The initiating drop event
     * @param {ActiveEffect} effect   The dropped ActiveEffect document
     * @returns {Promise<ActiveEffect|null|undefined>} A Promise resolving to a newly created ActiveEffect, if one was
     *                                                 created, or otherwise a nullish value
     * @protected
     */
    protected _onDropActiveEffect(event: DragEvent, effect: ActiveEffect): Promise<ActiveEffect | null | undefined>;
    #private;
}
import DocumentSheetV2 from "../api/document-sheet.mjs";
import type { Item } from "../../documents/_module.mjs";
import type { Actor } from "../../documents/_module.mjs";
import { DragDrop } from "../ux/_module.mjs";
import ActiveEffect from "../../documents/active-effect.mjs";
