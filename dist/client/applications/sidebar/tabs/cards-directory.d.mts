/**
 * @import Cards from "../../../documents/cards.mjs";
 */
/**
 * The World Cards directory listing.
 * @extends {DocumentDirectory<Cards>}
 */
export default class CardsDirectory extends DocumentDirectory<Cards> {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        collection: string;
    };
    constructor(options: any);
}
import type Cards from "../../../documents/cards.mjs";
import DocumentDirectory from "../document-directory.mjs";
