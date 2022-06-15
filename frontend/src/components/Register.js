import React from 'react';
import { Link } from 'react-router-dom';

function Register({register}){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
  
    function handleEmailChange(evt) {
      setEmail(evt.target.value);
    }
  
    function handlePasswordChange(evt) {
      setPassword(evt.target.value);
    }
  
    function handleSubmit(evt) {
      console.log(evt, email , password)
      evt.preventDefault();
      register(email, password);
    }
  
    return(
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="login-form__title">Регистрация</h3>
        <input value={email} className="login-form__input login-form__input_login-email" placeholder="Email" 
          type="email" onChange={handleEmailChange} required />
        <input value={password} className="login-form__input login-form__input_login-pass" placeholder="Пароль" 
          type="password" onChange={handlePasswordChange} required/>
        <button className="login-form__button" type="submit">Зарегистрироваться</button>
        <div className="login-form__text">
          Уже зарегистрированы? 
          <Link to="/sign-in" className="login-form__link">Войти</Link>
        </div>
      </form>
    )
}

export default Register