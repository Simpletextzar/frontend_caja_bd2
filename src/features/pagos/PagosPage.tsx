import { useEffect, useState } from "react";

type Pago = {
  id: number;
  id_usuario?: number;
  id_cajero?: number;
  id_tipo_pago?: number;
  fecha_pago?: string;
  total: number;
  observaciones?: string;
};

export default function PagosPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal & form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Pago, "id">>({
    id_usuario: undefined,
    id_cajero: undefined,
    id_tipo_pago: undefined,
    fecha_pago: new Date().toISOString().split("T")[0],
    total: 0,
    observaciones: "",
  });

  // Fetch all pagos
  const fetchPagos = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/pagos`);
      const data = await res.json();
      setPagos(data);
    } catch (err) {
      console.error("Error fetching pagos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  const openCreateModal = () => {
    setEditId(null);
    setForm({
      id_usuario: undefined,
      id_cajero: undefined,
      id_tipo_pago: undefined,
      fecha_pago: new Date().toISOString().split("T")[0],
      total: 0,
      observaciones: "",
    });
    setModalOpen(true);
  };

  const openEditModal = (pago: Pago) => {
    setEditId(pago.id);
    setForm({
      id_usuario: pago.id_usuario,
      id_cajero: pago.id_cajero,
      id_tipo_pago: pago.id_tipo_pago,
      fecha_pago:
        pago.fecha_pago?.split("T")[0] ??
        new Date().toISOString().split("T")[0],
      total: pago.total,
      observaciones: pago.observaciones,
    });
    setModalOpen(true);
  };

  // Create or update
  // const handleSubmit = async () => {
  //   const payload = { ...form };
  //   try {
  //     const url = editId ? `${API_URL}/pagos/${editId}` : `${API_URL}/pagos`;
  //     const method = editId ? "PUT" : "POST";
  //     await fetch(url, {
  //       method,
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });
  //     setModalOpen(false);
  //     fetchPagos();
  //   } catch (err) {
  //     console.error("Error saving pago:", err);
  //   }
  // };
  const handleSubmit = async () => {
    const payload = {
      ...form,
      fecha_pago: form.fecha_pago
        ? new Date(form.fecha_pago).toISOString()
        : undefined,
    };

    try {
      const url = editId ? `${API_URL}/pagos/${editId}` : `${API_URL}/pagos`;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      setModalOpen(false);
      fetchPagos();
    } catch (err) {
      console.error("Error saving pago:", err);
      alert("Error saving pago. Check console for details.");
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este pago?")) return;
    try {
      await fetch(`${API_URL}/pagos/${id}`, { method: "DELETE" });
      fetchPagos();
    } catch (err) {
      console.error("Error deleting pago:", err);
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Pagos</h2>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nuevo Pago
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Usuario</th>
              <th className="border p-2">Cajero</th>
              <th className="border p-2">Tipo Pago</th>
              <th className="border p-2">Fecha</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Observaciones</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  No hay pagos registrados
                </td>
              </tr>
            ) : (
              pagos.map((pago) => (
                <tr key={pago.id}>
                  <td className="border p-2">{pago.id}</td>
                  <td className="border p-2">{pago.id_usuario}</td>
                  <td className="border p-2">{pago.id_cajero}</td>
                  <td className="border p-2">{pago.id_tipo_pago}</td>
                  <td className="border p-2">
                    {pago.fecha_pago?.split("T")[0]}
                  </td>
                  <td className="border p-2">{pago.total}</td>
                  <td className="border p-2">{pago.observaciones}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => openEditModal(pago)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(pago.id)}
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
              {editId ? "Editar Pago" : "Nuevo Pago"}
            </h3>

            <div className="flex flex-col gap-3">
              <label className="flex flex-col">
                <span>Usuario ID:</span>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={form.id_usuario ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, id_usuario: Number(e.target.value) })
                  }
                />
              </label>

              <label className="flex flex-col">
                <span>Cajero ID:</span>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={form.id_cajero ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, id_cajero: Number(e.target.value) })
                  }
                />
              </label>

              <label className="flex flex-col">
                <span>Tipo Pago ID:</span>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={form.id_tipo_pago ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, id_tipo_pago: Number(e.target.value) })
                  }
                />
              </label>

              <label className="flex flex-col">
                <span>Fecha Pago:</span>
                <input
                  type="date"
                  className="border p-2 rounded"
                  value={form.fecha_pago}
                  onChange={(e) =>
                    setForm({ ...form, fecha_pago: e.target.value })
                  }
                />
              </label>

              <label className="flex flex-col">
                <span>Total:</span>
                <input
                  type="number"
                  step="0.01"
                  className="border p-2 rounded"
                  value={form.total}
                  onChange={(e) =>
                    setForm({ ...form, total: Number(e.target.value) })
                  }
                />
              </label>

              <label className="flex flex-col">
                <span>Observaciones:</span>
                <input
                  className="border p-2 rounded"
                  value={form.observaciones ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, observaciones: e.target.value })
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
