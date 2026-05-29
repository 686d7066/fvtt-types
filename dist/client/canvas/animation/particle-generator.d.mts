/**
 * @import {
 *   ParticleGeneratorAnchor,
 *   ParticleGeneratorArea,
 *   ParticleGeneratorAreaSampleMode,
 *   ParticleGeneratorBehavior,
 *   ParticleGeneratorBehaviorId,
 *   ParticleGeneratorClipOptions,
 *   ParticleGeneratorColorFunction,
 *   ParticleGeneratorColorValue,
 *   ParticleGeneratorConfiguration,
 *   ParticleGeneratorConstraintMode,
 *   ParticleGeneratorCurvePoint,
 *   ParticleGeneratorDeathCallback,
 *   ParticleGeneratorDebugOptions,
 *   ParticleGeneratorDebugStats,
 *   ParticleGeneratorDebugTintMode,
 *   ParticleGeneratorDebugTintOptions,
 *   ParticleGeneratorFadeOptions,
 *   ParticleGeneratorFollowOptions,
 *   ParticleGeneratorLocalArea,
 *   ParticleGeneratorMode,
 *   ParticleGeneratorOrbitOptions,
 *   ParticleGeneratorParticleCallback,
 *   ParticleGeneratorPoint,
 *   ParticleGeneratorPositionTest,
 *   ParticleGeneratorRange,
 *   ParticleGeneratorRectangle,
 *   ParticleGeneratorTickCallback,
 *   ParticleGeneratorValue,
 *   ParticleGeneratorValueFunction,
 *   ParticleGeneratorVelocityFunction,
 *   ParticleGeneratorVelocityOptions,
 *   ParticleMesh
 * } from "./_types.mjs";
 */
