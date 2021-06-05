import React from 'react';
import { Add } from '@material-ui/icons';
import { IconButton, IconButtonProps } from '@material-ui/core';

import { useStyles } from './styles';

export function AddButton(props: IconButtonProps) {
  const styles = useStyles();

  return (
    <IconButton
      {...props}
      className={`${styles.addBtn} ${props.className || ''}`}
      component="span"
      color="primary">
      <Add fontSize="small" />
    </IconButton>
  );
}
