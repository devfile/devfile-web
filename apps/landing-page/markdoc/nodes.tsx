import { Fence } from '@devfile-web/core';
import Link from 'next/link';
import { nodes as defaultNodes } from '@markdoc/markdoc';

const nodes = {
  document: {
    render: undefined,
  },
  th: {
    ...defaultNodes.th,
    attributes: {
      ...defaultNodes.th.attributes,
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
        type: String,
      },
      filename: {
        type: String,
      },
    },
  },
  link: {
    render: (props): JSX.Element => <Link data-testid="generated-link" {...props} />,
    attributes: {
      href: {
        type: String,
      },
    },
  },
};

export default nodes;
