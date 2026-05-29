/**
 * @import {ApplicationConfiguration, FormFooterButton} from "../_types.mjs";
 * @import {DocumentSheetConfiguration} from "../api/document-sheet.mjs";
 * @import DrawingDocument from "../../documents/drawing.mjs";
 */
/**
 * The Application responsible for configuring a single Drawing document within a parent Scene.
 */
export default class DrawingConfig extends PlaceableConfig {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        classes: string[];
        canCreate: boolean;
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
    };
    /** @override */
    static override PARTS: {
        tabs: {
            template: string;
        };
        position: {
            template: string;
        };
        lines: {
            template: string;
        };
        fill: {
            template: string;
        };
        text: {
            template: string;
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
    /** @inheritDoc */
    _previewChanges(changes: any): void;
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
        document: foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext> | null;
        model: foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext> | null;
        source: object;
        gridUnits: any;
        selectableLevels: any;
        inputs: {
            createMultiSelectInput: (field: any, config: any) => AbstractMultiSelectElement;
        };
    } & {
        tabClasses: string;
        userColor: any;
        units: {
            degrees: string;
            pixels: string;
        };
    }>;
    /** @inheritDoc */
    _preparePartContext(partId: any, context: any, options: any): Promise<any>;
    /** @inheritDoc */
    _processFormData(event: any, form: any, formData: any): object;
    /** @inheritDoc */
    _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
    #private;
}
import PlaceableConfig from "./placeable-config.mjs";
