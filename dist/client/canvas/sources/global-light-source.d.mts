/**
 * A specialized subclass of the BaseLightSource which is used to render global light source linked to the scene.
 */
export default class GlobalLightSource extends BaseLightSource {
    /** @inheritDoc */
    static defaultData: {
        rotation: number;
        angle: number;
        attenuation: number;
        priority: number;
        vision: boolean;
        walls: boolean;
        elevation: number;
        darkness: {
            min: number;
            max: number;
        };
        alpha: number;
        bright: number;
        coloration: number;
        contrast: number;
        dim: number;
        luminosity: number;
        saturation: number;
        shadows: number;
        animation: {};
        seed: null;
        preview: boolean;
        color: null;
        /**
         * The x-coordinate of the source location
         */
        x: number;
        /**
         * The y-coordinate of the source location
         */
        y: number;
        /**
         * The ID of the Level the point source is in
         */
        level: string;
        /**
         * Whether or not the source is disabled
         */
        disabled: boolean;
    };
    /**
     * Name of this global light source.
     * @type {string}
     * @defaultValue GlobalLightSource.sourceType
     */
    name: string;
    /**
     * A custom polygon placeholder.
     * @type {PIXI.Polygon|number[]|null}
     */
    customPolygon: PIXI.Polygon | number[] | null;
}
import BaseLightSource from "./base-light-source.mjs";
