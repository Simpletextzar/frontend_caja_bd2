import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/api/client";
import { endpoints } from "@/shared/api/endpoints";

export function useCajeros() {
  return useQuery({
    queryKey: ["cajeros"],
    queryFn: () => api(endpoints.cajeros.list),
  });
}

export function useCreateCajero() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: any) =>
      api(endpoints.cajeros.create, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cajeros"] }),
  });
}

export function useUpdateCajero() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: any) =>
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
    mutationFn: (id: number | string) =>
      api(endpoints.cajeros.delete(id), { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cajeros"] }),
  });
}
