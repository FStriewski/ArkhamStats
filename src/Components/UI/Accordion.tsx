import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Header } from './Header';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  test: {},
  tabLikeButton: {
    padding: theme.spacing(1),
    border: '1px solid #c0c0c0',
    flex: 1
  }
}));

type AccProps = {
  setHeaderOpen: ({ id: string, open: boolean }) => void;
  headerOpen: {
    id: string;
    open: boolean;
  };
};

export const CustomizedAccordions = ({
  setHeaderOpen,
  headerOpen
}: AccProps): React.ReactElement => {
  const classes = useStyles();

  const handleHeaderClick = ({ id }: { id: string }) => {
    if (headerOpen.id === id) {
      setHeaderOpen({ ...headerOpen, open: !headerOpen.open });
      return;
    }
    if (headerOpen.id !== id) {
      setHeaderOpen({ ...headerOpen, id });
      if (!headerOpen.open) {
        setHeaderOpen({ open: !headerOpen.open, id });
      }
    }
  };

  return (
    <>
      <Header />
      <div className={classes.container}>
        <Button
          className={classes.tabLikeButton}
          onClick={() => handleHeaderClick({ id: '0' })}
        >
          Investigators
        </Button>
        <Button
          className={classes.tabLikeButton}
          onClick={() => handleHeaderClick({ id: '1' })}
        >
          Classes
        </Button>
        <Button
          className={classes.tabLikeButton}
          onClick={() => handleHeaderClick({ id: '2' })}
        >
          Sums
        </Button>
      </div>
    </>
  );
};
