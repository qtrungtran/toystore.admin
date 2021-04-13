import React from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";

const CheckboxInput = ({ field = {}, form = {}, ...props }) => {
  const { id, label, ...restProps } = props;
  return (
    <FormControlLabel
      label={label}
      control={<Checkbox {...field} {...restProps} />}
    />
  );
};

export default CheckboxInput;
