/**
 * @import {WallCategory} from "./_types.mjs";
 * @import {EdgeRestrictionType, EdgeSenseType} from "../../common/constants.mjs";
 * @import {EdgeSenseType} from "../../common/constants.mjs";
 */
/**
 * The client-side Wall document which extends the common BaseWall document model.
 * @extends BaseWall
 * @mixes ClientDocumentMixin
 * @category Documents
 *
 * @see {@link foundry.documents.Scene}: The Scene document type which contains Wall documents
 * @see {@link foundry.applications.sheets.WallConfig}: The Wall configuration application
 */
export default class WallDocument extends BaseWall {
    /**
     * The Edge instance which represents this Wall.
     * The Edge is re-created when data for the Wall changes.
     * @type {Edge|null}
     */
    get edge(): Edge | null;
    /**
     * The darkness edge sense type, which is the same value as {@link WallDocument#light}.
     * @type {EdgeSenseType}
     */
    get darkness(): EdgeSenseType;
    /**
     * Whether this Document represents a door.
     * @type {boolean}
     */
    get isDoor(): boolean;
    /**
     * Whether this Document represents an open door.
     * @type {boolean}
     */
    get isOpen(): boolean;
    /** @override */
    override prepareBaseData(): void;
    /**
     * Broadly classify a wall into one of several categories, based on its properties.
     * @returns {WallCategory}
     */
    getWallCategory(): WallCategory;
    /**
     * Initialize the edge which represents this Wall document.
     * @param {object} [options]                                 Options which modify how the edge is initialized
     * @param {boolean} [options.deleted]                        Delete the edge of this Wall document?
     * @param {string[]|Set<string>} [options.priorLevels]       The IDs of prior Levels, if the levels this Wall
     *                                                           document is included in has changed
     * @param {Set<EdgeRestrictionType>} [options.changedTypes]  The restriction types that either now affected or
     *                                                           no longer affected by this Wall document
     */
    initializeEdge({ deleted, priorLevels, changedTypes }?: {
        deleted?: boolean | undefined;
        priorLevels?: string[] | Set<string> | undefined;
        changedTypes?: Set<"darkness" | "light" | "sight" | "sound" | "move"> | undefined;
    } | undefined): void;
    /** @inheritDoc */
    _onCreate(data: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onDelete(options: any, userId: any): void;
    #private;
}
import BaseWall from "../../common/documents/wall.mjs";
import Edge from "../canvas/geometry/edges/edge.mjs";
import type { EdgeSenseType } from "../../common/constants.mjs";
import type { WallCategory } from "./_types.mjs";
