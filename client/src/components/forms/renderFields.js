import _ from "lodash";
import React from "react";
import { Field } from "redux-form";
import FormField from "./Field";

export default (formFields) => {
  return _.map(formFields, ({ label, name, type, placeholder, required }) => {
    return (
        <Field
          className="form-group"
          key={name}
          component={FormField}
          type={type}
          label={label}
          name={name}
          placeholder={placeholder}
          required={required}
        />
    );
  });
};
