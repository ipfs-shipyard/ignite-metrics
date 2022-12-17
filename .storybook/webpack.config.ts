/**
 * @see https://storybooks.netlify.app/configurations/typescript-config/#setting-up-typescript-with-babel-loader
 * @param {object} param0
 * @param {string} param0.mode
 * @param {import('webpack').Configuration} param0.config
 * @returns {import('webpack').Configuration}
 */
module.exports = ({ config, mode }) => {
  config.resolve = {
    ...config.resolve,
    extensionAlias: {
      ...config.resolve.extensionAlias,
      ".js": [".ts", ".js", ".tsx", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    },
  };

  return config;
};
