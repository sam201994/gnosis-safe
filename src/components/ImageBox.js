import React, { useState, useEffect, useRef } from "react";
import { Image } from "antd";

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
      />
    </>
  );
};

export default ImageBox;
