import React, { useState, useEffect, useRef } from 'react'
import axios from "../services/axiosConfig"
import { formatDistance, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostCommentForm from './PostCommentForm'
import PostCommentList from './PostCommentList'

import { useAuthContext } from '../context/authContext'


function PostItem({ post }) {
    const [newPost, setNewPost] = useState(post)
    const { post_text, posted_by, createdAt, id, likes, comments } = newPost
    const [liked, setLiked] = useState(false)
    const [newComments, setNewComments] = useState(comments)
    const { token, user } = useAuthContext()
    const inputRef = useRef()


    let postPublished = formatDistance(parseISO(createdAt), new Date(), { locale: fr })

    const handleLikes = (e) => {
        e.preventDefault()
        if (!likes.includes(user.id)) {
            axios.put(`/posts/${id}`, { ...post, likes: [...likes, user.id] }, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    setNewPost(response.data)
                })
        } else {
            const newLikes = likes.filter(like => like !== user.id)
            axios.put(`/posts/${id}`, { ...post, likes: newLikes }, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    setNewPost(response.data)
                })
        }
    }

    useEffect(() => {
        if (likes.includes(user.id)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [likes, user.id])

    return (
        <article className=" bg-black-coral rounded p-1 my-2">
            <PostHeader posted={posted_by} published={postPublished} />
            <PostBody content={post_text} />
            <PostFooter handleLikes={handleLikes} liked={liked} inputRef={inputRef} />
            <PostCommentForm inputRef={inputRef} setNewComments={setNewComments} newComments={newComments} postId={id} post={newPost} />
            {newComments && <PostCommentList newComments={newComments} />}
        </article>
    )
}

export default PostItem
