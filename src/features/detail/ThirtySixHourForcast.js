import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

const getDayOrNight = time => {
  if (moment(time).hours() === 6) {
    return '晚上';
  } else if (moment(time).hours() === 18) {
    return '白天';
  }
  return '';
};

export const getPeriod = (data, idx, current) => {
  const ret = data[0];
  const { startTime, endTime } = ret?.time[idx];
  const diffStartNEnd = moment(startTime)
    .startOf('day')
    .diff(moment(endTime).startOf('day'), 'days');
  const diffCurrentNEnd = current.startOf('day').diff(moment(endTime).startOf('day'), 'days');
  const diffCurrentNEndAbs = Math.abs(diffCurrentNEnd);

  const dayOrNight = getDayOrNight(endTime);
  let display = '';
  if (diffCurrentNEndAbs === 0) {
    //'今天'
    display = '今天';
  } else if (diffCurrentNEndAbs === 1 && (moment(startTime).hours() === 18 && moment(endTime).hours() === 6)) {
    //'今天'
    display = '今天';
  } else if (diffCurrentNEndAbs === 1 && (moment(startTime).hours() === 0 && moment(endTime).hours() === 6)) {
    //'今天'
    display = '今天';
  } else if (diffCurrentNEndAbs === 1) {
    //'明天'
    display = '明天';
  } else if (diffCurrentNEndAbs === 2 && Math.abs(diffStartNEnd) === 1) {
    //'後天'
    display = '明天';
  }

  return display + dayOrNight;
};

export const getParameter = (data, name, idx) => {
  console.log(data);
  if (!data) return '';
  if (name === 'TIME') {
    const current = moment();
    return getPeriod(data, idx, current);
  } else {
    const ret = data.find(i => i.elementName === name);
    // console.log('getParameter ', ret);
    return ret?.time[idx]?.parameter.parameterName;
  }
};

const columns = [
  {
    title: '時段',
    dataIndex: 'time',
  },
  {
    title: '天氣狀況',
    dataIndex: 'weather',
  },
  {
    title: '降雨機率',
    dataIndex: 'pop',
  },
  {
    title: '最低溫',
    dataIndex: 'minT',
  },
  {
    title: '最高溫',
    dataIndex: 'maxT',
  },
  {
    title: '天氣描述',
    dataIndex: 'weatherDesc',
  },
];

class ThirtySixHourForecast extends React.Component {
  prepareData = forecast => {
    console.log('dataaaa', forecast);
    if (!forecast?.weatherElement) return [];
    const { weatherElement } = forecast;
    let ret = [];
    for (let i = 0; i <= 2; i++) {
      ret.push({
        key: i,
        //今天白天 今天晚上 明天白天 明天晚上
        time: getParameter(weatherElement, 'TIME', i),
        weather: getParameter(weatherElement, 'Wx', i),
        pop: getParameter(weatherElement, 'PoP', i),
        minT: getParameter(weatherElement, 'MinT', i),
        maxT: getParameter(weatherElement, 'MaxT', i),
        weatherDesc: getParameter(weatherElement, 'CI', i),
      });
    }

    console.log('prepare data : ', ret);
    return ret;
  };

  render() {
    // const { data, modalTarget } = this.state;
    const { forecast } = this.props;
    console.log('forecast', forecast);
    const dataSource = this.prepareData(forecast);
    return (
      <div>
        <Table pagination={false} columns={columns} dataSource={dataSource} />
      </div>
    );
  }
}

export default ThirtySixHourForecast;
