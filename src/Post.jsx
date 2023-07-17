import React from 'react'
import './Post.css'
import { Avatar } from '@material-ui/core';

const Post = ({username, caption, imageUrl}) => {
  return (
    <div className='post'>
      <div className="post__header">
        <Avatar alt='Nifemi'/>
        <h3>{username}</h3>
      </div>
        <img src={imageUrl}/>
        <h4><strong>{username}</strong> : {caption}</h4>
    </div>
  )
}

export default Post