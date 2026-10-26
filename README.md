# Inmo Finanzas

Sitio web con dos calculadoras para decidir sobre una inversión inmobiliaria: un **simulador de crédito hipotecario** y una **calculadora de rentabilidad**. Es un proyecto de práctica del curso de QA + IA.

Sitio publicado: https://inmo-finanzas-qa.vercel.app/

## Estado

La versión vigente de las reglas es el [documento funcional v2.0](docs/05-documento-funcional-v2.docx). La app publicada todavía no la implementa; los cambios pendientes están en el [plan de implementación](docs/06-plan-implementacion.docx).

## Tecnología

Next.js (App Router), React, TypeScript y Tailwind CSS. Publicado en Vercel.

## Ejecutar en local

```bash
npm install
npm run dev
```

Luego abrir http://localhost:3000.

## Pruebas

| Tipo | Carpeta | Comando |
|---|---|---|
| E2E (Playwright) | `tests/` | `npx playwright test` |
| BDD (Cucumber) | `features/` | `npx cucumber-js` |

- Playwright prueba por defecto la app en local y levanta el servidor solo.
- Cucumber prueba por defecto el sitio publicado. Para probar en local, primero ejecuta `npm run dev` y luego:

```bash
BASE_URL=http://localhost:3000 npx cucumber-js
```

## Documentación

Los documentos del proyecto están en `docs/`, en el orden del proceso:

| # | Documento | Descripción |
|---|---|---|
| 1 | [Acta de refinamiento 1](docs/01-acta-refinamiento-1.docx) | Decisiones del PO sobre el requerimiento original |
| 2 | [Documento funcional v1.0](docs/02-documento-funcional-v1.docx) | Primera versión del documento funcional |
| 3 | [Análisis QA](docs/03-analisis-qa-v1.docx) | Dudas, gaps y riesgos encontrados en el v1.0 |
| 4 | [Acta de refinamiento 2](docs/04-acta-refinamiento-2.docx) | Respuestas del PO al análisis QA |
| 5 | [Documento funcional v2.0](docs/05-documento-funcional-v2.docx) | **Versión vigente** |
| 6 | [Plan de implementación](docs/06-plan-implementacion.docx) | Cambios que hará desarrollo |
| 7 | [Plan de pruebas](docs/07-plan-pruebas.docx) | Estrategia de prueba de QA |

Los casos de prueba y los escenarios BDD para la v2.0 están en [qa/](qa/README.md).

## Estructura

```
app/          Interfaz (page.tsx) y cálculos (lib/calculos.ts)
tests/        Pruebas Playwright
features/     Escenarios Cucumber que se ejecutan hoy
qa/           Casos y escenarios para el documento funcional v2.0
docs/         Documentos del proyecto
context.md    Contexto del proyecto: reglas, identificadores y bitácora
```
