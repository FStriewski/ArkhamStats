export type Investigator = {
    id: number;
    name: string,
    date_creation: string,
    user_id: number;
    investigator_code: string;
    investigator_name: string;
    slots: any;
} 

export type DataPoint = {
    x: string;
    y: number;
}

export type Histogram = {
    meta: {
        title: string;
    }
    datapoints: DataPoint[];
}

type Dataset = {
     values: number[];
}

export type ParsedLineChartInput = {
    labels: string[];
    datasets: Dataset[]
}
