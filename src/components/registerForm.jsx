import React, {useState} from 'react'
import Joi from 'joi-browser';
import Input from './common/input';

const RegisterForm = () => {

  
  const [account, setAccount] = useState({
    username: "", password: "", name: ""
   });

  const [errors, setErrors] = useState({});

  const schema = {
    username : Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name : Joi.string().required().label("Name"),

  }

  const validate = () => {
   const options = { abortEarly: false };
   const { error } = Joi.validate(account, schema, options);
   if(!error) return null;

   const errors = {};
   for (let item of error.details) errors[item.path[0]] = item.message;
   return errors;
  };  

  const validateProperty = ({name, value}) => {
    const obj = { [name] : value};
    const schemas = { [name] : schema[name]};
    const {error} = Joi.validate(obj, schemas);
    return error ? error.details[0].message :  null;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    console.log(errors);
    setErrors(errors || {});
    if (errors) return;
    console.log("Submitted data");
  };  

  const handleChange= ({ currentTarget : input}) => {

    const error = {...errors};
    const errorMessage = validateProperty(input);
    if(errorMessage) error[input.name]= errorMessage;
    else delete error[input.name];

    const accounts = {...account};
    accounts[input.name] = input.value;
    setAccount(accounts);
    setErrors(error);
	};



  const { username, password, name} = account;

  return (
    <>
    <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <Input 
            name="username"
            label="Username"
            value={username}
            error={errors.username}
            onChange={handleChange} 
            />
            <Input 
            name="password"
            label="Password"
            value={password}
            error={errors.password}
            onChange={handleChange} 
            />
            <Input 
            name="name"
            label="Name"
            value={name}
            error={errors.name}
            onChange={handleChange} 
            />
            <div style={{margin: "14px 0px 0px"}}>
            <button
            disabled={validate()} 
            className="btn btn-primary">
              Register
            </button>
            </div>
        </form>
    </div>
    </>
  )
}

export default RegisterForm