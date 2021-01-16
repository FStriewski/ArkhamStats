import { Typography } from '@material-ui/core';
import React from 'react';
import { PieChart, Pie, Cell, Label, Legend, Tooltip, Text } from 'recharts';
import {
  lookupInvestigator,
  investigatorClassColor
} from '../../lookups/investigatorList';
import { Meta, NUMMODE, SingleInvestigator } from '../../types';

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
  const data = [
    {
      name: 'Decks',
      value: Math.floor(
        (meta.numDecks[ids[0]] / meta.factionTotal.facCnt_abs[factionCode]) *
          100
      )
    },
    { name: 'In Faction', value: 100 }
  ];
  const COLORS = [investigatorClassColor[factionCode], '#F0F0F0'];
  return (
    <>
      <Typography style={{ textAlign: 'center' }} variant='h6'>
        Compared to faction [%]:
      </Typography>
      <PieChart width={300} height={300}>
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
            <Cell key={index} fill={COLORS[index]} />
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
  const COLORS = [investigatorClassColor[factionCode], '#F0F0F0'];
  const data = [
    {
      name: 'Decks',
      value: Math.floor((meta.numDecks[ids[0]] / meta.allDeckTotal) * 100)
    },
    { name: 'All Decks', value: 100 }
  ];
  return (
    <>
      <Typography style={{ textAlign: 'center' }} variant='h6'>
        Compared to all decks [%]:
      </Typography>
      <PieChart width={300} height={300}>
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
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </>
  );
};
