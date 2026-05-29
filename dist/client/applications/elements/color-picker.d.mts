/**
 * @import {FormInputConfig} from "../../../common/data/_types.mjs";
 */
/**
 * @typedef HTMLColorPickerOptions
 * @property {string} value  A hexadecimal string representation of the color.
 */
/**
 * A custom HTMLElement used to select a color using a linked pair of input fields.
 * @extends {AbstractFormInputElement<string>}
 */
export default class HTMLColorPickerElement extends AbstractFormInputElement<string> {
    /**
     * Create a HTMLColorPickerElement using provided configuration data.
     * @param {FormInputConfig} config
     * @returns {HTMLColorPickerElement}
     */
    static create(config: FormInputConfig): HTMLColorPickerElement;
    /**
     * @param {HTMLColorPickerOptions} [options]
     */
    constructor({ value }?: HTMLColorPickerOptions | undefined);
    /** @override */
    override _buildElements(): HTMLInputElement[];
    /** @override */
    override _toggleDisabled(disabled: any): void;
    #private;
}
export type HTMLColorPickerOptions = {
    /**
     * A hexadecimal string representation of the color.
     */
    value: string;
};
import AbstractFormInputElement from "./form-element.mjs";
import type { FormInputConfig } from "../../../common/data/_types.mjs";
