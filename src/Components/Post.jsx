import React, { useContext } from "react";
import classes from  "../Styles/Post.module.css";
import { Avatar } from "@material-ui/core";
import img from "../Facebook_logo_PNG9.png";
import { AppContext } from "../App";
import Comments from "./Comments";

const Post = ({ username, caption, imageUrl, postId }) => {
  const { user } = useContext(AppContext);

  return (
    <div className={classes.post}>
      <div className={classes.post__header}>
        <Avatar alt="User" />
        <h3>{username}</h3>
      </div>
      {imageUrl ? <img alt={caption} src={imageUrl} /> : null}
      {caption ? (
        <p>
          {caption}
        </p>
      ) : null}
      {user ? <Comments postId={postId}/> : null}
    </div>
  );
};

export default Post;
