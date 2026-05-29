/**
 * @import RollTable from "../../../documents/roll-table.mjs";
 */
/**
 * The World RollTable directory listing.
 * @extends {DocumentDirectory<RollTable>}
 */
export default class RollTableDirectory extends DocumentDirectory<RollTable> {
    /** @override */
    static override DEFAULT_OPTIONS: {
        collection: string;
    };
    constructor(options: any);
}
import type RollTable from "../../../documents/roll-table.mjs";
import DocumentDirectory from "../document-directory.mjs";
