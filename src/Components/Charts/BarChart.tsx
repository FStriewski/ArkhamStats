import React from "react";
import {
  BarChart,
  Bar,
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

export const InvestigatorBarChart = ({ input, ids, mode }: any) => {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <BarChart
        width={1000}
        height={500}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
        >
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
         ?   <Bar
              name={mode 
                    ? `${lookupInvestigator(ids[0]).name} [%]`
                    :`${lookupInvestigator(ids[0]).name}`
                }
              dataKey={ids[0]}
              fill={lookupInvestigator(ids[0]).color}
              />
        :  ids.map((id: string) => 
          <Bar
              key={id}
              name={mode
                ?`${lookupInvestigator(id).name} [%]`
                :`${lookupInvestigator(id).name}`}
              dataKey={id}
              fill={lookupInvestigator(id).color}
            />)
        }
      </BarChart>
      </div>
  );
};
export const ClassBarChart = ({ input, ids, mode, color }: any) => {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <BarChart
        width={1000}
        height={500}
        data={input}
        margin={{ top: 25, right: 25, left: 25, bottom: 25 }}
        >
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
          <Bar
              name={ mode? `${ids[0]} [%]`:`${ids[0]}`}
              dataKey={ids[0]}
              fill={color}
              />
      </BarChart>
      </div>
  );
};
