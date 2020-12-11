import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import {LineHistogram} from '../types';

export const ArkLineChart = ({input}: any) =>  {
  return (
    <div>
      <div>{input.year}</div>
      {/* <ReactFrappeChart
        type="line"
        colors = {[ '#007f00']}
        axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
        height={250}
        lineOptions={{regionFill: 1}}
        data={{
          labels: input.labels,
          datasets: input.datasets,
        }}
      /> */}
        <LineChart width={730} height={250} data={input}
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
