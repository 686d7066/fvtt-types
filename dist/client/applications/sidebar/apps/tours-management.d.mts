/**
 * @import {ApplicationClickAction} from "../../_types.mjs";
 */
/**
 * A management app for configuring which Tours are available or have been completed.
 */
export default class ToursManagement extends CategoryBrowser {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        id: string;
        window: {
            title: string;
            icon: string;
            resizable: boolean;
        };
        position: {
            width: number;
            height: number;
        };
        actions: {
            resetDefaults: Function;
            play: Function;
            reset: Function;
        };
        initialCategory: string;
        subtemplates: {
            category: string;
            sidebarFooter: string;
        };
    };
    static "__#342@#onPlayTour"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#342@#onResetTour"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#342@#onResetDefaults"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /** @override */
    override _prepareCategoryData(): {};
    /** @override */
    override _sortCategories(a: any, b: any): any;
    #private;
}
import CategoryBrowser from "../../api/category-browser.mjs";
