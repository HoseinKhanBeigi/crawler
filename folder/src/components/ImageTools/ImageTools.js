import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import s from './ImageTools.scss';
import CPButton from '../CP/CPButton';

const ImageTools = props => {
  const [rotation, setRotate] = useState(0);
  const { children } = props;

  const rotate = () => {
    let newRotation = rotation - 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotate(newRotation);
  };

  return (
    <div className={s.imageTools}>
      <TransformWrapper
        defaultScale={1}
        defaultPositionX={200}
        defaultPositionY={100}
        wheel={{
          enableWheel: false,
        }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <React.Fragment>
            <div className="tools">
              <CPButton
                onClick={rotate}
                icon="undo"
                className="default-btn margin-r-5"
              />
              <CPButton
                onClick={zoomIn}
                icon="plus"
                className="default-btn margin-r-5"
              />
              <CPButton
                onClick={zoomOut}
                icon="minus"
                className="default-btn margin-r-5"
              />
              <CPButton
                onClick={resetTransform}
                icon="fullscreen-exit"
                className="default-btn margin-r-5"
              />
            </div>
            <TransformComponent>
              <div
                className={s.object_fit_cover}
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {children}
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
};

ImageTools.propTypes = {
  children: PropTypes.node,
};

ImageTools.defaultProps = {
  children: '',
};

export default withStyles(s)(ImageTools);
export const ImageToolsTest = ImageTools;
