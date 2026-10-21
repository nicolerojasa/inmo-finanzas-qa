"use client";

import { useState } from "react";
import { calcularCuota, calcularRentabilidad } from "./lib/calculos";

const clp = (n: number) => "$" + Math.round(n).toLocaleString("es-CL");

function Campo({
  label,
  id,
  value,
  onChange,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        id={id}
        data-testid={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded border border-gray-300 p-2 text-black"
      />
    </label>
  );
}

function Hipotecario() {
  const [valor, setValor] = useState("");
  const [pie, setPie] = useState("");
  const [plazo, setPlazo] = useState("");
  const [tasa, setTasa] = useState("");
  const [error, setError] = useState("");
  const [res, setRes] = useState<ReturnType<typeof calcularCuota> | null>(null);

  function calcular() {
    setRes(null);
    if ([valor, pie, plazo, tasa].some((x) => x.trim() === "")) {
      return setError("Completa todos los campos.");
    }
    const v = Number(valor);
    const p = Number(pie);
    const a = Number(plazo);
    const t = Number(tasa);
    if (v <= 0) return setError("El valor de la propiedad debe ser mayor a 0.");
    if (p < 0) return setError("El pie no puede ser negativo.");
    if (p >= v) return setError("El pie debe ser menor al valor de la propiedad.");
    if (a <= 0 || a > 40) return setError("El plazo debe estar entre 1 y 40 años.");
    if (t < 0 || t > 30) return setError("La tasa debe estar entre 0 y 30%.");
    setError("");
    setRes(calcularCuota(v, p, a, t));
  }

  return (
    <section className="rounded-lg border border-gray-300 p-6 space-y-4" data-testid="hipotecario">
      <h2 className="text-xl font-semibold">Simulador de crédito hipotecario</h2>
      <Campo label="Valor de la propiedad ($)" id="hip-valor" value={valor} onChange={setValor} />
      <Campo label="Pie ($)" id="hip-pie" value={pie} onChange={setPie} />
      <Campo label="Plazo (años)" id="hip-plazo" value={plazo} onChange={setPlazo} />
      <Campo label="Tasa anual (%)" id="hip-tasa" value={tasa} onChange={setTasa} />
      <button
        data-testid="hip-calcular"
        onClick={calcular}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Calcular
      </button>
      {error && (
        <p data-testid="hip-error" className="text-red-600">
          {error}
        </p>
      )}
      {res && (
        <div data-testid="hip-resultado" className="space-y-1">
          <p>Monto del crédito: <strong data-testid="hip-monto">{clp(res.monto)}</strong></p>
          <p>Cuota mensual: <strong data-testid="hip-cuota">{clp(res.cuota)}</strong></p>
          <p>Costo total: <strong data-testid="hip-total">{clp(res.total)}</strong></p>
          <p>Intereses totales: <strong data-testid="hip-intereses">{clp(res.intereses)}</strong></p>
        </div>
      )}
    </section>
  );
}

function Rentabilidad() {
  const [precio, setPrecio] = useState("");
  const [arriendo, setArriendo] = useState("");
  const [gastos, setGastos] = useState("");
  const [error, setError] = useState("");
  const [res, setRes] = useState<ReturnType<typeof calcularRentabilidad> | null>(null);

  function calcular() {
    setRes(null);
    if ([precio, arriendo, gastos].some((x) => x.trim() === "")) {
      return setError("Completa todos los campos.");
    }
    const p = Number(precio);
    const a = Number(arriendo);
    const g = Number(gastos);
    if (p <= 0) return setError("El precio de la propiedad debe ser mayor a 0.");
    if (a < 0) return setError("El arriendo no puede ser negativo.");
    if (g < 0) return setError("Los gastos no pueden ser negativos.");
    setError("");
    setRes(calcularRentabilidad(p, a, g));
  }

  return (
    <section className="rounded-lg border border-gray-300 p-6 space-y-4" data-testid="rentabilidad">
      <h2 className="text-xl font-semibold">Calculadora de rentabilidad</h2>
      <Campo label="Precio de la propiedad ($)" id="ren-precio" value={precio} onChange={setPrecio} />
      <Campo label="Arriendo mensual ($)" id="ren-arriendo" value={arriendo} onChange={setArriendo} />
      <Campo label="Gastos mensuales ($)" id="ren-gastos" value={gastos} onChange={setGastos} />
      <button
        data-testid="ren-calcular"
        onClick={calcular}
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Calcular
      </button>
      {error && (
        <p data-testid="ren-error" className="text-red-600">
          {error}
        </p>
      )}
      {res && (
        <div data-testid="ren-resultado" className="space-y-1">
          <p>Flujo mensual neto: <strong data-testid="ren-flujo">{clp(res.flujoMensual)}</strong></p>
          <p>Rentabilidad anual: <strong data-testid="ren-rentabilidad">{res.rentabilidad.toFixed(2)}%</strong></p>
          <p>
            Años para recuperar la inversión:{" "}
            <strong data-testid="ren-anios">
              {res.anios === null ? "No se recupera" : res.anios.toFixed(1)}
            </strong>
          </p>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">Inmo Finanzas</h1>
      <p>Calculadoras para decidir sobre tu inversión inmobiliaria.</p>
      <div className="grid gap-6 md:grid-cols-2">
        <Hipotecario />
        <Rentabilidad />
      </div>
    </main>
  );
}