/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fence } from '@devfile-web/core';
import Link from 'next/link';
import { nodes as defaultNodes } from '@markdoc/markdoc';

const nodes = {
  document: {
    render: undefined,
  },
  table: {
    ...defaultNodes.table,
    render: (props: any): JSX.Element => (
      <div className="overflow-x-auto">
        <table {...props} />
      </div>
    ),
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
    render: (props: any): JSX.Element => <th {...props} />,
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
    ...defaultNodes.link,
    render: (props: any): JSX.Element => <Link data-testid="generated-link" {...props} />,
  },
};

export default nodes;
