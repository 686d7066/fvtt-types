/**
 * Stores a set of objects with weak references to them, allowing them to be garbage collected. Can be iterated over,
 * unlike a WeakSet.
 * @template {WeakKey} [T=WeakKey]
 * @implements {WeakSet<T>}
 */
export default class IterableWeakSet<T extends WeakKey = WeakKey> implements WeakSet<T> {
    /**
     * @param {Iterable<T, void, unknown>} [entries]  The initial entries.
     */
    constructor(entries?: Iterable<T, void, unknown> | undefined);
    /**
     * Add a value to the set.
     * @param {T} value  The value to add.
     * @returns {this}
     */
    add(value: T): this;
    /**
     * Delete a value from the set.
     * @param {T} value  The value to delete.
     * @returns {boolean}
     */
    delete(value: T): boolean;
    /**
     * Whether this set contains the given value.
     * @param {T} value  The value to test.
     * @returns {boolean}
     */
    has(value: T): boolean;
    /**
     * Enumerate the collection.
     * @returns {Generator<T, void, unknown>}
     */
    values(): Generator<T, void, unknown>;
    /**
     * Clear all values from the set.
     */
    clear(): void;
    /**
     * Enumerate the values.
     * @returns {Generator<T, void, unknown>}
     */
    [Symbol.iterator](): Generator<T, void, unknown>;
    #private;
}
