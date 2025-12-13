import { useEffect, useState } from "react";

type ConceptoPago = {
  id: number;
  descripcion: string;
  monto: number;
};

export default function ConceptosPagoPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [conceptos, setConceptos] = useState<ConceptoPago[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<ConceptoPago, "id">>({
    descripcion: "",
    monto: 0,
  });

  const fetchConceptos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/conceptos_pago`);
      const data = await res.json();
      setConceptos(data);
    } catch (err) {
      console.error("Error fetching conceptos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConceptos();
  }, []);

  const openCreateModal = () => {
    setEditId(null);
    setForm({ descripcion: "", monto: 0 });
    setModalOpen(true);
  };

  const openEditModal = (concepto: ConceptoPago) => {
    setEditId(concepto.id);
    setForm({ descripcion: concepto.descripcion, monto: concepto.monto });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const url = editId
        ? `${API_URL}/conceptos_pago/${editId}`
        : `${API_URL}/conceptos_pago`;
      const method = editId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setModalOpen(false);
      fetchConceptos();
    } catch (err) {
      console.error("Error saving concepto:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este concepto?")) return;
    try {
      await fetch(`${API_URL}/conceptos_pago/${id}`, { method: "DELETE" });
      fetchConceptos();
    } catch (err) {
      console.error("Error deleting concepto:", err);
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Conceptos de Pago</h2>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nuevo Concepto
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Descripción</th>
              <th className="border p-2">Monto</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {conceptos.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No hay conceptos registrados
                </td>
              </tr>
            ) : (
              conceptos.map((c) => (
                <tr key={c.id}>
                  <td className="border p-2">{c.id}</td>
                  <td className="border p-2">{c.descripcion}</td>
                  <td className="border p-2">{c.monto}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => openEditModal(c)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Editar Concepto" : "Nuevo Concepto"}
            </h3>

            <div className="flex flex-col gap-3">
              <label className="flex flex-col">
                <span>Descripción:</span>
                <input
                  className="border p-2 rounded"
                  value={form.descripcion}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                />
              </label>

              <label className="flex flex-col">
                <span>Monto:</span>
                <input
                  type="number"
                  step="0.01"
                  className="border p-2 rounded"
                  value={form.monto}
                  onChange={(e) =>
                    setForm({ ...form, monto: Number(e.target.value) })
                  }
                />
              </label>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
