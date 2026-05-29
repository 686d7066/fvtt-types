/**
 * The Application responsible for configuring a single AmbientSound document within a parent Scene.
 */
export default class AmbientSoundConfig extends PlaceableConfig {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        classes: string[];
        window: {
            contentClasses: string[];
        };
        position: {
            width: number;
        };
        form: {
            closeOnSubmit: boolean;
        };
        canCreate: boolean;
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
        soundEffects: Record<string, {
            label: string;
            effectClass: typeof BiquadFilterNode | typeof ConvolverNode;
        }>;
        buttons: {
            type: string;
            icon: string;
            label: string;
        }[];
    }>;
    /**
     * Special logic to toggle the disabled state of form fields depending on the values of other fields.
     * @protected
     */
    protected _toggleDisabledFields(): void;
    /** @inheritDoc */
    _previewChanges(changes: any): void;
}
import PlaceableConfig from "./placeable-config.mjs";
