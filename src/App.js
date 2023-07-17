import React, { useState, useEffect, useRef } from "react";
import logo from "./Facebook_logo_PNG9.png";
import "./App.css";
import Post from "./Post";
import { db } from "./firebase";
import { Box, Modal, Typography, Button } from "@material-ui/core";

function App() {
  const [posts, setPosts] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    // top: "50%",
    // left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    bgcolor: "red",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      const mappedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        post: doc.data(),
      }));
      setPosts(mappedPosts);
    });
    console.log(posts);
  }, []);

  return (
    <div className="app">
      <div>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </div>
      <div className="app__header">
        <img
          src={logo}
          className="app__headerImage"
          style={{ width: "100px" }}
        />
      </div>
      {posts.map((post) => {
        console.log(post);
        return (
          <Post
            key={post.id}
            imageUrl={post.post.imageUrl}
            username={post.post.username}
            caption={post.post.caption}
          />
        );
      })}
    </div>
  );
}

export default App;
