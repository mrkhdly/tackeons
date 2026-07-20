module.exports = (ctx = {}) => ({
  plugins: [
    require('postcss-import'),
    ...(ctx.env === 'minify' ? [require('cssnano')({ preset: 'default' })] : []),
  ],
});
