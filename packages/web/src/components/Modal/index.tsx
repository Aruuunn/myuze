import React, { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import {
  Modal as MaterialModal,
  Paper,
  ModalProps as MaterialModalProps,
} from '@material-ui/core';

import { useStyles } from './styles';

export type ModalProps = {
  text: string;
  actions?: ReactNode;
  actionsContainerClassName?: string;
  textContainerClassName?: string;
} & Omit<MaterialModalProps, 'children'>;

export function Modal(props: ModalProps): ReactElement {
  const {
    className,
    actions,
    text,
    actionsContainerClassName,
    textContainerClassName,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <MaterialModal {...rest} className={clsx(classes.modal, className)}>
      <Paper className={classes.paper}>
        <span className={clsx(classes.text, textContainerClassName)}>
          {text}
        </span>
        <div className={clsx(classes.btnGrp, actionsContainerClassName)}>
          {actions}
        </div>
      </Paper>
    </MaterialModal>
  );
}
