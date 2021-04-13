import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
