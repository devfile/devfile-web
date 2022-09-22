import getFiltersApplied from './get-filters-applied';

const options: {
  parameters: Parameters<typeof getFiltersApplied>;
  expected: ReturnType<typeof getFiltersApplied>;
}[] = [
  {
    parameters: [
      [
        [{ name: 'Test', checked: false }],
        [{ name: 'Test', checked: false }],
        [{ name: 'Test', checked: false }],
      ],
    ],
    expected: 0,
  },
  {
    parameters: [
      [
        [{ name: 'Test', checked: true }],
        [{ name: 'Test', checked: false }],
        [{ name: 'Test', checked: false }],
      ],
    ],
    expected: 1,
  },
  {
    parameters: [
      [
        [{ name: 'Test', checked: false }],
        [{ name: 'Test', checked: true }],
        [{ name: 'Test', checked: false }],
      ],
    ],
    expected: 1,
  },
  {
    parameters: [
      [
        [{ name: 'Test', checked: true }],
        [{ name: 'Test', checked: false }],
        [{ name: 'Test', checked: true }],
      ],
    ],
    expected: 2,
  },
];

describe('filtersApplied', () => {
  options.forEach((option) => {
    it('should return the number of filters applied', () => {
      const { parameters, expected } = option;

      expect(getFiltersApplied(...parameters)).toStrictEqual(expected);
    });
  });
});
