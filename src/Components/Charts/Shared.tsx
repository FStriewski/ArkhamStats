import React from 'react';
import { YAxis, Label } from 'recharts';
import { NUMMODE } from '../../types';
import { CustomizedLabel } from '../UI/CustomizedLabel';

export const setYAxis = (
  dataMode: boolean,
  numMode: NUMMODE
): React.ReactElement => {
  if (numMode === NUMMODE.DIST) {
    return dataMode ? (
      <YAxis domain={[0, (dataMax) => Math.max(16, dataMax)]}>
        <Label
          position='center'
          content={<CustomizedLabel value='[%] of all decks' />}
        />
      </YAxis>
    ) : (
      // RELATIVE
      <YAxis domain={[0, (dataMax) => Math.max(100, dataMax)]}>
        <Label
          position='center'
          content={<CustomizedLabel value='Number of decks' />}
        />
      </YAxis>
    ); // ABSOLUTE
  }
  if (numMode === NUMMODE.SUM) {
    return dataMode ? (
      <YAxis
        domain={[
          0,
          (dataMax: number) =>
            Math.round((dataMax + Number.EPSILON) * 100) / 100
        ]}
      >
        <Label
          position='center'
          content={<CustomizedLabel value='Running sum of decks' />}
        />
      </YAxis> // ABS
    ) : (
      <YAxis domain={[0, (dataMax) => Math.max(dataMax)]}>
        <Label
          position='center'
          content={<CustomizedLabel value='Running sum of decks' />}
        />
      </YAxis>
    ); // RELATIVE
  }
};

export const setClassYAxis = (
  dataMode: boolean,
  numMode: NUMMODE
): React.ReactElement => {
  if (numMode === NUMMODE.DIST) {
    return dataMode ? (
      <YAxis domain={[0, (dataMax) => Math.max(45, dataMax)]}>
        <Label
          position='center'
          content={<CustomizedLabel value='[%] of all decks' />}
        />
      </YAxis> // RELATIVE
    ) : (
      <YAxis domain={[0, (dataMax) => Math.max(300, dataMax)]}>
        <Label
          position='center'
          content={<CustomizedLabel value='Number of decks in this class' />}
        />
      </YAxis>
    ); // ABSOLUTE
  }
  if (numMode === NUMMODE.SUM) {
    return dataMode ? (
      <YAxis
        domain={[
          0,
          (dataMax: number) =>
            Math.round((dataMax + Number.EPSILON) * 100) / 100
        ]}
      >
        <Label
          position='center'
          content={<CustomizedLabel value='Running sum of class decks [%]' />}
        />
      </YAxis> // RELATIVE
    ) : (
      <YAxis domain={[0, (dataMax) => Math.max(dataMax)]}>
        <Label
          position='center'
          content={<CustomizedLabel value='Running sum of decks' />}
        />
      </YAxis>
    ); // RELATIVE
  }
};
