/**
 * @import {Schema} from "prosemirror-model";
 * @import {Plugin} from "prosemirror-state";
 */
/**
 * @abstract
 */
export default class ProseMirrorPlugin {
    /**
     * Build the plugin.
     * @param {Schema} schema     The ProseMirror schema to build the plugin against.
     * @param {object} [options]  Additional options to pass to the plugin.
     * @returns {Plugin}
     * @abstract
     */
    static build(schema: PluginKey, options?: object | undefined): PluginKey;
    /**
     * A unique key for this plugin that can be used to identify a plugin instance in any given editor.
     * @returns {PluginKey}
     */
    static get key(): PluginKey;
    /**
     * An abstract class for building a ProseMirror Plugin.
     * @see {Plugin}
     * @param {Schema} schema  The schema to build the plugin against.
     */
    constructor(schema: PluginKey);
    /**
     * The ProseMirror schema to build the plugin against.
     * @type {Schema}
     */
    schema: PluginKey;
}
