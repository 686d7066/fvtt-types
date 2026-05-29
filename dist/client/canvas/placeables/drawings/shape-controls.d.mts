/**
 * @import DrawingDocument from "../../../documents/drawing.mjs";
 * @import Drawing from "../drawing.mjs";
 * @import DrawingsLayer from "../../layers/drawings.mjs";
 * @import {RectangleShapeData, EllipseShapeData, PolygonShapeData} from "../../../../common/data/_module.mjs";
 */
/**
 * Controls for a Drawing shape.
 * @extends {ShapeControls<DrawingDocument, Drawing, DrawingsLayer,
 *   RectangleShapeData|EllipseShapeData|PolygonShapeData>}
 */
export default class DrawingShapeControls extends ShapeControls<DrawingDocument, Drawing, DrawingsLayer, RectangleShapeData | EllipseShapeData | PolygonShapeData> {
    constructor(shape: RectangleShapeData | EllipseShapeData | PolygonShapeData);
    /** @override */
    override _drawShape(graphics: any): void;
    /** @inheritDoc */
    _onDragMove(event: any): void;
    /** @override */
    override _updateDragPreview(event: any): void;
    /** @override */
    override _prepareDragDropUpdate(event: any): {
        x: any;
        y: any;
        shape: {
            width: any;
            height: any;
            points: any;
        };
        rotation: any;
    };
    /** @override */
    override _onClick2(event: any): void;
}
import type DrawingDocument from "../../../documents/drawing.mjs";
import type Drawing from "../drawing.mjs";
import type DrawingsLayer from "../../layers/drawings.mjs";
import type { RectangleShapeData } from "../../../../common/data/_module.mjs";
import type { EllipseShapeData } from "../../../../common/data/_module.mjs";
import type { PolygonShapeData } from "../../../../common/data/_module.mjs";
import { ShapeControls } from "../../containers/elements/shape-controls.mjs";
