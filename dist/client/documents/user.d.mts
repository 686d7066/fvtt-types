/**
 * @import TokenDocument from "./token.mjs";
 * @import Macro from "./macro.mjs";
 * @import {ActivityData} from "../_types.mjs";
 * @import Users from "./collections/users.mjs";
 */
/**
 * The client-side User document which extends the common BaseUser model.
 * Each User document contains UserData which defines its data schema.
 *
 * @extends BaseUser
 * @mixes ClientDocumentMixin
 * @category Documents
 *
 * @see {@link foundry.documents.collections.Users}: The world-level collection of User documents
 * @see {@link foundry.applications.sheets.UserConfig}: The User configuration application
 */
export default class User extends BaseUser {
    /**
     * Query many Users.
     * @param {Iterable<User>} users    The users that are queried.
     * @param {string} queryName        The query name (must be registered in `CONFIG.queries`)
     * @param {object} queryData        The query data (must be JSON-serializable)
     * @param {object} [queryOptions]                          The query options
     * @param {number} [queryOptions.timeout]                  The timeout in milliseconds
     * @returns {Promise<Map<User, PromiseSettledResult<*>>>}  The query results
     */
    static queryMany(users: Iterable<User>, queryName: string, queryData: object, queryOptions?: {
        timeout?: number | undefined;
    } | undefined): Promise<Map<User, PromiseSettledResult<any>>>;
    /** @inheritDoc */
    constructor(data: any, options: any);
    /**
     * Is the User currently logged into the game World?
     * @type {boolean}
     */
    active: boolean;
    /**
     * Is this User currently considered idle?
     * @type {boolean}
     */
    idle: boolean;
    /**
     * Track references to the current set of Tokens which are targeted by the User
     * @type {Set<Token>}
     */
    targets: Set<Token>;
    /**
     * Track the ID of the Scene that is currently being viewed by the User
     * @type {string|null}
     */
    viewedScene: string | null;
    /**
     * Track the ID of the Scene Level that is currently being viewed by the User
     * @type {string|null}
     */
    viewedLevel: string | null;
    /**
     * Track the Token documents that this User is currently moving.
     * @type {ReadonlySet<TokenDocument>}
     * @readonly
     */
    readonly movingTokens: ReadonlySet<TokenDocument>;
    /**
     * A flag for whether the current User is a Trusted Player
     * @type {boolean}
     */
    get isTrusted(): boolean;
    /**
     * A flag for whether this User is the connected client
     * @type {boolean}
     */
    get isSelf(): boolean;
    /**
     * Is this User the active GM?
     * @type {boolean}
     */
    get isActiveGM(): boolean;
    /**
     * A localized label for this User's role.
     * @type {string}
     */
    get roleLabel(): string;
    set lastActivityTime(timestamp: number);
    /**
     * The timestamp of the last observed activity for the user.
     * @type {number}
     */
    get lastActivityTime(): number;
    /** @inheritDoc */
    prepareDerivedData(): void;
    avatar: any;
    border: any;
    /**
     * Is this User the designated User among the Users that satisfy the given condition?
     * This function calls {@link foundry.documents.collections.Users#getDesignatedUser} and compares the designated User
     * to this User.
     * @example
     * // Is the current User the designated User to create Tokens?
     * const isDesignated = game.user.isDesignated(user => user.active && user.can("TOKEN_CREATE"));
     * @param {(user: User) => boolean} condition    The condition the Users must satisfy
     * @returns {boolean}                            Is designated User?
     */
    isDesignated(condition: (user: User) => boolean): boolean;
    /**
     * Assign a Macro to a numbered hotbar slot between 1 and 50
     * @param {Macro|null} macro          The Macro document to assign
     * @param {number|string|null} [slot] A specific numbered hotbar slot to fill
     * @param {number} [fromSlot]         An optional origin slot from which the Macro is being shifted
     * @returns {Promise<User>}           A Promise which resolves once the User update is complete
     */
    assignHotbarMacro(macro: Macro | null, slot?: string | number | null | undefined, { fromSlot }?: number | undefined): Promise<User>;
    /**
     * Assign a specific boolean permission to this user.
     * Modifies the user permissions to grant or restrict access to a feature.
     *
     * @param {string} permission    The permission name from USER_PERMISSIONS
     * @param {boolean} allowed      Whether to allow or restrict the permission
     */
    assignPermission(permission: string, allowed: boolean): Promise<foundry.abstract.Document<object, foundry.abstract.types.DocumentConstructionContext> | undefined>;
    /**
     * Submit User activity data to the server for broadcast to other players.
     * This type of data is transient, persisting only for the duration of the session and not saved to any database.
     * Activity data uses a volatile event to prevent unnecessary buffering if the client temporarily loses connection.
     * @param {ActivityData} activityData  An object of User activity data to submit to the server for broadcast.
     * @param {object} [options]
     * @param {boolean|undefined} [options.volatile]  If undefined, volatile is inferred from the activity data.
     */
    broadcastActivity(activityData?: ActivityData, { volatile }?: {
        volatile?: boolean | undefined;
    } | undefined): void;
    /**
     * Get an Array of Macro Documents on this User's Hotbar by page
     * @param {number} page     The hotbar page number
     * @returns {Array<{slot: number, macro: Macro|null}>}
     */
    getHotbarMacros(page?: number): Array<{
        slot: number;
        macro: Macro | null;
    }>;
    /**
     * Update the set of Token targets for the user given an array of provided Token ids.
     * This function handles changes made elsewhere and does not broadcast to other connected clients.
     * @param {string[]} targetIds      An array of Token ids which represents the new target set
     * @internal
     */
    _onUpdateTokenTargets(targetIds?: string[]): void;
    /**
     * Query this User.
     * @param {string} queryName                         The query name (must be registered in `CONFIG.queries`)
     * @param {object} queryData                         The query data (must be JSON-serializable)
     * @param {object} [queryOptions]                    The query options
     * @param {number} [queryOptions.timeout]            The timeout in milliseconds
     * @returns {Promise<*>}                             The query result
     */
    query(queryName: string, queryData: object, queryOptions?: {
        timeout?: number | undefined;
    } | undefined): Promise<any>;
    /** @inheritDoc  */
    _onUpdate(changed: any, options: any, userId: any): any;
    /** @inheritDoc  */
    _onDelete(options: any, userId: any): void;
    #private;
}
import BaseUser from "../../common/documents/user.mjs";
import type TokenDocument from "./token.mjs";
import type Macro from "./macro.mjs";
import type { ActivityData } from "../_types.mjs";
