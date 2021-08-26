const path = require('path');

module.exports = {
  runtimeCompiler: true,
  chainWebpack: (config) => {
    const { NODE_ENV } = process.env;
    if (NODE_ENV === 'test') {
      config.devtool('eval');
      config.module
        .rule('istanbul')
        .test(/\.(js|vue)$/);

      const scssRule = config.module.rule('scss');
      scssRule.uses.clear();
      scssRule
        .use('null-loader')
        .loader('null-loader');
    }

    // custom alias
    config.resolve.alias
      .set('@sty', path.resolve(__dirname, 'src/assets/styles'))
      .set('@widget', path.resolve(__dirname, 'src/components/widget'))

      // For fixing ant-design-vue bug
      .set('indexof', 'component-indexof/index');
  },
};
