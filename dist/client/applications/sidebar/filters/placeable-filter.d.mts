/**
 * @import {ApplicationConfiguration} from "../../_types.mjs";
 * @import {HandlebarsRenderOptions} from "../../api/handlebars-applications.mjs";
 * @import PlaceableTab from "../tabs/placeable-tab.mjs";
 */
/**
 * A dialog application for configuring advanced placeable filters.
 * @extends {ApplicationV2<ApplicationConfiguration, HandlebarsRenderOptions>}
 * @mixes HandlebarsApplication
 */
export default class PlaceableFilter extends ApplicationV2<ApplicationConfiguration, HandlebarsRenderOptions> {
    /** @override */
    static override DEFAULT_OPTIONS: {
        tag: string;
        classes: string[];
        window: {
            title: string;
            icon: string;
            minimizable: boolean;
            resizable: boolean;
        };
        position: {
            scale: number;
            width: number;
        };
        actions: {
            clear: Function;
        };
    };
    /** @override */
    static override PARTS: {
        body: {
            root: boolean;
            classes: string[];
            template: string;
        };
    };
    /**
     * Handle clearing all filters.
     * @this {PlaceableFilter}
     */
    static "__#344@#onClear"(this: PlaceableFilter): Promise<PlaceableFilter>;
    /**
     * @param {PlaceableTab} tab                             The tab this dialog belongs to.
     * @param {Partial<ApplicationConfiguration>} [options]  Application options.
     */
    constructor(tab: PlaceableTab, options?: Partial<ApplicationConfiguration> | undefined);
    /**
     * The tab this dialog belongs to.
     * @type {PlaceableTab}
     */
    get tab(): PlaceableTab;
    /** @inheritDoc */
    _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext>;
    #private;
}
import type { ApplicationConfiguration } from "../../_types.mjs";
import ApplicationV2 from "../../api/application.mjs";
import type PlaceableTab from "../tabs/placeable-tab.mjs";
