import React from "react";
import "../Styles/Post.css";
import { Avatar } from "@material-ui/core";
import img from "../Facebook_logo_PNG9.png";

const Post = ({ username, caption, imageUrl }) => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar alt="Nifemi" />
        <h3>{username}</h3>
      </div>
      {imageUrl !== "" ? <img alt={caption} src={imageUrl} /> : null}

      <h4>
        <strong style={{marginRight : "10px"}}>{username}</strong>
        {caption}
      </h4>
    </div>
  );
};

export default Post;
