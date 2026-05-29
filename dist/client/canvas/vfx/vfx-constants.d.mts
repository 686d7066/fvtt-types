/**
 * The duration of time allocated for "pre-impact" lead in animations or sounds.
 * @type {number}
 */
export const PRE_IMPACT_MS: number;
/**
 * An enumeration of animation sound alignment positions.
 */
export type SOUND_ALIGNMENT = number;
/**
 * An enumeration of animation sound alignment positions.
 * @enum {number}
 */
export const SOUND_ALIGNMENT: Readonly<{
    readonly END_START: 0;
    readonly START: 1;
    readonly MIDDLE: 2;
    readonly END: 3;
    readonly START_END: 4;
}>;
