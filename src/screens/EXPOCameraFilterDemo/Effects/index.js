import React from 'react';
import Blur from './Blur';
import ContrastSaturationBrightness from './ContrastSaturationBrightness';
import Temperature from './Temperature';
import Negative from './Negative';
import Exposure from './Exposure';
import Hue from './Hue';
import Sepia from './Sepia';
import ColorOverlay from './ColorOverlay';
import CustomFilter from './CustomFilter';
import Sharpen from './Sharpen';
import { View } from 'react-native';

// const mixArrays = (arr1, arr2, m) => arr1.map((v, i) => (1 - m) * v + m * arr2[i]);

// // prettier-ignore
// const matrixForSepia = sepia =>
//   mixArrays([
//     // Identity
//     1, 0, 0, 0,
//     0, 1, 0, 0,
//     0, 0, 1, 0,
//     0, 0, 0, 1
//   ], [
//     // one way to do Sepia: grayscale & use alpha channel to add red & remove blue
//     .3, .3, .3, 0,
//     .6, .6, .6, 0,
//     .1, .1, .1, 0,
//     0.2, 0, -0.2, 1
//   ], sepia);

const Effects = ({
  children,
  width,
  height,
  blur,
  contrast,
  saturation,
  brightness,
  temperature,
  negative,
  hue,
  sepia,
  exposure,
  sharpen,
  applyFilter = 0,
  scale,
}) => (
  <Sepia factor={sepia}>
    <Hue factor={hue}>
      <Exposure exposure={exposure}>
        <Negative factor={negative}>
          <ColorOverlay active={applyFilter}>
            <CustomFilter active={applyFilter} scale={scale}>
              <Temperature factor={temperature}>
                <ContrastSaturationBrightness contrast={contrast} saturation={saturation} brightness={brightness}>
                  <Blur passes={6} factor={blur} width={width} height={height}>
                    <Sharpen factor={sharpen} width={width} height={height}>
                      {children}
                    </Sharpen>
                  </Blur>
                </ContrastSaturationBrightness>
              </Temperature>
            </CustomFilter>
          </ColorOverlay>
        </Negative>
      </Exposure>
    </Hue>
  </Sepia>
);

export default Effects;
