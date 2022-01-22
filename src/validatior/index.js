import moment from 'moment';

export const isTimeBetween = function (startTime, endTime, serverTime) {
  let start = moment(startTime, 'HH:mm');
  let end = moment(endTime, 'HH:mm');
  let server = moment(serverTime, 'yyyy-MM-DD HH:mm:ss');
    // console.log(server);
    // console.log(start);
    // console.log(end);
  return server.unix() >= start.unix() && server.unix() < end.unix();
};
