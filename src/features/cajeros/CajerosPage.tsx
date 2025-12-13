import { useEffect, useState } from "react";

type Cajero = {
  id: number;
  nombres: string;
  apellidos: string;
  dni: string;
  cod_acceso: string;
  numeracion_inicial_recibo: number;
  numeracion_actual_recibo: number;
  estado?: string;
};

export default function CajerosPage() {
  const [cajeros, setCajeros] = useState<Cajero[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal & form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Cajero, "id">>({
    nombres: "",
    apellidos: "",
    dni: "",
    cod_acceso: "",
    numeracion_inicial_recibo: 1,
    numeracion_actual_recibo: 1,
    estado: "ACTIVO",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all cajeros
  const fetchCajeros = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/cajeros`);
      const data = await res.json();
      setCajeros(data);
    } catch (err) {
      console.error("Error fetching cajeros:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCajeros();
  }, []);

  // Open modal for creating
  const openCreateModal = () => {
    setEditId(null);
    setForm({
      nombres: "",
      apellidos: "",
      dni: "",
      cod_acceso: "",
      numeracion_inicial_recibo: 1,
      numeracion_actual_recibo: 1,
      estado: "ACTIVO",
    });
    setModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (cajero: Cajero) => {
    setEditId(cajero.id);
    setForm({
      nombres: cajero.nombres,
      apellidos: cajero.apellidos,
      dni: cajero.dni,
      cod_acceso: cajero.cod_acceso,
      numeracion_inicial_recibo: cajero.numeracion_inicial_recibo,
      numeracion_actual_recibo: cajero.numeracion_actual_recibo,
      estado: cajero.estado ?? "ACTIVO",
    });
    setModalOpen(true);
  };

  // Create or update
  const handleSubmit = async () => {
    const payload: Omit<Cajero, "id"> = { ...form };

    try {
      const url = editId
        ? `${API_URL}/cajeros/${editId}`
        : `${API_URL}/cajeros`;
      const method = editId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setModalOpen(false);
      fetchCajeros();
    } catch (err) {
      console.error("Error saving cajero:", err);
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este cajero?")) return;
    try {
      await fetch(`${API_URL}/cajeros/${id}`, { method: "DELETE" });
      fetchCajeros();
    } catch (err) {
      console.error("Error deleting cajero:", err);
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Cajeros</h2>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nuevo Cajero
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombres</th>
              <th className="border p-2">Apellidos</th>
              <th className="border p-2">DNI</th>
              <th className="border p-2">Cod Acceso</th>
              <th className="border p-2">Num Inicial Recibo</th>
              <th className="border p-2">Num Actual Recibo</th>
              <th className="border p-2">Estado</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cajeros.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-4 text-center text-gray-500">
                  No hay cajeros registrados
                </td>
              </tr>
            ) : (
              cajeros.map((cajero) => (
                <tr key={cajero.id}>
                  <td className="border p-2">{cajero.id}</td>
                  <td className="border p-2">{cajero.nombres}</td>
                  <td className="border p-2">{cajero.apellidos}</td>
                  <td className="border p-2">{cajero.dni}</td>
                  <td className="border p-2">{cajero.cod_acceso}</td>
                  <td className="border p-2">
                    {cajero.numeracion_inicial_recibo}
                  </td>
                  <td className="border p-2">
                    {cajero.numeracion_actual_recibo}
                  </td>
                  <td className="border p-2">{cajero.estado}</td>
                  <td className="border p-2 flex gap-2">
                    <button
                      onClick={() => openEditModal(cajero)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cajero.id)}
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Editar Cajero" : "Nuevo Cajero"}
            </h3>

            <div className="flex flex-col gap-3">
              <label className="flex flex-col">
                <span>Nombres:</span>
                <input
                  className="border p-2 rounded"
                  value={form.nombres}
                  onChange={(e) =>
                    setForm({ ...form, nombres: e.target.value })
                  }
                />
              </label>

              <label className="flex flex-col">
                <span>Apellidos:</span>
                <input
                  className="border p-2 rounded"
                  value={form.apellidos}
                  onChange={(e) =>
                    setForm({ ...form, apellidos: e.target.value })
                  }
                />
              </label>

              <label className="flex flex-col">
                <span>DNI:</span>
                <input
                  className="border p-2 rounded"
                  value={form.dni}
                  onChange={(e) => setForm({ ...form, dni: e.target.value })}
                />
              </label>

              <label className="flex flex-col">
                <span>Cod Acceso:</span>
                <input
                  className="border p-2 rounded"
                  value={form.cod_acceso}
                  onChange={(e) =>
                    setForm({ ...form, cod_acceso: e.target.value })
                  }
                />
              </label>

              <label className="flex flex-col">
                <span>Numeracion Inicial Recibo:</span>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={form.numeracion_inicial_recibo}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      numeracion_inicial_recibo: Number(e.target.value),
                    })
                  }
                />
              </label>

              <label className="flex flex-col">
                <span>Numeracion Actual Recibo:</span>
                <input
                  type="number"
                  className="border p-2 rounded"
                  value={form.numeracion_actual_recibo}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      numeracion_actual_recibo: Number(e.target.value),
                    })
                  }
                />
              </label>

              <label className="flex flex-col">
                <span>Estado:</span>
                <select
                  className="border p-2 rounded"
                  value={form.estado}
                  onChange={(e) => setForm({ ...form, estado: e.target.value })}
                >
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="INACTIVO">INACTIVO</option>
                </select>
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
