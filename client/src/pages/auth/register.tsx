// src/components/Register.tsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { registerUser } from "../../store/auth/authReducer";
import { RootState, useAppDispatch } from "../../store/store";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleRegister = () => {
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
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
      <button onClick={handleRegister} disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
