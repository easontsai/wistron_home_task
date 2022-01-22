import axios from 'axios';

/* RESTFUL_BASE = [http://www.loc.net:8080/tm/restservices] */
const RESTFUL_BASE = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore';
const authKey = 'CWB-E3703732-78C1-4625-AD0A-B4D8F9A0D931';

export const getForecast = () => {
  const url = `${RESTFUL_BASE}/O-A0003-001?Authorization=${authKey}`;
  return axios.get(url).then(response => response.data);
};

export const getThirtySixHourForecast = () => {
  const url = `${RESTFUL_BASE}/F-C0032-001?Authorization=${authKey}`;
  return axios.get(url).then(response => response.data);
};

export const getSunset = () => {
  const url = `${RESTFUL_BASE}/A-B0062-001?Authorization=${authKey}&timeFrom=2022-01-01`;
  return axios.get(url).then(response => response.data);
};
