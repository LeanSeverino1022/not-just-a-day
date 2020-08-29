module.exports = {
  extends: ['stylelint-config-recommended'],
  rules: {
    "font-family-no-duplicate-names": [
      true,
      {
        ignoreFontFamilyNames:["monospace"],
      }
    ],
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
  },
};