import { api } from "./client";
import { endpoints } from "./endpoints";

export const PagosAPI = {
  create(data: any) {
    return api(endpoints.pagos.create, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
