const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

const BASE_URL = process.env.BASE_URL || "https://inmo-finanzas-qa.vercel.app";

Given("que estoy en la página principal", async function () {
  await this.page.goto(BASE_URL);
});

// ---------- Hipotecario ----------
When(
  "completo el simulador hipotecario con valor {string}, pie {string}, plazo {string} y tasa {string}",
  async function (valor, pie, plazo, tasa) {
    await this.page.getByTestId("hip-valor").fill(valor);
    await this.page.getByTestId("hip-pie").fill(pie);
    await this.page.getByTestId("hip-plazo").fill(plazo);
    await this.page.getByTestId("hip-tasa").fill(tasa);
  }
);

When("presiono calcular en el simulador hipotecario", async function () {
  await this.page.getByTestId("hip-calcular").click();
});

Then("el monto del crédito es {string}", async function (esperado) {
  await expect(this.page.getByTestId("hip-monto")).toHaveText(esperado);
});

Then("la cuota mensual es cercana a {int}", async function (esperado) {
  const texto = await this.page.getByTestId("hip-cuota").innerText();
  const numero = Number(texto.replace(/[^0-9]/g, ""));
  expect(Math.abs(numero - esperado)).toBeLessThanOrEqual(2);
});

Then("el simulador hipotecario muestra el error {string}", async function (mensaje) {
  await expect(this.page.getByTestId("hip-error")).toHaveText(mensaje);
});

// ---------- Rentabilidad ----------
When(
  "completo la calculadora de rentabilidad con precio {string}, arriendo {string} y gastos {string}",
  async function (precio, arriendo, gastos) {
    await this.page.getByTestId("ren-precio").fill(precio);
    await this.page.getByTestId("ren-arriendo").fill(arriendo);
    await this.page.getByTestId("ren-gastos").fill(gastos);
  }
);

When("presiono calcular en la calculadora de rentabilidad", async function () {
  await this.page.getByTestId("ren-calcular").click();
});

Then("la rentabilidad anual es {string}", async function (esperado) {
  await expect(this.page.getByTestId("ren-rentabilidad")).toHaveText(esperado);
});

Then("los años para recuperar la inversión son {string}", async function (esperado) {
  await expect(this.page.getByTestId("ren-anios")).toHaveText(esperado);
});

Then("la calculadora de rentabilidad muestra el error {string}", async function (mensaje) {
  await expect(this.page.getByTestId("ren-error")).toHaveText(mensaje);
});