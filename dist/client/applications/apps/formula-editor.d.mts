/**
 * @import {ApplicationConfiguration} from "../_types.mjs";
 */
/**
 * @typedef FormulaEditorConfiguration
 * @property {string} context  The formula editing context.
 * @property {string} formula  The formula being edited.
 */
/**
 * An application that provides improved formula editing capabilities.
 * @extends {ApplicationV2<ApplicationConfiguration & FormulaEditorConfiguration>}
 */
export default class FormulaEditor extends ApplicationV2<ApplicationConfiguration & FormulaEditorConfiguration, foundry.applications.types.ApplicationRenderOptions> {
    /** @override */
    static override DEFAULT_OPTIONS: {
        id: string;
        tag: string;
        classes: string[];
        window: {
            icon: string;
            contentClasses: string[];
            resizable: boolean;
            minimizable: boolean;
        };
        position: {
            width: number;
            height: number;
        };
        context: string;
        formula: string;
    };
    /**
     * The regular expression to match formula data identifiers.
     * @type {RegExp}
     */
    static IDENTIFIER: RegExp;
    /**
     * The ProseMirror schema.
     * @type {Schema}
     */
    static get schema(): Schema;
    /**
     * Convert a ProseMirror document back into a formula string.
     * @param {EditorState} state  The ProseMirror document state.
     * @returns {string}
     */
    static toFormula(state: EditorState): string;
    constructor(options: any);
    /**
     * Get the configured context for this formula editor.
     * @type {FormulaEditorContext}
     */
    get context(): FormulaEditorContext;
    /**
     * The current formula value.
     * @type {string}
     */
    get formula(): string;
    /**
     * Get the labels mapping for this context.
     * @type {Record<string, string>}
     */
    get labels(): Record<string, string>;
    /** @override */
    override _canRender(options: any): false | undefined;
    /** @override */
    override _onFirstRender(context: any, options: any): Promise<void>;
    /** @override */
    override _replaceHTML(result: any, content: any, options: any): void;
    /** @inheritDoc */
    _renderFrame(options: any): Promise<HTMLElement>;
    /** @override */
    override _renderHTML(context: any, options: any): Promise<HTMLDivElement>;
    /**
     * Parse the given ProseMirror document state and replace data terms with human-readable labels.
     * @param {Transaction} tr  The state transaction.
     * @param {Schema} schema   The ProseMirror document schema.
     * @returns {Transaction}
     * @protected
     */
    protected _replaceTerms(tr: Transaction, schema: Schema): Transaction;
    #private;
}
export type FormulaEditorConfiguration = {
    /**
     * The formula editing context.
     */
    context: string;
    /**
     * The formula being edited.
     */
    formula: string;
};
import type { ApplicationConfiguration } from "../_types.mjs";
import ApplicationV2 from "../api/application.mjs";
