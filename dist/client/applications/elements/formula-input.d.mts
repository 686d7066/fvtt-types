/**
 * @import {FormInputConfig} from "../../../common/data/_types.mjs";
 */
/**
 * A form input element custom tailored to formula expressions.
 * @extends {AbstractFormInputElement}
 * @fires {Event} edit  Fired when the formula editor has been requested.
 *
 * @example Using the custom element in markup
 * ```html
 * <formula-input context="default">8 + @prof + @abilities.cha.mod</formula-input>
 * ```
 *
 * @example Creating the element programmatically
 * ```js
 * HTMLFormulaInputElement.create({ value: "8 + @prof + @abilities.cha.mod" });
 * ```
 */
export default class HTMLFormulaInputElement extends AbstractFormInputElement<any> {
    /**
     * @typedef FormulaInputConfig
     * @property {string} [context="default"]  The formula editor context.
     */
    /**
     * Create an HTMLFormulaInputElement using provided configuration data.
     * @param {FormInputConfig<string> & FormulaInputConfig} config  The configuration.
     * @returns {HTMLFormulaInputElement}
     */
    static create(config: FormInputConfig<string> & {
        /**
         * The formula editor context.
         */
        context?: string | undefined;
    }): HTMLFormulaInputElement;
    constructor();
    /**
     * A button to open the formula editor interface.
     * @type {HTMLButtonElement}
     */
    button: HTMLButtonElement;
    /**
     * The formula input.
     * @type {HTMLInputElement}
     */
    input: HTMLInputElement;
    /**
     * A reference to the formula editor application instance spawned by this element.
     * @type {FormulaEditor}
     */
    editor: FormulaEditor;
    set context(value: string);
    /**
     * An identifier to distinguish contexts a formula might be in, which may control which auto-complete suggestions are
     * available, or other behavior. Context configuration is available in CONFIG.formulaEditor.
     * @type {string}
     */
    get context(): string;
    /** @override */
    override _buildElements(): (HTMLInputElement | HTMLButtonElement)[];
    /** @override */
    override _toggleDisabled(disabled: any): void;
    #private;
}
import AbstractFormInputElement from "./form-element.mjs";
import FormulaEditor from "../apps/formula-editor.mjs";
import type { FormInputConfig } from "../../../common/data/_types.mjs";
