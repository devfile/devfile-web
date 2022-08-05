/* eslint-disable import/no-anonymous-default-export */

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  displayName: 'core',
  preset: '../../jest.preset.js',
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/core',
};
