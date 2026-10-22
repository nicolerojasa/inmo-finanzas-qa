# language: es
Característica: Simulador de crédito hipotecario
  Como persona que quiere comprar una propiedad
  Quiero calcular mi cuota mensual
  Para saber si puedo pagar el crédito

  Escenario: Cálculo exitoso de la cuota
    Dado que estoy en la página principal
    Cuando completo el simulador hipotecario con valor "100000000", pie "20000000", plazo "20" y tasa "4"
    Y presiono calcular en el simulador hipotecario
    Entonces el monto del crédito es "$80.000.000"
    Y la cuota mensual es cercana a 484784

  Esquema del escenario: Validaciones de datos incorrectos
    Dado que estoy en la página principal
    Cuando completo el simulador hipotecario con valor "<valor>", pie "<pie>", plazo "<plazo>" y tasa "<tasa>"
    Y presiono calcular en el simulador hipotecario
    Entonces el simulador hipotecario muestra el error "<error>"

    Ejemplos:
      | valor     | pie       | plazo | tasa | error                                           |
      | 100000000 | 120000000 | 20    | 4    | El pie debe ser menor al valor de la propiedad. |
      | 100000000 | 20000000  | 0     | 4    | El plazo debe estar entre 1 y 40 años.          |
      | 100000000 | 20000000  | 20    | 31   | La tasa debe estar entre 0 y 30%.               |
      |           |           |       |      | Completa todos los campos.                      |