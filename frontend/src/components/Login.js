import React from "react";
import { useHistory } from 'react-router-dom';

function Login({login}){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory()
  
    function handleEmailChange(evt) {
      setEmail(evt.target.value);
    }
  
    function handlePasswordChange(evt) {
      setPassword(evt.target.value);
    }
  
    function handleSubmit(evt) {
      evt.preventDefault();
      console.log(history)
      history.push('');
      login(email, password);
    }
  
    return (
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="login-form__title">Вход</h3>
        <input value={email} className="login-form__input login-form__input_login-email" placeholder="Email" 
          type="email" onChange={handleEmailChange} required />
        <input value={password} className="login-form__input login-form__input_login-password" placeholder="Пароль" 
          type="current-password" onChange={handlePasswordChange} required />
        <button className="login-form__button" type="submit">Войти</button>
      </form>
    )
}

export default Login