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
import { NUMMODE } from '../../types';
import { setYAxis, setClassYAxis } from './Shared';

type Props = {
  input: any;
  ids: string[];
  dataMode: boolean;
  color: string;
  numMode: NUMMODE;
};

export const InvestigatorLineChart = ({
  input,
  ids,
  dataMode,
  numMode
}: Props): React.ReactElement => {
  console.log(releases);
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <LineChart
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
        {setYAxis(dataMode, numMode)}
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

export const ClassLineChart = ({
  input,
  ids,
  dataMode,
  color,
  numMode
}: Props) => {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <LineChart
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
