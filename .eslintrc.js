module.exports = {
    "extends": "standard",
    "plugins": ["html"],
    // 启用额外的规则或者覆盖基础配置中的规则的默认选项
    rules: {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // http://eslint.org/docs/rules/comma-dangle
        'comma-dangle': ['error', 'only-multiline'],
        'semi': ['warn', 'always'],
        'no-extra-semi': 'error',
        'space-before-function-paren': 0,
        'yoda': 'off',
        "indent": ["error", 4],
        'no-unused-vars': 'warn',
        'no-useless-call': 'warn',
        'no-new': 0,
        'no-eval': 0,
        'no-dupe-keys': 'error',
        'quotes': ['warn', 'single'],
        'no-multi-spaces': ['warn', { ignoreEOLComments: false }],
        "no-extend-native": 0 //允许对内置对象的原型进行扩展
    },
    globals: { // 声明在代码中自定义的全局变量
        'CONFIG': true
    },
    env: { // 定义预定义的全局变量,比如browser: true，这样你在代码中可以放心使用宿主环境给你提供的全局变量。
        browser: true, // browser global variables.
        node: true, // Node.js global variables and Node.js scoping.
        worker: true, // web workers global variables.
        mocha: true, // adds all of the Mocha testing global variables.
        phantomjs: true, // PhantomJS global variables.
        serviceworker: true // Service Worker global variables.
    }
};