# language: es
@rentabilidad
Característica: Calculadora de rentabilidad
  Como inversionista
  Quiero saber cuánto rinde una propiedad en arriendo
  Para decidir si me conviene comprarla

  Antecedentes:
    Dado que estoy en la página principal

  @CA-16 @CA-17 @CA-18 @CA-19
  Esquema del escenario: Cálculo de la rentabilidad
    Cuando completo la calculadora de rentabilidad con precio "<precio>", arriendo "<arriendo>" y gastos "<gastos>"
    Y presiono calcular en la calculadora de rentabilidad
    Entonces el flujo mensual neto es "<flujo>"
    Y la rentabilidad anual es "<rentabilidad>"
    Y los años para recuperar la inversión son "<anios>"

    Ejemplos:
      | criterio | caso                       | precio      | arriendo | gastos  | flujo     | rentabilidad | anios          |
      | CA-16    | datos válidos              | 100.000.000 | 500.000  | 100.000 | $400.000  | 4,80 %       | 20,8           |
      | CA-17    | gastos mayores al arriendo | 100.000.000 | 300.000  | 400.000 | -$100.000 | -1,20 %      | No se recupera |
      | CA-18    | sin arriendo ni gastos     | 100.000.000 | 0        | 0       | $0        | 0,00 %       | No se recupera |
      | CA-19    | redondeo desde 5           | 100.000.000 | 201.250  | 100.000 | $101.250  | 1,22 %       | 82,3           |

  @CA-20 @CA-21 @CA-22
  Esquema del escenario: Datos incorrectos muestran un error y ningún resultado
    Cuando completo la calculadora de rentabilidad con precio "<precio>", arriendo "<arriendo>" y gastos "<gastos>"
    Y presiono calcular en la calculadora de rentabilidad
    Entonces la calculadora de rentabilidad muestra el error "<error>"
    Y la calculadora de rentabilidad no muestra resultados

    Ejemplos:
      | criterio | caso                 | precio      | arriendo | gastos  | error                                                                |
      | CA-20    | campos vacíos        |             |          |         | Completa todos los campos.                                           |
      | CA-21    | precio cero          | 0           | 500.000  | 100.000 | El precio de la propiedad debe ser mayor a 0.                        |
      | CA-22    | formato del arriendo | 100.000.000 | 5.00.000 | 100.000 | El formato del arriendo mensual no es válido. Ejemplo: 100.000.000. |
