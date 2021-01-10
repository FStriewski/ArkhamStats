export type Investigator = {
  id: number;
  name: string;
  date_creation: Date;
  user_id: number;
  investigator_code: string;
  investigator_name: string;
  slots: any;
};
export type InvestigatorListEntry = {
  code: string;
  name: string;
  faction_code: string;
  color?: string;
  deck_options: { [key: string]: any }[];
};

export type InvestigatorListItem = {
  name: string;
  code: string;
  faction_code: string;
  deck_options: any;
};

export type SingleInvestigator = {
  [index: string]: Tick[];
};

export type Tick = {
  x: string;
  y: number;
};

export type DataPoints = { [year: string]: SingleInvestigator };

export type APIResponse = {
  meta: {
    investigator: string[];
    total: number;
  };
  datapoints_absolut: DataPoints;
  datapoints_relative: DataPoints;
};

export type HeatHistogram = {
  year: string;
  ticks: { [key: string]: number };
  start?: string;
  end?: string;
};

export type HeatMapObject = { [key: string]: number };

type Set = {
  name: string;
  values: number[];
};

export type LineHistogram = {
  year: string;
  labels: string[];
  datasets: Set[];
};

export enum NUMMODE {
  SUM = 'SUM',
  DIST = 'DIST'
}
export enum PICKERSELECTION {
  SINGLE = 'SINGLE',
  MULTI = 'MULTI'
}

export enum ENTITY {
  CLASSCOUNT = 'CLASSCOUNT',
  SINGLEINV = 'SINGLEINV',
  INVCOMP = 'INVCOMP'
}
export enum CHARTTYPE {
  BAR = 'BAR',
  LINE = 'LINE',
  AREA = 'AREA'
}

export const determineDataTypeMode = (dataMode: boolean) =>
  dataMode ? 'datapoints_relative' : 'datapoints_absolute';
