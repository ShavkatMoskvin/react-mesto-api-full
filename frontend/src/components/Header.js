import React from "react";
import { useLocation } from 'react-router';
import { Link, useHistory, Route, Switch } from 'react-router-dom';

function Header(props) {
  const location = useLocation()
  const history = useHistory()

  function logout() {
    props.logoutProfile()
    history.push('/sign-in');
  }

  return (
    <header className="header">
      <div className="header__logo" />
      <div className="header__links">
        <p className="header__link">
          {location.pathname === "/" ? props.userEmail : ""}
        </p>
        
        <Switch>
          <Route path="/sign-up">
            <Link className='header__title' to="/sign-in">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link className='header__title' to="/sign-up">
              Регистрация
            </Link>
          </Route>
          <Route exact path='/'>
            <Link onClick={logout} className='header__title' to='/signin'>
              Выйти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>

  );
}

export default Header;
