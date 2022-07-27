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
    // eslint bug
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    render: Link,
    attributes: {
      href: {
        type: String,
      },
    },
  },
};

export default nodes;
