import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { investigatorClassColor } from '../../lookups/lists';
import { Meta } from '../../types';

type Props = {
  meta: Meta;
  ids: string[];
  factionCode: string;
};

const useStyles = makeStyles(() =>
  createStyles({
    typo: {
      textAlign: 'center',
      color: '#6a6969'
    },
    paper: {
      margin: '20px 0',
      padding: '5px',
      backgroundColor: 'white',
      border: '1px solid grey'
    }
  })
);

export const InvestigatorPerFactionPieChart = ({
  meta,
  ids,
  factionCode
}: Props): React.ReactElement => {
  const classes = useStyles();

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
        <Typography className={classes.typo} variant='h6'>
          Compared to faction:
        </Typography>
      </Paper>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={110}
          startAngle={180}
          endAngle={-180}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index] as string} />
          ))}
        </Pie>
        <Tooltip />
        <Legend wrapperStyle={{ position: 'relative' }} />
      </PieChart>
    </>
  );
};

export const InvestigatorPerTotalPieChart = ({
  meta,
  ids,
  factionCode
}: Props): React.ReactElement => {
  const classes = useStyles();
  const COLORS = [investigatorClassColor[factionCode], '#D0D0D0'];
  const decksPercent = Math.floor(
    (meta.numDecks[ids[0]] / meta.allDeckTotal) * 100
  );
  const data = [
    {
      name: '% Decks',
      value: decksPercent
    },
    { name: 'All Decks', value: 100 - decksPercent }
  ];
  return (
    <>
      <Paper className={classes.paper} style={{ marginTop: '60px' }}>
        <Typography className={classes.typo} variant='h6'>
          Compared to all decks:
        </Typography>
      </Paper>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={110}
          startAngle={180}
          endAngle={-180}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index] as string} />
          ))}
        </Pie>
        <Tooltip />
        <Legend wrapperStyle={{ position: 'relative' }} />
      </PieChart>
    </>
  );
};
