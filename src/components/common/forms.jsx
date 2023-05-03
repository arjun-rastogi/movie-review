import React, { useState } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

const Form = ({ data: initialData, schema, onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const propSchema = schema[name];
    if (!propSchema) return null;
    const { error } = Joi.validate(obj, { [name]: propSchema });
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    onSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const errorMessage = validateProperty(input);
    const newErrors = { ...errors };
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];

    setData({ ...data, [input.name]: input.value });
    setErrors(newErrors);
  };

  const renderButton = (label) => {
    return (
      <button disabled={validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  const renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  const renderInput = (name, label, type = "text") => {
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={handleChange}
        error={errors[name]}
      />
    );
  };

  return {
    data,
    errors,
    renderButton,
    renderSelect,
    renderInput,
    handleSubmit,
  };
};

export default Form;
