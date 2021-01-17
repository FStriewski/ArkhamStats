import React from 'react';
import {
  LineChart,
  Line,
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

export const InvestigatorLineChart = ({
  input,
  ids,
  dataMode,
  numMode
}: Props): React.ReactElement => {
  console.log(releases);
  console.log(input);
  if (!ids[0])
    return (
      <LineChart
        width={900}
        height={450}
        data={input}
        margin={{ top: 25, right: 10, left: 25, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {setYAxis(dataMode, numMode)}
      </LineChart>
    );
  return (
    <div>
      <LineChart
        width={900}
        height={450}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray='1 1' />
        <XAxis dataKey='date' />
        {releases &&
          releases.map((rel) => (
            <ReferenceLine
              key={rel.date}
              x={rel.date}
              strokeDasharray='3 3'
              stroke='#a0a0a0'
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
  input: SingleInvestigator[];
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
        width={900}
        height={450}
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
        width={900}
        height={450}
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
