/**
 * The Application responsible for configuring a single AmbientLight document within a parent Scene.
 */
export default class AmbientLightConfig extends PlaceableConfig {
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
        actions: {
            reset: Function;
        };
    };
    /** @override */
    static override PARTS: {
        tabs: {
            template: string;
        };
        basic: {
            template: string;
        };
        animation: {
            template: string;
        };
        advanced: {
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
    /**
     * Process reset button click
     * @param {PointerEvent} event                  The originating button click
     * @this {AmbientLightConfig}
     * @returns {Promise<void>}
     */
    static "__#172@#onReset"(this: AmbientLightConfig, event: PointerEvent): Promise<void>;
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
        light: any;
        colorationTechniques: Record<string, import("../../canvas/rendering/shaders/lighting/base-lighting.mjs").ShaderTechnique>;
        isDarkness: any;
        lightAnimations: CONFIG.LightSourceAnimationConfig | CONFIG.DarknessSourceAnimationConfig;
        buttons: ({
            type: string;
            action: string;
            icon: string;
            label: string;
        } | {
            type: string;
            icon: string;
            label: string;
            action?: undefined;
        })[];
    }>;
    /** @inheritDoc */
    changeTab(...args: any[]): void;
    /** @inheritDoc */
    _previewChanges(changes: any): void;
    /**
     * @deprecated since v14
     * @ignore
     */
    get preview(): foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext> | null;
    #private;
}
import PlaceableConfig from "./placeable-config.mjs";
