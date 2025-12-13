import { useState } from "react";
import { useCreateExtorno } from "@/features/api.hooks";

type ExtornoForm = {
  id_recibo: number | "";
  motivo: string;
};

export default function ExtornosPage() {
  const createExtorno = useCreateExtorno();

  const [form, setForm] = useState<ExtornoForm>({
    id_recibo: "",
    motivo: "",
  });

  const canSubmit =
    form.id_recibo !== "" &&
    form.motivo.trim().length >= 5 &&
    !createExtorno.isPending;

  const submit = () => {
    if (!canSubmit) return;

    createExtorno.mutate(
      {
        id_recibo: Number(form.id_recibo),
        motivo: form.motivo.trim(),
      },
      {
        onSuccess: () => {
          setForm({ id_recibo: "", motivo: "" });
        },
        onError: (err) => {
          console.error("Error creando extorno:", err);
        },
      }
    );
  };

  return (
    <div className="p-6 max-w-md space-y-4">
      <h1 className="text-2xl font-bold text-red-700">Extornos</h1>

      {/* ID RECIBO */}
      <input
        type="number"
        className="border p-2 w-full rounded"
        placeholder="ID del recibo"
        value={form.id_recibo}
        onChange={(e) =>
          setForm({
            ...form,
            id_recibo: e.target.value ? Number(e.target.value) : "",
          })
        }
      />

      {/* MOTIVO */}
      <textarea
        className="border p-2 w-full rounded"
        placeholder="Motivo del extorno (mín. 5 caracteres)"
        rows={3}
        value={form.motivo}
        onChange={(e) => setForm({ ...form, motivo: e.target.value })}
      />

      {/* ACTION */}
      <button
        onClick={submit}
        disabled={!canSubmit}
        className={`w-full px-4 py-2 rounded text-white
          ${
            canSubmit
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
      >
        {createExtorno.isPending ? "Procesando..." : "Extornar"}
      </button>

      {/* FEEDBACK */}
      {createExtorno.isError && (
        <p className="text-sm text-red-600">
          Error al crear el extorno. Revisa la consola.
        </p>
      )}

      {createExtorno.isSuccess && (
        <p className="text-sm text-green-600">Extorno creado correctamente.</p>
      )}
    </div>
  );
}
