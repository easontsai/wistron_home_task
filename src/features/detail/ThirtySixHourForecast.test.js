import { getPeriod } from './ThirtySixHourForcast';
import thirtySixHourTestData1 from '../../test_data/thirty_six_h_forecast1.json';
import moment from 'moment';

describe('test ThirtySixHourForecast period', () => {
  it('test1', () => {
    expect(getPeriod(thirtySixHourTestData1.test1, 0, moment('2022-01-22 03:00:00'))).toBe('今天白天');
    expect(getPeriod(thirtySixHourTestData1.test1, 1, moment('2022-01-22 03:00:00'))).toBe('今天晚上');
    expect(getPeriod(thirtySixHourTestData1.test1, 2, moment('2022-01-22 03:00:00'))).toBe('明天白天');
  });
  it('test2', () => {
    expect(getPeriod(thirtySixHourTestData1.test2, 0, moment('2022-01-22 03:00:00'))).toBe('今天晚上');
    expect(getPeriod(thirtySixHourTestData1.test2, 1, moment('2022-01-22 03:00:00'))).toBe('明天白天');
    expect(getPeriod(thirtySixHourTestData1.test2, 2, moment('2022-01-22 03:00:00'))).toBe('明天晚上');
  });
});
 