/**
 * A lightweight, native particle generator designed for VFX.
 *
 * ParticleGenerator manages:
 * - An internal container on the chosen canvas layer (usually `canvas.primary`)
 * - Particle pooling (reusing sprites instead of constantly allocating new ones)
 * - Lifetime, fade-in/out, basic motion, and optional constraints
 * - Two usage styles:
 *   - **ambient**: keep a steady density in the visible area (viewport-driven budget)
 *   - **effect**: spawn particles in a specific area (manual spawns or a fixed target count)
 *
 * The API is intentionally compact:
 * - Put most settings at the top level (`textures`, `blend`, `alpha`, `scale`, `count`, `lifetime`, etc.)
 * - Use `area` to define where particles spawn
 * - Use `spawnParticle()` or `spawnParticles()` to spawn particles (optionally overriding texture/area/position)
 * - Use `start({spawn: n})` when you want to immediately seed a certain number of particles on start
 * - Use `shaderClass` when you want a custom sampler shader for particles
 * - Use `onSpawn` to customize each particle after it has been positioned and configured
 * - Use `onUpdate` to apply per-particle per-frame logic after position, rotation, tint, and alpha are computed
 * - Use `onDeath` to react when particles are recycled (optional)
 *
 * ## Core concepts
 *
 * ### Mode
 * - `mode: "ambient"` maintains a stable density in the visible region.
 *   `count` is scaled by the visible area ratio, and spawning uses the padded viewport (`viewPadding`).
 * - `mode: "effect"` spawns in a defined `area`. `count` is treated as an absolute target.
 *    You can use `manual: true` and spawn at your own rate via `spawnParticle()` / `spawnParticles()`.
 *
 * ### Fade
 * `fade.in` / `fade.out` accept:
 * - milliseconds when value >= 1
 * - a fraction of the particle lifetime when 0 < value < 1
 *
 * ### Velocity
 * `velocity` can be:
 * - fixed: `{x, y}` or `new PIXI.Point(x, y)`
 * - ranged: `{x: [min, max], y: [min, max]}`
 * - polar: `{speed: value, angle: [min, max]}` (angle in degrees)
 * - function: `{fn: (particle, dt, out) => {out.x = vx; out.y = vy;}}`
 *   evaluated at spawn and during each update as the full velocity vector for that frame
 *
 * ### Attribute Values
 * `alpha`, `scale`, polar `velocity.speed`, and `rotation.speed` accept fixed values, random ranges,
 * `{min, max, curve}` objects, or `{fn}` objects.
 * `tint` accepts fixed color sources or `{curve}` / `{fn}` color objects. Curve points use color sources; `fn` returns
 * a 0xRRGGBB number. Curve time is normalized over each particle lifetime.
 * - `alpha` is multiplied by the fade envelope
 * - `scale` is applied directly to the particle
 * - `velocity.speed` updates magnitude while preserving the spawn direction
 * - `rotation.speed` updates angular velocity in degrees per second
 * - `tint` interpolates RGB channels between curve points
 *
 * ### Shader
 * Pass `shaderClass` to render particles with a custom sampler shader.
 * - Batchable shaders are recommended for anything more than modest particle counts.
 * - ParticleGenerator uses plain `SpriteMesh` instances, so the shader must be compatible with `SpriteMesh`.
 * - If your batch shader needs custom per-particle data, attach it in `onSpawn` or `onUpdate` and read it from
 *   `element.object` in the shader `_packInterleavedGeometry` override.
 *
 * ### Area
 * `area` supports:
 * - Point: `{x, y}`
 * - Rect: `{x, y, width, height}` or `new PIXI.Rectangle(x, y, w, h)`
 * - Circle: `{x, y, radius}`
 * - Ring: `{x, y, innerRadius, outerRadius}` or `{x, y, radius: [inner, outer]}`
 * - Line: `{from: {x, y}, to: {x, y}}`
 * - Points: `{points: [{x, y}, ...]}` or `{shape: "points", points: [{x, y}, ...]}`
 * - Polyline: `{path: [{x, y}, ...]}`, `{shape: "path", path: [...]}`, or
 *   `{shape: "polyline", points: [{x, y}, ...]}`
 * - Ellipse: `{x, y, radiusX, radiusY}`, `{shape: "ellipse", x, y, radiusX, radiusY}`, with optional
 *   `holeScale`, `minAngle`, `maxAngle`, `shapeRotation`, and `affectRotation`.
 * - Shape instance: {@link foundry.data.BaseShapeData}
 * - Shape source data: `{type: "circle", x, y, radius}` using the {@link foundry.data.BaseShapeData} schema.
 * Plain object areas without a `type` are inferred from their properties.
 *
 * Set `sampleMode` to `"boundary"` to spawn along the edge of area types that support boundary sampling.
 *
 * If you provide an `anchor`, object-based areas can be treated as offsets relative to that anchor.
 * To force an absolute rectangle while anchored, pass a `PIXI.Rectangle`.
 * Plain objects with a valid {@link foundry.data.BaseShapeData} `type` are shape source data, not object areas,
 * and are always interpreted in absolute scene coordinates.
 *
 * ### Debug
 * Use `debug` while tuning a generator or diagnosing why particles are not spawning as expected. It is optional and
 * should usually be disabled in final effects.
 * - `debug: true` enables spawn and recycle counters.
 * - `debug.stats: true` enables `generator.debugStats`.
 * - `debug.profile: true` also records the most recent update, spawn, and tick timings.
 * - `debug.tint: true` gives each spawned particle a random tint.
 * - `debug.tint: {mode: "palette", palette: [0xFFAA00, 0x66CCFF]}` tints particles from a palette.
 * - `debug.tint: {mode: "byTexture"}` gives each texture a stable debug color.
 * - `debug.useWhiteTexture: true` falls back to `PIXI.Texture.WHITE` when no textures are configured.
 *
 * ```js
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   count: 100,
 *   spawnRate: 300,
 *   area: {x: 1200, y: 900, radius: 180},
 *   debug: {
 *     stats: true,
 *     profile: true,
 *     tint: {mode: "byTexture"},
 *     useWhiteTexture: true
 *   }
 * });
 * gen.start({spawn: 100});
 *
 * console.table(gen.debugStats);
 * ```
 *
 * ## Performance tips
 * - Preload textures before creating the generator.
 * - Prefer calling `spawnParticle()` or `spawnParticles()` with no options when you can. It avoids per-spawn object
 *   allocations.
 * - Keep `positionTest` cheap. It runs in a hot path.
 * - Prefer batchable shaders for sustained effects. Direct-render shaders are best kept to smaller particle counts.
 * - Avoid blur unless you really need it (pre-blurred textures are better).
 *
 * ## Practical limits
 * ParticleGenerator is meant for local, short-lived effects (bursts, embers, motes, small auras),
 * not for filling the entire scene with massive particle counts. If you push it into many thousands of active
 * particles, performance could degrade quickly. In practice, you'll get better results by using moderate counts,
 * short lifetimes, and small spawn areas, and by stopping the effect when it's no longer needed.
 *
 * Texture size also matters. Large particle textures (or heavy blur) increase pixel work,
 * especially with additive/screen blends and overdraw, which can become fill-rate bound on some GPUs.
 * Prefer small textures (and sprite sheets!), keep particle sizes reasonable on screen, and avoid expensive full-screen
 * coverage when you only need a local effect.
 *
 * ## Examples
 *
 * @example
 * ### 1) Ambient leaves (steady density in view)
 * Use this for soft, always-on atmospheric particles.
 * ```js
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "ambient",
 *   textures: [
 *     "ui/particles/leaf1.png",
 *     "ui/particles/leaf2.png",
 *     "ui/particles/leaf3.png",
 *     "ui/particles/leaf4.png",
 *     "ui/particles/leaf5.png",
 *     "ui/particles/leaf6.png"
 *   ],
 *   blend: PIXI.BLEND_MODES.NORMAL,
 *   count: 300,
 *   viewPadding: 0.25,
 *   lifetime: [1200, 2200],
 *   fade: {in: 0.15, out: 0.25},
 *   velocity: {x: [-5, 5], y: [-10, -30]},
 *   alpha: [0.2, 0.4],
 *   scale: [0.35, 0.85]
 * });
 * gen.start();
 * ```
 *
 * ### 2) Ambient snow (padding + random age)
 * Great for snowfall that looks continuous when you pan the camera.
 * ```js
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "ambient",
 *   textures: ["ui/particles/snow.png"],
 *   count: 400,
 *   viewPadding: 0.3,
 *   randomizeAgeInPadding: true,
 *   lifetime: [2500, 4500],
 *   fade: {in: 0.2, out: 0.2},
 *   velocity: {x: [-8, 8], y: [25, 55]},
 *   alpha: [0.12, 0.25],
 *   scale: [0.3, 0.9],
 *   blend: PIXI.BLEND_MODES.SCREEN
 * });
 * gen.start();
 * ```
 *
 * ### 3) Manual burst at a point (effect mode)
 * Use this for clicks, impacts, or quick one-shot effects.
 * ```js
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   manual: true,
 *   textures: ["ui/particles/snow.png"],
 *   lifetime: [450, 900],
 *   fade: {in: 0.05, out: 0.4},
 *   velocity: {speed: [80, 200], angle: [0, 360]},
 *   alpha: [0.4, 0.8],
 *   scale: [0.3, 0.8]
 * });
 * gen.start();
 *
 * // Spawn a burst at {x,y}
 * const p = {x: 1000, y: 800};
 * gen.spawnParticles(120, {position: p});
 * ```
 *
 * ### 4) Anchored emitter (leaves around a token)
 * Use this for a continuous local effect attached to a moving object.
 * ```js
 * const token = canvas.tokens.controlled[0];
 * const area = {radius: 70}; // relative to anchor, no x/y needed
 *
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   anchor: token,
 *   anchorPoint: "center",
 *   area,
 *   count: 120,
 *   spawnRate: 90,
 *   elevation: token.document.elevation ?? 0,
 *   textures: [
 *     "ui/particles/leaf1.png",
 *     "ui/particles/leaf2.png",
 *     "ui/particles/leaf3.png",
 *     "ui/particles/leaf4.png",
 *     "ui/particles/leaf5.png",
 *     "ui/particles/leaf6.png"
 *   ],
 *   lifetime: [450, 900],
 *   fade: {in: 0.05, out: 0.4},
 *   velocity: {x: [-160, 160], y: [-160, 160]},
 *   rotation: {speed: 180},
 *   alpha: [0.5, 0.75],
 *   scale: [0.25, 0.75],
 *   blend: PIXI.BLEND_MODES.NORMAL
 * });
 * gen.start();
 * ```
 *
 * ### 5) Custom onTick spawning (leaves around a token)
 * Use this when custom logic decides whether the generator should spawn during a tick.
 * ```js
 * const token = canvas.tokens.controlled[0];
 * let spawnBudget = 0;
 *
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   manual: true,
 *   anchor: token,
 *   anchorPoint: "center",
 *   area: {radius: 80},
 *   count: 120,
 *   textures: [
 *     "ui/particles/leaf1.png",
 *     "ui/particles/leaf2.png",
 *     "ui/particles/leaf3.png"
 *   ],
 *   lifetime: [700, 1300],
 *   fade: {in: 0.1, out: 0.35},
 *   velocity: {x: [-90, 90], y: [-120, -20]},
 *   alpha: [0.35, 0.7],
 *   scale: [0.25, 0.65],
 *   onTick: (dt, generator) => {
 *     if ( !token?.visible ) return;
 *     const available = generator.adjustedMaxParticles - generator.particles.length;
 *     if ( available <= 0 ) return;
 *     spawnBudget += 45 * dt * 0.001;
 *     const n = Math.min(Math.floor(spawnBudget), available);
 *     if ( n <= 0 ) return;
 *     spawnBudget -= n;
 *     generator.spawnParticles(n);
 *   }
 * });
 * gen.start();
 * ```
 *
 * ### 6) Spawn-position direction toward a focal point
 * Use `velocity.fn` when each particle direction depends on where it spawned.
 * ```js
 * const dims = canvas.scene.dimensions;
 * const bounds = new PIXI.Rectangle(dims.sceneX, dims.sceneY, dims.sceneWidth, dims.sceneHeight);
 * const focal = {x: 1200, y: 900};
 * const focalLocal = {x: focal.x - bounds.x, y: focal.y - bounds.y};
 *
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   manual: true,
 *   bounds,
 *   textures: ["ui/particles/snow.png"],
 *   area: {x: focal.x, y: focal.y, innerRadius: 180, outerRadius: 260},
 *   lifetime: [700, 1100],
 *   fade: {in: 0.1, out: 0.3},
 *   alpha: [0.4, 0.9],
 *   scale: [0.3, 0.7],
 *   velocity: {
 *     fn: (p, dt, out) => {
 *       if ( p.time === 0 ) {
 *         let dx = focalLocal.x - p.x;
 *         let dy = focalLocal.y - p.y;
 *
 *         const distance = Math.hypot(dx, dy) || 1;
 *         dx /= distance;
 *         dy /= distance;
 *
 *         const speed = 260;
 *         p.focalVelocityX = dx * speed;
 *         p.focalVelocityY = dy * speed;
 *       }
 *
 *       out.x = p.focalVelocityX;
 *       out.y = p.focalVelocityY;
 *     }
 *   }
 * });
 * gen.start({spawn: 120});
 * ```
 *
 * ### 7) Direction evolving over lifetime (spiral)
 * Use `velocity.fn` when `particle.time` should bend the path during update.
 * ```js
 * const dims = canvas.scene.dimensions;
 * const bounds = new PIXI.Rectangle(dims.sceneX, dims.sceneY, dims.sceneWidth, dims.sceneHeight);
 * const origin = {x: 1200, y: 900};
 * const originLocal = {x: origin.x - bounds.x, y: origin.y - bounds.y};
 *
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   manual: true,
 *   bounds,
 *   textures: ["ui/particles/snow.png"],
 *   area: {x: origin.x, y: origin.y, radius: 40},
 *   lifetime: [900, 1300],
 *   fade: {in: 0.1, out: 0.35},
 *   alpha: [0.35, 0.8],
 *   scale: {min: 0.35, max: 0.7, curve: [{time: 0, value: 1}, {time: 1, value: 0.35}]},
 *   velocity: {
 *     fn: (p, dt, out) => {
 *       let dx = p.x - originLocal.x;
 *       let dy = p.y - originLocal.y;
 *
 *       const distance = Math.hypot(dx, dy) || 1;
 *       dx /= distance;
 *       dy /= distance;
 *
 *       const radial = 90 + (180 * p.time);
 *       const tangent = 240 * (1 - (0.35 * p.time));
 *       out.x = (dx * radial) + (-dy * tangent);
 *       out.y = (dy * radial) + (dx * tangent);
 *     }
 *   }
 * });
 * gen.start({spawn: 90});
 * ```
 *
 * ### 8) Keep particles inside a rectangle (wrap)
 * Use this for localized ambient effects in a region.
 * ```js
 * const zone = new PIXI.Rectangle(900, 700, 600, 400);
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   count: 250,
 *   spawnRate: 180,
 *   area: zone,
 *   constraintMode: "wrap",
 *   constraintArea: zone,
 *   textures: ["ui/particles/snow.png"],
 *   lifetime: [1200, 2200],
 *   fade: {in: 0.2, out: 0.2},
 *   velocity: {x: [-20, 20], y: [-10, 10]},
 *   alpha: [0.1, 0.25],
 *   scale: [0.4, 0.9]
 * });
 * gen.start({spawn: 250});
 * ```
 *
 * ### 9) Bounce inside bounds (arcade-style)
 * Great for “energy balls” in a box or magic motes in a bounded area.
 * ```js
 * const zone = new PIXI.Rectangle(900, 700, 600, 400);
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   count: 80,
 *   spawnRate: 60,
 *   area: zone,
 *   constraintMode: "bounce",
 *   constraintArea: zone,
 *   restitution: 0.9,
 *   textures: ["ui/particles/snow.png"],
 *   lifetime: [2000, 4000],
 *   fade: {in: 0.15, out: 0.25},
 *   velocity: {x: [-120, 120], y: [-120, 120]},
 *   alpha: [0.25, 0.6],
 *   scale: [0.5, 1.0],
 *   blend: PIXI.BLEND_MODES.SCREEN
 * });
 * gen.start({spawn: 80});
 * ```
 *
 * ### 10) Use a clip mask (hard visual boundary)
 * Use this when you need a strict rectangle cutout.
 * ```js
 * const clipRect = new PIXI.Rectangle(900, 700, 600, 400);
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   count: 300,
 *   spawnRate: 120,
 *   area: clipRect,
 *   clip: clipRect,
 *   textures: ["ui/particles/snow.png"],
 *   lifetime: [2000, 4000],
 *   fade: {in: 0.2, out: 0.2},
 *   velocity: {x: [-10, 10], y: [-10, 10]},
 *   alpha: [0.08, 0.18],
 *   scale: [0.8, 1.6],
 *   blend: PIXI.BLEND_MODES.SCREEN
 * });
 * gen.start({spawn: 300});
 * ```
 *
 * ### 11) Multiple textures + additive blend (magic leaves)
 * Use this for “sparkly” looks with layered variation.
 * ```js
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   count: 150,
 *   spawnRate: 90,
 *   area: {x: 1200, y: 900, radius: 250},
 *   textures: [
 *     "ui/particles/leaf1.png",
 *     "ui/particles/leaf2.png",
 *     "ui/particles/leaf3.png",
 *     "ui/particles/leaf4.png",
 *     "ui/particles/leaf5.png",
 *     "ui/particles/leaf6.png"
 *   ],
 *   blend: PIXI.BLEND_MODES.SCREEN,
 *   lifetime: [1500, 2600],
 *   fade: {in: 0.2, out: 0.35},
 *   velocity: {speed: [5, 20], angle: [0, 360]},
 *   rotation: {speed: 45},
 *   alpha: [0.15, 0.45],
 *   scale: [0.3, 0.8]
 * });
 * gen.start({spawn: 150});
 * ```
 *
 * ### 12) Force a specific texture per spawn
 * Useful when you want a rare “special” particle occasionally.
 * ```js
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   manual: true,
 *   textures: [
 *     "ui/particles/leaf1.png",
 *     "ui/particles/leaf2.png",
 *     "ui/particles/leaf3.png",
 *     "ui/particles/leaf4.png",
 *     "ui/particles/leaf5.png",
 *     "ui/particles/leaf6.png"
 *   ]
 * });
 * gen.start();
 * gen.spawnParticle({texture: "ui/particles/snow.png", position: {x: 1200, y: 900}});
 * ```
 *
 * ### 13) Spawn into a temporary override area
 * Use this to reuse one generator for multiple nearby spawns without rebuilding it.
 * ```js
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   manual: true,
 *   textures: ["ui/particles/snow.png"],
 *   lifetime: [500, 900]
 * });
 *
 * // Start the generator
 * gen.start();
 *
 * const r1 = new PIXI.Rectangle(900, 700, 200, 200);
 * const r2 = new PIXI.Rectangle(1500, 700, 200, 200);
 * gen.spawnParticles(50, {area: r1});
 * gen.spawnParticles(50, {area: r2});
 *
 * // Stop the generator (soft stop by default)
 * gen.stop()
 * ```
 *
 * ### 14) Use a custom batch shader
 * Assume `MySparkleSamplerShader` is a `BaseSamplerShader` subclass whose batch plugin was already registered.
 * ```js
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   count: 120,
 *   spawnRate: 120,
 *   area: {x: 1200, y: 900, radius: 180},
 *   textures: ["ui/particles/snow.png"],
 *   shaderClass: MySparkleSamplerShader,
 *   lifetime: [900, 1600],
 *   fade: {in: 0.15, out: 0.3},
 *   velocity: {speed: [10, 45], angle: [0, 360]},
 *   alpha: [0.2, 0.5],
 *   scale: [0.25, 0.7],
 *   onSpawn: p => {
 *     p.sparklePhase = Math.random() * (Math.PI * 2);
 *     p.sparkleStrength = Math.mix(0.5, 1.0, Math.random());
 *   }
 * });
 * gen.start({spawn: 120});
 * ```
 *
 * ### 15) Use a simple BaseShapeData source area (interior)
 * BaseShapeData source objects can be passed directly as areas. A simple shape, such as a circle, uses the shape's
 * optimized point sampler after construction.
 * ```js
 * const area = {type: "circle", x: 1200, y: 900, radius: 160};
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   count: 100,
 *   spawnRate: 120,
 *   area,
 *   sampleMode: "interior",
 *   textures: ["ui/particles/snow.png"],
 *   lifetime: [800, 1400],
 *   fade: {in: 0.15, out: 0.3},
 *   velocity: {speed: [5, 25], angle: [0, 360]},
 *   alpha: [0.15, 0.4],
 *   scale: [0.3, 0.8],
 *   blend: PIXI.BLEND_MODES.SCREEN
 * });
 * gen.start({spawn: 100});
 * ```
 *
 * ### 16) Use a complex BaseShapeData area (boundary)
 * On a gridded scene, GridShapeData can represent a union of multiple grid spaces. The resulting geometry is sampled
 * through its PolygonTree, which is useful for complex boundaries.
 * ```js
 * const origin = canvas.grid.getOffset({x: 1200, y: 900});
 * const area = new foundry.data.GridShapeData({
 *   offsets: [
 *     origin,
 *     {i: origin.i + 1, j: origin.j},
 *     {i: origin.i + 1, j: origin.j + 1},
 *     {i: origin.i + 2, j: origin.j + 1}
 *   ]
 * }, {parent: canvas.scene});
 *
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   count: 120,
 *   spawnRate: 120,
 *   area,
 *   sampleMode: "boundary",
 *   textures: ["ui/particles/snow.png"],
 *   lifetime: [900, 1600],
 *   fade: {in: 0.1, out: 0.35},
 *   velocity: {speed: [15, 45], angle: [0, 360]},
 *   alpha: [0.2, 0.55],
 *   scale: [0.25, 0.7],
 *   blend: PIXI.BLEND_MODES.SCREEN
 * });
 * gen.start({spawn: 120});
 * ```
 *
 * ### 17) Continuous spray with over-life curves
 * Use `spawnRate` and over-life curves for effects that accelerate, shrink, or fade without custom callbacks.
 * ```js
 * const gen = new foundry.canvas.animation.ParticleGenerator({
 *   mode: "effect",
 *   count: 220,
 *   spawnRate: 180,
 *   area: {from: {x: 900, y: 700}, to: {x: 1300, y: 760}},
 *   textures: ["ui/particles/spray.png"],
 *   lifetime: [900, 1300],
 *   velocity: {
 *     angle: [70, 110],
 *     speed: {min: 525, max: 700, curve: [{time: 0, value: 1}, {time: 1, value: 0.2}]}
 *   },
 *   rotation: {
 *     speed: {min: -120, max: 120, curve: [{time: 0, value: 1}, {time: 1, value: 0.25}]}
 *   },
 *   alpha: {
 *     min: 0.45,
 *     max: 0.8,
 *     curve: [{time: 0, value: 0}, {time: 0.15, value: 1}, {time: 1, value: 0}]
 *   },
 *   scale: {min: 0.48, max: 0.8, curve: [{time: 0, value: 1.4}, {time: 1, value: 0.25}]},
 *   tint: {
 *     curve: [{time: 0, value: 0x66CCFF}, {time: 0.65, value: 0xFFFFFF}, {time: 1, value: 0x4F6DFF}]
 *   }
 * });
 * gen.start();
 * ```
 */
