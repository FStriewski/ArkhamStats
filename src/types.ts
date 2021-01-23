export type Investigator = {
  id: number;
  name: string;
  date_creation: Date;
  user_id: number;
  investigator_code: string;
  investigator_name: string;
  slots: GenericObject;
};
export type InvestigatorListEntry = {
  code: string;
  name: string;
  faction_code: string;
  date: string;
  faction?: string;
  color?: string;
  deck_options: any;
};

export type SinglePoint = {
  [index: string]: Tick[];
};

export type Tick = {
  x: string;
  y: number;
};

export type DataPoints = { [year: string]: SinglePoint };

export type Meta = {
  investigators: string[];
  numDecks: number;
  allDeckTotal: number;
  factionTotal: {
    facCnt_abs: { [key: string]: number };
    facCnt_rel: { [key: string]: number };
  };
};
export type GenericObject = { [key: string]: string | number | boolean };

export type APIResponse = {
  meta: Meta;
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
export enum CONTEXTMODE {
  INVESTIGATOR = 'INVESTIGATOR',
  ICLASS = 'ICLASS'
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

export const determineDataTypeMode = (dataMode: boolean): string =>
  dataMode ? 'datapoints_relative' : 'datapoints_absolute';
