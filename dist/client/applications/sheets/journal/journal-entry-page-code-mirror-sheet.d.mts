/**
 * An abstract class that provides code-mirror-specific methods for editing journal page content.
 * @extends JournalEntryPageTextSheet
 */
export default class JournalEntryPageCodeMirrorSheet extends JournalEntryPageTextSheet {
    /** @override */
    static override DEFAULT_OPTIONS: {
        window: {
            contentClasses: string[];
        };
    };
    /** @inheritDoc */
    static VIEW_PARTS: {
        content: {
            root: boolean;
            template: string;
        };
    };
    /** @inheritDoc */
    _prepareContentContext(context: any, options: any): Promise<void>;
    /** @inheritDoc */
    _preSyncPartState(partId: any, newElement: any, priorElement: any, state: any): void;
    /** @inheritDoc */
    _syncPartState(partId: any, newElement: any, priorElement: any, state: any): void;
    /** @inheritDoc */
    _attachFrameListeners(): void;
    /**
     * Handle dropping something onto the code-mirror editor.
     * @param {DragEvent} event  The triggering event.
     * @protected
     */
    protected _onDrop(event: DragEvent): Promise<void> | undefined;
    /**
     * Handle dropping a content link onto the code-mirror editor.
     * @param {DragEvent} event   The originating drop event.
     * @param {object} eventData  The parsed event data.
     * @protected
     * @returns {Promise<void>}
     */
    protected _onDropContentLink(event: DragEvent, eventData: object): Promise<void>;
    #private;
}
import JournalEntryPageTextSheet from "./journal-entry-page-text-sheet.mjs";
