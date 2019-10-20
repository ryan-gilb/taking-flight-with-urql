import React, { useState } from 'react';

const AuthForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModeSignin, setIsModeSignin] = useState(true);

  // stub
  const signIn = () => new Promise(() => {});
  // stub
  const signUp = () => new Promise(() => {});

  const handleFormSubmit = e => {
    e.preventDefault();

    const authFn = isModeSignin ? signIn : signUp;
    authFn({ username, password }).then(response => {
      if (response.error) {
        alert(response.error);
        return response.error;
      }
      const key = isModeSignin ? 'signin' : 'signup';
      const { token } = response.data[key];
      onSubmit(token);
    });
  };

  return (
    <form className="AuthForm" onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Beep Boop"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>
      <button
        type="button"
        className="AuthForm-ModeButton"
        onClick={() => setIsModeSignin(prev => !prev)}
      >
        {isModeSignin
          ? "Don't have an account? Sign Up instead!"
          : 'Already have an account? Sign In instead!'}
      </button>
      <button type="submit" className="AuthForm-SubmitButton">
        {isModeSignin ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default AuthForm;
