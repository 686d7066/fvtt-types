/**
 * The client-side AmbientSound document which extends the common BaseAmbientSound document model.
 * @extends BaseAmbientSound
 * @mixes ClientDocumentMixin
 * @category Documents
 *
 * @see {@link foundry.documents.Scene}: The Scene document type which contains AmbientSound documents
 * @see {@link foundry.applications.sheets.AmbientSoundConfig}: The AmbientSound configuration
 *   application
 */
export default class AmbientSoundDocument extends BaseAmbientSound {
    /**
     * The circle shape of this AmbientSound document.
     * @type {CircleShapeData}
     */
    shape: CircleShapeData;
    /** @inheritDoc */
    prepareDerivedData(): void;
    x: any;
    y: any;
}
import BaseAmbientSound from "../../common/documents/ambient-sound.mjs";
import { CircleShapeData } from "../data/shapes.mjs";
