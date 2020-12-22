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

export const ArkLineChart = ({ input, ids, entity, yLimit=100 }: any) => {
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
        <YAxis domain={[0, (dataMax) => Math.max(yLimit, dataMax)]} />
        <Tooltip />
        <Legend />
        {ids.map((id: string) => {
          const investigator = entity === 'class' ? investigatorClassColor[id]: lookupInvestigator(id);

          return (
            <Line
              name={investigator.name}
              type="monotone"
              dataKey={id}
              stroke={investigator.color}
            />
          );
        })}
      </LineChart>
    </div>
  );
};
