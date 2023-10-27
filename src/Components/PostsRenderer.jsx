import React from "react";
import Post from "./Post";
import { useState } from "react";
import classes from  "../Styles/PostsRenderer.module.css";
import { useEffect } from "react";
import { db } from "../firebase";

const PostsRenderer = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapShot) =>
        setPosts(snapShot.docs.map((doc) => ({ post: doc.data(), id: doc.id })))
      );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={classes.post__renderer}>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            imageUrl={post.post.imageUrl}
            username={post.post.username}
            caption={post.post.caption}
            postId={post.id}
          />
        );
      })}
    </div>
  );
};

export default PostsRenderer;
