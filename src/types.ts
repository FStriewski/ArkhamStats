export type Investigator = {
    id: number;
    name: string,
    date_creation: Date,
    user_id: number;
    investigator_code: string;
    investigator_name: string;
    slots: any;
} 

export type SingleInvestigator = {
    [index: string]: DataPoint[]
}

export type DataPoint = {
    x: string;
    y: number;
}
export type DatePoint = {
    x: Date;
    y: number;
}

//{"datapoints":{"2016":[{"date":"2016-01","value":0},{"date":"2020-12","value":0}]},"meta":{"investigator":"1004","total":896}}

export type APIResponse = {
    meta: {
        investigator: string[];
        total: number;
    }
    datapoints: {[index: string]: SingleInvestigator};
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