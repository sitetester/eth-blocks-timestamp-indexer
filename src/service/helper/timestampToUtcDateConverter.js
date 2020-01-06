const moment = require('moment');

module.exports.getUtcDate = function getUtcDate(blockTimestamp) {
  const blockDate = moment(blockTimestamp * 1000);
  const utcDate = moment(blockDate).utc();
  return utcDate.format('YYYY-MM-DD');
};
