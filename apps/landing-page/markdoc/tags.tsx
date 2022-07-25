const tags = {
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
};

export default tags;
