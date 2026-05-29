/**
 * A ProseMirror menu implementation specialized for the chat editor.
 * @extends {ProseMirrorMenu}
 */
export default class ChatMenuPlugin extends ProseMirrorMenu {
    /** @override */
    static override key: any;
    /** @inheritDoc */
    render(): this;
    /**
     * Spawn a dialog for editing the message's source HTML.
     * @protected
     */
    protected _editSource(): void;
    #private;
}
import ProseMirrorMenu from "../menu.mjs";
