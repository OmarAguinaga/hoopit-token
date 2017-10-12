var request = require('request');
const config = require('../config');

exports.getAllJobs = (req, res, next) => {
  console.time('startRequest');
  request({
    uri: config.auth_job_url,
    qs: {
      api_key: config.auth_job_key,
      format: 'json',
      method: 'aj.jobs.search',
      keywords: 'php, javascript',
      perpage: 5
    }
  })
    .on('response', () => {
      console.timeEnd('startRequest');
    })
    .pipe(res);
};
