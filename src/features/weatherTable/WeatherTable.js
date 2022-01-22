import React from 'react';
import { connect } from 'react-redux';
import { Table, Tooltip, Checkbox } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { getForecastAsync, setSelectedRowIdxs, setSelectedAllRowIdxs } from './WeatherTableSlice';
import { setModal } from '../detail/ModalDetailSlice';
import { cityFilter } from '../../data';
import ModalDetail from '../detail/ModalDetail';
import './weatherTable.css'

const columns = [
  {
    title: '縣市',
    dataIndex: 'city',
    filters: cityFilter,
    onFilter: (value, record) => record.city.indexOf(value) === 0,
    filterSearch: true,
  },
  {
    title: '地區',
    dataIndex: 'town',
  },
  {
    title: '觀測時間',
    dataIndex: 'time',
    defaultSortOrder: 'descend',
    sorter: (a, b) => {
      // TODO
      //   console.log('a', a);
      //   console.log('b', b);
      return a.time - b.time;
    },
  },
  {
    title: '天氣',
    dataIndex: 'weather',
  },
  {
    title: '溫度',
    dataIndex: 'temp',
    defaultSortOrder: 'descend',
    sorter: (a, b) => parseInt(a.temp) - parseInt(b.temp),
  },
  {
    title: '風速',
    dataIndex: 'wdsd',
  },
  {
    dataIndex: 'detail',
  },
];

export const getParameter = (data, name) => {
  if (!data) return '';
  const ret = data.find(i => i.parameterName === name);
  //   console.log('getParameter ', ret);
  return ret?.parameterValue;
};

export const getWeatherelement = (data, name) => {
  if (!data) return '';
  const ret = data.find(i => i.elementName === name);
  //   console.log('getWeatherelement ', ret);
  return ret?.elementValue;
};

class WeatherTable extends React.Component {
  state = {
    data: [],
    modalTarget: undefined,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getForecastAsync());
  }

  componentDidUpdate(prevProps) {
    const { weatherForecast } = this.props;
    if (prevProps.weatherForecast !== weatherForecast) {
      this.setState({ data: weatherForecast });
    }
  }
  isSelectAll = props => {
    const { dispatch } = this.props;
    dispatch(setSelectedAllRowIdxs(props));
  };

  onSelectChange = (isChecked, selectedRowIdx) => {
    const { dispatch, selectedRowIdxs } = this.props;
    console.log('isChecked', isChecked);
    console.log('selectedRowKeys changed: ', selectedRowIdx);
    let newIdx = [...selectedRowIdxs];
    if (isChecked) {
      newIdx.push(selectedRowIdx);
    } else {
      newIdx = selectedRowIdxs.filter(idx => idx !== selectedRowIdx);
    }
    dispatch(setSelectedRowIdxs(newIdx));
  };

  prepareColumn = cols => {
    const isChecked = index => {
      const ret = this.props.selectedRowIdxs?.find(idx => idx === index);
      return ret !== undefined ? true : false;
    };
    const checkBox = [
      {
        title: (
          <Tooltip title="輸出該筆資料至 csv">
            <Checkbox onChange={e => this.isSelectAll(e.target.checked)} />
          </Tooltip>
        ),
        dataIndex: '_checkbox_',
        className: '_checkbox_',
        render: (text, record, index) => (
          <Tooltip title="輸出該筆資料至 csv">
            <div className='aaa'>
              <Checkbox
                checked={isChecked(index)}
                onChange={e => this.onSelectChange(e.target.checked, index)}
              />
            </div>
          </Tooltip>
        ),
      },
    ];
    return checkBox.concat(cols);
  };

  prepareData = data => {
    //   console.log('dataaaa', data);
    if (data.length === 0) return [];

    const { records } = data;
    const { location } = records;
    let ret = [];
    location.forEach((item, idx) => {
      const { /*lat, location, lon,*/ parameter /*, stationId*/, time, weatherElement } = item;
      ret.push({
        key: idx,
        city: getParameter(parameter, 'CITY'),
        town: getParameter(parameter, 'TOWN'),
        time: time.obsTime,
        weather: getWeatherelement(weatherElement, 'Weather'),
        temp: getWeatherelement(weatherElement, 'TEMP'),
        wdsd: getWeatherelement(weatherElement, 'WDSD'),
        detail: (
          <Tooltip title="更多資訊">
            <ProfileOutlined
              style={{ color: '#67c6f0' }}
              onClick={() => {
                this.setState({ modalTarget: item });
                this.props.dispatch(setModal(true));
              }}
            />
          </Tooltip>
        ),
      });
    });
    //   console.log('prepare data : ', ret);
    return ret;
  };

  render() {
    const { data, modalTarget } = this.state;
    const { modalDetail } = this.props;

    const fillColumns = this.prepareColumn(columns);
    const dataSource = this.prepareData(data);
    return (
      <div>
        {modalDetail && <ModalDetail modalTarget={modalTarget} />}
        <Table pagination={false} columns={fillColumns} dataSource={dataSource} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  weatherForecast: state.weatherTable.weatherForecast,
  selectedRowIdxs: state.weatherTable.selectedRowIdxs,
  modalDetail: state.modalDetail.modal,
});

export default connect(mapStateToProps)(WeatherTable);
