import { api } from "./client";
import { endpoints } from "./endpoints";

export const RecibosAPI = {
  list() {
    return api(endpoints.recibos.list);
  },
  byId(id: string | number) {
    return api(endpoints.recibos.byId(id));
  },
};
