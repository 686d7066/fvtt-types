/**
 * An Application responsible for displaying a single text-type JournalEntryPage Document, and editing it with an HTML
 * editor.
 * @extends JournalEntryPageCodeMirrorSheet
 */
export default class JournalEntryPageHTMLSheet extends JournalEntryPageCodeMirrorSheet {
    /** @override */
    static override DEFAULT_OPTIONS: {
        window: {
            icon: string;
        };
    };
    /** @inheritDoc */
    static EDIT_PARTS: {
        header: import("../../api/handlebars-application.mjs").HandlebarsTemplatePart;
        content: {
            classes: string[];
            template: string;
        };
        footer: import("../../api/handlebars-application.mjs").HandlebarsTemplatePart;
    };
    /**
     * Auto-format an HTML string.
     * @param {string} html                       The HTML string.
     * @param {object} [options]
     * @param {string|number} [options.spaces=4]  The number of spaces to indent by, or a string to use as indentation.
     * @returns {string}
     */
    static formatHTML(html: string, { spaces }?: {
        spaces?: string | number | undefined;
    } | undefined): string;
}
import JournalEntryPageCodeMirrorSheet from "./journal-entry-page-code-mirror-sheet.mjs";
