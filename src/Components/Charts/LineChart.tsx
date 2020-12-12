import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import {lookupInvestigator} from '../../utils/investigatorList';

export const ArkLineChart = ({ input, ids }: any) => {
  const metadata = input.meta;

  const data = input.datapoints["2020"];
    console.log(data);

  return (
    <div>
      <div>{input.year}</div>
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {ids.map((id: string) => {
          const investigator = lookupInvestigator(id)

          return (
            <Line
              name={investigator.name}
              type="monotone"
              dataKey={id}
              stroke={investigator.color}
            />
          );
        }
        )}
      </LineChart>
    </div>
  );
};
