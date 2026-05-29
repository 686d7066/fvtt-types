/**
 * @import Folder from "../folder.mjs";
 * @import CompendiumCollection from "./compendium-collection.mjs";
 */
/**
 * A Collection of Folder documents within a Compendium pack.
 * @extends {DocumentCollection<Folder>}
 * @category Collections
 */
export default class CompendiumFolderCollection extends DocumentCollection<Folder> {
    constructor(pack: any, data?: any[]);
    /**
     * The CompendiumCollection instance that contains this CompendiumFolderCollection
     * @type {CompendiumCollection}
     */
    pack: CompendiumCollection<any>;
    /** @inheritDoc */
    get documentName(): string;
    /** @override */
    override render(force: any, options: any): void;
    /** @inheritDoc */
    updateAll(transformation: any, condition?: null, options?: {}): Promise<Folder[]>;
    /** @override */
    override _prepareImportDocument(document: any, options: any): any;
    /** @override */
    override _onModifyContents(action: any, documents: any, result: any, operation: any, user: any): void;
}
import type Folder from "../folder.mjs";
import DocumentCollection from "../abstract/document-collection.mjs";
import type CompendiumCollection from "./compendium-collection.mjs";
