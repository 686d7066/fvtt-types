/**
 * Draw a border.
 * @param {PIXI.smooth.SmoothGraphics} graphics  The graphics to draw the shape into.
 * @param {PIXI.Rectangle|PIXI.RoundedRectangle|PIXI.Circle|PIXI.Ellipse|PIXI.Polygon
 *   |(graphics: PIXI.smooth.SmoothGraphics) => void} shape  The shape to draw or a draw callback.
 * @param {object} [options]                  Additional options.
 * @param {PIXI.ColorSource} [options.color]  The border color. Default: `0xFFFFFF`.
 * @param {boolean} [options.dashed]          Dashed border? Default: `false`.
 * @param {number} [options.alignment]        The alignment of the outline. Default: `0.5`.
 * @param {boolean} [options.clear]           Clear the graphics before drawing the border? Default: `0.5`.
 */
export function drawBorder(graphics: PIXI.smooth.SmoothGraphics, shape: PIXI.Rectangle | PIXI.RoundedRectangle | PIXI.Circle | PIXI.Ellipse | PIXI.Polygon | ((graphics: PIXI.smooth.SmoothGraphics) => void), { color, dashed, alignment, clear }?: {
    color?: any;
    dashed?: boolean | undefined;
    alignment?: number | undefined;
    clear?: boolean | undefined;
} | undefined): void;
