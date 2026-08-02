// PostCSS config for tackeons docs site — tackeons.grey.cx
// Similar to grey.cx but indexable, no noindex checks
// Two modes: dev = no purge fast, prod = purgecss scan docs/_site/**/*.html

module.exports = (ctx = {}) => {
  const isProd = ctx.env === 'production' || process.env.NODE_ENV === 'production';
  const plugins = [];

  if (isProd) {
    plugins.push(
      require('@fullhuman/postcss-purgecss')({
        content: ['./_site/**/*.html'],
        safelist: {
          standard: [/^pagefind/, /code/, /pre/, /blockquote/],
          deep: [/^pagefind/],
          greedy: [],
        },
        keyframes: false,
        fontFace: false,
        defaultExtractor: (content) => content.match(/[\w-/:.%]+(?<!:)/g) || [],
      })
    );
    plugins.push(require('css-declaration-sorter')({ order: 'smacss' }));
    plugins.push(
      require('cssnano')({
        preset: ['default', { discardComments: { removeAll: true } }],
      })
    );
  }

  return { plugins };
};
