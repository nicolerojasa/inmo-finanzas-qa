# QA: Inmo Finanzas

Casos y escenarios de prueba para la versión de la app que implementa el **documento funcional v2.0**, según el **plan de pruebas v1.0**.

## Contenido

| Archivo | Qué tiene |
|---|---|
| [casos-de-prueba.md](casos-de-prueba.md) | 50 casos de prueba (simulador, rentabilidad, ingreso de datos y generales) y la trazabilidad con los 40 criterios de aceptación |
| [escenarios/hipotecario.feature](escenarios/hipotecario.feature) | Escenarios BDD del simulador de crédito hipotecario |
| [escenarios/rentabilidad.feature](escenarios/rentabilidad.feature) | Escenarios BDD de la calculadora de rentabilidad |

## Estado

- **Pendiente de revisión de QA.**
- Los escenarios todavía no están automatizados. Están en `qa/escenarios/` y no en `features/` para que `npx cucumber-js` siga ejecutando las pruebas actuales sin fallar. Cuando la app implemente el documento funcional v2.0, se moverán a `features/` y se agregarán los pasos nuevos en `features/steps/steps.js`.
- Cada fila de los escenarios tiene una columna `criterio` con su criterio de aceptación, y cada escenario lleva etiquetas `@CA-xx`.

## Ajuste respecto del plan de pruebas

Los escenarios BDD cubren más criterios que la columna Cucumber de la matriz de trazabilidad del plan de pruebas v1.0. Además de CA-01, CA-09, CA-11 a CA-13, CA-16, CA-17 y CA-21, incluyen CA-02, CA-04, CA-05, CA-06, CA-10, CA-14, CA-15, CA-18, CA-19, CA-20 y CA-22, porque son reglas de negocio nuevas del v2.0. Si se aprueba, se actualiza esa columna del plan.

## Cómo revisar

1. ¿Cada criterio de aceptación tiene al menos un caso? (sección 5 de los casos)
2. ¿Los resultados esperados coinciden con el documento funcional v2.0?
3. ¿Los pasos se entienden sin conocer la app?
4. ¿Los escenarios se leen como reglas de negocio y no como instrucciones técnicas?
