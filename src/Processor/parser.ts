import {Histogram, ParsedLineChartInput} from '../types';

export const parser = (historgam: Histogram): ParsedLineChartInput => {

    const {datapoints } = historgam

    const labels = datapoints.map(val => val.x)
    const values = datapoints.map(val => val.y)

    return {labels, datasets: [{values}]}
}
