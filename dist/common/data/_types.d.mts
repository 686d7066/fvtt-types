/**
 * A Custom DataField validator function.
 *
 * A boolean return value indicates that the value is valid (true) or invalid (false) with certainty. With an explicit
 * boolean return value no further validation functions will be evaluated.
 *
 * An undefined return indicates that the value may be valid but further validation functions should be performed,
 * if defined.
 *
 * An Error may be thrown which provides a custom error message explaining the reason the value is invalid.
 */
export type DataFieldValidator = (value: any, options: DataFieldValidationOptions) => boolean | void;
export type DataFieldOptions = {
    /**
     * Is this field required to be populated?
     */
    required?: boolean | undefined;
    /**
     * Can this field have null values?
     */
    nullable?: boolean | undefined;
    /**
     * Should the initialized (prepared) property of the DataModel instance for this
     *    field be read-only, i.e. nonwritable and nonconfigurable? The source value of
     *    a read-only field can still be changed by `updateSource`, but a source change
     *    won't necessarily be reflected on the prepared value. Usually the prepared
     *    value of a read-only field is effectively immutable, but not in all cases:
     *    for example, `EmbeddedCollectionField`. The `_id` field is a special behavior:
     *    the prepared property becomes nonconfigurable only after the source value
     *    becomes a nonnull value for the first time.
     */
    readonly?: boolean | undefined;
    /**
     * Is a value of this field written to source data? A Non-persisted value is
     *    initialized (with its initial value), and ActiveEffects can use the field
     *    for change application.
     */
    persisted?: boolean | undefined;
    /**
     * Can this field only be modified by a gamemaster or assistant gamemaster?
     */
    gmOnly?: boolean | undefined;
    /**
     * The initial value of a field, or a function which assigns that initial value.
     */
    initial?: Function | any;
    /**
     * A localizable label displayed on forms which render this field.
     */
    label?: string | undefined;
    /**
     * Localizable help text displayed on forms which render this field.
     */
    hint?: string | undefined;
    /**
     * Localizable text displayed in placeholders of form inputs which render this field.
     */
    placeholder?: string | undefined;
    /**
     * A custom data field validation function.
     */
    validate?: DataFieldValidator | undefined;
    /**
     * A custom validation error string. When displayed will be prepended with the
     *    document name, field name, and candidate value. This error string is only
     *    used when the return type of the validate function is a boolean. If an Error
     *    is thrown in the validate function, the string message of that Error is used.
     */
    validationError?: string | undefined;
};
export type DataFieldContext = {
    /**
     * A field name to assign to the constructed field
     */
    name?: string | undefined;
    /**
     * Another data field which is a hierarchical parent of this one
     */
    parent?: any;
};
export type DataFieldValidationOptions = {
    /**
     * Whether this is a partial schema validation, or a complete one.
     */
    partial?: boolean | undefined;
    /**
     * Whether to allow replacing invalid values with valid fallbacks.
     */
    fallback?: boolean | undefined;
    /**
     * The full source object being evaluated.
     */
    source?: object | undefined;
    /**
     * Whether to throw a DataModelValidationFailure (true) or simply return it (false)
     */
    strict?: boolean | undefined;
    /**
     * If true, invalid embedded documents will emit a warning and be placed in
     *   the invalidDocuments collection rather than causing the parent to be
     *   considered invalid.
     */
    dropInvalidEmbedded?: boolean | undefined;
};
export type DataModelCleaningOptions = {
    /**
     * Impute types for polymorphic so that those typed fields can be later used or
     *    validated
     */
    addTypes?: boolean | undefined;
    /**
     * Copy the provided input data to avoid mutating the provided source
     */
    copy?: boolean | undefined;
    /**
     * Automatically expand any flattened objects encountered during cleaning
     */
    expand?: boolean | undefined;
    /**
     * Apply model-specific data migrations
     */
    migrate?: boolean | undefined;
    /**
     * Apply joint model-level cleaning rules
     */
    model?: boolean | undefined;
    /**
     * Perform partial cleaning only on the subset of keys included in the input
     *     data. If partial is `false`, values for keys missing in the input data will be
     *     imputed if possible
     */
    partial?: boolean | undefined;
    /**
     * Remove keys which do not belong to the defined data schema
     */
    prune?: boolean | undefined;
    /**
     * Remove keys corresponding with non-persisted DataFields.
     */
    persisted?: boolean | undefined;
    /**
     * Configuration of user input sanitization steps that are
     * applied as part of cleaning. For internal server-side use only.
     */
    sanitize?: boolean | DataModelSanitizationOptions | undefined;
};
export type DataModelUpdateState = {
    /**
     * Are we in the context of a new model creation?
     */
    creation?: boolean | undefined;
    /**
     * The DataModel instance being cleaned
     */
    model?: any;
    /**
     * Prior source data at the current node
     */
    source?: any;
    /**
     * Prior source data at the nearest DataModel root being cleaned
     */
    modelSource?: object | undefined;
    /**
     * Has source data already been expanded?
     */
    expanded?: boolean | undefined;
    /**
     * Metadata resulting from sanitization workflows
     */
    sanitization?: object | undefined;
    /**
     * In a Document context, records its _id
     */
    documentId?: string | undefined;
    /**
     * In a Document context, records its base type
     */
    documentType?: string | undefined;
    /**
     * In a ServerDocument context, records the timestamp of modification
     */
    modifiedTime?: number | undefined;
    /**
     * In a ServerDocument context, records the user performing the operation
     */
    user?: any;
    /**
     * Have the {@link DataModelCleaningOptions} been fully populated?
     */
    cleanOptions?: boolean | undefined;
};
export type DataModelSanitizationOptions = {
    /**
     * Sanitization as part of creation?
     */
    creation?: boolean | undefined;
    /**
     * A file path to which sanitized assets should be persisted to disk
     */
    assetPath?: string | undefined;
    /**
     * Skip system sanitization?
     */
    skipSystem?: boolean | undefined;
    /**
     * The User performing an operation which requires sanitization
     */
    user?: any;
    /**
     * Clean data out of stats?
     */
    deleteStats?: boolean | undefined;
};
export type EmbeddedCollectionUpdateContext = {
    /**
     * The current source array of the parent collection.
     */
    source: object[];
    /**
     * The replacement source array, same as source unless replacement.
     */
    newSource: object[];
    /**
     * Whether the requested update is a ForcedReplacement.
     */
    isReplacement: boolean;
    /**
     * The accumulating diff array of changes.
     */
    diff: object[];
    /**
     * The embedded collection on the parent Document.
     */
    collection: DocumentCollection;
    /**
     * The DataModel update state shared with the rest of _updateDiff.
     */
    state: object;
    /**
     * The collection-level validation failure under construction.
     */
    failure: DataModelValidationFailure;
};
export type FormGroupConfig = {
    /**
     * A text label to apply to the form group
     */
    label: string;
    /**
     * An optional units string which is appended to the label
     */
    units?: string | undefined;
    /**
     * An HTML element or collection of elements which provide the inputs
     * for the group
     */
    input: HTMLElement | HTMLCollection;
    /**
     * Hint text displayed as part of the form group
     */
    hint?: string | undefined;
    /**
     * Some parent CSS id within which field names are unique. If provided,
     *                       this root ID is used to automatically assign "id" attributes to
     *                       input elements and "for" attributes to corresponding labels.
     */
    rootId?: string | undefined;
    /**
     * An array of CSS classes applied to the form group element
     */
    classes?: string[] | undefined;
    /**
     * Is the "stacked" class applied to the form group
     */
    stacked?: boolean | undefined;
    /**
     * Should labels or other elements within this form group be
     *              automatically localized?
     */
    localize?: boolean | undefined;
    /**
     * The value of the form group's hidden attribute
     */
    hidden?: boolean | "until-found" | undefined;
    /**
     * A custom form group widget function which replaces the default
     *              group HTML generation
     */
    widget?: any;
};
export type FormInputConfig<FormInputValue = unknown> = {
    /**
     * The name of the form element
     */
    name: string;
    /**
     * Whether the element should be named in the form. If false, the element
     *                will be given a name via data attribute only.
     */
    named?: boolean | undefined;
    /**
     * The current value of the form element
     */
    value?: FormInputValue | undefined;
    /**
     * An id to assign to the element
     */
    id?: string | undefined;
    /**
     * Is the field required?
     */
    required?: boolean | undefined;
    /**
     * Is the field disabled?
     */
    disabled?: boolean | undefined;
    /**
     * Is the field readonly?
     */
    readonly?: boolean | undefined;
    /**
     * Is the field autofocused?
     */
    autofocus?: boolean | undefined;
    /**
     * Localize values of this field?
     */
    localize?: boolean | undefined;
    /**
     * Additional dataset attributes to assign to the input
     */
    dataset?: Record<string, string> | undefined;
    /**
     * Aria attributes to assign to the input
     */
    aria?: Record<string, string> | undefined;
    /**
     * A placeholder value, if supported by the element type
     */
    placeholder?: string | undefined;
    /**
     * Space-delimited class names to apply to the input.
     */
    classes?: string | undefined;
    /**
     * Some parent CSS id within which field names are unique. If provided,
     *                     this root ID is used to automatically assign "id" attributes to
     *                     input elements and "for" attributes to corresponding labels.
     */
    rootId?: string | undefined;
    input?: any;
    /**
     * The DataModel instance the field belongs to
     */
    model?: any;
};
export type StringFieldInputConfig = {
    /**
     * The element to create for this
     *  form field
     */
    elementType?: "input" | "textarea" | "prose-mirror" | "code-mirror" | undefined;
};
export type CodeMirrorLanguage = "javascript" | "json" | "html" | "markdown" | "" | "plain";
export type CodeMirrorInputConfig = {
    /**
     * The value's language
     */
    language?: CodeMirrorLanguage | undefined;
    /**
     * The number of spaces per level of indentation
     */
    indent?: number | undefined;
};
export type LightAnimationData = {
    /**
     * The animation type which is applied
     */
    type: string;
    /**
     * The speed of the animation, a number between 0 and 10
     */
    speed: number;
    /**
     * The intensity of the animation, a number between 1 and 10
     */
    intensity: number;
    /**
     * Reverse the direction of animation.
     */
    reverse: boolean;
};
/**
 * {@ignore}
 */
