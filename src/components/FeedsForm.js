import React, { useState, useEffect, useCallback } from "react";
import { FiSend } from "react-icons/fi";
import { formatISO } from "date-fns";
import { v4 as uuidv4 } from 'uuid'

import axios from "../services/axiosConfig"

import { useAuthContext } from "../context/authContext";
import { usePostsContext } from "../context/postsContext";

export default function FeedsForm() {
  const [post, setPost] = useState("");
  const [newPosts, setNewPosts] = useState(null)
  const { user, token } = useAuthContext();
  const { posts, setPosts } = usePostsContext()
  const { avatar } = user;
  const handlePost = useCallback((e) => {
    e.preventDefault()
    const newPost = {
      id: uuidv4(), post_text: post, posted_by: user, likes: [], comments: [], createdAt: formatISO(new Date())
    }
    setPosts([newPost, ...posts])
    axios.post('posts', newPost, { headers: { Authorization: `Bearer ${token}` } })
  }, [post, posts, setPosts, token, user])

  return (
    <form className="w-full flex items-center h-14 p-2 bg-charcoal rounded">
      {!avatar ? (
        <div className="w-10 h-10 border mr-2 ">1</div>
      ) : (
        <div className="w-10 h-10 mr-2 ">
          <img
            className="w-full h-full object-cover object-center"
            src={`http://localhost:1337${avatar.url}`}
            alt="avatar"
          />
        </div>
      )}

      <input
        className="w-5/6 h-10 mr-2 pl-2 text-charcoal"
        type="text"
        placeholder="Quoi de neuf"
        value={post}
        onChange={({ target }) => setPost(target.value)}
      />
      <div className="w-10 flex justify-end">
        <button type="submit" className="w-full h-10 bg-black-coral" onClick={(e) => { handlePost(e) }}>
          <span className="text-2xl w-full h-full flex justify-center items-center">
            <FiSend />
          </span>
        </button>
      </div>
    </form>
  );
}
