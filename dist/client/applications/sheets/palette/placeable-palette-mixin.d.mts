/**
 * @import ApplicationV2 from "../../api/application.mjs";
 * @import {Constructor} from "../../../../common/_types.mjs";
 * @import {PlaceablePaletteConfiguration, PlaceablePaletteRenderOptions} from "../../_types.mjs";
 */
/**
 * Augment a placeable config so that it can be used to bulk edit and set default creation data.
 * @param {Constructor<ApplicationV2>} BaseConfig
 */
export default function PlaceablePaletteMixin(BaseConfig: Constructor<ApplicationV2>): {
    new <T extends typeof Document>(options: any, ...args: any[]): {
        /**
         * The all controlled documents for this palette's placeables layer.
         * @type {InstanceType<T>[]}
         */
        readonly controlled: InstanceType<T>[];
        /**
         * The initial creation data for a new document.
         * @type {object}
         */
        readonly createData: object;
        /**
         * The fields the user has modified from their default values.
         * @type {Set<string>}
         * @internal
         */
        _dirtyFields: Set<string>;
        /**
         * The fields that have differing values across the set of controlled documents.
         * @type {Set<string>}
         * @internal
         */
        _multiFields: Set<string>;
        /**
         * The class of the document that backs this form.
         * @type {T}
         */
        readonly documentClass: T;
        /**
         * The placeable document.
         * @returns {string}
         */
        readonly documentName: string;
        /**
         * Whether the palette is editing multiple placeables.
         * @type {boolean}
         */
        readonly isSelect: boolean;
        /**
         * The canvas layer for this palette's placeable.
         * @type {PlaceablesLayer}
         */
        readonly layer: PlaceablesLayer;
        /** @override */
        readonly title: string;
        /**
         * Configure an appropriate preset to apply.
         * @param {PlaceablePaletteRenderOptions} [options]  Render options.
         * @returns {object|void}                            The preset to apply, if any.
         */
        "__#133@#applyPreset"(options?: PlaceablePaletteRenderOptions | undefined): object | void;
        /**
         * Configure an appropriate preset to apply.
         * @param {object} formData                          The palette data.
         * @param {PlaceablePaletteRenderOptions} [options]  Render options.
         * @protected
         */
        _applyPreset(formData: object, { preset }?: PlaceablePaletteRenderOptions | undefined): object;
        /** @inheritDoc */
        _configureRenderOptions(options: any): void;
        /** @inheritDoc */
        _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext>;
        /** @inheritDoc */
        render(options: any, _options: any): Promise<void>;
        _preview: any;
        /** @inheritDoc */
        _onClose(options: any): void;
        /** @inheritDoc */
        _onFirstRender(context: any, options: any): Promise<void>;
        /** @inheritDoc */
        _onRender(context: any, options: any): Promise<void>;
        /** @inheritDoc */
        _processFormData(event: any, form: any, formData: any): any;
        /** @override */
        _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
        /** @inheritDoc */
        _renderFrame(options: any): Promise<HTMLElement>;
        /** @inheritDoc */
        _onChangeForm(formConfig: any, event: any): void;
        /**
         * Determine which fields have values that are not the same across all selected documents.
         * @param {InstanceType<T>[]} docs
         * @returns {Set<string>}
         * @protected
         */
        _determineMultiFields(docs: InstanceType<T>[]): Set<string>;
        /**
         * Render hints as inline as info bubbles.
         */
        "__#133@#renderInlineHints"(): void;
        /**
         * Set a multi-value placeholder on the given element.
         * @param {HTMLElement} element
         * @protected
         */
        _setPlaceholder(element: HTMLElement): void;
        options: Readonly<PlaceablePaletteConfiguration>;
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
        "__#231@#render"(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
        _prepareTabs(group: string): Record<string, foundry.applications.types.ApplicationTab>;
        _getTabsConfig(group: string): foundry.applications.types.ApplicationTabsConfiguration | null;
        _getFrameButtons(options: PlaceablePaletteRenderOptions): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _getHeaderControls(): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _headerControlButtons(): Generator<foundry.applications.types.ApplicationHeaderControlsEntry>;
        _headerControlContextEntries(): Generator<import("../../ux/context-menu.mjs").ContextMenuEntry, void, any>;
        _renderHTML(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<any>;
        _replaceHTML(result: any, content: HTMLElement, options: PlaceablePaletteRenderOptions): void;
        _renderFrameButtons(options: PlaceablePaletteRenderOptions): Promise<void>;
        _renderHeaderControl(control: foundry.applications.types.ApplicationHeaderControlsEntry): HTMLLIElement;
        _updateFrame(options: PlaceablePaletteRenderOptions): void;
        _insertElement(element: HTMLElement, options?: PlaceablePaletteRenderOptions | undefined): Promise<void>;
        close(options?: Partial<foundry.applications.types.ApplicationClosingOptions> | undefined): Promise<any>;
        "__#231@#close"(options: Partial<foundry.applications.types.ApplicationClosingOptions>): Promise<any>;
        _removeElement(element: HTMLElement): void;
        _tearDown(options: foundry.applications.types.ApplicationClosingOptions): void;
        setPosition(position?: Partial<foundry.applications.types.ApplicationPosition> | undefined): foundry.applications.types.ApplicationPosition | void;
        _updatePosition(position: foundry.applications.types.ApplicationPosition): foundry.applications.types.ApplicationPosition;
        "__#231@#applyPosition"(position: foundry.applications.types.ApplicationPosition): void;
        attachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
        detachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
        renderChild(app: ApplicationV2, options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2>;
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
        _canRender(options: PlaceablePaletteRenderOptions): false | void;
        _preFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _preRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _postRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _preClose(options: PlaceablePaletteRenderOptions): Promise<void>;
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
    /** @override */
    DEFAULT_OPTIONS: {
        classes: string[];
        initialData: {};
        position: {
            scale: number;
            width: number;
        };
        form: {
            closeOnSubmit: boolean;
            submitOnChange: boolean;
        };
        actions: {
            closeDetails: (this: {
                /**
                 * The all controlled documents for this palette's placeables layer.
                 * @type {InstanceType<T>[]}
                 */
                readonly controlled: any[];
                /**
                 * The initial creation data for a new document.
                 * @type {object}
                 */
                readonly createData: object;
                /**
                 * The fields the user has modified from their default values.
                 * @type {Set<string>}
                 * @internal
                 */
                _dirtyFields: Set<string>;
                /**
                 * The fields that have differing values across the set of controlled documents.
                 * @type {Set<string>}
                 * @internal
                 */
                _multiFields: Set<string>;
                /**
                 * The class of the document that backs this form.
                 * @type {T}
                 */
                readonly documentClass: any;
                /**
                 * The placeable document.
                 * @returns {string}
                 */
                readonly documentName: string;
                /**
                 * Whether the palette is editing multiple placeables.
                 * @type {boolean}
                 */
                readonly isSelect: boolean;
                /**
                 * The canvas layer for this palette's placeable.
                 * @type {PlaceablesLayer}
                 */
                readonly layer: PlaceablesLayer;
                /** @override */
                readonly title: string;
                /**
                 * Configure an appropriate preset to apply.
                 * @param {PlaceablePaletteRenderOptions} [options]  Render options.
                 * @returns {object|void}                            The preset to apply, if any.
                 */
                "__#133@#applyPreset"(options?: PlaceablePaletteRenderOptions | undefined): object | void;
                /**
                 * Configure an appropriate preset to apply.
                 * @param {object} formData                          The palette data.
                 * @param {PlaceablePaletteRenderOptions} [options]  Render options.
                 * @protected
                 */
                _applyPreset(formData: object, { preset }?: PlaceablePaletteRenderOptions | undefined): object;
                /** @inheritDoc */
                _configureRenderOptions(options: any): void;
                /** @inheritDoc */
                _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext>;
                /** @inheritDoc */
                render(options: any, _options: any): Promise<void>;
                _preview: any;
                /** @inheritDoc */
                _onClose(options: any): void;
                /** @inheritDoc */
                _onFirstRender(context: any, options: any): Promise<void>;
                /** @inheritDoc */
                _onRender(context: any, options: any): Promise<void>;
                /** @inheritDoc */
                _processFormData(event: any, form: any, formData: any): any;
                /** @override */
                _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
                /** @inheritDoc */
                _renderFrame(options: any): Promise<HTMLElement>;
                /** @inheritDoc */
                _onChangeForm(formConfig: any, event: any): void;
                /**
                 * Determine which fields have values that are not the same across all selected documents.
                 * @param {InstanceType<T>[]} docs
                 * @returns {Set<string>}
                 * @protected
                 */
                _determineMultiFields(docs: any[]): Set<string>;
                /**
                 * Render hints as inline as info bubbles.
                 */
                "__#133@#renderInlineHints"(): void;
                /**
                 * Set a multi-value placeholder on the given element.
                 * @param {HTMLElement} element
                 * @protected
                 */
                _setPlaceholder(element: HTMLElement): void;
                options: Readonly<PlaceablePaletteConfiguration>;
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
                "__#231@#render"(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
                _prepareTabs(group: string): Record<string, foundry.applications.types.ApplicationTab>;
                _getTabsConfig(group: string): foundry.applications.types.ApplicationTabsConfiguration | null;
                _getFrameButtons(options: PlaceablePaletteRenderOptions): foundry.applications.types.ApplicationHeaderControlsEntry[];
                _getHeaderControls(): foundry.applications.types.ApplicationHeaderControlsEntry[];
                _headerControlButtons(): Generator<foundry.applications.types.ApplicationHeaderControlsEntry>;
                _headerControlContextEntries(): Generator<import("../../ux/context-menu.mjs").ContextMenuEntry, void, any>;
                _renderHTML(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<any>;
                _replaceHTML(result: any, content: HTMLElement, options: PlaceablePaletteRenderOptions): void;
                _renderFrameButtons(options: PlaceablePaletteRenderOptions): Promise<void>;
                _renderHeaderControl(control: foundry.applications.types.ApplicationHeaderControlsEntry): HTMLLIElement;
                _updateFrame(options: PlaceablePaletteRenderOptions): void;
                _insertElement(element: HTMLElement, options?: PlaceablePaletteRenderOptions | undefined): Promise<void>;
                close(options?: Partial<foundry.applications.types.ApplicationClosingOptions> | undefined): Promise<any>;
                "__#231@#close"(options: Partial<foundry.applications.types.ApplicationClosingOptions>): Promise<any>;
                _removeElement(element: HTMLElement): void;
                _tearDown(options: foundry.applications.types.ApplicationClosingOptions): void;
                setPosition(position?: Partial<foundry.applications.types.ApplicationPosition> | undefined): foundry.applications.types.ApplicationPosition | void;
                _updatePosition(position: foundry.applications.types.ApplicationPosition): foundry.applications.types.ApplicationPosition;
                "__#231@#applyPosition"(position: foundry.applications.types.ApplicationPosition): void;
                attachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
                detachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
                renderChild(app: ApplicationV2, options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2>;
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
                _canRender(options: PlaceablePaletteRenderOptions): false | void;
                _preFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
                _preRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
                _postRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
                _preClose(options: PlaceablePaletteRenderOptions): Promise<void>;
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
            }, event: PointerEvent, target: HTMLElement) => void;
            closePalette: (this: {
                /**
                 * The all controlled documents for this palette's placeables layer.
                 * @type {InstanceType<T>[]}
                 */
                readonly controlled: any[];
                /**
                 * The initial creation data for a new document.
                 * @type {object}
                 */
                readonly createData: object;
                /**
                 * The fields the user has modified from their default values.
                 * @type {Set<string>}
                 * @internal
                 */
                _dirtyFields: Set<string>;
                /**
                 * The fields that have differing values across the set of controlled documents.
                 * @type {Set<string>}
                 * @internal
                 */
                _multiFields: Set<string>;
                /**
                 * The class of the document that backs this form.
                 * @type {T}
                 */
                readonly documentClass: any;
                /**
                 * The placeable document.
                 * @returns {string}
                 */
                readonly documentName: string;
                /**
                 * Whether the palette is editing multiple placeables.
                 * @type {boolean}
                 */
                readonly isSelect: boolean;
                /**
                 * The canvas layer for this palette's placeable.
                 * @type {PlaceablesLayer}
                 */
                readonly layer: PlaceablesLayer;
                /** @override */
                readonly title: string;
                /**
                 * Configure an appropriate preset to apply.
                 * @param {PlaceablePaletteRenderOptions} [options]  Render options.
                 * @returns {object|void}                            The preset to apply, if any.
                 */
                "__#133@#applyPreset"(options?: PlaceablePaletteRenderOptions | undefined): object | void;
                /**
                 * Configure an appropriate preset to apply.
                 * @param {object} formData                          The palette data.
                 * @param {PlaceablePaletteRenderOptions} [options]  Render options.
                 * @protected
                 */
                _applyPreset(formData: object, { preset }?: PlaceablePaletteRenderOptions | undefined): object;
                /** @inheritDoc */
                _configureRenderOptions(options: any): void;
                /** @inheritDoc */
                _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext>;
                /** @inheritDoc */
                render(options: any, _options: any): Promise<void>;
                _preview: any;
                /** @inheritDoc */
                _onClose(options: any): void;
                /** @inheritDoc */
                _onFirstRender(context: any, options: any): Promise<void>;
                /** @inheritDoc */
                _onRender(context: any, options: any): Promise<void>;
                /** @inheritDoc */
                _processFormData(event: any, form: any, formData: any): any;
                /** @override */
                _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
                /** @inheritDoc */
                _renderFrame(options: any): Promise<HTMLElement>;
                /** @inheritDoc */
                _onChangeForm(formConfig: any, event: any): void;
                /**
                 * Determine which fields have values that are not the same across all selected documents.
                 * @param {InstanceType<T>[]} docs
                 * @returns {Set<string>}
                 * @protected
                 */
                _determineMultiFields(docs: any[]): Set<string>;
                /**
                 * Render hints as inline as info bubbles.
                 */
                "__#133@#renderInlineHints"(): void;
                /**
                 * Set a multi-value placeholder on the given element.
                 * @param {HTMLElement} element
                 * @protected
                 */
                _setPlaceholder(element: HTMLElement): void;
                options: Readonly<PlaceablePaletteConfiguration>;
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
                "__#231@#render"(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
                _prepareTabs(group: string): Record<string, foundry.applications.types.ApplicationTab>;
                _getTabsConfig(group: string): foundry.applications.types.ApplicationTabsConfiguration | null;
                _getFrameButtons(options: PlaceablePaletteRenderOptions): foundry.applications.types.ApplicationHeaderControlsEntry[];
                _getHeaderControls(): foundry.applications.types.ApplicationHeaderControlsEntry[];
                _headerControlButtons(): Generator<foundry.applications.types.ApplicationHeaderControlsEntry>;
                _headerControlContextEntries(): Generator<import("../../ux/context-menu.mjs").ContextMenuEntry, void, any>;
                _renderHTML(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<any>;
                _replaceHTML(result: any, content: HTMLElement, options: PlaceablePaletteRenderOptions): void;
                _renderFrameButtons(options: PlaceablePaletteRenderOptions): Promise<void>;
                _renderHeaderControl(control: foundry.applications.types.ApplicationHeaderControlsEntry): HTMLLIElement;
                _updateFrame(options: PlaceablePaletteRenderOptions): void;
                _insertElement(element: HTMLElement, options?: PlaceablePaletteRenderOptions | undefined): Promise<void>;
                close(options?: Partial<foundry.applications.types.ApplicationClosingOptions> | undefined): Promise<any>;
                "__#231@#close"(options: Partial<foundry.applications.types.ApplicationClosingOptions>): Promise<any>;
                _removeElement(element: HTMLElement): void;
                _tearDown(options: foundry.applications.types.ApplicationClosingOptions): void;
                setPosition(position?: Partial<foundry.applications.types.ApplicationPosition> | undefined): foundry.applications.types.ApplicationPosition | void;
                _updatePosition(position: foundry.applications.types.ApplicationPosition): foundry.applications.types.ApplicationPosition;
                "__#231@#applyPosition"(position: foundry.applications.types.ApplicationPosition): void;
                attachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
                detachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
                renderChild(app: ApplicationV2, options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2>;
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
                _canRender(options: PlaceablePaletteRenderOptions): false | void;
                _preFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
                _preRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
                _postRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
                _preClose(options: PlaceablePaletteRenderOptions): Promise<void>;
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
            }) => Promise<void>;
            commit: (this: {
                /**
                 * The all controlled documents for this palette's placeables layer.
                 * @type {InstanceType<T>[]}
                 */
                readonly controlled: any[];
                /**
                 * The initial creation data for a new document.
                 * @type {object}
                 */
                readonly createData: object;
                /**
                 * The fields the user has modified from their default values.
                 * @type {Set<string>}
                 * @internal
                 */
                _dirtyFields: Set<string>;
                /**
                 * The fields that have differing values across the set of controlled documents.
                 * @type {Set<string>}
                 * @internal
                 */
                _multiFields: Set<string>;
                /**
                 * The class of the document that backs this form.
                 * @type {T}
                 */
                readonly documentClass: any;
                /**
                 * The placeable document.
                 * @returns {string}
                 */
                readonly documentName: string;
                /**
                 * Whether the palette is editing multiple placeables.
                 * @type {boolean}
                 */
                readonly isSelect: boolean;
                /**
                 * The canvas layer for this palette's placeable.
                 * @type {PlaceablesLayer}
                 */
                readonly layer: PlaceablesLayer;
                /** @override */
                readonly title: string;
                /**
                 * Configure an appropriate preset to apply.
                 * @param {PlaceablePaletteRenderOptions} [options]  Render options.
                 * @returns {object|void}                            The preset to apply, if any.
                 */
                "__#133@#applyPreset"(options?: PlaceablePaletteRenderOptions | undefined): object | void;
                /**
                 * Configure an appropriate preset to apply.
                 * @param {object} formData                          The palette data.
                 * @param {PlaceablePaletteRenderOptions} [options]  Render options.
                 * @protected
                 */
                _applyPreset(formData: object, { preset }?: PlaceablePaletteRenderOptions | undefined): object;
                /** @inheritDoc */
                _configureRenderOptions(options: any): void;
                /** @inheritDoc */
                _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext>;
                /** @inheritDoc */
                render(options: any, _options: any): Promise<void>;
                _preview: any;
                /** @inheritDoc */
                _onClose(options: any): void;
                /** @inheritDoc */
                _onFirstRender(context: any, options: any): Promise<void>;
                /** @inheritDoc */
                _onRender(context: any, options: any): Promise<void>;
                /** @inheritDoc */
                _processFormData(event: any, form: any, formData: any): any;
                /** @override */
                _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
                /** @inheritDoc */
                _renderFrame(options: any): Promise<HTMLElement>;
                /** @inheritDoc */
                _onChangeForm(formConfig: any, event: any): void;
                /**
                 * Determine which fields have values that are not the same across all selected documents.
                 * @param {InstanceType<T>[]} docs
                 * @returns {Set<string>}
                 * @protected
                 */
                _determineMultiFields(docs: any[]): Set<string>;
                /**
                 * Render hints as inline as info bubbles.
                 */
                "__#133@#renderInlineHints"(): void;
                /**
                 * Set a multi-value placeholder on the given element.
                 * @param {HTMLElement} element
                 * @protected
                 */
                _setPlaceholder(element: HTMLElement): void;
                options: Readonly<PlaceablePaletteConfiguration>;
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
                "__#231@#render"(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
                _prepareTabs(group: string): Record<string, foundry.applications.types.ApplicationTab>;
                _getTabsConfig(group: string): foundry.applications.types.ApplicationTabsConfiguration | null;
                _getFrameButtons(options: PlaceablePaletteRenderOptions): foundry.applications.types.ApplicationHeaderControlsEntry[];
                _getHeaderControls(): foundry.applications.types.ApplicationHeaderControlsEntry[];
                _headerControlButtons(): Generator<foundry.applications.types.ApplicationHeaderControlsEntry>;
                _headerControlContextEntries(): Generator<import("../../ux/context-menu.mjs").ContextMenuEntry, void, any>;
                _renderHTML(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<any>;
                _replaceHTML(result: any, content: HTMLElement, options: PlaceablePaletteRenderOptions): void;
                _renderFrameButtons(options: PlaceablePaletteRenderOptions): Promise<void>;
                _renderHeaderControl(control: foundry.applications.types.ApplicationHeaderControlsEntry): HTMLLIElement;
                _updateFrame(options: PlaceablePaletteRenderOptions): void;
                _insertElement(element: HTMLElement, options?: PlaceablePaletteRenderOptions | undefined): Promise<void>;
                close(options?: Partial<foundry.applications.types.ApplicationClosingOptions> | undefined): Promise<any>;
                "__#231@#close"(options: Partial<foundry.applications.types.ApplicationClosingOptions>): Promise<any>;
                _removeElement(element: HTMLElement): void;
                _tearDown(options: foundry.applications.types.ApplicationClosingOptions): void;
                setPosition(position?: Partial<foundry.applications.types.ApplicationPosition> | undefined): foundry.applications.types.ApplicationPosition | void;
                _updatePosition(position: foundry.applications.types.ApplicationPosition): foundry.applications.types.ApplicationPosition;
                "__#231@#applyPosition"(position: foundry.applications.types.ApplicationPosition): void;
                attachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
                detachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
                renderChild(app: ApplicationV2, options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2>;
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
                _canRender(options: PlaceablePaletteRenderOptions): false | void;
                _preFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
                _preRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
                _postRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
                _preClose(options: PlaceablePaletteRenderOptions): Promise<void>;
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
            }) => Promise<void>;
            reset: (this: {
                /**
                 * The all controlled documents for this palette's placeables layer.
                 * @type {InstanceType<T>[]}
                 */
                readonly controlled: any[];
                /**
                 * The initial creation data for a new document.
                 * @type {object}
                 */
                readonly createData: object;
                /**
                 * The fields the user has modified from their default values.
                 * @type {Set<string>}
                 * @internal
                 */
                _dirtyFields: Set<string>;
                /**
                 * The fields that have differing values across the set of controlled documents.
                 * @type {Set<string>}
                 * @internal
                 */
                _multiFields: Set<string>;
                /**
                 * The class of the document that backs this form.
                 * @type {T}
                 */
                readonly documentClass: any;
                /**
                 * The placeable document.
                 * @returns {string}
                 */
                readonly documentName: string;
                /**
                 * Whether the palette is editing multiple placeables.
                 * @type {boolean}
                 */
                readonly isSelect: boolean;
                /**
                 * The canvas layer for this palette's placeable.
                 * @type {PlaceablesLayer}
                 */
                readonly layer: PlaceablesLayer;
                /** @override */
                readonly title: string;
                /**
                 * Configure an appropriate preset to apply.
                 * @param {PlaceablePaletteRenderOptions} [options]  Render options.
                 * @returns {object|void}                            The preset to apply, if any.
                 */
                "__#133@#applyPreset"(options?: PlaceablePaletteRenderOptions | undefined): object | void;
                /**
                 * Configure an appropriate preset to apply.
                 * @param {object} formData                          The palette data.
                 * @param {PlaceablePaletteRenderOptions} [options]  Render options.
                 * @protected
                 */
                _applyPreset(formData: object, { preset }?: PlaceablePaletteRenderOptions | undefined): object;
                /** @inheritDoc */
                _configureRenderOptions(options: any): void;
                /** @inheritDoc */
                _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext>;
                /** @inheritDoc */
                render(options: any, _options: any): Promise<void>;
                _preview: any;
                /** @inheritDoc */
                _onClose(options: any): void;
                /** @inheritDoc */
                _onFirstRender(context: any, options: any): Promise<void>;
                /** @inheritDoc */
                _onRender(context: any, options: any): Promise<void>;
                /** @inheritDoc */
                _processFormData(event: any, form: any, formData: any): any;
                /** @override */
                _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
                /** @inheritDoc */
                _renderFrame(options: any): Promise<HTMLElement>;
                /** @inheritDoc */
                _onChangeForm(formConfig: any, event: any): void;
                /**
                 * Determine which fields have values that are not the same across all selected documents.
                 * @param {InstanceType<T>[]} docs
                 * @returns {Set<string>}
                 * @protected
                 */
                _determineMultiFields(docs: any[]): Set<string>;
                /**
                 * Render hints as inline as info bubbles.
                 */
                "__#133@#renderInlineHints"(): void;
                /**
                 * Set a multi-value placeholder on the given element.
                 * @param {HTMLElement} element
                 * @protected
                 */
                _setPlaceholder(element: HTMLElement): void;
                options: Readonly<PlaceablePaletteConfiguration>;
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
                "__#231@#render"(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
                _prepareTabs(group: string): Record<string, foundry.applications.types.ApplicationTab>;
                _getTabsConfig(group: string): foundry.applications.types.ApplicationTabsConfiguration | null;
                _getFrameButtons(options: PlaceablePaletteRenderOptions): foundry.applications.types.ApplicationHeaderControlsEntry[];
                _getHeaderControls(): foundry.applications.types.ApplicationHeaderControlsEntry[];
                _headerControlButtons(): Generator<foundry.applications.types.ApplicationHeaderControlsEntry>;
                _headerControlContextEntries(): Generator<import("../../ux/context-menu.mjs").ContextMenuEntry, void, any>;
                _renderHTML(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<any>;
                _replaceHTML(result: any, content: HTMLElement, options: PlaceablePaletteRenderOptions): void;
                _renderFrameButtons(options: PlaceablePaletteRenderOptions): Promise<void>;
                _renderHeaderControl(control: foundry.applications.types.ApplicationHeaderControlsEntry): HTMLLIElement;
                _updateFrame(options: PlaceablePaletteRenderOptions): void;
                _insertElement(element: HTMLElement, options?: PlaceablePaletteRenderOptions | undefined): Promise<void>;
                close(options?: Partial<foundry.applications.types.ApplicationClosingOptions> | undefined): Promise<any>;
                "__#231@#close"(options: Partial<foundry.applications.types.ApplicationClosingOptions>): Promise<any>;
                _removeElement(element: HTMLElement): void;
                _tearDown(options: foundry.applications.types.ApplicationClosingOptions): void;
                setPosition(position?: Partial<foundry.applications.types.ApplicationPosition> | undefined): foundry.applications.types.ApplicationPosition | void;
                _updatePosition(position: foundry.applications.types.ApplicationPosition): foundry.applications.types.ApplicationPosition;
                "__#231@#applyPosition"(position: foundry.applications.types.ApplicationPosition): void;
                attachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
                detachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
                renderChild(app: ApplicationV2, options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2>;
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
                _canRender(options: PlaceablePaletteRenderOptions): false | void;
                _preFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
                _preRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
                _postRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
                _preClose(options: PlaceablePaletteRenderOptions): Promise<void>;
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
            }) => Promise<void>;
        };
        preview: boolean;
    };
    /**
     * The initial creation data for a new document, reading from the live palette instance if one is open, otherwise
     * falling back to the stored settings, with level and elevation synced to the currently viewed level.
     * @type {object}
     */
    readonly createData: object;
    /**
     * Get the default level and elevation data for a given level, used when syncing to the currently viewed level.
     * @returns {object}
     * @protected
     */
    _getDefaultLevelData(): object;
    /**
     * If defined, switch to this tool after committing settings so the user can immediately draw with them.
     * @type {string}
     */
    COMMIT_TOOL: string;
    /**
     * The schema of the user's stored palette values.
     * @returns {SchemaField}
     */
    readonly schema: SchemaField;
    /**
     * Handle collapsing a details disclosure.
     * @this {PlaceablePalette}
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target.
     */
    "__#133@#onCloseDetails"(this: {
        /**
         * The all controlled documents for this palette's placeables layer.
         * @type {InstanceType<T>[]}
         */
        readonly controlled: any[];
        /**
         * The initial creation data for a new document.
         * @type {object}
         */
        readonly createData: object;
        /**
         * The fields the user has modified from their default values.
         * @type {Set<string>}
         * @internal
         */
        _dirtyFields: Set<string>;
        /**
         * The fields that have differing values across the set of controlled documents.
         * @type {Set<string>}
         * @internal
         */
        _multiFields: Set<string>;
        /**
         * The class of the document that backs this form.
         * @type {T}
         */
        readonly documentClass: any;
        /**
         * The placeable document.
         * @returns {string}
         */
        readonly documentName: string;
        /**
         * Whether the palette is editing multiple placeables.
         * @type {boolean}
         */
        readonly isSelect: boolean;
        /**
         * The canvas layer for this palette's placeable.
         * @type {PlaceablesLayer}
         */
        readonly layer: PlaceablesLayer;
        /** @override */
        readonly title: string;
        /**
         * Configure an appropriate preset to apply.
         * @param {PlaceablePaletteRenderOptions} [options]  Render options.
         * @returns {object|void}                            The preset to apply, if any.
         */
        "__#133@#applyPreset"(options?: PlaceablePaletteRenderOptions | undefined): object | void;
        /**
         * Configure an appropriate preset to apply.
         * @param {object} formData                          The palette data.
         * @param {PlaceablePaletteRenderOptions} [options]  Render options.
         * @protected
         */
        _applyPreset(formData: object, { preset }?: PlaceablePaletteRenderOptions | undefined): object;
        /** @inheritDoc */
        _configureRenderOptions(options: any): void;
        /** @inheritDoc */
        _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext>;
        /** @inheritDoc */
        render(options: any, _options: any): Promise<void>;
        _preview: any;
        /** @inheritDoc */
        _onClose(options: any): void;
        /** @inheritDoc */
        _onFirstRender(context: any, options: any): Promise<void>;
        /** @inheritDoc */
        _onRender(context: any, options: any): Promise<void>;
        /** @inheritDoc */
        _processFormData(event: any, form: any, formData: any): any;
        /** @override */
        _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
        /** @inheritDoc */
        _renderFrame(options: any): Promise<HTMLElement>;
        /** @inheritDoc */
        _onChangeForm(formConfig: any, event: any): void;
        /**
         * Determine which fields have values that are not the same across all selected documents.
         * @param {InstanceType<T>[]} docs
         * @returns {Set<string>}
         * @protected
         */
        _determineMultiFields(docs: any[]): Set<string>;
        /**
         * Render hints as inline as info bubbles.
         */
        "__#133@#renderInlineHints"(): void;
        /**
         * Set a multi-value placeholder on the given element.
         * @param {HTMLElement} element
         * @protected
         */
        _setPlaceholder(element: HTMLElement): void;
        options: Readonly<PlaceablePaletteConfiguration>;
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
        "__#231@#render"(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
        _prepareTabs(group: string): Record<string, foundry.applications.types.ApplicationTab>;
        _getTabsConfig(group: string): foundry.applications.types.ApplicationTabsConfiguration | null;
        _getFrameButtons(options: PlaceablePaletteRenderOptions): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _getHeaderControls(): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _headerControlButtons(): Generator<foundry.applications.types.ApplicationHeaderControlsEntry>;
        _headerControlContextEntries(): Generator<import("../../ux/context-menu.mjs").ContextMenuEntry, void, any>;
        _renderHTML(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<any>;
        _replaceHTML(result: any, content: HTMLElement, options: PlaceablePaletteRenderOptions): void;
        _renderFrameButtons(options: PlaceablePaletteRenderOptions): Promise<void>;
        _renderHeaderControl(control: foundry.applications.types.ApplicationHeaderControlsEntry): HTMLLIElement;
        _updateFrame(options: PlaceablePaletteRenderOptions): void;
        _insertElement(element: HTMLElement, options?: PlaceablePaletteRenderOptions | undefined): Promise<void>;
        close(options?: Partial<foundry.applications.types.ApplicationClosingOptions> | undefined): Promise<any>;
        "__#231@#close"(options: Partial<foundry.applications.types.ApplicationClosingOptions>): Promise<any>;
        _removeElement(element: HTMLElement): void;
        _tearDown(options: foundry.applications.types.ApplicationClosingOptions): void;
        setPosition(position?: Partial<foundry.applications.types.ApplicationPosition> | undefined): foundry.applications.types.ApplicationPosition | void;
        _updatePosition(position: foundry.applications.types.ApplicationPosition): foundry.applications.types.ApplicationPosition;
        "__#231@#applyPosition"(position: foundry.applications.types.ApplicationPosition): void;
        attachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
        detachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
        renderChild(app: ApplicationV2, options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2>;
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
        _canRender(options: PlaceablePaletteRenderOptions): false | void;
        _preFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _preRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _postRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _preClose(options: PlaceablePaletteRenderOptions): Promise<void>;
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
    }, event: PointerEvent, target: HTMLElement): void;
    /**
     * Handle closing the palette via the close button.
     * @this {PlaceablePalette}
     */
    "__#133@#onClosePalette"(this: {
        /**
         * The all controlled documents for this palette's placeables layer.
         * @type {InstanceType<T>[]}
         */
        readonly controlled: any[];
        /**
         * The initial creation data for a new document.
         * @type {object}
         */
        readonly createData: object;
        /**
         * The fields the user has modified from their default values.
         * @type {Set<string>}
         * @internal
         */
        _dirtyFields: Set<string>;
        /**
         * The fields that have differing values across the set of controlled documents.
         * @type {Set<string>}
         * @internal
         */
        _multiFields: Set<string>;
        /**
         * The class of the document that backs this form.
         * @type {T}
         */
        readonly documentClass: any;
        /**
         * The placeable document.
         * @returns {string}
         */
        readonly documentName: string;
        /**
         * Whether the palette is editing multiple placeables.
         * @type {boolean}
         */
        readonly isSelect: boolean;
        /**
         * The canvas layer for this palette's placeable.
         * @type {PlaceablesLayer}
         */
        readonly layer: PlaceablesLayer;
        /** @override */
        readonly title: string;
        /**
         * Configure an appropriate preset to apply.
         * @param {PlaceablePaletteRenderOptions} [options]  Render options.
         * @returns {object|void}                            The preset to apply, if any.
         */
        "__#133@#applyPreset"(options?: PlaceablePaletteRenderOptions | undefined): object | void;
        /**
         * Configure an appropriate preset to apply.
         * @param {object} formData                          The palette data.
         * @param {PlaceablePaletteRenderOptions} [options]  Render options.
         * @protected
         */
        _applyPreset(formData: object, { preset }?: PlaceablePaletteRenderOptions | undefined): object;
        /** @inheritDoc */
        _configureRenderOptions(options: any): void;
        /** @inheritDoc */
        _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext>;
        /** @inheritDoc */
        render(options: any, _options: any): Promise<void>;
        _preview: any;
        /** @inheritDoc */
        _onClose(options: any): void;
        /** @inheritDoc */
        _onFirstRender(context: any, options: any): Promise<void>;
        /** @inheritDoc */
        _onRender(context: any, options: any): Promise<void>;
        /** @inheritDoc */
        _processFormData(event: any, form: any, formData: any): any;
        /** @override */
        _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
        /** @inheritDoc */
        _renderFrame(options: any): Promise<HTMLElement>;
        /** @inheritDoc */
        _onChangeForm(formConfig: any, event: any): void;
        /**
         * Determine which fields have values that are not the same across all selected documents.
         * @param {InstanceType<T>[]} docs
         * @returns {Set<string>}
         * @protected
         */
        _determineMultiFields(docs: any[]): Set<string>;
        /**
         * Render hints as inline as info bubbles.
         */
        "__#133@#renderInlineHints"(): void;
        /**
         * Set a multi-value placeholder on the given element.
         * @param {HTMLElement} element
         * @protected
         */
        _setPlaceholder(element: HTMLElement): void;
        options: Readonly<PlaceablePaletteConfiguration>;
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
        "__#231@#render"(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
        _prepareTabs(group: string): Record<string, foundry.applications.types.ApplicationTab>;
        _getTabsConfig(group: string): foundry.applications.types.ApplicationTabsConfiguration | null;
        _getFrameButtons(options: PlaceablePaletteRenderOptions): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _getHeaderControls(): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _headerControlButtons(): Generator<foundry.applications.types.ApplicationHeaderControlsEntry>;
        _headerControlContextEntries(): Generator<import("../../ux/context-menu.mjs").ContextMenuEntry, void, any>;
        _renderHTML(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<any>;
        _replaceHTML(result: any, content: HTMLElement, options: PlaceablePaletteRenderOptions): void;
        _renderFrameButtons(options: PlaceablePaletteRenderOptions): Promise<void>;
        _renderHeaderControl(control: foundry.applications.types.ApplicationHeaderControlsEntry): HTMLLIElement;
        _updateFrame(options: PlaceablePaletteRenderOptions): void;
        _insertElement(element: HTMLElement, options?: PlaceablePaletteRenderOptions | undefined): Promise<void>;
        close(options?: Partial<foundry.applications.types.ApplicationClosingOptions> | undefined): Promise<any>;
        "__#231@#close"(options: Partial<foundry.applications.types.ApplicationClosingOptions>): Promise<any>;
        _removeElement(element: HTMLElement): void;
        _tearDown(options: foundry.applications.types.ApplicationClosingOptions): void;
        setPosition(position?: Partial<foundry.applications.types.ApplicationPosition> | undefined): foundry.applications.types.ApplicationPosition | void;
        _updatePosition(position: foundry.applications.types.ApplicationPosition): foundry.applications.types.ApplicationPosition;
        "__#231@#applyPosition"(position: foundry.applications.types.ApplicationPosition): void;
        attachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
        detachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
        renderChild(app: ApplicationV2, options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2>;
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
        _canRender(options: PlaceablePaletteRenderOptions): false | void;
        _preFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _preRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _postRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _preClose(options: PlaceablePaletteRenderOptions): Promise<void>;
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
    }): Promise<void>;
    /**
     * Handle committing the common values of the current selection as the palette defaults.
     * @this {PlaceablePalette}
     */
    "__#133@#onCommit"(this: {
        /**
         * The all controlled documents for this palette's placeables layer.
         * @type {InstanceType<T>[]}
         */
        readonly controlled: any[];
        /**
         * The initial creation data for a new document.
         * @type {object}
         */
        readonly createData: object;
        /**
         * The fields the user has modified from their default values.
         * @type {Set<string>}
         * @internal
         */
        _dirtyFields: Set<string>;
        /**
         * The fields that have differing values across the set of controlled documents.
         * @type {Set<string>}
         * @internal
         */
        _multiFields: Set<string>;
        /**
         * The class of the document that backs this form.
         * @type {T}
         */
        readonly documentClass: any;
        /**
         * The placeable document.
         * @returns {string}
         */
        readonly documentName: string;
        /**
         * Whether the palette is editing multiple placeables.
         * @type {boolean}
         */
        readonly isSelect: boolean;
        /**
         * The canvas layer for this palette's placeable.
         * @type {PlaceablesLayer}
         */
        readonly layer: PlaceablesLayer;
        /** @override */
        readonly title: string;
        /**
         * Configure an appropriate preset to apply.
         * @param {PlaceablePaletteRenderOptions} [options]  Render options.
         * @returns {object|void}                            The preset to apply, if any.
         */
        "__#133@#applyPreset"(options?: PlaceablePaletteRenderOptions | undefined): object | void;
        /**
         * Configure an appropriate preset to apply.
         * @param {object} formData                          The palette data.
         * @param {PlaceablePaletteRenderOptions} [options]  Render options.
         * @protected
         */
        _applyPreset(formData: object, { preset }?: PlaceablePaletteRenderOptions | undefined): object;
        /** @inheritDoc */
        _configureRenderOptions(options: any): void;
        /** @inheritDoc */
        _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext>;
        /** @inheritDoc */
        render(options: any, _options: any): Promise<void>;
        _preview: any;
        /** @inheritDoc */
        _onClose(options: any): void;
        /** @inheritDoc */
        _onFirstRender(context: any, options: any): Promise<void>;
        /** @inheritDoc */
        _onRender(context: any, options: any): Promise<void>;
        /** @inheritDoc */
        _processFormData(event: any, form: any, formData: any): any;
        /** @override */
        _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
        /** @inheritDoc */
        _renderFrame(options: any): Promise<HTMLElement>;
        /** @inheritDoc */
        _onChangeForm(formConfig: any, event: any): void;
        /**
         * Determine which fields have values that are not the same across all selected documents.
         * @param {InstanceType<T>[]} docs
         * @returns {Set<string>}
         * @protected
         */
        _determineMultiFields(docs: any[]): Set<string>;
        /**
         * Render hints as inline as info bubbles.
         */
        "__#133@#renderInlineHints"(): void;
        /**
         * Set a multi-value placeholder on the given element.
         * @param {HTMLElement} element
         * @protected
         */
        _setPlaceholder(element: HTMLElement): void;
        options: Readonly<PlaceablePaletteConfiguration>;
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
        "__#231@#render"(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
        _prepareTabs(group: string): Record<string, foundry.applications.types.ApplicationTab>;
        _getTabsConfig(group: string): foundry.applications.types.ApplicationTabsConfiguration | null;
        _getFrameButtons(options: PlaceablePaletteRenderOptions): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _getHeaderControls(): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _headerControlButtons(): Generator<foundry.applications.types.ApplicationHeaderControlsEntry>;
        _headerControlContextEntries(): Generator<import("../../ux/context-menu.mjs").ContextMenuEntry, void, any>;
        _renderHTML(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<any>;
        _replaceHTML(result: any, content: HTMLElement, options: PlaceablePaletteRenderOptions): void;
        _renderFrameButtons(options: PlaceablePaletteRenderOptions): Promise<void>;
        _renderHeaderControl(control: foundry.applications.types.ApplicationHeaderControlsEntry): HTMLLIElement;
        _updateFrame(options: PlaceablePaletteRenderOptions): void;
        _insertElement(element: HTMLElement, options?: PlaceablePaletteRenderOptions | undefined): Promise<void>;
        close(options?: Partial<foundry.applications.types.ApplicationClosingOptions> | undefined): Promise<any>;
        "__#231@#close"(options: Partial<foundry.applications.types.ApplicationClosingOptions>): Promise<any>;
        _removeElement(element: HTMLElement): void;
        _tearDown(options: foundry.applications.types.ApplicationClosingOptions): void;
        setPosition(position?: Partial<foundry.applications.types.ApplicationPosition> | undefined): foundry.applications.types.ApplicationPosition | void;
        _updatePosition(position: foundry.applications.types.ApplicationPosition): foundry.applications.types.ApplicationPosition;
        "__#231@#applyPosition"(position: foundry.applications.types.ApplicationPosition): void;
        attachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
        detachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
        renderChild(app: ApplicationV2, options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2>;
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
        _canRender(options: PlaceablePaletteRenderOptions): false | void;
        _preFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _preRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _postRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _preClose(options: PlaceablePaletteRenderOptions): Promise<void>;
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
    }): Promise<void>;
    /**
     * Handle resetting to default values.
     * @this {PlaceablePalette}
     */
    "__#133@#onReset"(this: {
        /**
         * The all controlled documents for this palette's placeables layer.
         * @type {InstanceType<T>[]}
         */
        readonly controlled: any[];
        /**
         * The initial creation data for a new document.
         * @type {object}
         */
        readonly createData: object;
        /**
         * The fields the user has modified from their default values.
         * @type {Set<string>}
         * @internal
         */
        _dirtyFields: Set<string>;
        /**
         * The fields that have differing values across the set of controlled documents.
         * @type {Set<string>}
         * @internal
         */
        _multiFields: Set<string>;
        /**
         * The class of the document that backs this form.
         * @type {T}
         */
        readonly documentClass: any;
        /**
         * The placeable document.
         * @returns {string}
         */
        readonly documentName: string;
        /**
         * Whether the palette is editing multiple placeables.
         * @type {boolean}
         */
        readonly isSelect: boolean;
        /**
         * The canvas layer for this palette's placeable.
         * @type {PlaceablesLayer}
         */
        readonly layer: PlaceablesLayer;
        /** @override */
        readonly title: string;
        /**
         * Configure an appropriate preset to apply.
         * @param {PlaceablePaletteRenderOptions} [options]  Render options.
         * @returns {object|void}                            The preset to apply, if any.
         */
        "__#133@#applyPreset"(options?: PlaceablePaletteRenderOptions | undefined): object | void;
        /**
         * Configure an appropriate preset to apply.
         * @param {object} formData                          The palette data.
         * @param {PlaceablePaletteRenderOptions} [options]  Render options.
         * @protected
         */
        _applyPreset(formData: object, { preset }?: PlaceablePaletteRenderOptions | undefined): object;
        /** @inheritDoc */
        _configureRenderOptions(options: any): void;
        /** @inheritDoc */
        _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext>;
        /** @inheritDoc */
        render(options: any, _options: any): Promise<void>;
        _preview: any;
        /** @inheritDoc */
        _onClose(options: any): void;
        /** @inheritDoc */
        _onFirstRender(context: any, options: any): Promise<void>;
        /** @inheritDoc */
        _onRender(context: any, options: any): Promise<void>;
        /** @inheritDoc */
        _processFormData(event: any, form: any, formData: any): any;
        /** @override */
        _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
        /** @inheritDoc */
        _renderFrame(options: any): Promise<HTMLElement>;
        /** @inheritDoc */
        _onChangeForm(formConfig: any, event: any): void;
        /**
         * Determine which fields have values that are not the same across all selected documents.
         * @param {InstanceType<T>[]} docs
         * @returns {Set<string>}
         * @protected
         */
        _determineMultiFields(docs: any[]): Set<string>;
        /**
         * Render hints as inline as info bubbles.
         */
        "__#133@#renderInlineHints"(): void;
        /**
         * Set a multi-value placeholder on the given element.
         * @param {HTMLElement} element
         * @protected
         */
        _setPlaceholder(element: HTMLElement): void;
        options: Readonly<PlaceablePaletteConfiguration>;
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
        "__#231@#render"(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
        _prepareTabs(group: string): Record<string, foundry.applications.types.ApplicationTab>;
        _getTabsConfig(group: string): foundry.applications.types.ApplicationTabsConfiguration | null;
        _getFrameButtons(options: PlaceablePaletteRenderOptions): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _getHeaderControls(): foundry.applications.types.ApplicationHeaderControlsEntry[];
        _headerControlButtons(): Generator<foundry.applications.types.ApplicationHeaderControlsEntry>;
        _headerControlContextEntries(): Generator<import("../../ux/context-menu.mjs").ContextMenuEntry, void, any>;
        _renderHTML(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<any>;
        _replaceHTML(result: any, content: HTMLElement, options: PlaceablePaletteRenderOptions): void;
        _renderFrameButtons(options: PlaceablePaletteRenderOptions): Promise<void>;
        _renderHeaderControl(control: foundry.applications.types.ApplicationHeaderControlsEntry): HTMLLIElement;
        _updateFrame(options: PlaceablePaletteRenderOptions): void;
        _insertElement(element: HTMLElement, options?: PlaceablePaletteRenderOptions | undefined): Promise<void>;
        close(options?: Partial<foundry.applications.types.ApplicationClosingOptions> | undefined): Promise<any>;
        "__#231@#close"(options: Partial<foundry.applications.types.ApplicationClosingOptions>): Promise<any>;
        _removeElement(element: HTMLElement): void;
        _tearDown(options: foundry.applications.types.ApplicationClosingOptions): void;
        setPosition(position?: Partial<foundry.applications.types.ApplicationPosition> | undefined): foundry.applications.types.ApplicationPosition | void;
        _updatePosition(position: foundry.applications.types.ApplicationPosition): foundry.applications.types.ApplicationPosition;
        "__#231@#applyPosition"(position: foundry.applications.types.ApplicationPosition): void;
        attachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions>>;
        detachWindow(options?: PlaceablePaletteRenderOptions | undefined): Promise<any>;
        renderChild(app: ApplicationV2, options?: PlaceablePaletteRenderOptions | undefined): Promise<ApplicationV2>;
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
        _canRender(options: PlaceablePaletteRenderOptions): false | void;
        _preFirstRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _preRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _postRender(context: foundry.applications.types.ApplicationRenderContext, options: PlaceablePaletteRenderOptions): Promise<void>;
        _preClose(options: PlaceablePaletteRenderOptions): Promise<void>;
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
    }): Promise<void>;
    /**
     * Clear a multi-value placeholder from the given element.
     * @param {HTMLElement} element
     */
    "__#133@#clearPlaceholder"(element: HTMLElement): void;
    /**
     * Determine whether the given preset creation data matches the currently stored palette settings.
     * @param {object} createData  The preset creation data to compare against.
     * @returns {boolean}
     */
    isActivePreset(createData: object): boolean;
    BASE_APPLICATION: typeof ApplicationV2;
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
import type ApplicationV2 from "../../api/application.mjs";
import type { Constructor } from "../../../../common/_types.mjs";
import type { PlaceablePaletteRenderOptions } from "../../_types.mjs";
import type { PlaceablePaletteConfiguration } from "../../_types.mjs";
