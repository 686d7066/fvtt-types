/**
 * @import {CanvasVisibilityTest, CanvasVisibilityTestConfiguration, ElevatedPoint} from "../../_types.mjs";
 * @import {TokenDetectionMode} from "../../../common/documents/_types.mjs";
 * @import PointVisionSource from "../sources/point-vision-source.mjs";
 * @import Level from "../../documents/level.mjs";
 * @import {PointSourcePolygonConfig} from "../geometry/_types.mjs";
 */
/**
 * A Detection Mode which can be associated with any kind of sense/vision/perception.
 * A token could have multiple detection modes.
 */
export default class DetectionMode extends DataModel<object, foundry.abstract.types.DataModelConstructionContext> {
    /** @override */
    static override defineSchema(): {
        id: fields.StringField;
        label: fields.StringField;
        tokenConfig: fields.BooleanField;
        walls: fields.BooleanField;
        angle: fields.BooleanField;
        type: fields.NumberField;
    };
    /**
     * Get the detection filter pertaining to this mode.
     * @returns {PIXI.Filter|undefined}
     */
    static getDetectionFilter(): PIXI.Filter | undefined;
    /**
     * An optional filter to apply on the target when it is detected with this mode.
     * @type {PIXI.Filter|undefined}
     */
    static _detectionFilter: PIXI.Filter | undefined;
    /**
     * The types of the detection mode.
     * @type {Readonly<{SIGHT: number, SOUND: number, MOVE: number, OTHER: number}>}
     */
    static get DETECTION_TYPES(): Readonly<{
        SIGHT: number;
        SOUND: number;
        MOVE: number;
        OTHER: number;
    }>;
    static "__#374@#DETECTION_TYPES": Readonly<{
        readonly SIGHT: 0;
        readonly SOUND: 1;
        readonly MOVE: 2;
        readonly OTHER: 3;
    }>;
    /**
     * The identifier of the basic sight detection mode.
     * @type {"basicSight"}
     */
    static get BASIC_MODE_ID(): "basicSight";
    /**
     * Test for LOS collision.
     * For both the segment in the viewed level and in the target level, a ray is cast with the given configuration.
     * @overload
     * @param {PointVisionSource} visionSource                                      The vision source
     * @param {Omit<CanvasVisibilityTest, "los">} test                              The test
     * @param {Partial<Omit<PointSourcePolygonConfig, "source"|"level">>} [config]  The configuration
     * @returns {boolean}  True if there's a collision or the point is not in the vision angle, otherwise false
     * @protected
     */
    protected static _testCollision(visionSource: PointVisionSource, test: Omit<CanvasVisibilityTest, "los">, config?: Partial<Omit<PointSourcePolygonConfig, "source" | "level">> | undefined): boolean;
    /**
     * Test for LOS collision.
     * For the segment of the ray in the viewed level, `los` is tested.
     * For the segment of the ray in the target level, a ray is cast with the configuration of `los`.
     * @overload
     * @param {PointVisionSource} visionSource                  The vision source
     * @param {Pick<CanvasVisibilityTest, "point"|"los">} test  The test
     * @param {PointSourcePolygon} los                          The LOS polygon
     * @returns {boolean}  True if there's a collision or the point is not in the vision angle, otherwise false
     * @protected
     */
    protected static _testCollision(visionSource: PointVisionSource, test: Pick<CanvasVisibilityTest, "point" | "los">, los: PointSourcePolygon): boolean;
    /**
     * Test for collision.
     * @param {PointVisionSource} visionSource    The vision source
     * @param {ElevatedPoint} destination         The destination
     * @param {Partial<Omit<PointSourcePolygonConfig, "source"> & {tMin: number; tMax: number}>} [config]
     *                                            The configuration
     * @returns {boolean}
     */
    static "__#374@#testCollision"(visionSource: PointVisionSource, destination: ElevatedPoint, config?: Partial<Omit<PointSourcePolygonConfig, "source"> & {
        tMin: number;
        tMax: number;
    }> | undefined): boolean;
    /**
     * Get the intermediate t-value for LOS testing.
     * @param {PointVisionSource} visionSource                  The vision source
     * @param {Pick<CanvasVisibilityTest, "point"|"los">} test  The test
     */
    static "__#374@#getIntermediateTValue"(visionSource: PointVisionSource, test: Pick<CanvasVisibilityTest, "point" | "los">): number;
    constructor(data?: object | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DataModelConstructionContext | undefined);
    /**
     * Test visibility of a target object or array of points for a specific vision source.
     * @param {PointVisionSource} visionSource             The vision source being tested
     * @param {TokenDetectionMode} mode                    The detection mode configuration
     * @param {CanvasVisibilityTestConfiguration} config   The visibility test configuration
     * @returns {boolean}                                  Is the test target visible?
     */
    testVisibility(visionSource: PointVisionSource, mode: TokenDetectionMode, { object, level, tests }: CanvasVisibilityTestConfiguration): boolean;
    /**
     * Can this PointVisionSource theoretically detect a certain object based on its properties?
     * This check should not consider the relative positions of either object, only their state.
     * @param {PointVisionSource} visionSource   The vision source being tested
     * @param {object|null} target               The target object being tested
     * @param {Level} level                      The level the target is in
     * @returns {boolean}                        Can the target object theoretically be detected by this vision source?
     * @protected
     */
    protected _canDetect(visionSource: PointVisionSource, target: object | null, level: Level): boolean;
    /**
     * Evaluate a single test point to confirm whether it is visible.
     * Standard detection rules require that the test point be both within LOS and within range.
     * @param {PointVisionSource} visionSource      The vision source being tested
     * @param {TokenDetectionMode} mode             The detection mode configuration
     * @param {object|null} target                  The target object being tested
     * @param {CanvasVisibilityTest} test           The test case being evaluated
     * @returns {boolean}
     * @protected
     */
    protected _testPoint(visionSource: PointVisionSource, mode: TokenDetectionMode, target: object | null, test: CanvasVisibilityTest): boolean;
    /**
     * Test whether the line-of-sight requirement for detection is satisfied.
     * Always true if the detection mode bypasses walls, otherwise the test point must be contained by the LOS polygon.
     * The result of is cached for the vision source so that later checks for other detection modes do not repeat it.
     * @param {PointVisionSource} visionSource  The vision source being tested
     * @param {TokenDetectionMode} mode         The detection mode configuration
     * @param {object|null} target              The target object being tested
     * @param {CanvasVisibilityTest} test       The test case being evaluated
     * @returns {boolean}                       Is the LOS requirement satisfied for this test?
     * @protected
     */
    protected _testLOS(visionSource: PointVisionSource, mode: TokenDetectionMode, target: object | null, test: CanvasVisibilityTest): boolean;
    /**
     * Test whether the target is within the vision angle.
     * @param {PointVisionSource} visionSource  The vision source being tested
     * @param {TokenDetectionMode} mode         The detection mode configuration
     * @param {object|null} target              The target object being tested
     * @param {CanvasVisibilityTest} test       The test case being evaluated
     * @returns {boolean}                       Is the point within the vision angle?
     * @protected
     */
    protected _testAngle(visionSource: PointVisionSource, mode: TokenDetectionMode, target: object | null, test: CanvasVisibilityTest): boolean;
    /**
     * Verify that a target is in range of a source.
     * @param {PointVisionSource} visionSource      The vision source being tested
     * @param {TokenDetectionMode} mode             The detection mode configuration
     * @param {object|null} target                  The target object being tested
     * @param {CanvasVisibilityTest} test           The test case being evaluated
     * @returns {boolean}                           Is the target within range?
     * @protected
     */
    protected _testRange(visionSource: PointVisionSource, mode: TokenDetectionMode, target: object | null, test: CanvasVisibilityTest): boolean;
    /**
     * @deprecated since v13
     * @ignore
     */
    get BASIC_MODE_ID(): "basicSight";
}
import DataModel from "../../../common/abstract/data.mjs";
import type PointVisionSource from "../sources/point-vision-source.mjs";
import type { TokenDetectionMode } from "../../../common/documents/_types.mjs";
import type { CanvasVisibilityTestConfiguration } from "../../_types.mjs";
import type Level from "../../documents/level.mjs";
import type { CanvasVisibilityTest } from "../../_types.mjs";
import * as fields from "../../../common/data/fields.mjs";
import type { PointSourcePolygonConfig } from "../geometry/_types.mjs";
import PointSourcePolygon from "../geometry/shapes/source-polygon.mjs";
import type { ElevatedPoint } from "../../_types.mjs";
