export type Investigator = {
    id: number;
    name: string,
    date_creation: string,
    user_id: number;
    investigator_code: string;
    investigator_name: string;
    slots: any;
} 

export type HistogramValue = {
    x: string;
    y: number;
}

export type Histogram = {
    meta: {
        title: string;
    }
    values: HistogramValue[];
}