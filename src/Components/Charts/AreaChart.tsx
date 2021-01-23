import React from 'react';
import {
  AreaChart,
  Area,
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

export const IAreaChart = ({
  input,
  ids,
  dataMode,
  numMode,
  context
}: Props): React.ReactElement => {
  if (!ids[0])
    return (
      <AreaChart
        width={1100}
        height={550}
        data={input}
        margin={{ top: 70, right: 10, left: 0, bottom: 15 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {setYAxis(dataMode, numMode)}
      </AreaChart>
    );
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <AreaChart
        width={1100}
        height={550}
        data={input}
        margin={{ top: 70, right: 10, left: 0, bottom: 15 }}
      >
        <defs>
          {context === CONTEXTMODE.INVESTIGATOR &&
            ids.length &&
            ids.map((id, index) => (
              <linearGradient
                id={`${index}`}
                key={id}
                x1='0'
                y1='0'
                x2='0'
                y2='1'
              >
                <stop
                  offset='5%'
                  stopColor={
                    context === CONTEXTMODE.INVESTIGATOR
                      ? lookupInvestigator(id).color
                      : investigatorClassColor[id]
                  }
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor={
                    context === CONTEXTMODE.INVESTIGATOR
                      ? lookupInvestigator(id).color
                      : investigatorClassColor[id]
                  }
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
        </defs>
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
          ids.length &&
          ids.map((id: string, index: number) => (
            <Area
              key={id}
              name={
                dataMode
                  ? `${lookupInvestigator(id).name} [%]`
                  : `${lookupInvestigator(id).name}`
              }
              type='monotone'
              dataKey={id}
              stroke={lookupInvestigator(id).color}
              fillOpacity={1}
              fill={`url(#${index})`}
            />
          ))}
        {context === CONTEXTMODE.ICLASS &&
          ids.length &&
          ids.map((iclass: string) => (
            <Area
              name={dataMode ? `${iclass} [%]` : `${iclass}`}
              type='monotone'
              dataKey={iclass}
              stroke={investigatorClassColor[iclass]}
              fillOpacity={1}
              fill={`url(#${iclass})`}
              key={iclass}
            />
          ))}
      </AreaChart>
    </div>
  );
};
