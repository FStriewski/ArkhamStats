import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Label,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { releases } from '../../lookups/decks';
import {
  lookupInvestigator,
  investigatorClassColor
} from '../../lookups/investigatorList';
import { Meta, NUMMODE, SingleInvestigator } from '../../types';
import { setYAxis, setClassYAxis } from './Shared';

type Props = {
  meta: Meta;
  ids: string[];
};

const COLORS = ['#2B80C5', '#FF8F3F'];

export const InvestigatorPerTotalPieChart = ({
  meta,
  ids
}: Props): React.ReactElement => {
  const data = [
    { name: 'Decks', value: meta.numDecks[ids[0]] },
    { name: 'All Decks', value: meta.allDeckTotal }
  ];
  return (
    <PieChart width={730} height={250}>
      <Pie
        data={data}
        dataKey='value'
        nameKey='name'
        cx='50%'
        cy='50%'
        outerRadius={50}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
};
export const InvestigatorPerFactionPieChart = ({
  meta,
  ids
}: Props): React.ReactElement => {
  const data = [
    { name: 'Decks', value: meta.numDecks },
    { name: 'Faction', value: meta.factionTotal }
  ];

  return (
    <PieChart width={730} height={250}>
      <Pie
        data={data}
        dataKey='value'
        nameKey='name'
        cx='50%'
        cy='50%'
        outerRadius={50}
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
    </PieChart>
  );
};
