import { test, expect, Page } from "@playwright/test";

async function calcular(page: Page, valor: string, pie: string, plazo: string, tasa: string) {
  await page.getByTestId("hip-valor").fill(valor);
  await page.getByTestId("hip-pie").fill(pie);
  await page.getByTestId("hip-plazo").fill(plazo);
  await page.getByTestId("hip-tasa").fill(tasa);
  await page.getByTestId("hip-calcular").click();
}

const casosError: { nombre: string; datos: [string, string, string, string]; mensaje: string }[] = [
  { nombre: "campos vacíos", datos: ["", "", "", ""], mensaje: "Completa todos los campos." },
  { nombre: "valor cero", datos: ["0", "0", "20", "4"], mensaje: "El valor de la propiedad debe ser mayor a 0." },
  { nombre: "pie negativo", datos: ["100000000", "-1", "20", "4"], mensaje: "El pie no puede ser negativo." },
  { nombre: "pie mayor al valor", datos: ["100000000", "120000000", "20", "4"], mensaje: "El pie debe ser menor al valor de la propiedad." },
  { nombre: "plazo 0", datos: ["100000000", "20000000", "0", "4"], mensaje: "El plazo debe estar entre 1 y 40 años." },
  { nombre: "plazo 41", datos: ["100000000", "20000000", "41", "4"], mensaje: "El plazo debe estar entre 1 y 40 años." },
  { nombre: "tasa negativa", datos: ["100000000", "20000000", "20", "-1"], mensaje: "La tasa debe estar entre 0 y 30%." },
  { nombre: "tasa 31", datos: ["100000000", "20000000", "20", "31"], mensaje: "La tasa debe estar entre 0 y 30%." },
];

test.describe("Simulador hipotecario", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("calcula la cuota con datos válidos", async ({ page }) => {
    await calcular(page, "100000000", "20000000", "20", "4");
    await expect(page.getByTestId("hip-monto")).toHaveText("$80.000.000");
    await expect(page.getByTestId("hip-cuota")).toHaveText(/^\$484\.78\d$/);
  });

  test("con tasa 0% divide el monto en cuotas iguales", async ({ page }) => {
    await calcular(page, "12000000", "0", "1", "0");
    await expect(page.getByTestId("hip-monto")).toHaveText("$12.000.000");
    await expect(page.getByTestId("hip-cuota")).toHaveText("$1.000.000");
  });

  for (const caso of casosError) {
    test(`muestra error: ${caso.nombre}`, async ({ page }) => {
      await calcular(page, ...caso.datos);
      await expect(page.getByTestId("hip-error")).toHaveText(caso.mensaje);
      await expect(page.getByTestId("hip-resultado")).toHaveCount(0);
    });
  }
});