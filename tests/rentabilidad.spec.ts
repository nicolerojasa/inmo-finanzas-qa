import { test, expect, Page } from "@playwright/test";

async function calcular(page: Page, precio: string, arriendo: string, gastos: string) {
  await page.getByTestId("ren-precio").fill(precio);
  await page.getByTestId("ren-arriendo").fill(arriendo);
  await page.getByTestId("ren-gastos").fill(gastos);
  await page.getByTestId("ren-calcular").click();
}

const casosError: { nombre: string; datos: [string, string, string]; mensaje: string }[] = [
  { nombre: "campos vacíos", datos: ["", "", ""], mensaje: "Completa todos los campos." },
  { nombre: "precio cero", datos: ["0", "500000", "100000"], mensaje: "El precio de la propiedad debe ser mayor a 0." },
  { nombre: "arriendo negativo", datos: ["100000000", "-1", "100000"], mensaje: "El arriendo no puede ser negativo." },
  { nombre: "gastos negativos", datos: ["100000000", "500000", "-1"], mensaje: "Los gastos no pueden ser negativos." },
];

test.describe("Calculadora de rentabilidad", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("calcula rentabilidad con datos válidos", async ({ page }) => {
    await calcular(page, "100000000", "500000", "100000");
    await expect(page.getByTestId("ren-flujo")).toHaveText("$400.000");
    await expect(page.getByTestId("ren-rentabilidad")).toHaveText("4.80%");
    await expect(page.getByTestId("ren-anios")).toHaveText("20.8");
  });

  test("con gastos mayores al arriendo no se recupera la inversión", async ({ page }) => {
    await calcular(page, "100000000", "300000", "400000");
    await expect(page.getByTestId("ren-rentabilidad")).toHaveText("-1.20%");
    await expect(page.getByTestId("ren-anios")).toHaveText("No se recupera");
  });

  for (const caso of casosError) {
    test(`muestra error: ${caso.nombre}`, async ({ page }) => {
      await calcular(page, ...caso.datos);
      await expect(page.getByTestId("ren-error")).toHaveText(caso.mensaje);
      await expect(page.getByTestId("ren-resultado")).toHaveCount(0);
    });
  }
});