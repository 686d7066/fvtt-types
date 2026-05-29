declare const FontConfig_base: {
    new (...args: any[]): {
        readonly parts: Record<string, HTMLElement>;
        "__#13@#parts": {};
        "__#13@#partDescriptors": Readonly<Record<string, import("../../api/handlebars-application.mjs").HandlebarsTemplatePart>>;
        _configureRenderOptions(options: any): void;
        _configureRenderParts(options: HandlebarsRenderOptions): Record<string, HandlebarsTemplatePart>;
        _preRender(context: any, options: any): Promise<void>;
        _renderHTML(context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<Record<string, HTMLElement>>;
        _preparePartContext(partId: string, context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<ApplicationRenderContext>;
        "__#13@#parsePartHTML"(partId: string, part: HandlebarsTemplatePart, htmlString: string): HTMLElement;
        _replaceHTML(result: Record<string, HTMLElement>, content: HTMLElement, options: HandlebarsRenderOptions): void;
        _preSyncPartState(partId: string, newElement: HTMLElement, priorElement: HTMLElement, state: object): void;
        _syncPartState(partId: string, newElement: HTMLElement, priorElement: HTMLElement, state: object): void;
        _tearDown(options: any): void;
        _attachPartListeners(partId: string, htmlElement: HTMLElement, options: ApplicationRenderOptions): void;
        options: Readonly<foundry.applications.types.ApplicationConfiguration>;
        "__#231@#id": string;
        "__#231@#renderable": boolean;
        "__#231@#element": HTMLElement;
        "__#231@#content": HTMLElement;
        "__#231@#minimization": {
            active: boolean;
            priorWidth?: number;
            priorHeight?: number;
            priorBoundingWidth?: number;
            priorBoundingHeight?: number;
        };
        "__#231@#position": foundry.applications.types.ApplicationPosition;
        "__#231@#state": import("../../api/application.mjs").ApplicationRenderState;
        "__#231@#semaphore": foundry.utils.Semaphore;
        "__#231@#children": Map<string, ApplicationV2>;
        "__#231@#parent": ApplicationV2 | null;
        "__#231@#priorParent": WeakRef<ApplicationV2> | null;
        readonly window: {
            windowId: string;
            header: HTMLElement;
            resize: HTMLElement;
            title: HTMLHeadingElement;
            icon: HTMLElement;
            close: HTMLButtonElement;
            controls: HTMLButtonElement;
            content: HTMLElement;
            onDrag: Function;
            onResize: Function;
            pointerStartPosition: foundry.applications.types.ApplicationPosition;
            pointerMoveThrottle: boolean;
        };
        "__#231@#window": {
            onDrag: (event: PointerEvent) => void;
            onResize: (event: PointerEvent) => void;
        };
        tabGroups: Record<string, string | null>;
        readonly classList: DOMTokenList;
        readonly id: string;
        readonly title: string;
        readonly element: HTMLElement;
        readonly form: HTMLFormElement | null;
        readonly minimized: boolean;
        position: foundry.applications.types.ApplicationPosition;
        readonly rendered: boolean;
        readonly state: number;
        readonly hasFrame: boolean;
        readonly children: Map<string, ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
        readonly parent: ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> | null;
        _initializeApplicationOptions(options: Partial<foundry.applications.types.ApplicationConfiguration>): foundry.applications.types.ApplicationConfiguration;
        render(options?: boolean | import("../../api/handlebars-application.mjs").HandlebarsRenderOptions | undefined, _options?: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions | undefined): Promise<any>;
        "__#231@#render"(options?: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions | undefined): Promise<any>;
        _prepareContext(options: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions): Promise<foundry.applications.types.ApplicationRenderContext>;
        _prepareTabs(group: string): Record<string, foundry.applications.types.ApplicationTab>;
        _getTabsConfig(group: string): foundry.applications.types.ApplicationTabsConfiguration | null;
        _getFrameButtons(options: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _getHeaderControls(): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _headerControlButtons(): Generator<foundry.applications.types.ApplicationHeaderControlsEntry>;
        _headerControlContextEntries(): Generator<import("../../ux/context-menu.mjs").ContextMenuEntry, void, any>;
        _renderFrame(options: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions): Promise<HTMLElement>;
        _renderFrameButtons(options: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions): Promise<void>;
        _renderHeaderControl(control: foundry.applications.types.ApplicationHeaderControlsEntry): HTMLLIElement;
        _updateFrame(options: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions): void;
        _insertElement(element: HTMLElement, options?: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions | undefined): Promise<void>;
        close(options?: Partial<foundry.applications.types.ApplicationClosingOptions> | undefined): Promise<any>;
        "__#231@#close"(options: Partial<foundry.applications.types.ApplicationClosingOptions>): Promise<any>;
        _removeElement(element: HTMLElement): void;
        setPosition(position?: Partial<foundry.applications.types.ApplicationPosition> | undefined): foundry.applications.types.ApplicationPosition | void;
        _updatePosition(position: foundry.applications.types.ApplicationPosition): foundry.applications.types.ApplicationPosition;
        "__#231@#applyPosition"(position: foundry.applications.types.ApplicationPosition): void;
        attachWindow(options?: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions | undefined): Promise<ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
        detachWindow(options?: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions | undefined): Promise<any>;
        renderChild(app: ApplicationV2, options?: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions | undefined): Promise<ApplicationV2>;
        "__#231@#attach"(): void;
        "__#231@#adoptIntoWindow"(win: WindowProxy): void;
        _canAttach(): boolean;
        _canDetach(): boolean;
        "__#231@#detach"(source?: Window | undefined): Promise<void>;
        "__#231@#applyDetachedConstraints"(win: WindowProxy): void | {
            maxInnerW: number;
            maxInnerH: number;
            browserW: number;
            browserH: number;
        };
        "__#231@#getVisibleBoundingBox"(): Rectangle;
        minimize(): Promise<void>;
        maximize(): Promise<void>;
        bringToFront(): void;
        changeTab(tab: string, group: string, { event, navElement, force, updatePosition }?: {
            event?: Event | undefined;
            navElement?: HTMLElement | undefined;
            force?: boolean | undefined;
            updatePosition?: boolean | undefined;
        } | undefined): void;
        submit(submitOptions?: object | undefined): Promise<any>;
        _doEvent(handler: Function, { async, handlerArgs, debugText, eventName, hookName, hookArgs, hookResponse, parentClassHooks }?: {
            async?: boolean | undefined;
            handlerArgs?: any[] | undefined;
            debugText?: string | undefined;
            eventName?: string | undefined;
            hookName?: string | undefined;
            hookArgs?: any[] | undefined;
            hookResponse?: boolean | undefined;
            parentClassHooks?: boolean | undefined;
        }): Promise<void> | void;
        "__#231@#dispatchEvent"(eventName: string, hookName: string, hookArgs: any[], parentClassHooks: boolean): void;
        "__#231@#callHooks"(hookName: string, hookArgs: any[], parentClassHooks: boolean): void;
        _canRender(options: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions): false | void;
        _preFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions): Promise<void>;
        _onFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions): Promise<void>;
        _onRender(context: foundry.applications.types.ApplicationRenderContext, options: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions): Promise<void>;
        _postRender(context: foundry.applications.types.ApplicationRenderContext, options: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions): Promise<void>;
        _preClose(options: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions): Promise<void>;
        _onClose(options: import("../../api/handlebars-application.mjs").HandlebarsRenderOptions): void;
        _prePosition(position: foundry.applications.types.ApplicationPosition): void;
        _onPosition(position: foundry.applications.types.ApplicationPosition): void;
        _onAttach(from: Document, to: Document): void;
        _onDetach(from: Document, to: Document): void;
        _attachFrameListeners(): void;
        "__#231@#onPointerDown"(event: PointerEvent): Promise<void>;
        "__#231@#onClick"(event: PointerEvent): Promise<void>;
        "__#231@#onClickAction"(event: PointerEvent, target: HTMLElement): void;
        _onClickTab(event: PointerEvent): void;
        _onClickAction(event: PointerEvent, target: HTMLElement): void;
        "__#231@#startPointerCapture"(event: PointerEvent, callback: Function): void;
        "__#231@#endPointerCapture"(event: PointerEvent, callback: Function): void;
        "__#231@#onPointerMove"(event: PointerEvent): void | {
            dx: number;
            dy: number;
        };
        "__#231@#onWindowDragStart"(event: PointerEvent): void;
        "__#231@#onWindowResizeStart"(event: PointerEvent): void;
        "__#231@#onWindowDragMove"(event: PointerEvent): void;
        "__#231@#onWindowResizeMove"(event: PointerEvent): void;
        "__#231@#onWindowDoubleClick"(event: PointerEvent): void;
        _onSubmitForm(formConfig: ApplicationFormConfiguration, event: Event | SubmitEvent): Promise<void>;
        _onChangeForm(formConfig: ApplicationFormConfiguration, event: Event): void;
        _awaitTransition(element: HTMLElement, timeout: number): Promise<void>;
        _createContextMenu(handler: () => import("../../ux/context-menu.mjs").ContextMenuEntry[], selector: string, { container, hookName, parentClassHooks, ...options }?: {
            container?: HTMLElement | undefined;
            hookName?: string | undefined;
            parentClassHooks?: boolean | undefined;
        } | undefined): foundry.applications.ux.ContextMenu | null;
        "__#232@#events": Record<string, Map<foundry.utils.types.EmittedEventListener, {
            fn: foundry.utils.types.EmittedEventListener;
            once: boolean;
        }>>;
        addEventListener(type: string, listener: foundry.utils.types.EmittedEventListener, { once }?: {
            once?: boolean | undefined;
        } | undefined): void;
        removeEventListener(type: string, listener: foundry.utils.types.EmittedEventListener): void;
        dispatchEvent(event: Event): boolean;
    };
    PARTS: Record<string, import("../../api/handlebars-application.mjs").HandlebarsTemplatePart>;
    BASE_APPLICATION: typeof ApplicationV2;
    DEFAULT_OPTIONS: Partial<Configuration>;
    TABS: Record<string, foundry.applications.types.ApplicationTabsConfiguration>;
    RENDER_STATES: Record<string, number>;
    _appId: number;
    _maxZ: number;
    emittedEvents: readonly ["prerender", "render", "close", "position"];
    inheritanceChain(): Generator<typeof ApplicationV2, void, unknown>;
    instances(): Generator<typeof this>;
    parseCSSDimension(style: string, parentDimension: number): number | void;
    waitForImages(element: HTMLElement): Promise<void>;
};
/**
 * @import {FontFamilyDefinition, FontDefinition} from "../../../config.mjs";
 * @import {ApplicationClickAction, ApplicationConfiguration, ApplicationFormSubmission} from "../_types.mjs";
 */
/**
 * @typedef NewFontDefinition
 * @property {string} family
 * @property {number} [weight=400]
 * @property {string} [style="normal"]
 * @property {string} [src=""]
 * @property {string} [preview]
 */
/**
 * @typedef FontTypes
 * @property {string} FILE   Font is a file
 * @property {string} SYSTEM Font is from the system
 */
/**
 * A V2 application responsible for configuring custom fonts for the world.
 */
export default class FontConfig extends FontConfig_base {
    /**
     * Font types.
     * @type {FontTypes}
     * @readonly
     */
    static readonly FONT_TYPES: FontTypes;
    /**
     * The Foundry game setting key storing the world's fonts.
     * @type {string}
     */
    static SETTING: string;
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        id: string;
        tag: string;
        window: {
            contentClasses: string[];
            title: string;
            icon: string;
        };
        position: {
            width: number;
        };
        form: {
            closeOnSubmit: boolean;
        };
    };
    /** @override */
    static override PARTS: {
        body: {
            template: string;
            scrollable: string[];
        };
        footer: {
            template: string;
        };
    };
    /**
     * Returns localized style choices.
     * @type {Array<{value: string, label: string}>}
     */
    static get "__#166@#styleChoices"(): {
        value: string;
        label: string;
    }[];
    static "__#166@#STYLE_CHOICES": any;
    /**
     * A private Set of successfully loaded font family names.
     * @type {Set<string>}
     */
    static "__#166@#available": Set<string>;
    /**
     * Returns a list of loaded font families.
     * @returns {string[]}
     */
    static getAvailableFonts(): string[];
    /**
     * Returns a record of loaded font families, formatted for selectOptions.
     * @returns {Record<string, string>}
     */
    static getAvailableFontChoices(): Record<string, string>;
    /**
     * Load a font definition for a given family.
     * @param {string} family                     The font family name (case-sensitive).
     * @param {FontFamilyDefinition} definition   The font family definition.
     * @param {object} [options]
     * @param {Document} [options.document]       The host Document to load fonts for.
     * @returns {Promise<boolean>}                Returns true if the font was successfully loaded.
     */
    static loadFont(family: string, definition: FontFamilyDefinition, { document }?: {
        document?: Document | undefined;
    } | undefined): Promise<boolean>;
    /**
     * Ensure that fonts have loaded and are ready for use.
     * Enforce a maximum timeout in milliseconds.
     * Proceed after that point even if fonts are not yet available.
     * @param {object} [options]
     * @param {number} [options.timeout=4500] The maximum time to spend loading fonts before proceeding.
     * @param {Document} [options.document]   The host Document to load fonts for.
     * @returns {Promise<void>}
     * @internal
     */
    static _loadFonts({ document, timeout }?: {
        timeout?: number | undefined;
        document?: Document | undefined;
    } | undefined): Promise<void>;
    /**
     * Collect font definitions from both config and user settings.
     * @returns {Record<string, FontFamilyDefinition>[]}
     * @protected
     */
    protected static _collectDefinitions(): Record<string, FontFamilyDefinition>[];
    /**
     * Create a FontFace from a definition.
     * @param {string} family               The font family name.
     * @param {FontDefinition} definition   The font definition.
     * @returns {FontFace}                  The new FontFace.
     * @protected
     */
    protected static _createFontFace(family: string, definition: FontDefinition): FontFace;
    /**
     * Format a font definition for display.
     * @param {string} family               The font family name.
     * @param {FontDefinition} definition   The font definition.
     * @returns {string}                    The formatted definition.
     * @protected
     */
    protected static _formatFont(family: string, definition: FontDefinition): string;
    /**
     * @param {DeepPartial<ApplicationConfiguration & NewFontDefinition>} [options={}] App config
     */
    constructor(options?: any);
    /**
     * The new or in-progress font object we're editing.
     * @type {NewFontDefinition}
     */
    object: NewFontDefinition;
    /** @override */
    override _onRender(context: any, options: any): Promise<void>;
    /** @override */
    override _prepareContext(_options: any): Promise<{
        fonts: {
            family: string;
            index: number;
            selected: boolean;
            font: string;
        }[];
        selected: any;
        isSystemFont: boolean;
        isFileFont: boolean;
        font: NewFontDefinition;
        fontWeights: {
            value: number;
            label: string;
        }[];
        preview: {
            family: any;
            weight: any;
            style: any;
            text: string | undefined;
        };
        fontStyles: {
            value: string;
            label: string;
        }[];
        buttons: {
            type: string;
            label: string;
            icon: string;
            action: string;
        }[];
    }>;
    /**
     * Build an array of font data objects for a specific font family definition.
     * @param {string} family                       The name of the font family.
     * @param {FontFamilyDefinition} definition     The font family definition, expected to have a `fonts` array.
     * @returns {{family: string, index: number, selected: boolean, font: string}[]} An array of font data objects.
     * @protected
     */
    protected _getDataForDefinition(family: string, definition: FontFamilyDefinition): {
        family: string;
        index: number;
        selected: boolean;
        font: string;
    }[];
    /** @override */
    override _onClickAction(event: any, htmlElement: any): void | Promise<void>;
    /** @override */
    override _onChangeForm(formConfig: any, event: any): void;
    /**
     * Add a new font definition.
     * @protected
     */
    protected _onAddFont(): Promise<void>;
    /**
     * Delete a font from definitions.
     * @param {PointerEvent} event
     * @protected
     */
    protected _onDeleteFont(event: PointerEvent): Promise<void>;
    /**
     * Select a font to preview/edit.
     * @param {PointerEvent} event
     * @protected
     */
    protected _onSelectFont(event: PointerEvent): void;
    /** @override */
    override close(options?: {}): Promise<this>;
    #private;
}
export type NewFontDefinition = {
    family: string;
    weight?: number | undefined;
    style?: string | undefined;
    src?: string | undefined;
    preview?: string | undefined;
};
export type FontTypes = {
    /**
     * Font is a file
     */
    FILE: string;
    /**
     * Font is from the system
     */
    SYSTEM: string;
};
import ApplicationV2 from "../../api/application.mjs";
import type { FontFamilyDefinition } from "../../../config.mjs";
import type { FontDefinition } from "../../../config.mjs";
export {};
