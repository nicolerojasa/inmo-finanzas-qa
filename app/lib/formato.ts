const MAX_DIGITOS_MONTO = 12;

export function permiteMonto(texto: string) {
  return /^[0-9.]*$/.test(texto) && texto.replace(/\./g, "").length <= MAX_DIGITOS_MONTO;
}

export function permitePlazo(texto: string) {
  return /^[0-9]*$/.test(texto);
}

export function permiteTasa(texto: string) {
  return /^[0-9]*([.,][0-9]{0,2})?$/.test(texto);
}

export function leerMonto(texto: string) {
  if (!/^\d{1,3}(\.\d{3})*$|^\d+$/.test(texto)) return null;
  return Number(texto.replace(/\./g, ""));
}

export function leerTasa(texto: string) {
  return Number(texto.replace(",", "."));
}

export function formatoPesos(n: number) {
  const pesos = Math.round(n);
  return (pesos < 0 ? "-$" : "$") + Math.abs(pesos).toLocaleString("es-CL");
}

// toFixed y toLocaleString redondean el valor binario: 1,215 se guarda como 1,2149999… y quedaría en 1,21.
// Por eso se limpia ese error antes de redondear desde 5 hacia arriba, sobre el valor sin signo.
export function redondear(n: number, decimales: number) {
  const factor = 10 ** decimales;
  const r = (Math.sign(n) * Math.round(Number((Math.abs(n) * factor).toFixed(8)))) / factor;
  return r === 0 ? 0 : r;
}

export function formatoDecimal(n: number, decimales: number) {
  return redondear(n, decimales).toLocaleString("es-CL", {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  });
}
