/**
 * The client-side Level document which extends the common BaseTile document model.
 * @extends BaseLevel
 * @mixes ClientDocumentMixin
 * @category Documents
 *
 * @see {@link foundry.documents.Scene}: The Scene document type which contains Level documents
 */
export default class Level extends BaseLevel {
    /** @inheritDoc */
    static _onCreateOperation(documents: any, operation: any, user: any): Promise<void>;
    /** @inheritDoc */
    static _onDeleteOperation(documents: any, operation: any, user: any): Promise<void>;
    /**
     * The integer index of the Level, assigned during Scene data preparation.
     * @type {number}
     */
    index: number;
    /**
     * Is this level currently viewed?
     * @type {boolean}
     */
    get isView(): boolean;
    /**
     * Is this level currently visible?
     * @type {boolean}
     */
    get isVisible(): boolean;
    /**
     * The edges of this Level.
     * @type {CanvasEdges}
     */
    get edges(): CanvasEdges;
    /** @inheritDoc */
    prepareBaseData(): void;
    /** @inheritDoc */
    _preCreate(data: any, options: any, user: any): Promise<boolean | void>;
    /**
     * Clamp the given elevation (of a token with a depth) to the elevation range of this Level.
     *
     * The elevation is clamped such that the head of the token is in the range if possible, but
     * the feet are never outside of the range.
     * @param {number} elevation    The elevation (of the token)
     * @param {number} [depth=0]    The depth of the token
     * @returns {number}            The clamped elevation
     */
    clampElevation(elevation: number, depth?: number | undefined): number;
    #private;
}
import BaseLevel from "../../common/documents/level.mjs";
import CanvasEdges from "../canvas/geometry/edges/edges.mjs";
