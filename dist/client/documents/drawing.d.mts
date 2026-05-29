/**
 * @import {DrawingData} from "../../common/documents/_types.mjs";
 */
/**
 * The client-side Drawing document which extends the common BaseDrawing model.
 *
 * @extends BaseDrawing
 * @mixes ClientDocumentMixin
 * @category Documents
 *
 * @see {@link foundry.documents.Scene}: The Scene document type which contains Drawing embedded documents
 * @see {@link foundry.applications.sheets.DrawingConfig}: The Drawing configuration application
 */
export default class DrawingDocument extends BaseDrawing {
    /**
     * Fields included in the drawing defaults setting
     * @type {(keyof DrawingData)[]}
     */
    static defaultDrawingFields: (keyof DrawingData)[];
    /**
     * Create the rectangle/ellipse/polygon shape.
     * @param {DrawingDocument} document
     * @returns {RectangleShapeData|EllipseShapeData|PolygonShapeData}
     */
    static "__#118@#createShape"(document: DrawingDocument): RectangleShapeData | EllipseShapeData | PolygonShapeData;
    /**
     * The rectangle shape of this Tile document.
     * @type {RectangleShapeData|EllipseShapeData|PolygonShapeData}
     * @internal
     */
    _shape: RectangleShapeData | EllipseShapeData | PolygonShapeData;
    /**
     * Is the current User the author of this drawing?
     * @type {boolean}
     */
    get isAuthor(): boolean;
    /** @inheritDoc */
    prepareDerivedData(): void;
    x: any;
    y: any;
}
import BaseDrawing from "../../common/documents/drawing.mjs";
import { RectangleShapeData } from "../data/shapes.mjs";
import { EllipseShapeData } from "../data/shapes.mjs";
import { PolygonShapeData } from "../data/shapes.mjs";
import type { DrawingData } from "../../common/documents/_types.mjs";
