// cucumber.js
module.exports = {
  default: {
    dryRun: false,
    retry: 2,
    format: [
      'progress-bar',
      'summary',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: {
      colorsEnabled: true,
      snippetInterface: 'async-await'
    },
    require: [
      'src/tests/steps/*.ts'
    ],
    requireModule: [
      'ts-node/register'
    ]
  }
};