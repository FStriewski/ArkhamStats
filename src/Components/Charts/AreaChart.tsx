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

type Props = {
  input: any;
  ids: string[];
  mode: boolean;
  color: string;
}

export const InvestigatorAreaChart = ({ input, ids, mode, color }: Props) => {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <AreaChart
        width={1000}
        height={500}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
        >
        <defs>
          { ids.map(id =>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
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
        {mode
          ? <YAxis domain={[0, (dataMax) => Math.max(20, dataMax)]}/> // RELATIVE
          : <YAxis domain={[0, (dataMax) => Math.max(100, dataMax)]} /> // ABSOLUTE
        }
        <Tooltip />
        <Legend />
        {ids.length ===1  
         ?   <Area
              name={mode 
                    ? `${lookupInvestigator(ids[0]).name} [%]`
                    :`${lookupInvestigator(ids[0]).name}`
                }
              type="monotone"
              dataKey={ids[0]}
              stroke={lookupInvestigator(ids[0]).color}
              fillOpacity={1} 
              fill={`url(${ids[0]})`}
              />
              :  ids.map((id: string) => <Area
              key={id}
              name={mode
                ?`${lookupInvestigator(id).name} [%]`
                :`${lookupInvestigator(id).name}`}
                type="monotone"
                dataKey={id}
                stroke={lookupInvestigator(id).color}
                fillOpacity={1} 
                fill={`url(${id})`}
                />)
              }
      </AreaChart>
      </div>
  );
};
export const ClassAreaChart = ({ input, ids, mode, color }: Props) => {
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
        { mode
          ? <YAxis domain={[0, (dataMax) => Math.max(45, dataMax)]}/> // RELATIVE
          : <YAxis domain={[0, (dataMax) => Math.max(300, dataMax)]} /> // ABSOLUTE
        }
        <Tooltip />
        <Legend />
          <Area
              name={ mode? `${ids[0]} [%]`:`${ids[0]}`}
              type="monotone"
              dataKey={ids[0]}
              stroke={color}
              fillOpacity={1} 
              fill={`url(${ids[0]})`}
              />
      </AreaChart>
      </div>
  );
};
