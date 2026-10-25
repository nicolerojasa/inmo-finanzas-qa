# Casos de prueba: Inmo Finanzas

| | |
|---|---|
| **Proyecto** | Inmo Finanzas |
| **Basado en** | Documento funcional v2.0 y Plan de pruebas v1.0 |
| **Fecha** | 25-10-2026 |
| **Autor** | QA: [tu nombre] |
| **Estado** | Pendiente de revisión |

## Cómo leer este documento

- **Precondición común:** la página principal está abierta en el ambiente de prueba (vista previa de desarrollo) y todos los campos están vacíos.
- **Pasos estándar de cálculo (PE):**
  1. Escribir los datos en los campos, en el orden de la tabla.
  2. Presionar "Calcular".
  3. Comparar lo que aparece en pantalla con el resultado esperado.
- **Casos con error:** además del mensaje, se verifica que no aparezcan resultados en esa calculadora (RF-05).
- **Ejecución:** M = manual, P = Playwright, C = Cucumber (escenario en `qa/escenarios/`).
- **Prioridad:** Alta = cálculo principal o validación que evita datos incorrectos. Media = mensajes, formatos y valores límite. Baja = casos poco frecuentes.

**Total: 50 casos** (19 del simulador, 8 de rentabilidad, 12 de ingreso de datos y 11 generales). Cubren los 40 criterios de aceptación (sección 5).

## 1. Simulador de crédito hipotecario (CP-HIP)

Pasos: PE. Datos en el orden Valor / Pie / Plazo / Tasa.

| ID | Caso | CA | Prioridad | Datos | Resultado esperado | Ejecución |
|---|---|---|---|---|---|---|
| CP-HIP-01 | Cálculo con montos con punto de miles | CA-01 | Alta | 100.000.000 / 20.000.000 / 20 / 4 | Monto $80.000.000; cuota $484.784; costo total $116.348.223; intereses $36.348.223 | M, P, C |
| CP-HIP-02 | Montos sin puntos | CA-02 | Alta | 100000000 / 20000000 / 20 / 4 | Igual que CP-HIP-01 | M, P, C |
| CP-HIP-03 | Plazo con cero a la izquierda | CA-03 | Baja | 100.000.000 / 20.000.000 / 020 / 4 | Igual que CP-HIP-01 | M, P |
| CP-HIP-04 | Tasa con coma decimal | CA-04 | Alta | 100.000.000 / 20.000.000 / 20 / 4,5 | Cuota $506.120; costo total $121.468.680; intereses $41.468.680 | M, P, C |
| CP-HIP-05 | Tasa con punto decimal | CA-05 | Alta | 100.000.000 / 20.000.000 / 20 / 4.5 | Igual que CP-HIP-04 | M, P, C |
| CP-HIP-06 | Plazo en el límite: 30 años | CA-06 | Alta | 100.000.000 / 20.000.000 / 30 / 4 | Sin error; cuota $381.932; costo total $137.495.605; intereses $57.495.605 | M, P, C |
| CP-HIP-07 | Tasa 0 % y plazo mínimo | CA-07 | Media | 12.000.000 / 0 / 1 / 0 | Monto $12.000.000; cuota $1.000.000; costo total $12.000.000; intereses $0 | M, P |
| CP-HIP-08 | Tasa en el límite: 30 % | CA-08 | Media | 100.000.000 / 20.000.000 / 20 / 30 | Sin error; cuota $2.005.351 | M, P |
| CP-HIP-09 | Todos los campos vacíos | CA-09 | Alta | (vacíos) | "Completa todos los campos." | M, P, C |
| CP-HIP-10 | Un solo campo vacío | RF-02 | Media | 100.000.000 / 20.000.000 / 20 / (vacío) | "Completa todos los campos." | M, P |
| CP-HIP-11 | Valor de la propiedad 0 | CA-10 | Alta | 0 / 0 / 20 / 4 | "El valor de la propiedad debe ser mayor a 0." | M, P, C |
| CP-HIP-12 | Pie igual al valor | CA-11 | Alta | 100.000.000 / 100.000.000 / 20 / 4 | "El pie debe ser menor al valor de la propiedad." | M, P, C |
| CP-HIP-13 | Pie mayor al valor | CA-11 | Alta | 100.000.000 / 120.000.000 / 20 / 4 | "El pie debe ser menor al valor de la propiedad." | M, P, C |
| CP-HIP-14 | Plazo 0 | CA-12 | Alta | 100.000.000 / 20.000.000 / 0 / 4 | "El plazo debe estar entre 1 y 30 años." | M, P, C |
| CP-HIP-15 | Plazo 31 | CA-12 | Alta | 100.000.000 / 20.000.000 / 31 / 4 | "El plazo debe estar entre 1 y 30 años." | M, P, C |
| CP-HIP-16 | Tasa 30,01 | CA-13 | Media | 100.000.000 / 20.000.000 / 20 / 30,01 | "La tasa debe estar entre 0 y 30%." | M, P, C |
| CP-HIP-17 | Tasa 31 | CA-13 | Media | 100.000.000 / 20.000.000 / 20 / 31 | "La tasa debe estar entre 0 y 30%." | M, P, C |
| CP-HIP-18 | Formato inválido en el valor | CA-14 | Media | 1.00.000 / 20.000.000 / 20 / 4 | "El formato del valor de la propiedad no es válido. Ejemplo: 100.000.000." | M, P, C |
| CP-HIP-19 | Formato inválido en el pie | CA-15 | Media | 100.000.000 / 2.0000.000 / 20 / 4 | "El formato del pie no es válido. Ejemplo: 100.000.000." | M, P, C |

