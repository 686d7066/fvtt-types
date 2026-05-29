/**
 * @import User from "../../documents/user.mjs"
 * @import {ContextMenuEntry} from "../ux/context-menu.mjs"
 */
/**
 * A UI element which displays the Users defined for this world.
 * Currently active users are always displayed, while inactive users can be displayed on toggle.
 *
 * @extends ApplicationV2
 * @mixes HandlebarsApplication
 */
export default class Players extends ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> {
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
            expand: Function;
        };
    };
    /** @override */
    static override PARTS: {
        players: {
            root: boolean;
            template: string;
        };
    };
    /**
     * A helper method used to sort users.
     * @param {{role: number, isSelf: boolean, name: string}} a
     * @param {{role: number, isSelf: boolean, name: string}} b
     * @returns {number}
     */
    static "__#359@#sortUsers"(a: {
        role: number;
        isSelf: boolean;
        name: string;
    }, b: {
        role: number;
        isSelf: boolean;
        name: string;
    }): number;
    /**
     * Handle click events to expand the inactive player tray.
     * @this {Players}
     */
    static "__#359@#onExpand"(this: Players): void;
    /**
     * Temporarily remove a User from the World by banning and then un-banning them.
     * @param {User} user     The User to kick
     * @returns {Promise<void>}
     */
    static "__#359@#kickUser"(user: User): Promise<void>;
    /**
     * Ban a User by changing their role to "NONE".
     * @param {User} user     The User to ban
     * @returns {Promise<void>}
     */
    static "__#359@#banUser"(user: User): Promise<void>;
    /**
     * Unban a User by changing their role to "PLAYER".
     * @param {User} user     The User to unban
     * @returns {Promise<void>}
     */
    static "__#359@#unbanUser"(user: User): Promise<void>;
    constructor(options?: Partial<foundry.applications.types.ApplicationConfiguration> | undefined);
    /**
     * Is the application currently expanded?
     * @type {boolean}
     */
    get expanded(): boolean;
    /** @override */
    override _prepareContext(_options: any): Promise<{
        active: {
            id: string | null;
            name: string;
            role: any;
            tooltip: string;
            isSelf: boolean;
            cssClass: string;
            color: any;
            border: any;
        }[];
        inactive: {
            id: string | null;
            name: string;
            role: any;
            tooltip: string;
            isSelf: boolean;
            cssClass: string;
            color: any;
            border: any;
        }[];
    }>;
    /**
     * Format the display of a user's name using their name, pronouns (if defined), and character name (if defined).
     * @param {User} user
     * @returns {string}
     * @protected
     */
    protected _formatName(user: User): string;
    /** @override */
    override _onFirstRender(_context: any, _options: any): Promise<void>;
    /** @override */
    override _onRender(_context: any, _options: any): Promise<void>;
    /**
     * Collapse the players list.
     */
    collapse(): void;
    /**
     * Expand the players list.
     */
    expand(): void;
    /**
     * Update the display which reports average latency.
     */
    refreshLatency(): void;
    /**
     * Show in the interface whether a given User is idle.
     * @param {User} user
     * @param {HTMLLIElement} [row] The User's row in the application DOM
     * @internal
     */
    _onChangeIdleStatus(user: User, row?: HTMLLIElement | undefined): void;
    /**
     * Update the display which reports average framerate.
     * @param {object} [options={}]                   Options which customize FPS reporting
     * @param {boolean} [options.deactivate=false]      Deactivate tracking
     */
    refreshFPS({ deactivate }?: {
        deactivate?: boolean | undefined;
    } | undefined): void;
    /**
     * Toggle the expanded state of the players list.
     * @param {boolean} [expanded]  Force the expanded state to the provided value, otherwise toggle the state.
     */
    toggleExpanded(expanded?: boolean | undefined): void;
    /**
     * Get the set of ContextMenu options which should be applied to each User in the Players UI.
     * @returns {ContextMenuEntry[]}   The Array of context options passed to the ContextMenu instance
     * @protected
     */
    protected _getContextMenuOptions(): ContextMenuEntry[];
}
import ApplicationV2 from "../api/application.mjs";
import type User from "../../documents/user.mjs";
import type { ContextMenuEntry } from "../ux/context-menu.mjs";
