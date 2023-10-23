import { Box, Modal, Input, Typography, Button } from "@material-ui/core";
import { useState } from "react";
import "../Styles/ModalBox.css";
import { auth } from "../firebase";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";

const SignInModal = () => {
  const { user, setUser, signInModalIsOpen, setSignInModalIsOpen } =
    useContext(AppContext);

  const handleClose = () => setSignInModalIsOpen(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInFunc = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authUser) => {
        setSignInModalIsOpen(false);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={signInModalIsOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            position: "absolute",
            top: "40%",
            left: "35%",
            width: "90%",
            maxWidth: "400px",
            backgroundColor: "white",
            padding: "30px",
            border: "2px solid #000",
          }}
        >
          <form onSubmit={signInFunc}>
            <div className="an__input__wrapper">
              {/* <Input
                placeholder="Input your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
             /> */}
            </div>
            <div className="an__input__wrapper">
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Input your email"
              />
            </div>
            <div className="an__input__wrapper">
              <Input
              type="password"
                placeholder="Input your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit">Sign In</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default SignInModal;
