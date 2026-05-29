/**
 * @import {ElevatedPoint} from "../../_types.mjs";
 * @import TokenDocument from "../../documents/token.mjs";
 * @import {RegionTokenExitEvent, RegionTokenMoveInEvent} from "../../documents/_types.mjs";
 * @import {Level, User} from "../../documents/_module.mjs";
 * @import RegionDocument from "../../documents/region.mjs";
 */
/**
 * The data model for a behavior that prompts to change the level of Tokens that enter the Region.
 */
export default class ChangeLevelRegionBehaviorType extends RegionBehaviorType {
    /** @override */
    static override LOCALIZATION_PREFIXES: string[];
    /** @override */
    static override defineSchema(): {
        movementActions: fields.SetField;
    };
    /**
     * Prompt to change the level of the Token if it moves into the Region.
     * @param {RegionTokenMoveInEvent} event
     * @this {ChangeLevelRegionBehaviorType}
     */
    static "__#253@#onTokenMoveIn"(this: ChangeLevelRegionBehaviorType, event: RegionTokenMoveInEvent): Promise<void>;
    /**
     * Disable the confirmation dialog.
     * @param {RegionTokenExitEvent} event
     * @this {ChangeLevelRegionBehaviorType}
     */
    static "__#253@#onTokenExit"(this: ChangeLevelRegionBehaviorType, event: RegionTokenExitEvent): Promise<void>;
    /** @override */
    static override events: {
        tokenMoveIn: Function;
        tokenExit: Function;
    };
    /**
     * Get the possible destination levels.
     * @param {RegionDocument} region      The region.
     * @param {TokenDocument} token        The token that was moved.
     * @returns {Level[]}
     */
    static "__#253@#getDestinationLevels"(region: RegionDocument, token: TokenDocument): Level[];
    /**
     * Get the selectable movement actions.
     * @param {TokenDocument} token         The token that was moved.
     * @param {Set<string>} allowedActions  The allowed movement actions to change the level.
     * @returns {Set<string>}               The selectable movement actions.
     */
    static "__#253@#getSelectableMovementActions"(token: TokenDocument, allowedActions: Set<string>): Set<string>;
    /** @inheritDoc */
    _initializeSource(data: any, options: any): object;
    #private;
}
import RegionBehaviorType from "./base.mjs";
import * as fields from "../../../common/data/fields.mjs";
import type { RegionTokenMoveInEvent } from "../../documents/_types.mjs";
import type { RegionTokenExitEvent } from "../../documents/_types.mjs";
import type RegionDocument from "../../documents/region.mjs";
import type TokenDocument from "../../documents/token.mjs";
import type { Level } from "../../documents/_module.mjs";
