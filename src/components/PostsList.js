import React from 'react'
import PostItem from './PostItem'
import { useAuthContext } from '../context/authContext'

function PostsList({ posts }) {

    const { user } = useAuthContext()
    const { followings, id } = user
    console.log(id)
    return !posts?(<section className="mt-5 text-center">
        <h1> pas d'actus</h1>
    </section>) : <section className="mt-5">
        {posts.map(post => {
            const { posted_by } = post
            console.log(posted_by.id)
            if (
                followings.includes(posted_by.id) || posted_by.id === id
            ) {
                return <PostItem key={post.id} post={post} />
            }
        }
        )}
    </section>



}

export default PostsList