export type _NumberFieldOptions = {
    /**
     * A minimum allowed value
     */
    min?: number | undefined;
    /**
     * A maximum allowed value
     */
    max?: number | undefined;
    /**
     * A permitted step size
     */
    step?: number | undefined;
    /**
     * Must the number be an integer?
     */
    integer?: boolean | undefined;
    /**
     * Must the number be positive?
     */
    positive?: boolean | undefined;
    /**
     * An array of values or an object of values/labels which represent
     * allowed choices for the field. A function may be provided which dynamically
     * returns the array of choices.
     */
    choices?: object | Function | number[] | undefined;
};
/**
 * {@interface}
 */
export type NumberFieldOptions = DataFieldOptions & _NumberFieldOptions;
/**
 * {@ignore}
 */
export type _StringFieldOptions = {
    /**
     * Is the string allowed to be blank (empty)?
     */
    blank?: boolean | undefined;
    /**
     * Should any provided string be trimmed as part of cleaning?
     */
    trim?: boolean | undefined;
    /**
     * An array of values or an object of values/labels which represent
     * allowed choices for the field. A function may be provided which dynamically
     * returns the array of choices.
     */
    choices?: object | Function | string[] | undefined;
    /**
     * Is this string field a target for text search?
     */
    textSearch?: boolean | undefined;
};
/**
 * {@interface}
 */
