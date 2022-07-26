import { Fence } from '@devfile-web/core';

const nodes = {
  document: {
    render: undefined,
  },
  th: {
    attributes: {
      scope: {
        type: String,
        default: 'col',
      },
    },
    render: (props): JSX.Element => <th {...props} />,
  },
  fence: {
    render: Fence,
    attributes: {
      language: {
        type: String,
      },
      title: {
        type: String || undefined,
      },
      filename: {
        type: String || undefined,
      },
    },
  },
};

export default nodes;
