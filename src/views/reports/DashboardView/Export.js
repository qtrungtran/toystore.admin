import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import statisticsAPI from "api/statistics";

const Export = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const exportExcel = async () => {
    try {
      await statisticsAPI.export();
    } catch (error) {
      console.log("Failed to export data: ", error);
    }
  };

  React.useEffect(() => {
    // dispatch(authActions.logout());
    // history.push(routes.home.path);
    exportExcel();
  });
  return null;
};

export default Export;
