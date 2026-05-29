/**
 * @import {
 *   ApplicationConfiguration, ApplicationRenderContext, ApplicationRenderOptions, FormFooterButton
 * } from "../../_types.mjs";
 * @import {HandlebarsRenderOptions} from "../../api/handlebars-applications.mjs";
 * @import Document from "../../../../common/abstract/document.mjs";
 */
/**
 * @typedef _PlaceableTabConfiguration
 * @property {string} collectionName         The name of the Scene collection represented in this tab.
 * @property {PlaceableDirectory} directory  The parent directory this tab is part of.
 */
/**
 * @typedef {ApplicationConfiguration & _PlaceableTabConfiguration} PlaceableTabConfiguration
 */
/**
 * @typedef {ApplicationRenderOptions & HandlebarsRenderOptions} PlaceableTabRenderOptions
 */
/**
 * @typedef PlaceableTabEntryContext
 * @property {Partial<FormFooterButton>[]} buttons
 * @property {string} id
 * @property {string} label
 */
/**
 * An application responsible for rendering a view of all placeables of a given type on the viewed Scene.
 * @extends {ApplicationV2<ApplicationRenderContext, PlaceableTabConfiguration>}
 * @mixes HandlebarsApplication
 */
export default class PlaceableTab extends ApplicationV2<ApplicationRenderContext, PlaceableTabConfiguration> {
    /** @override */
    static override DEFAULT_OPTIONS: {
        id: string;
        tag: string;
        classes: string[];
        window: {
            frame: boolean;
            positioned: boolean;
        };
        actions: {
            createEntry: Function;
            openFilter: {
                handler: Function;
                buttons: number[];
            };
        };
    };
    /**
     * The filter application class used by this tab.
     * @type {typeof PlaceableFilter}
     */
    static FILTER_CLASS: typeof PlaceableFilter;
    /**
     * The template of the directory.
     * @type {string}
     */
    static DIRECTORY_PARTIAL: string;
    /**
     * The template of a single directory entry.
     * @type {string}
     */
    static ENTRY_PARTIAL: string;
    /** @override */
    static override PARTS: {
        search: {
            template: string;
        };
        directory: {
            template: string;
            scrollable: string[];
        };
    };
    /**
     * Handle creating an entry.
     * @this {PlaceableTab}
     * @param {...any} args
     * @returns {Promise<Document|void>}
     */
    static "__#343@#onCreateEntry"(this: PlaceableTab, ...args: any[]): Promise<Document | void>;
    /**
     * Handle opening or closing the advanced filter dialog.
     * @this {PlaceableTab}
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target.
     */
    static "__#343@#onOpenFilter"(this: PlaceableTab, event: PointerEvent, target: HTMLElement): Promise<PlaceableFilter> | undefined;
    constructor(options?: Partial<ApplicationRenderContext> | undefined);
    /**
     * The Scene's collection whose contents are shown in this tab.
     * @type {string}
     */
    get collectionName(): string;
    /**
     * The Document class of the entries shown in this tab.
     * @type {typeof Document}
     */
    get documentClass(): typeof Document;
    /**
     * The canvas layer whose contents are shown in this tab.
     * @returns {PlaceablesLayer}
     */
    get layer(): PlaceablesLayer;
    /**
     * The schema of the entries shown in this tab.
     * @returns {DataModelSchemaField}
     */
    get schema(): DataModelSchemaField;
    /**
     * Current filter state.
     * @type {{
     *   dialog: PlaceableFilter|null,
     *   elevation: { bottom, top: number },
     *   levels: Set<string>,
     *   visible: Set<string>,
     *   [p: string]: any
     * }}
     * @protected
     */
    protected _filterState: {
        dialog: PlaceableFilter | null;
        elevation: {
            bottom: any;
            top: number;
        };
        levels: Set<string>;
        visible: Set<string>;
        [p: string]: any;
    };
    /**
     * The filter helper.
     * @type {SearchFilter}
     * @protected
     */
    protected _searchFilter: SearchFilter;
    /**
     * Highlight a hovered entry in the sidebar.
     * @param {PlaceableObject} object  The object being hovered on canvas.
     * @param {boolean} hover           The hover state.
     */
    hoverEntry(object: PlaceableObject, hover: boolean): void;
    /**
     * Determine if a placeable is visible in the sidebar.
     * @param {PlaceableObject} object  The placeable.
     * @returns {boolean}
     */
    isEntryVisible(object: PlaceableObject): boolean;
    /**
     * Test whether this tab currently has any active filter.
     * @returns {boolean}
     * @protected
     */
    protected _isFiltered(): boolean;
    /** @inheritDoc */
    _initializeApplicationOptions(options: any): ApplicationConfiguration;
    /** @inheritDoc */
    _configureRenderParts(options: any): any;
    /**
     * Retrieve an entry's label for use in the directory.
     * @param {Document} entry  The directory entry.
     * @returns {string}
     * @protected
     */
    protected _getEntryLabel(entry: Document): string;
    /** @inheritDoc */
    _onFirstRender(context: any, options: any): Promise<void>;
    /**
     * Prepare render context for the directory.
     * @param {ApplicationRenderContext} context   Render context.
     * @param {PlaceableTabRenderOptions} options  Render options.
     * @returns {Promise}
     * @protected
     */
    protected _prepareDirectoryContext(context: ApplicationRenderContext, options: PlaceableTabRenderOptions): Promise<any>;
    /**
     * Entry-specific preparation.
     * @param {Document} entry                    The Document instance.
     * @param {PlaceableTabEntryContext} context  Render context.
     * @returns {Promise<object>}
     * @protected
     */
    protected _prepareEntry(entry: Document, context: PlaceableTabEntryContext): Promise<object>;
    /** @inheritDoc */
    _preparePartContext(partId: any, context: any, options: any): Promise<any>;
    /**
     * Prepare render context for the search part.
     * @param {ApplicationRenderContext} context   Render context.
     * @param {PlaceableTabRenderOptions} options  Render options.
     * @returns {Promise}
     * @protected
     */
    protected _prepareSearchContext(context: ApplicationRenderContext, options: PlaceableTabRenderOptions): Promise<any>;
    /**
     * Get context menu entries for the entries in this tab.
     * @returns {ContextMenuEntry[]}
     * @protected
     */
    protected _getEntryContextOptions(): ContextMenuEntry[];
    /**
     * Handle selecting an entry.
     * @param {PointerEvent} event  The triggering event.
     * @protected
     */
    protected _onClickEntry(event: PointerEvent): void;
    /**
     * Handle configuring an entry.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target.
     * @protected
     */
    protected _onConfigureEntry(event: PointerEvent, target: HTMLElement): any;
    /**
     * Handle creating an entry.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target.
     * @protected
     */
    protected _onCreateEntry(event: PointerEvent, target: HTMLElement): Promise<Document<object, foundry.abstract.types.DocumentConstructionContext> | Document<object, foundry.abstract.types.DocumentConstructionContext>[] | undefined>;
    /**
     * Clear state when deactivating the directory of this tab.
     * @internal
     */
    _onDeactivateDirectory(): void;
    /**
     * Clear state when deactivating this tab.
     * @internal
     */
    _onDeactivateTab(): void;
    /**
     * Handle deleting an entry.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target.
     * @returns {Promise<void>}
     * @protected
     */
    protected _onDeleteEntry(event: PointerEvent, target: HTMLElement): Promise<void>;
    /**
     * Handle duplicating an entry.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target.
     * @returns {Promise<Document>}
     * @protected
     */
    protected _onDuplicateEntry(event: PointerEvent, target: HTMLElement): Promise<Document>;
    /**
     * Prepares the data for a duplicated Document.
     * @param {Document} document    The Document that is duplicated.
     * @returns {object}             The partial data of the duplicate that overrides the original data.
     * @protected
     */
    protected _prepareDuplicateData(document: Document): object;
    /**
     * Handle dragging an entry.
     * @param {DragEvent} event  The triggering event.
     * @protected
     */
    protected _onDragStart(event: DragEvent): void;
    /**
     * Handle adjusting the levels filter.
     * @param {string|null} id  The ID of the level to add/remove, or null to clear the filter entirely and show all
     *                          levels.
     */
    _onFilterByLevel(id: string | null): void;
    /**
     * Handle hovering over a directory entry.
     * @param {PointerEvent} event  The triggering event.
     * @protected
     */
    protected _onHoverInEntry(event: PointerEvent): void;
    /**
     * Handle no longer hovering over a directory entry.
     * @param {PointerEvent} event  The triggering event.
     * @protected
     */
    protected _onHoverOutEntry(event: PointerEvent): void;
    /** @inheritDoc */
    _onRender(context: any, options: any): Promise<void>;
    /**
     * Handle post-filter operations.
     * @param {KeyboardEvent} event  The triggering event.
     * @param {string} query         The raw search query.
     * @param {RegExp} rgx           The regular expression to test against.
     * @param {HTMLElement} html     The element that should be filtered.
     * @protected
     */
    protected _onSearchFilter(event: KeyboardEvent, query: string, rgx: RegExp, html: HTMLElement): void;
    /**
     * Handle toggling an entry's hidden state.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target.
     * @returns {Promise<void>}
     * @protected
     */
    protected _onToggleHidden(event: PointerEvent, target: HTMLElement): Promise<void>;
    /**
     * Handle toggling an entry's locked state.
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target.
     * @returns {Promise<void>}
     * @protected
     */
    protected _onToggleLocked(event: PointerEvent, target: HTMLElement): Promise<void>;
    /**
     * Filter out elements from the sidebar based on user input.
     * @protected
     */
    protected _applyFilters(): void;
    /**
     * Test whether a placeable entry matches any additional tab-specific filter criteria.
     * Only called for entries that already pass the common name, elevation, and level filters.
     * @param {Document} entry  The placeable document to test.
     * @returns {boolean}       True if the entry should remain visible.
     * @protected
     */
    protected _matchesFilter(entry: Document): boolean;
    /**
     * Test whether any advanced filter criteria are currently active.
     * @returns {boolean}
     * @protected
     */
    protected _hasAdvancedFilters(): boolean;
    /**
     * Clear all advanced filter state.
     * @protected
     */
    protected _clearFilters(): void;
    /**
     * Retrieve the Document instance represented by the given entry's element.
     * @param {HTMLElement} element
     * @returns {Document}
     * @protected
     */
    protected _getPlaceableFromElement(element: HTMLElement): Document;
    #private;
}
export type _PlaceableTabConfiguration = {
    /**
     * The name of the Scene collection represented in this tab.
     */
    collectionName: string;
    /**
     * The parent directory this tab is part of.
     */
    directory: PlaceableDirectory;
};
export type PlaceableTabConfiguration = ApplicationConfiguration & _PlaceableTabConfiguration;
export type PlaceableTabRenderOptions = ApplicationRenderOptions & HandlebarsRenderOptions;
export type PlaceableTabEntryContext = {
    buttons: Partial<FormFooterButton>[];
    id: string;
    label: string;
};
import type { ApplicationRenderContext } from "../../_types.mjs";
import ApplicationV2 from "../../api/application.mjs";
import type Document from "../../../../common/abstract/document.mjs";
import PlaceableFilter from "../filters/placeable-filter.mjs";
import SearchFilter from "../../ux/search-filter.mjs";
import type { ApplicationConfiguration } from "../../_types.mjs";
import type { ApplicationRenderOptions } from "../../_types.mjs";
import type { FormFooterButton } from "../../_types.mjs";
