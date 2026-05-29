/**
 * @import {ApplicationClickAction} from "../_types.mjs";
 * @import {DataSchema} from "../../../common/abstract/_types.mjs";
 * @import {EffectChangeData, EffectStartData} from "../../../common/documents/_types.mjs";
 */
/**
 * The Application responsible for configuring a single ActiveEffect document within a parent Actor or Item.
 * @extends DocumentSheetV2
 * @mixes HandlebarsApplication
 */
export default class ActiveEffectConfig extends DocumentSheetV2 {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        classes: string[];
        window: {
            contentClasses: string[];
            icon: string;
        };
        position: {
            width: number;
        };
        form: {
            closeOnSubmit: boolean;
        };
        actions: {
            addChange: Function;
            deleteChange: Function;
        };
    };
    /** @override */
    static override PARTS: {
        header: {
            template: string;
        };
        tabs: {
            template: string;
        };
        details: {
            template: string;
            scrollable: string[];
        };
        duration: {
            template: string;
        };
        changes: {
            template: string;
            templates: string[];
            scrollable: string[];
        };
        footer: {
            template: string;
        };
    };
    /** @override */
    static override TABS: {
        sheet: {
            tabs: {
                id: string;
                icon: string;
            }[];
            initial: string;
            labelPrefix: string;
        };
    };
    static "__#124@#onAddChange"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#124@#onDeleteChange"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /** @inheritDoc */
    _preparePartContext(partId: any, context: any): Promise<any>;
    /**
     * Prepare render context for a single change object.
     * @param {object} context                   Data for rendering the change row
     * @param {EffectChangeData} context.change  A copy of the change from the Effect's source array
     * @param {number} context.index             The change object's index in the array
     * @param {DataSchema} context.fields        The defined fields of the change data
     * @param {number} context.defaultPriority   The change type's default priority
     * @param {Record<string, string>} context.changeTypes All change types and their localized labels
     * @returns {Promise<string>}
     * @protected
     */
    protected _renderChange(context: {
        change: EffectChangeData;
        index: number;
        fields: DataSchema;
        defaultPriority: number;
        changeTypes: Record<string, string>;
    }): Promise<string>;
    /**
     * Prepare display context for {@link EffectStartData}.
     * @returns {object}
     * @protected
     */
    protected _prepareStartContext(): object;
    /** @inheritDoc */
    _processFormData(event: any, form: any, formData: any): object;
    /**
     * Process submission data for a single change object.
     * @param {EffectChangeData} change The submitted change object with the value deserialized
     * @param {number} index            The object's index in the submitted array
     * @protected
     */
    protected _processChangeSubmission(change: EffectChangeData, index: number): void;
}
import { DocumentSheetV2 } from "../api/_module.mjs";
import type { EffectChangeData } from "../../../common/documents/_types.mjs";
import type { DataSchema } from "../../../common/abstract/_types.mjs";
