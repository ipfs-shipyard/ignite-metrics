const path = require('path');

module.exports = {
  core: {
    builder: 'webpack5'
  },
  features: {
    postcss: false,
    storyStoreV7: false
  },
  stories: [
    '../src/**/*.stories.mdx',
    '../**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
}
