/**
 * @import {AdventureImportData, AdventureImportOptions, AdventureImportResult} from "./_types.mjs";
 */
/**
 * The client-side Adventure document which extends the common {@link foundry.documents.BaseAdventure} model.
 *
 * ### Hook Events
 * - {@link hookEvents.preImportAdventure} (emitted by {@link Adventure#import})
 * - {@link hookEvents.importAdventure} (emitted by {@link Adventure#import})
 *
 * @extends BaseAdventure
 * @mixes ClientDocumentMixin
 * @category Documents
 */
export default class Adventure extends BaseAdventure {
    /**
     * Create a shallow Adventure document from a compendium index entry.
     * @param {string} id                   The adventure's document ID.
     * @param {CompendiumCollection} pack   The compendium pack containing the adventure.
     * @returns {Adventure}
     */
    static fromIndex(id: string, pack: CompendiumCollection): Adventure;
    /** @inheritDoc */
    static fromSource(source: any, options?: {}): foundry.abstract.DataModel<object, foundry.abstract.types.DataModelConstructionContext>;
    /**
     * Perform a full import workflow of this Adventure.
     * Create new and update existing documents within the World.
     * @param {AdventureImportOptions} [importOptions]  Options which configure and customize the import process
     * @returns {Promise<AdventureImportResult>}        The import result
     */
    import(importOptions?: AdventureImportOptions | undefined): Promise<AdventureImportResult>;
    /**
     * Prepare Adventure data for import into the World.
     * @param {AdventureImportOptions} [options]  Options which configure import behavior
     * @returns {Promise<AdventureImportData>}
     */
    prepareImport(options?: AdventureImportOptions | undefined): Promise<AdventureImportData>;
    /**
     * Execute an Adventure import workflow, creating and updating documents in the World.
     * @param {AdventureImportData} data          Prepared adventure data to import
     * @returns {Promise<AdventureImportResult>}  The import result
     */
    importContent({ toCreate, toUpdate, documentCount }?: AdventureImportData): Promise<AdventureImportResult>;
}
import BaseAdventure from "../../common/documents/adventure.mjs";
import type { AdventureImportOptions } from "./_types.mjs";
import type { AdventureImportResult } from "./_types.mjs";
import type { AdventureImportData } from "./_types.mjs";
