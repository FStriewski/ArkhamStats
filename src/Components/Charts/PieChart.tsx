import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { investigatorClassColor } from '../../lookups/lists';
import { GenericObject, Meta } from '../../types';

type Props = {
  meta: Meta;
  ids: string[];
  factionCodes: string[];
};

const useStyles = makeStyles(() =>
  createStyles({
    typo: {
      textAlign: 'center',
      color: '#6a6969'
    },
    paper: {
      marginTop: '10px',
      padding: '5px',
      backgroundColor: 'white',
      border: '1px solid grey'
    }
  })
);

export const InvestigatorPerFactionPieChart = ({
  meta,
  ids,
  factionCodes
}: Props): React.ReactElement => {
  const classes = useStyles();
  const factionCode = factionCodes[0];

  const decksPercent = Math.floor(
    (meta.numDecks[ids[0]] / meta.factionTotal.facCnt_abs[factionCode]) * 100
  );
  const data = [
    {
      name: '% Decks',
      value: decksPercent
    },
    { name: 'In Faction', value: 100 - decksPercent }
  ];
  const COLORS = [investigatorClassColor[factionCode], '#D0D0D0'];
  return (
    <>
      <Paper className={classes.paper}>
        15px
        <Typography className={classes.typo} variant='h6'>
          Compared to faction:
        </Typography>
      </Paper>
      <PieChart width={300} height={290}>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={90}
          startAngle={180}
          endAngle={-180}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index] as string} />
          ))}
        </Pie>
        <Tooltip />
        <Legend wrapperStyle={{ position: 'relative', bottom: '25px' }} />
      </PieChart>
    </>
  );
};

export const InvestigatorPerTotalPieChart = ({
  meta,
  ids,
  factionCodes
}: Props): React.ReactElement => {
  const classes = useStyles();
  const COLORS = factionCodes.map(
    (factionCode) => investigatorClassColor[factionCode] as string
  );
  COLORS.push('#D0D0D0');

  const decksPercent = ids.map((id) =>
    Math.floor((meta.numDecks[id] / meta.allDeckTotal) * 100)
  );

  const data: GenericObject[] = decksPercent.map(
    (deck, index): GenericObject => {
      return {
        name: `Investigator ${index + 1}`,
        value: deck
      };
    }
  );
  const rest = decksPercent.reduce((item, sum) => sum + item, 0);
  data.push({ name: 'All Decks', value: 100 - rest });

  return (
    <>
      <Paper className={classes.paper} style={{ marginTop: '50px' }}>
        <Typography className={classes.typo} variant='h6'>
          Compared to all decks:
        </Typography>
      </Paper>
      <PieChart width={300} height={290}>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={90}
          startAngle={180}
          endAngle={-180}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend wrapperStyle={{ position: 'relative', bottom: '25px' }} />
      </PieChart>
    </>
  );
};
export const ComparisonPieChart = ({
  meta,
  ids,
  factionCodes
}: Props): React.ReactElement => {
  const classes = useStyles();
  const COLORS = factionCodes.map(
    (factionCode) => investigatorClassColor[factionCode] as string
  );

  const deckSum = ids.map((id) => meta.numDecks[id] as number);

  const data: GenericObject[] = deckSum.map(
    (deck, index): GenericObject => {
      return {
        name: `Investigator ${index + 1}`,
        value: deck
      };
    }
  );

  return (
    <>
      <Paper className={classes.paper}>
        <Typography className={classes.typo} variant='h6'>
          Number of decks:
        </Typography>
      </Paper>
      <PieChart width={300} height={290}>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={90}
          startAngle={180}
          endAngle={-180}
          label
        >
          {COLORS.map((color, index) => (
            <Cell key={index} fill={color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend wrapperStyle={{ position: 'relative', bottom: '25px' }} />
      </PieChart>
    </>
  );
};
