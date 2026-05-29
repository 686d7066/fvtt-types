export type KTX2ParserInitOptions = {
    /**
     * The URL of the libktx WebAssembly module.
     */
    wasmPath?: string | undefined;
};
export type KTX2ParserParseOptions = {
    /**
     * A Khronos transcode target name.
     */
    transcodeTarget?: string | undefined;
};
export type KTX2Header = {
    /**
     * The KTX2 GPU format identifier.
     */
    gpuFormat: number;
    /**
     * The base level width.
     */
    pixelWidth: number;
    /**
     * The base level height.
     */
    pixelHeight: number;
    /**
     * The base level depth.
     */
    pixelDepth: number;
    /**
     * The array layer count.
     */
    layerCount: number;
    /**
     * The face count.
     */
    faceCount: number;
    /**
     * The embedded mip level count.
     */
    levelCount: number;
    /**
     * The KTX2 supercompression scheme.
     */
    supercompressionScheme: number;
};
export type KTX2TranscodeTarget = {
    /**
     * The Khronos transcode target name.
     */
    name: string;
    /**
     * The Khronos transcode target enum value.
     */
    target: number;
};
