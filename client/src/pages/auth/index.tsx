// src/components/Auth.tsx
import React, { useState } from 'react';
import Login from './login';
import Register from './register';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {isLogin ? <Login /> : <Register />}
      <button onClick={toggleForm}>
        {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default Auth;
