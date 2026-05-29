/**
 * @import {ApplicationClickAction} from "../_types.mjs";
 */
/**
 * The Application responsible for configuring the CombatTracker and its contents.
 * @extends ApplicationV2
 * @mixes HandlebarsApplication
 */
export default class CombatTrackerConfig extends ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        id: string;
        tag: string;
        window: {
            contentClasses: string[];
            icon: string;
            title: string;
        };
        position: {
            width: number;
        };
        form: {
            closeOnSubmit: boolean;
            handler: Function;
        };
        actions: {
            previewTheme: Function;
        };
    };
    /** @override */
    static override PARTS: {
        body: {
            template: string;
            scrollable: string[];
        };
        footer: {
            template: string;
        };
    };
    static "__#282@#onPreviewTheme"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    static "__#282@#saveSettings"(event: PointerEvent, target: HTMLElement): void | Promise<void>;
    constructor(options?: Partial<foundry.applications.types.ApplicationConfiguration> | undefined);
    /** @override */
    override _prepareContext(): Promise<{
        rootId: string;
        attributeChoices: any;
        canConfigure: boolean;
        combatTheme: foundry.types.SettingConfig | undefined;
        fields: any;
        selectedTheme: any;
        settings: any;
        animationChoices: {
            value: string;
            label: string;
        }[];
        buttons: {
            type: string;
            icon: string;
            label: string;
        }[];
    }>;
    /**
     * @inheritDoc
     */
    _onChangeForm(formConfig: any, event: any): void;
    #private;
}
import { ApplicationV2 } from "../api/_module.mjs";
