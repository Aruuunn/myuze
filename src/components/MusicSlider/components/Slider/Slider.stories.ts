import { SliderProps } from '@material-ui/core';
import { storyFactory } from '../../../../utils';

import { Slider } from './index';

export default {
  title: 'Slider',
  component: Slider,
};

export const SliderComponent = storyFactory<SliderProps>(Slider as any, {
  max: 300,
  min: 0,
  value: 169,
});
