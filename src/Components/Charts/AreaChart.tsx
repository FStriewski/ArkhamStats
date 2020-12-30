import React from "react";
import {
  AreaChart,
  Area,
  Label,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import { releases } from "../../lookups/decks";
import {lookupInvestigator, investigatorClassColor} from '../../lookups/investigatorList';
import { NUMMODE } from "../../types";

type Props = {
  input: any;
  ids: string[];
  dataMode: boolean;
  color?: string;
  numMode: NUMMODE;
}

const setYAxis = (dataMode, numMode) => {
  if(numMode === NUMMODE.DIST){
    return  dataMode
    ? <YAxis domain={[0, (dataMax) => Math.max(20, dataMax)]}  label={{ value: '[%] of all decks', angle: -90, position: 'center', fontSize: '20px' }} /> // RELATIVE
    : <YAxis domain={[0, (dataMax) => Math.max(100, dataMax)]}  label={{ value: 'Number of decks', angle: -90,  position: 'center', fontSize: '20px' }}  /> // ABSOLUTE
  }
  if(numMode === NUMMODE.SUM){
    return  dataMode
      ? <YAxis domain={[0, (dataMax) => Math.round((dataMax + Number.EPSILON) * 100) / 100]}  label={{ value: 'Running sum of decks', angle: -90, position: 'center', fontSize: '20px' }} /> // RELATIVE
      : <YAxis domain={[0, (dataMax) => Math.max(dataMax)]} label={{ value: 'Running sum of decks', angle: -90, position: 'center', fontSize: '20px' }} /> // RELATIVE
  }
}

export const InvestigatorAreaChart = ({ input, ids, dataMode, numMode }: Props) => {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <AreaChart
        width={1000}
        height={500}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
        >
          <defs >
          {ids && ids.map(id => 
            <linearGradient id={`${id}`} key={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={lookupInvestigator(id).color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={lookupInvestigator(id).color} stopOpacity={0}/>
            </linearGradient>
          )}
          </defs>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="date" />
        {releases &&
          releases.map((rel) => (
            <span key={rel.name}>
            <ReferenceLine x={rel.date} stroke="green" strokeWidth={2}>
              <Label value={rel.name} offset={10} position="top" />
            </ReferenceLine>
            </span>
          ))}
        {setYAxis( dataMode, numMode)}
        <Tooltip />
        <Legend />
        {
              ids && ids.map((id: string) =>
              <Area
              key={id}
              name={dataMode
                ?`${lookupInvestigator(id).name} [%]`
                :`${lookupInvestigator(id).name}`}
                type="monotone"
                dataKey={id}
                stroke={lookupInvestigator(id).color}
                fillOpacity={1} 
                fill={`url(#${id})`}
                />)
              }
      </AreaChart>
      </div>
  );
};
export const ClassAreaChart = ({ input, ids, dataMode, color }: Props) => {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <AreaChart
        width={1000}
        height={500}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
        >
        <defs>
        <linearGradient id={ids[0]} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
          <stop offset="95%" stopColor={color} stopOpacity={0}/>
        </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="date" />
        {releases &&
          releases.map((rel) => (
            <span key={rel.name}>
            <ReferenceLine x={rel.date} stroke="green" strokeWidth={2}>
              <Label value={rel.name} offset={10} position="top" />
            </ReferenceLine>
            </span>
          ))}
        { dataMode
          ? <YAxis domain={[0, (dataMax) => Math.max(45, dataMax)]} label={{ value: '[%] of all classes', angle: -90, position: 'center', fontSize: '20px' }} />  // RELATIVE
          : <YAxis domain={[0, (dataMax) => Math.max(300, dataMax)]} label={{ value: 'Number of decks in this class', angle: -90,  position: 'center', fontSize: '20px' }}  /> // ABSOLUTE
        }
        <Tooltip />
        <Legend />
          <Area
              name={ dataMode? `${ids[0]} [%]`:`${ids[0]}`}
              type="monotone"
              dataKey={ids[0]}
              stroke={color}
              fillOpacity={1} 
              fill={`url(#${ids[0]})`}
              />
      </AreaChart>
      </div>
  );
};
