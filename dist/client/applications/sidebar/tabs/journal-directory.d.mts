/**
 * @import JournalEntry from "../../../documents/journal-entry.mjs";
 */
/**
 * The World Journal.
 * @extends {DocumentDirectory<JournalEntry>}
 */
export default class JournalDirectory extends DocumentDirectory<JournalEntry> {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        collection: string;
    };
    constructor(options: any);
}
import type JournalEntry from "../../../documents/journal-entry.mjs";
import DocumentDirectory from "../document-directory.mjs";
