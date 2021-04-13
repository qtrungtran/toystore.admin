import apiClient from "./apiClient";

const statisticsAPI = {
  getAll: () => {
    const url = "/statistics";
    return apiClient.get(url);
  },
  export: () => {
    const url = "/statistics/export";
    return apiClient.get(url);
  },
};

export default statisticsAPI;
