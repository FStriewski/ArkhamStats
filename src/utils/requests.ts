import { APIResponse } from '../types';

export const BASEURL = '127.0.0.1:5000';

export const getInvestigatorDistributionByDate = async (
  icode: string
): Promise<APIResponse> => {
  const route = `/investigator/dist/${icode}`;
  const result = (await fetch(route, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'same-origin'
  }).then((response) => response.json())) as APIResponse;
  return result;
};
export const getInvestigatorSumByDate = async (
  icode: string
): Promise<APIResponse> => {
  const route = `/investigator/sum/${icode}`;
  const result = (await fetch(route, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'same-origin'
  }).then((response) => response.json())) as APIResponse;
  return result;
};

export const getMultipleInvestigatorDistributionByDate = async (
  icodes: string[]
): Promise<APIResponse> => {
  const params = {};
  icodes.forEach((code, index) => (params[`i${index}`] = code));

  const queryString = new URLSearchParams(params);
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const route = `/investigators/dist?${queryString}`;
  const result = (await fetch(route, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'same-origin'
  }).then((response) => response.json())) as APIResponse;
  return result;
};

export const getMultipleInvestigatorSumByDate = async (
  icodes: string[]
): Promise<APIResponse> => {
  const params = {};
  icodes.forEach((code, index) => (params[`i${index}`] = code));

  const queryString = new URLSearchParams(params);
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const route = `/investigators/sum?${queryString}`;
  const result = (await fetch(route, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'same-origin'
  }).then((response) => response.json())) as APIResponse;
  return result;
};

export const getClassDistributionByDate = async (
  iclasses: string[]
): Promise<APIResponse> => {
  const params = {};
  iclasses.forEach((code, index) => (params[`i${index}`] = code));

  const queryString = new URLSearchParams(params);
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const route = `/class/dist?${queryString}`;
  const result = (await fetch(route, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'same-origin'
  }).then((response) => response.json())) as APIResponse;
  return result;
};

export const getClassSumByDate = async (
  iclasses: string[]
): Promise<APIResponse> => {
  const params = {};
  iclasses.forEach((code, index) => (params[`i${index}`] = code));

  const queryString = new URLSearchParams(params);
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const route = `/class/sum/${queryString}`;
  const result = (await fetch(route, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'same-origin'
  }).then((response) => response.json())) as APIResponse;
  return result;
};
