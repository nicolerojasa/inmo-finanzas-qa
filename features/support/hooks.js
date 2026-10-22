const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium } = require("@playwright/test");

setDefaultTimeout(30000);

let browser;

BeforeAll(async () => {
  browser = await chromium.launch();
});

AfterAll(async () => {
  await browser.close();
});

Before(async function () {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.context.close();
});