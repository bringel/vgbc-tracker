//@flow
import './GameCoverImage.scss';

import React from 'react';

type Props = {
  imageURL: string,
  height: number,
  width?: number,
  className: string
};

const GameCoverImage = (props: Props) => {
  const { imageURL, height, width, className } = props;

  return (
    <div className={`cover ${className}`} style={{ height: height, width: width }}>
      <img src={imageURL} style={{ maxHeight: height }} />
    </div>
  );
};

GameCoverImage.defaultProps = {
  height: 300,
  className: ''
};

export default GameCoverImage;
