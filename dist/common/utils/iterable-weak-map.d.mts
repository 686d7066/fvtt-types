/**
 * @import {IterableWeakMapHeldValue, IterableWeakMapValue} from "./_types.mjs";
 */
/**
 * Stores a map of objects with weak references to the keys, allowing them to be garbage collected. Both keys and values
 * can be iterated over, unlike a WeakMap.
 * @template {WeakKey} K
 * @template V
 * @extends {WeakMap<K, V>}
 */
export default class IterableWeakMap<K extends WeakKey, V> extends WeakMap<K, V> {
    /**
     * Clean up the corresponding ref in the set when its value is garbage collected.
     * @param {IterableWeakMapHeldValue<K>} heldValue  The value held by the finalizer.
     */
    static "__#233@#cleanup"({ set, ref }: IterableWeakMapHeldValue<K>): void;
    /**
     * @param {Iterable<[K, V], undefined, unknown>} [entries] The initial entries.
     */
    constructor(entries?: Iterable<[K, V], undefined, unknown> | undefined);
    /**
     * Place a value in the map.
     * @param {K} key    The key.
     * @param {V} value  The value.
     * @returns {this}
     */
    set(key: K, value: V): this;
    /**
     * Clear all values from the map.
     */
    clear(): void;
    /**
     * Enumerate the entries.
     * @returns {Generator<[K, V], void, unknown>}
     */
    entries(): Generator<[K, V], void, unknown>;
    /**
     * Enumerate the keys.
     * @returns {Generator<K, void, unknown>}
     */
    keys(): Generator<K, void, unknown>;
    /**
     * Enumerate the values.
     * @returns {Generator<V, void, unknown>}
     */
    values(): Generator<V, void, unknown>;
    /**
     * Enumerate the entries.
     * @returns {Generator<[K, V], void, unknown>}
     */
    [Symbol.iterator](): Generator<[K, V], void, unknown>;
    #private;
}
import type { IterableWeakMapHeldValue } from "./_types.mjs";
