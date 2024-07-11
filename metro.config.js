const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push(cjs);

module.exports = defaultConfig;


// const { getDefaultConfig } = require('metro-config');

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: true,
//         },
//       }),
//     },
//     resolver: {
//       assetExts: [...assetExts, 'png'],
//       sourceExts: [...sourceExts, 'jsx', 'js', 'ts', 'tsx'], // Add more extensions if needed
//     },
//   };
// })();
