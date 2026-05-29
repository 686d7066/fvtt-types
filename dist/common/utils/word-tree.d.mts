/**
 * @import {StringTreeEntryFilter, StringTreeNode, WordTreeEntry} from "./_types.mjs";
 */
/**
 * A data structure for quickly retrieving objects by a string prefix.
 * Note that this works well for languages with alphabets (latin, cyrillic, korean, etc.), but may need more nuanced
 * handling for languages that compose characters and letters.
 * @extends {StringTree<WordTreeEntry>}
 */
export default class WordTree extends StringTree<WordTreeEntry> {
    constructor();
    /** @inheritDoc */
    addLeaf(strings: any, entry: any): StringTreeNode;
    /**
     * Return entries that match the given string prefix.
     * @param {string} prefix              The prefix.
     * @param {object} [options]           Additional options to configure behaviour.
     * @param {number} [options.limit=10]  The maximum number of items to retrieve. It is important to set this value as
     *                                     very short prefixes will naturally match large numbers of entries.
     * @param {StringTreeEntryFilter} [options.filterEntries]  A filter function to apply to each candidate entry.
     * @returns {WordTreeEntry[]}          A number of entries that have the given prefix.
     */
    lookup(prefix: string, { limit, filterEntries }?: {
        limit?: number | undefined;
        filterEntries?: StringTreeEntryFilter | undefined;
    } | undefined): WordTreeEntry[];
    /**
     * Returns the node at the given prefix.
     * @param {string} prefix  The prefix.
     * @returns {StringTreeNode}
     */
    nodeAtPrefix(prefix: string): StringTreeNode;
}
import type { WordTreeEntry } from "./_types.mjs";
import StringTree from "./string-tree.mjs";
import type { StringTreeNode } from "./_types.mjs";
import type { StringTreeEntryFilter } from "./_types.mjs";
