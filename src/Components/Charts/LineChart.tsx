import React from 'react';
import {
  LineChart,
  Line,
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
import { NUMMODE, SingleInvestigator } from '../../types';
import { setYAxis, setClassYAxis } from './Shared';

type Props = {
  input: SingleInvestigator[];
  ids: string[];
  dataMode: boolean;
  numMode: NUMMODE;
};

export const InvestigatorLineChart = ({
  input,
  ids,
  dataMode,
  numMode
}: Props): React.ReactElement => {
  if (!ids[0])
    return (
      <LineChart
        width={800}
        height={400}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {setYAxis(dataMode, numMode)}
      </LineChart>
    );
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <LineChart
        width={800}
        height={400}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {setYAxis(dataMode, numMode)}
        {releases &&
          releases.map((rel) => (
            <span key={rel.name}>
              <ReferenceLine x={rel.date} stroke='green' strokeWidth={2}>
                <Label value={rel.name} offset={10} position='top' />
              </ReferenceLine>
            </span>
          ))}
        <Tooltip />
        <Legend />
        {ids.length === 1 ? (
          <Line
            name={
              dataMode
                ? `${lookupInvestigator(ids[0]).name} [%]`
                : `${lookupInvestigator(ids[0]).name}`
            }
            type='monotone'
            dataKey={ids[0]}
            stroke={lookupInvestigator(ids[0]).color}
          />
        ) : (
          ids.map((id: string) => (
            <Line
              key={id}
              name={
                dataMode
                  ? `${lookupInvestigator(id).name} [%]`
                  : `${lookupInvestigator(id).name}`
              }
              type='monotone'
              dataKey={id}
              stroke={lookupInvestigator(id).color}
            />
          ))
        )}
      </LineChart>
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

export const ClassLineChart = ({
  input,
  ids,
  dataMode,
  color,
  numMode
}: Props2): React.ReactElement => {
  if (!ids[0])
    return (
      <LineChart
        width={800}
        height={400}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {setYAxis(dataMode, numMode)}
      </LineChart>
    );
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <LineChart
        width={800}
        height={400}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {setClassYAxis(dataMode, numMode)}
        {releases &&
          releases.map((rel) => (
            <span key={rel.name}>
              <ReferenceLine x={rel.date} stroke='green' strokeWidth={2}>
                <Label value={rel.name} offset={10} position='top' />
              </ReferenceLine>
            </span>
          ))}
        <Tooltip />
        <Legend />
        <Line
          name={dataMode ? `${ids[0]} [%]` : `${ids[0]}`}
          type='monotone'
          dataKey={ids[0]}
          stroke={color}
        />
      </LineChart>
    </div>
  );
};
