import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";

// ----------------------------
// TYPES
// ----------------------------
export type Cajero = {
  id: number;
  nombres: string;
  apellidos: string;
  dni: string;
  estado?: string;
};

// ----------------------------
// CAJEROS (CRUD)
// ----------------------------
export function useCajeros() {
  return useQuery<Cajero[]>({
    queryKey: ["cajeros"],
    queryFn: () => api(endpoints.cajeros.list()),
  });
}

export function useCreateCajero() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: Omit<Cajero, "id">) =>
      api(endpoints.cajeros.create(), {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cajeros"] }),
  });
}

export function useUpdateCajero() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: Omit<Cajero, "id"> }) =>
      api(endpoints.cajeros.update(id), {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cajeros"] }),
  });
}

export function useDeleteCajero() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      api(endpoints.cajeros.delete(id), { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cajeros"] }),
  });
}

// ----------------------------
// PAGOS (CREATE)
// ----------------------------
export function useCreatePago() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: any) =>
      api(endpoints.pagos.create(), {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pagos"] }),
  });
}

//
// ============================
//      RECIBOS (VIEW)
// ============================
//
export function useRecibos() {
  return useQuery({
    queryKey: ["recibos"],
    queryFn: () => api(endpoints.recibos.list()),
  });
}

export function useRecibo(id: number) {
  return useQuery({
    queryKey: ["recibos", id],
    queryFn: () => api(endpoints.recibos.byId(id)),
    enabled: !!id,
  });
}

//
// ============================
//      EXTORNOS (CREATE)
// ============================
//
export function useCreateExtorno() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (body: {
      id_pago?: number;
      id_recibo?: number;
      id_cajero?: number;
      motivo: string;
    }) =>
      api(endpoints.extornos.create(), {
        method: "POST",
        body: JSON.stringify(body),
      }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["recibos"] });
      qc.invalidateQueries({ queryKey: ["extornos"] });
    },
  });
}

// ----------------------------
// CONTRIBUYENTES (CRUD)
// ----------------------------
export function useContribuyentes() {
  return useQuery({
    queryKey: ["contribuyentes"],
    queryFn: () => api(endpoints.contribuyentes.list()),
  });
}

export function useContribuyente(id: string | number) {
  return useQuery({
    queryKey: ["contribuyentes", id],
    queryFn: () => api(endpoints.contribuyentes.byId(id)),
    enabled: !!id,
  });
}

export function useCreateContribuyente() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: any) =>
      api(endpoints.contribuyentes.create(), {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contribuyentes"] }),
  });
}

export function useUpdateContribuyente(id: string | number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: any) =>
      api(endpoints.contribuyentes.update(id), {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contribuyentes"] }),
  });
}

export function useDeleteContribuyente(id: string | number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () =>
      api(endpoints.contribuyentes.delete(id), { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contribuyentes"] }),
  });
}

// ----------------------------
// CONCEPTO PAGO (CRUD)
// ----------------------------
export function useConceptosPago() {
  return useQuery({
    queryKey: ["conceptoPago"],
    queryFn: () => api(endpoints.conceptoPago.list()),
  });
}

export function useConceptoPago(id: string | number) {
  return useQuery({
    queryKey: ["conceptoPago", id],
    queryFn: () => api(endpoints.conceptoPago.byId(id)),
    enabled: !!id,
  });
}

export function useCreateConceptoPago() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: any) =>
      api(endpoints.conceptoPago.create(), {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["conceptoPago"] }),
  });
}

export function useUpdateConceptoPago(id: string | number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: any) =>
      api(endpoints.conceptoPago.update(id), {
        method: "PUT",
        body: JSON.stringify(body),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["conceptoPago"] }),
  });
}

export function useDeleteConceptoPago(id: string | number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () =>
      api(endpoints.conceptoPago.delete(id), { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["conceptoPago"] }),
  });
}
