const path = require('path');

module.exports = {
  chainWebpack: (config) => {
    // custom alias
    config.resolve.alias
      .set('@sty', path.resolve(__dirname, 'src/assets/styles'))
      .set('@widget', path.resolve(__dirname, 'src/components/widget'));
  },
};
