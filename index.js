// @flow

const request = require('request');

function probe(url: string, callback: (?Error, ?Object) => void) {
  request(url, function (err, response, body) {
    if (err) {
      return callback(err);
    }

    callback(null, {
      headers: {
        'server': response.headers.server,
        'x-content-powered-by': response.headers['x-content-powered-by'],
      }
    })
  });
}

const mapping = [
  {
    test: ({ headers }) => headers['x-content-powered-by'].match(/^K2 .* \(by JoomlaWorks\)$/),
    suggestion: {
      description: 'Joomla with K2 content extension',
      url: 'https://getk2.org/',
    }
  }
];

function suggest(probeResult: Object) {
  return mapping.filter(c => c.test(probeResult)).map(c => c.suggestion);
}

module.exports = {
  probe,
  suggest,
};
