import { Callout, QuickLink, QuickLinks } from '@devfile-web/core';

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: (props: { src: string; alt: string; caption: string }): JSX.Element => {
      const { src, alt = '', caption } = props;

      return (
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
          <figcaption>{caption}</figcaption>
        </figure>
      );
    },
  },
  'quick-links': {
    // eslint bug
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    // eslint bug
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: {
        type: String,
        matches: ['installation', 'presets', 'plugins', 'theming', 'lightbulb', 'warning'],
      },
      href: { type: String },
    },
  },
};

export default tags;
