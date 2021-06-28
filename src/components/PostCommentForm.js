import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { v4 as uuidv4 } from 'uuid'
import { formatISO } from "date-fns";
import { useAuthContext } from '../context/authContext'

import axios from '../services/axiosConfig'

function CommentForm({ inputRef, setNewComments, newComments, postId, post }) {
    const [commentBody, setCommentBody] = useState("");
    const { user, token } = useAuthContext()
    const postComment = (e) => {
        e.preventDefault();
        const comment = {
            id: uuidv4(),
            posted_by: user,
            body: commentBody,


            createdAt: formatISO(new Date())
        }
        axios.put(`posts/${postId}`, { ...post, comments: [comment, ...newComments] }, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => console.log(response))
        setNewComments([comment, ...newComments])
        setCommentBody('')
    };

    return (
        <form className="w-full h-12 px-2 flex items-center">
            <input
                className="pl-2 h-8 w-5/6 mr-2 text-charcoal"
                type="text"
                placeholder="Ajouter un commentaire"
                ref={inputRef}
                value={commentBody}
                onChange={({ target }) => setCommentBody(target.value)}
            />
            <button
                className="h-8 w-2/12 flex justify-center items-center border"
                onClick={(e) => postComment(e)}
            >
                <FiSend />
            </button>
        </form>
    );
}

export default CommentForm;
