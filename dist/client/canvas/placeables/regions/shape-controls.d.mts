/**
 * @import Region from "../region.mjs";
 * @import RegionDocument from "../../../documents/region.mjs";
 * @import RegionLayer from "../../layers/regions.mjs";
 */
/**
 * Controls for a Region shape.
 * @extends {ShapeControls<RegionDocument, Region, RegionLayer>}
 */
export default class RegionShapeControls extends ShapeControls<RegionDocument, Region, RegionLayer, foundry.data.BaseShapeData> {
    constructor(shape: foundry.data.BaseShapeData);
    /** @inheritDoc */
    _updateDragPreview(event: any): void;
    /** @override */
    override _onClick2(event: any): void;
}
import type RegionDocument from "../../../documents/region.mjs";
import type Region from "../region.mjs";
import type RegionLayer from "../../layers/regions.mjs";
import { ShapeControls } from "../../containers/elements/shape-controls.mjs";
