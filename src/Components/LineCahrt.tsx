import React from "react";
import ReactFrappeChart from "react-frappe-charts";
import {HeatHistogram, ParsedLineChartInput} from '../types';
import {heatmapParser} from '../utils/parser';

type Input = {
  input: HeatHistogram;
}

type ChartType = "line" | "bar" | "axis-mixed" | "pie" | "percentage" | "heatmap";

export const LineChart = ({input}: Input) =>  {
  const dataPoints = {} //heatmapParser(input.datapoints)
  return (
    <div>
      <div>{input.year}</div>
      <ReactFrappeChart
        type="heatmap"
        colors = {['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e']}
        axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
        height={250}
        data={{
          
        }}
      />
    </div>
  );
}