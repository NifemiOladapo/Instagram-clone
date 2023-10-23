import React from "react";
import Post from "./Post";
import { useState } from "react";
import "../Styles/PostsRenderer.css"
import { useEffect } from "react";
import { db } from "../firebase";

const PostsRenderer = () => {
  const [posts, setPosts] = useState([
 
  ]);

  useEffect(()=>{
    db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapShot => setPosts(snapShot.docs.map(doc => ({ post: doc.data(), id: doc.id }))));

  },[])



  return (
    <div className="post__renderer">
      {posts.map((post) => {
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
};

export default PostsRenderer;
