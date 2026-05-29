/**
 * The Application responsible for configuring a single token document within a parent Scene
 * @extends PlaceableConfig
 * @mixes TokenApplication
 */
export default class TokenConfig extends PlaceableConfig {
    /** @override */
    override isPrototype: boolean;
    /** @override */
    override get token(): any;
    /** @override */
    override get actor(): any;
    /** @override */
    override get _fields(): foundry.abstract.types.DataSchema;
    /** @inheritDoc */
    _prepareAppearanceTab(options: any): Promise<any>;
    /** @inheritDoc */
    _previewChanges(changes: any): void;
    /**
     * Handle changing the attribute bar in the drop-down selector to update the default current and max value
     * @param {Event} event  The select input change event
     * @protected
     */
    protected _onChangeBar(event: Event): void;
    /** @inheritDoc */
    _processSubmitData(event: any, form: any, submitData: any, options: any): Promise<void>;
    #private;
}
import PlaceableConfig from "../placeable-config.mjs";
