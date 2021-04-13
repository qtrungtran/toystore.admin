import apiClient from "./apiClient";

const orderAPI = {
  getAll: () => {
    const url = "/orders";
    return apiClient.get(url);
  },
  getPerPage: (options = {}) => {
    const url = "/orders/pagination";
    return apiClient.get(url, options);
  },
  get: (id) => {
    const url = `/orders/${id}`;
    return apiClient.get(url);
  },
  //   add: ({categoryId, name, description, quantity, price}) => {
  //     const url = `/orders`;
  //     return apiClient.post(url, {
  //       categoryId,
  // 			name,
  // 			description,
  // 			quantity,
  // 			price
  //     });
  //   },
  //   edit: ({categoryId, name, description, quantity, price}, id) => {
  //     const url = `/orders/${id}`;
  //     return apiClient.put(url, {
  //       categoryId,
  // 			name,
  // 			description,
  // 			quantity,
  // 			price
  //     });
  //   },
  editStatus: ({ statusId }, id) => {
    const url = `/orders/${id}/status`;
    return apiClient.put(url, {
      statusId,
    });
  },
  delete: (id) => {
    const url = `/orders/delete/${id}`;
    return apiClient.put(url);
  },
};

export default orderAPI;
