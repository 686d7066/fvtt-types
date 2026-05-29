/**
 * Activate the animejs for the Canvas ticker.
 * This is called during `Canvas#draw` before the `canvasReady` hook.
 */
export function activate(): void;
/**
 * Deactivate the animejs engine for the Canvas ticker.
 * This is called during `Canvas#teardown` before the `canvasTearDown` hook.
 */
export function deactivate(): void;
/**
 * One-time configuration to register components, animations, and paths to CONFIG.Canvas.vfx.
 */
export function configure(): void;
export * as fields from "./fields/_module.mjs";
export * as constants from "./vfx-constants.mjs";
export * as utils from "./vfx-utils.mjs";
export { default as VFXCanvasContainer } from "./vfx-canvas-container.mjs";
export { default as VFXComponent } from "./vfx-component.mjs";
export { default as VFXEffect } from "./vfx-effect.mjs";
import * as animations from "./animations/_module.mjs";
import * as components from "./components/_module.mjs";
import VFXPath from "./vfx-path.mjs";
export { animations, components, VFXPath };
