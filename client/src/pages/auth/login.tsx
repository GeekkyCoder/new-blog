// src/components/Login.tsx
import React, { useState } from "react";
import {  loginUser, selectUser } from "../../redux/slices/auth/authReducer";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";

type LoginUser = {
   email:string;
   password:string
};


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUser);

  const handleLogin = () => {

    const user:LoginUser = {
         email,
         password
    }

    dispatch(loginUser(user));
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>login</button>
      {JSON.stringify(userData)}
    </div>
  );
};

export default Login;
