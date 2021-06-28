import React from 'react'
import CommentItem from '../components/CommentItem'
function PostCommentList({ newComments }) {

    return (
        <section className="w-full px-2">
            {newComments ? newComments.map(comment => <CommentItem key={comment.id} comment={comment} />) : null}
        </section>
    )
}

export default PostCommentList
