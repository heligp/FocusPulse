// babel.config.js

module.exports = {
  // 1) Usa el preset oficial de RN 0.79.x
  presets: ['module:@react-native/babel-preset'],  // :contentReference[oaicite:0]{index=0}

  // 2) Aquí tus plugins extra, p. ej. module-resolver
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@hooks'     : './src/hooks',
          '@services'  : './src/services',
        },
        extensions: [
          '.js', '.jsx',
          '.ts', '.tsx',
          '.android.js', '.ios.js', '.native.js',
        ],
      },
    ],
    // otros plugins que necesites…
  ],
};
