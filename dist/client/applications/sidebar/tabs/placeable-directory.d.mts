/**
 * @import {ApplicationRenderContext, ApplicationRenderOptions} from "../../_types.mjs";
 * @import {HandlebarsRenderOptions} from "../../api/handlebars-applications.mjs";
 */
/**
 * @typedef {ApplicationRenderOptions & HandlebarsRenderOptions} PlaceableDirectoryRenderOptions
 */
/**
 * The sidebar placeables tab.
 * @extends {AbstractSidebarTab}
 * @mixes HandlebarsApplication
 */
export default class PlaceableDirectory extends AbstractSidebarTab<foundry.applications.types.ApplicationConfiguration, ApplicationRenderOptions> {
    /** @override */
    static override DEFAULT_OPTIONS: {
        classes: string[];
        window: {
            title: string;
        };
    };
    /** @override */
    static override PARTS: {
        tabs: {
            template: string;
        };
        tab: {
            template: string;
        };
    };
    /** @override */
    static override TABS: {
        sheet: {
            tabs: never[];
            initial: string;
        };
    };
    constructor(options?: Partial<foundry.applications.types.ApplicationConfiguration> | undefined);
    /**
     * The currently rendered tab.
     * @returns {PlaceableTab}
     */
    get tab(): PlaceableTab;
    /** @override */
    override _canRender(options: any): boolean;
    /** @override */
    override close(options: any): Promise<this | undefined>;
    /** @inheritDoc */
    _configureRenderParts(options: any): any;
    /** @inheritDoc */
    _getTabsConfig(group: any): object;
    /**
     * Render the directory for a given placeable type.
     * @param {ApplicationRenderContext} context          Render context.
     * @param {PlaceableDirectoryRenderOptions} options   Render options.
     * @returns {Promise<void>}
     * @protected
     */
    protected _renderTab(context: ApplicationRenderContext, options: PlaceableDirectoryRenderOptions): Promise<void>;
    /** @inheritDoc */
    changeTab(tab: any, group: any, options: any): void;
    /**
     * Update the notification pip on the placeables sidebar tab button.
     * The pip is shown when the placeables tab is not active and the current sub-tab has an active filter.
     */
    _updateFilterPip(): void;
    /**
     * Highlight a hovered entry in the sidebar.
     * @param {PlaceableObject} object  The object being hovered on canvas.
     * @param {boolean} hover           The hover state.
     */
    hoverEntry(object: PlaceableObject, hover: boolean): any;
    /**
     * Determine if a placeable is visible in the sidebar.
     * @param {PlaceableObject} object  The placeable.
     * @returns {boolean}
     */
    isEntryVisible(object: PlaceableObject): boolean;
    #private;
}
export type PlaceableDirectoryRenderOptions = ApplicationRenderOptions & HandlebarsRenderOptions;
import type { ApplicationRenderOptions } from "../../_types.mjs";
import AbstractSidebarTab from "../sidebar-tab.mjs";
import type { ApplicationRenderContext } from "../../_types.mjs";
