/**
 * A mixin which decorates a DisplayObject with depth and/or occlusion properties.
 * @category Mixins
 * @param {typeof PIXI.DisplayObject} DisplayObject   The parent DisplayObject class being mixed
 */
export default function PrimaryOccludableObjectMixin(DisplayObject: typeof PIXI.DisplayObject): {
    new (...args: any[]): {
        /**
         * Restrictions options packed into a single value with bitwise logic.
         * @type {foundry.utils.BitMask}
         */
        "__#35@#restrictionState": foundry.utils.BitMask;
        /**
         * Is this occludable object hidden for Gamemaster visibility only?
         * @type {boolean}
         */
        hidden: boolean;
        /**
         * A flag which tracks whether the primary canvas object is currently in an occluded state.
         * @type {boolean}
         */
        occluded: boolean;
        /**
         * The occlusion mode of this occludable object (a union of {@link CONST.OCCLUSION_MODES})
         * @type {number}
         */
        occlusionMode: number;
        /**
         * Do surfaces at the same elevation as this object apply occlusion to this object?
         * This property only applies to SURFACE occlusion.
         * @type {boolean}
         * @internal
         */
        _occludedBySameElevationSurfaces: boolean;
        /**
         * The unoccluded alpha of this object.
         * @type {number}
         */
        unoccludedAlpha: number;
        /**
         * The occlusion alpha of this object.
         * @type {number}
         */
        occludedAlpha: number;
        /**
         * Fade this object on hover?
         * @type {boolean}
         * @defaultValue true
         */
        hoverFade: boolean;
        /**
         * Fade this object on hover?
         * @type {boolean}
         */
        "__#35@#hoverFade": boolean;
        /**
         * @typedef OcclusionState
         * @property {number} fade            The amount of FADE occlusion
         * @property {number} radial          The amount of RADIAL occlusion
         * @property {number} vision          The amount of VISION occlusion
         * @property {number} surface         The amount of SURFACE occlusion
         */
        /**
         * The amount of rendered FADE, RADIAL, VISION, and SURFACE occlusion.
         * @type {OcclusionState}
         * @internal
         */
        _occlusionState: {
            /**
             * The amount of FADE occlusion
             */
            fade: number;
            /**
             * The amount of RADIAL occlusion
             */
            radial: number;
            /**
             * The amount of VISION occlusion
             */
            vision: number;
            /**
             * The amount of SURFACE occlusion
             */
            surface: number;
        };
        /**
         * @typedef HoverFadeState
         * @property {boolean} hovered        The hovered state
         * @property {number} hoveredTime     The last time when a mouse event was hovering this object
         * @property {boolean} faded          The faded state
         * @property {boolean} fading         The fading state
         * @property {number} fadingTime      The time the fade animation started
         * @property {number} occlusion       The amount of occlusion
         */
        /**
         * The state of hover-fading.
         * @type {HoverFadeState}
         * @internal
         */
        _hoverFadeState: {
            /**
             * The hovered state
             */
            hovered: boolean;
            /**
             * The last time when a mouse event was hovering this object
             */
            hoveredTime: number;
            /**
             * The faded state
             */
            faded: boolean;
            /**
             * The fading state
             */
            fading: boolean;
            /**
             * The time the fade animation started
             */
            fadingTime: number;
            /**
             * The amount of occlusion
             */
            occlusion: number;
        };
        /**
         * Get the blocking option bitmask value.
         * @returns {number}
         * @internal
         */
        readonly _restrictionState: number;
        /**
         * Is this object blocking light?
         * @type {boolean}
         */
        restrictsLight: boolean;
        /**
         * Is this object blocking weather?
         * @type {boolean}
         */
        restrictsWeather: boolean;
        /**
         * Is this occludable object... occludable?
         * @type {boolean}
         */
        readonly isOccludable: boolean;
        /** @override */
        elevation: number;
        /**
         * The elevation minus eplison used for {@link _occludedBySameElevationSurfaces}.
         * @type {number|undefined}
         */
        "__#35@#elevationNextDown": number | undefined;
        /**
         * The occlusion elevation of this object.
         * @type {number}
         * @internal
         */
        readonly _occlusionElevation: number;
        /**
         * Debounce assignment of the PCO occluded state to avoid cases like animated token movement which can rapidly
         * change PCO appearance.
         * Uses a 50ms debounce threshold.
         * Objects which are in the hovered state remain occluded until their hovered state ends.
         * @type {function(occluded: boolean): void}
         */
        debounceSetOcclusion: (arg0: occluded) => boolean;
        /** @inheritDoc */
        updateTransform(): void;
        /**
         * Update the occlusion state.
         */
        "__#35@#updateOcclusionState"(): void;
        /**
         * Update the hover-fade state.
         */
        "__#35@#updateHoverFadeState"(): void;
        /** @override */
        _shouldRenderDepth(): boolean;
        /**
         * Test whether a specific Token occludes this PCO.
         * @param {Token} token       The Token to test
         * @returns {boolean}         Is the Token occluded by the PCO?
         */
        testOcclusion(token: Token): boolean;
        cullable: boolean;
        object: any;
        "__#27@#quadtreeEntry": QuadtreeObject | null;
        "__#27@#quadtreeDirty": boolean;
        "__#27@#elevation": number;
        sort: number;
        "__#27@#sort": number;
        sortLayer: number;
        "__#27@#sortLayer": number;
        zIndex: number;
        _zIndex: any;
        _onAdded(parent: PIXI.Container): void;
        _onRemoved(parent: PIXI.Container): void;
        updateCanvasTransform(): void;
        _onCanvasBoundsUpdate(): void;
        "__#27@#updateQuadtree"(remove?: boolean | undefined): void;
        readonly shouldRenderDepth: boolean;
        "__#27@#shouldRenderDepth": boolean;
        "__#27@#updateDepth"(): void;
        renderDepthData(renderer: PIXI.Renderer): void;
        canvasTransform: PIXI.Matrix;
        _canvasTransformID: number;
        "__#28@#canvasTransformLocalID": number;
        "__#28@#canvasTransformParentID": number;
        canvasBounds: PIXI.Rectangle;
        _canvasBounds: 
        /** @override */
        PIXI.Bounds;
        _canvasBoundsID: number;
        "__#28@#resetCanvasTransformParentID"(): void;
        _calculateCanvasBounds(): void;
        _onCanvasTransformUpdate(): void;
        containsCanvasPoint(point: PIXI.IPointData): boolean;
    };
};