export default class ParticleGenerator {
    /**
     * Default generator config.
     * @type {ParticleGeneratorConfiguration}
     */
    static DEFAULT_OPTIONS: ParticleGeneratorConfiguration;
    /**
     * Compute the average particle lifetime from a raw lifetime config value.
     * Used at construction time for steady-state budget validation.
     * @param {number|number[]|{min: number, max: number}} v
     * @returns {number}
     */
    static "__#33@#computeAvgLifetime"(v: number | number[] | {
        min: number;
        max: number;
    }): number;
    /**
     * Generate a deterministic, reasonably bright debug color for an index
     * @param {number} i
     * @returns {number}
     */
    static "__#33@#debugColorForIndex"(i: number): number;
    /**
     * @param {ParticleGeneratorConfiguration} [config]
     */
    constructor(config?: ParticleGeneratorConfiguration | undefined);
    /**
     * The runtime mode.
     * @type {ParticleGeneratorMode}
     */
    mode: ParticleGeneratorMode;
    /**
     * The parent container which receives the internal particle container.
     * @type {PIXI.Container}
     */
    container: PIXI.Container;
    /**
     * An optional anchor used to attach areas and behaviors.
     * @type {ParticleGeneratorAnchor}
     */
    anchor: ParticleGeneratorAnchor;
    /**
     * Which point to use when anchoring.
     * @type {ParticleGeneratorAnchorPoint}
     */
    anchorPoint: ParticleGeneratorAnchorPoint;
    /**
     * A fixed offset (scene pixels) applied to the anchor.
     * @type {{x: number, y: number}|null}
     */
    anchorOffset: {
        x: number;
        y: number;
    } | null;
    /**
     * The configured particle textures.
     * @type {PIXI.Texture[]}
     */
    textures: PIXI.Texture[];
    /**
     * An optional sprite anchor override for all particles.
     * @type {{x: number, y: number}|null}
     */
    particleAnchor: {
        x: number;
        y: number;
    } | null;
    /**
     * The shader class used to render particles.
     * @type {typeof BaseSamplerShader}
     */
    shaderClass: typeof BaseSamplerShader;
    /**
     * Viewport-related behavior (used primarily in ambient mode).
     * @type {{padding: number, newlyVisible: boolean, randomizeAgeInPadding: boolean}}
     */
    viewport: {
        padding: number;
        newlyVisible: boolean;
        randomizeAgeInPadding: boolean;
    };
    /**
     * The target particle count.
     * @type {number}
     */
    maxParticles: number;
    /**
     * The initial proportion (0..1) of the computed target particle count to spawn on start.
     * @type {number}
     */
    initialBatch: number;
    /**
     * If true, particles are never spawned automatically.
     * @type {boolean}
     */
    manualSpawning: boolean;
    /**
     * The chance (0..1) that a spawn attempt actually creates a particle.
     * @type {number}
     */
    spawnProbability: number;
    /**
     * An optional spawn validator.
     * @type {ParticleGeneratorPositionTest|null}
     */
    positionTest: ParticleGeneratorPositionTest | null;
    /**
     * Which part of the spawn area to sample.
     * @type {ParticleGeneratorAreaSampleMode}
     */
    sampleMode: ParticleGeneratorAreaSampleMode;
    /**
     * Out-of-bounds constraint configuration.
     * @type {{
     *   mode: ParticleGeneratorConstraintMode,
     *   area: "budget"|"view"|"world"|PIXI.Rectangle|null,
     *   restitution: number
     * }}
     */
    constraints: {
        mode: ParticleGeneratorConstraintMode;
        area: "budget" | "view" | "world" | PIXI.Rectangle | null;
        restitution: number;
    };
    /**
     * Clip (mask) options for the default clip behavior.
     * @type {{enabled: boolean|null, rect: PIXI.Rectangle|null}}
     */
    clip: {
        enabled: boolean | null;
        rect: PIXI.Rectangle | null;
    };
    /**
     * The particle lifetime configuration in milliseconds.
     * @type {number|number[]|{min: number, max: number}}
     */
    particleLifetime: number | number[] | {
        min: number;
        max: number;
    };
    /**
     * The fade-in duration in milliseconds, or a fraction of lifetime if 0 < value < 1.
     * @type {number}
     */
    fadeInDuration: number;
    /**
     * The fade-out duration in milliseconds, or a fraction of lifetime if 0 < value < 1.
     * @type {number}
     */
    fadeOutDuration: number;
    /**
     * The blend mode used to render particles.
     * @type {PIXI.BLEND_MODES}
     */
    blendMode: PIXI.BLEND_MODES;
    /**
     * Resolved rotation configuration for particles.
     * @type {{alignVelocity: boolean, initial: number, spread: number, speed: {min: number, max: number}}}
     */
    rotation: {
        alignVelocity: boolean;
        initial: number;
        spread: number;
        speed: {
            min: number;
            max: number;
        };
    };
    /**
     * The velocity configuration used to generate per-particle movement.
     * @type {ParticleGeneratorVelocityOptions|null}
     */
    velocity: ParticleGeneratorVelocityOptions | null;
    /**
     * Optional random drift configuration.
     * @type {{enabled: boolean, intensity: number}}
     */
    drift: {
        enabled: boolean;
        intensity: number;
    };
    /**
     * Optional blur filter options applied to the internal container.
     * @type {{enabled: boolean, intensity: number, quality: number|undefined}|null}
     */
    blurOptions: {
        enabled: boolean;
        intensity: number;
        quality: number | undefined;
    } | null;
    /**
     * The elevation for the particle container.
     * @type {number}
     */
    elevation: number;
    /**
     * The sorting key for the particle container.
     * @type {number}
     */
    sort: number;
    /**
     * Orbit behavior options.
     * @type {ParticleGeneratorOrbitOptions}
     */
    orbit: ParticleGeneratorOrbitOptions;
    /**
     * Follow behavior options.
     * @type {ParticleGeneratorFollowOptions}
     */
    follow: ParticleGeneratorFollowOptions;
    /**
     * An optional callback called after the particle has been placed and configured.
     * @type {ParticleGeneratorParticleCallback|null}
     */
    onSpawn: ParticleGeneratorParticleCallback | null;
    /**
     * An optional callback called each frame for each live particle.
     * @type {ParticleGeneratorParticleCallback|null}
     */
    onUpdate: ParticleGeneratorParticleCallback | null;
    /**
     * An optional callback called when a particle is recycled.
     * @type {ParticleGeneratorDeathCallback|null}
     */
    onDeath: ParticleGeneratorDeathCallback | null;
    /**
     * An optional callback called one time per frame (not per particle!).
     * @type {ParticleGeneratorTickCallback|null}
     */
    onTick: ParticleGeneratorTickCallback | null;
    /**
     * The computed target particle count based on visible area (ambient mode) or the configured budget (effect mode).
     * @type {number}
     */
    adjustedMaxParticles: number;
    /**
     * The currently active particle instances.
     * @type {ParticleMesh[]}
     */
    particles: ParticleMesh[];
    /**
     * A pool of recycled particles ready to be reused.
     * @type {ParticleMesh[]}
     */
    particlePool: ParticleMesh[];
    /**
     * Generator bounds in scene coordinates.
     * @type {PIXI.Rectangle}
     * @protected
     */
    protected _bounds: PIXI.Rectangle;
    /**
     * The configured default spawn area (effect mode).
     * This area is defined in scene coordinates and may be interpreted relative to an anchor.
     * {@link foundry.data.BaseShapeData} instances and source data are always interpreted in absolute scene coordinates.
     * Shape source data is converted to a {@link foundry.data.BaseShapeData} instance.
     * Re-read each frame, so it can be replaced or its values mutated at runtime to animate the spawn region.
     * @type {ParticleGeneratorArea|null}
     */
    spawnArea: ParticleGeneratorArea | null;
    /**
     * Optional custom constraint rectangle in local coordinates.
     * @type {PIXI.Rectangle|null}
     * @protected
     */
    protected _constraintRect: PIXI.Rectangle | null;
    /**
     * Whether the generator is soft-stopped.
     * @type {boolean}
     * @protected
     */
    protected _stopped: boolean;
    /**
     * Whether the update callback is attached to the ticker.
     * @type {boolean}
     * @protected
     */
    protected _tickerAttached: boolean;
    /**
     * Whether the generator has spawned its initial batch.
     * @type {boolean}
     * @protected
     */
    protected _initialized: boolean;
    /**
     * The internal container which holds all particles.
     * @type {PrimaryCanvasParticleContainer|null}
     * @protected
     */
    protected _particlesContainer: PrimaryCanvasParticleContainer | null;
    /**
     * The display object used to mask particle rendering.
     * @type {PIXI.DisplayObject|null}
     * @protected
     */
    protected _mask: PIXI.DisplayObject | null;
    /**
     * The blur filter applied to the internal container, if any.
     * @type {PIXI.Filter|null}
     * @protected
     */
    protected _blurFilter: PIXI.Filter | null;
    /**
     * The local-space viewport rectangle without padding.
     * @type {PIXI.Rectangle}
     * @protected
     */
    protected _viewRectLocal: PIXI.Rectangle;
    /**
     * The local-space viewport rectangle with padding.
     * @type {PIXI.Rectangle}
     * @protected
     */
    protected _budgetRectLocal: PIXI.Rectangle;
    /**
     * The local-space generator bounds.
     * @type {PIXI.Rectangle}
     * @protected
     */
    protected _worldRectLocal: PIXI.Rectangle;
    /**
     * The previous-frame budget rectangle.
     * @type {PIXI.Rectangle}
     * @protected
     */
    protected _oldBudgetRectLocal: PIXI.Rectangle;
    /**
     * Whether the previous-frame budget rectangle is initialized.
     * @type {boolean}
     * @protected
     */
    protected _hasOldBudgetRectLocal: boolean;
    /**
     * A fixed pool of rectangles used to describe newly visible areas.
     * @type {PIXI.Rectangle[]}
     * @protected
     */
    protected _newlyVisibleAreaPool: PIXI.Rectangle[];
    /**
     * The list of newly visible areas for the current frame in local coordinates.
     * @type {PIXI.Rectangle[]}
     * @protected
     */
    protected _newlyVisibleAreas: PIXI.Rectangle[];
    /**
     * The current anchor position in scene coordinates.
     * @type {PIXI.Point}
     * @protected
     */
    protected _anchorScene: PIXI.Point;
    /**
     * The current anchor position in local coordinates.
     * @type {PIXI.Point}
     * @protected
     */
    protected _anchorLocal: PIXI.Point;
    /**
     * The active behavior implementation.
     * @type {ParticleGeneratorBehavior|null}
     * @protected
     */
    protected _behavior: ParticleGeneratorBehavior | null;
    /**
     * A cached context object passed to behavior hooks.
     * @type {object}
     * @protected
     */
    protected _behaviorContext: object;
    /**
     * Temp point used to avoid per-frame allocations.
     * @type {PIXI.Point}
     * @protected
     */
    protected _tlScreen: PIXI.Point;
    /**
     * Temp point used to avoid per-frame allocations.
     * @type {PIXI.Point}
     * @protected
     */
    protected _brScreen: PIXI.Point;
    /**
     * Temp point used to avoid per-frame allocations.
     * @type {PIXI.Point}
     * @protected
     */
    protected _tlLocal: PIXI.Point;
    /**
     * Temp point used to avoid per-frame allocations.
     * @type {PIXI.Point}
     * @protected
     */
    protected _brLocal: PIXI.Point;
    /**
     * Temp point used to sample shape-based spawn areas.
     * @type {PIXI.Point}
     * @protected
     */
    protected _spawnPoint: PIXI.Point;
    /**
     * A function which generates per-particle movement speed vectors.
     * @type {(out: PIXI.Point, particle: ParticleMesh) => void}
     * @protected
     */
    protected _generateMovementSpeed: (out: PIXI.Point, particle: ParticleMesh) => void;
    /**
     * Normalized debug options.
     * @type {ParticleGeneratorDebugOptions|null}
     * @protected
     */
    protected _debug: ParticleGeneratorDebugOptions | null;
    /**
     * Debug statistics and profiling output.
     * Null when debug stats are disabled.
     * @type {ParticleGeneratorDebugStats|null}
     * @protected
     */
    protected _debugStats: ParticleGeneratorDebugStats | null;
    /**
     * Whether profiling is enabled.
     * @type {boolean}
     * @protected
     */
    protected _debugProfile: boolean;
    /**
     * Cached debug tint options.
     * @type {{mode: ParticleGeneratorDebugTintMode, palette: number[]}|null}
     * @protected
     */
    protected _debugTint: {
        mode: ParticleGeneratorDebugTintMode;
        palette: number[];
    } | null;
    /**
     * A mapping from textures to deterministic tint values.
     * @type {WeakMap<PIXI.Texture, number>|null}
     * @protected
     */
    protected _debugTintByTexture: WeakMap<PIXI.Texture, number> | null;
    /**
     * The bounding rectangle of the generator in scene coordinates.
     * Used to convert between local particle coordinates and scene coordinates.
     * @type {PIXI.Rectangle}
     */
    get bounds(): PIXI.Rectangle;
    /**
     * The PIXI container that holds all particle display objects.
     * @type {PIXI.Container|null}
     */
    get particlesContainer(): any;
    /**
     * The current unpadded viewport rectangle in the generator's local space.
     * @type {PIXI.Rectangle}
     */
    get viewRectLocal(): PIXI.Rectangle;
    /**
     * The current padded viewport rectangle used for budget/spawning in ambient mode.
     * @type {PIXI.Rectangle}
     */
    get budgetRectLocal(): PIXI.Rectangle;
    set spawnRate(value: number);
    /**
     * The maximum number of particles that may be spawned per second (auto-spawn mode).
     * @type {number}
     */
    get spawnRate(): number;
    set mask(value: any);
    /**
     * The mask applied to the particle container. Set to null to remove the mask.
     * The generator does not manage the lifecycle of externally assigned masks.
     * @type {PIXI.DisplayObject|null}
     */
    get mask(): any;
    /**
     * Debug statistics and profiling output.
     * Returns null if {@link ParticleGeneratorDebugOptions#stats} is not enabled.
     *
     * Note: This getter returns a stable object reference and updates the live values (active/pool/target)
     * on access.
     * @type {ParticleGeneratorDebugStats|null}
     */
    get debugStats(): ParticleGeneratorDebugStats | null;
    /**
     * Start the generator, create the update loop and optionally spawn an initial batch.
     * @param {object} [options]
     * @param {number} [options.spawn=0] Spawn this many particles immediately after starting.
     *                                   If {@link ParticleGenerator#manualSpawning} is false, this is capped
     *                                   to the remaining budget (target - active).
     */
    start(options?: {
        spawn?: number | undefined;
    } | undefined): void;
    /**
     * Stop the generator.
     * @param {object} [options]
     * @param {boolean} [options.hard=false] If true, detach the update loop and destroy internal resources.
     *                                       If false, stop spawning and let existing particles expire naturally.
     */
    stop({ hard }?: {
        hard?: boolean | undefined;
    } | undefined): void;
    /**
     * Spawn a single particle.
     * In "ambient" mode, the default spawn area is the current padded viewport rectangle.
     * In "effect" mode, the default spawn area is the configured {@link ParticleGeneratorArea}.
     * @param {object} [options]
     * @param {PIXI.Texture|string} [options.texture] A texture (or texture source string) to force for this particle.
     * @param {ParticleGeneratorAreaSampleMode} [options.sampleMode] Which part of the spawn area to sample.
     *   Defaults to the configured generator sample mode.
     * @param {ParticleGeneratorArea|null} [options.area] An optional spawn area override.
     *       Interpreted the same as the configured area (scene coordinates, or relative-to-anchor when anchored).
     * @param {PIXI.Point|{x: number, y: number}|null} [options.position] An optional explicit spawn position.
     *   Coordinates are in scene space.
     * @returns {ParticleMesh|null}
     */
    spawnParticle({ texture, sampleMode, area, position }?: {
        texture?: PIXI.Texture | string;
        sampleMode?: ParticleGeneratorAreaSampleMode | undefined;
        area?: ParticleGeneratorArea | null;
        position?: PIXI.Point | {
            x: number;
            y: number;
        } | null;
    } | undefined): ParticleMesh | null;
    /**
     * Spawn multiple particles.
     * @param {number} count The number of particles to spawn.
     * @param {object} [options]
     * @param {PIXI.Texture|string} [options.texture] A texture (or texture source string) to force for this burst.
     * @param {ParticleGeneratorAreaSampleMode} [options.sampleMode] Which part of the spawn area to sample.
     *   Defaults to the configured generator sample mode.
     * @param {ParticleGeneratorArea|null} [options.area] An optional spawn area override.
     *       Interpreted the same as the configured area (scene coordinates, or relative-to-anchor when anchored).
     * @param {ParticleGeneratorPoint|null} [options.position] An optional explicit spawn position (scene coordinates).
     * @returns {number} The number of successfully spawned particles.
     */
    spawnParticles(count: number, { texture, sampleMode, area, position }?: {
        texture?: PIXI.Texture | string;
        sampleMode?: ParticleGeneratorAreaSampleMode | undefined;
        area?: ParticleGeneratorArea | null;
        position?: ParticleGeneratorPoint | null;
    } | undefined): number;
    /**
     * Migrate deprecated configuration options.
     * @param {ParticleGeneratorConfiguration} config  The user-provided configuration object.
     * @param {ParticleGeneratorConfiguration} cfg     The prepared configuration object.
     * @protected
     */
    protected _migrateConfig(config: ParticleGeneratorConfiguration, cfg: ParticleGeneratorConfiguration): void;
    /**
     * Apply the configuration to the ParticleGenerator instance.
     * @param {ParticleGeneratorConfiguration} cfg   The configuration object.
     * @protected
     */
    protected _configureOptions(cfg: ParticleGeneratorConfiguration): void;
    /**
     * Configure optional debug helpers.
     * This feature set is fully opt-in and is designed to have near-zero overhead when disabled.
     * @param {ParticleGeneratorDebugOptions|boolean|null|undefined} debug
     * @protected
     */
    protected _configureDebug(debug: ParticleGeneratorDebugOptions | boolean | null | undefined): void;
    /**
     * Initialize behaviors from the configuration object.
     * @param {ParticleGeneratorConfiguration} cfg
     * @protected
     */
    protected _initializeBehaviors(cfg: ParticleGeneratorConfiguration): void;
    /**
     * Initialize cached generators from the configuration object.
     * @param {ParticleGeneratorConfiguration} _cfg
     * @protected
     */
    protected _initializeCachedGenerators(_cfg: ParticleGeneratorConfiguration): void;
    /**
     * Compute the current viewport rectangles and target particle count.
     * All rectangles are in the local coordinate space of the internal container.
     * @protected
     */
    protected _calculateGeneratorProperties(): void;
    /**
     * Compute the portions of newRect that were not visible in oldRect.
     * This method reuses a fixed pool of rectangles to avoid per-frame allocations.
     * @param {PIXI.Rectangle} oldRect
     * @param {PIXI.Rectangle} newRect
     * @protected
     */
    protected _computeNewlyVisibleAreas(oldRect: PIXI.Rectangle, newRect: PIXI.Rectangle): void;
    /**
     * Spawn the initial particle batch.
     * In ambient mode, particle ages are randomized so the scene appears pre-settled.
     */
    _initializeParticles(): void;
    /**
     * Ticker callback.
     * @protected
     */
    protected _onTick(): void;
    /**
     * Update all active particles.
     * @param {number} dt Delta time in milliseconds.
     * @protected
     */
    protected _updateExistingParticles(dt: number): void;
    /**
     * Update particles without constraints.
     * @param {number} dt Delta time in milliseconds.
     * @param {number} ds Delta time in seconds.
     * @param {object[]} particles
     * @param {ParticleGeneratorBehavior|null} behavior
     * @param {object|null} bctx
     * @protected
     */
    protected _updateParticlesUnconstrained(dt: number, ds: number, particles: object[], behavior: ParticleGeneratorBehavior | null, bctx: object | null): void;
    /**
     * Update particles with constraints applied.
     * @param {number} dt
     * @param {number} ds
     * @param {PIXI.Rectangle} bounds
     * @param {ParticleMesh[]} particles
     * @param {ParticleGeneratorBehavior|null} behavior
     * @param {object|null} bctx
     * @param {ParticleGeneratorConstraintMode} mode
     * @protected
     */
    protected _updateParticlesConstrained(dt: number, ds: number, bounds: PIXI.Rectangle, particles: ParticleMesh[], behavior: ParticleGeneratorBehavior | null, bctx: object | null, mode: ParticleGeneratorConstraintMode): void;
    /**
     * Spawn particles to move toward the current target count.
     * @protected
     */
    protected _autoSpawnParticles(): void;
    /**
     * Apply a random drift vector to a particle.
     * @param {ParticleMesh} particle
     * @protected
     */
    protected _applyRandomDrift(particle: ParticleMesh): void;
    /**
     * Create a new particle instance.
     * @param {PIXI.Texture} texture
     * @returns {ParticleMesh}
     * @protected
     */
    protected _createNewParticle(texture: PIXI.Texture): ParticleMesh;
    /**
     * Initialize/refresh base particle properties.
     * @param {ParticleMesh} particle
     */
    _setupParticleBase(particle: ParticleMesh): void;
    /**
     * Recycle a particle to the pool.
     * @param {ParticleMesh} particle
     * @param {string} reason
     * @protected
     */
    protected _recycleParticle(particle: ParticleMesh, reason: string): void;
    /**
     * Get a random texture from the configured set.
     * @returns {PIXI.Texture|null}
     * @protected
     */
    protected _getRandomTexture(): PIXI.Texture | null;
    /**
     * Get default bounds from the current scene dimensions.
     * @returns {PIXI.Rectangle}
     * @protected
     */
    protected _getDefaultBounds(): PIXI.Rectangle;
    /**
     * @deprecated since v14
     * @ignore
     */
    set maxParticlesPerFrame(value: number);
    /**
     * @deprecated since v14
     * @ignore
     */
    get maxParticlesPerFrame(): number;
    /**
     * @deprecated since v14
     * @ignore
     */
    set alphaRange(value: {
        min: number;
        max: number;
    });
    /**
     * @deprecated since v14
     * @ignore
     */
    get alphaRange(): {
        min: number;
        max: number;
    };
    /**
     * @deprecated since v14
     * @ignore
     */
    set scaleRange(value: {
        min: number;
        max: number;
    });
    /**
     * @deprecated since v14
     * @ignore
     */
    get scaleRange(): {
        min: number;
        max: number;
    };
    #private;
}
import type { ParticleGeneratorMode } from "./_types.mjs";
import type { ParticleGeneratorAnchor } from "./_types.mjs";
import BaseSamplerShader from "../rendering/shaders/samplers/base-sampler.mjs";
import type { ParticleGeneratorPositionTest } from "./_types.mjs";
import type { ParticleGeneratorAreaSampleMode } from "./_types.mjs";
import type { ParticleGeneratorConstraintMode } from "./_types.mjs";
import type { ParticleGeneratorVelocityOptions } from "./_types.mjs";
import type { ParticleGeneratorOrbitOptions } from "./_types.mjs";
import type { ParticleGeneratorFollowOptions } from "./_types.mjs";
import type { ParticleGeneratorParticleCallback } from "./_types.mjs";
import type { ParticleGeneratorDeathCallback } from "./_types.mjs";
import type { ParticleGeneratorTickCallback } from "./_types.mjs";
import type { ParticleMesh } from "./_types.mjs";
import type { ParticleGeneratorArea } from "./_types.mjs";
import PrimaryCanvasParticleContainer from "../primary/primary-canvas-particle-container.mjs";
import type { ParticleGeneratorBehavior } from "./_types.mjs";
import type { ParticleGeneratorDebugOptions } from "./_types.mjs";
import type { ParticleGeneratorDebugStats } from "./_types.mjs";
import type { ParticleGeneratorDebugTintMode } from "./_types.mjs";
import type { ParticleGeneratorPoint } from "./_types.mjs";
import type { ParticleGeneratorConfiguration } from "./_types.mjs";
