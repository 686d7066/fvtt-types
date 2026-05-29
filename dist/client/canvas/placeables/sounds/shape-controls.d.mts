/**
 * @import AmbientSoundDocument from "../../../documents/ambient-sound.mjs";
 * @import AmbientSound from "../ambient-sound.mjs";
 * @import SoundsLayer from "../../layers/sounds.mjs";
 * @import {CircleShapeData} from "../../../../common/data/_module.mjs";
 */
/**
 * Controls for a AmbientSound shape.
 * @extends {ShapeControls<AmbientSoundDocument, AmbientSound, SoundsLayer, CircleShapeData>}
 */
export default class AmbientSoundShapeControls extends ShapeControls<AmbientSoundDocument, AmbientSound, SoundsLayer, CircleShapeData> {
    constructor(shape: CircleShapeData);
    /** @inheritDoc */
    _onDragStart(event: any): void;
    /** @override */
    override _updateDragPreview(event: any): void;
    /** @override */
    override _prepareDragDropUpdate(event: any): {
        x: any;
        y: any;
        radius: any;
    };
}
import type AmbientSoundDocument from "../../../documents/ambient-sound.mjs";
import type SoundsLayer from "../../layers/sounds.mjs";
import type { CircleShapeData } from "../../../../common/data/_module.mjs";
import { ShapeControls } from "../../containers/elements/shape-controls.mjs";
