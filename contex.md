# Contexto del proyecto: Inmo Finanzas QA

## Descripción
Sitio web con dos calculadoras para decisiones inmobiliarias: un simulador de crédito hipotecario y una calculadora de rentabilidad de inversión. Fue creado como proyecto de práctica del curso de QA + IA, para diseñar y automatizar pruebas sobre una aplicación real.

## Enlaces
- Sitio publicado: https://inmo-finanzas-qa.vercel.app/
- Repositorio: https://github.com/nicolerojasa/inmo-finanzas-qa

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
- Pruebas unitarias de las funciones de cálculo
- Pruebas end-to-end con Playwright usando los data-testid
- Ejecución automática de pruebas con GitHub Actions (opcional)

## Convenciones
- Idioma de la interfaz: español (Chile), montos en pesos con formato es-CL
- Todos los elementos interactivos tienen data-testid para facilitar la automatización
- Este archivo se actualiza cada vez que cambia el proyecto

## Bitácora de cambios
- 2026-10-21: creación del proyecto, repositorio, calculadoras y despliegue en Vercel