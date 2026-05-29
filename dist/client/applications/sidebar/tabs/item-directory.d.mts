/**
 * @import Item from "../../../documents/item.mjs";
 */
/**
 * The World Item directory listing.
 * @extends {DocumentDirectory<Item>}
 */
export default class ItemDirectory extends DocumentDirectory<Item> {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        collection: string;
    };
    constructor(options: any);
}
import type Item from "../../../documents/item.mjs";
import DocumentDirectory from "../document-directory.mjs";
