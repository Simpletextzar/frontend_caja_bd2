import { api } from "./client";
import { endpoints } from "./endpoints";

export const ContribuyentesAPI = {
  list() {
    return api(endpoints.contribuyentes.list);
  },
  create(data: any) {
    return api(endpoints.contribuyentes.create, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  update(id: string | number, data: any) {
    return api(endpoints.contribuyentes.update(id), {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  delete(id: string | number) {
    return api(endpoints.contribuyentes.delete(id), {
      method: "DELETE",
    });
  },
};
