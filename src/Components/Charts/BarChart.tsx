import React from 'react';
import {
  BarChart,
  Bar,
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
import { NUMMODE, SingleInvestigator, DataPoints } from '../../types';
import { setYAxis, setClassYAxis } from './Shared';

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
        width={800}
        height={400}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {setYAxis(dataMode, numMode)}
      </BarChart>
    );
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <BarChart
        width={800}
        height={400}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
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
  input: any;
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
        width={800}
        height={400}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {setYAxis(dataMode, numMode)}
      </BarChart>
    );
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <BarChart
        width={1000}
        height={500}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
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
        <Bar
          name={dataMode ? `${ids[0]} [%]` : `${ids[0]}`}
          dataKey={ids[0]}
          fill={color}
        />
      </BarChart>
    </div>
  );
};
