import React from 'react';
import {
  AreaChart,
  Area,
  Label,
  XAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { releases } from '../../lookups/decks';
import { lookupInvestigator } from '../../lookups/helpers';
import { NUMMODE, SingleInvestigator } from '../../types';
import { setYAxis, setClassYAxis } from './Shared';

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
        width={900}
        height={450}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {setYAxis(dataMode, numMode)}
      </AreaChart>
    );
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <AreaChart
        width={900}
        height={450}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
        <defs>
          {ids.length &&
            ids.map((id) => (
              <linearGradient id={`${id}`} key={id} x1='0' y1='0' x2='0' y2='1'>
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
        {releases &&
          releases.map((rel) => (
            <span key={rel.name}>
              <ReferenceLine x={rel.date} stroke='green' strokeWidth={2}>
                <Label value={rel.name} offset={10} position='top' />
              </ReferenceLine>
            </span>
          ))}
        {setYAxis(dataMode, numMode)}
        <Tooltip />
        <Legend />
        {ids.length &&
          ids.map((id: string) => (
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
              fill={`url(#${id})`}
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
        width={900}
        height={450}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {setYAxis(dataMode, numMode)}
      </AreaChart>
    );
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <AreaChart
        width={900}
        height={450}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
        <defs>
          <linearGradient id={ids[0]} x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor={color} stopOpacity={0.8} />
            <stop offset='95%' stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {releases &&
          releases.map((rel) => (
            <span key={rel.name}>
              <ReferenceLine x={rel.date} stroke='green' strokeWidth={2}>
                <Label value={rel.name} offset={10} position='top' />
              </ReferenceLine>
            </span>
          ))}
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
