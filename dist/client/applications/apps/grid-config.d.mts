/**
 * @import {ApplicationClickAction, ApplicationConfiguration} from "../_types.mjs";
 * @import {DocumentSheetConfiguration} from "../api/document-sheet.mjs";
 * @import {GridMesh} from "../../canvas/containers/_module.mjs";
 */
/**
 * A tool for fine-tuning the grid in a Scene
 * @extends DocumentSheetV2
 * @mixes HandlebarsApplication
 */
export default class GridConfig extends DocumentSheetV2 {
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
            resetChanges: Function;
        };
        sheetConfig: boolean;
        ownershipConfig: boolean;
    };
    /** @override */
    static override PARTS: {
        form: {
            template: string;
            root: boolean;
        };
        footer: {
            template: string;
        };
    };
    static "__#286@#onResetChanges"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    /**
     * @param {ApplicationConfiguration & DocumentSheetConfiguration} options
     */
    constructor(options: ApplicationConfiguration & DocumentSheetConfiguration);
    /**
     * Track the Scene Configuration sheet reference.
     * @type {SceneConfig}
     */
    sheet: SceneConfig;
    /** @inheritDoc */
    _prepareContext(options: any): Promise<foundry.applications.types.ApplicationRenderContext & {
        document: ClientDocument;
        model: ClientDocument;
        source: any;
        fields: any;
        editable: boolean;
        user: foundry.documents.User | null;
        rootId: string;
    } & {
        scene: any;
        src: string;
        gridTypes: Record<GRID_TYPES, string>;
        scale: number;
        pixelsLabel: string;
        buttons: ({
            type: string;
            icon: string;
            label: string;
            action: string;
        } | {
            type: string;
            icon: string;
            label: string;
            action?: undefined;
        })[];
    }>;
    /** @inheritDoc */
    _onChangeForm(formConfig: any, event: any): Promise<void>;
    /** @inheritDoc */
    _processFormData(event: any, form: any, formData: any): object;
    /** @inheritDoc */
    _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
    #private;
}
import { DocumentSheetV2 } from "../api/_module.mjs";
import SceneConfig from "../sheets/scene-config.mjs";
import type { ApplicationConfiguration } from "../_types.mjs";
import type { DocumentSheetConfiguration } from "../api/document-sheet.mjs";
