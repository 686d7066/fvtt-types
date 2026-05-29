/**
 * @import {KTX2Header, KTX2ParserInitOptions, KTX2ParserParseOptions, KTX2TranscodeTarget} from "./_types.mjs";
 */
/**
 * A KTX2 PIXI loader parser using the official Khronos KTX module.
 */
export default class KTX2Parser {
    /**
     * The default path to the Khronos libktx WebAssembly module.
     * @type {string}
     */
    static WASM_PATH: string;
    /**
     * The binary KTX2 identifier.
     * @type {number[]}
     */
    static "__#367@#IDENTIFIER": number[];
    /**
     * Map KTX2 GPU format identifiers to PIXI internal formats.
     * @type {Object<number, number>}
     */
    static "__#367@#KTX2_FORMAT_TO_INTERNAL_FORMAT": {
        [x: number]: number;
    };
    /**
     * Extension names used by the current WebGL compressed texture APIs.
     * @type {Object<string, string[]>}
     */
    static "__#367@#WEBGL_EXTENSIONS": {
        [x: string]: string[];
    };
    /**
     * A PIXI asset detection parser for KTX2 textures.
     * @type {object}
     */
    static detectKTX2: object;
    /**
     * A PIXI asset resolver for KTX2 texture URLs.
     * @type {object}
     */
    static resolveKTX2TextureUrl: object;
    /**
     * A PIXI asset loader parser for KTX2 textures.
     * @type {object}
     */
    static loadKTX2: object;
    /**
     * The initialized Khronos KTX module.
     * @type {object|null}
     */
    static "__#367@#module": object | null;
    /**
     * The pending Khronos KTX module initialization.
     * @type {Promise<object>|null}
     */
    static "__#367@#modulePromise": Promise<object> | null;
    /**
     * The initialized Khronos KTX module.
     * @type {object|null}
     */
    static get module(): object | null;
    /**
     * Has the Khronos KTX module been initialized?
     * @type {boolean}
     */
    static get initialized(): boolean;
    /**
     * Initialize the Khronos KTX module.
     * @param {KTX2ParserInitOptions} [options={}]  Initialization options.
     * @returns {Promise<object>}                   The initialized Khronos KTX module.
     */
    static initialize(options?: KTX2ParserInitOptions | undefined): Promise<object>;
    /**
     * Load a KTX2 URL as a PIXI compressed texture resource.
     * @param {string} url                           The texture URL.
     * @param {KTX2ParserParseOptions} [options]     Parser options.
     * @returns {Promise<PIXI.CompressedTextureResource>} The compressed texture resource.
     */
    static loadResource(url: string, options?: KTX2ParserParseOptions | undefined): Promise<PIXI.CompressedTextureResource>;
    /**
     * Parse KTX2 data as a PIXI compressed texture resource.
     * @param {ArrayBuffer|Uint8Array} data          The KTX2 file data.
     * @param {KTX2ParserParseOptions} [options]     Parser options.
     * @returns {Promise<PIXI.CompressedTextureResource>} The compressed texture resource.
     */
    static parse(data: ArrayBuffer | Uint8Array, options?: KTX2ParserParseOptions | undefined): Promise<PIXI.CompressedTextureResource>;
    /**
     * Initialize the Khronos KTX module from its preloaded JavaScript factory.
     * @param {string} wasmPath   The URL of the libktx WebAssembly module.
     * @returns {Promise<object>} The initialized Khronos KTX module.
     */
    static "__#367@#initialize"(wasmPath: string): Promise<object>;
    /**
     * Read the KTX2 file header.
     * @param {Uint8Array} bytes  The file bytes.
     * @returns {KTX2Header}      The parsed KTX2 header.
     */
    static "__#367@#readHeader"(bytes: Uint8Array): KTX2Header;
    /**
     * Validate that a KTX2 texture is compatible with Foundry's 2D texture pipeline.
     * @param {KTX2Header} header  The parsed KTX2 header.
     */
    static "__#367@#validateHeader"(header: KTX2Header): void;
    /**
     * Transcode a Basis Universal KTX2 texture to the best supported compressed target.
     * @param {object} ktx                         The Khronos KTX module.
     * @param {object} texture                     The KTX texture object.
     * @param {KTX2ParserParseOptions} [options]   Parser options.
     */
    static "__#367@#transcodeTexture"(ktx: object, texture: object, options?: KTX2ParserParseOptions | undefined): void;
    /**
     * Get a named Khronos transcode target.
     * @param {object} ktx       The Khronos KTX module.
     * @param {string} name      The transcode target name.
     * @returns {KTX2TranscodeTarget} The transcode target.
     */
    static "__#367@#getNamedTranscodeTarget"(ktx: object, name: string): KTX2TranscodeTarget;
    /**
     * Select the best supported Khronos transcode target.
     * @param {object} ktx       The Khronos KTX module.
     * @returns {KTX2TranscodeTarget} The selected transcode target.
     */
    static "__#367@#getTranscodeTarget"(ktx: object): KTX2TranscodeTarget;
    /**
     * Get the supported WebGL compressed texture extensions.
     * @returns {Object<string, boolean>} The supported extension map.
     */
    static "__#367@#getSupportedExtensions"(): {
        [x: string]: boolean;
    };
    /**
     * Get the active WebGL context for compressed texture capability checks.
     * @returns {WebGLRenderingContext|WebGL2RenderingContext|null} The WebGL context.
     */
    static "__#367@#getWebGLContext"(): WebGLRenderingContext | WebGL2RenderingContext | null;
    /**
     * Get the PIXI internal format for a KTX2 GPU format identifier.
     * @param {number} gpuFormat The KTX2 GPU format identifier.
     * @returns {number}         The PIXI internal format.
     */
    static "__#367@#getInternalFormat"(gpuFormat: number): number;
    /**
     * Extract the embedded KTX2 mip levels.
     * @param {object} texture     The KTX texture object.
     * @param {KTX2Header} header  The parsed KTX2 header.
     * @returns {object[]}         The PIXI compressed texture level buffers.
     */
    static "__#367@#getLevelBuffers"(texture: object, header: KTX2Header): object[];
}
import type { KTX2ParserInitOptions } from "./_types.mjs";
import type { KTX2ParserParseOptions } from "./_types.mjs";
import type { KTX2Header } from "./_types.mjs";
import type { KTX2TranscodeTarget } from "./_types.mjs";
