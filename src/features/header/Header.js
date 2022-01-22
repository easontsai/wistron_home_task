import React from 'react';
import { connect } from 'react-redux';
import { ReloadOutlined, ExportOutlined } from '@ant-design/icons';
import { CSVLink } from 'react-csv';
import { getForecastAsync } from '../weatherTable/WeatherTableSlice';
import { getParameter, getWeatherelement } from '../weatherTable/WeatherTable';
import './header.css';

const formatData = data => {
  if (data.length === 0) return [];
  let ret = [];
  data.forEach((item, idx) => {
    const { /*lat, location, lon,*/ parameter /*, stationId*/, time, weatherElement } = item;
    ret.push({
      縣市: getParameter(parameter, 'CITY'),
      地區: getParameter(parameter, 'TOWN'),
      觀測時間: time.obsTime,
      天氣: getWeatherelement(weatherElement, 'Weather'),
      溫度: getWeatherelement(weatherElement, 'TEMP'),
      風速: getWeatherelement(weatherElement, 'WDSD'),
    });
  });
  return ret;
};
class Header extends React.Component {
  state = {
    dataToDownload: [],
  };
  csvRef = React.createRef();
  refreshData = () => {
    const { dispatch } = this.props;
    dispatch(getForecastAsync());
  };

  prepareCSV = () => {
    const { weatherForecast, selectedRowIdxs } = this.props;
    const { records } = weatherForecast;

    const targetData =
      selectedRowIdxs.length > 0
        ? records?.location.filter((item, idx) => {
            return selectedRowIdxs.indexOf(idx) !== -1;
          })
        : records?.location;
    const ret = formatData(targetData);
    this.setState({ dataToDownload: ret }, () => {
      this.csvRef?.current.link.click();
    });
  };

  render() {
    const { dataToDownload } = this.state;
    return (
      <div className="_header_">
        <div className="header_title">即時天氣</div>
        <div className="header_btn_container">
          <div className="header_btn" onClick={this.prepareCSV}>
            <ExportOutlined className="btn_icon" />
            Export
          </div>
          <CSVLink data={dataToDownload} ref={this.csvRef} />
          <div className="header_btn" onClick={this.refreshData}>
            <ReloadOutlined className="btn_icon" />
            Reload
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  weatherForecast: state.weatherTable.weatherForecast,
  selectedRowIdxs: state.weatherTable.selectedRowIdxs,
});

export default connect(mapStateToProps, null)(Header);
