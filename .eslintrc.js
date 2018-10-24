module.exports = {
    "extends": "google",
    "env": {
        "browser": false,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 7,
        "ecmaFeatures": {
          "experimentalObjectRestSpread": true
        }
    },
    "rules": {
        "object-curly-spacing": ["warn", "always"],
        "comma-dangle": ["error", "never"],
        "arrow-parens": [1, "as-needed", {
          "requireForBlockBody": false
        }],
        "require-jsdoc": ["warn"]
    }
};
