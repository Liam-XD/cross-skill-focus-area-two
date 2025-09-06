// cucumber.js
module.exports = {
  default: {
    dryRun: false,
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
    ],
    // Add custom parameters here
    worldParameters: {
      baseUrl: process.env.BASE_URL || 'https://www.createfuture.com'
    }
  }
};