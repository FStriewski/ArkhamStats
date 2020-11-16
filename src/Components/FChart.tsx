import React from "react";
import ReactFrappeChart from "react-frappe-charts";
import {Histogram, ParsedLineChartInput} from '../types';

 
export const FChart = ({input}) =>  {
    const {labels, datasets} = input

  return (
    <div>
      <ReactFrappeChart
        type="line"
        colors={["#21ba45"]}
        axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
        height={250}
        data={{
          labels,
          datasets,
        }}
      />
    </div>
  );
}