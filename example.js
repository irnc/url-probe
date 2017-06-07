// @flow

const { probe, suggest } = require('./index');

// 2701_1.pdf would serve a legit file, without x-content-powered-by, make a
// mistate to probe.
const exampleUrl = 'https://www.grsu.by/images/Documents/2701_1.pdf'.slice(0, -1);

probe(exampleUrl, (err, result) => {
  if (err) {
    return console.error(err);
  }

  if (!result) {
    return console.error('Probe given no result.');
  }

  console.log('Result');
  console.log(require('util').inspect(result, { depth: null }));
  console.log('Suggestions');
  suggest(result).forEach(({ description, url }) => console.log(`- ${description}. ${url}`));
});
