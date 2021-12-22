# coc-css

Css language server extension for [coc.nvim](https://github.com/neoclide/coc.nvim).

Uses [vscode-css-languageservice](https://github.com/Microsoft/vscode-css-languageservice) inside.

## Install

In your vim/neovim, run the command:

```
:CocInstall coc-css
```

For scss files, you may need use:

```vim
autocmd FileType scss setl iskeyword+=@-@
```

in your vimrc for add `@` to iskeyword option.

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

  Traces the communication between VS Code and the CSS language server, default: `"off"`

  Valid options: ["off","messages","verbose"]

- **css.customData**:

  A list of relative file paths pointing to JSON files following the [custom data format](https://github.com/microsoft/vscode-css-languageservice/blob/master/docs/customData.md). coc.nvim loads custom data on startup to enhance its CSS support for the custom CSS properties, at directives, pseudo classes and pseudo elements you specify in the JSON files. The file paths are relative to workspace and only workspace folder settings are considered, default: `[]`

- **css.completion.triggerPropertyValueCompletion**:

  By default, coc.nvim triggers property value completion after selecting a CSS property. Use this setting to disable this behavior, default: `true`

- **css.completion.completePropertyWithSemicolon**:

  Insert semicolon at end of line when completing CSS properties, default: `true`

- **css.validate**:

  Controls SCSS validation and problem severities, default: `true`

- **css.hover.documentation**:

  Show tag and attribute documentation in SCSS hovers, default: `true`

- **css.hover.references**:

  Show references to MDN in SCSS hovers, default: `true`

- **css.colorDecorators.enable**:

  default: `true`

- **css.lint.compatibleVendorPrefixes**:

  When using a vendor-specific prefix make sure to also include all other vendor-specific properties, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **css.lint.vendorPrefix**:

  When using a vendor-specific prefix also include the standard property, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **css.lint.duplicateProperties**:

  Do not use duplicate style definitions, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **css.lint.emptyRules**:

  Do not use empty rulesets, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **css.lint.importStatement**:

  Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **css.lint.boxModel**:

  Do not use `width` or `height` when using `padding` or `border`, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **css.lint.universalSelector**:

  The universal selector (`*`) is known to be slow, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **css.lint.zeroUnits**:

  No unit for zero needed, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **css.lint.fontFaceProperties**:

  `@font-face` rule must define `src` and `font-family` properties, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **css.lint.hexColorLength**:

  Hex colors must consist of three or six hex numbers, default: `"error"`

  Valid options: ["ignore","warning","error"]

- **css.lint.argumentsInColorFunction**:

  Invalid number of parameters, default: `"error"`

  Valid options: ["ignore","warning","error"]

- **css.lint.unknownProperties**:

  Unknown property, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **css.lint.validProperties**:

  A list of properties that are not validated against the `unknownProperties` rule, default: `[]`

- **css.lint.ieHack**:

  IE hacks are only necessary when supporting IE7 and older, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **css.lint.unknownVendorSpecificProperties**:

  Unknown vendor specific property, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **css.lint.propertyIgnoredDueToDisplay**:

  Property is ignored due to the display. E.g. with `display: inline`, the `width`, `height`, `margin-top`, `margin-bottom`, and `float` properties have no effect, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **css.lint.important**:

  Avoid using `!important`. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **css.lint.float**:

  Avoid using `float`. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **css.lint.idSelector**:

  Selectors should not contain IDs because these rules are too tightly coupled with the HTML, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **css.lint.unknownAtRules**:

  Unknown at-rule, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **scss.completion.triggerPropertyValueCompletion**:

  By default, coc.nvim triggers property value completion after selecting a CSS property. Use this setting to disable this behavior, default: `true`

- **scss.completion.completePropertyWithSemicolon**:

  Insert semicolon at end of line when completing CSS properties, default: `true`

- **scss.validate**:

  Controls SCSS validation and problem severities, default: `true`

- **scss.colorDecorators.enable**:

  default: `true`

- **scss.hover.documentation**:

  Show tag and attribute documentation in SCSS hovers, default: `true`

- **scss.hover.references**:

  Show references to MDN in SCSS hovers, default: `true`

- **scss.lint.compatibleVendorPrefixes**:

  When using a vendor-specific prefix make sure to also include all other vendor-specific properties, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.vendorPrefix**:

  When using a vendor-specific prefix, also include the standard property, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.duplicateProperties**:

  Do not use duplicate style definitions, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.emptyRules**:

  Do not use empty rulesets, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.importStatement**:

  Import statements do not load in parallel, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.boxModel**:

  Do not use `width` or `height` when using `padding` or `border`, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.universalSelector**:

  The universal selector (`*`) is known to be slow, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.zeroUnits**:

  No unit for zero needed, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.fontFaceProperties**:

  `@font-face` rule must define `src` and `font-family` properties, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.hexColorLength**:

  Hex colors must consist of three or six hex numbers, default: `"error"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.argumentsInColorFunction**:

  Invalid number of parameters, default: `"error"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.unknownProperties**:

  Unknown property, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.validProperties**:

  A list of properties that are not validated against the `unknownProperties` rule, default: `[]`

- **scss.lint.ieHack**:

  IE hacks are only necessary when supporting IE7 and older, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.unknownVendorSpecificProperties**:

  Unknown vendor specific property, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.propertyIgnoredDueToDisplay**:

  Property is ignored due to the display. E.g. with `display: inline`, the `width`, `height`, `margin-top`, `margin-bottom`, and `float` properties have no effect, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.important**:

  Avoid using `!important`. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.float**:

  Avoid using `float`. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.idSelector**:

  Selectors should not contain IDs because these rules are too tightly coupled with the HTML, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **scss.lint.unknownAtRules**:

  Unknown at-rule, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **less.completion.triggerPropertyValueCompletion**:

  By default, coc.nvim triggers property value completion after selecting a CSS property. Use this setting to disable this behavior, default: `true`

- **less.completion.completePropertyWithSemicolon**:

  Insert semicolon at end of line when completing CSS properties, default: `true`

- **less.validate**:

  Enables or disables all validations, default: `true`

- **less.colorDecorators.enable**:

  default: `true`

- **less.hover.documentation**:

  Show tag and attribute documentation in LESS hovers, default: `true`

- **less.hover.references**:

  Show references to MDN in LESS hovers, default: `true`

- **less.lint.compatibleVendorPrefixes**:

  When using a vendor-specific prefix make sure to also include all other vendor-specific properties, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **less.lint.vendorPrefix**:

  When using a vendor-specific prefix also include the standard property, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **less.lint.duplicateProperties**:

  Do not use duplicate style definitions, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **less.lint.emptyRules**:

  Do not use empty rulesets, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **less.lint.importStatement**:

  Avoid using !important. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **less.lint.boxModel**:

  Do not use `width` or `height` when using `padding` or `border`, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **less.lint.universalSelector**:

  The universal selector (\*) is known to be slow, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **less.lint.zeroUnits**:

  No unit for zero needed, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **less.lint.fontFaceProperties**:

  `@font-face` rule must define `src` and `font-family` properties, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **less.lint.hexColorLength**:

  Hex colors must consist of three or six hex numbers, default: `"error"`

  Valid options: ["ignore","warning","error"]

- **less.lint.argumentsInColorFunction**:

  Invalid number of parameters, default: `"error"`

  Valid options: ["ignore","warning","error"]

- **less.lint.unknownProperties**:

  Unknown property, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **less.lint.validProperties**:

  A list of properties that are not validated against the `unknownProperties` rule, default: `[]`

- **less.lint.ieHack**:

  IE hacks are only necessary when supporting IE7 and older, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **less.lint.unknownVendorSpecificProperties**:

  Unknown vendor specific property, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **less.lint.propertyIgnoredDueToDisplay**:

  Property is ignored due to the display. E.g. with `display: inline`, the `width`, `height`, `margin-top`, `margin-bottom`, and `float` properties have no effect, default: `"warning"`

  Valid options: ["ignore","warning","error"]

- **less.lint.important**:

  Avoid using `!important`. It is an indication that the specificity of the entire CSS has gotten out of control and needs to be refactored, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **less.lint.float**:

  Avoid using `float`. Floats lead to fragile CSS that is easy to break if one aspect of the layout changes, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **less.lint.idSelector**:

  Selectors should not contain IDs because these rules are too tightly coupled with the HTML, default: `"ignore"`

  Valid options: ["ignore","warning","error"]

- **less.lint.unknownAtRules**:

  Unknown at-rule, default: `"warning"`

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
