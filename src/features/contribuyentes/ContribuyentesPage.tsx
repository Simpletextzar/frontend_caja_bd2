import { useEffect, useState } from "react";

type Contribuyente = {
  id: number;
  estado: string;
  dni?: string;
  ruc?: string;
  otro_documento_identidad?: string;
  nro_documento_identidad?: string;
  nombre: string;
  tipo_persona: string;
  genero?: string;
  fecha_nacimiento?: string;
  domicilio_fiscal?: string;
  referencia_domicilio_fiscal?: string;
  telefono_fijo?: string;
  telefono_celular?: string;
  celular_whatsapp?: string;
  email?: string;
  observaciones?: string;
};

export default function ContribuyentesPage() {
  const [contribuyentes, setContribuyentes] = useState<Contribuyente[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal & form state
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Contribuyente, "id">>({
    estado: "ACTIVO",
    dni: "",
    ruc: "",
    otro_documento_identidad: "",
    nro_documento_identidad: "",
    nombre: "",
    tipo_persona: "NATURAL",
    genero: "",
    fecha_nacimiento: "",
    domicilio_fiscal: "",
    referencia_domicilio_fiscal: "",
    telefono_fijo: "",
    telefono_celular: "",
    celular_whatsapp: "",
    email: "",
    observaciones: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch all contribuyentes
  const fetchContribuyentes = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/contribuyentes`);
      const data = await res.json();
      setContribuyentes(data);
    } catch (err) {
      console.error("Error fetching contribuyentes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContribuyentes();
  }, []);

  // Open modal for creating
  const openCreateModal = () => {
    setEditId(null);
    setForm({
      estado: "ACTIVO",
      dni: "",
      ruc: "",
      otro_documento_identidad: "",
      nro_documento_identidad: "",
      nombre: "",
      tipo_persona: "NATURAL",
      genero: "",
      fecha_nacimiento: "",
      domicilio_fiscal: "",
      referencia_domicilio_fiscal: "",
      telefono_fijo: "",
      telefono_celular: "",
      celular_whatsapp: "",
      email: "",
      observaciones: "",
    });
    setModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (c: Contribuyente) => {
    setEditId(c.id);
    setForm({ ...c });
    setModalOpen(true);
  };

  // Create or update
  const handleSubmit = async () => {
    const payload: Omit<Contribuyente, "id"> = { ...form };

    try {
      const url = editId
        ? `${API_URL}/contribuyentes/${editId}`
        : `${API_URL}/contribuyentes`;
      const method = editId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setModalOpen(false);
      fetchContribuyentes();
    } catch (err) {
      console.error("Error saving contribuyente:", err);
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este contribuyente?")) return;
    try {
      await fetch(`${API_URL}/contribuyentes/${id}`, { method: "DELETE" });
      fetchContribuyentes();
    } catch (err) {
      console.error("Error deleting contribuyente:", err);
    }
  };

  if (loading) return <p className="p-4">Cargando...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Contribuyentes</h2>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Nuevo Contribuyente
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Tipo Persona</th>
              <th className="border p-2">DNI</th>
              <th className="border p-2">RUC</th>
              <th className="border p-2">Estado</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contribuyentes.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No hay contribuyentes registrados
                </td>
              </tr>
            ) : (
              contribuyentes.map((c) => (
                <tr key={c.id}>
                  <td className="border p-2">{c.id}</td>
                  <td className="border p-2">{c.nombre}</td>
                  <td className="border p-2">{c.tipo_persona}</td>
                  <td className="border p-2">{c.dni}</td>
                  <td className="border p-2">{c.ruc}</td>
                  <td className="border p-2">{c.estado}</td>
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg overflow-y-auto max-h-[90vh]">
            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Editar Contribuyente" : "Nuevo Contribuyente"}
            </h3>

            <div className="flex flex-col gap-3">
              <label className="flex flex-col">
                <span>Nombre:</span>
                <input
                  className="border p-2 rounded"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
              </label>

              <label className="flex flex-col">
                <span>Tipo Persona:</span>
                <select
                  className="border p-2 rounded"
                  value={form.tipo_persona}
                  onChange={(e) =>
                    setForm({ ...form, tipo_persona: e.target.value })
                  }
                >
                  <option value="NATURAL">NATURAL</option>
                  <option value="JURIDICA">JURIDICA</option>
                </select>
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
                <span>RUC:</span>
                <input
                  className="border p-2 rounded"
                  value={form.ruc}
                  onChange={(e) => setForm({ ...form, ruc: e.target.value })}
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
