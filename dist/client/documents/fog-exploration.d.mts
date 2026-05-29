/**
 * The client-side FogExploration document which extends the common BaseFogExploration model.
 * @extends BaseFogExploration
 * @mixes ClientDocumentMixin
 * @category Documents
 *
 * @see {@link foundry.documents.collections.FogExplorations}: The world-level collection of
 *   FogExploration documents
 */
export default class FogExploration extends BaseFogExploration {
    /**
     * Obtain the fog of war exploration progress for a specific Scene, Level, and User.
     * @param {object} [query]
     * @param {string|Scene} [query.scene]
     * @param {string|User} [query.user]
     * @param {object} [options={}]
     * @returns {Promise<FogExploration|null>}
     */
    static load({ scene, user }?: {
        scene?: string | Scene;
        user?: string | User;
    } | undefined, options?: object | undefined): Promise<FogExploration | null>;
    /**
     * Transform the explored base64 data into a PIXI.Texture object
     * @returns {PIXI.Texture|null}
     */
    getTexture(): PIXI.Texture | null;
    /** @inheritDoc */
    _onCreate(data: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onUpdate(changed: any, options: any, userId: any): void;
    /** @inheritDoc */
    _onDelete(options: any, userId: any): void;
}
import BaseFogExploration from "../../common/documents/fog-exploration.mjs";
