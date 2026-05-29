/**
 * @import {CanvasDocument} from "../../documents/abstract/canvas-document.mjs";
 * @import {PlaceableObject} from "../../canvas/placeables/_module.mjs";
 * @import {PlaceablesLayer} from "../../canvas/layers/_module.mjs";
 */
/**
 * An abstract base class for displaying a heads-up-display interface bound to a Placeable Object on the Canvas.
 * @template {PlaceableObject} ActiveHUDObject
 * @template {CanvasDocument} ActiveHUDDocument
 * @template {PlaceablesLayer} ActiveHUDLayer
 */
export default class BasePlaceableHUD<ActiveHUDObject extends PlaceableObject, ActiveHUDDocument extends CanvasDocument, ActiveHUDLayer extends PlaceablesLayer> extends ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> {
    /** @override */
    static override DEFAULT_OPTIONS: {
        id: string;
        classes: string[];
        tag: string;
        window: {
            frame: boolean;
            positioned: boolean;
        };
        form: {
            handler: Function;
            submitOnChange: boolean;
            closeOnSubmit: boolean;
        };
        actions: {
            config: Function;
            visibility: Function;
            locked: Function;
            sort: Function;
            togglePalette: Function;
        };
        position: {};
    };
    /** @override */
    static override BASE_APPLICATION: typeof BasePlaceableHUD;
    /**
     * Handle submission of the BasePlaceableHUD form.
     * Wrap a protected method that can be implemented by a subclass.
     * @this {BasePlaceableHUD}
     * @param {SubmitEvent} event
     * @param {HTMLFormElement} form
     * @param {FormDataExtended} formData
     * @returns {Promise<void>}
     */
    static "__#160@#onSubmit"(this: BasePlaceableHUD<any, any, any>, event: SubmitEvent, form: HTMLFormElement, formData: FormDataExtended): Promise<void>;
    /**
     * Handle toggling palette.
     * @this {BasePlaceableHUD}
     * @param {PointerEvent} event
     * @param {HTMLButtonElement} target
     */
    static "__#160@#onTogglePalette"(this: BasePlaceableHUD<any, any, any>, event: PointerEvent, target: HTMLButtonElement): void;
    /**
     * Handle click actions to configure the placed object.
     * @this {BasePlaceableHUD}
     * @param {PointerEvent} event
     * @param {HTMLButtonElement} target
     */
    static "__#160@#onConfigure"(this: BasePlaceableHUD<any, any, any>, event: PointerEvent, target: HTMLButtonElement): void;
    /**
     * Handle click actions to toggle object visibility.
     * @this {BasePlaceableHUD}
     * @param {PointerEvent} event
     * @param {HTMLButtonElement} target
     */
    static "__#160@#onToggleVisibility"(this: BasePlaceableHUD<any, any, any>, event: PointerEvent, target: HTMLButtonElement): Promise<foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext>[]>;
    /**
     * Handle click actions to toggle object locked state.
     * @this {BasePlaceableHUD}
     * @param {PointerEvent} event
     * @param {HTMLButtonElement} target
     */
    static "__#160@#onToggleLocked"(this: BasePlaceableHUD<any, any, any>, event: PointerEvent, target: HTMLButtonElement): Promise<foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext>[]>;
    /**
     * Handle click actions to sort the object backwards or forwards within its layer.
     * @this {BasePlaceableHUD}
     * @param {PointerEvent} event
     * @param {HTMLButtonElement} target
     */
    static "__#160@#onSort"(this: BasePlaceableHUD<any, any, any>, event: PointerEvent, target: HTMLButtonElement): void;
    constructor(options?: Partial<foundry.applications.types.ApplicationConfiguration> | undefined);
    /**
     * Reference a PlaceableObject this HUD is currently bound to.
     * @type {ActiveHUDObject}
     */
    get object(): ActiveHUDObject;
    /**
     * Convenience access to the Document which this HUD modifies.
     * @returns {ActiveHUDDocument}
     */
    get document(): ActiveHUDDocument;
    /**
     * Convenience access for the canvas layer which this HUD modifies
     * @type {ActiveHUDLayer}
     */
    get layer(): ActiveHUDLayer;
    /**
     * The palette that is currently expanded, if any.
     * @type {string|null}
     */
    get activePalette(): string | null;
    /** @override */
    override _prepareContext(_options: any): Promise<{
        id: string;
        classes: string;
        appId: any;
        isGM: boolean;
        isGamePaused: boolean;
        icons: {
            combat: string;
            visibility: string;
            effects: string;
            lock: string;
            up: string;
            down: string;
            defeated: string;
            light: string;
            lightOff: string;
            template: string;
            sound: string;
            soundOff: string;
            doorClosed: string;
            doorOpen: string;
            doorSecret: string;
            doorLocked: string;
            wallDirection: string;
            levels: string;
        };
        visibilityClass: string;
        lockedClass: string;
    }>;
    /** @override */
    override _updatePosition(position: any): any;
    /** @inheritDoc */
    _postRender(context: any, options: any): Promise<void>;
    /** @override */
    override _preClose(options: any): Promise<void>;
    /** @override */
    override _onClose(options: any): Promise<void>;
    /**
     * Insert the application HTML element into the DOM.
     * Subclasses may override this method to customize how the application is inserted.
     * @param {HTMLElement} element                 The element to insert
     * @protected
     */
    protected _insertElement(element: HTMLElement): void;
    /**
     * Bind the HUD to a new PlaceableObject and display it.
     * @param {ActiveHUDObject} object    A PlaceableObject instance to which the HUD should be bound
     * @returns {Promise<void>}
     */
    bind(object: ActiveHUDObject): Promise<void>;
    /** @override */
    override _canRender({ object }: {
        object: any;
    }): false | undefined;
    /** @inheritDoc */
    _configureRenderOptions(options: any): void;
    /**
     * Toggle the expanded state of the given palette.
     * @param {string|null} palette    The palette to toggle or null to collapse of the currently expanded palette
     * @param {boolean} [active]       Force the palette to be active or inactive
     */
    togglePalette(palette: string | null, active?: boolean | undefined): void;
    /**
     * Handle submission of the BasePlaceableHUD form.
     * @param {SubmitEvent} event
     * @param {HTMLFormElement} form
     * @param {FormDataExtended} formData
     * @returns {Promise<void>}
     * @protected
     */
    protected _onSubmit(event: SubmitEvent, form: HTMLFormElement, formData: FormDataExtended): Promise<void>;
    /**
     * Special submission process for elevation changes.
     * @param {SubmitEvent} event
     * @param {HTMLFormElement} form
     * @param {FormDataExtended} formData
     * @returns {Promise<void>}
     * @protected
     */
    protected _onSubmitElevation(event: SubmitEvent, form: HTMLFormElement, formData: FormDataExtended): Promise<void>;
    /**
     * Parse an attribute bar input string into a new value for the attribute field.
     * @param {string} name           The name of the attribute
     * @param {object|number} attr    The current value of the attribute
     * @param {string} input          The raw string input value
     * @returns {{value: number, [delta]: number, isDelta: boolean, isBar: boolean}} The parsed input value
     * @protected
     */
    protected _parseAttributeInput(name: string, attr: object | number, input: string): {
        value: number;
        isDelta: boolean;
        isBar: boolean;
    };
    /**
     * @deprecated since v13
     * @ignore
     */
    clear(): void;
    #private;
}
import type { PlaceableObject } from "../../canvas/placeables/_module.mjs";
import type { PlaceablesLayer } from "../../canvas/layers/_module.mjs";
import ApplicationV2 from "../api/application.mjs";
