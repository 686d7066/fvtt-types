/**
 * @import BasePackage from "../../common/packages/base-package.mjs";
 * @import {Constructor} from "../../common/_types.mjs";
 * @import {PackageCompatibilityBadge, PackageManifestData} from "./_types.mjs";
 */
/**
 * A client-side mixin used for all Package types.
 * @category Mixins
 * @param {Constructor<BasePackage>} Base    The parent BasePackage class being mixed
 */
export default function ClientPackageMixin(Base: Constructor<BasePackage<any>>): {
    new (data: PackageManifestData, options?: object | undefined): {
        /**
         * Is this package marked as a favorite?
         * This boolean is currently only populated as true in the /setup view of the software.
         * @type {boolean}
         */
        favorite: boolean;
        /**
         * Associate package availability with certain badge for client-side display.
         * @returns {PackageCompatibilityBadge|null}
         */
        getVersionBadge(): PackageCompatibilityBadge | null;
        /**
         * When a package has been installed, add it to the local game data.
         */
        install(): void;
        /**
         * When a package has been uninstalled, remove it from the local game data.
         */
        uninstall(): void;
        availability: number;
        locked: boolean;
        exclusive: boolean;
        owned: boolean | null;
        tags: string[];
        hasStorage: boolean;
        readonly type: string;
        readonly unavailable: boolean;
        _unknownKeys: string[];
        readonly incompatibleWithCoreVersion: boolean;
        _initializeSource(data: any, { installed, ...options }?: {
            installed?: boolean | undefined;
        }): object;
        _testRequiredDependencies(modulesCollection: foundry.utils.Collection<string, foundry.packages.Module>): Promise<boolean>;
        _testSupportedSystems(systemCollection: foundry.utils.Collection<string, foundry.packages.System>): Promise<boolean>;
        _configure(options?: object | undefined): void;
        _source: PackageManifestData;
        parent: foundry.abstract.DataModel | null;
        readonly schema: foundry.data.fields.DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: foundry.data.validation.DataModelValidationFailure | null;
            joint: foundry.data.validation.DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): foundry.data.fields.DataField | undefined;
        _getInnerModel(field: foundry.data.fields.DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, foundry.data.fields.DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        clone(data?: object | undefined, context?: foundry.abstract.types.DataModelConstructionContext | undefined): DataModel | Promise<DataModel>;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): foundry.data.validation.DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): object;
        _updateCommit(copy: object, diff: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    };
    /**
     * Retrieve a Package of this type from its collection.
     * @param {string} id           The package ID to retrieve
     * @returns {ClientPackage}     The retrieved package instance, or undefined
     */
    get(id: string): {
        /**
         * Is this package marked as a favorite?
         * This boolean is currently only populated as true in the /setup view of the software.
         * @type {boolean}
         */
        favorite: boolean;
        /**
         * Associate package availability with certain badge for client-side display.
         * @returns {PackageCompatibilityBadge|null}
         */
        getVersionBadge(): PackageCompatibilityBadge | null;
        /**
         * When a package has been installed, add it to the local game data.
         */
        install(): void;
        /**
         * When a package has been uninstalled, remove it from the local game data.
         */
        uninstall(): void;
        availability: number;
        locked: boolean;
        exclusive: boolean;
        owned: boolean | null;
        tags: string[];
        hasStorage: boolean;
        readonly type: string;
        readonly unavailable: boolean;
        _unknownKeys: string[];
        readonly incompatibleWithCoreVersion: boolean;
        _initializeSource(data: any, { installed, ...options }?: {
            installed?: boolean | undefined;
        }): object;
        _testRequiredDependencies(modulesCollection: foundry.utils.Collection<string, foundry.packages.Module>): Promise<boolean>;
        _testSupportedSystems(systemCollection: foundry.utils.Collection<string, foundry.packages.System>): Promise<boolean>;
        _configure(options?: object | undefined): void;
        _source: PackageManifestData;
        parent: foundry.abstract.DataModel | null;
        readonly schema: foundry.data.fields.DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: foundry.data.validation.DataModelValidationFailure | null;
            joint: foundry.data.validation.DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): foundry.data.fields.DataField | undefined;
        _getInnerModel(field: foundry.data.fields.DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, foundry.data.fields.DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        clone(data?: object | undefined, context?: foundry.abstract.types.DataModelConstructionContext | undefined): DataModel | Promise<DataModel>;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): foundry.data.validation.DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): object;
        _updateCommit(copy: object, diff: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    };
    /**
     * Determine a version badge for the provided compatibility data.
     * @param {number} availability                The availability level.
     * @param {Partial<PackageManifestData>} data  The compatibility data.
     * @param {object} [options]
     * @param {Collection<string, Module>} [options.modules]  A specific collection of modules to test availability
     *                                                        against. Tests against the currently installed modules by
     *                                                        default.
     * @param {Collection<string, System>} [options.systems]  A specific collection of systems to test availability
     *                                                        against. Tests against the currently installed systems by
     *                                                        default.
     * @returns {PackageCompatibilityBadge|null}
     */
    getVersionBadge(availability: number, data: Partial<PackageManifestData>, { modules, systems }?: {
        modules?: any;
        systems?: any;
    } | undefined): PackageCompatibilityBadge | null;
    /**
     * List missing dependencies and format them for display.
     * @param {number} availability                The availability value.
     * @param {Partial<PackageManifestData>} data  The compatibility data.
     * @param {Iterable<RelatedPackage>} deps      The dependencies to format.
     * @param {object} [options]
     * @param {Collection<string, Module>} [options.modules]  A specific collection of modules to test availability
     *                                                        against. Tests against the currently installed modules by
     *                                                        default.
     * @param {Collection<string, System>} [options.systems]  A specific collection of systems to test availability
     *                                                        against. Tests against the currently installed systems by
     *                                                        default.
     * @returns {string}
     * @protected
     */
    _formatBadDependenciesTooltip(availability: number, data: Partial<PackageManifestData>, deps: Iterable<RelatedPackage>, { modules, systems }?: {
        modules?: any;
        systems?: any;
    } | undefined): string;
    /**
     * List any installed systems that are incompatible with this module's systems relationship, and format them for
     * display.
     * @param {Partial<PackageManifestData>} data             The compatibility data.
     * @param {Iterable<RelatedPackage>} relationships        The system relationships.
     * @param {object} [options]
     * @param {Collection<string, System>} [options.systems]  A specific collection of systems to test against. Tests
     *                                                        against the currently installed systems by default.
     * @returns {string}
     * @protected
     */
    _formatIncompatibleSystemsTooltip(data: Partial<PackageManifestData>, relationships: Iterable<RelatedPackage>, { systems }?: {
        systems?: any;
    } | undefined): string;
    /**
     * Remove a package from the local game data when it has been uninstalled.
     * @param {string} id  The package ID.
     */
    uninstall(id: string): void;
    /**
     * Retrieve the latest Package manifest from a provided remote location.
     * @param {string} manifest                 A remote manifest URL to load
     * @param {object} options                  Additional options which affect package construction
     * @param {boolean} [options.strict=true]   Whether to construct the remote package strictly
     * @returns {Promise<ClientPackage|null>}   A Promise which resolves to a constructed ServerPackage instance
     * @throws {Error}                          An error if the retrieved manifest data is invalid
     */
    fromRemoteManifest(manifest: string, { strict }?: {
        strict?: boolean | undefined;
    }): Promise<{
        /**
         * Is this package marked as a favorite?
         * This boolean is currently only populated as true in the /setup view of the software.
         * @type {boolean}
         */
        favorite: boolean;
        /**
         * Associate package availability with certain badge for client-side display.
         * @returns {PackageCompatibilityBadge|null}
         */
        getVersionBadge(): PackageCompatibilityBadge | null;
        /**
         * When a package has been installed, add it to the local game data.
         */
        install(): void;
        /**
         * When a package has been uninstalled, remove it from the local game data.
         */
        uninstall(): void;
        availability: number;
        locked: boolean;
        exclusive: boolean;
        owned: boolean | null;
        tags: string[];
        hasStorage: boolean;
        readonly type: string;
        readonly unavailable: boolean;
        _unknownKeys: string[];
        readonly incompatibleWithCoreVersion: boolean;
        _initializeSource(data: any, { installed, ...options }?: {
            installed?: boolean | undefined;
        }): object;
        _testRequiredDependencies(modulesCollection: foundry.utils.Collection<string, foundry.packages.Module>): Promise<boolean>;
        _testSupportedSystems(systemCollection: foundry.utils.Collection<string, foundry.packages.System>): Promise<boolean>;
        _configure(options?: object | undefined): void;
        _source: PackageManifestData;
        parent: foundry.abstract.DataModel | null;
        readonly schema: foundry.data.fields.DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: foundry.data.validation.DataModelValidationFailure | null;
            joint: foundry.data.validation.DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): foundry.data.fields.DataField | undefined;
        _getInnerModel(field: foundry.data.fields.DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): DataModel | null;
        _initializationOrder(): Generator<[string, foundry.data.fields.DataField]>;
        _initialize(options?: object | undefined): void;
        reset(): void;
        clone(data?: object | undefined, context?: foundry.abstract.types.DataModelConstructionContext | undefined): DataModel | Promise<DataModel>;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): foundry.data.validation.DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
        _updateDiff(copy: object, changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): object;
        _updateCommit(copy: object, diff: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
        "__#3@#prepareSafeSource"(changes: object): object;
        toObject(source?: boolean | undefined): object;
        toJSON(): object;
    } | null>;
    type: string;
    isIncompatibleWithCoreVersion(availability: number): boolean;
    readonly collection: string;
    defineSchema(): {
        id: foundry.data.fields.StringField;
        title: foundry.data.fields.StringField;
        description: foundry.data.fields.HTMLField;
        authors: foundry.data.fields.SetField;
        url: foundry.data.fields.StringField;
        license: foundry.data.fields.StringField;
        readme: foundry.data.fields.StringField;
        bugs: foundry.data.fields.StringField;
        changelog: foundry.data.fields.StringField;
        flags: foundry.data.fields.ObjectField;
        media: foundry.data.fields.SetField;
        version: foundry.data.fields.StringField;
        compatibility: foundry.packages.PackageCompatibility;
        scripts: foundry.data.fields.SetField;
        esmodules: foundry.data.fields.SetField;
        styles: foundry.data.fields.ArrayField<foundry.data.fields.SchemaField>;
        languages: foundry.data.fields.SetField;
        packs: import("../../common/packages/base-package.mjs").PackageCompendiumPacks;
        packFolders: foundry.data.fields.SetField;
        relationships: import("../../common/packages/base-package.mjs").PackageRelationships;
        socket: foundry.data.fields.BooleanField;
        manifest: foundry.data.fields.StringField;
        download: foundry.data.fields.StringField;
        protected: foundry.data.fields.BooleanField;
        exclusive: foundry.data.fields.BooleanField;
        persistentStorage: foundry.data.fields.BooleanField;
    };
    LOCALIZATION_PREFIXES: string[];
    testAvailability({ compatibility }: Partial<PackageManifestData>, { release }?: {
        release?: any;
    } | undefined): number;
    testDependencyCompatibility(compatibility: PackageCompatibility, dependency: BasePackage<any>): boolean;
    _cleanData(data: any, _options: any, _state: any): void;
    validateId(id: string): void;
    validateVersion(version: string): void;
    _logWarning(packageId: string, message: string, { installed, ...options }?: {
        installed?: object | undefined;
    }): void;
    migrateData(data: any, { installed }?: {}): object;
    _migrateStyles(data: PackageManifestData): void;
    _schema: foundry.data.fields.DataModelSchemaField;
    readonly schema: foundry.data.fields.DataModelSchemaField;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: foundry.data.types.DataModelCleaningOptions | undefined, _state?: Partial<foundry.data.types.DataModelUpdateState> | undefined): object;
    _preCleanData(data: object, options: foundry.data.types.DataModelCleaningOptions, _state: foundry.data.types.DataModelUpdateState): void;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
import type BasePackage from "../../common/packages/base-package.mjs";
import type { Constructor } from "../../common/_types.mjs";
import type { PackageManifestData } from "./_types.mjs";
import type { PackageCompatibilityBadge } from "./_types.mjs";
