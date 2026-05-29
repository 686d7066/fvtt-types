/**
 * @import {CalendarConfig, CalendarData, TimeComponents, TimeFormatter} from "./_types.mjs";
 * @import {SetElement} from "../../common/_types.mjs";
 */
/**
 * Game Time Calendar configuration data model.
 * @extends {foundry.abstract.DataModel}
 * @mixes CalendarConfig
 * @template {TimeComponents} [Components=TimeComponents]
 */
export default class CalendarData<Components extends TimeComponents = TimeComponents> extends DataModel<object, foundry.abstract.types.DataModelConstructionContext> {
    /**
     * {@link TimeComponents} units usable in {@link CalendarData.formatDuration}, sorted descendingly by order of
     * magnitude
     * @type {Set<"year"|"month"|"day"|"hour"|"minute"|"second">}
     * @internal
     */
    static _DURATION_FORMAT_UNITS: Set<"year" | "month" | "day" | "hour" | "minute" | "second">;
    /** @inheritDoc */
    static defineSchema(): {
        name: foundry.data.fields.StringField;
        description: foundry.data.fields.StringField;
        years: foundry.data.fields.SchemaField;
        months: foundry.data.fields.SchemaField;
        days: foundry.data.fields.SchemaField;
        seasons: foundry.data.fields.SchemaField;
    };
    static formatTimestamp(calendar: CalendarData, components: TimeComponents, options: object): string;
    static formatDuration(calendar: CalendarData, components: TimeComponents, options: object): string;
    static formatAgo(calendar: CalendarData, components: TimeComponents, options: object): string;
    constructor(data?: object | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DataModelConstructionContext | undefined);
    /** @inheritDoc */
    _initialize(options?: {}): void;
    /**
     * Convert a set of {@link TimeComponents} into seconds.
     * @param {Partial<Components>} components        An amount of time expressed as components
     * @returns {number}                              The cumulative time in seconds
     */
    componentsToTime(components: Partial<Components>): number;
    /**
     * Convert a partial set {@link TimeComponents} into an integer of a provided unit.
     * @param {Partial<Components>} components             An amount of time expressed as components
     * @param {SetElement<typeof CalendarData._DURATION_FORMAT_UNITS>} unit The unit to convert into
     * @param {object} [options]
     * @param {"ceil"|"floor"|"round"|"trunc"} [options.roundFn="ceil"] The Math function to use in rounding a remainder
     * @returns {number}                              The cumulative time in the requested units
     */
    componentsToUnit(components: Partial<Components>, unit: SetElement<Set<"day" | "year" | "month" | "hour" | "minute" | "second">>, { roundFn }?: {
        roundFn?: "round" | "ceil" | "floor" | "trunc" | undefined;
    } | undefined): number;
    /**
     * Modify some start time by adding a number of seconds or components to it. The delta components may be negative.
     * @param {number|Components} startTime           The initial time
     * @param {number|Components} deltaTime           Differential components to add
     * @returns {Components}                          The resulting time
     */
    add(startTime: number | Components, deltaTime: number | Components): Components;
    /**
     * Compute the difference between some new time and some other time.
     * @param {number|Components} endTime             A time to difference relative to the start time.
     * @param {number|Components} [startTime]         The starting time. If not provided the current world time is used.
     * @returns {Components}                          The time difference expressed as components
     */
    difference(endTime: number | Components, startTime?: number | Components | undefined): Components;
    /**
     * Format a time using one of several supported display formats.
     * @param {number|Components} [time]            The time components to format, by default the current world time.
     * @param {string|TimeFormatter} [formatter]    The formatter function applied to the time.
     *                                              If a string is provided, it must be a function configured in
     *                                              CONFIG.time.formatters.
     * @param {object} options                      Options passed to the formatter function
     * @returns {string}                            The formatted date and time string
     */
    format(time?: number | Components | undefined, formatter?: string | TimeFormatter | undefined, options?: object): string;
    /**
     * Test whether a year is a leap year.
     * @param {number} year                           The year to test
     * @returns {boolean}                             Is it a leap year?
     */
    isLeapYear(year: number): boolean;
    /**
     * Count the number of leap years which have completed prior to some current year.
     * @param {number} year                           The current year
     * @returns {number}                              The number of leap years which have occurred prior to this year
     */
    countLeapYears(year: number): number;
    /**
     * Expand a world time integer into an object containing the relevant time components.
     * @param {number} time                     A time in seconds
     * @returns {Components}                    The time expressed as components
     */
    timeToComponents(time?: number): Components;
    /**
     * Decompose a timestamp in seconds to identify the number of completed years and remaining seconds.
     * Also returns whether the remaining seconds fall within a leap year.
     * This method is factored out so calendars which require advanced leap year handling can override this logic.
     * @param {number} time
     * @returns {year: number, second: number, leapYear: boolean}
     * @protected
     */
    protected _decomposeTimeYears(time: number): number;
    /**
     * Allow the active world calendar instance to respond to changes in the world time.
     * This method is called and awaited before "updateWorldTime" hooks are dispatched.
     * @param {number} worldTime              The new world time, game.time.worldTime
     * @param {number} deltaTime              The relative change in the world time
     * @param {object} [options]              Options passed through the world time update operation
     * @param {string} userId                 The user who triggered the time change
     * @returns {Promise<void>}
     */
    onUpdateWorldTime(worldTime: number, deltaTime: number, options?: object | undefined, userId: string): Promise<void>;
}
/**
 * @type {CalendarConfig}
 */
export const SIMPLIFIED_GREGORIAN_CALENDAR_CONFIG: CalendarConfig;
import type { TimeComponents } from "./_types.mjs";
import DataModel from "../../common/abstract/data.mjs";
import type { SetElement } from "../../common/_types.mjs";
import type { TimeFormatter } from "./_types.mjs";
import type { CalendarConfig } from "./_types.mjs";
