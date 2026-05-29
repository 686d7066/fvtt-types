/**
 * @import AmbientLightDocument from "../../../documents/ambient-light.mjs";
 * @import AmbientLight from "../ambient-light.mjs";
 * @import LightingLayer from "../../layers/lighting.mjs";
 * @import {CircleShapeData, ConeShapeData} from "../../../../common/data/_module.mjs";
 */
/**
 * Controls for a AmbientLight shape.
 * @extends {ShapeControls<AmbientLightDocument, AmbientLight, LightingLayer, CircleShapeData|ConeShapeData>}
 */
export default class AmbientLightShapeControls extends ShapeControls<AmbientLightDocument, AmbientLight, LightingLayer, CircleShapeData | ConeShapeData> {
    constructor(shape: CircleShapeData | ConeShapeData);
    /** @inheritDoc */
    _onDragStart(event: any): void;
    /** @override */
    override _updateDragPreview(event: any): void;
    /** @override */
    override _prepareDragDropUpdate(event: any): {
        x: any;
        y: any;
        rotation: any;
        config: {
            dim: any;
            bright: any;
            angle: any;
        };
    };
}
import type AmbientLightDocument from "../../../documents/ambient-light.mjs";
import type LightingLayer from "../../layers/lighting.mjs";
import type { CircleShapeData } from "../../../../common/data/_module.mjs";
import type { ConeShapeData } from "../../../../common/data/_module.mjs";
import { ShapeControls } from "../../containers/elements/shape-controls.mjs";
