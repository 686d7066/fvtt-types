/**
 * @import ApplicationV2 from "./application.mjs";
 * @import {Constructor} from "../../../common/_types.mjs";
 * @import {ApplicationConfiguration, ApplicationFormConfiguration} from "../_types.mjs";
 */
/**
 * @typedef HandlebarsRenderOptions
 * @property {string[]} parts                       An array of named template parts to render
 */
/**
 * @typedef HandlebarsTemplatePart
 * @property {string} template                      The template entry-point for the part
 * @property {string} [id]                          A CSS id to assign to the top-level element of the rendered part.
 *                                                  This id string is automatically prefixed by the application id.
 * @property {boolean} [root=false]                 Does this rendered contents of this template part replace the
 *                                                  children of the root element?
 * @property {string[]} [classes]                   An array of CSS classes to apply to the top-level element of the
 *                                                  rendered part.
 * @property {string[]} [templates]                 An array of additional templates that are required to render the
 *                                                  part. If omitted, only the entry-point is inferred as required.
 * @property {string[]} [scrollable]                An array of selectors within this part whose scroll positions should
 *                                                  be persisted during a re-render operation. A blank string is used
 *                                                  to denote that the root level of the part is scrollable.
 * @property {Record<string, ApplicationFormConfiguration>} [forms] A registry of forms selectors and submission
 *                                                                  handlers.
 */
/**
 * Augment an Application class with [Handlebars](https://handlebarsjs.com) template rendering behavior.
 * @param {Constructor<ApplicationV2>} BaseApplication
 */
