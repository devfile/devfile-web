import mergeObjectsOnDefinedProperties from './merge-objects-on-defined-properties';

const options: {
  parameters: Parameters<typeof mergeObjectsOnDefinedProperties>;
  expected: ReturnType<typeof mergeObjectsOnDefinedProperties>;
}[] = [
  {
    parameters: [
      { a: 1, b: 2 },
      { a: 3, b: 4 },
    ],
    expected: { a: 3, b: 4 },
  },
  {
    parameters: [{ a: 1, b: 2 }, { a: 3 }],
    expected: { a: 3, b: 2 },
  },
  {
    parameters: [{ a: 1, b: 2 }, { b: 3 }],
    expected: { a: 1, b: 3 },
  },
  {
    parameters: [{ a: 1, b: 2 }, { c: 3 }],
    expected: { a: 1, b: 2 },
  },
];

describe('mergeObjectsOnDefinedProperties', () => {
  options.forEach((option) => {
    it('should merge objects on defined properties', () => {
      const { parameters, expected } = option;

      expect(mergeObjectsOnDefinedProperties(...parameters)).toStrictEqual(expected);
    });
  });
});
