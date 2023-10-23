import logo from "./Facebook_logo_PNG9.png";
import "./Styles/App.css";
import Post from "./Components/Post";
import PostsRenderer from "./Components/PostsRenderer";
import Header from "./Components/Header";
import { createContext, useEffect } from "react";
import { useState } from "react";
import Modal from "./Components/SignUpModal";
import SignInModal from "./Components/SignInModal";
import SignUpModal from "./Components/SignUpModal";
import { auth } from "./firebase";
import PostUploader from "./Components/PostUploader";

export const AppContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="app">
      <AppContext.Provider
        value={{
          user,
          setUser,
          signInModalIsOpen,
          setSignInModalIsOpen,
          signUpModalIsOpen,
          setSignUpModalIsOpen,
        }}
      >
        <SignUpModal />
        <SignInModal />
        <Header />
          <PostsRenderer />

          {user ? <PostUploader /> : <h3>Please Login To Upload</h3>}
      </AppContext.Provider>
    </div>
  );
}

export default App;
