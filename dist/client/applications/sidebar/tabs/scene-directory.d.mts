/**
 * @import Scene from "../../../documents/scene.mjs";
 */
/**
 * The World Scene directory listing.
 * @extends {DocumentDirectory<Scene>}
 */
export default class SceneDirectory extends DocumentDirectory<Scene> {
    /** @override */
    static override DEFAULT_OPTIONS: {
        renderUpdateKeys: string[];
        collection: string;
    };
    constructor(options: any);
}
import type Scene from "../../../documents/scene.mjs";
import DocumentDirectory from "../document-directory.mjs";
