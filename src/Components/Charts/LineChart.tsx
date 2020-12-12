import { grey } from "@material-ui/core/colors";
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
import {lookupInvestigator} from '../../lookups/investigatorList';

export const ArkLineChart = ({ input, ids, year }: any) => {
  // const metadata = input.meta;

  // const data = input.datapoints
  // const data = input.datapoints["2020"];

  const releaseEvents = releases.filter(rel => rel.year === year);

  return (
    <div>
      {/* <div>{input.year}</div> */}
      <LineChart
        width={800}
        height={300}
        data={input}
        margin={{ top:50, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="date" />
        {releases &&
          releases.map((rel) => (
            <ReferenceLine x={rel.date} stroke="green" strokeWidth={2}>
              <Label value={rel.name} offset={10} position="top" />
            </ReferenceLine>
          ))}
        <YAxis />
        {/* <ReferenceLine y={12} label="Max" stroke="red" strokeDasharray="3 3" /> */}
        <Tooltip />
        <Legend />
        {ids.map((id: string) => {
          const investigator = lookupInvestigator(id);

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
