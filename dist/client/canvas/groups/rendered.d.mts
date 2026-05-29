declare const RenderedCanvasGroup_base: {
    new (...args: any[]): {
        sortableChildren: boolean;
        layers: Record<string, foundry.canvas.layers.CanvasLayer>;
        readonly name: string;
        readonly hookName: string;
        _createLayers(): {};
        "__#206@#drawing": Promise<any>;
        "__#206@#drawn": boolean;
        draw(options?: object | undefined): Promise<any>;
        _draw(options: object): Promise<any>;
        tearDown(options?: foundry.types.CanvasTearDownOptions | undefined): Promise<any>;
        _tearDown(options: foundry.types.CanvasTearDownOptions): Promise<void>;
    };
    groupName: string | undefined;
    tearDownChildren: boolean;
};
/**
 * A container group which contains the environment canvas group and the interface canvas group.
 *
 * @category Canvas
 */
export default class RenderedCanvasGroup extends RenderedCanvasGroup_base {
    /** @override */
    static override groupName: string;
}
export {};
