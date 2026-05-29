/**
 * @import JournalEntryCategory from "../../../documents/journal-entry-category.mjs"
 */
/**
 * An Application responsible for managing a journal entry's categories.
 * @extends DocumentSheetV2
 * @mixes HandlebarsApplication
 */
export default class JournalEntryCategoryConfig extends DocumentSheetV2 {
    /** @override */
    static override DEFAULT_OPTIONS: {
        id: string;
        classes: string[];
        window: {
            icon: string;
            contentClasses: string[];
        };
        position: {
            width: number;
        };
        actions: {
            addCategory: Function;
            removeCategory: Function;
            sortDown: Function;
            sortUp: Function;
        };
        form: {
            submitOnChange: boolean;
        };
    };
    /** @override */
    static override PARTS: {
        form: {
            template: string;
        };
    };
    /**
     * Add a new category to the journal entry.
     * @this {JournalEntryCategoryConfig}
     * @returns {Promise<JournalEntryCategory>}
     */
    static "__#303@#onAddCategory"(this: JournalEntryCategoryConfig): Promise<JournalEntryCategory>;
    /**
     * Remove a category from the journal entry.
     * @this {JournalEntryCategoryConfig}
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target element.
     * @returns {Promise<JournalEntryCategory>}
     */
    static "__#303@#onRemoveCategory"(this: JournalEntryCategoryConfig, event: PointerEvent, target: HTMLElement): Promise<JournalEntryCategory>;
    /**
     * Sort categories between each other.
     * @this {JournalEntryCategoryConfig}
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target element.
     * @returns {Promise<JournalEntry>}
     */
    static "__#303@#onSort"(this: JournalEntryCategoryConfig, event: PointerEvent, target: HTMLElement): Promise<JournalEntry>;
    /** @override */
    override _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
    #private;
}
import DocumentSheetV2 from "../../api/document-sheet.mjs";
import type JournalEntryCategory from "../../../documents/journal-entry-category.mjs";
import JournalEntry from "../../../documents/journal-entry.mjs";
