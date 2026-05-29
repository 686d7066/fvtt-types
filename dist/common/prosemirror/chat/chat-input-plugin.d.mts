/**
 * A plugin for the chat message editor which handles interactivity.
 * @extends {ProseMirrorPlugin}
 */
export default class ChatInputPlugin extends ProseMirrorPlugin {
    /**
     * Build the plugin.
     * @param {Schema} schema           The ProseMirror schema to build the plugin against.
     * @param {object} [options]
     * @param {ChatLog} [options.chat]  The ChatLog instance this plugin belongs to.
     * @returns {Plugin}
     */
    static build(schema: Schema, { chat }?: {
        chat?: any;
    } | undefined): Plugin;
    /**
     * @param {Schema} schema  The ProseMirror schema to build the plugin against.
     * @param {ChatLog} chat   The ChatLog instance this plugin belongs to.
     */
    constructor(schema: Schema, chat: ChatLog);
    /**
     * The ChatLog instance this plugin belongs to.
     * @type {ChatLog}
     */
    get chat(): ChatLog;
    /**
     * Inspect transactions and update pending state if they involve insertions or deletions.
     * @param {Transaction[]} transactions  The transactions.
     * @param {EditorState} oldState        The editor state before.
     * @param {EditorState} newState        The editor state after.
     * @protected
     */
    protected _inspectTransactions(transactions: Transaction[], oldState: EditorState, newState: EditorState): void;
    /**
     * Handle keydown events.
     * @param {EditorView} view      The editor view.
     * @param {KeyboardEvent} event  The keyboard event.
     * @returns {boolean|void}
     * @protected
     */
    protected _onKeyDown(view: EditorView, event: KeyboardEvent): boolean | void;
    /**
     * Handle sending a chat message.
     * @param {EditorView} view  The editor view.
     */
    sendMessage(view: EditorView): Promise<void>;
    /**
     * Set the contents of the chat input to the given value.
     * @param {EditorView} view  The editor view.
     * @param {string} message   The message to set.
     * @param {object} meta      Any metadata to append to the transaction.
     */
    setMessage(view: EditorView, message: string, meta: object): void;
    #private;
}
import ProseMirrorPlugin from "../plugin.mjs";
