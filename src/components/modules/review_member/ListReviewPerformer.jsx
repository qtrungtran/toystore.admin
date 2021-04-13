import React from "react";
// import * as Yup from "yup";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useHistory } from "react-router-dom";

const initialValues = {
    listDetails: [
        {
            id: "1",
            name: "John",
            create_at: Date.now(),
        },
        {
            id: "2",
            name: "William",
            create_at: Date.now(),
        },
        {
            id: "3",
            name: "Thomad",
            create_at: Date.now(),
        },
        {
            id: "4",
            name: "Chesi",
            create_at: Date.now(),
        },
        {
            id: "5",
            name: "Sena",
            create_at: Date.now(),
        },
        {
            id: "6",
            name: "Magna",
            create_at: Date.now(),
        },
    ]
};

const ListReviewPerformer = () => {
  const { listDetails } = initialValues;
  const history = useHistory();

  return (
    <Container maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Typography color="textPrimary" variant="h2">
            List Review Performer Member
        </Typography>
        <List>
            {listDetails.map(({create_at, name, id}) => {
                return (
                    <ListItem
                        key={id} 
                        button
                        onClick={() => history.push({
                            pathname: "/review-member/performer/",
                            search: `?id=${id}&name=${name}`
                        })}
                    >
                        <ListItemText primary={name} secondary={create_at}/>
                    </ListItem>
                );
            })}
        </List>
      </MuiPickersUtilsProvider>
    </Container>
  );
};

export default ListReviewPerformer;
