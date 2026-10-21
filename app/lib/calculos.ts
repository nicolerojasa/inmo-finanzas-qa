export function calcularCuota(
  valor: number,
  pie: number,
  plazoAnios: number,
  tasaAnual: number
) {
  const monto = valor - pie;
  const n = plazoAnios * 12;
  const i = tasaAnual / 100 / 12;
  const cuota = i === 0 ? monto / n : (monto * i) / (1 - Math.pow(1 + i, -n));
  const total = cuota * n;
  return { monto, cuota, total, intereses: total - monto };
}

export function calcularRentabilidad(
  precio: number,
  arriendoMensual: number,
  gastosMensuales: number
) {
  const flujoMensual = arriendoMensual - gastosMensuales;
  const flujoAnual = flujoMensual * 12;
  const rentabilidad = (flujoAnual / precio) * 100;
  const anios = flujoAnual > 0 ? precio / flujoAnual : null;
  return { flujoMensual, flujoAnual, rentabilidad, anios };
}