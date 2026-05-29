declare const PrototypeOverridesConfig_base: {
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
        _prepareTabs(group: string): Record<string, ApplicationTab>;
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
 * @import {
 *   ApplicationClickAction,
 *   ApplicationFormSubmission,
 *   ApplicationTab,
 *   FormFooterButton
 * } from "../../_types.mjs";
 */
/**
 * A submenu for managing user overrides of PrototypeTokens
 */
export default class PrototypeOverridesConfig extends PrototypeOverridesConfig_base {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        id: string;
        tag: string;
        window: {
            title: string;
            contentClasses: string[];
            icon: string;
        };
        position: {
            width: number;
        };
        form: {
            closeOnSubmit: boolean;
            handler: Function;
        };
        actions: {
            onResetDefaults: Function;
        };
    };
    /** @override */
    static override PARTS: {
        tabs: {
            template: string;
        };
        body: {
            template: string;
        };
        footer: {
            template: string;
        };
    };
    /** Register this menu application and the setting it manages. */
    static registerSettings(): void;
    static "__#301@#onSubmit"(event: SubmitEvent | Event, form: HTMLFormElement, formData: foundry.applications.ux.FormDataExtended): Promise<any>;
    static "__#301@#onResetDefaults"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /** @override */
    override tabGroups: {
        main: string;
    };
    /** @override */
    override _prepareContext(_options: any): Promise<{
        tabs: Record<string, ApplicationTab>;
        tabClasses: string;
        rootId: string;
        buttons: FormFooterButton[];
        booleanOptions: {
            true: string;
            false: string;
        };
        displayModes: any;
        dispositions: any;
        turnMarkerModes: any;
        turnMarkerAnimations: {
            value: string;
            label: string;
        }[];
    }>;
    /** @inheritDoc */
    _preFirstRender(context: any, options: any): Promise<void>;
    #private;
}
import { ApplicationV2 } from "../../api/_module.mjs";
import type { ApplicationTab } from "../../_types.mjs";
import type { FormFooterButton } from "../../_types.mjs";
export {};
