# coc-css

Css language server extension for [coc.nvim](https://github.com/neoclide/coc.nvim).

Uses [vscode-css-languageservice](https://github.com/Microsoft/vscode-css-languageservice) inside.

**Note**: words are exetracted by `iskeyword` option of buffer, you may want to
adjust it by command like:

    autocmd FileType css setl iskeyword+=-

**Note** configuration `css.enable` and wxss support removed from 2.0.0.

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

All features that [vscode-css-languageservice](https://www.npmjs.com/package/vscode-css-languageservice) provide should work.

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
- `format` format css/scss/less files.

## Configuration options

Checkout `:h coc-configuration` in your vim for guide of coc.nvim's configuration.

- `css.execArgv`: Extra arguments for node which start language server. default: `[]`
- `css.customData`: default: `[]`
- `css.completion.triggerPropertyValueCompletion`: By default, VS Code triggers property value completion after selecting a CSS property. Use this setting to disable this behavior. default: `true`
- `css.completion.completePropertyWithSemicolon`: Insert semicolon at end of line when completing CSS properties. default: `true`
- `css.validate`: Enables or disables all validations. default: `true`
- `css.hover.documentation`: Show tag and attribute documentation in CSS hovers. default: `true`
- `css.hover.references`: Show references to MDN in CSS hovers. default: `true`
- `css.lint.compatibleVendorPrefixes`: When using a vendor-specific prefix make sure to also include all other vendor-specific properties. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `css.lint.vendorPrefix`: When using a vendor-specific prefix, also include the standard property. default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `css.lint.duplicateProperties`: Do not use duplicate style definitions. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `css.lint.emptyRules`: Do not use empty rulesets. default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `css.lint.importStatement`: Import statements do not load in parallel. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `css.lint.boxModel`: default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `css.lint.universalSelector`: default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `css.lint.zeroUnits`: No unit for zero needed. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `css.lint.fontFaceProperties`: default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `css.lint.hexColorLength`: Hex colors must consist of three or six hex numbers. default: `"error"`
  Valid options: ["ignore","warning","error"]
- `css.lint.argumentsInColorFunction`: Invalid number of parameters. default: `"error"`
  Valid options: ["ignore","warning","error"]
- `css.lint.unknownProperties`: Unknown property. default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `css.lint.validProperties`: A list of properties that are not validated against the `unknownProperties` rule. default: `[]`
- `css.lint.ieHack`: IE hacks are only necessary when supporting IE7 and older. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `css.lint.unknownVendorSpecificProperties`: Unknown vendor specific property. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `css.lint.propertyIgnoredDueToDisplay`: default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `css.lint.important`: default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `css.lint.float`: default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `css.lint.idSelector`: Selectors should not contain IDs because these rules are too tightly coupled with the HTML. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `css.lint.unknownAtRules`: Unknown at-rule. default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `css.trace.server`: Traces the communication between VS Code and the CSS language server. default: `"off"`
  Valid options: ["off","messages","verbose"]
- `css.format.enable`: Enable/disable default CSS formatter. default: `true`
- `css.format.newlineBetweenSelectors`: default: `true`
- `css.format.newlineBetweenRules`: default: `true`
- `css.format.spaceAroundSelectorSeparator`: default: `false`
- `css.format.braceStyle`: default: `"collapse"`
  Valid options: ["collapse","expand"]
- `css.format.preserveNewLines`: default: `true`
- `css.format.maxPreserveNewLines`: default: `null`
- `scss.completion.triggerPropertyValueCompletion`: By default, VS Code triggers property value completion after selecting a CSS property. Use this setting to disable this behavior. default: `true`
- `scss.completion.completePropertyWithSemicolon`: Insert semicolon at end of line when completing CSS properties. default: `true`
- `scss.validate`: Enables or disables all validations. default: `true`
- `scss.hover.documentation`: Show tag and attribute documentation in SCSS hovers. default: `true`
- `scss.hover.references`: Show references to MDN in SCSS hovers. default: `true`
- `scss.lint.compatibleVendorPrefixes`: When using a vendor-specific prefix make sure to also include all other vendor-specific properties. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.vendorPrefix`: When using a vendor-specific prefix, also include the standard property. default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.duplicateProperties`: Do not use duplicate style definitions. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.emptyRules`: Do not use empty rulesets. default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.importStatement`: Import statements do not load in parallel. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.boxModel`: default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.universalSelector`: default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.zeroUnits`: No unit for zero needed. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.fontFaceProperties`: default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.hexColorLength`: Hex colors must consist of three or six hex numbers. default: `"error"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.argumentsInColorFunction`: Invalid number of parameters. default: `"error"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.unknownProperties`: Unknown property. default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.validProperties`: A list of properties that are not validated against the `unknownProperties` rule. default: `[]`
- `scss.lint.ieHack`: IE hacks are only necessary when supporting IE7 and older. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.unknownVendorSpecificProperties`: Unknown vendor specific property. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.propertyIgnoredDueToDisplay`: default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.important`: default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.float`: default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.idSelector`: Selectors should not contain IDs because these rules are too tightly coupled with the HTML. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `scss.lint.unknownAtRules`: Unknown at-rule. default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `scss.format.enable`: Enable/disable default SCSS formatter. default: `true`
- `scss.format.newlineBetweenSelectors`: default: `true`
- `scss.format.newlineBetweenRules`: default: `true`
- `scss.format.spaceAroundSelectorSeparator`: default: `false`
- `scss.format.braceStyle`: default: `"collapse"`
  Valid options: ["collapse","expand"]
- `scss.format.preserveNewLines`: default: `true`
- `scss.format.maxPreserveNewLines`: default: `null`
- `less.completion.triggerPropertyValueCompletion`: By default, VS Code triggers property value completion after selecting a CSS property. Use this setting to disable this behavior. default: `true`
- `less.completion.completePropertyWithSemicolon`: Insert semicolon at end of line when completing CSS properties. default: `true`
- `less.validate`: Enables or disables all validations. default: `true`
- `less.hover.documentation`: Show tag and attribute documentation in LESS hovers. default: `true`
- `less.hover.references`: Show references to MDN in LESS hovers. default: `true`
- `less.lint.compatibleVendorPrefixes`: When using a vendor-specific prefix make sure to also include all other vendor-specific properties. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `less.lint.vendorPrefix`: When using a vendor-specific prefix, also include the standard property. default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `less.lint.duplicateProperties`: Do not use duplicate style definitions. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `less.lint.emptyRules`: Do not use empty rulesets. default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `less.lint.importStatement`: Import statements do not load in parallel. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `less.lint.boxModel`: default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `less.lint.universalSelector`: default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `less.lint.zeroUnits`: No unit for zero needed. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `less.lint.fontFaceProperties`: default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `less.lint.hexColorLength`: Hex colors must consist of three or six hex numbers. default: `"error"`
  Valid options: ["ignore","warning","error"]
- `less.lint.argumentsInColorFunction`: Invalid number of parameters. default: `"error"`
  Valid options: ["ignore","warning","error"]
- `less.lint.unknownProperties`: Unknown property. default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `less.lint.validProperties`: A list of properties that are not validated against the `unknownProperties` rule. default: `[]`
- `less.lint.ieHack`: IE hacks are only necessary when supporting IE7 and older. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `less.lint.unknownVendorSpecificProperties`: Unknown vendor specific property. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `less.lint.propertyIgnoredDueToDisplay`: default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `less.lint.important`: default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `less.lint.float`: default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `less.lint.idSelector`: Selectors should not contain IDs because these rules are too tightly coupled with the HTML. default: `"ignore"`
  Valid options: ["ignore","warning","error"]
- `less.lint.unknownAtRules`: Unknown at-rule. default: `"warning"`
  Valid options: ["ignore","warning","error"]
- `less.format.enable`: Enable/disable default LESS formatter. default: `true`
- `less.format.newlineBetweenSelectors`: default: `true`
- `less.format.newlineBetweenRules`: default: `true`
- `less.format.spaceAroundSelectorSeparator`: default: `false`
- `less.format.braceStyle`: default: `"collapse"`
  Valid options: ["collapse","expand"]
- `less.format.preserveNewLines`: default: `true`
- `less.format.maxPreserveNewLines`: default: `null`

## License

MIT
