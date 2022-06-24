import { BrowserRouter, Route, Redirect, Switch, useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ProtectedRoute from './ProtectedRoute';
import PopupWithForm from "./PopupWithForm";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import Footer from "./Footer";
import Header from "./Header"
import React from "react";
import Register from "./Register";
import Login from './Login';
import Main from "./Main";

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setProfilePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpened] = React.useState(false);
  const [isAddCardPopupOpen, setCardPopupOpened] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '', opened: false });
  const [status, setStatus] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    if (isLoggedIn) {
      api.getUserInfo()
        .then((user) => {
          console.log(user)
          setCurrentUser(user);
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [isLoggedIn]);

  const handleEscClick = (evt) => {
    if (evt.key === "Escape") {
      closeAllPopups()
    }
  }

  React.useEffect(() => {
    if (isLoggedIn) {
    api.getInitialData()
      .then(([userData, cards]) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [isLoggedIn])

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    if (isLiked) {
      api.dislikeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => { console.error(err); });
    } else {
      api.likeCard(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => console.log(err));
    }
  }

  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`);
      })
  }

  const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`)
      })
  }

  const handleAddCard = (data) => {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`${err}`)
      })
  }

  const handleCardClick = (card) => {
    setSelectedCard({ link: card.link, name: card.name, opened: true })
  }

  const handleEditAvatarClick = () => {
    setAvatarPopupOpened(true);
  };

  const handleEditProfileClick = () => {
    setProfilePopupOpened(true);
  };

  const handleAddCardClick = () => {
    setCardPopupOpened(true);
  };

  const closeAllPopups = () => {
    setInfoTooltip(false)
    setProfilePopupOpened(false);
    setAvatarPopupOpened(false);
    setCardPopupOpened(false);
    setSelectedCard(false);
  };

  const register = (email, password) => {
    api.register(password, email)
      .then((res) => {
        setStatus(true);
        setInfoTooltip(true);
        localStorage.setItem('jwt', res.token);
      })
      .catch((err) => {
        setStatus(false);
        setInfoTooltip(true);
        console.log(err)
      })
  }

  const login = (email, password) => {
    api.authorization(password, email)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/')
        console.log(`token: ${res.token}`)
      })
      .catch((err) => {
        setInfoTooltip(true);
        console.log(err)
      })
  }

  function checkToken() {
    const token = localStorage.getItem('jwt');
    api.validityToken(token)
      .then((res) => {
        setLoggedIn(true);
        if (res) {
          setUserEmail(res.email)
        };
        history.push('')

      })
      .catch((err) => {
        console.log(err, token);
      });
  }

  function logoutProfile() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  React.useEffect(() => {
    checkToken();
    console.log(1)
  }, [isLoggedIn, ])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        logoutProfile={logoutProfile}
        userEmail={userEmail}
      />
      <Switch>
        <ProtectedRoute
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          handleEditAvatarClick={handleEditAvatarClick}
          handleEditProfileClick={handleEditProfileClick}
          handleAddCardClick={handleAddCardClick}
          handleCardClick={handleCardClick}
          component={Main}
          loggedIn={isLoggedIn}
          exact path="/"
        />
        <ProtectedRoute
          loggedIn={isLoggedIn}
          component={Footer}
          exact path="/"
        />

        <Route path="/sign-in">
          <p><data></data></p>
          <Login
            login={login}
          />
        </Route>

        <Route path="/sign-up">
          <Register
            register={register}
          />
        </Route>

        <Route path=''>
          {isLoggedIn ? <Redirect to="/sign-up" /> : <Redirect to="/" />}
        </Route>

      </Switch>

      <ImagePopup onEscClick={handleEscClick} card={selectedCard} onClose={closeAllPopups} />

      <InfoTooltip
        status={status}
        isOpen={isInfoTooltip}
        onClose={closeAllPopups}
        onEscClick={handleEscClick}
      />
      <EditAvatarPopup
        onUpdateAvatar={handleUpdateAvatar}
        onEscClick={handleEscClick}
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      ></EditAvatarPopup>

      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        onEscClick={handleEscClick}
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      ></EditProfilePopup>

      <AddPlacePopup
        onAddCard={handleAddCard}
        onEscClick={handleEscClick}
        isOpen={isAddCardPopupOpen}
        onClose={closeAllPopups}
      ></AddPlacePopup>
    </CurrentUserContext.Provider>

  );
}

export default withRouter(App);
