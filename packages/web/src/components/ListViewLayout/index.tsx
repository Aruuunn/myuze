import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

import { BottomControlsBar } from '../BottomControlsBar';

export interface ListViewLayoutProps {
  primaryText: string;
  actions?: ReactNode;
}

export function ListViewLayout(
  props: PropsWithChildren<ListViewLayoutProps>,
): ReactElement {
  const { primaryText, children, actions } = props;

  return (
    <>
      <Container maxWidth="lg" style={{ paddingTop: '50px' }}>
        <Grid container justify="space-between">
          <Grid
            container
            alignItems="center"
            style={{
              color: 'rgb(var(--primary))',
              marginBottom: '10px',
              marginLeft: '10px',
            }}>
            <Typography
              style={{
                fontWeight: 'bold',
                fontFamily: "'Open Sans', sans-serif",
                opacity: 0.6,
                fontSize: '14px',
                textTransform: 'uppercase',
              }}>
              {primaryText}
            </Typography>
            {actions}
          </Grid>
          {children}
        </Grid>
      </Container>
      <BottomControlsBar />
    </>
  );
}
