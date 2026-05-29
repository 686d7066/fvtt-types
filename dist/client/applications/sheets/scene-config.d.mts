/**
 * @import {ApplicationClickAction, FormFooterButton} from "../_types.mjs";
 * @import EmbeddedCollection from "../../../common/abstract/embedded-collection.mjs";
 */
/**
 * The Application responsible for configuring a single Scene document.
 * @extends DocumentSheetV2
 * @mixes HandlebarsApplication
 */
export default class SceneConfig extends DocumentSheetV2 {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        classes: string[];
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
            addLevel: Function;
            capturePosition: Function;
            editLevel: Function;
            toggleLinkDimensions: Function;
            openGridConfig: Function;
            removeLevel: Function;
            resetEnvironment: Function;
            transitionPlay: Function;
        };
    };
    /** @override */
    static override PARTS: {
        tabs: {
            template: string;
        };
        basics: {
            template: string;
            scrollable: string[];
        };
        grid: {
            template: string;
        };
        levels: {
            template: string;
            scrollable: string[];
        };
        visibility: {
            template: string;
            scrollable: string[];
        };
        environment: {
            template: string;
            scrollable: string[];
        };
        misc: {
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
     * Get an enumeration of the available grid types which can be applied to this Scene
     * @returns {Record<GRID_TYPES, string>}
     * @internal
     */
    static _getGridTypes(): Record<GRID_TYPES, string>;
    /**
     * Get an enumeration of the available fog exploration modes for this Scene.
     * @returns {Record<FOG_EXPLORATION_MODES, string>}
     * @internal
     */
    static _getFogExplorationModes(): Record<FOG_EXPLORATION_MODES, string>;
    /**
     * Handle creating a new level.
     * @this {SceneConfig}
     */
    static "__#285@#onAddLevel"(this: SceneConfig): void;
    static "__#285@#onCapturePosition"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /**
     * Handle editing a level.
     * @this {SceneConfig}
     * @param {PointerEvent} event        The triggering event.
     * @param {HTMLButtonElement} target  The action target.
     */
    static "__#285@#onEditLevel"(this: SceneConfig, event: PointerEvent, target: HTMLButtonElement): void;
    static "__#285@#onOpenGridConfig"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /**
     * Handle removing a level.
     * @this {SceneConfig}
     * @param {PointerEvent} event        The triggering event.
     * @param {HTMLButtonElement} target  The action target.
     */
    static "__#285@#onRemoveLevel"(this: SceneConfig, event: PointerEvent, target: HTMLButtonElement): void;
    static "__#285@#onTransitionPlay"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#285@#onToggleLinkDimensions"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#285@#onResetEnvironment"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /**
     * The level to draw delegated fields from. This will be the viewed level if this scene is the viewed scene, otherwise
     * it will be the scene's active level.
     * @type {Level}
     */
    get defaultLevel(): Level;
    /** @inheritDoc */
    _preparePartContext(partId: any, context: any, options: any): Promise<any>;
    /** @inheritDoc */
    changeTab(tab: any, group: any, options: any): void;
    /**
     * Live update the scene as certain properties are changed.
     * @param {string} changed The changed property
     * @param {object} [options]
     * @param {boolean} [options.force] Should the preview be forced, regardless of changes?
     * @internal
     */
    _previewScene(changed: string, { force }?: {
        force?: boolean | undefined;
    } | undefined): void;
    /** @inheritDoc */
    _processFormData(event: any, form: any, formData: any): object;
    /** @override */
    override _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
    /**
     * Get the set of ContextMenu options for levels in the scene config.
     * @returns {ContextMenuEntry[]}
     * @protected
     */
    protected _getLevelContextOptions(): ContextMenuEntry[];
    /**
     * Handle drag start.
     * @param {DragEvent} event  The initial event.
     * @protected
     */
    protected _onDragStart(event: DragEvent): void;
    /**
     * Handle dropping some data onto the sheet.
     * @param {DragEvent} event  The triggering event.
     * @protected
     */
    protected _onDrop(event: DragEvent): Promise<void | Level[]>;
    /**
     * Handle re-ordering levels via scene config.
     * @param {DragEvent} event  The triggering event.
     * @param {Level} level      The scene level.
     * @returns {Promise<Level[]>|void}
     * @protected
     */
    protected _onSortLevel(event: DragEvent, level: Level): Promise<Level[]> | void;
    #private;
}
import { DocumentSheetV2 } from "../api/_module.mjs";
