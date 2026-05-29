/**
 * @import {ProseMirrorCommand} from "./_types.mjs";
 */
/**
 * A class responsible for building the keyboard commands for the ProseMirror editor.
 * @extends {ProseMirrorPlugin}
 */
export default class ProseMirrorKeyMaps extends ProseMirrorPlugin {
    /** @inheritdoc */
    static build(schema: any, options?: {}): any;
    /**
     * @param {Schema} schema                      The ProseMirror schema to build keymaps for.
     * @param {object} [options]                   Additional options to configure the plugin's behavior.
     * @param {Function} [options.onSave]          A function to call when Ctrl+S is pressed.
     * @param {boolean} [options.joinDoubleBreak]  If a double line-break is detected, join it into a paragraph instead.
     */
    constructor(schema: Schema, { onSave, joinDoubleBreak }?: {
        onSave?: Function | undefined;
        joinDoubleBreak?: boolean | undefined;
    } | undefined);
    /**
     * Build keyboard commands for nodes and marks present in the schema.
     * @returns {Record<string, ProseMirrorCommand>}  An object of keyboard shortcuts to editor functions.
     */
    buildMapping(): Record<string, ProseMirrorCommand>;
    #private;
}
import ProseMirrorPlugin from "./plugin.mjs";
import type { ProseMirrorCommand } from "./_types.mjs";
