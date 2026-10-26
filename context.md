# Contexto del proyecto: Inmo Finanzas QA

## Descripción
Sitio web con dos calculadoras para decisiones inmobiliarias: un simulador de crédito hipotecario y una calculadora de rentabilidad de inversión. Fue creado como proyecto de práctica del curso de QA + IA, para diseñar y automatizar pruebas sobre una aplicación real.

## Enlaces
- Sitio publicado: https://inmo-finanzas-qa.vercel.app/
- Repositorio: https://github.com/nicolerojasa/inmo-finanzas-qa

## Documentación
Documentos del proyecto en docs/ (Word), en el orden del proceso:
- docs/01-acta-refinamiento-1.docx: primer refinamiento con el PO
- docs/02-documento-funcional-v1.docx: documento funcional v1.0
- docs/03-analisis-qa-v1.docx: dudas, gaps y riesgos de QA sobre el v1.0
- docs/04-acta-refinamiento-2.docx: segundo refinamiento con el PO
- docs/05-documento-funcional-v2.docx: documento funcional v2.0 (versión vigente)
- docs/06-plan-implementacion.docx: plan de implementación de desarrollo
- docs/07-plan-pruebas.docx: plan de pruebas de QA

Casos de prueba y escenarios BDD para la v2.0: qa/ (ver qa/README.md).

Importante: la sección Funcionalidades describe la app publicada hoy. Las reglas vigentes están en el documento funcional v2.0 (por ejemplo, plazo entre 1 y 30 años, montos con punto de miles y resultados con coma decimal), y la app todavía no las implementa.

## Stack técnico
- Next.js (App Router) con TypeScript
- Tailwind CSS
- Despliegue en Vercel (plan Hobby)
- Código versionado en GitHub

## Estructura relevante
- app/page.tsx: interfaz con las dos calculadoras y sus validaciones
- app/lib/calculos.ts: funciones de cálculo (calcularCuota y calcularRentabilidad)

## Funcionalidades

### 1. Simulador de crédito hipotecario
Campos de entrada (data-testid): hip-valor, hip-pie, hip-plazo, hip-tasa. Botón: hip-calcular.
Resultados (data-testid): hip-monto, hip-cuota, hip-total, hip-intereses. Error: hip-error.

Fórmula: monto = valor - pie; n = plazo * 12; i = tasa / 100 / 12; cuota = monto * i / (1 - (1 + i)^-n). Si la tasa es 0, cuota = monto / n.

Validaciones:
- Todos los campos son obligatorios
- Valor de la propiedad mayor a 0
- Pie no negativo y menor al valor de la propiedad
- Plazo entre 1 y 40 años
- Tasa entre 0 y 30 %

### 2. Calculadora de rentabilidad
Campos de entrada (data-testid): ren-precio, ren-arriendo, ren-gastos. Botón: ren-calcular.
Resultados (data-testid): ren-flujo, ren-rentabilidad, ren-anios. Error: ren-error.

Fórmula: flujo mensual = arriendo - gastos; flujo anual = flujo mensual * 12; rentabilidad = flujo anual / precio * 100; años de recuperación = precio / flujo anual (si el flujo anual no es positivo, muestra "No se recupera").

Validaciones:
- Todos los campos son obligatorios
- Precio mayor a 0
- Arriendo y gastos no negativos

## Datos de prueba conocidos
| Calculadora | Entradas | Resultado esperado |
|---|---|---|
| Hipotecario | valor 100000000, pie 20000000, plazo 20, tasa 4 | monto 80.000.000, cuota cercana a 484.784 |
| Rentabilidad | precio 100000000, arriendo 500000, gastos 100000 | flujo 400.000, rentabilidad 4.80 %, 20.8 años |

## Casos límite a probar
- Campos vacíos en ambas calculadoras
- Pie igual o mayor al valor de la propiedad
- Valores negativos y cero
- Plazo fuera de rango (0 y 41) y tasa fuera de rango (-1 y 31)
- Tasa 0 %
- Gastos mayores al arriendo (flujo negativo, "No se recupera")
- Números muy grandes y decimales

## Alcance de QA
- Pruebas manuales exploratorias de ambas calculadoras
- Casos de prueba generados con ayuda de IA y revisados manualmente
- Pruebas end-to-end con Playwright (carpeta tests/), 16 pruebas: cálculos correctos, validaciones y casos límite. Se ejecutan con `npx playwright test`
- Pruebas BDD con Cucumber (carpeta features/), escritas en español con Gherkin y ejecutadas con Playwright como motor. Se ejecutan con `npx cucumber-js`
- Por defecto, Cucumber prueba contra el sitio publicado; con la variable BASE_URL se puede apuntar a localhost

## Estructura de pruebas
- tests/hipotecario.spec.ts y tests/rentabilidad.spec.ts: pruebas Playwright
- features/*.feature: escenarios en lenguaje natural
- features/steps/steps.js: código asociado a cada frase
- features/support/hooks.js: apertura y cierre del navegador
- cucumber.js y playwright.config.ts: configuración
- qa/casos-de-prueba.md y qa/escenarios/*.feature: casos y escenarios para el documento funcional v2.0 (aún sin automatizar)

## Bitácora de cambios
- 2026-10-21: creación del proyecto, repositorio, calculadoras y despliegue en Vercel
- 2026-10-22: pruebas E2E con Playwright, 16 pruebas pasando
- 2026-10-22: pruebas BDD con Cucumber en español, todos los escenarios pasando
- 2026-10-25: documento funcional v1.0 y v2.0, dos refinamientos con el PO, análisis QA, plan de implementación y plan de pruebas
- 2026-10-25: 50 casos de prueba y 22 escenarios BDD para la v2.0 en qa/ (PR #1)
- 2026-10-26: documentos del proyecto en docs/ y README del proyecto