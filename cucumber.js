module.exports = {
  default: {
    require: ["features/**/*.js"],
    format: ["progress", "html:reports/cucumber-report.html"],
  },
};