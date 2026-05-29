/**
 * The client-side AmbientLight document which extends the common BaseAmbientLight document model.
 * @extends BaseAmbientLight
 * @mixes ClientDocumentMixin
 * @category Documents
 *
 * @see {@link foundry.documents.Scene}: The Scene document type which contains AmbientLight documents
 * @see {@link foundry.applications.sheets.AmbientLightConfig}: The AmbientLight configuration
 *   application
 */
export default class AmbientLightDocument extends BaseAmbientLight {
    /**
     * Is this ambient light source global in nature?
     * @type {boolean}
     */
    get isGlobal(): boolean;
    /**
     * The circle or cone shape of this AmbientLight document.
     * @type {CircleShapeData|ConeShapeData}
     */
    shape: CircleShapeData | ConeShapeData;
    /** @inheritDoc */
    prepareDerivedData(): void;
    x: any;
    y: any;
}
import BaseAmbientLight from "../../common/documents/ambient-light.mjs";
import { CircleShapeData } from "../data/shapes.mjs";
import { ConeShapeData } from "../data/shapes.mjs";
