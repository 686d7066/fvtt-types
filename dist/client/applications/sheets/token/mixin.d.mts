/**
 * @import ApplicationV2 from "../../api/application.mjs";
 * @import {DataSchema} from "../../../../common/abstract/_types.mjs";
 * @import {PrototypeToken} from "../../../../common/data/data.mjs";
 * @import TokenDocument from "../../../documents/token.mjs";
 * @import {NumberField} from "../../../../common/data/fields.mjs";
 * @import {HTMLMultiCheckboxElement} from "../../elements/multi-select.mjs";
 * @import {ApplicationClickAction, ApplicationTab, FormFooterButton} from "../../_types.mjs";
 */
/**
 * A mixin for UI shared between TokenDocument and PrototypeToken sheets
 * @param {typeof ApplicationV2} Base
 */
export default function TokenApplicationMixin(Base: typeof ApplicationV2): {
    new (...args: any[]): {
        /**
         * Maintain a copy of the original to show a real-time preview of changes.
         * @type {TokenDocument|PrototypeToken|null}
         * @protected
         */
        _preview: TokenDocument | PrototypeToken | null;
        /**
         * Is the token a PrototypeToken?
         * @type {boolean}
         * @abstract
         */
        isPrototype: boolean;
        /**
         * A reference to the Actor the token depicts
         * @returns {Actor|null}
         * @abstract
         */
        readonly actor: any;
        /**
         * The TokenDocument or PrototypeToken
         * @returns {TokenDocument|PrototypeToken}
         * @abstract
         */
        readonly token: TokenDocument | PrototypeToken;
        /**
         * The schema fields for this token DataModel
         * @returns {DataSchema}
         * @protected
         * @abstract
         */
        readonly _fields: DataSchema;
        /**
         * Get an Object of image paths and filenames to display in the Token sheet
         * @returns {Promise<Record<string, string>>}
         */
        "__#322@#getAlternateTokenImages"(): Promise<Record<string, string>>;
        /**
         * Render the Token ring effects input using a multi-checkbox element.
         * @param {NumberField} field                   The ring effects field
         * @param {FormInputConfig<string[]>} inputConfig Form input configuration
         * @returns {HTMLMultiCheckboxElement}
         */
        "__#322@#ringEffectsInput"(field: NumberField, inputConfig: FormInputConfig<string[]>): HTMLMultiCheckboxElement;
        /** @inheritDoc */
        _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext & {
            tabClasses: string;
            fields: DataSchema;
            isPrototype: boolean;
            displayModes: Record<string, string>;
            buttons: FormFooterButton[];
        }>;
        /** @inheritDoc */
        _preparePartContext(partId: any, context: any, options: any): Promise<any>;
        /**
         * Prepare data to be displayed in the Identity tab.
         * @protected
         */
        _prepareIdentityTab(): {
            isGM: boolean;
            actors: {
                value: string | null;
                label: any;
            }[];
            movementActions: {};
            dispositions: Record<string, string>;
        };
        /**
         * Prepare data to be displayed in the Appearance tab.
         * @returns {Promise<object>}
         * @protected
         */
        _prepareAppearanceTab(): Promise<object>;
        /**
         * Prepare data to be displayed in the Vision tab.
         * @returns {Promise<object>}
         * @protected
         */
        _prepareVisionTab(): Promise<object>;
        /**
         * Prepare data to be displayed in the Vision tab.
         * @returns {Promise<object>}
         * @protected
         */
        _prepareLightTab(): Promise<object>;
        /**
         * Prepare data to be displayed in the Resources tab.
         * @returns {Promise<object>}
         * @protected
         */
        _prepareResourcesTab(): Promise<object>;
        /**
         * Prepare form submission buttons.
         * @returns {FormFooterButton[]}
         * @protected
         */
        _prepareButtons(): FormFooterButton[];
        /** @inheritDoc */
        _processFormData(event: any, form: any, formData: any): any;
        /** @inheritDoc */
        _onChangeForm(formConfig: any, event: any): void;
        /**
         * Process several fields from form submission data into proper model changes.
         * @param {object} submitData Form submission data passed through {@link foundry.applications.ux.FormDataExtended}
         * @protected
         */
        _processChanges(submitData: object): void;
        readonly parts: Record<string, HTMLElement>;
        "__#13@#parts": {};
        "__#13@#partDescriptors": Readonly<Record<string, import("../../api/handlebars-application.mjs").HandlebarsTemplatePart>>;
        _configureRenderOptions(options: any): void;
        _configureRenderParts(options: HandlebarsRenderOptions): Record<string, HandlebarsTemplatePart>;
        _preRender(context: any, options: any): Promise<void>;
        _renderHTML(context: ApplicationRenderContext, options: HandlebarsRenderOptions): Promise<Record<string, HTMLElement>>;
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
    /** @inheritDoc */
    DEFAULT_OPTIONS: {
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
            overrideDetectionMode: (event: PointerEvent, target: HTMLElement) => void | Promise<void>;
            removeDetectionMode: (event: PointerEvent, target: HTMLElement) => void | Promise<void>;
        };
    };
    /** @override */
    PARTS: {
        tabs: {
            template: string;
        };
        identity: {
            template: string;
            scrollable: string[];
        };
        appearance: {
            template: string;
            scrollable: string[];
        };
        vision: {
            template: string;
            scrollable: string[];
        };
        light: {
            template: string;
            scrollable: string[];
        };
        resources: {
            template: string;
            scrollable: string[];
        };
        footer: {
            template: string;
        };
    };
    /** @override */
    TABS: {
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
     * Localized Token Display Modes
     * @returns {Record<string, string>}
     */
    readonly DISPLAY_MODES: Record<string, string>;
    "__#322@#DISPLAY_MODES": any;
    /**
     * Localized Token Dispositions
     * @returns {Record<string, string>}
     */
    readonly TOKEN_DISPOSITIONS: Record<string, string>;
    "__#322@#TOKEN_DISPOSITIONS": any;
    /**
     * Localized Token Turn Marker modes
     * @returns {Record<string, string>}
     */
    readonly TURN_MARKER_MODES: Record<string, string>;
    "__#322@#TURN_MARKER_MODES": any;
    /**
     * Localized Token Shapes
     * @returns {Record<string, string>}
     */
    readonly TOKEN_SHAPES: Record<string, string>;
    "__#322@#TOKEN_SHAPES": any;
    /**
     * Add a new detection mode to the Token preview.
     * @this {TokenApplication}
     * @type {ApplicationClickAction}
     */
    "__#322@#onOverrideDetectionMode"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /**
     * Remove a detection mode from the Token preview.
     * @this {TokenApplication}
     * @type {ApplicationClickAction}
     */
    "__#322@#onRemoveDetectionMode"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    BASE_APPLICATION: typeof ApplicationV2;
    RENDER_STATES: Record<string, number>;
    _appId: number;
    _maxZ: number;
    emittedEvents: readonly ["prerender", "render", "close", "position"];
    inheritanceChain(): Generator<typeof ApplicationV2, void, unknown>;
    instances(): Generator<typeof this>;
    parseCSSDimension(style: string, parentDimension: number): number | void;
    waitForImages(element: HTMLElement): Promise<void>;
};
import type ApplicationV2 from "../../api/application.mjs";
import type TokenDocument from "../../../documents/token.mjs";
import type { PrototypeToken } from "../../../../common/data/data.mjs";
import type { DataSchema } from "../../../../common/abstract/_types.mjs";
import type { NumberField } from "../../../../common/data/fields.mjs";
import type { HTMLMultiCheckboxElement } from "../../elements/multi-select.mjs";
import type { FormFooterButton } from "../../_types.mjs";
import type { ApplicationTab } from "../../_types.mjs";
