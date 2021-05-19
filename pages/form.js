import React, { useState } from 'react';
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { Header, GuestRoute, MyTextField, MyCustomButton } from "../common";

const useStyles = makeStyles((theme) => ({
 
  textField: {
    width: "70%",
  },
  google: {
    backgroundColor: "#F0385E",
  },
  facebook: {
    backgroundColor: "#37B9F0",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [username, setUserName]= useState('');
  const [password, setPassword]= useState('');
  const [error, setError]= useState('');
  const [submit, setSubmit] = useState(false)


  const onChange =(event) =>{
      setUserName(event.target.value);
      setSubmit(false);
  }


  const handleChange =(event) =>{
    setPassword(event.target.value);
    setSubmit(false) 
 };

 const validate = () => {
     if ( username.length<3) {
         setError('username is too short');
         return 
     };
     if (password.length<3) {
         setError('password is too short');
         return
     };
     return true
 }

const onSubmit = (event) => { 
     event.preventDefault();
     if (validate()) {
         setError('');
        setSubmit(true)
     }
}; 


    
   return (
     
    <>
      <Header route="signin" />
      <GuestRoute
        title="Sign up"
        greeting="Welcome Back"
        action="Sign up to continue"
      >
          <form >
              <div className="form-group">
          <label>Username</label><br/>
       <input 
       type="text"
       name="name"
       placeholder="username"
       value={username}
       onChange={onChange}
       />
       </div><br/>
       <div className="form-group">
       <label>Password</label><br/>
         <input 
       type="password"
       name="name"
       placeholder="password"
       value={password}
       onChange={handleChange}
       />
       </div>
       <button onClick={onSubmit} className="success" type="submit">Submit</button>
       </form><br/>
       <p>{error}</p>
       {submit && <div className='users'>
        <h2>users: {username} </h2>
        <hr/>
        <h2>password: {password} </h2>
      </div>}
      </GuestRoute>
      
    </>
  );
}

