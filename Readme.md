# coc-css

Css language server extension for [coc.nvim](https://github.com/neoclide/coc.nvim).

Uses [vscode-css-languageservice](https://github.com/Microsoft/vscode-css-languageservice) inside.

## Install

In your vim/neovim, run the command:

```
:CocInstall coc-css
```

## Features

Coc has support for all features that [vscode-css-languageservice](https://www.npmjs.com/package/vscode-css-languageservice) has.

- `doValidation` analyzes an input string and returns syntax and lint errros.
- `doComplete` provides completion proposals for a given location.
- `doHover` provides a hover text for a given location.
- `findDefinition` finds the definition of the symbol at the given location.
- `findReferences` finds all references to the symbol at the given location.
- `findDocumentHighlights` finds all symbols connected to the given location.
- `findDocumentSymbols` provides all symbols in the given document
- `doCodeActions` evaluates code actions for the given location, typically to fix a problem.
- `findColorSymbols` evaluates all color symbols in the given document
- `doRename` renames all symbols connected to the given location.
- `getFoldingRanges` returns folding ranges in the given document.

## Configuration options

- **css.enable**:

	 default: `true`

- **css.trace.server**:

	 default: `"off"`

	Valid options: ["off","messages","verbose"]

- **css.customData**:

	 default: `[]`

- **css.completion.triggerPropertyValueCompletion**:

	By default, coc.nvim triggers property value completion after selecting a CSS property. Use this setting to disable this behavior.,  default: `true`

- **css.completion.completePropertyWithSemicolon**:

	Insert semicolon at end of line when completing CSS properties,  default: `true`

- **css.validate**:

	 default: `true`

- **css.colorDecorators.enable**:

	 default: `true`

- **css.lint.compatibleVendorPrefixes**:

	When using a vendor-specific prefix make sure to also include all other vendor-specific properties,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **css.lint.vendorPrefix**:

	When using a vendor-specific prefix also include the standard property,  default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **css.lint.duplicateProperties**:

	Do not use duplicate style definitions,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **css.lint.emptyRules**:

	Do not use empty rulesets,  default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **css.lint.importStatement**:

	Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored.,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **css.lint.boxModel**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **css.lint.universalSelector**:

	The universal selector (*) is known to be slow,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **css.lint.zeroUnits**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **css.lint.fontFaceProperties**:

	@font-face rule must define 'src' and 'font-family' properties,  default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **css.lint.hexColorLength**:

	Hex colors must consist of three or six hex numbers,  default: `"error"`

	Valid options: ["ignore","warning","error"]

- **css.lint.argumentsInColorFunction**:

	Invalid number of parameters,  default: `"error"`

	Valid options: ["ignore","warning","error"]

- **css.lint.unknownProperties**:

	Unknown property.,  default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **css.lint.ieHack**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **css.lint.unknownVendorSpecificProperties**:

	Unknown vendor specific property.,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **css.lint.propertyIgnoredDueToDisplay**:

	Property is ignored due to the display. E.g. with 'display: inline', the width, height, margin-top, margin-bottom, and float properties have no effect,  default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **css.lint.important**:

	Import statements do not load in parallel,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **css.lint.float**:

	Avoid using 'float'. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes.,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **css.lint.idSelector**:

	Selectors should not contain IDs because these rules are too tightly coupled with the HTML.,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **css.lint.unknownAtRules**:

	Unknown at-rule.,  default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **less.completion.triggerPropertyValueCompletion**:

	By default, coc.nvim triggers property value completion after selecting a CSS property. Use this setting to disable this behavior.,  default: `true`

- **less.completion.completePropertyWithSemicolon**:

	Insert semicolon at end of line when completing CSS properties,  default: `true`

- **less.validate**:

	 default: `true`

- **less.colorDecorators.enable**:

	 default: `true`

- **less.lint.compatibleVendorPrefixes**:

	When using a vendor-specific prefix make sure to also include all other vendor-specific properties,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **less.lint.vendorPrefix**:

	When using a vendor-specific prefix also include the standard property,  default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **less.lint.duplicateProperties**:

	Do not use duplicate style definitions,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **less.lint.emptyRules**:

	Do not use empty rulesets,  default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **less.lint.importStatement**:

	Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored.,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **less.lint.boxModel**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **less.lint.universalSelector**:

	The universal selector (*) is known to be slow,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **less.lint.zeroUnits**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **less.lint.fontFaceProperties**:

	@font-face rule must define 'src' and 'font-family' properties,  default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **less.lint.hexColorLength**:

	Hex colors must consist of three or six hex numbers,  default: `"error"`

	Valid options: ["ignore","warning","error"]

- **less.lint.argumentsInColorFunction**:

	Invalid number of parameters,  default: `"error"`

	Valid options: ["ignore","warning","error"]

- **less.lint.unknownProperties**:

	Unknown property.,  default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **less.lint.ieHack**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **less.lint.unknownVendorSpecificProperties**:

	Unknown vendor specific property.,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **less.lint.propertyIgnoredDueToDisplay**:

	Property is ignored due to the display. E.g. with 'display: inline', the width, height, margin-top, margin-bottom, and float properties have no effect,  default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **less.lint.important**:

	Import statements do not load in parallel,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **less.lint.float**:

	Avoid using 'float'. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes.,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **less.lint.idSelector**:

	Selectors should not contain IDs because these rules are too tightly coupled with the HTML.,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **less.lint.unknownAtRules**:

	Unknown at-rule.,  default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **scss.completion.triggerPropertyValueCompletion**:

	By default, coc.nvim triggers property value completion after selecting a CSS property. Use this setting to disable this behavior.,  default: `true`

- **scss.completion.completePropertyWithSemicolon**:

	Insert semicolon at end of line when completing CSS properties,  default: `true`

- **scss.validate**:

	 default: `true`

- **scss.colorDecorators.enable**:

	 default: `true`

- **scss.lint.compatibleVendorPrefixes**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.vendorPrefix**:

	 default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.duplicateProperties**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.emptyRules**:

	 default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.importStatement**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.boxModel**:

	Do not use width or height when using padding or border,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.universalSelector**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.zeroUnits**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.fontFaceProperties**:

	 default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.hexColorLength**:

	 default: `"error"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.argumentsInColorFunction**:

	 default: `"error"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.unknownProperties**:

	 default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.ieHack**:

	IE hacks are only necessary when supporting IE7 and older,  default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.unknownVendorSpecificProperties**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.propertyIgnoredDueToDisplay**:

	 default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.important**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.float**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **scss.lint.idSelector**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **wxss.validate**:

	 default: `true`

- **wxss.colorDecorators.enable**:

	 default: `true`

- **wxss.lint.compatibleVendorPrefixes**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.vendorPrefix**:

	 default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.duplicateProperties**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.emptyRules**:

	 default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.importStatement**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.boxModel**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.universalSelector**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.zeroUnits**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.fontFaceProperties**:

	 default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.hexColorLength**:

	 default: `"error"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.argumentsInColorFunction**:

	 default: `"error"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.unknownProperties**:

	 default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.ieHack**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.unknownVendorSpecificProperties**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.propertyIgnoredDueToDisplay**:

	 default: `"warning"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.important**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.float**:

	 default: `"ignore"`

	Valid options: ["ignore","warning","error"]

- **wxss.lint.idSelector**:

    default: `"ignore"`

  Valid options: ["ignore","warning","error"]

## License

MIT
