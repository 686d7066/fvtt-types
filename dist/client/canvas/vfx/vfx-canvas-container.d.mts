/**
 * A special subclass of PrimaryCanvasContainer used for the animation of related display objects in VFXEffects.
 * TODO we might not need this in the end and we can just use PrimaryCanvasContainer directly. TBD.
 */
export default class VFXCanvasContainer extends PrimaryCanvasContainer {
    constructor();
    /**
     * A registry of named display objects which belong to this container
     * @type {Record<string, PIXI.DisplayObject>}
     */
    sprites: Record<string, PIXI.DisplayObject>;
    #private;
}
import PrimaryCanvasContainer from "../primary/primary-canvas-container.mjs";
