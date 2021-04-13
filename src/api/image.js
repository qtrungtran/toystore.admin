import apiClient from "./apiClient";

const imageAPI = {
  uploadProductImage: (image, id) => {
    const url = `/images/${id}`;
    return apiClient.post(url, image);
  },
};

export default imageAPI;
