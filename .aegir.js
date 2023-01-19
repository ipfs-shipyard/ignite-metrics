import copyfiles from 'copyfiles'
import cssModulesPlugin from 'esbuild-css-modules-plugin'

/** @type {import('aegir').PartialOptions} */
export default {
  docs: {
    publish: true,
    entryPoint: './docs'
  },
  tsRepo: true,
  build: {
    types: true,
    bundle: false,
    config: {
      format: 'esm',
      external: ['electron', '#ansi-styles', 'yargs/yargs', '#supports-color'],
      plugins: [
        {
          name: 'custom-css-copy',
          async setup(build) {
            /**
             * This ensures that the CSS files ARE bundled in the final build and that the esbuild run (triggered by aegir)
             * copies over the .css files prior to doing other things. (because tsc does not copy them over).
             *
             * This is essentially the solution for not being able to do something like
             *///  `aegir build --tool=tsc && copyfiles -u 1 src/**/*.css dist/ && aegir build --tool=esbuild`
             /***/
            return new Promise((resolve, reject) => {
              copyfiles(['src/**/*.css', 'dist/'], {up: 0, soft: false}, (err) => {
                if (err) {
                  reject(err)
                } else {
                  resolve()
                }
              })
            });
          },
        },
        cssModulesPlugin(),
      ]
    },
    bundlesizeMax: '44KB',
  },
  test: {
    build: true,
  }
}
