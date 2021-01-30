import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  Legend,
  Tooltip,
  Label,
  ReferenceLine,
  CartesianGrid
} from 'recharts';
import { lookupInvestigator } from '../../lookups/helpers';
import { NUMMODE, SinglePoint, CONTEXTMODE } from '../../types';
import { setYAxis, setClassYAxis } from './YAxis';
import { releases } from '../../lookups/decks';
import { investigatorClassColor } from '../../lookups/lists';

type Props = {
  input: SinglePoint[];
  ids: string[];
  dataMode: boolean;
  numMode: NUMMODE;
  context: CONTEXTMODE;
};

export const ILineChart = ({
  input,
  ids,
  dataMode,
  numMode,
  context
}: Props): React.ReactElement => {
  if (!ids[0])
    return (
      <LineChart
        width={1100}
        height={550}
        data={input}
        margin={{ top: 70, right: 10, left: 20, bottom: 15 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {context === CONTEXTMODE.INVESTIGATOR
          ? setYAxis(dataMode, numMode)
          : setClassYAxis(dataMode, numMode)}
      </LineChart>
    );
  return (
    <div>
      <LineChart
        width={1100}
        height={550}
        data={input}
        margin={{ top: 70, right: 10, left: 0, bottom: 15 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {releases.map((rel) => (
          <ReferenceLine
            key={rel.name}
            x={rel.date.slice(0, 7)}
            stroke='grey'
            strokeDasharray='3 3'
            strokeWidth={2}
          >
            <Label
              value={rel.name}
              offset={10}
              position='insideLeft'
              angle={-90}
            />
          </ReferenceLine>
        ))}
        {context === CONTEXTMODE.INVESTIGATOR
          ? setYAxis(dataMode, numMode)
          : setClassYAxis(dataMode, numMode)}
        <Tooltip />
        <Legend />
        {context === CONTEXTMODE.INVESTIGATOR &&
          ids.map((id: string) => (
            <Line
              key={id}
              strokeWidth={1.5}
              name={
                dataMode
                  ? `${lookupInvestigator(id).name} [%]`
                  : `${lookupInvestigator(id).name}`
              }
              type='monotone'
              dataKey={id}
              stroke={lookupInvestigator(id).color}
            />
          ))}
        {context === CONTEXTMODE.ICLASS &&
          ids.map((iclass: string) => (
            <Line
              name={dataMode ? `${iclass} [%]` : `${iclass}`}
              dataKey={iclass}
              key={iclass}
              type='monotone'
              stroke={investigatorClassColor[iclass]}
            />
          ))}
      </LineChart>
    </div>
  );
};
