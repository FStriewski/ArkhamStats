import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {},
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      display: 'flex',
      width: '100%'
    },
    column: {}
  })
);

export const ViewWrapper = ({
  children
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const classes = useStyles();

  return <div className={classes.wrapper}>{children}</div>;
};

export const ViewRow = ({
  children
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const classes = useStyles();

  return <div className={classes.row}>{children}</div>;
};

export const ViewColumn = ({
  children
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const classes = useStyles();

  return <div className={classes.column}>{children}</div>;
};
