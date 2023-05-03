import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/forms";
import Input from "./common/input";

const LoginForm = () => {
  const initialData = { username: "", password: "" };

  const doSubmit = () => {
    // Call the server
    console.log("Submitted");
  };

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const { data, errors, renderInput, renderButton, handleSubmit } = Form({
    data: initialData,
    schema,
    onSubmit: doSubmit,
  });

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("username", "Username")}
        {renderInput("password", "Password", "password")}
        {renderButton("Login")}
      </form>
    </div>
  );
};

export default LoginForm;
