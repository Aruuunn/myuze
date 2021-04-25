import React from 'react';
import { Grid } from '@material-ui/core';
import { addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';

addDecorator((story) => (
  <Grid
    container
    alignItems="center"
    style={{ margin: '20px' }}>
    {story()}
  </Grid>
));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
};