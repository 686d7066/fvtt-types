/**
 * @import Scene from "./scene.mjs";
 * @import {RegionData} from "./_types.mjs";
 */
/**
 * @deprecated since v14
 * @ignore
 */
export class BaseMeasuredTemplate extends Document<object, foundry.abstract.types.DocumentConstructionContext> {
    /** @inheritdoc */
    static metadata: object;
    /** @override */
    static override get TYPES(): any;
    /** @override */
    static override defineSchema(): {
        _id: fields.DocumentIdField;
        author: fields.DocumentAuthorField;
        t: fields.StringField;
        x: fields.NumberField;
        y: fields.NumberField;
        elevation: fields.NumberField;
        sort: fields.NumberField;
        distance: fields.NumberField;
        direction: fields.AngleField;
        angle: fields.AngleField;
        width: fields.NumberField;
        borderColor: fields.ColorField;
        fillColor: fields.ColorField;
        texture: fields.FilePathField;
        hidden: fields.BooleanField;
        flags: fields.DocumentFlagsField;
    };
    /**
     * Is a user able to create a new MeasuredTemplate?
     * @type {DocumentPermissionTest}
     */
    static "__#119@#canCreate"(user: any, doc: any): any;
    /** @inheritDoc */
    static migrateData(source: any): object;
    /** @inheritDoc */
    static shimData(data: any): object;
    constructor(data?: object | undefined, { parent, schema, strict, ...options }?: foundry.abstract.types.DocumentConstructionContext | undefined);
    /** @inheritDoc */
    getUserLevel(user: any): CONST.DocumentOwnershipNumber;
    /**
     * @deprecated since 12
     * @ignore
     */
    get user(): any;
}
declare const MeasuredTemplateDocument_base: {
    new (data: any, context: any): {
        readonly object: foundry.canvas.placeables.PlaceableObject | null;
        _object: foundry.canvas.placeables.PlaceableObject | null;
        _destroyed: boolean;
        readonly layer: foundry.canvas.layers.PlaceablesLayer;
        readonly rendered: boolean;
        readonly visible: boolean;
        readonly viewed: boolean;
        includedInLevel(level: string | foundry.documents.Level): boolean;
        _preCreate(data: any, options: any, user: any): Promise<false | undefined>;
        _onCreate(data: any, options: any, userId: any): void;
        _onUpdate(changed: any, options: any, userId: any): void;
        _refreshViewedState(): Promise<void>;
        _onDelete(options: any, userId: any): void;
        _initialize(this: {
            _initialize(this: any, options?: {}): void;
            readonly collection: any;
            readonly compendium: foundry.documents.collections.CompendiumCollection<any> | null | undefined;
            readonly inCompendium: boolean;
            readonly persisted: boolean;
            readonly isOwner: boolean;
            readonly hasPlayerOwner: boolean;
            readonly limited: boolean;
            readonly link: string;
            readonly permission: CONST.DocumentOwnershipNumber;
            readonly sheet: foundry.applications.api.ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> | null;
            _sheet: any;
            readonly visible: boolean;
            _getSheetClass(): Function | null;
            _safePrepareData(): void;
            prepareData(): void;
            prepareBaseData(): void;
            prepareEmbeddedDocuments(): void;
            prepareDerivedData(): void;
            render(force?: boolean | undefined, context?: object | undefined): void;
            sortRelative({ updateData, ...sortOptions }?: {
                updateData?: object | undefined;
                sortOptions?: object | undefined;
            } | undefined): Promise<Document>;
            _createDocumentLink(eventData: object, { relativeTo, label }?: {
                relativeTo?: any | undefined;
                label?: string | undefined;
            } | undefined): string;
            _onClickDocumentLink(event: PointerEvent): foundry.applications.api.ApplicationV2 | Promise<foundry.applications.api.ApplicationV2> | null;
            _preCreate(data: any, options: any, user: any): Promise<any>;
            _onCreate(data: any, options: any, userId: any): void;
            _preUpdate(changes: any, options: any, user: any): Promise<any>;
            _onUpdate(changed: any, options: any, userId: any): void;
            _preDelete(options: any, user: any): Promise<any>;
            _onDelete(options: any, userId: any): void;
            "__#204@#closeApplications"(document: any, closingOptions?: object | undefined): void;
            _dispatchDescendantDocumentEvents(event: string, collection: string, args: Array<any>, _parent?: any | undefined): void;
            _preCreateDescendantDocuments(parent: Document, collection: string, data: object[], options: object, userId: string): void;
            _onCreateDescendantDocuments(parent: Document, collection: string, documents: Document[], data: object[], options: object, userId: string): void;
            _preUpdateDescendantDocuments(parent: Document, collection: string, changes: object[], options: object, userId: string): void;
            _onUpdateDescendantDocuments(parent: Document, collection: string, documents: Document[], changes: object[], options: object, userId: string): void;
            _preDeleteDescendantDocuments(parent: Document, collection: string, ids: string[], options: object, userId: string): void;
            _onDeleteDescendantDocuments(parent: Document, collection: string, documents: Document[], ids: string[], options: object, userId: string): void;
            _onSheetChange({ sheetOpen }?: {
                sheetOpen?: boolean | undefined;
            } | undefined): Promise<void>;
            deleteDialog(options?: object | undefined, operation?: foundry.abstract.types.DatabaseDeleteOperation | undefined): Promise<Document>;
            exportToJSON(options?: object | undefined): void;
            toDragData(): object;
            importFromJSON(this: any, json: string): Promise<any>;
            importFromJSONDialog(): Promise<void>;
            toCompendium(pack?: foundry.documents.collections.CompendiumCollection<any> | undefined, { clearSort, clearFolder, clearFlags, clearSource, clearOwnership, clearState, keepId }?: foundry.types.ToCompendiumOptions | undefined): object;
            toAnchor({ attrs, dataset, classes, name, icon }?: any): HTMLAnchorElement;
            toEmbed(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLDocumentEmbedElement | HTMLElement | null>;
            onEmbed(element: HTMLDocumentEmbedElement): void;
            _buildEmbedHTML(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | HTMLCollection | null>;
            _createInlineEmbed(content: HTMLElement | HTMLCollection, config?: any, options?: any): Promise<HTMLElement | null>;
            _createFigureEmbed(content: HTMLElement | HTMLCollection, { cite, caption, captionPosition, label }: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | null>;
            getRelativeUUID(relative: any): string;
            _configure({ pack, parentCollection }?: {
                pack?: null | undefined;
                parentCollection?: null | undefined;
            }): void;
            _initializationOrder(): Generator<(string | fields.DataField | undefined)[], void, unknown>;
            readonly collectionName: any;
            readonly documentName: any;
            _getParentCollection(parentCollection?: string | null | undefined): string | null;
            readonly id: string | null;
            readonly isEmbedded: boolean;
            readonly uuid: string | null;
            _uuid: string | null | undefined;
            getUserLevel(user?: BaseUser | undefined): CONST.DocumentOwnershipNumber;
            testUserPermission(user: BaseUser, permission: CONST.DocumentOwnershipLevel, { exact }?: {
                exact?: boolean | undefined;
            }): boolean;
            canUserModify(user: BaseUser, action: string, data?: object | undefined): boolean;
            clone(data?: object | undefined, context?: (foundry.abstract.types._DataModelConstructionOptions & Pick<foundry.abstract.types.DataModelValidationOptions, "dropInvalidEmbedded" | "fallback" | "strict"> & foundry.abstract.types._DocumentConstructionContext & foundry.abstract.types.DocumentCloneOptions) | undefined): Document | Promise<Document>;
            "__#244@#discardInvalidEmbedded"(source: object): void;
            migrateSystemData(): object;
            toObject(source?: boolean): any;
            _updateDiff(copy: any, changes: any, options: any, _state: any): object;
            update(data?: object | undefined, operation?: Partial<Omit<foundry.abstract.types.DatabaseUpdateOperation, "updates">> | undefined): Promise<Document | undefined>;
            delete(operation?: Partial<Omit<foundry.abstract.types.DatabaseDeleteOperation, "ids" | "deleteAll">> | undefined): Promise<Document | undefined>;
            getEmbeddedCollection(embeddedName: string): DocumentCollection;
            getEmbeddedDocument(embeddedName: string, id: string, { invalid, strict }?: {
                strict?: boolean | undefined;
                invalid?: boolean | undefined;
            } | undefined): Document;
            createEmbeddedDocuments(embeddedName: string, data?: object[], operation?: foundry.abstract.types.DatabaseCreateOperation | undefined): Promise<Document[]>;
            updateEmbeddedDocuments(embeddedName: string, updates?: object[], operation?: foundry.abstract.types.DatabaseUpdateOperation | undefined): Promise<Document[]>;
            deleteEmbeddedDocuments(embeddedName: string, ids: string[], operation?: foundry.abstract.types.DatabaseDeleteOperation | undefined): Promise<Document[]>;
            traverseEmbeddedDocuments(_parentPath?: string | undefined): Generator<any, void, any>;
            getFlag(scope: string, key: string): any;
            setFlag(scope: string, key: string, value: any): Promise<Document>;
            unsetFlag(scope: string, key: string): Promise<Document>;
            _source: object;
            parent: foundry.abstract.DataModel | null;
            readonly schema: fields.DataModelSchemaField;
            readonly invalid: boolean;
            readonly validationFailures: {
                fields: foundry.data.validation.DataModelValidationFailure | null;
                joint: foundry.data.validation.DataModelValidationFailure | null;
            };
            "__#3@#validationFailures": {
                fields: null;
                joint: null;
            };
            getFieldForProperty(key: string[] | string): fields.DataField | undefined;
            _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DocumentConstructionContext | undefined): object;
            _getInnerModel(field: fields.DataField, { value, index }?: {
                value: object;
                index?: number | undefined;
            }, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): DataModel | null;
            reset(): void;
            validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
            "__#3@#createValidationFailure"(err: Error, { joint }?: {
                joint?: boolean | undefined;
            } | undefined): foundry.data.validation.DataModelValidationFailure;
            updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
            _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
            _updateCommit(copy: object, diff: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
            "__#3@#prepareSafeSource"(changes: object): object;
            toJSON(): object;
        }, options?: {}): void;
        readonly collection: any;
        readonly compendium: foundry.documents.collections.CompendiumCollection<any> | null | undefined;
        readonly inCompendium: boolean;
        readonly persisted: boolean;
        readonly isOwner: boolean;
        readonly hasPlayerOwner: boolean;
        readonly limited: boolean;
        readonly link: string;
        readonly permission: CONST.DocumentOwnershipNumber;
        readonly sheet: foundry.applications.api.ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> | null;
        _sheet: any;
        _getSheetClass(): Function | null;
        _safePrepareData(): void;
        prepareData(): void;
        prepareBaseData(): void;
        prepareEmbeddedDocuments(): void;
        prepareDerivedData(): void;
        render(force?: boolean | undefined, context?: object | undefined): void;
        sortRelative({ updateData, ...sortOptions }?: {
            updateData?: object | undefined;
            sortOptions?: object | undefined;
        } | undefined): Promise<Document>;
        _createDocumentLink(eventData: object, { relativeTo, label }?: {
            relativeTo?: any | undefined;
            label?: string | undefined;
        } | undefined): string;
        _onClickDocumentLink(event: PointerEvent): foundry.applications.api.ApplicationV2 | Promise<foundry.applications.api.ApplicationV2> | null;
        _preUpdate(changes: any, options: any, user: any): Promise<any>;
        _preDelete(options: any, user: any): Promise<any>;
        "__#204@#closeApplications"(document: {
            _initialize(this: any, options?: {}): void;
            readonly collection: any;
            readonly compendium: foundry.documents.collections.CompendiumCollection<any> | null | undefined;
            readonly inCompendium: boolean;
            readonly persisted: boolean;
            readonly isOwner: boolean;
            readonly hasPlayerOwner: boolean;
            readonly limited: boolean;
            readonly link: string;
            readonly permission: CONST.DocumentOwnershipNumber;
            readonly sheet: foundry.applications.api.ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> | null;
            _sheet: any;
            readonly visible: boolean;
            _getSheetClass(): Function | null;
            _safePrepareData(): void;
            prepareData(): void;
            prepareBaseData(): void;
            prepareEmbeddedDocuments(): void;
            prepareDerivedData(): void;
            render(force?: boolean | undefined, context?: object | undefined): void;
            sortRelative({ updateData, ...sortOptions }?: {
                updateData?: object | undefined;
                sortOptions?: object | undefined;
            } | undefined): Promise<Document>;
            _createDocumentLink(eventData: object, { relativeTo, label }?: {
                relativeTo?: any | undefined;
                label?: string | undefined;
            } | undefined): string;
            _onClickDocumentLink(event: PointerEvent): foundry.applications.api.ApplicationV2 | Promise<foundry.applications.api.ApplicationV2> | null;
            _preCreate(data: any, options: any, user: any): Promise<any>;
            _onCreate(data: any, options: any, userId: any): void;
            _preUpdate(changes: any, options: any, user: any): Promise<any>;
            _onUpdate(changed: any, options: any, userId: any): void;
            _preDelete(options: any, user: any): Promise<any>;
            _onDelete(options: any, userId: any): void;
            "__#204@#closeApplications"(document: any, closingOptions?: object | undefined): void;
            _dispatchDescendantDocumentEvents(event: string, collection: string, args: Array<any>, _parent?: any | undefined): void;
            _preCreateDescendantDocuments(parent: Document, collection: string, data: object[], options: object, userId: string): void;
            _onCreateDescendantDocuments(parent: Document, collection: string, documents: Document[], data: object[], options: object, userId: string): void;
            _preUpdateDescendantDocuments(parent: Document, collection: string, changes: object[], options: object, userId: string): void;
            _onUpdateDescendantDocuments(parent: Document, collection: string, documents: Document[], changes: object[], options: object, userId: string): void;
            _preDeleteDescendantDocuments(parent: Document, collection: string, ids: string[], options: object, userId: string): void;
            _onDeleteDescendantDocuments(parent: Document, collection: string, documents: Document[], ids: string[], options: object, userId: string): void;
            _onSheetChange({ sheetOpen }?: {
                sheetOpen?: boolean | undefined;
            } | undefined): Promise<void>;
            deleteDialog(options?: object | undefined, operation?: foundry.abstract.types.DatabaseDeleteOperation | undefined): Promise<Document>;
            exportToJSON(options?: object | undefined): void;
            toDragData(): object;
            importFromJSON(this: any, json: string): Promise<any>;
            importFromJSONDialog(): Promise<void>;
            toCompendium(pack?: foundry.documents.collections.CompendiumCollection<any> | undefined, { clearSort, clearFolder, clearFlags, clearSource, clearOwnership, clearState, keepId }?: foundry.types.ToCompendiumOptions | undefined): object;
            toAnchor({ attrs, dataset, classes, name, icon }?: any): HTMLAnchorElement;
            toEmbed(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLDocumentEmbedElement | HTMLElement | null>;
            onEmbed(element: HTMLDocumentEmbedElement): void;
            _buildEmbedHTML(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | HTMLCollection | null>;
            _createInlineEmbed(content: HTMLElement | HTMLCollection, config?: any, options?: any): Promise<HTMLElement | null>;
            _createFigureEmbed(content: HTMLElement | HTMLCollection, { cite, caption, captionPosition, label }: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | null>;
            getRelativeUUID(relative: any): string;
            _configure({ pack, parentCollection }?: {
                pack?: null | undefined;
                parentCollection?: null | undefined;
            }): void;
            _initializationOrder(): Generator<(string | fields.DataField | undefined)[], void, unknown>;
            readonly collectionName: any;
            readonly documentName: any;
            _getParentCollection(parentCollection?: string | null | undefined): string | null;
            readonly id: string | null;
            readonly isEmbedded: boolean;
            readonly uuid: string | null;
            _uuid: string | null | undefined;
            getUserLevel(user?: BaseUser | undefined): CONST.DocumentOwnershipNumber;
            testUserPermission(user: BaseUser, permission: CONST.DocumentOwnershipLevel, { exact }?: {
                exact?: boolean | undefined;
            }): boolean;
            canUserModify(user: BaseUser, action: string, data?: object | undefined): boolean;
            clone(data?: object | undefined, context?: (foundry.abstract.types._DataModelConstructionOptions & Pick<foundry.abstract.types.DataModelValidationOptions, "dropInvalidEmbedded" | "fallback" | "strict"> & foundry.abstract.types._DocumentConstructionContext & foundry.abstract.types.DocumentCloneOptions) | undefined): Document | Promise<Document>;
            "__#244@#discardInvalidEmbedded"(source: object): void;
            migrateSystemData(): object;
            toObject(source?: boolean): any;
            _updateDiff(copy: any, changes: any, options: any, _state: any): object;
            update(data?: object | undefined, operation?: Partial<Omit<foundry.abstract.types.DatabaseUpdateOperation, "updates">> | undefined): Promise<Document | undefined>;
            delete(operation?: Partial<Omit<foundry.abstract.types.DatabaseDeleteOperation, "ids" | "deleteAll">> | undefined): Promise<Document | undefined>;
            getEmbeddedCollection(embeddedName: string): DocumentCollection;
            getEmbeddedDocument(embeddedName: string, id: string, { invalid, strict }?: {
                strict?: boolean | undefined;
                invalid?: boolean | undefined;
            } | undefined): Document;
            createEmbeddedDocuments(embeddedName: string, data?: object[], operation?: foundry.abstract.types.DatabaseCreateOperation | undefined): Promise<Document[]>;
            updateEmbeddedDocuments(embeddedName: string, updates?: object[], operation?: foundry.abstract.types.DatabaseUpdateOperation | undefined): Promise<Document[]>;
            deleteEmbeddedDocuments(embeddedName: string, ids: string[], operation?: foundry.abstract.types.DatabaseDeleteOperation | undefined): Promise<Document[]>;
            traverseEmbeddedDocuments(_parentPath?: string | undefined): Generator<any, void, any>;
            getFlag(scope: string, key: string): any;
            setFlag(scope: string, key: string, value: any): Promise<Document>;
            unsetFlag(scope: string, key: string): Promise<Document>;
            _source: object;
            parent: foundry.abstract.DataModel | null;
            readonly schema: fields.DataModelSchemaField;
            readonly invalid: boolean;
            readonly validationFailures: {
                fields: foundry.data.validation.DataModelValidationFailure | null;
                joint: foundry.data.validation.DataModelValidationFailure | null;
            };
            "__#3@#validationFailures": {
                fields: null;
                joint: null;
            };
            getFieldForProperty(key: string[] | string): fields.DataField | undefined;
            _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DocumentConstructionContext | undefined): object;
            _getInnerModel(field: fields.DataField, { value, index }?: {
                value: object;
                index?: number | undefined;
            }, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): DataModel | null;
            reset(): void;
            validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
            "__#3@#createValidationFailure"(err: Error, { joint }?: {
                joint?: boolean | undefined;
            } | undefined): foundry.data.validation.DataModelValidationFailure;
            updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
            _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
            _updateCommit(copy: object, diff: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
            "__#3@#prepareSafeSource"(changes: object): object;
            toJSON(): object;
        }, closingOptions?: object | undefined): void;
        _dispatchDescendantDocumentEvents(event: string, collection: string, args: Array<any>, _parent?: {
            _initialize(this: any, options?: {}): void;
            readonly collection: any;
            readonly compendium: foundry.documents.collections.CompendiumCollection<any> | null | undefined;
            readonly inCompendium: boolean;
            readonly persisted: boolean;
            readonly isOwner: boolean;
            readonly hasPlayerOwner: boolean;
            readonly limited: boolean;
            readonly link: string;
            readonly permission: CONST.DocumentOwnershipNumber;
            readonly sheet: foundry.applications.api.ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> | null;
            _sheet: any;
            readonly visible: boolean;
            _getSheetClass(): Function | null;
            _safePrepareData(): void;
            prepareData(): void;
            prepareBaseData(): void;
            prepareEmbeddedDocuments(): void;
            prepareDerivedData(): void;
            render(force?: boolean | undefined, context?: object | undefined): void;
            sortRelative({ updateData, ...sortOptions }?: {
                updateData?: object | undefined;
                sortOptions?: object | undefined;
            } | undefined): Promise<Document>;
            _createDocumentLink(eventData: object, { relativeTo, label }?: {
                relativeTo?: any | undefined;
                label?: string | undefined;
            } | undefined): string;
            _onClickDocumentLink(event: PointerEvent): foundry.applications.api.ApplicationV2 | Promise<foundry.applications.api.ApplicationV2> | null;
            _preCreate(data: any, options: any, user: any): Promise<any>;
            _onCreate(data: any, options: any, userId: any): void;
            _preUpdate(changes: any, options: any, user: any): Promise<any>;
            _onUpdate(changed: any, options: any, userId: any): void;
            _preDelete(options: any, user: any): Promise<any>;
            _onDelete(options: any, userId: any): void;
            "__#204@#closeApplications"(document: any, closingOptions?: object | undefined): void;
            _dispatchDescendantDocumentEvents(event: string, collection: string, args: Array<any>, _parent?: any | undefined): void;
            _preCreateDescendantDocuments(parent: Document, collection: string, data: object[], options: object, userId: string): void;
            _onCreateDescendantDocuments(parent: Document, collection: string, documents: Document[], data: object[], options: object, userId: string): void;
            _preUpdateDescendantDocuments(parent: Document, collection: string, changes: object[], options: object, userId: string): void;
            _onUpdateDescendantDocuments(parent: Document, collection: string, documents: Document[], changes: object[], options: object, userId: string): void;
            _preDeleteDescendantDocuments(parent: Document, collection: string, ids: string[], options: object, userId: string): void;
            _onDeleteDescendantDocuments(parent: Document, collection: string, documents: Document[], ids: string[], options: object, userId: string): void;
            _onSheetChange({ sheetOpen }?: {
                sheetOpen?: boolean | undefined;
            } | undefined): Promise<void>;
            deleteDialog(options?: object | undefined, operation?: foundry.abstract.types.DatabaseDeleteOperation | undefined): Promise<Document>;
            exportToJSON(options?: object | undefined): void;
            toDragData(): object;
            importFromJSON(this: any, json: string): Promise<any>;
            importFromJSONDialog(): Promise<void>;
            toCompendium(pack?: foundry.documents.collections.CompendiumCollection<any> | undefined, { clearSort, clearFolder, clearFlags, clearSource, clearOwnership, clearState, keepId }?: foundry.types.ToCompendiumOptions | undefined): object;
            toAnchor({ attrs, dataset, classes, name, icon }?: any): HTMLAnchorElement;
            toEmbed(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLDocumentEmbedElement | HTMLElement | null>;
            onEmbed(element: HTMLDocumentEmbedElement): void;
            _buildEmbedHTML(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | HTMLCollection | null>;
            _createInlineEmbed(content: HTMLElement | HTMLCollection, config?: any, options?: any): Promise<HTMLElement | null>;
            _createFigureEmbed(content: HTMLElement | HTMLCollection, { cite, caption, captionPosition, label }: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | null>;
            getRelativeUUID(relative: any): string;
            _configure({ pack, parentCollection }?: {
                pack?: null | undefined;
                parentCollection?: null | undefined;
            }): void;
            _initializationOrder(): Generator<(string | fields.DataField | undefined)[], void, unknown>;
            readonly collectionName: any;
            readonly documentName: any;
            _getParentCollection(parentCollection?: string | null | undefined): string | null;
            readonly id: string | null;
            readonly isEmbedded: boolean;
            readonly uuid: string | null;
            _uuid: string | null | undefined;
            getUserLevel(user?: BaseUser | undefined): CONST.DocumentOwnershipNumber;
            testUserPermission(user: BaseUser, permission: CONST.DocumentOwnershipLevel, { exact }?: {
                exact?: boolean | undefined;
            }): boolean;
            canUserModify(user: BaseUser, action: string, data?: object | undefined): boolean;
            clone(data?: object | undefined, context?: (foundry.abstract.types._DataModelConstructionOptions & Pick<foundry.abstract.types.DataModelValidationOptions, "dropInvalidEmbedded" | "fallback" | "strict"> & foundry.abstract.types._DocumentConstructionContext & foundry.abstract.types.DocumentCloneOptions) | undefined): Document | Promise<Document>;
            "__#244@#discardInvalidEmbedded"(source: object): void;
            migrateSystemData(): object;
            toObject(source?: boolean): any;
            _updateDiff(copy: any, changes: any, options: any, _state: any): object;
            update(data?: object | undefined, operation?: Partial<Omit<foundry.abstract.types.DatabaseUpdateOperation, "updates">> | undefined): Promise<Document | undefined>;
            delete(operation?: Partial<Omit<foundry.abstract.types.DatabaseDeleteOperation, "ids" | "deleteAll">> | undefined): Promise<Document | undefined>;
            getEmbeddedCollection(embeddedName: string): DocumentCollection;
            getEmbeddedDocument(embeddedName: string, id: string, { invalid, strict }?: {
                strict?: boolean | undefined;
                invalid?: boolean | undefined;
            } | undefined): Document;
            createEmbeddedDocuments(embeddedName: string, data?: object[], operation?: foundry.abstract.types.DatabaseCreateOperation | undefined): Promise<Document[]>;
            updateEmbeddedDocuments(embeddedName: string, updates?: object[], operation?: foundry.abstract.types.DatabaseUpdateOperation | undefined): Promise<Document[]>;
            deleteEmbeddedDocuments(embeddedName: string, ids: string[], operation?: foundry.abstract.types.DatabaseDeleteOperation | undefined): Promise<Document[]>;
            traverseEmbeddedDocuments(_parentPath?: string | undefined): Generator<any, void, any>;
            getFlag(scope: string, key: string): any;
            setFlag(scope: string, key: string, value: any): Promise<Document>;
            unsetFlag(scope: string, key: string): Promise<Document>;
            _source: object;
            parent: foundry.abstract.DataModel | null;
            readonly schema: fields.DataModelSchemaField;
            readonly invalid: boolean;
            readonly validationFailures: {
                fields: foundry.data.validation.DataModelValidationFailure | null;
                joint: foundry.data.validation.DataModelValidationFailure | null;
            };
            "__#3@#validationFailures": {
                fields: null;
                joint: null;
            };
            getFieldForProperty(key: string[] | string): fields.DataField | undefined;
            _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DocumentConstructionContext | undefined): object;
            _getInnerModel(field: fields.DataField, { value, index }?: {
                value: object;
                index?: number | undefined;
            }, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): DataModel | null;
            reset(): void;
            validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
            "__#3@#createValidationFailure"(err: Error, { joint }?: {
                joint?: boolean | undefined;
            } | undefined): foundry.data.validation.DataModelValidationFailure;
            updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
            _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
            _updateCommit(copy: object, diff: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
            "__#3@#prepareSafeSource"(changes: object): object;
            toJSON(): object;
        } | undefined): void;
        _preCreateDescendantDocuments(parent: Document, collection: string, data: object[], options: object, userId: string): void;
        _onCreateDescendantDocuments(parent: Document, collection: string, documents: Document[], data: object[], options: object, userId: string): void;
        _preUpdateDescendantDocuments(parent: Document, collection: string, changes: object[], options: object, userId: string): void;
        _onUpdateDescendantDocuments(parent: Document, collection: string, documents: Document[], changes: object[], options: object, userId: string): void;
        _preDeleteDescendantDocuments(parent: Document, collection: string, ids: string[], options: object, userId: string): void;
        _onDeleteDescendantDocuments(parent: Document, collection: string, documents: Document[], ids: string[], options: object, userId: string): void;
        _onSheetChange({ sheetOpen }?: {
            sheetOpen?: boolean | undefined;
        } | undefined): Promise<void>;
        deleteDialog(options?: object | undefined, operation?: foundry.abstract.types.DatabaseDeleteOperation | undefined): Promise<Document>;
        exportToJSON(options?: object | undefined): void;
        toDragData(): object;
        importFromJSON(this: {
            _initialize(this: any, options?: {}): void;
            readonly collection: any;
            readonly compendium: foundry.documents.collections.CompendiumCollection<any> | null | undefined;
            readonly inCompendium: boolean;
            readonly persisted: boolean;
            readonly isOwner: boolean;
            readonly hasPlayerOwner: boolean;
            readonly limited: boolean;
            readonly link: string;
            readonly permission: CONST.DocumentOwnershipNumber;
            readonly sheet: foundry.applications.api.ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> | null;
            _sheet: any;
            readonly visible: boolean;
            _getSheetClass(): Function | null;
            _safePrepareData(): void;
            prepareData(): void;
            prepareBaseData(): void;
            prepareEmbeddedDocuments(): void;
            prepareDerivedData(): void;
            render(force?: boolean | undefined, context?: object | undefined): void;
            sortRelative({ updateData, ...sortOptions }?: {
                updateData?: object | undefined;
                sortOptions?: object | undefined;
            } | undefined): Promise<Document>;
            _createDocumentLink(eventData: object, { relativeTo, label }?: {
                relativeTo?: any | undefined;
                label?: string | undefined;
            } | undefined): string;
            _onClickDocumentLink(event: PointerEvent): foundry.applications.api.ApplicationV2 | Promise<foundry.applications.api.ApplicationV2> | null;
            _preCreate(data: any, options: any, user: any): Promise<any>;
            _onCreate(data: any, options: any, userId: any): void;
            _preUpdate(changes: any, options: any, user: any): Promise<any>;
            _onUpdate(changed: any, options: any, userId: any): void;
            _preDelete(options: any, user: any): Promise<any>;
            _onDelete(options: any, userId: any): void;
            "__#204@#closeApplications"(document: any, closingOptions?: object | undefined): void;
            _dispatchDescendantDocumentEvents(event: string, collection: string, args: Array<any>, _parent?: any | undefined): void;
            _preCreateDescendantDocuments(parent: Document, collection: string, data: object[], options: object, userId: string): void;
            _onCreateDescendantDocuments(parent: Document, collection: string, documents: Document[], data: object[], options: object, userId: string): void;
            _preUpdateDescendantDocuments(parent: Document, collection: string, changes: object[], options: object, userId: string): void;
            _onUpdateDescendantDocuments(parent: Document, collection: string, documents: Document[], changes: object[], options: object, userId: string): void;
            _preDeleteDescendantDocuments(parent: Document, collection: string, ids: string[], options: object, userId: string): void;
            _onDeleteDescendantDocuments(parent: Document, collection: string, documents: Document[], ids: string[], options: object, userId: string): void;
            _onSheetChange({ sheetOpen }?: {
                sheetOpen?: boolean | undefined;
            } | undefined): Promise<void>;
            deleteDialog(options?: object | undefined, operation?: foundry.abstract.types.DatabaseDeleteOperation | undefined): Promise<Document>;
            exportToJSON(options?: object | undefined): void;
            toDragData(): object;
            importFromJSON(this: any, json: string): Promise<any>;
            importFromJSONDialog(): Promise<void>;
            toCompendium(pack?: foundry.documents.collections.CompendiumCollection<any> | undefined, { clearSort, clearFolder, clearFlags, clearSource, clearOwnership, clearState, keepId }?: foundry.types.ToCompendiumOptions | undefined): object;
            toAnchor({ attrs, dataset, classes, name, icon }?: any): HTMLAnchorElement;
            toEmbed(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLDocumentEmbedElement | HTMLElement | null>;
            onEmbed(element: HTMLDocumentEmbedElement): void;
            _buildEmbedHTML(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | HTMLCollection | null>;
            _createInlineEmbed(content: HTMLElement | HTMLCollection, config?: any, options?: any): Promise<HTMLElement | null>;
            _createFigureEmbed(content: HTMLElement | HTMLCollection, { cite, caption, captionPosition, label }: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | null>;
            getRelativeUUID(relative: any): string;
            _configure({ pack, parentCollection }?: {
                pack?: null | undefined;
                parentCollection?: null | undefined;
            }): void;
            _initializationOrder(): Generator<(string | fields.DataField | undefined)[], void, unknown>;
            readonly collectionName: any;
            readonly documentName: any;
            _getParentCollection(parentCollection?: string | null | undefined): string | null;
            readonly id: string | null;
            readonly isEmbedded: boolean;
            readonly uuid: string | null;
            _uuid: string | null | undefined;
            getUserLevel(user?: BaseUser | undefined): CONST.DocumentOwnershipNumber;
            testUserPermission(user: BaseUser, permission: CONST.DocumentOwnershipLevel, { exact }?: {
                exact?: boolean | undefined;
            }): boolean;
            canUserModify(user: BaseUser, action: string, data?: object | undefined): boolean;
            clone(data?: object | undefined, context?: (foundry.abstract.types._DataModelConstructionOptions & Pick<foundry.abstract.types.DataModelValidationOptions, "dropInvalidEmbedded" | "fallback" | "strict"> & foundry.abstract.types._DocumentConstructionContext & foundry.abstract.types.DocumentCloneOptions) | undefined): Document | Promise<Document>;
            "__#244@#discardInvalidEmbedded"(source: object): void;
            migrateSystemData(): object;
            toObject(source?: boolean): any;
            _updateDiff(copy: any, changes: any, options: any, _state: any): object;
            update(data?: object | undefined, operation?: Partial<Omit<foundry.abstract.types.DatabaseUpdateOperation, "updates">> | undefined): Promise<Document | undefined>;
            delete(operation?: Partial<Omit<foundry.abstract.types.DatabaseDeleteOperation, "ids" | "deleteAll">> | undefined): Promise<Document | undefined>;
            getEmbeddedCollection(embeddedName: string): DocumentCollection;
            getEmbeddedDocument(embeddedName: string, id: string, { invalid, strict }?: {
                strict?: boolean | undefined;
                invalid?: boolean | undefined;
            } | undefined): Document;
            createEmbeddedDocuments(embeddedName: string, data?: object[], operation?: foundry.abstract.types.DatabaseCreateOperation | undefined): Promise<Document[]>;
            updateEmbeddedDocuments(embeddedName: string, updates?: object[], operation?: foundry.abstract.types.DatabaseUpdateOperation | undefined): Promise<Document[]>;
            deleteEmbeddedDocuments(embeddedName: string, ids: string[], operation?: foundry.abstract.types.DatabaseDeleteOperation | undefined): Promise<Document[]>;
            traverseEmbeddedDocuments(_parentPath?: string | undefined): Generator<any, void, any>;
            getFlag(scope: string, key: string): any;
            setFlag(scope: string, key: string, value: any): Promise<Document>;
            unsetFlag(scope: string, key: string): Promise<Document>;
            _source: object;
            parent: foundry.abstract.DataModel | null;
            readonly schema: fields.DataModelSchemaField;
            readonly invalid: boolean;
            readonly validationFailures: {
                fields: foundry.data.validation.DataModelValidationFailure | null;
                joint: foundry.data.validation.DataModelValidationFailure | null;
            };
            "__#3@#validationFailures": {
                fields: null;
                joint: null;
            };
            getFieldForProperty(key: string[] | string): fields.DataField | undefined;
            _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DocumentConstructionContext | undefined): object;
            _getInnerModel(field: fields.DataField, { value, index }?: {
                value: object;
                index?: number | undefined;
            }, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): DataModel | null;
            reset(): void;
            validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
            "__#3@#createValidationFailure"(err: Error, { joint }?: {
                joint?: boolean | undefined;
            } | undefined): foundry.data.validation.DataModelValidationFailure;
            updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
            _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
            _updateCommit(copy: object, diff: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
            "__#3@#prepareSafeSource"(changes: object): object;
            toJSON(): object;
        }, json: string): Promise<{
            _initialize(this: any, options?: {}): void;
            readonly collection: any;
            readonly compendium: foundry.documents.collections.CompendiumCollection<any> | null | undefined;
            readonly inCompendium: boolean;
            readonly persisted: boolean;
            readonly isOwner: boolean;
            readonly hasPlayerOwner: boolean;
            readonly limited: boolean;
            readonly link: string;
            readonly permission: CONST.DocumentOwnershipNumber;
            readonly sheet: foundry.applications.api.ApplicationV2<foundry.applications.types.ApplicationConfiguration, foundry.applications.types.ApplicationRenderOptions> | null;
            _sheet: any;
            readonly visible: boolean;
            _getSheetClass(): Function | null;
            _safePrepareData(): void;
            prepareData(): void;
            prepareBaseData(): void;
            prepareEmbeddedDocuments(): void;
            prepareDerivedData(): void;
            render(force?: boolean | undefined, context?: object | undefined): void;
            sortRelative({ updateData, ...sortOptions }?: {
                updateData?: object | undefined;
                sortOptions?: object | undefined;
            } | undefined): Promise<Document>;
            _createDocumentLink(eventData: object, { relativeTo, label }?: {
                relativeTo?: any | undefined;
                label?: string | undefined;
            } | undefined): string;
            _onClickDocumentLink(event: PointerEvent): foundry.applications.api.ApplicationV2 | Promise<foundry.applications.api.ApplicationV2> | null;
            _preCreate(data: any, options: any, user: any): Promise<any>;
            _onCreate(data: any, options: any, userId: any): void;
            _preUpdate(changes: any, options: any, user: any): Promise<any>;
            _onUpdate(changed: any, options: any, userId: any): void;
            _preDelete(options: any, user: any): Promise<any>;
            _onDelete(options: any, userId: any): void;
            "__#204@#closeApplications"(document: any, closingOptions?: object | undefined): void;
            _dispatchDescendantDocumentEvents(event: string, collection: string, args: Array<any>, _parent?: any | undefined): void;
            _preCreateDescendantDocuments(parent: Document, collection: string, data: object[], options: object, userId: string): void;
            _onCreateDescendantDocuments(parent: Document, collection: string, documents: Document[], data: object[], options: object, userId: string): void;
            _preUpdateDescendantDocuments(parent: Document, collection: string, changes: object[], options: object, userId: string): void;
            _onUpdateDescendantDocuments(parent: Document, collection: string, documents: Document[], changes: object[], options: object, userId: string): void;
            _preDeleteDescendantDocuments(parent: Document, collection: string, ids: string[], options: object, userId: string): void;
            _onDeleteDescendantDocuments(parent: Document, collection: string, documents: Document[], ids: string[], options: object, userId: string): void;
            _onSheetChange({ sheetOpen }?: {
                sheetOpen?: boolean | undefined;
            } | undefined): Promise<void>;
            deleteDialog(options?: object | undefined, operation?: foundry.abstract.types.DatabaseDeleteOperation | undefined): Promise<Document>;
            exportToJSON(options?: object | undefined): void;
            toDragData(): object;
            importFromJSON(this: any, json: string): Promise<any>;
            importFromJSONDialog(): Promise<void>;
            toCompendium(pack?: foundry.documents.collections.CompendiumCollection<any> | undefined, { clearSort, clearFolder, clearFlags, clearSource, clearOwnership, clearState, keepId }?: foundry.types.ToCompendiumOptions | undefined): object;
            toAnchor({ attrs, dataset, classes, name, icon }?: any): HTMLAnchorElement;
            toEmbed(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLDocumentEmbedElement | HTMLElement | null>;
            onEmbed(element: HTMLDocumentEmbedElement): void;
            _buildEmbedHTML(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | HTMLCollection | null>;
            _createInlineEmbed(content: HTMLElement | HTMLCollection, config?: any, options?: any): Promise<HTMLElement | null>;
            _createFigureEmbed(content: HTMLElement | HTMLCollection, { cite, caption, captionPosition, label }: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | null>;
            getRelativeUUID(relative: any): string;
            _configure({ pack, parentCollection }?: {
                pack?: null | undefined;
                parentCollection?: null | undefined;
            }): void;
            _initializationOrder(): Generator<(string | fields.DataField | undefined)[], void, unknown>;
            readonly collectionName: any;
            readonly documentName: any;
            _getParentCollection(parentCollection?: string | null | undefined): string | null;
            readonly id: string | null;
            readonly isEmbedded: boolean;
            readonly uuid: string | null;
            _uuid: string | null | undefined;
            getUserLevel(user?: BaseUser | undefined): CONST.DocumentOwnershipNumber;
            testUserPermission(user: BaseUser, permission: CONST.DocumentOwnershipLevel, { exact }?: {
                exact?: boolean | undefined;
            }): boolean;
            canUserModify(user: BaseUser, action: string, data?: object | undefined): boolean;
            clone(data?: object | undefined, context?: (foundry.abstract.types._DataModelConstructionOptions & Pick<foundry.abstract.types.DataModelValidationOptions, "dropInvalidEmbedded" | "fallback" | "strict"> & foundry.abstract.types._DocumentConstructionContext & foundry.abstract.types.DocumentCloneOptions) | undefined): Document | Promise<Document>;
            "__#244@#discardInvalidEmbedded"(source: object): void;
            migrateSystemData(): object;
            toObject(source?: boolean): any;
            _updateDiff(copy: any, changes: any, options: any, _state: any): object;
            update(data?: object | undefined, operation?: Partial<Omit<foundry.abstract.types.DatabaseUpdateOperation, "updates">> | undefined): Promise<Document | undefined>;
            delete(operation?: Partial<Omit<foundry.abstract.types.DatabaseDeleteOperation, "ids" | "deleteAll">> | undefined): Promise<Document | undefined>;
            getEmbeddedCollection(embeddedName: string): DocumentCollection;
            getEmbeddedDocument(embeddedName: string, id: string, { invalid, strict }?: {
                strict?: boolean | undefined;
                invalid?: boolean | undefined;
            } | undefined): Document;
            createEmbeddedDocuments(embeddedName: string, data?: object[], operation?: foundry.abstract.types.DatabaseCreateOperation | undefined): Promise<Document[]>;
            updateEmbeddedDocuments(embeddedName: string, updates?: object[], operation?: foundry.abstract.types.DatabaseUpdateOperation | undefined): Promise<Document[]>;
            deleteEmbeddedDocuments(embeddedName: string, ids: string[], operation?: foundry.abstract.types.DatabaseDeleteOperation | undefined): Promise<Document[]>;
            traverseEmbeddedDocuments(_parentPath?: string | undefined): Generator<any, void, any>;
            getFlag(scope: string, key: string): any;
            setFlag(scope: string, key: string, value: any): Promise<Document>;
            unsetFlag(scope: string, key: string): Promise<Document>;
            _source: object;
            parent: foundry.abstract.DataModel | null;
            readonly schema: fields.DataModelSchemaField;
            readonly invalid: boolean;
            readonly validationFailures: {
                fields: foundry.data.validation.DataModelValidationFailure | null;
                joint: foundry.data.validation.DataModelValidationFailure | null;
            };
            "__#3@#validationFailures": {
                fields: null;
                joint: null;
            };
            getFieldForProperty(key: string[] | string): fields.DataField | undefined;
            _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DocumentConstructionContext | undefined): object;
            _getInnerModel(field: fields.DataField, { value, index }?: {
                value: object;
                index?: number | undefined;
            }, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): DataModel | null;
            reset(): void;
            validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
            "__#3@#createValidationFailure"(err: Error, { joint }?: {
                joint?: boolean | undefined;
            } | undefined): foundry.data.validation.DataModelValidationFailure;
            updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
            _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
            _updateCommit(copy: object, diff: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
            "__#3@#prepareSafeSource"(changes: object): object;
            toJSON(): object;
        }>;
        importFromJSONDialog(): Promise<void>;
        toCompendium(pack?: foundry.documents.collections.CompendiumCollection<any> | undefined, { clearSort, clearFolder, clearFlags, clearSource, clearOwnership, clearState, keepId }?: foundry.types.ToCompendiumOptions | undefined): object;
        toAnchor({ attrs, dataset, classes, name, icon }?: any): HTMLAnchorElement;
        toEmbed(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLDocumentEmbedElement | HTMLElement | null>;
        onEmbed(element: HTMLDocumentEmbedElement): void;
        _buildEmbedHTML(config: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | HTMLCollection | null>;
        _createInlineEmbed(content: HTMLElement | HTMLCollection, config?: any, options?: any): Promise<HTMLElement | null>;
        _createFigureEmbed(content: HTMLElement | HTMLCollection, { cite, caption, captionPosition, label }: DocumentHTMLEmbedConfig, options?: any): Promise<HTMLElement | null>;
        getRelativeUUID(relative: any): string;
        _configure({ pack, parentCollection }?: {
            pack?: null | undefined;
            parentCollection?: null | undefined;
        }): void;
        _initializationOrder(): Generator<(string | fields.DataField | undefined)[], void, unknown>;
        readonly collectionName: any;
        readonly documentName: any;
        _getParentCollection(parentCollection?: string | null | undefined): string | null;
        readonly id: string | null;
        readonly isEmbedded: boolean;
        readonly uuid: string | null;
        _uuid: string | null | undefined;
        getUserLevel(user?: BaseUser | undefined): CONST.DocumentOwnershipNumber;
        testUserPermission(user: BaseUser, permission: CONST.DocumentOwnershipLevel, { exact }?: {
            exact?: boolean | undefined;
        }): boolean;
        canUserModify(user: BaseUser, action: string, data?: object | undefined): boolean;
        clone(data?: object | undefined, context?: (foundry.abstract.types._DataModelConstructionOptions & Pick<foundry.abstract.types.DataModelValidationOptions, "dropInvalidEmbedded" | "fallback" | "strict"> & foundry.abstract.types._DocumentConstructionContext & foundry.abstract.types.DocumentCloneOptions) | undefined): Document | Promise<Document>;
        "__#244@#discardInvalidEmbedded"(source: object): void;
        migrateSystemData(): object;
        toObject(source?: boolean): any;
        _updateDiff(copy: any, changes: any, options: any, _state: any): object;
        update(data?: object | undefined, operation?: Partial<Omit<foundry.abstract.types.DatabaseUpdateOperation, "updates">> | undefined): Promise<Document | undefined>;
        delete(operation?: Partial<Omit<foundry.abstract.types.DatabaseDeleteOperation, "ids" | "deleteAll">> | undefined): Promise<Document | undefined>;
        getEmbeddedCollection(embeddedName: string): DocumentCollection;
        getEmbeddedDocument(embeddedName: string, id: string, { invalid, strict }?: {
            strict?: boolean | undefined;
            invalid?: boolean | undefined;
        } | undefined): Document;
        createEmbeddedDocuments(embeddedName: string, data?: object[], operation?: foundry.abstract.types.DatabaseCreateOperation | undefined): Promise<Document[]>;
        updateEmbeddedDocuments(embeddedName: string, updates?: object[], operation?: foundry.abstract.types.DatabaseUpdateOperation | undefined): Promise<Document[]>;
        deleteEmbeddedDocuments(embeddedName: string, ids: string[], operation?: foundry.abstract.types.DatabaseDeleteOperation | undefined): Promise<Document[]>;
        traverseEmbeddedDocuments(_parentPath?: string | undefined): Generator<any, void, any>;
        getFlag(scope: string, key: string): any;
        setFlag(scope: string, key: string, value: any): Promise<Document>;
        unsetFlag(scope: string, key: string): Promise<Document>;
        _source: object;
        parent: foundry.abstract.DataModel | null;
        readonly schema: fields.DataModelSchemaField;
        readonly invalid: boolean;
        readonly validationFailures: {
            fields: foundry.data.validation.DataModelValidationFailure | null;
            joint: foundry.data.validation.DataModelValidationFailure | null;
        };
        "__#3@#validationFailures": {
            fields: null;
            joint: null;
        };
        getFieldForProperty(key: string[] | string): fields.DataField | undefined;
        _initializeSource(data: object | DataModel, options?: foundry.abstract.types.DocumentConstructionContext | undefined): object;
        _getInnerModel(field: fields.DataField, { value, index }?: {
            value: object;
            index?: number | undefined;
        }, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): DataModel | null;
        reset(): void;
        validate({ changes, clean, dropInvalidEmbedded, strict, fallback, fields, joint }?: foundry.abstract.types.DataModelValidationOptions): boolean;
        "__#3@#createValidationFailure"(err: Error, { joint }?: {
            joint?: boolean | undefined;
        } | undefined): foundry.data.validation.DataModelValidationFailure;
        updateSource(changes?: object, options?: foundry.abstract.types.DataModelUpdateOptions): object;
        _preUpdateSource(changes: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
        _updateCommit(copy: object, diff: object, options: foundry.abstract.types.DataModelUpdateOptions, _state: foundry.data.types.DataModelUpdateState): void;
        "__#3@#prepareSafeSource"(changes: object): object;
        toJSON(): object;
    };
    _onCreateOperation(documents: any, operation: any, user: any): Promise<void>;
    _onUpdateOperation(documents: any, operation: any, user: any): Promise<void>;
    _onDeleteOperation(documents: any, operation: any, user: any): Promise<void>;
    name: string;
    defaultName({ type, parent, pack }?: {
        type?: string | undefined;
        parent?: Document<object, foundry.abstract.types.DocumentConstructionContext> | null | undefined;
        pack?: string | null | undefined;
    }): string;
    createDialog(data?: object, createOptions?: foundry.abstract.types.DatabaseCreateOperation | undefined, { folders, types, template, context, ...dialogOptions }?: {
        folders?: {
            id: string;
            name: string;
        }[] | undefined;
        types?: string[] | undefined;
        template?: string | undefined;
        context?: object | undefined;
    } | undefined, renderOptions?: foundry.applications.types.ApplicationRenderOptions | undefined): Promise<Document | null>;
    fromDropData(data: object): Promise<Document>;
    fromImport(source: object, context?: foundry.abstract.types.DocumentConstructionContext | undefined): Promise<Document>;
    readonly schema: fields.DataModelSchemaField;
    metadata: Readonly<foundry.abstract.types.DocumentClassMetadata>;
    LOCALIZATION_PREFIXES: string[];
    readonly database: foundry.abstract.DatabaseBackend;
    readonly implementation: typeof Document;
    readonly baseDocument: typeof Document;
    readonly collectionName: string;
    readonly documentName: string;
    readonly TYPES: string[];
    readonly hasTypeData: boolean;
    readonly hierarchy: Readonly<Record<string, any>>;
    canUserCreate(user: BaseUser): boolean;
    _preCleanData(data: any, options: any, _state: any): void;
    createDocuments(data?: Array<object | Document>, operation?: Partial<Omit<foundry.abstract.types.DatabaseCreateOperation, "data">> | undefined): Promise<Document[]>;
    updateDocuments(updates?: object[], operation?: Partial<Omit<foundry.abstract.types.DatabaseUpdateOperation, "updates">> | undefined): Promise<Document[]>;
    deleteDocuments(ids?: string[], operation?: Partial<Omit<foundry.abstract.types.DatabaseDeleteOperation, "ids">> | undefined): Promise<Document[]>;
    create(data?: object | Document<object, foundry.abstract.types.DocumentConstructionContext> | (object | Document<object, foundry.abstract.types.DocumentConstructionContext>)[] | undefined, operation?: Partial<Omit<foundry.abstract.types.DatabaseCreateOperation, "data">> | undefined): Promise<Document | Document[] | undefined>;
    get(documentId: string, operation?: foundry.abstract.types.DatabaseGetOperation | undefined): Document | null;
    getCollectionName(name: string): string | null;
    _preCreateOperation(documents: Document[], operation: foundry.abstract.types.DatabaseCreateOperation, user: BaseUser): Promise<boolean | void>;
    _preUpdateOperation(documents: Document[], operation: foundry.abstract.types.DatabaseUpdateOperation, user: BaseUser): Promise<boolean | void>;
    _preDeleteOperation(documents: Document[], operation: foundry.abstract.types.DatabaseDeleteOperation, user: BaseUser): Promise<boolean | void>;
    _addDataFieldShims(data: object, shims: {
        [oldKey: string]: string;
    }, options?: {
        warning?: string | undefined;
        value?: any;
    } | undefined): void;
    _addDataFieldShim(data: object, oldKey: string, newKey: string, options?: {
        warning?: string | undefined;
        value?: any;
    } | undefined): void;
    _addDataFieldMigration(data: object, oldKey: string, newKey: string, apply?: ((data: object) => any) | undefined): boolean;
    _logDataFieldMigration(oldKey: string, newKey: string, options?: object | undefined): void;
    _clearFieldsRecursively(data: object, fieldNames: string[], options?: {
        callback?: ((data: object, fieldName: string) => any) | undefined;
    } | undefined): void;
    _schema: fields.DataModelSchemaField;
    defineSchema(): foundry.abstract.types.DataSchema;
    cleanData(data?: object | undefined, { addTypes, copy, fields, expand, migrate, model, partial, prune, persisted, sanitize, source: _optionsSource }?: foundry.data.types.DataModelCleaningOptions | undefined, _state?: Partial<foundry.data.types.DataModelUpdateState> | undefined): object;
    _cleanData(data: object, options: Readonly<foundry.data.types.DataModelCleaningOptions>, _state: foundry.data.types.DataModelUpdateState): object;
    validateJoint(data: object): void;
    fromSource(source: object, { strict, ...context }?: (Omit<foundry.abstract.types.DataModelConstructionContext, "strict"> & foundry.abstract.types.DataModelFromSourceOptions) | undefined): DataModel;
    fromJSON(json: string): DataModel;
    migrateDataSafe(source: object, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined): object;
    migrateData(source: object, options?: Readonly<foundry.data.types.DataModelCleaningOptions> | undefined, _state?: foundry.data.types.DataModelUpdateState | undefined): object;
    shimData(data: object, { embedded }?: {
        embedded?: boolean | undefined;
    } | undefined): object;
    _initializationOrder(): Generator<never, void, unknown>;
};
/**
 * @deprecated since v14
 * @ignore
 */
export default class MeasuredTemplateDocument extends MeasuredTemplateDocument_base {
    /**
     * @param {RegionDocument} region
     * @returns {MeasuredTemplateDocument}
     * @internal
     */
    static _fromRegion(region: RegionDocument): MeasuredTemplateDocument;
    /**
     * @param {object} data
     * @param {Scene} scene
     * @returns {RegionData}
     */
    static "__#120@#migrateData"(data: object, scene: Scene): RegionData;
    /** @override */
    static override createDocuments(data?: any[], operation?: {}): Promise<MeasuredTemplateDocument[]>;
    /** @override */
    static override updateDocuments(updates?: any[], operation?: {}): Promise<MeasuredTemplateDocument[]>;
    /** @override */
    static override deleteDocuments(ids: any, operation: any): Promise<MeasuredTemplateDocument[]>;
    constructor(...args: any[]);
}
import Document from "../../common/abstract/document.mjs";
import * as CONST from "../../common/constants.mjs";
import * as fields from "../../common/data/fields.mjs";
import { BaseUser } from "../../common/documents/_module.mjs";
import RegionDocument from "./region.mjs";
import type Scene from "./scene.mjs";
import type { RegionData } from "./_types.mjs";
export {};
