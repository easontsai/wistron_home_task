import React from 'react';
import { batch, connect } from 'react-redux';
import { Modal } from 'antd';
import CurrentWeatherIcon from './CurrentWeatherIcon';
import ThirtySixHourForecast from './ThirtySixHourForcast';
import { setModal, getThirtySixHourForecastAsync, getSunsetAsync } from './ModalDetailSlice';
import { getParameter, getWeatherelement } from '../weatherTable/WeatherTable';
import { ReactComponent as AirFlow } from '../../assets/airFlow.svg';
import { ReactComponent as IconRain } from '../../assets/icon_rain.svg';

import './modalDetail.css';

export const getThirtySixWeatherelement = (data, name) => {
  if (!data) return '';
  const ret = data.find(i => i.elementName === name);
  //   console.log('getWeatherelement ', ret);
  if (name === 'PoP') {
    const { parameter } = ret?.time[0];
    return parameter.parameterName;
  }
  return ret?.time;
};

export const prepareForecast = (data, city) => {
  const { records } = data;
  if (!records) return {};
  const { location } = records;
  return location.find(l => l.locationName === city);
};

export const prepareSunset = (data, city) => {
  const { records } = data;
  if (!records) return {};
  const { location } = records.locations;
  return location.find(l => l.locationName === city);
};

class ModalDetail extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    batch(() => {
      dispatch(getThirtySixHourForecastAsync());
      dispatch(getSunsetAsync());
    });
  }

  close = () => {
    const { dispatch } = this.props;
    dispatch(setModal(false));
  };
  render() {
    const { modalDetail, modalTarget, tirtySixHourForecast, sunset } = this.props;
    const { /*lat, location, lon,*/ parameter/*, stationId*/, time, weatherElement } = modalTarget;

    const city = getParameter(parameter, 'CITY');
    const town = getParameter(parameter, 'TOWN');
    const weather = getWeatherelement(weatherElement, 'Weather');
    let temp = getWeatherelement(weatherElement, 'TEMP');
    temp = Math.round(parseInt(temp));
    const wdsd = getWeatherelement(weatherElement, 'WDSD');
    const targetForecast = prepareForecast(tirtySixHourForecast, city);
    const pop = getThirtySixWeatherelement(targetForecast.weatherElement, 'PoP');
    const targetSunset = prepareSunset(sunset, city);

    console.log('modalTarget', modalTarget);
    console.log('36', targetForecast);
    console.log(targetSunset);
    return (
      <div>
        <Modal
          footer={null}
          visible={modalDetail}
          onCancel={this.close}
          width={800}
          style={{ top: 20 }}>
          <div className="detail_container">
            <div className="detail_info">
              <div className="detail_weather_overview">
                <div className="detail_location">
                  {city} {town}
                </div>
                <div className="detail_weather">{weather}</div>
                <div className="detail_record">
                  <div className="detail_temp">
                    <div className="detail_temp_1">{temp}</div>
                    <div className="detail_temp_2">&deg;C</div>
                  </div>
                  <div className="detail_wind_rain">
                    <div className="detail_wind_rain_1">
                      <AirFlow className="record_icon" />
                      {wdsd} m/h
                    </div>
                    <div className="detail_wind_rain_2">
                      <IconRain className="record_icon" />
                      {pop}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="detail_weather_status">
                <CurrentWeatherIcon
                  obsTime={time?.obsTime}
                  sunset={targetSunset}
                  weather={weather}
                />
              </div>
            </div>
            <div>
              <ThirtySixHourForecast forecast={targetForecast} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  modalDetail: state.modalDetail.modal,
  tirtySixHourForecast: state.modalDetail.tirtySixHourForecast,
  sunset: state.modalDetail.sunset,
});

export default connect(mapStateToProps, null)(ModalDetail);