## 2. Calculadora de rentabilidad (CP-REN)

Pasos: PE. Datos en el orden Precio / Arriendo / Gastos.

| ID | Caso | CA | Prioridad | Datos | Resultado esperado | Ejecución |
|---|---|---|---|---|---|---|
| CP-REN-01 | Cálculo con datos válidos | CA-16 | Alta | 100.000.000 / 500.000 / 100.000 | Flujo $400.000; rentabilidad 4,80 %; 20,8 años | M, P, C |
| CP-REN-02 | Gastos mayores al arriendo | CA-17 | Alta | 100.000.000 / 300.000 / 400.000 | Flujo -$100.000; rentabilidad -1,20 %; "No se recupera" | M, P, C |
| CP-REN-03 | Sin arriendo ni gastos | CA-18 | Media | 100.000.000 / 0 / 0 | Flujo $0; rentabilidad 0,00 %; "No se recupera" | M, P, C |
| CP-REN-04 | Redondeo desde 5 hacia arriba | CA-19 | Alta | 100.000.000 / 201.250 / 100.000 | Flujo $101.250; rentabilidad 1,22 %; 82,3 años | M, P, C |
| CP-REN-05 | Todos los campos vacíos | CA-20 | Alta | (vacíos) | "Completa todos los campos." | M, P, C |
| CP-REN-06 | Un solo campo vacío | RF-03 | Media | 100.000.000 / 500.000 / (vacío) | "Completa todos los campos." | M, P |
| CP-REN-07 | Precio 0 | CA-21 | Alta | 0 / 500.000 / 100.000 | "El precio de la propiedad debe ser mayor a 0." | M, P, C |
| CP-REN-08 | Formato inválido en el arriendo | CA-22 | Media | 100.000.000 / 5.00.000 / 100.000 | "El formato del arriendo mensual no es válido. Ejemplo: 100.000.000." | M, P, C |

## 3. Ingreso de datos (CP-ENT)

| ID | Caso | CA | Prioridad | Pasos | Resultado esperado | Ejecución |
|---|---|---|---|---|---|---|
| CP-ENT-01 | Caracteres no permitidos en un monto | CA-23 | Alta | En "Valor de la propiedad ($)" escribir, uno por uno: a, espacio, $, %, +, - y e | Ninguno aparece; el campo sigue vacío | M, P |
| CP-ENT-02 | Caracteres no permitidos en plazo y tasa | CA-23 | Alta | Repetir CP-ENT-01 en "Plazo (años)" y en "Tasa anual (%)" | Ninguno aparece | M, P |
| CP-ENT-03 | Caracteres no permitidos en rentabilidad | CA-23 | Media | Repetir CP-ENT-01 en los tres campos de rentabilidad | Ninguno aparece | M, P |
| CP-ENT-04 | Punto y coma en el plazo | CA-24 | Media | En "Plazo (años)" escribir 1.5; borrar; escribir 1,5 | El punto y la coma no aparecen: en ambos casos el campo queda con 15 | M, P |
| CP-ENT-05 | Tercer decimal en la tasa | CA-25 | Media | En "Tasa anual (%)" escribir 4,567 | El campo queda con 4,56 | M, P |
| CP-ENT-06 | Segundo separador en la tasa | CA-25 | Media | En "Tasa anual (%)" escribir 4,5,6 | El campo queda con 4,56 | M, P |
| CP-ENT-07 | Monto de 13 dígitos | CA-26 | Media | En "Valor de la propiedad ($)" escribir 1234567890123 | El campo queda con 123456789012 | M, P |
| CP-ENT-08 | Pegar un monto válido | CA-27 | Alta | Copiar "100.000.000" y pegarlo en "Valor de la propiedad ($)" | El campo queda con 100.000.000 | M, P |
| CP-ENT-09 | Pegar un monto con símbolo $ | CA-28 | Alta | Escribir 500 en "Valor de la propiedad ($)"; seleccionar el contenido y pegar "$100.000.000" | No se pega nada: el campo sigue con 500 | M, P |
| CP-ENT-10 | Pegar un decimal en el plazo | CA-29 | Alta | Escribir 20 en "Plazo (años)"; seleccionar el contenido y pegar "1.5" | No se pega nada: el campo sigue con 20 | M, P |
| CP-ENT-11 | Calcular con Enter en el simulador | CA-30 | Alta | Escribir los datos de CP-HIP-01; con el cursor en "Tasa anual (%)", presionar Enter | Mismos resultados que CP-HIP-01 | M, P |
| CP-ENT-12 | Calcular con Enter en rentabilidad | CA-30 | Alta | Escribir los datos de CP-REN-01; con el cursor en "Gastos mensuales ($)", presionar Enter | Mismos resultados que CP-REN-01 | M, P |

