/**
 * The Application responsible for configuring a single Wall document within a parent Scene.
 */
export default class WallConfig extends PlaceableConfig {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        classes: string[];
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
        actions: {
            previewSound: Function;
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
    /** Wall sense types affected by proximity threshold attenuation */
    static "__#176@#PROXIMITY_SENSE_TYPES": (30 | 40)[];
    /**
     * Handle previewing a sound file for a Wall setting
     * @this {WallConfig}
     * @returns {Promise<void>}
     */
    static "__#176@#onPreviewSound"(this: WallConfig): Promise<void>;
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
        coordinates: string;
        thresholdFields: {
            name: string;
            label: any;
            choices: any;
            disabled: boolean;
        }[];
        animation: any;
        animationDirections: {
            value: number;
            label: string;
        }[];
        animationTypes: Record<string, CONFIG.WallDoorAnimationConfig>;
        animationFieldsetClass: string;
        gridUnits: any;
        doorSounds: Record<string, CONFIG.WallDoorSound>;
        buttons: {
            type: string;
            icon: string;
            label: string;
        }[];
    }>;
    /** @inheritDoc */
    _prepareSubmitData(event: any, form: any, formData: any, updateData: any): object;
    #private;
}
import PlaceableConfig from "./placeable-config.mjs";
