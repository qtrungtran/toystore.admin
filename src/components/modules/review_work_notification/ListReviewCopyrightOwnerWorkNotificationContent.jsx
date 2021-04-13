import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const ListReviewCopyrightOwnerWorkNotificationContent = (props) => {
  const history = useHistory();

  const listReviewCopyrightOwnerWorkNotification = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];

  return (
    <List component="nav">
      {listReviewCopyrightOwnerWorkNotification.map((item) => (
        <ListItem
          key={item.id}
          button
          onClick={() => {
            history.push({
              pathname: "/review-work-notification/copyrightowner",
              search: "?id=" + item.id,
            });
          }}
        >
          <ListItemText primary="List item" />
        </ListItem>
      ))}
    </List>
  );
};

export default ListReviewCopyrightOwnerWorkNotificationContent;
