import { api } from "./client";
import { endpoints } from "./endpoints";

export const ConceptosPagoAPI = {
  list() {
    return api(endpoints.conceptoPago.list);
  },
  create(data: any) {
    return api(endpoints.conceptoPago.create, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(id: string | number, data: any) {
    return api(endpoints.conceptoPago.update(id), {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete(id: string | number) {
    return api(endpoints.conceptoPago.delete(id), {
      method: "DELETE",
    });
  },
};
