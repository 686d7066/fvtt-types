/**
 * @deprecated since v14
 * @ignore
 */
export default class TemplateLayer extends PlaceablesLayer {
    /** @inheritdoc */
    static get layerOptions(): object;
    /**
     * Register game settings used by the TemplatesLayer
     */
    static registerSettings(): void;
    /** @override */
    static override prepareSceneControls(): {
        name: string;
        order: number;
        title: string;
        icon: string;
        visible: boolean;
        tools: {};
    };
    /** @override */
    override get placeables(): any[];
    /** @inheritDoc */
    _getCopyableObjects(options: any): foundry.canvas.placeables.PlaceableObject[];
    /** @override */
    override activate(): this;
    /** @override */
    override _createDragPreviewData(event: any): {
        user: string | null;
        t: string | null;
        x: any;
        y: any;
        sort: number;
        distance: number;
        direction: number;
        fillColor: any;
        hidden: any;
    };
    /** @inheritdoc */
    _onDragLeftMove(event: any): void;
    /** @inheritdoc */
    _onMouseWheel(event: any): Promise<foundry.canvas.placeables.PlaceableObject> | undefined;
}
import PlaceablesLayer from "./base/placeables-layer.mjs";
