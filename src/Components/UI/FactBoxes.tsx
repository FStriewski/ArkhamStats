import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Paper, Typography, IconButton } from '@material-ui/core';
import { Meta } from '../../types';
import { lookupInvestigator, daysSinceRelease } from '../../lookups/helpers';
import CloseIcon from '@material-ui/icons/Close';
import { investigatorClassColor } from '../../lookups/lists';

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
      textTransform: 'capitalize',
      position: 'relative'
    },
    closeButton: {
      position: 'absolute',
      right: '-10px',
      top: '-10px',
      color: 'grey'
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
  id?: string;
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
export const forClassComparison = (ids: string[]): BoxInput => {
  const facts = ids.map((faction, index: number) => ({
    name: `Faction ${index + 1}:`,
    val: faction,
    id: faction
  }));

  const colors = ids.map((faction) => investigatorClassColor[faction]);
  return { facts, colors };
};
export const forInvComparison = (ids: string[]): BoxInput => {
  const investigators = ids.map((id) => lookupInvestigator(id));

  const facts = investigators.map((investigator, index: number) => ({
    name: `Investigator ${index + 1}:`,
    val: investigator.name,
    id: investigator.code
  }));

  const colors = investigators.map((investigator) => investigator.color);
  return { facts, colors };
};

export const FactBoxes = ({
  input,
  closable,
  deleteFromSelection
}: {
  input: BoxInput;
  closable?: boolean;
  deleteFromSelection?: (event) => void;
}): React.ReactElement => {
  const classes = useStyles();
  const { facts, colors } = input;

  return (
    <div className={classes.row}>
      {facts.length > 0 ? (
        facts.map((fact, index: number) => {
          const color = colors.length === 1 ? colors[0] : colors[index];
          return (
            <Paper className={classes.paper} key={index}>
              {closable && (
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                  className={classes.closeButton}
                  id={fact.id}
                  onClick={deleteFromSelection}
                >
                  <CloseIcon />
                </IconButton>
              )}
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
        })
      ) : (
        <Paper className={classes.paper} style={{ width: '150px' }} />
      )}
    </div>
  );
};