## 4. Página, errores y requerimientos no funcionales (CP-GEN)

| ID | Caso | CA | Prioridad | Pasos | Resultado esperado | Ejecución |
|---|---|---|---|---|---|---|
| CP-GEN-01 | Carga inicial de la página | CA-31 | Alta | Abrir la página | Título "Inmo Finanzas", texto "Calculadoras para decidir sobre tu inversión inmobiliaria." y las dos calculadoras con los campos vacíos, sin resultados ni errores | M, P |
| CP-GEN-02 | Las calculadoras son independientes | CA-32 | Media | Ejecutar CP-HIP-01; luego presionar "Calcular" en rentabilidad con los campos vacíos | Rentabilidad muestra "Completa todos los campos."; los resultados del simulador siguen visibles | M, P |
| CP-GEN-03 | Solo se muestra el primer error | CA-33 | Media | En el simulador: 0 / 0 / 31 / 4; presionar "Calcular" | Solo aparece "El valor de la propiedad debe ser mayor a 0." | M, P |
| CP-GEN-04 | Los datos se mantienen después de un error | CA-34 | Media | Ejecutar CP-HIP-13 | Aparece el error del pie y los cuatro campos mantienen lo escrito | M, P |
| CP-GEN-05 | Pantalla de celular (375 px) | CA-35 | Media | Ver la página a 375 px de ancho (DevTools) | Una columna: el simulador arriba y rentabilidad abajo | M, P |
| CP-GEN-06 | Pantalla de escritorio (1280 px) | CA-35 | Media | Ver la página a 1280 px de ancho | Dos columnas: el simulador a la izquierda y rentabilidad a la derecha | M, P |
| CP-GEN-07 | La etiqueta lleva al campo | CA-36 | Baja | Hacer clic en el texto "Plazo (años)" | El cursor queda en el campo plazo | M, P |
| CP-GEN-08 | Los datos no salen del navegador | CA-37 | Alta | Abrir DevTools en la pestaña Red; ejecutar CP-HIP-01 y CP-REN-01 | No aparece ninguna solicitud nueva con los datos ingresados | M |
| CP-GEN-09 | Compatibilidad entre navegadores | CA-38 | Alta | Ejecutar CP-HIP-01, CP-REN-01 y CP-ENT-01 en Chrome, Safari, Firefox y Edge de escritorio, Safari de iPhone y Chrome de Android | Mismos resultados en todos | M, P (Chromium, Firefox y WebKit) |
| CP-GEN-10 | Teclado en el celular | CA-39 | Media | En iPhone y en Android, tocar cada campo | Teclado numérico en montos y plazo; teclado decimal en la tasa | M |
| CP-GEN-11 | El lector de pantalla anuncia el error | CA-40 | Media | Activar VoiceOver; ejecutar CP-HIP-09 | VoiceOver lee "Completa todos los campos." | M |

## 5. Trazabilidad: criterio de aceptación → casos

| CA | Casos | CA | Casos |
|---|---|---|---|
| CA-01 | CP-HIP-01 | CA-21 | CP-REN-07 |
| CA-02 | CP-HIP-02 | CA-22 | CP-REN-08 |
| CA-03 | CP-HIP-03 | CA-23 | CP-ENT-01, CP-ENT-02, CP-ENT-03 |
| CA-04 | CP-HIP-04 | CA-24 | CP-ENT-04 |
| CA-05 | CP-HIP-05 | CA-25 | CP-ENT-05, CP-ENT-06 |
| CA-06 | CP-HIP-06 | CA-26 | CP-ENT-07 |
| CA-07 | CP-HIP-07 | CA-27 | CP-ENT-08 |
| CA-08 | CP-HIP-08 | CA-28 | CP-ENT-09 |
| CA-09 | CP-HIP-09 | CA-29 | CP-ENT-10 |
| CA-10 | CP-HIP-11 | CA-30 | CP-ENT-11, CP-ENT-12 |
| CA-11 | CP-HIP-12, CP-HIP-13 | CA-31 | CP-GEN-01 |
| CA-12 | CP-HIP-14, CP-HIP-15 | CA-32 | CP-GEN-02 |
| CA-13 | CP-HIP-16, CP-HIP-17 | CA-33 | CP-GEN-03 |
| CA-14 | CP-HIP-18 | CA-34 | CP-GEN-04 |
| CA-15 | CP-HIP-19 | CA-35 | CP-GEN-05, CP-GEN-06 |
| CA-16 | CP-REN-01 | CA-36 | CP-GEN-07 |
| CA-17 | CP-REN-02 | CA-37 | CP-GEN-08 |
| CA-18 | CP-REN-03 | CA-38 | CP-GEN-09 |
| CA-19 | CP-REN-04 | CA-39 | CP-GEN-10 |
| CA-20 | CP-REN-05 | CA-40 | CP-GEN-11 |

CP-HIP-10 y CP-REN-06 no tienen criterio propio: prueban la regla "Cualquiera vacío" de RF-02 y RF-03.
