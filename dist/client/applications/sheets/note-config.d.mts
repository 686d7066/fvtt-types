/**
 * The Application responsible for configuring a single Note document within a parent Scene.
 */
export default class NoteConfig extends PlaceableConfig {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        classes: string[];
        canCreate: boolean;
        position: {
            width: number;
        };
        window: {
            contentClasses: string[];
            icon: string;
        };
        form: {
            closeOnSubmit: boolean;
        };
    };
    /** @override */
    static override PARTS: {
        body: {
            template: string;
        };
        footer: {
            template: string;
        };
    };
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
        author: any;
        entries: {
            value: string | null;
            label: any;
        }[];
        entry: foundry.documents.JournalEntry;
        pages: Record<string, string>;
        global: any;
        icon: {
            selected: string;
            custom: string;
            field: StringField;
        };
        fontFamilies: Record<string, string>;
        textAnchors: {};
        buttons: {
            type: string;
            icon: string;
            label: string;
        }[];
    }>;
    /** @inheritDoc */
    _processFormData(event: any, form: any, formData: any): object;
    /** @inheritDoc */
    _previewChanges(changes: any): void;
    #private;
}
import PlaceableConfig from "./placeable-config.mjs";
