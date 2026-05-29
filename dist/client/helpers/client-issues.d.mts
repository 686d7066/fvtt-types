/**
 * @typedef {Record<string, Record<string, number>>} ModuleSubTypeCounts
 * An object structure of document types at the top level, with a count of different sub-types for that document type.
 */
/**
 * @import {Document} from "../../common/abstract/_module.mjs";
 */
/**
 * A class responsible for tracking issues in the current world.
 */
export default class ClientIssues {
    /**
     * The minimum supported screen resolution.
     * @type {{width: number; height: number}}
     */
    static "__#381@#MIN_SCREEN_RESOLUTION": {
        width: number;
        height: number;
    };
    /**
     * The minimum supported viewport dimensions.
     * @type {{width: number; height: number}}
     */
    static "__#381@#MIN_VIEWPORT_DIMENSIONS": {
        width: number;
        height: number;
    };
    /**
     * @typedef BrowserTest
     * @property {number|string} minimum  The minimum supported version for this browser.
     * @property {RegExp} match    A regular expression to match the browser against the user agent string.
     * @property {string} message  A message to display if the user's browser version does not meet the minimum.
     */
    /**
     * The minimum supported client versions.
     * @type {Record<string, BrowserTest>}
     */
    static "__#381@#BROWSER_TESTS": Record<string, {
        /**
         * The minimum supported version for this browser.
         */
        minimum: number | string;
        /**
         * A regular expression to match the browser against the user agent string.
         */
        match: RegExp;
        /**
         * A message to display if the user's browser version does not meet the minimum.
         */
        message: string;
    }>;
    /**
     * Detect and display warnings for known performance issues which may occur due to the user's hardware or browser
     * configuration.
     * @internal
     */
    _detectWebGLIssues(): void;
    /**
     * Add an invalid Document to the module-provided sub-type counts.
     * @param {typeof Document} cls                The Document class.
     * @param {object} source                      The Document's source data.
     * @param {object} [options]
     * @param {boolean} [options.decrement=false]  Decrement the counter rather than incrementing it.
     * @internal
     */
    _countDocumentSubType(cls: typeof Document, source: object, options?: {
        decrement?: boolean | undefined;
    } | undefined): void;
    /**
     * Detect and record certain usability error messages which are likely to result in the user having a bad experience.
     * @internal
     */
    _detectUsabilityIssues(): void;
    /**
     * Get the Document sub-type counts for a given module.
     * @param {Module|string} module  The module or its ID.
     * @returns {ModuleSubTypeCounts}
     */
    getSubTypeCountsFor(module: Module | string): ModuleSubTypeCounts;
    /**
     * Retrieve all sub-type counts in the world.
     * @returns {Iterator<string, ModuleSubTypeCounts>}
     */
    getAllSubTypeCounts(): Iterator<string, ModuleSubTypeCounts>;
    /**
     * Retrieve the tracked validation failures.
     * @type {{[documentName: string]: {[uuid: string]: {name?: string; error: Error}}}}
     */
    get validationFailures(): {
        [documentName: string]: {
            [uuid: string]: {
                name?: string;
                error: Error;
            };
        };
    };
    /**
     * Retrieve the tracked usability issues.
     * @type {Record<string, UsabilityIssue>}
     */
    get usabilityIssues(): Record<string, {
        /**
         * The pre-localized message to display in relation to the usability issue.
         */
        message: string;
        /**
         * The severity of the issue, either "error", "warning", or "info".
         */
        severity: string;
        /**
         * Parameters to supply to the localization.
         */
        params?: object | undefined;
    }>;
    /**
     * @typedef PackageCompatibilityIssue
     * @property {string[]} error    Error messages.
     * @property {string[]} warning  Warning messages.
     */
    /**
     * Retrieve package compatibility issues.
     * @type {Record<string, PackageCompatibilityIssue>}
     */
    get packageCompatibilityIssues(): Record<string, {
        /**
         * Error messages.
         */
        error: string[];
        /**
         * Warning messages.
         */
        warning: string[];
    }>;
    /**
     * Track all world document validation failures and failures of their embedded documents.
     * @internal
     */
    _detectDocumentIssues(): void;
    /**
     * Handle deletion of invalid documents.
     * @param {string} documentName            The Document name
     * @param {string[]} invalidIds            The array of invalid IDs
     * @param {object} context                 The context
     * @param {Document|null} [context.parent] The Documents' parent, if any
     * @param {string|null} [context.pack]     The Documents' compendium pack, if applicable
     * @internal
     */
    _onDeleteInvalid(documentName: string, invalidIds: string[], { parent, pack }?: {
        parent?: Document<object, foundry.abstract.types.DocumentConstructionContext> | null | undefined;
        pack?: string | null | undefined;
    }): void;
    #private;
}
/**
 * An object structure of document types at the top level, with a count of different sub-types for that document type.
 */
export type ModuleSubTypeCounts = Record<string, Record<string, number>>;
import type { Document } from "../../common/abstract/_module.mjs";
