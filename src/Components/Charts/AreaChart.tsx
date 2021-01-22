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
import { NUMMODE, SingleInvestigator } from '../../types';
import { setYAxis, setClassYAxis } from './Shared';
import { releases } from '../../lookups/decks';

type Props = {
  input: SingleInvestigator[];
  ids: string[];
  dataMode: boolean;
  numMode: NUMMODE;
};

export const InvestigatorAreaChart = ({
  input,
  ids,
  dataMode,
  numMode
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
          {ids.length &&
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
                  stopColor={lookupInvestigator(id).color}
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor={lookupInvestigator(id).color}
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
        ))}{' '}
        {setYAxis(dataMode, numMode)}
        <Tooltip />
        <Legend />
        {ids.length &&
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
      </AreaChart>
    </div>
  );
};

type Props2 = {
  input: SingleInvestigator[];
  ids: string[];
  dataMode: boolean;
  numMode: NUMMODE;
  color: string;
};

export const ClassAreaChart = ({
  input,
  ids,
  dataMode,
  color,
  numMode
}: Props2): React.ReactElement => {
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
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <AreaChart
        width={1100}
        height={550}
        data={input}
        margin={{ top: 70, right: 10, left: 0, bottom: 15 }}
      >
        <defs>
          <linearGradient id={ids[0]} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor={color} stopOpacity={0.8} />
            <stop offset='95%' stopColor={color} stopOpacity={0} />
          </linearGradient>
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
        ))}{' '}
        {setClassYAxis(dataMode, numMode)}
        <Tooltip />
        <Legend />
        <Area
          name={dataMode ? `${ids[0]} [%]` : `${ids[0]}`}
          type='monotone'
          dataKey={ids[0]}
          stroke={color}
          fillOpacity={1}
          fill={`url(#${ids[0]})`}
        />
      </AreaChart>
    </div>
  );
};
