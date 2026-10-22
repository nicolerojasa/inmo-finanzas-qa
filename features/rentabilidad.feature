# language: es
Característica: Calculadora de rentabilidad
  Como inversionista
  Quiero saber cuánto rinde una propiedad en arriendo
  Para decidir si me conviene comprarla

  Escenario: Cálculo exitoso de rentabilidad
    Dado que estoy en la página principal
    Cuando completo la calculadora de rentabilidad con precio "100000000", arriendo "500000" y gastos "100000"
    Y presiono calcular en la calculadora de rentabilidad
    Entonces la rentabilidad anual es "4.80%"
    Y los años para recuperar la inversión son "20.8"

  Escenario: Gastos mayores al arriendo
    Dado que estoy en la página principal
    Cuando completo la calculadora de rentabilidad con precio "100000000", arriendo "300000" y gastos "400000"
    Y presiono calcular en la calculadora de rentabilidad
    Entonces los años para recuperar la inversión son "No se recupera"

  Escenario: Precio de la propiedad en cero
    Dado que estoy en la página principal
    Cuando completo la calculadora de rentabilidad con precio "0", arriendo "500000" y gastos "100000"
    Y presiono calcular en la calculadora de rentabilidad
    Entonces la calculadora de rentabilidad muestra el error "El precio de la propiedad debe ser mayor a 0."