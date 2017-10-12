var request = require('request');
const config = require('../config');

exports.getAllJobs = (req, res, next) => {
  request({
    uri: config.auth_job_url,
    qs: {
      api_key: config.auth_job_key,
      format: 'json',
      method: 'aj.jobs.search',
      perpage: 5
    }
  }).pipe(res);
};
