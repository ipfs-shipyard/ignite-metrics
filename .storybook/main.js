// const path = require("path");

module.exports = {
  core: {
    builder: 'webpack5'
  },
  features: {
    postcss: false,
    storyStoreV7: true
  },
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  }
}
