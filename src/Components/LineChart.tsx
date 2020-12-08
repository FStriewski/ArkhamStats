import React from "react";
import ReactFrappeChart from "react-frappe-charts";
import {LineHistogram} from '../types';

type Input = {
  input: LineHistogram;
}

type ChartType = "line" | "bar" | "axis-mixed" | "pie" | "percentage" | "heatmap";

export const LineChart = ({input}: Input) =>  {
  return (
    <div>
      <div>{input.year}</div>
      <ReactFrappeChart
        type="line"
        colors = {[ '#007f00']}
        axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
        height={250}
        data={{
          labels: input.labels,
          datasets: input.datasets
        }}
      />
    </div>
  );
}
