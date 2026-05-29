/**
 * @import TileDocument from "../../../documents/tile.mjs";
 * @import Tile from "../tile.mjs";
 * @import TilesLayer from "../../layers/tiles.mjs";
 * @import {RectangleShapeData} from "../../../../common/data/_module.mjs";
 */
/**
 * Controls for a Tile shape.
 * @extends {ShapeControls<TileDocument, Tile, TilesLayer, RectangleShapeData>}
 */
export default class TileShapeControls extends ShapeControls<TileDocument, Tile, TilesLayer, RectangleShapeData> {
    constructor(shape: RectangleShapeData);
    /** @override */
    override _updateDragPreview(event: any): void;
    /** @override */
    override _prepareDragDropUpdate(event: any): {
        x: any;
        y: any;
        width: any;
        height: any;
        rotation: any;
    };
    /** @override */
    override _onClick2(event: any): void;
}
import type TileDocument from "../../../documents/tile.mjs";
import type Tile from "../tile.mjs";
import type TilesLayer from "../../layers/tiles.mjs";
import type { RectangleShapeData } from "../../../../common/data/_module.mjs";
import { ShapeControls } from "../../containers/elements/shape-controls.mjs";
