export type RollOptions = {
    flavor?: string | null;
    [key: string]: unknown;
};
export type DiceTermResult = {
    /**
     * The numeric result
     */
    result: number;
    /**
     * Is this result active, contributing to the total?
     */
    active?: boolean | undefined;
    /**
     * A value that the result counts as, otherwise the result is not used directly as
     */
    count?: number | undefined;
    /**
     * Does this result denote a success?
     */
    success?: boolean | undefined;
    /**
     * Does this result denote a failure?
     */
    failure?: boolean | undefined;
    /**
     * Was this result discarded?
     */
    discarded?: boolean | undefined;
    /**
     * Was this result rerolled?
     */
    rerolled?: boolean | undefined;
    /**
     * Was this result exploded?
     */
    exploded?: boolean | undefined;
};
export type ReplaceFormulaDataOptions = {
    /**
     * The value that should be assigned to any unmatched keys. If undefined, the
     *        unmatched key is left as-is.
     */
    missing?: string | undefined;
    /**
     * Display a warning notification when encountering an unmatched key.
     */
    warn?: boolean | undefined;
    /**
     * If new expressions are found after replacing "@" expressions, perform
     *  replacement again (recursion limit of 3).
     */
    recursive?: boolean | undefined;
};
export type RollParseOffset = {
    /**
     * The start position of the matched term in the formula string.
     */
    start: number;
    /**
     * The end position of the matched term in the formula string.
     */
    end: number;
};
export type RollParseNode = {
    /**
     * The class name for this node.
     */
    class: string;
    /**
     * The original matched text for this node.
     */
    formula: string;
    /**
     * The position of the matched term in the formula string.
     */
    offset: RollParseOffset;
};
export type RollParseTreeNode = RollParseNode;
export type FlavorRollParseNode = RollParseNode;
export type ModifiersRollParseNode = FlavorRollParseNode;
export type NumericRollParseNode = FlavorRollParseNode;
export type FunctionRollParseNode = FlavorRollParseNode;
export type PoolRollParseNode = ModifiersRollParseNode;
export type ParentheticalRollParseNode = FlavorRollParseNode;
export type StringParseNode = FlavorRollParseNode;
export type DiceRollParseNode = ModifiersRollParseNode;
export type RollParseArg = any;
