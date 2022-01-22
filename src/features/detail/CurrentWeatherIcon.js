import React from 'react';
import moment from 'moment';
import { isTimeBetween } from '../../validatior';
// *-99 陰 多雲 陰有雨 陰有霧 *陰有靄
import { ReactComponent as DayClear } from '../../assets/day-clear.svg'; // 晴
import { ReactComponent as DayCloudyFog } from '../../assets/day-cloudy-fog.svg'; // 陰有霧 陰有靄
import { ReactComponent as DayCloudy } from '../../assets/day-cloudy.svg'; // 陰 多雲
import { ReactComponent as DayFog } from '../../assets/day-fog.svg'; // 有霧
import { ReactComponent as DayPartiallyClearWithRain } from '../../assets/day-partially-clear-with-rain.svg'; // 陰有雨
// import { ReactComponent as DaySnowing } from '../../assets/day-snowing.svg';
// import { ReactComponent as DayThunderStorm } from '../../assets/day-thunderstorm.svg';
import { ReactComponent as NightClear } from '../../assets/night-clear.svg';
import { ReactComponent as NightCloudyFog } from '../../assets/night-cloudy-fog.svg';
import { ReactComponent as NightCloudy } from '../../assets/night-cloudy.svg';
import { ReactComponent as NightFog } from '../../assets/night-fog.svg'; // 有霧
import { ReactComponent as NightPartiallyClearWithRain } from '../../assets/night-partially-clear-with-rain.svg';
// import { ReactComponent as NightSnowing } from '../../assets/night-snowing.svg';
// import { ReactComponent as NightThunderStorm } from '../../assets/night-thunderstorm.svg';

const getWeatherIcon = (isDay, weather) => {
  const icons = {
    陰: isDay ? <DayCloudy /> : <NightCloudy />,
    多雲: isDay ? <DayCloudy /> : <NightCloudy />,
    陰有雨: isDay ? <DayPartiallyClearWithRain /> : <NightPartiallyClearWithRain />,
    陰有霧: isDay ? <DayCloudyFog /> : <NightCloudyFog />,
    陰有靄: isDay ? <DayCloudyFog /> : <NightCloudyFog />,
    有霧: isDay ? <DayFog/> : <NightFog/>,
    晴: isDay ? <DayClear /> : <NightClear />,
  };

  return icons[weather];
};

const computeWeatherIcon = props => {
  const { obsTime, sunset, weather } = props;
  console.log('props', props);
  if (!sunset?.time) {
    return undefined;
  }

  const targetSunset = sunset?.time.find(s => {
    const formatObs = moment(obsTime).format('yyyy-MM-DD');
    return moment(formatObs).isSame(moment(s.dataTime));
  });

  const { parameter } = targetSunset;
  let sunsetTime = undefined;
  let sunriseTime = undefined;
  parameter.forEach(p => {
    if (p.parameterName === '日出時刻') {
      sunriseTime = p.parameterValue;
    } else if (p.parameterName === '日沒時刻') {
      sunsetTime = p.parameterValue;
    }
  });

  // define obsTime is day or night
  const isDay = isTimeBetween(sunriseTime, sunsetTime, obsTime);
  return getWeatherIcon(isDay, weather);
};

const CurrentWeatherIcon = props => {
  console.log(props);
  const weatherIcon = computeWeatherIcon(props);
  return <>{weatherIcon}</>;
};

export default CurrentWeatherIcon;
