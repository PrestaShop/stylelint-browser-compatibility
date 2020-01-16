const stylelint = require('stylelint');
const doiuse = require('doiuse');
const postcss = require('postcss');

var ruleName = "prestashop/browser-compatibility";

var messages = stylelint.utils.ruleMessages(ruleName, {
  expected: function(value) {
    return "Try not to use " + value;
  }
});

module.exports = stylelint.createPlugin(ruleName, function(
    enabled,
    options
  ) {
  if (!enabled) {
    return;
  }

  return function(root, result) {
    root.walkDecls(async function(decl) {
      if (!options.ignore || (!options.ignore.includes(decl.prop) && !options.ignore.includes(decl.value))) {
        await postcss(doiuse({
          browsers: options.browserList ? options.browserList : "all",
          ignore: options.ignore ? options.ignore : [],
          onFeatureUsage: function(usageInfo) {
            stylelint.utils.report({
              result,
              ruleName,
              message: messages.expected(`${decl.prop}: ${decl.value}; | ${usageInfo.feature} not supported by : ${usageInfo.featureData.missing ? usageInfo.featureData.missing : usageInfo.featureData.partial}`),
              node: decl,
              word: decl.value
            });
          }
        })).process(`.selector { ${decl.prop}: ${decl.value}; }`)
      }
    });
  }
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
