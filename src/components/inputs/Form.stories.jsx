// Button.stories.js

import React from "react";
import TextInput from "./TextInput";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Button } from "@material-ui/core";

const validationSchema = yup.object().shape({
  userName: yup.string().required("User Name is required!"),
  firstName: yup.string().required("Fist Name is required!"),
  lastName: yup.string().required("Last Name is required!"),
  email: yup.string().email("Invalid Email!").required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const ValidationForm = () => {
  return (
    <Formik
      initialValues={{
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      validateOnBlur
    >
      <Form>
        <Field
          label="First Name"
          name="firstName"
          component={TextInput}
          fullWidth={true}
        />
        <Field
          label="Last Name"
          name="lastName"
          component={TextInput}
          fullWidth={true}
        />

        <Field
          label="User Name"
          name="userName"
          component={TextInput}
          fullWidth={true}
        />
        <Field
          label="Email"
          name="email"
          component={TextInput}
          fullWidth={true}
        />
        <Field
          label="Password"
          name="password"
          component={TextInput}
          fullWidth={true}
        />
        <div style={{ marginTop: "3rem" }}>
          <Button variant="contained" type="submit" >
            Submit
          </Button>
          <Button variant="contained" type="reset" >
            Reset
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

const Template = () => <ValidationForm />;

export const Simple = Template.bind({});
Simple.parameters = {
  docs: {
    source: {
      code: ` 
      import React from "react";
import TextInput from "./TextInput";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Button } from "@material-ui/core";

const validationSchema = yup.object().shape({
  userName: yup.string().required("User Name is required!"),
  firstName: yup.string().required("Fist Name is required!"),
  lastName: yup.string().required("Last Name is required!"),
  email: yup.string().email("Invalid Email!").required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const ValidationForm = () => {
  return (
    <Formik
      initialValues={{
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      validateOnBlur
    >
      <Form>
        <Field
          label="First Name"
          name="firstName"
          component={TextInput}
          fullWidth={true}
        />
        <Field
          label="Last Name"
          name="lastName"
          component={TextInput}
          fullWidth={true}
        />

        <Field
          label="User Name"
          name="userName"
          component={TextInput}
          fullWidth={true}
        />
        <Field
          label="Email"
          name="email"
          component={TextInput}
          fullWidth={true}
        />
        <Field
          label="Password"
          name="password"
          component={TextInput}
          fullWidth={true}
        />
        <div style={{ marginTop: "3rem" }}>
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
          <Button variant="contained" type="reset" fullWidth>
            Reset
          </Button>
        </div>
      </Form>
    </Formik>
  );
};   
      `,
    },
  },
};

export default {
  title: "Form",
  component: ValidationForm,
};
