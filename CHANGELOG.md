## [2.0.1](https://github.com/ipfs-shipyard/ignite-metrics/compare/v2.0.0...v2.0.1) (2023-12-06)


### Bug Fixes

* report generation ([0fb4ff7](https://github.com/ipfs-shipyard/ignite-metrics/commit/0fb4ff7847a46f9703fca96a04f2f51bc69bdd17))
* type errors ([be3d1ac](https://github.com/ipfs-shipyard/ignite-metrics/commit/be3d1ac7c54abf9462b387e34d3d6284ff3cb1ff))


### Trivial Changes

* package-lock.json update ([c0bc2f2](https://github.com/ipfs-shipyard/ignite-metrics/commit/c0bc2f28c635b059e253b08174650beb8cc35033))

## [2.0.0](https://github.com/ipfs-shipyard/ignite-metrics/compare/v1.3.0...v2.0.0) (2023-07-13)


### ⚠ BREAKING CHANGES

* **stores:** Since stores are now async, upgrading to this might require some logic rework.

### Features

* **stores:** Async Stores Release Please ([#132](https://github.com/ipfs-shipyard/ignite-metrics/issues/132)) ([c12e6ca](https://github.com/ipfs-shipyard/ignite-metrics/commit/c12e6cabd0de89da5baf462d3e2183f4b60632ac))


### Trivial Changes

* add dashboard automation ([#86](https://github.com/ipfs-shipyard/ignite-metrics/issues/86)) ([b8c0416](https://github.com/ipfs-shipyard/ignite-metrics/commit/b8c041682ad6f399c91af36ff5a452cec07c88d6))
* update docs/telemetry/PRIVACY_POLICY.md ([#76](https://github.com/ipfs-shipyard/ignite-metrics/issues/76)) ([3321ff1](https://github.com/ipfs-shipyard/ignite-metrics/commit/3321ff18b7f54540fe670e337b62da04cfe54da6))

## [1.3.0](https://github.com/ipfs-shipyard/ignite-metrics/compare/v1.2.2...v1.3.0) (2023-01-27)


### Features

* :zap: useFakeTimers instead of await ([ab218ab](https://github.com/ipfs-shipyard/ignite-metrics/commit/ab218ab00aa7703380ee74898a9da5a25d05f470))
* adding accumulator test. ([dd6a6cb](https://github.com/ipfs-shipyard/ignite-metrics/commit/dd6a6cb5907ee042846aefbcceeb95334d46b3e6))
* Adding impl using map ([719519c](https://github.com/ipfs-shipyard/ignite-metrics/commit/719519cc19703d34bad0d4f8c1f3624ab10d69f9))
* editor config, sane! ([ee49b2a](https://github.com/ipfs-shipyard/ignite-metrics/commit/ee49b2a5531e119ab9f29ee89cb5aa525766069b))
* moving types to set rootDir ([06ef5a9](https://github.com/ipfs-shipyard/ignite-metrics/commit/06ef5a9ec5494309958dbf982ea2315147157d3c))
* Update types and hookup accumulator ([ccece9b](https://github.com/ipfs-shipyard/ignite-metrics/commit/ccece9b0219c2b10caf75053eb38ff18f0ffd32f))


### Bug Fixes

* :adhesive_bandage: fix imports ([eb5ae38](https://github.com/ipfs-shipyard/ignite-metrics/commit/eb5ae38eef9d6d82076f02ca3cf78c528cacfad1))
* :label: generics ([772018d](https://github.com/ipfs-shipyard/ignite-metrics/commit/772018de73649d181e021ba23e6a42a13dcb7c80))
* :memo: adding missing documentation ([8c4f560](https://github.com/ipfs-shipyard/ignite-metrics/commit/8c4f560064fa078927707cb93365efa123fe4a66))
* :necktie: fixing unload event to handle both browser and node. ([c999b06](https://github.com/ipfs-shipyard/ignite-metrics/commit/c999b06ba5d7504d130c88ad9f617219c3860640))
* :necktie: instantiating at declaration ([2313806](https://github.com/ipfs-shipyard/ignite-metrics/commit/2313806726e4edbeb75c06311334c803c0865c5c))
* :package: adding missing package after merge ([98a7ab2](https://github.com/ipfs-shipyard/ignite-metrics/commit/98a7ab2ca3927d19871bc3a0b2af3cd51ce69d6e))
* :package: package-lock.json ([6bd68c6](https://github.com/ipfs-shipyard/ignite-metrics/commit/6bd68c6ea5806832cfca0ad46951919c9b7e5f8c))
* :pencil2: dupe imports ([c2c4277](https://github.com/ipfs-shipyard/ignite-metrics/commit/c2c4277b3e58d01ad2fc7e4320f634f31a4a04d7))
* :pencil2: spec naming and scope ([7c07a7d](https://github.com/ipfs-shipyard/ignite-metrics/commit/7c07a7dcb13a8fb78f70fb51e8edb74c7179849b))
* :recycle: cleanup ([1238a5f](https://github.com/ipfs-shipyard/ignite-metrics/commit/1238a5faaebd9e1dceeca454a263975fa3c79f91))
* :recycle: move call order ([3549175](https://github.com/ipfs-shipyard/ignite-metrics/commit/3549175b248bf0cfa511ba6a1ab855eaa1e38735))
* :recycle: Moving tests to node folder ([d34928b](https://github.com/ipfs-shipyard/ignite-metrics/commit/d34928b12ddaa9f952c8eb1e43ed5d0faa29ed91))
* :rotating_light: fixes lint. ([8eb34e9](https://github.com/ipfs-shipyard/ignite-metrics/commit/8eb34e9421f655bb131b7e9205ff556e94fa8049))
* :test_tube: EventAccumulator ([90b37ba](https://github.com/ipfs-shipyard/ignite-metrics/commit/90b37bae2ff475c8ed29d79f8dc1c18e86b2cd5d))
* :truck: digest -> accumulate ([fbaa4f3](https://github.com/ipfs-shipyard/ignite-metrics/commit/fbaa4f32c8d074cf88174714de057805f57faa54))
* :truck: rename to spec.ts ([f638eb8](https://github.com/ipfs-shipyard/ignite-metrics/commit/f638eb8f144116d056f51a83d5155ed959da83b9))
* :twisted_rightwards_arrows: merged with upstream ([5791d84](https://github.com/ipfs-shipyard/ignite-metrics/commit/5791d846eb17a99ed481efec98d6d6365368ad29))
* :wrench: don't disable rules globally ([9eea9a5](https://github.com/ipfs-shipyard/ignite-metrics/commit/9eea9a57e299479ef4b79e34856724825804b500))
* :wrench: only apply eslint overrides to spec files. ([2722ec2](https://github.com/ipfs-shipyard/ignite-metrics/commit/2722ec2a614859fdc8a09de95e73bc7402f3d10b))
* add_event ([6a59727](https://github.com/ipfs-shipyard/ignite-metrics/commit/6a5972790793054a232a43c278e8c475cb39e811))
* configs ([f1da631](https://github.com/ipfs-shipyard/ignite-metrics/commit/f1da6316903478c9d6f4a1af03c531c57de83ada))
* fixing appKey ([a0242f9](https://github.com/ipfs-shipyard/ignite-metrics/commit/a0242f9b57998039bad38d41bb8e1a7d98e5896c))
* generics ([dfc72df](https://github.com/ipfs-shipyard/ignite-metrics/commit/dfc72df6909e822198f45e0445237cc68bcc77fc))
* import order ([9e62d8f](https://github.com/ipfs-shipyard/ignite-metrics/commit/9e62d8fdaea19d46a12922e0c12adfe607f89e52))
* sinon stubs ([ded115c](https://github.com/ipfs-shipyard/ignite-metrics/commit/ded115cec845e14a7225b92d9af60dda7aca34bc))

## [1.2.2](https://github.com/ipfs-shipyard/ignite-metrics/compare/v1.2.1...v1.2.2) (2023-01-23)


### Bug Fixes

* **types:** correct types for exports ([#73](https://github.com/ipfs-shipyard/ignite-metrics/issues/73)) ([50c4c69](https://github.com/ipfs-shipyard/ignite-metrics/commit/50c4c695e659d7c79b60aa0707fed92245f27f43))

## [1.2.1](https://github.com/ipfs-shipyard/ignite-metrics/compare/v1.2.0...v1.2.1) (2023-01-23)


### Bug Fixes

* expose more tracking methods ([#70](https://github.com/ipfs-shipyard/ignite-metrics/issues/70)) ([5ba256c](https://github.com/ipfs-shipyard/ignite-metrics/commit/5ba256c53680995d5f6bccba72c9923aacaa9807))

## [1.2.0](https://github.com/ipfs-shipyard/ignite-metrics/compare/v1.1.3...v1.2.0) (2023-01-21)


### Features

* use localStorage to cache consent in browsers ([#64](https://github.com/ipfs-shipyard/ignite-metrics/issues/64)) ([5fd14ce](https://github.com/ipfs-shipyard/ignite-metrics/commit/5fd14ce8f714930a562108029a78490cfc099d51))

## [1.1.3](https://github.com/ipfs-shipyard/ignite-metrics/compare/v1.1.2...v1.1.3) (2023-01-19)


### Documentation

* Update link to countly server website ([#62](https://github.com/ipfs-shipyard/ignite-metrics/issues/62)) ([2d3226b](https://github.com/ipfs-shipyard/ignite-metrics/commit/2d3226be46dab73ad2d5ecedaeabd094581a0d0c))

## [1.1.2](https://github.com/ipfs-shipyard/ignite-metrics/compare/v1.1.1...v1.1.2) (2023-01-19)


### Bug Fixes

* importing into starmap project ([0026429](https://github.com/ipfs-shipyard/ignite-metrics/commit/0026429ae69344eed3999703ff3b233d9862847a))

## [1.1.1](https://github.com/ipfs-shipyard/ignite-metrics/compare/v1.1.0...v1.1.1) (2023-01-18)


### Bug Fixes

* 500/1000 event-queue split ([5744297](https://github.com/ipfs-shipyard/ignite-metrics/commit/5744297c941bdf6912b41a2c4569444b92fe8203))

## [1.1.0](https://github.com/ipfs-shipyard/ignite-metrics/compare/v1.0.3...v1.1.0) (2023-01-18)


### Features

* export for browser and node ([47c500e](https://github.com/ipfs-shipyard/ignite-metrics/commit/47c500ea403a2d61e39a9698ae6d97ad23dd2819))


### Trivial Changes

* fix ipfs-companion import error ([#60](https://github.com/ipfs-shipyard/ignite-metrics/issues/60)) ([0f237fb](https://github.com/ipfs-shipyard/ignite-metrics/commit/0f237fb905523d117fb033aa0baade6c2cef8730))
* run 'ncu -u' ([#50](https://github.com/ipfs-shipyard/ignite-metrics/issues/50)) ([c5d060e](https://github.com/ipfs-shipyard/ignite-metrics/commit/c5d060eb5976e15b85c766a506fae038f38060ba))

## [1.0.3](https://github.com/ipfs-shipyard/ignite-metrics/compare/v1.0.2...v1.0.3) (2023-01-13)


### Dependencies

* **dev:** bump @babel/core from 7.20.5 to 7.20.12 ([#43](https://github.com/ipfs-shipyard/ignite-metrics/issues/43)) ([8f55691](https://github.com/ipfs-shipyard/ignite-metrics/commit/8f55691f96ffe1e620d92b9a1e05d7b4032f33e8))
* **dev:** bump babel-loader from 9.1.0 to 9.1.2 ([#45](https://github.com/ipfs-shipyard/ignite-metrics/issues/45)) ([29c659e](https://github.com/ipfs-shipyard/ignite-metrics/commit/29c659e8da4391f2e5310ebc51b81c93bcd3d3f5))
* **dev:** bump prettier from 2.8.1 to 2.8.2 ([#46](https://github.com/ipfs-shipyard/ignite-metrics/issues/46)) ([bc98ca3](https://github.com/ipfs-shipyard/ignite-metrics/commit/bc98ca30eec79dd1589fef163e79fade707a6546))

## [1.0.2](https://github.com/ipfs-shipyard/ignite-metrics/compare/v1.0.1...v1.0.2) (2023-01-13)


### Documentation

* add telemetry documentation ([#35](https://github.com/ipfs-shipyard/ignite-metrics/issues/35)) ([4cb35ba](https://github.com/ipfs-shipyard/ignite-metrics/commit/4cb35bab8642693dd8226f1870fe777c3f8e78c3))

## [1.0.1](https://github.com/ipfs-shipyard/ignite-metrics/compare/v1.0.0...v1.0.1) (2023-01-13)


### Dependencies

* bump @esbuild/darwin-arm64 from 0.16.8 to 0.16.17 ([23c50f4](https://github.com/ipfs-shipyard/ignite-metrics/commit/23c50f4a2e451b5eac3df9432a56a7fe93157299))


### Trivial Changes

* npm publishConfig is public ([3b317d4](https://github.com/ipfs-shipyard/ignite-metrics/commit/3b317d4dd254b5d1b755c57e4b782b67351e5d2a))

## 1.0.0 (2023-01-12)


### Features

* adding base countly metric functionality ([0af3709](https://github.com/ipfs-shipyard/ignite-metrics/commit/0af37095de016da7fdd726c73be74a1884c4cc93))
* address check_consent bug ([2921c2c](https://github.com/ipfs-shipyard/ignite-metrics/commit/2921c2cf1321fb3d1c4970f6eb5dd82d811ca18e))
* basic managed sessions ([f4431f5](https://github.com/ipfs-shipyard/ignite-metrics/commit/f4431f59ce363c898affd4171eed979ede24e514))
* disable auto sessions ([925cb00](https://github.com/ipfs-shipyard/ignite-metrics/commit/925cb00606b741e554cdc939300307be1dd36e15))
* get aegir lint & build working ([b065196](https://github.com/ipfs-shipyard/ignite-metrics/commit/b0651966c496a4502bae11abc88d1c7610604f41))
* initial ignite-metrics lib changes ([2546b8a](https://github.com/ipfs-shipyard/ignite-metrics/commit/2546b8a7de9114f3e6903894d29f251276cef035))
* update metrics ([2cc6133](https://github.com/ipfs-shipyard/ignite-metrics/commit/2cc6133c70db56639d66fc2aa527a5eb5296880f))
* updated metrics library stroies and removing unnecessary files ([b94ca42](https://github.com/ipfs-shipyard/ignite-metrics/commit/b94ca42794fa49580953261315ff37822d2f3118))


### Bug Fixes

* build-storybook errors ([98c8557](https://github.com/ipfs-shipyard/ignite-metrics/commit/98c8557eb4a331c09d5e0c6145d66d7152753985))
* call end_session inside endSession ([e195fca](https://github.com/ipfs-shipyard/ignite-metrics/commit/e195fcae9c3bd263e8c0c0c4ed67645a6a11130c))
* esbuild testing with cssModules plugins ([e74dd5d](https://github.com/ipfs-shipyard/ignite-metrics/commit/e74dd5d200c8d831144635979ffb6862d54b9f49))
* fleek build ([3b5b194](https://github.com/ipfs-shipyard/ignite-metrics/commit/3b5b194b5a5d271c97f938f6d754685a1452b5a7))
* importing into ipfs-companion ([3c8b440](https://github.com/ipfs-shipyard/ignite-metrics/commit/3c8b440ffdb5aea9f6e6c4ff0baa6b67663f9712))
* Improving Metrics Provider ([32cea5c](https://github.com/ipfs-shipyard/ignite-metrics/commit/32cea5c5a12e4c74f702ef4a9e8502fcdfa4f919))
* **lint:** build passes ([fd1d952](https://github.com/ipfs-shipyard/ignite-metrics/commit/fd1d95276a6ba38f554ed3a077dc5e7be9fb5e82))
* npm install on mac ([5ae69da](https://github.com/ipfs-shipyard/ignite-metrics/commit/5ae69da710471ba9acee08c8c73f48797061d5ee))
* npm run build-storybook ([2de49e5](https://github.com/ipfs-shipyard/ignite-metrics/commit/2de49e523ae4687c3c8fb1b524b6df5f7e8c4b56))
* storybook rendering ([b725feb](https://github.com/ipfs-shipyard/ignite-metrics/commit/b725feb4146dad028f64d2a53f671fad60b63eda))
* updated import path ([40d5de4](https://github.com/ipfs-shipyard/ignite-metrics/commit/40d5de46d1780761bc32a7c1293fcef7ff951c4c))


### Trivial Changes

* ignore storybook-static folder from build-storybook ([9a64394](https://github.com/ipfs-shipyard/ignite-metrics/commit/9a643946f83705cc0ffe8a9aefb8e90ec3e6bd7e))
* include dist folder in npm package ([931bd10](https://github.com/ipfs-shipyard/ignite-metrics/commit/931bd10a06ff99dcab1ac89a15866ff5cb681e15))
* overwrite dist/**/*.css files on build ([b5f7b6a](https://github.com/ipfs-shipyard/ignite-metrics/commit/b5f7b6a91026833f440985325a967649c8773663))
* run aegir check-project ([b4b2f6b](https://github.com/ipfs-shipyard/ignite-metrics/commit/b4b2f6b019b0089f18c9413033a91478f0bf4984))
* set lead maintainer ([cd00736](https://github.com/ipfs-shipyard/ignite-metrics/commit/cd00736c162049fccfd68e09379eaecf89b3eb33))


### Dependencies

* bump @esbuild/linux-x64 from 0.16.8 to 0.16.16 ([7b5227e](https://github.com/ipfs-shipyard/ignite-metrics/commit/7b5227e2c5ec1ce86be2135b9849f1e8f3d0df1e))
* **dev:** bump @storybook/addon-links from 6.5.14 to 6.5.15 ([63bb16c](https://github.com/ipfs-shipyard/ignite-metrics/commit/63bb16c1d972e015aea9048945e8e3a3eba55625))
* **dev:** bump @storybook/manager-webpack5 from 6.5.14 to 6.5.15 ([8adaaad](https://github.com/ipfs-shipyard/ignite-metrics/commit/8adaaadbed99301d42981143f01a92c0e9589bed))
* **dev:** bump aegir from 37.7.8 to 37.10.1 ([f3d207a](https://github.com/ipfs-shipyard/ignite-metrics/commit/f3d207ad3afd3d2e58464b7236cb8d33f4da9184))
