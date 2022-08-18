import { Callout, QuickLink, QuickLinks, CurrentVersion } from '@devfile-web/core';
import clsx from 'clsx';

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
      isZoomable: { type: Boolean, default: false },
      hasBackground: { type: Boolean, default: false },
    },
    render: (props: {
      src: string;
      alt: string;
      caption: string;
      hasBackground: boolean;
    }): JSX.Element => {
      const { src, alt = '', caption, hasBackground } = props;

      return (
        <figure className="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className={clsx(hasBackground && 'rounded-md border bg-slate-50 p-2')}
          />
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
