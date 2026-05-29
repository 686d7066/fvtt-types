/**
 * An Application that displays the indexed contents of a Compendium pack.
 * @template {ClientDocument} TDocument
 * @extends {DocumentDirectory<TDocument>}
 */
export default class Compendium<TDocument extends ClientDocument> extends DocumentDirectory<TDocument> {
    /** @override */
    static override DEFAULT_OPTIONS: {
        id: string;
        classes: string[];
        window: {
            frame: boolean;
            positioned: boolean;
        };
        position: {
            top: number;
            left: number;
            width: number;
            height: number;
        };
        actions: {
            copyId: Function;
        };
    };
    /** @override */
    static override PARTS: {
        header: {
            template: string;
        };
        directory: {
            template: string;
            templates: string[];
            scrollable: string[];
        };
        footer: {
            template: string;
        };
    };
    /**
     * Handle click events to copy the ID of this compendium to clipboard.
     * @param {PointerEvent} event
     * @this {Compendium}
     */
    static "__#329@#onCopyId"(this: Compendium<any>, event: PointerEvent): void;
    constructor(options: any);
    /** @override */
    override _canCreateEntry(): any;
    /** @override */
    override _canCreateFolder(): any;
    /** @inheritDoc */
    _configureRenderOptions(options: any): void;
    /** @override */
    override _getEntryContextOptions(): {
        label: string;
        icon: string;
        visible: () => any;
        onClick: (event: any, li: any) => Promise<any>;
    }[];
    /** @inheritDoc */
    _getFrameButtons(options: any): foundry.applications.types.ApplicationHeaderControlsEntry[];
    /** @inheritDoc */
    _prepareHeaderContext(context: any, options: any): Promise<void>;
    /** @inheritDoc */
    _onClickEntry(event: any, target: any, options?: {}): Promise<any>;
    /** @inheritDoc */
    _onCreateEntry(event: any, target: any): any;
    /** @override */
    override _canDragDrop(selector: any): any;
    /** @override */
    override _entryAlreadyExists(entry: any): any;
    /** @override */
    override _getEntryDragData(entryId: any): {
        type: string;
        uuid: any;
    };
}
import DocumentDirectory from "../document-directory.mjs";
