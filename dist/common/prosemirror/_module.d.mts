export namespace dom {
    export let parser: any;
    export let serializer: any;
    export { parseHTMLString as parseString };
    export { serializeHTMLString as serializeString };
}
export * as types from "./_types.mjs";
export namespace nodeViews {
    let details: typeof DisclosureWidget.view;
}
export namespace plugins {
    export { ProseMirrorPlugin };
    export { ProseMirrorContentLinkPlugin };
    export { ProseMirrorHighlightMatchesPlugin };
    export { ProseMirrorDirtyPlugin };
    export { ProseMirrorImagePlugin };
    export { ProseMirrorClickHandler };
    export { ProseMirrorPasteTransformer };
    export { ProseMirrorInputRules };
    export { ProseMirrorKeyMaps };
    export { ProseMirrorMenu };
    export { ProseMirrorDropDown };
    export { chat };
    export { dropCursor };
    export { gapCursor };
    export { history };
    export { keymap };
}
import { parseHTMLString } from "./util.mjs";
import { serializeHTMLString } from "./util.mjs";
import DisclosureWidget from "./schema/disclosure.mjs";
import ProseMirrorPlugin from "./plugin.mjs";
import ProseMirrorContentLinkPlugin from "./content-link-plugin.mjs";
import ProseMirrorHighlightMatchesPlugin from "./highlight-matches-plugin.mjs";
import ProseMirrorDirtyPlugin from "./dirty-plugin.mjs";
import ProseMirrorImagePlugin from "./image-plugin.mjs";
import ProseMirrorClickHandler from "./click-handler.mjs";
import ProseMirrorPasteTransformer from "./paste-transformer.mjs";
import ProseMirrorInputRules from "./input-rules.mjs";
import ProseMirrorKeyMaps from "./keymaps.mjs";
import ProseMirrorMenu from "./menu.mjs";
import ProseMirrorDropDown from "./dropdown.mjs";
import * as chat from "./chat/_module.mjs";
import DOMParser from "./dom-parser.mjs";
import { schema as defaultSchema } from "./schema.mjs";
export { AllSelection, TextSelection, DOMParser, DOMSerializer, EditorState, EditorView, Schema, Step, Plugin, PluginKey, ProseMirrorPlugin, ProseMirrorContentLinkPlugin, ProseMirrorHighlightMatchesPlugin, ProseMirrorDirtyPlugin, ProseMirrorImagePlugin, ProseMirrorClickHandler, ProseMirrorPasteTransformer, ProseMirrorInputRules, ProseMirrorKeyMaps, ProseMirrorMenu, ProseMirrorDropDown, defaultSchema, keymap };
