import { Box, Modal, Input, Typography, Button } from "@material-ui/core";
import { useState } from "react";
import classes from "../Styles/ModalBox.module.css";
import { auth } from "../firebase";
import { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";

const SignUpModal = () => {
  const { user, setUser, signUpModalIsOpen, setSignUpModalIsOpen } =
    useContext(AppContext);

  const handleClose = () => setSignUpModalIsOpen(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpFunc = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({ displayName: username });
        setSignUpModalIsOpen(false);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className={classes.modal}>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={signUpModalIsOpen}
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
          <h1 style={{textAlign : "center"}}>Sign Up</h1>

          <form onSubmit={signUpFunc}>
            <div  className={classes.an__input__wrapper}>
              <Input
                placeholder="Input your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div  className={classes.an__input__wrapper}>
              <Input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Input your email"
              />
            </div>
            <div  className={classes.an__input__wrapper}>
              <Input
                placeholder="Input your Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit">Sign Up</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default SignUpModal;
