/**
 * @import {ElevatedPoint} from "../../_types.mjs";
 * @import TokenDocument from "../../documents/token.mjs";
 * @import {RegionTokenMoveInEvent} from "../../documents/_types.mjs";
 * @import {User} from "../../documents/_module.mjs";
 */
/**
 * The data model for a behavior that teleports Token that enter the Region to a preset destination Region.
 *
 * @property {Set<RegionDocument>} destination         The destination(s) Region the Token is teleported to.
 * @property {"random"|"center"|"relative"} placement  The placement of the Token within the destination Region.
 * @property {boolean} snap                            Snap the Token destination position?
 * @property {boolean} choice                          Show teleportation confirmation dialog?
 * @property {boolean} revealed                        Are the destinations revealed?
 * @property {{revealed: string|null; unrevealed: string|null}} dialog  Custom teleporation dialogs
 * @property {{type: string|null; duration: number}} transition         Transition options
 */
export default class TeleportTokenRegionBehaviorType extends RegionBehaviorType {
    /** @override */
    static override LOCALIZATION_PREFIXES: string[];
    /** @override */
    static override defineSchema(): {
        destinations: fields.SetField;
        placement: fields.StringField;
        snap: fields.BooleanField;
        choice: fields.BooleanField;
        revealed: fields.BooleanField;
        dialog: fields.SchemaField;
        transition: fields.SchemaField;
    };
    /**
     * Teleport the Token if it moves into the Region.
     * @param {RegionTokenMoveInEvent} event
     * @this {TeleportTokenRegionBehaviorType}
     */
    static "__#260@#onTokenMoveIn"(this: TeleportTokenRegionBehaviorType, event: RegionTokenMoveInEvent): Promise<void>;
    /** @override */
    static override events: {
        tokenMoveIn: Function;
    };
    /**
     * The query handler for teleporation confirmation.
     * @type {(queryData: {behaviorUuid: string; tokenUuid: string}) => Promise<boolean>}
     * @internal
     */
    static _confirmQuery: (queryData: {
        behaviorUuid: string;
        tokenUuid: string;
    }) => Promise<boolean>;
    /** @inheritDoc */
    static migrateData(data: any): object;
    /** @override */
    override _handleRegionEvent(event: any): void;
    /**
     * @deprecated since v14
     * @ignore
     */
    get destination(): any;
    #private;
}
import RegionBehaviorType from "./base.mjs";
import * as fields from "../../../common/data/fields.mjs";
import type { RegionTokenMoveInEvent } from "../../documents/_types.mjs";
