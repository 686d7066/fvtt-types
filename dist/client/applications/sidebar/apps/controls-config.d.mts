/**
 * @import {ApplicationClickAction} from "../../_types.mjs"
 * @import {KeybindingAction, KeybindingActionBinding, KeybindingActionConfig} from "../../../_types.mjs"
 */
/**
 * View and edit keybinding and (readonly) mouse actions.
 */
export default class ControlsConfig extends CategoryBrowser {
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
            addBinding: Function;
            cancelEdit: Function;
            deleteBinding: Function;
            editBinding: Function;
            resetDefaults: Function;
            saveBinding: Function;
        };
        subtemplates: {
            category: string;
            sidebarFooter: string;
        };
    };
    /** @inheritDoc */
    static PARTS: {
        bindingInput: {
            template: string;
        };
        sidebar: {
            template: string;
            scrollable: string[];
        };
        main: {
            template: string;
            scrollable: string[];
        };
    };
    /**
     * Faux "pointer bindings" for displaying as a readonly category
     * @type {readonly [id: string, name: string, parts: string[], gmOnly?: boolean][]}
     */
    static POINTER_CONTROLS: readonly [id: string, name: string, parts: string[], gmOnly?: boolean][];
    /**
     * A reference record of possible categories
     * @type {Record<string, {id: string, label: string}}
     */
    static "__#338@#ENTRY_CATEGORIES": Record<string, {
        id: string;
        label: string;
    }>;
    /**
     * Transform an action binding into a human-readable string representation.
     * @param {KeybindingActionBinding} binding
     * @returns {string}
     */
    static humanizeBinding(binding: KeybindingActionBinding): string;
    static "__#338@#onAddBinding"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#338@#onEditBinding"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#338@#onSaveBinding"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#338@#onCancelEdit"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#338@#onDeleteBinding"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#338@#onResetDefaults"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /** @inheritDoc */
    _configureRenderOptions(options: any): void;
    /**
     * @returns {Record<string, {id: string, label: string, entries: object[]}>}
     * @protected
     * @override
     */
    protected override _prepareCategoryData(): Record<string, {
        id: string;
        label: string;
        entries: object[];
    }>;
    /** @inheritDoc */
    _sortCategories(a: any, b: any): number;
    /** @inheritDoc */
    _onFirstRender(context: any, options: any): Promise<void>;
    #private;
}
import CategoryBrowser from "../../api/category-browser.mjs";
import type { KeybindingActionBinding } from "../../../_types.mjs";
