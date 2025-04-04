const { init } = require('@fullstacksjs/eslint-config/init');

module.exports = init({
  root: true,
  modules: {
    auto: true, // If you need auto module detection (refer to Auto Module Detection).
    typescript: {
      resolverProject: './tsconfig.json',
      parserProject: './tsconfig.eslint.json',
    },
    graphql: false,
    // Modules configuration check (optional). (refer to Module API)
  },
  // settings: {
  //   'import/resolver': {
  //     typescript: {
  //       project: ['tsconfig.json'],
  //     },
  //   },
  // },

  rules: {
    '@typescript-eslint/no-misused-promises': 'off',
    'no-constant-binary-expression': 'off',
    'no-empty-static-block': 'off',
    'no-new-native-nonconstructor': 'off',
    'import/no-cycle': 'off',
  },

  overrides: [
    {
      files: ['**/*.spec.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 'off',
      },
    },
    {
      files: ['**/*.helper.ts'],
      rules: {
        '@typescript-eslint/no-extraneous-class': 'off',
      },
    },
    {
      files: [
        '**/*.entity.ts',
        '**/*.dto.ts',
        '**/*.serializer.ts',
        '**/*.serializers.ts',
      ],
      rules: {
        'fp/no-mutating-assign': 'off',
      },
    },
  ],
});
