import React from 'react';
import { YAxis } from 'recharts';
import { NUMMODE } from '../../types';

export const setYAxis = (
  dataMode: boolean,
  numMode: NUMMODE
): React.ReactElement => {
  if (numMode === NUMMODE.DIST) {
    return dataMode ? (
      <YAxis
        domain={[0, (dataMax) => Math.max(16, dataMax)]}
        label={{
          value: '[%] of all decks',
          angle: -90,
          position: 'center',
          fontSize: '14px'
        }}
      /> // RELATIVE
    ) : (
      <YAxis
        domain={[0, (dataMax) => Math.max(100, dataMax)]}
        label={{
          value: 'Number of decks',
          angle: -90,
          position: 'center',
          fontSize: '14px'
        }}
      />
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
        label={{
          value: 'Running sum of decks',
          angle: -90,
          position: 'center',
          fontSize: '14px'
        }}
      /> // RELATIVE
    ) : (
      <YAxis
        domain={[0, (dataMax) => Math.max(dataMax)]}
        label={{
          value: 'Running sum of decks',
          angle: -90,
          position: 'center',
          fontSize: '14px'
        }}
      />
    ); // RELATIVE
  }
};

export const setClassYAxis = (
  dataMode: boolean,
  numMode: NUMMODE
): React.ReactElement => {
  if (numMode === NUMMODE.DIST) {
    return dataMode ? (
      <YAxis
        domain={[0, (dataMax) => Math.max(45, dataMax)]}
        label={{
          value: '[%] of all classes',
          angle: -90,
          position: 'center',
          fontSize: '14px'
        }}
      /> // RELATIVE
    ) : (
      <YAxis
        domain={[0, (dataMax) => Math.max(300, dataMax)]}
        label={{
          value: 'Number of decks in this class',
          angle: -90,
          position: 'center',
          fontSize: '14px'
        }}
      />
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
        label={{
          value: 'Running sum of class decks [%]',
          angle: -90,
          position: 'center',
          fontSize: '14px'
        }}
      /> // RELATIVE
    ) : (
      <YAxis
        domain={[0, (dataMax) => Math.max(dataMax)]}
        label={{
          value: 'Running sum of decks',
          angle: -90,
          position: 'center',
          fontSize: '14px'
        }}
      />
    ); // RELATIVE
  }
};
