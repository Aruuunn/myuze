import React, { CSSProperties, ReactElement } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { useStyles } from './styles';

export interface ListItemProps {
  height: number;
  width: number;
  itemKey: string;
  loading?: boolean;
  primaryText?: string;
  secondaryText?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler;
}

export function ListItem(props: ListItemProps): ReactElement {
  const {
    style = {},
    loading = false,
    height,
    width,
    itemKey,
    onClick,
    primaryText,
    secondaryText,
    className,
  } = props;

  const styles = useStyles({ height, width });

  return (
    <div className={`${styles.root} ${className}`} key={itemKey} style={style}>
      {/* eslint-disable jsx-a11y/tabindex-no-positive */}
      <Paper
        tabIndex={1}
        data-testid="list-item"
        data-loading={loading.toString()}
        className={styles.card}
        onClick={onClick}>
        <Grid container alignItems="center">
          <Grid
            item
            xs={12}
            style={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}>
            {!loading ? primaryText || '' : <Skeleton />}
          </Grid>
          <Grid className={styles.secondary} item xs={12}>
            {!loading ? (
              secondaryText || ''
            ) : (
              <Skeleton style={{ width: '60%' }} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
