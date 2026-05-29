/**
 * @import {ApplicationClickAction, FormFooterButton} from "../_types.mjs";
 */
/**
 * A DocumentSheet application responsible for displaying and editing a single Cards stack.
 * @extends DocumentSheetV2
 * @mixes HandlebarsApplication
 */
export class CardsConfig extends DocumentSheetV2 {
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
        actions: {
            controlCard: Function;
            reset: Function;
            pass: Function;
            shuffle: Function;
            toggleSort: Function;
        };
        viewPermission: 2;
    };
    static "__#314@#onPass"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#314@#onReset"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#314@#onShuffle"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#314@#onToggleSort"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#314@#onControlCard"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /** @inheritDoc */
    _preparePartContext(partId: any, context: any, options: any): Promise<any>;
    /**
     * Prepare a sorted array of cards for display in the sheet.
     * @param {"standard"|"shuffled"} sortMode
     * @returns {Card[]}
     * @protected
     */
    protected _prepareCards(sortMode?: "standard" | "shuffled"): Card[];
    /**
     * Configure footer buttons for the window.
     * @returns {FormFooterButton[]}
     * @protected
     */
    protected _prepareButtons(): FormFooterButton[];
    /**
     * The "dragstart" event handler for individual cards
     * @param {DragEvent} event
     * @protected
     */
    protected _onDragStart(event: DragEvent): Promise<void>;
    /**
     * The "dragover" event handler for individual cards
     * @param {DragEvent} event
     * @protected
     */
    protected _onDragOver(event: DragEvent): Promise<void>;
    /**
     * The "dragdrop" event handler for individual cards
     * @param {DragEvent} event
     * @protected
     */
    protected _onDrop(event: DragEvent): Promise<any>;
    #private;
}
/**
 * A CardsConfig subclass providing a sheet representation for Cards documents with the "deck" type.
 */
export class CardDeckConfig extends CardsConfig {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        actions: {
            deal: Function;
        };
    };
    /** @override */
    static override PARTS: {
        header: {
            template: string;
        };
        tabs: {
            template: string;
        };
        details: {
            template: string;
        };
        cards: {
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
    static "__#315@#onDeal"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
}
/**
 * A CardsConfig subclass providing a sheet representation for Cards documents with the "hand" type.
 */
export class CardHandConfig extends CardsConfig {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        actions: {
            draw: Function;
        };
    };
    /** @override */
    static override PARTS: {
        cards: {
            template: string;
            root: boolean;
            scrollable: string[];
        };
        footer: {
            template: string;
        };
    };
    static "__#316@#onDraw"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
}
/**
 * A subclass of CardsConfig providing a sheet representation for Cards documents with the "pile" type.
 */
export class CardPileConfig extends CardsConfig {
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
        viewPermission: 2;
    };
    /** @override */
    static override PARTS: {
        cards: {
            template: string;
            root: boolean;
            scrollable: string[];
        };
        footer: {
            template: string;
        };
    };
}
import { DocumentSheetV2 } from "../api/_module.mjs";
import type { FormFooterButton } from "../_types.mjs";
