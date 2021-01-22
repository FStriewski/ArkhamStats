import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  Label,
  ReferenceLine
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

export const InvestigatorBarChart = ({
  input,
  ids,
  dataMode,
  numMode
}: Props): React.ReactElement => {
  if (!ids[0])
    return (
      <BarChart
        width={1100}
        height={550}
        data={input}
        margin={{ top: 70, right: 10, left: 0, bottom: 15 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {setYAxis(dataMode, numMode)}
      </BarChart>
    );
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <BarChart
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
        {setYAxis(dataMode, numMode)}
        <Tooltip />
        <Legend />
        {ids.length === 1 ? (
          <Bar
            name={
              dataMode
                ? `${lookupInvestigator(ids[0]).name} [%]`
                : `${lookupInvestigator(ids[0]).name}`
            }
            dataKey={ids[0]}
            fill={lookupInvestigator(ids[0]).color}
          />
        ) : (
          ids.map((id: string) => (
            <Bar
              key={id}
              name={
                dataMode
                  ? `${lookupInvestigator(id).name} [%]`
                  : `${lookupInvestigator(id).name}`
              }
              dataKey={id}
              fill={lookupInvestigator(id).color}
            />
          ))
        )}
      </BarChart>
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

export const ClassBarChart = ({
  input,
  ids,
  dataMode,
  color,
  numMode
}: Props2): React.ReactElement => {
  if (!ids[0])
    return (
      <BarChart
        width={1100}
        height={550}
        data={input}
        margin={{ top: 70, right: 10, left: 0, bottom: 15 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {setYAxis(dataMode, numMode)}
      </BarChart>
    );
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <BarChart
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
        ))}{' '}
        {setClassYAxis(dataMode, numMode)}
        <Tooltip />
        <Legend />
        <Bar
          name={dataMode ? `${ids[0]} [%]` : `${ids[0]}`}
          dataKey={ids[0]}
          fill={color}
        />
      </BarChart>
    </div>
  );
};