export default function HandlebarsApplicationMixin(BaseApplication: Constructor<ApplicationV2>): {
    new (...args: any[]): {
        /**
         * A record of all rendered template parts.
         * @returns {Record<string, HTMLElement>}
         */
        readonly parts: Record<string, HTMLElement>;
        "__#13@#parts": {};
        /**
         * Dynamically configured part descriptors.
         * @type {Readonly<Record<string, HandlebarsTemplatePart>>}
         */
        "__#13@#partDescriptors": Readonly<Record<string, HandlebarsTemplatePart>>;
        /** @inheritDoc */
        _configureRenderOptions(options: any): void;
        /**
         * Allow subclasses to dynamically configure render parts.
         * @param {HandlebarsRenderOptions} options
         * @returns {Record<string, HandlebarsTemplatePart>}
         * @protected
         */
        _configureRenderParts(options: HandlebarsRenderOptions): Record<string, HandlebarsTemplatePart>;
        /** @inheritDoc */
        _preRender(context: any, options: any): Promise<void>;
        /**
         * Render each configured application part using Handlebars templates.
         * @param {ApplicationRenderContext} context        Context data for the render operation
         * @param {HandlebarsRenderOptions} options         Options which configure application rendering behavior
         * @returns {Promise<Record<string, HTMLElement>>}  A single rendered HTMLElement for each requested part
         * @protected
         * @override
         */
        _renderHTML(context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<Record<string, HTMLElement>>;
        /**
         * Prepare context that is specific to only a single rendered part.
         *
         * It is recommended to augment or mutate the shared context so that downstream methods like _onRender have
         * visibility into the data that was used for rendering. It is acceptable to return a different context object
         * rather than mutating the shared context at the expense of this transparency.
         *
         * @param {string} partId                         The part being rendered
         * @param {ApplicationRenderContext} context      Shared context provided by _prepareContext
         * @param {HandlebarsRenderOptions} options       Options which configure application rendering behavior
         * @returns {Promise<ApplicationRenderContext>}   Context data for a specific part
         * @protected
         */
        _preparePartContext(partId: string, context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<ApplicationRenderContext>;
        /**
         * Parse the returned HTML string from template rendering into a uniquely identified HTMLElement for insertion.
         * @param {string} partId                   The id of the part being rendered
         * @param {HandlebarsTemplatePart} part     Configuration of the part being parsed
         * @param {string} htmlString               The string rendered for the part
         * @returns {HTMLElement}                   The parsed HTMLElement for the part
         */
        "__#13@#parsePartHTML"(partId: string, part: HandlebarsTemplatePart, htmlString: string): HTMLElement;
        /**
         * Replace the HTML of the application with the result provided by Handlebars rendering.
         * @param {Record<string, HTMLElement>} result  The result from Handlebars template rendering
         * @param {HTMLElement} content                 The content element into which the rendered result must be inserted
         * @param {HandlebarsRenderOptions} options     Options which configure application rendering behavior
         * @protected
         * @override
         */
        _replaceHTML(result: Record<string, HTMLElement>, content: HTMLElement, options: HandlebarsRenderOptions): void;
        /**
         * Prepare data used to synchronize the state of a template part.
         * @param {string} partId                       The id of the part being rendered
         * @param {HTMLElement} newElement              The new rendered HTML element for the part
         * @param {HTMLElement} priorElement            The prior rendered HTML element for the part
         * @param {object} state                        A state object which is used to synchronize after replacement
         * @protected
         */
        _preSyncPartState(partId: string, newElement: HTMLElement, priorElement: HTMLElement, state: object): void;
        /**
         * Synchronize the state of a template part after it has been rendered and replaced in the DOM.
         * @param {string} partId                       The id of the part being rendered
         * @param {HTMLElement} newElement              The new rendered HTML element for the part
         * @param {HTMLElement} priorElement            The prior rendered HTML element for the part
         * @param {object} state                        A state object which is used to synchronize after replacement
         * @protected
         */
        _syncPartState(partId: string, newElement: HTMLElement, priorElement: HTMLElement, state: object): void;
        /** @inheritDoc */
        _tearDown(options: any): void;
        /**
         * Attach event listeners to rendered template parts.
         * @param {string} partId                       The id of the part being rendered
         * @param {HTMLElement} htmlElement             The rendered HTML element for the part
         * @param {ApplicationRenderOptions} options    Rendering options passed to the render method
         * @protected
         */
        _attachPartListeners(partId: string, htmlElement: HTMLElement, options: ApplicationRenderOptions): void;
        options: Readonly<ApplicationConfiguration>;
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
        "__#231@#state": import("./application.mjs").ApplicationRenderState;
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
        readonly children: Map<string, ApplicationV2<ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
        readonly parent: ApplicationV2<ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> | null;
        _initializeApplicationOptions(options: Partial<ApplicationConfiguration>): ApplicationConfiguration;
        render(options?: boolean | HandlebarsRenderOptions | undefined, _options?: HandlebarsRenderOptions | undefined): Promise<any>;
        "__#231@#render"(options?: HandlebarsRenderOptions | undefined): Promise<any>;
        _prepareContext(options: HandlebarsRenderOptions): Promise<foundry.applications.types.ApplicationRenderContext>;
        _prepareTabs(group: string): Record<string, foundry.applications.types.ApplicationTab>;
        _getTabsConfig(group: string): foundry.applications.types.ApplicationTabsConfiguration | null;
        _getFrameButtons(options: HandlebarsRenderOptions): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _getHeaderControls(): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _headerControlButtons(): Generator<foundry.applications.types.ApplicationHeaderControlsEntry>;
        _headerControlContextEntries(): Generator<import("../ux/context-menu.mjs").ContextMenuEntry, void, any>;
        _renderFrame(options: HandlebarsRenderOptions): Promise<HTMLElement>;
        _renderFrameButtons(options: HandlebarsRenderOptions): Promise<void>;
        _renderHeaderControl(control: foundry.applications.types.ApplicationHeaderControlsEntry): HTMLLIElement;
        _updateFrame(options: HandlebarsRenderOptions): void;
        _insertElement(element: HTMLElement, options?: HandlebarsRenderOptions | undefined): Promise<void>;
        close(options?: Partial<foundry.applications.types.ApplicationClosingOptions> | undefined): Promise<any>;
        "__#231@#close"(options: Partial<foundry.applications.types.ApplicationClosingOptions>): Promise<any>;
        _removeElement(element: HTMLElement): void;
        setPosition(position?: Partial<foundry.applications.types.ApplicationPosition> | undefined): foundry.applications.types.ApplicationPosition | void;
        _updatePosition(position: foundry.applications.types.ApplicationPosition): foundry.applications.types.ApplicationPosition;
        "__#231@#applyPosition"(position: foundry.applications.types.ApplicationPosition): void;
        attachWindow(options?: HandlebarsRenderOptions | undefined): Promise<ApplicationV2<ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
        detachWindow(options?: HandlebarsRenderOptions | undefined): Promise<any>;
        renderChild(app: ApplicationV2, options?: HandlebarsRenderOptions | undefined): Promise<ApplicationV2>;
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
        _canRender(options: HandlebarsRenderOptions): false | void;
        _preFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<void>;
        _onFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<void>;
        _onRender(context: foundry.applications.types.ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<void>;
        _postRender(context: foundry.applications.types.ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<void>;
        _preClose(options: HandlebarsRenderOptions): Promise<void>;
        _onClose(options: HandlebarsRenderOptions): void;
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
        _createContextMenu(handler: () => import("../ux/context-menu.mjs").ContextMenuEntry[], selector: string, { container, hookName, parentClassHooks, ...options }?: {
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
    /**
     * Configure a registry of template parts which are supported for this application for partial rendering.
     * @type {Record<string, HandlebarsTemplatePart>}
     */
    PARTS: Record<string, HandlebarsTemplatePart>;
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
export type HandlebarsRenderOptions = {
    /**
     * An array of named template parts to render
     */
    parts: string[];
};
export type HandlebarsTemplatePart = {
    /**
     * The template entry-point for the part
     */
    template: string;
    /**
     * A CSS id to assign to the top-level element of the rendered part.
     *                           This id string is automatically prefixed by the application id.
     */
    id?: string | undefined;
    /**
     * Does this rendered contents of this template part replace the
     *                  children of the root element?
     */
    root?: boolean | undefined;
    /**
     * An array of CSS classes to apply to the top-level element of the
     *                    rendered part.
     */
    classes?: string[] | undefined;
    /**
     * An array of additional templates that are required to render the
     *                  part. If omitted, only the entry-point is inferred as required.
     */
    templates?: string[] | undefined;
    /**
     * An array of selectors within this part whose scroll positions should
     *                 be persisted during a re-render operation. A blank string is used
     *                 to denote that the root level of the part is scrollable.
     */
    scrollable?: string[] | undefined;
    /**
     * A registry of forms selectors and submission
     *  handlers.
     */
    forms?: Record<string, ApplicationFormConfiguration> | undefined;
};
import type ApplicationV2 from "./application.mjs";
import type { Constructor } from "../../../common/_types.mjs";
import type { ApplicationConfiguration } from "../_types.mjs";
import type { ApplicationFormConfiguration } from "../_types.mjs";
