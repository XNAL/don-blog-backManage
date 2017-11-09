module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // 【error】分号前后空格规则：
    // 
    // before 为 false，分号之前禁止有空格
    // after 为 true.分号之后强制有空格
    // http://eslint.cn/docs/rules/semi-spacing
    // 
    // 示范：
    // var foo;
    // var foo; var bar;
    // throw new Error("error");
    // while (a) { break; }
    // for (i = 0; i < 10; i++) {}
    // for (;;) {}
    // if (true) {;}
    // ;foo();
    "semi-spacing": ["error", {
      "before": false,
      "after": true
    }],

    // 【error】语句末需要分号：
    // 
    // "always" (默认) 要求在语句末尾使用分号
    // http://eslint.cn/docs/rules/semi
    // 
    // 示范：
    // var name = "ESLint";
    // object.method = function() {
    //     // ...
    // };
    "semi": ["error", "always"],
  },
  globals: {}
}
