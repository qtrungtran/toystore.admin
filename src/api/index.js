import authAPI from "./auth";
import categoryAPI from "./category";
import userAPI from "./user";

const API = {
  auth: authAPI,
  user: userAPI,
  category: categoryAPI,
};

export default API;
