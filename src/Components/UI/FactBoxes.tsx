import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { Meta } from '../../types';
import { lookupInvestigator, daysSinceRelease } from '../../lookups/helpers';

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
  ids: string[];
  meta: Meta;
};

type Facts = {
  name: string;
  val: string | number[];
}[];

type BoxInput = {
  facts: Facts;
  colors: string[];
};

export const forPortrait = ({ ids, meta }: Props): BoxInput => {
  const id = ids[0];
  const investigator = lookupInvestigator(id);
  const decksPerDay =
    Math.round(
      (meta.numDecks[id] / daysSinceRelease(investigator.date) +
        Number.EPSILON) *
        100
    ) / 100 || 0;

  const facts = [
    { name: 'Name:', val: investigator.name },
    { name: 'Class:', val: investigator.faction },
    { name: 'Release:', val: investigator.date },
    { name: 'Total Decks:', val: meta.numDecks[id] },
    { name: 'Decks/Day:', val: decksPerDay }
  ];
  const colors = [investigator.color];

  return { facts, colors };
};

export const FactBoxes = ({
  input
}: {
  input: BoxInput;
}): React.ReactElement => {
  const classes = useStyles();
  const { facts, colors } = input;

  return (
    <div className={classes.row}>
      {facts.map((fact, index: number) => {
        const color = colors.length === 1 ? colors[0] : colors[index];
        return (
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
                color: color
              }}
            >
              {fact.val}
            </Typography>
          </Paper>
        );
      })}
    </div>
  );
};
