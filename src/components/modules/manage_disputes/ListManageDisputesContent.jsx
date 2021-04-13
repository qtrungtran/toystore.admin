import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const ListManageDisputesContent = () => {
  const history = useHistory();

  const listManageDisputes = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <List component="nav">
      {listManageDisputes.map((item) => (
        <ListItem
          key={item.id}
          button
          onClick={() => {
            history.push({
              pathname: "/manage-dispute",
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

export default ListManageDisputesContent;
