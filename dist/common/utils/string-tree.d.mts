/**
 * @import {StringTreeEntryFilter, StringTreeNode, WordTreeEntry} from "./_types.mjs";
 */
/**
 * A data structure representing a tree of string nodes with arbitrary object leaves.
 * @template {object} [TEntry=object]
 */
export default class StringTree<TEntry extends object = object> {
    /**
     * The key symbol that stores the leaves of any given node.
     * @type {symbol}
     */
    static get leaves(): symbol;
    static "__#235@#leaves": symbol;
    /**
     * Insert an entry into the tree.
     * @param {Iterable<string>} strings The string parents for the entry.
     * @param {TEntry} entry             The entry to store.
     * @returns {StringTreeNode}         The node the entry was added to.
     */
    addLeaf(strings: Iterable<string>, entry: TEntry): StringTreeNode;
    /**
     * Traverse the tree along the given string path and return any entries reachable from the node.
     * @param {Iterable<string>} strings                              The string path to the desired node.
     * @param {object} [options]
     * @param {number} [options.limit]                                The maximum number of items to retrieve.
     * @param {StringTreeEntryFilter<TEntry>} [options.filterEntries] A filter function to apply to each candidate entry.
     * @returns {WordTreeEntry[]}
     */
    lookup(strings: Iterable<string>, { limit, filterEntries }?: {
        limit?: number | undefined;
        filterEntries?: StringTreeEntryFilter<TEntry>;
    } | undefined): WordTreeEntry[];
    /**
     * Returns the node at the given path through the tree.
     * @param {string[]} strings                    The string path to the desired node.
     * @param {object} [options]
     * @param {boolean} [options.hasLeaves=false]   Only return the most recently visited node that has leaves, otherwise
     *                                              return the exact node at the prefix, if it exists.
     * @returns {StringTreeNode|void}
     */
    nodeAtPrefix(strings: string[], { hasLeaves }?: {
        hasLeaves?: boolean | undefined;
    } | undefined): StringTreeNode | void;
    /**
     * Perform a breadth-first search starting from the given node and retrieving any entries reachable from that node,
     * until we reach the limit.
     * @param {StringTreeNode} node                            The starting node.
     * @param {any[]} entries                                  The accumulated entries.
     * @param {StringTreeNode[]} queue                         The working queue of nodes to search.
     * @param {object} [options]
     * @param {number} [options.limit]                         The maximum number of entries to retrieve before stopping.
     * @param {StringTreeEntryFilter} [options.filterEntries]  A filter function to apply to each candidate entry.
     * @protected
     */
    protected _breadthFirstSearch(node: StringTreeNode, entries: any[], queue: StringTreeNode[], { limit, filterEntries }?: {
        limit?: number | undefined;
        filterEntries?: StringTreeEntryFilter | undefined;
    } | undefined): void;
    #private;
}
import type { StringTreeNode } from "./_types.mjs";
import type { StringTreeEntryFilter } from "./_types.mjs";
import type { WordTreeEntry } from "./_types.mjs";
