# stylelint-browser-compatibility

> disallow properties that aren't supported by your target browser audience

This plugin uses [doiuse](https://github.com/anandthakker/doiuse) to detect browser support of CSS properties. Doiuse checks if the sent property is supported using the [caniuse](http://caniuse.com/) database.

## Installation

First of all, if you are interested on this plugin, you probably have [stylelint](https://github.com/stylelint/stylelint) already used on your project, if not, take some time reading their repository.

Install this package using --save-dev as stylelint is a developer tool and should never be delivered in production.

```bash
$ npm install stylelint-browser-compatibility --save-dev
```

## Usage

1. Add `"stylelint-browser-compatibility"` to your stylelint config plugins array
2. Add `"prestashop/stylelint-browser-compatibility"` to your stylelint config rules
3. Enable the rule by setting it to `true`, or pass optional extra configuration

## Options

* `browserList`: optional. Accepts an array of browsers you want to support. For example `['> 1%', 'Last 2 versions']`. See [browserslist](https://github.com/ai/browserslist) for documentation. Default will be all browsers.
* `ignore`: optional. Accepts an array of features to ignore. For example: `['rem', 'css-table']`. Feature names can be found in the error messages but it also support simple feature name like "display" or "flex" as it also check css value and property so you can ignore every features that are not lister on caniuse database.

Example of `.stylelintrc`:

```json
{
  "plugins": [
    "stylelint-browser-compatibility"
  ],
  "rules": {
    "prestashop/stylelint-browser-compatibility": [true, {
      "browserList": ["> 2%", "IE 10", "IE 11"],
      "ignore": ["rem", "cursor"]
    }]
  }
}
```

## Recommendations

We use error severity as we want to force the compatibility of the browsers audience we choose.

## License

[MIT](http://ismay.mit-license.org/)
