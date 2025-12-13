import { useState } from "react";
import { useRecibos, useRecibo } from "@/features/api.hooks";

type Recibo = {
  id: number;
  numero_recibo: number;
  fecha_emision: string;
  total: string;
  estado: string;
};

export default function RecibosPage() {
  const { data, isLoading, error } = useRecibos();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const {
    data: recibo,
    isLoading: loadingRecibo,
    error: reciboError,
  } = useRecibo(selectedId ?? 0);

  if (isLoading) {
    return <p className="p-6">Cargando recibos...</p>;
  }

  if (error) {
    console.error("Error cargando recibos:", error);
    return <p className="p-6 text-red-600">Error al cargar recibos</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Recibos</h1>

      {/* TABLE */}
      <table className="w-full border rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">N° Recibo</th>
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Acción</th>
          </tr>
        </thead>

        <tbody>
          {data?.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center p-4 text-gray-500">
                No hay recibos registrados
              </td>
            </tr>
          )}

          {data?.map((r: Recibo) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="border p-2">{r.id}</td>
              <td className="border p-2">{r.numero_recibo}</td>
              <td className="border p-2">{r.fecha_emision}</td>
              <td className="border p-2">S/ {r.total}</td>
              <td className="border p-2">{r.estado}</td>
              <td className="border p-2">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => setSelectedId(r.id)}
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DETAIL */}
      {loadingRecibo && <p className="text-gray-500">Cargando detalle...</p>}

      {reciboError && <p className="text-red-600">Error al cargar el recibo</p>}

      {recibo && (
        <div className="border p-4 rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Recibo #{recibo.numero_recibo}</h2>

          <div className="text-sm space-y-1">
            <p>
              <b>Fecha:</b> {recibo.fecha_emision}
            </p>
            <p>
              <b>Total:</b> S/ {recibo.total}
            </p>
            <p>
              <b>Estado:</b> {recibo.estado}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
