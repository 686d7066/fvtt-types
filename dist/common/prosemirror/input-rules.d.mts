/**
 * A class responsible for building the input rules for the ProseMirror editor.
 * @extends {ProseMirrorPlugin}
 */
export default class ProseMirrorInputRules extends ProseMirrorPlugin {
    /**
     * Build the plugin.
     * @param {Schema} schema     The ProseMirror schema to build the plugin against.
     * @param {object} [options]  Additional options to pass to the plugin.
     * @param {number} [options.minHeadingLevel=0]  The minimum heading level to start from when generating heading input
     *                                              rules. The resulting heading level for a heading rule is equal to the
     *                                              number of leading hashes minus this number.
     * */
    static build(schema: Schema, { minHeadingLevel }?: {
        minHeadingLevel?: number | undefined;
    } | undefined): any;
    /**
     * Turns a double dash anywhere into an em-dash. Does not match at the start of the line to avoid conflict with the
     * HR rule.
     * @returns {InputRule}
     */
    static "__#268@#emDashRule"(): InputRule;
    /**
     * Build input rules for node types present in the schema.
     * @returns {InputRule[]}
     */
    buildRules(): InputRule[];
    #private;
}
import ProseMirrorPlugin from "./plugin.mjs";
