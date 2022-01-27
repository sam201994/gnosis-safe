const ImageBox = ({ src, fallbackSrc, styles = {} }) => {
  const finalSrc = src ? src : fallbackSrc;
  return (
    <>
      <img
        style={styles}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = fallbackSrc;
        }}
        src={finalSrc}
        alt="p"
      />
    </>
  );
};

export default ImageBox;
