import { Button, Input } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import classes from "../Styles/Comments.module.css";
import { db } from "../firebase";
import { AppContext } from "../App";
import firebase from "firebase/compat/app";

const Comments = ({ postId }) => {
  const { user } = useContext(AppContext);
  const [comments, setComments] = useState([
    // { username: "Nifemi", text: "hry there" },
    // { username: "Kolawole", text: "hry there" },
  ]);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setComments(
          snapshot.docs.map((doc) => ({ comment: doc.data(), id: doc.id }))
        )
      );
    return () => {
      unsubscribe();
    };
  }, []);
  const [text, setText] = useState("");

  const postCommentFunc = () => {
    if (!text) {
      return alert("Please input your comment");
    }
    db.collection("posts").doc(postId).collection("comments").add({
      text,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setText("");
  };
  return (
    <div className={classes.comments}>
      <div className={classes.comment__form}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comment..."
        />
        <button onClick={postCommentFunc}>ADD</button>
      </div>
      <div style={{ marginTop: "10px", width : "100%",  }}>
        {comments.map((comment) => (
          <div
            key={comment.id}
            style={{overflow : "hidden", display: "flex", gap: "3px", alignItems: "center", width : "100%", marginBottom : "10px" }}
          >
            <h4>{comment.comment.username}</h4>
            <p>{comment.comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
