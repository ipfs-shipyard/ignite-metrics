/**
 * @see https://storybooks.netlify.app/configurations/typescript-config/#setting-up-typescript-with-babel-loader
 * @param {object} param0
 * @param {string} param0.mode
 * @param {import('webpack').Configuration} param0.config
 * @returns
 */
module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
