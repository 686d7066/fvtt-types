/**
 * An Application responsible for displaying a single text-type JournalEntryPage Document, and editing it with a
 * Markdown editor.
 * @extends JournalEntryPageCodeMirrorSheet
 */
export default class JournalEntryPageMarkdownSheet extends JournalEntryPageCodeMirrorSheet {
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
    /** @override */
    static override format: 2;
}
import JournalEntryPageCodeMirrorSheet from "./journal-entry-page-code-mirror-sheet.mjs";
