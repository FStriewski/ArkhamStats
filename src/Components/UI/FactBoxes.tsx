import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { Meta } from '../../types';
import { lookupInvestigator } from '../../lookups/helpers';

const useStyles = makeStyles(() =>
  createStyles({
    row: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: '10px',
      marginLeft: '40px'
    },
    paper: {
      height: 80,
      marginRight: '25px',
      padding: '10px 25px',
      border: '1px solid grey',
      textTransform: 'capitalize'
    }
  })
);

type Props = {
  id: string;
  meta: Meta;
};

export const FactBoxes = ({ id, meta }: Props): React.ReactElement => {
  const classes = useStyles();
  const investigator = lookupInvestigator(id);

  const facts = [
    { name: 'Name:', val: investigator.name },
    { name: 'Class:', val: investigator.faction },
    { name: 'Total Decks:', val: meta.numDecks[id] },
    { name: 'Decks/Day:', val: meta.numDecks[id] }
  ];

  return (
    <div className={classes.row}>
      {facts.map((fact, index) => (
        <Paper className={classes.paper} key={index}>
          <Typography
            variant='subtitle2'
            style={{
              textAlign: 'left',
              paddingTop: '5px',
              marginLeft: '-15px',
              color: '#6a6969'
            }}
          >
            {fact.name}
          </Typography>
          <Typography
            variant='h5'
            style={{
              textAlign: 'right',
              marginRight: '-15px',
              color: investigator.color
            }}
          >
            {fact.val}
          </Typography>
        </Paper>
      ))}
    </div>
  );
};
