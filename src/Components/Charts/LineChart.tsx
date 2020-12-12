import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';

export const ArkLineChart = ({input}: any) =>  {
  console.log(input)
  const metadata = input.meta;
  const invCodes = Object.keys(input.datapoints);

  console.log(invCodes)

  return (
    <div>
      <div>{input.year}</div>
        <LineChart width={730} height={250} data={null}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line name="decks/month"  type="monotone" dataKey="value" stroke="#007f00" />
        </LineChart>
    </div>
  );
}
