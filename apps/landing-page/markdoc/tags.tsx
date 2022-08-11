import { Callout, QuickLink, QuickLinks, DocsLink, CurrentVersion } from '@devfile-web/core';

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
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
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
  'docs-link': {
    selfClosing: true,
    render: DocsLink,
    attributes: {
      section: { type: String },
      title: { type: String },
      text: { type: String },
    },
  },
  'current-version': {
    selfClosing: true,
    render: CurrentVersion,
    attributes: {
      beforeVersion: { type: String },
      afterVersion: { type: String },
      isCodeblock: { type: Boolean },
    },
  },
};

export default tags;
