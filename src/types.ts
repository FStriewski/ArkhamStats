export type Investigator = {
    id: number;
    name: string,
    date_creation: Date,
    user_id: number;
    investigator_code: string;
    investigator_name: string;
    slots: any;
} 

export type DataPoint = {
    x: string;
    y: number;
}
export type DatePoint = {
    x: Date;
    y: number;
}

// export type HeatHistogram = {
//     year: string,
//     datapoints: 
//     {[index: string]: number};
// }

export type Response = {
    meta: {
        investigator: string;
        total: number;
    }
    datapoints: {[index: string]: number};
}

export type HeatHistogram =  {
    year: string;
    ticks: {[key: string]: number };
    start?: string;
    end?: string;
}


export type HeatMapObject = { [key: string]: number };

type Set = {
    name: string;
    values: number[];
}

export type LineHistogram = {
    year: string;
    labels: string[];
    datasets: Set[];
}