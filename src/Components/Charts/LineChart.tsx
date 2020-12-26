import React from "react";
import {
  LineChart,
  Line,
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
import {ENTITY} from '../../types';

export const ArkLineChart = ({ input, ids, entity, mode, yLimit=100, color }: any) => {
  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
      <LineChart
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
        {
        entity === ENTITY.CLASSCOUNT
        ? <YAxis domain={[0, (dataMax) => Math.max(300, dataMax)]} />
        : mode
          ? <YAxis domain={[0, (dataMax) => Math.max(20, dataMax)]}/> // RELATIVE
          : <YAxis domain={[0, (dataMax) => Math.max(100, dataMax)]} /> // ABSOLUTE
        }
        <Tooltip />
        <Legend />
        {ids.length ===1  
         ?   <Line
              name={ entity === ENTITY.CLASSCOUNT
                ? mode
                  ? `${ids[0]} [%]`
                  :`${ids[0]}`
                  : mode 
                    ? `${lookupInvestigator(ids[0]).name} [%]`:`${lookupInvestigator(ids[0]).name}`
                }
              type="monotone"
              dataKey={ids[0]}
              stroke={color}
              />
              :  ids.map((id: string) => <Line
              key={id}
              name={mode? `${lookupInvestigator(id).name} [%]`:`${lookupInvestigator(id).name}`}
              type="monotone"
              dataKey={id}
              stroke={lookupInvestigator(id).color}
            />)
        }
      </LineChart>
      </div>
  );
};
