import { api } from "./client";
import { endpoints } from "./endpoints";

export const ExtornosAPI = {
  create(data: any) {
    return api(endpoints.extornos.create, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
