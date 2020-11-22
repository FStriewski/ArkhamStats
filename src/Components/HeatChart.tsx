import React from "react";
import ReactFrappeChart from "react-frappe-charts";
import {HeatHistogram} from '../types';

type Input = {
  input: HeatHistogram; 
}

type ChartType = "line" | "bar" | "axis-mixed" | "pie" | "percentage" | "heatmap";

export const HeatChart = ({input}: Input) =>  {
  const dataPoints = input.ticks
  return (
    <div>
      <div>{input.year}</div>
      <ReactFrappeChart
        type="heatmap"
        colors = {['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e']}
        axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
        height={250}
        data={{
          dataPoints
        }}
      />
    </div>
  );
}