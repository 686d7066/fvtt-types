/**
 * @import Token from "../../canvas/placeables/token.mjs";
 * @import TokenLayer from "../../canvas/layers/tokens.mjs";
 */
/**
 * An implementation of the BasePlaceableHUD base class which renders a heads-up-display interface for Token objects.
 * This interface provides controls for visibility, attribute bars, elevation, status effects, and more.
 * The TokenHUD implementation can be configured and replaced via {@link CONFIG.Token.hudClass}.
 * @extends {BasePlaceableHUD<Token, TokenDocument, TokenLayer>}
 * @mixes HandlebarsApplication
 */
export default class TokenHUD extends BasePlaceableHUD<Token, TokenDocument, TokenLayer> {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        id: string;
        actions: {
            combat: Function;
            target: Function;
            effect: {
                handler: Function;
                buttons: number[];
            };
            movementAction: Function;
            level: Function;
        };
    };
    /** @override */
    static override PARTS: {
        hud: {
            root: boolean;
            template: string;
        };
    };
    /**
     * Toggle the combat state of all controlled Tokens.
     * @this {TokenHUD}
     * @param {PointerEvent} event
     * @param {HTMLButtonElement} target
     * @returns {Promise<void>}
     */
    static "__#164@#onToggleCombat"(this: TokenHUD, event: PointerEvent, target: HTMLButtonElement): Promise<void>;
    /**
     * Handle toggling a token status effect icon.
     * @this {TokenHUD}
     * @param {PointerEvent} event
     * @param {HTMLButtonElement} target
     * @returns {Promise<void>}
     */
    static "__#164@#onToggleEffect"(this: TokenHUD, event: PointerEvent, target: HTMLButtonElement): Promise<void>;
    /**
     * Handle selecting a movement action.
     * @this {TokenHUD}
     * @param {PointerEvent} event
     * @param {HTMLButtonElement} target
     * @returns {Promise<void>}
     */
    static "__#164@#onSelectMovementAction"(this: TokenHUD, event: PointerEvent, target: HTMLButtonElement): Promise<void>;
    /**
     * Handle toggling the target state for this Token
     * @this {TokenHUD}
     * @param {PointerEvent} event
     * @param {HTMLButtonElement} target
     */
    static "__#164@#onToggleTarget"(this: TokenHUD, event: PointerEvent, target: HTMLButtonElement): void;
    /**
     * Handle changing level of controlled Tokens.
     * @this {TokenHUD}
     * @param {PointerEvent} event
     * @param {HTMLButtonElement} target
     * @returns {Promise<void>}
     */
    static "__#164@#onChangeLevel"(this: TokenHUD, event: PointerEvent, target: HTMLButtonElement): Promise<void>;
    constructor(options?: Partial<foundry.applications.types.ApplicationConfiguration> | undefined);
    /**
     * Convenience reference to the Actor modified by this TokenHUD.
     * @type {Actor}
     */
    get actor(): Actor;
    /** @inheritDoc */
    _prepareContext(options: any): Promise<object>;
    /**
     * Get the valid status effect choices.
     * @returns {{[id: string]: {
     *   id: string;
     *   _id: string;
     *   title: string;
     *   src: string;
     *   order: number;
     *   isActive: boolean;
     *   isOverlay: boolean;
     *   cssClass: string;
     * }}}
     * @protected
     */
    protected _getStatusEffectChoices(): {
        [id: string]: {
            id: string;
            _id: string;
            title: string;
            src: string;
            order: number;
            isActive: boolean;
            isOverlay: boolean;
            cssClass: string;
        };
    };
    /**
     * Get the valid movement action choices.
     * @returns {{[id: string]: {
     *   id: string;
     *   label: string;
     *   [icon]: string;
     *   [img]: string;
     *   isActive: boolean;
     *   cssClass: string;
     * }}}
     * @protected
     */
    protected _getMovementActionChoices(): {
        [id: string]: {
            id: string;
            label: string;
            [icon]: string;
            [img]: string;
            isActive: boolean;
            cssClass: string;
        };
    };
    /**
     * Get the level choices for this Token.
     * @returns {{[id: string]: {
     *   id: string;
     *   name: string;
     *   cssClass: string;
     * }}}
     * @protected
     */
    protected _getLevelChoices(): {
        [id: string]: {
            id: string;
            name: string;
            cssClass: string;
        };
    };
    /** @override */
    override _onPosition(position: any): void;
    /** @inheritDoc */
    _parseAttributeInput(name: any, attr: any, input: any): {
        value: number;
        isDelta: boolean;
        isBar: boolean;
    };
    /** @inheritDoc */
    _onSubmit(event: any, form: any, formData: any): Promise<void>;
    /** @override */
    override _onSubmitElevation(event: any, form: any, formData: any): Promise<void>;
    /**
     * @deprecated since v13
     * @ignore
     */
    toggleStatusTray(active: any): void;
    #private;
}
import type Token from "../../canvas/placeables/token.mjs";
import TokenDocument from "../../documents/token.mjs";
import type TokenLayer from "../../canvas/layers/tokens.mjs";
import BasePlaceableHUD from "./placeable-hud.mjs";
