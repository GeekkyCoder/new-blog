// src/components/Register.tsx
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { register } from "../../redux/slices/auth/authReducer";
import { RegisterUser } from "../../types/user-types";
import { registerUser, selectError, selectLoading, selectUser } from "../../redux/slices/auth/authReducer";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();

  const {registerLoading} = useAppSelector(selectLoading)
  const {registerError} = useAppSelector(selectError)


  const handleRegister = () => {
    const user: RegisterUser = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    dispatch(registerUser(user));
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        name="firstName"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="first name"
      />
      <input
        name="lastName"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="last name"
      />
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
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="confirm passsword"
      />
      <button onClick={handleRegister} disabled={registerLoading}>{registerLoading ? "laoding" : "register"}</button>
      <h2>{JSON.stringify(registerError)}</h2>
    </div>
  );
};

export default Register;
