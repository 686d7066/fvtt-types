/**
 * The Scene Navigation UI element.
 * @extends ApplicationV2
 * @mixes HandlebarsApplication
 */
export default class SceneNavigation extends ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> {
    /** @inheritDoc */
    static DEFAULT_OPTIONS: {
        id: string;
        classes: string[];
        tag: string;
        window: {
            frame: boolean;
            positioned: boolean;
        };
        actions: {
            cycleLevel: Function;
            viewLevel: Function;
            viewScene: Function;
            toggleExpand: Function;
        };
    };
    /** @override */
    static override PARTS: {
        scenes: {
            root: boolean;
            template: string;
            scrollable: string[];
        };
    };
    /**
     * Handle cycling through available levels.
     * @this {SceneNavigation}
     * @param {PointerEvent} event        The triggering event.
     * @param {HTMLButtonElement} target  The action target.
     */
    static "__#360@#onCycleLevel"(this: SceneNavigation, event: PointerEvent, target: HTMLButtonElement): Promise<void> | undefined;
    /**
     * Handle switching to a specific level.
     * @this {SceneNavigation}
     * @param {PointerEvent} event  The triggering event.
     * @param {HTMLElement} target  The action target.
     */
    static "__#360@#onViewLevel"(this: SceneNavigation, event: PointerEvent, target: HTMLElement): Promise<foundry.documents.Scene>;
    /**
     * Handle a click event to view a certain Scene.
     * @this {SceneNavigation}
     * @param {PointerEvent} event
     * @returns {Promise<void>}
     */
    static "__#360@#onViewScene"(this: SceneNavigation, event: PointerEvent): Promise<void>;
    /**
     * Handle a click event to view a certain Scene.
     * @this {SceneNavigation}
     */
    static "__#360@#onToggleExpand"(this: SceneNavigation): void;
    /**
     * @deprecated since v13
     * @ignore
     */
    static displayProgressBar({ label, pct }?: {}): void;
    static "__#360@#loadingBar": any;
    constructor(options?: Partial<foundry.applications.types.ApplicationConfiguration> | undefined);
    /**
     * Whether the scene navigation is currently expanded.
     * @type {boolean}
     */
    get expanded(): boolean;
    /** @override */
    override _prepareContext(_options: any): Promise<{
        scenes: {
            inactive: object[];
            active: object[];
        };
        canExpand: number;
    }>;
    /** @override */
    override _onFirstRender(_context: any, _options: any): Promise<void>;
    /** @override */
    override _onRender(_context: any, options: any): Promise<void>;
    /**
     * Get the set of ContextMenu options which should be applied for Scenes in the menu.
     * @returns {ContextMenuEntry[]}   The Array of context options passed to the ContextMenu instance
     * @protected
     */
    protected _getContextMenuOptions(): ContextMenuEntry[];
    /**
     * Expand Scene Navigation, displaying inactive Scenes.
     * @fires {hookEvents:collapseSceneNavigation}
     */
    expand(): void;
    /**
     * Collapse Scene Navigation, hiding inactive Scenes.
     * @fires {hookEvents:collapseSceneNavigation}
     */
    collapse(): Promise<void>;
    /**
     * Toggle the expanded state of scene navigation.
     * @param {boolean} [expanded]  Force the expanded state to the provided value, otherwise toggle the state.
     * @fires {hookEvents:collapseSceneNavigation}
     */
    toggleExpanded(expanded?: boolean | undefined): void;
    #private;
}
import ApplicationV2 from "../api/application.mjs";
