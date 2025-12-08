import { api } from "./client";
import { endpoints } from "./endpoints";

export const CajerosAPI = {
  list() {
    return api(endpoints.cajeros.list);
  },
  create(data: any) {
    return api(endpoints.cajeros.create, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(id: string | number, data: any) {
    return api(endpoints.cajeros.update(id), {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete(id: string | number) {
    return api(endpoints.cajeros.delete(id), {
      method: "DELETE",
    });
  },
};
