import apiClient from "./apiClient";

// const url = "/user_registration";

const signup = ({ email, username, password1, password2 }) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("username", username);
  formData.append("password1", password1);
  formData.append("password2", password2);
  return apiClient.post(`/users/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const signin = ({ username, password }) => {
  return apiClient.post(`/auth/admin/login/`, { username, password });
};

const getAllUsers = () => {
  return apiClient.get(`/users/`);
};

// const activate = (key) => {
//   return apiClient.get(`${url}/activation/`, { params: { key } });
// };

// const changePassword = ({ old_password, new_password1, new_password2 }) => {
//   return apiClient.put(`${url}/password-change/`, {
//     old_password,
//     new_password1,
//     new_password2,
//   });
// };

// const resetPassword = ({ email }) => {
//   return apiClient.post(`${url}/password-reset/`, { email });
// };

// const confirmResetPassword = ({ activation_key, password1, password2 }) => {
//   return apiClient.post(`${url}/password-reset/confirm/`, {
//     activation_key,
//     password1,
//     password2,
//   });
// };

const authAPI = {
  signup,
  signin,
  // activate,
  // changePassword,
  // resetPassword,
  // confirmResetPassword,
};

export default authAPI;
