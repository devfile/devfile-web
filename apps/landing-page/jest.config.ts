/* eslint-disable import/no-anonymous-default-export */

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  displayName: 'landing-page',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',

  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
  },

  moduleNameMapper: {
    '@devfile-web/core': '<rootDir>/../../libs/core/src',
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/landing-page',
};
