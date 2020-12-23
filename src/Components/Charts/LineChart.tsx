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

export const ArkLineChart = ({ input, ids, entity, yLimit=100, color }: any) => {
  return (
    <div>
      {/* <div>{input.year}</div> */}
      <LineChart
        width={900}
        height={400}
        data={input}
        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="date" />
        {releases &&
          releases.map((rel) => (
            <ReferenceLine x={rel.date} stroke="green" strokeWidth={2}>
              <Label value={rel.name} offset={10} position="top" />
            </ReferenceLine>
          ))}
        {entity === ENTITY.CLASSCOUNT ? <YAxis domain={[0, (dataMax) => Math.max(300, dataMax)]} />: <YAxis domain={[0, (dataMax) => Math.max(yLimit, dataMax)]} />}
        <Tooltip />
        <Legend />
        {ids.length ===1  
         ?   <Line
              name='class'
              type="monotone"
              dataKey={ids[0]}
              stroke={color}
            />
          :  ids.map(id => <Line
              name={lookupInvestigator(id).name}
              type="monotone"
              dataKey={id}
              stroke={lookupInvestigator(id).color}
            />)
        }
      </LineChart>
    </div>
  );
};
