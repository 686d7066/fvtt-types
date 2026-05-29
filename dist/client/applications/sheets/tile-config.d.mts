/**
 * @import TileDocument from "../../documents/tile.mjs";
 */
/**
 * The Application responsible for configuring a single Tile document within a parent Scene.
 */
export default class TileConfig extends PlaceableConfig {
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
        appearance: {
            template: string;
        };
        overhead: {
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
        buttons: {
            type: string;
            icon: string;
            label: string;
        }[];
    }>;
    /** @inheritDoc */
    _preparePartContext(partId: any, context: any, options: any): Promise<any>;
    /** @inheritDoc */
    _previewChanges(changes: any): void;
}
import PlaceableConfig from "./placeable-config.mjs";
