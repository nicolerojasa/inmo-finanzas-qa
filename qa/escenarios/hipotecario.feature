# language: es
@hipotecario
Característica: Simulador de crédito hipotecario
  Como persona que quiere comprar una propiedad
  Quiero calcular la cuota mensual de mi crédito
  Para saber si puedo pagarlo

  Antecedentes:
    Dado que estoy en la página principal

  @CA-01 @CA-02 @CA-04 @CA-05 @CA-06
  Esquema del escenario: Cálculo exitoso con distintos formatos de entrada
    Cuando completo el simulador hipotecario con valor "<valor>", pie "<pie>", plazo "<plazo>" y tasa "<tasa>"
    Y presiono calcular en el simulador hipotecario
    Entonces el monto del crédito es "$80.000.000"
    Y la cuota mensual es "<cuota>"
    Y el costo total es "<total>"
    Y los intereses totales son "<intereses>"

    Ejemplos:
      | criterio | caso                    | valor       | pie        | plazo | tasa | cuota    | total        | intereses   |
      | CA-01    | montos con puntos       | 100.000.000 | 20.000.000 | 20    | 4    | $484.784 | $116.348.223 | $36.348.223 |
      | CA-02    | montos sin puntos       | 100000000   | 20000000   | 20    | 4    | $484.784 | $116.348.223 | $36.348.223 |
      | CA-04    | tasa con coma decimal   | 100.000.000 | 20.000.000 | 20    | 4,5  | $506.120 | $121.468.680 | $41.468.680 |
      | CA-05    | tasa con punto decimal  | 100.000.000 | 20.000.000 | 20    | 4.5  | $506.120 | $121.468.680 | $41.468.680 |
      | CA-06    | plazo límite de 30 años | 100.000.000 | 20.000.000 | 30    | 4    | $381.932 | $137.495.605 | $57.495.605 |

  @CA-09 @CA-10 @CA-11 @CA-12 @CA-13 @CA-14 @CA-15
  Esquema del escenario: Datos incorrectos muestran un error y ningún resultado
    Cuando completo el simulador hipotecario con valor "<valor>", pie "<pie>", plazo "<plazo>" y tasa "<tasa>"
    Y presiono calcular en el simulador hipotecario
    Entonces el simulador hipotecario muestra el error "<error>"
    Y el simulador hipotecario no muestra resultados

    Ejemplos:
      | criterio | caso                | valor       | pie         | plazo | tasa  | error                                                                     |
      | CA-09    | campos vacíos       |             |             |       |       | Completa todos los campos.                                                |
      | CA-10    | valor cero          | 0           | 0           | 20    | 4     | El valor de la propiedad debe ser mayor a 0.                              |
      | CA-11    | pie igual al valor  | 100.000.000 | 100.000.000 | 20    | 4     | El pie debe ser menor al valor de la propiedad.                           |
      | CA-11    | pie mayor al valor  | 100.000.000 | 120.000.000 | 20    | 4     | El pie debe ser menor al valor de la propiedad.                           |
      | CA-12    | plazo 0             | 100.000.000 | 20.000.000  | 0     | 4     | El plazo debe estar entre 1 y 30 años.                                    |
      | CA-12    | plazo 31            | 100.000.000 | 20.000.000  | 31    | 4     | El plazo debe estar entre 1 y 30 años.                                    |
      | CA-13    | tasa 30,01          | 100.000.000 | 20.000.000  | 20    | 30,01 | La tasa debe estar entre 0 y 30%.                                         |
      | CA-13    | tasa 31             | 100.000.000 | 20.000.000  | 20    | 31    | La tasa debe estar entre 0 y 30%.                                         |
      | CA-14    | formato del valor   | 1.00.000    | 20.000.000  | 20    | 4     | El formato del valor de la propiedad no es válido. Ejemplo: 100.000.000. |
      | CA-15    | formato del pie     | 100.000.000 | 2.0000.000  | 20    | 4     | El formato del pie no es válido. Ejemplo: 100.000.000.                    |
