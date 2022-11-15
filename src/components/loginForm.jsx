import React, {useState} from 'react'
import Input from './common/input';

const LoginForm = () => {

  const data = {
    username: '',
    password: '',
  };

  const errorMessage = {

  }

  const [account, setAccount] = useState(data);
  const [errors, setErrors] = useState(errorMessage);

  const validateProperty = ({name, value}) => {
    if(name === 'usermame') {
      if(value.trim() === '') return "Username is required";
    }
    if(name === 'password') {
      if(value.trim() === '') return "Password is required";
    }
  }

  const handleChange= ({ currentTarget : input}) => {

    const errors = {...errors};
    const errorMessage = validateProperty(input);
    if(errorMessage) errors[input.name]= errorMessage;
    else delete errors[input.name];
		const accounts = {...account};

    accounts[input.name] = input.value;
    setAccount(accounts);
    setErrors(errors);
	}

  const validate = () => {
    const errors = {};
    if(account.username.trim() === '') 
    errors.username = 'Username is required';
    if(account.password.trim() === '') 
    errors.password = 'Password is required';

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    console.log(errors);
    setErrors(errors || {});
    if (errors) return;
    console.log("Submitted data");
  };  


  const { username, password} = account;

  return (
    <>
    <div>
        <h1>Login</h1>
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
            <div style={{margin: "14px 0px 0px"}}>
            <button className="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
    </>
  )
}

export default LoginForm