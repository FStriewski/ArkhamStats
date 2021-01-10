export const BASEURL = '127.0.0.1:5000';

export const getInvestigatorDistributionByDate = async (icode: string) => {
  const route = `/investigator/dist/${icode}`;
  const result = await fetch(route, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'same-origin'
  }).then((response) => response.json());
  return result;
};
export const getInvestigatorSumByDate = async (icode: string) => {
  const route = `/investigator/sum/${icode}`;
  const result = await fetch(route, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'same-origin'
  }).then((response) => response.json());
  return result;
};

export const getMultipleInvestigatorDistributionByDate = async (
  icodes: string[]
) => {
  const params = {};
  icodes.forEach((code, index) => (params[`i${index}`] = code));

  const queryString = new URLSearchParams(params);
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const route = `/investigators/dist?${queryString}`;
  const result = await fetch(route, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'same-origin'
  }).then((response) => response.json());
  return result;
};
export const getMultipleInvestigatorSumByDate = async (icodes: string[]) => {
  const params = {};
  icodes.forEach((code, index) => (params[`i${index}`] = code));
  console.log(params);

  const queryString = new URLSearchParams(params);
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const route = `/investigators/sum?${queryString}`;
  const result = await fetch(route, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'same-origin'
  }).then((response) => response.json());
  return result;
};

export const getClassDistributionByDate = async (iclass: string) => {
  const route = `/class/dist/${iclass}`;
  const result = await fetch(route, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'same-origin'
  }).then((response) => response.json());
  return result;
};

export const getClassSumByDate = async (iclass: string) => {
  const route = `/class/sum/${iclass}`;
  const result = await fetch(route, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    referrerPolicy: 'same-origin'
  }).then((response) => response.json());
  return result;
};
