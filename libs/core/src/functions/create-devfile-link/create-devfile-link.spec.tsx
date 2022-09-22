import createDevfileLink from './create-devfile-link';

const initialPage = { number: 1, total: 1 };
const initialQuery = {
  search: '',
  registries: [{ name: 'Test', checked: false }],
  tags: [{ name: 'Test', checked: false }],
  types: [{ name: 'Test', checked: false }],
  providers: [{ name: 'Test', checked: false }],
  languages: [{ name: 'Test', checked: false }],
  filtersApplied: 0,
};
const options: {
  parameters: Parameters<typeof createDevfileLink>;
  expected: ReturnType<typeof createDevfileLink>;
}[] = [
  // no filters
  {
    parameters: [
      initialPage,
      {
        ...initialQuery,
        search: '',
        registries: [{ name: 'Test', checked: false }],
        tags: [{ name: 'Test', checked: false }],
        types: [{ name: 'Test', checked: false }],
        providers: [{ name: 'Test', checked: false }],
        languages: [{ name: 'Test', checked: false }],
      },
    ],
    expected: '?page=1',
  },
  // search
  {
    parameters: [
      initialPage,
      {
        ...initialQuery,
        search: 'Test',
        registries: [{ name: 'Test', checked: false }],
        tags: [{ name: 'Test', checked: false }],
        types: [{ name: 'Test', checked: false }],
        providers: [{ name: 'Test', checked: false }],
        languages: [{ name: 'Test', checked: false }],
      },
    ],
    expected: '?page=1&search=Test',
  },
  // registries
  {
    parameters: [
      initialPage,
      {
        ...initialQuery,
        search: '',
        registries: [{ name: 'Test', checked: true }],
        tags: [{ name: 'Test', checked: false }],
        types: [{ name: 'Test', checked: false }],
        providers: [{ name: 'Test', checked: false }],
        languages: [{ name: 'Test', checked: false }],
      },
    ],
    expected: '?page=1&registries=Test',
  },
  // tags
  {
    parameters: [
      initialPage,
      {
        ...initialQuery,
        search: '',
        registries: [{ name: 'Test', checked: false }],
        tags: [{ name: 'Test', checked: true }],
        types: [{ name: 'Test', checked: false }],
        providers: [{ name: 'Test', checked: false }],
        languages: [{ name: 'Test', checked: false }],
      },
    ],
    expected: '?page=1&tags=Test',
  },
  // types
  {
    parameters: [
      initialPage,
      {
        ...initialQuery,
        search: '',
        registries: [{ name: 'Test', checked: false }],
        tags: [{ name: 'Test', checked: false }],
        types: [{ name: 'Test', checked: true }],
        providers: [{ name: 'Test', checked: false }],
        languages: [{ name: 'Test', checked: false }],
      },
    ],
    expected: '?page=1&types=Test',
  },
  // providers
  {
    parameters: [
      initialPage,
      {
        ...initialQuery,
        search: '',
        registries: [{ name: 'Test', checked: false }],
        tags: [{ name: 'Test', checked: false }],
        types: [{ name: 'Test', checked: false }],
        providers: [{ name: 'Test', checked: true }],
        languages: [{ name: 'Test', checked: false }],
      },
    ],
    expected: '?page=1&providers=Test',
  },
  // languages
  {
    parameters: [
      initialPage,
      {
        ...initialQuery,
        search: '',
        registries: [{ name: 'Test', checked: false }],
        tags: [{ name: 'Test', checked: false }],
        types: [{ name: 'Test', checked: false }],
        providers: [{ name: 'Test', checked: false }],
        languages: [{ name: 'Test', checked: true }],
      },
    ],
    expected: '?page=1&languages=Test',
  },
  // all filters
  {
    parameters: [
      initialPage,
      {
        ...initialQuery,
        search: 'Test',
        registries: [{ name: 'Test', checked: true }],
        tags: [{ name: 'Test', checked: true }],
        types: [{ name: 'Test', checked: true }],
        providers: [{ name: 'Test', checked: true }],
        languages: [{ name: 'Test', checked: true }],
      },
    ],
    expected:
      '?page=1&search=Test&registries=Test&tags=Test&types=Test&providers=Test&languages=Test',
  },
  // multiple registries
  {
    parameters: [
      initialPage,
      {
        ...initialQuery,
        search: '',
        registries: [
          { name: 'Test1', checked: true },
          { name: 'Test2', checked: true },
        ],
        tags: [{ name: 'Test', checked: false }],
        types: [{ name: 'Test', checked: false }],
        providers: [{ name: 'Test', checked: false }],
        languages: [{ name: 'Test', checked: false }],
      },
    ],
    expected: '?page=1&registries=Test1,Test2',
  },
];

describe('createDevfileLink', () => {
  options.forEach((option) => {
    it('should create link', () => {
      const { parameters, expected } = option;

      expect(createDevfileLink(...parameters)).toStrictEqual(expected);
    });
  });
});
