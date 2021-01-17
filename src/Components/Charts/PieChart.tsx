import { Typography } from '@material-ui/core';
import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { investigatorClassColor } from '../../lookups/lists';
import { Meta } from '../../types';

type Props = {
  meta: Meta;
  ids: string[];
  factionCode: string;
};

export const InvestigatorPerFactionPieChart = ({
  meta,
  ids,
  factionCode
}: Props): React.ReactElement => {
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
  const COLORS = [investigatorClassColor[factionCode], '#E0E0E0'];
  return (
    <>
      <Typography
        style={{
          textAlign: 'center',
          fontWeight: 600,
          marginBottom: '-5px',
          marginTop: '10px',
          color: '#6a6969'
        }}
        variant='subtitle2'
      >
        Compared to faction:
      </Typography>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={100}
          startAngle={180}
          endAngle={-180}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index] as string} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </>
  );
};

export const InvestigatorPerTotalPieChart = ({
  meta,
  ids,
  factionCode
}: Props): React.ReactElement => {
  const COLORS = [investigatorClassColor[factionCode], '#E0E0E0'];
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
      <Typography
        style={{
          textAlign: 'center',
          fontWeight: 600,
          marginTop: '50px',
          marginBottom: '-5px',
          color: '#6a6969'
        }}
        variant='subtitle2'
      >
        Compared to all decks:
      </Typography>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={100}
          startAngle={180}
          endAngle={-180}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index] as string} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </>
  );
};