export type StringFieldOptions = DataFieldOptions & _StringFieldOptions;
export type ChoiceInputConfig = {
    options: FormSelectOption[];
    choices: Record<string | number, any> | any[] | (() => Record<string | number, any> | any[]);
    labelAttr?: string | undefined;
    valueAttr?: string | undefined;
};
export type _ArrayFieldOptions = {
    /**
     * The minimum number of elements.
     */
    min?: number | undefined;
    /**
     * The maximum number of elements.
     */
    max?: number | undefined;
};
export type ArrayFieldOptions = DataFieldOptions & _ArrayFieldOptions;
export type TypedObjectKeyValidator = (key: string) => boolean;
export type _TypedObjectFieldOptions = {
    /**
     * A predicate to filter out invalid keys.
     */
    validateKey?: TypedObjectKeyValidator | undefined;
    /**
     * Whether to expand dot-delimited keys.
     */
    expandKeys?: boolean | undefined;
};
export type TypedObjectFieldOptions = DataFieldOptions & _TypedObjectFieldOptions;
export type _DocumentUUIDFieldOptions = {
    /**
     * A specific document type in {@link CONST.ALL_DOCUMENT_TYPES} required by this field
     */
    type?: string | undefined;
    /**
     * Does this field require (or prohibit) embedded documents?
     */
    embedded?: boolean | undefined;
    /**
     * Does this field allow relative document UUIDs?
     */
    relative?: boolean | undefined;
};
export type DocumentUUIDFieldOptions = StringFieldOptions & _DocumentUUIDFieldOptions;
export type _FilePathFieldOptions = {
    /**
     * A set of categories in {@link CONST.FILE_CATEGORIES} which this field supports
     */
    categories?: string[] | undefined;
    /**
     * Is embedded base64 data supported in lieu of a file path?
     */
    base64?: boolean | undefined;
    /**
     * Does the file path field allow specifying a virtual file path which must begin
     *   with the "#" character?
     */
    virtual?: boolean | undefined;
    /**
     * Does this file path field allow wildcard characters?
     */
    wildcard?: boolean | undefined;
    /**
     * The initial values of the fields
     */
    initial?: object | undefined;
};
export type FilePathFieldOptions = StringFieldOptions & _FilePathFieldOptions;
export type DocumentFlags = Record<string, Record<string, unknown>>;
export type DocumentStats = {
    /**
     * The core version whose schema the Document data is in.
     * It is NOT the version the Document was created or last modified in.
     */
    coreVersion: string | null;
    /**
     * The package name of the system the Document was created in.
     */
    systemId: string | null;
    /**
     * The version of the system the Document was created or last modified in.
     */
    systemVersion: string | null;
    /**
     * A timestamp of when the Document was created.
     */
    createdTime: number | null;
    /**
     * A timestamp of when the Document was last modified.
     */
    modifiedTime: number | null;
    /**
     * The ID of the user who last modified the Document.
     */
    lastModifiedBy: string | null;
    /**
     * The UUID of the compendium Document this one was imported from.
     */
    compendiumSource: string | null;
    /**
     * The UUID of the Document this one is a duplicate of.
     */
    duplicateSource: string | null;
};
export type _JavaScriptFieldOptions = {
    /**
     * Does the field allow async code?
     */
    async?: boolean | undefined;
};
export type JavaScriptFieldOptions = StringFieldOptions & _JavaScriptFieldOptions;
/**
 * {@ignore}
 */
export type _GridOffsetFieldOptions = {
    /**
     * The dimensions. Default: `2`.
     */
    dimensions?: 2 | 3 | undefined;
};
/**
 * {@interface}
 */
export type GridOffsetFieldOptions = DataFieldOptions & _GridOffsetFieldOptions;
/**
 * {@interface}
 */
export type GridOffsetsFieldOptions = ArrayFieldOptions & _GridOffsetFieldOptions;
