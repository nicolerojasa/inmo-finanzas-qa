"use client";

import { useState, type FormEvent } from "react";
import { calcularCuota, calcularRentabilidad } from "./lib/calculos";
import {
  formatoDecimal,
  formatoPesos,
  leerMonto,
  leerTasa,
  permiteMonto,
  permitePlazo,
  permiteTasa,
} from "./lib/formato";

const sinDatos = (x: string) => !/\d/.test(x);
const errorFormato = (campo: string) => `El formato ${campo} no es válido. Ejemplo: 100.000.000.`;

function Campo({
  label,
  id,
  value,
  onChange,
  permite,
  inputMode,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  permite: (v: string) => boolean;
  inputMode: "numeric" | "decimal";
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        id={id}
        data-testid={id}
        type="text"
        inputMode={inputMode}
        autoComplete="off"
        value={value}
        onChange={(e) => {
          if (permite(e.target.value)) onChange(e.target.value);
        }}
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

  function calcular(e: FormEvent) {
    e.preventDefault();
    setRes(null);
    if ([valor, pie, plazo, tasa].some(sinDatos)) {
      return setError("Completa todos los campos.");
    }
    const v = leerMonto(valor);
    if (v === null) return setError(errorFormato("del valor de la propiedad"));
    const p = leerMonto(pie);
    if (p === null) return setError(errorFormato("del pie"));
    const a = Number(plazo);
    const t = leerTasa(tasa);
    if (v <= 0) return setError("El valor de la propiedad debe ser mayor a 0.");
    if (p >= v) return setError("El pie debe ser menor al valor de la propiedad.");
    if (a < 1 || a > 30) return setError("El plazo debe estar entre 1 y 30 años.");
    if (t > 30) return setError("La tasa debe estar entre 0 y 30%.");
    setError("");
    setRes(calcularCuota(v, p, a, t));
  }

  return (
    <form
      onSubmit={calcular}
      className="rounded-lg border border-gray-300 p-6 space-y-4"
      data-testid="hipotecario"
    >
      <h2 className="text-xl font-semibold">Simulador de crédito hipotecario</h2>
      <Campo label="Valor de la propiedad ($)" id="hip-valor" value={valor} onChange={setValor} permite={permiteMonto} inputMode="numeric" />
      <Campo label="Pie ($)" id="hip-pie" value={pie} onChange={setPie} permite={permiteMonto} inputMode="numeric" />
      <Campo label="Plazo (años)" id="hip-plazo" value={plazo} onChange={setPlazo} permite={permitePlazo} inputMode="numeric" />
      <Campo label="Tasa anual (%)" id="hip-tasa" value={tasa} onChange={setTasa} permite={permiteTasa} inputMode="decimal" />
      <button
        type="submit"
        data-testid="hip-calcular"
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Calcular
      </button>
      {error && (
        <p data-testid="hip-error" role="alert" className="text-red-600">
          {error}
        </p>
      )}
      {res && (
        <div data-testid="hip-resultado" className="space-y-1">
          <p>Monto del crédito: <strong data-testid="hip-monto">{formatoPesos(res.monto)}</strong></p>
          <p>Cuota mensual: <strong data-testid="hip-cuota">{formatoPesos(res.cuota)}</strong></p>
          <p>Costo total: <strong data-testid="hip-total">{formatoPesos(res.total)}</strong></p>
          <p>Intereses totales: <strong data-testid="hip-intereses">{formatoPesos(res.intereses)}</strong></p>
        </div>
      )}
    </form>
  );
}

function Rentabilidad() {
  const [precio, setPrecio] = useState("");
  const [arriendo, setArriendo] = useState("");
  const [gastos, setGastos] = useState("");
  const [error, setError] = useState("");
  const [res, setRes] = useState<ReturnType<typeof calcularRentabilidad> | null>(null);

  function calcular(e: FormEvent) {
    e.preventDefault();
    setRes(null);
    if ([precio, arriendo, gastos].some(sinDatos)) {
      return setError("Completa todos los campos.");
    }
    const p = leerMonto(precio);
    if (p === null) return setError(errorFormato("del precio de la propiedad"));
    const a = leerMonto(arriendo);
    if (a === null) return setError(errorFormato("del arriendo mensual"));
    const g = leerMonto(gastos);
    if (g === null) return setError(errorFormato("de los gastos mensuales"));
    if (p <= 0) return setError("El precio de la propiedad debe ser mayor a 0.");
    setError("");
    setRes(calcularRentabilidad(p, a, g));
  }

  return (
    <form
      onSubmit={calcular}
      className="rounded-lg border border-gray-300 p-6 space-y-4"
      data-testid="rentabilidad"
    >
      <h2 className="text-xl font-semibold">Calculadora de rentabilidad</h2>
      <Campo label="Precio de la propiedad ($)" id="ren-precio" value={precio} onChange={setPrecio} permite={permiteMonto} inputMode="numeric" />
      <Campo label="Arriendo mensual ($)" id="ren-arriendo" value={arriendo} onChange={setArriendo} permite={permiteMonto} inputMode="numeric" />
      <Campo label="Gastos mensuales ($)" id="ren-gastos" value={gastos} onChange={setGastos} permite={permiteMonto} inputMode="numeric" />
      <button
        type="submit"
        data-testid="ren-calcular"
        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Calcular
      </button>
      {error && (
        <p data-testid="ren-error" role="alert" className="text-red-600">
          {error}
        </p>
      )}
      {res && (
        <div data-testid="ren-resultado" className="space-y-1">
          <p>Flujo mensual neto: <strong data-testid="ren-flujo">{formatoPesos(res.flujoMensual)}</strong></p>
          <p>Rentabilidad anual: <strong data-testid="ren-rentabilidad">{formatoDecimal(res.rentabilidad, 2)} %</strong></p>
          <p>
            Años para recuperar la inversión:{" "}
            <strong data-testid="ren-anios">
              {res.anios === null ? "No se recupera" : formatoDecimal(res.anios, 1)}
            </strong>
          </p>
        </div>
      )}
    </form>
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
