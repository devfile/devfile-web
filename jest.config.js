const { getJestProjects } = require('@nrwl/jest');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  projects: getJestProjects(),
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
