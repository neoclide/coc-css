
# Sourcegraph TSLint config

[![npm](https://img.shields.io/npm/v/@sourcegraph/tslint-config.svg)](https://www.npmjs.com/package/@sourcegraph/tslint-config)
[![downloads](https://img.shields.io/npm/dt/@sourcegraph/tslint-config.svg)](https://www.npmjs.com/package/@sourcegraph/tslint-config)
[![build](https://travis-ci.org/sourcegraph/tslint-config.svg?branch=master)](https://travis-ci.org/sourcegraph/tslint-config)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

TSLint rules for TypeScript projects at Sourcegraph.

## Usage

```
npm install --save-dev @sourcegraph/tslint-config
```

Then add this tslint.json:

```json
{
  "extends": "@sourcegraph/tslint-config"
}
```

## Making changes

```
npm link
cd <project>
npm link @sourcegraph/tslint-config
npm run lint
```

## Publish a new version

Follow [semver](http://semver.org/).

```
npm version major|minor|patch
git push
git push --tags
npm publish
```

