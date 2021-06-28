import React, { useState } from 'react'
import axios from '../services/axiosConfig'
import { formatDistance, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

function CommentItem({ comment }) {
    const [newComment, setNewComment] = useState(comment)
    const { body, posted_by, createdAt } = comment

    let postPublished = formatDistance(parseISO(createdAt), new Date(), { locale: fr })

    return (
        <article className="rounded w-auto flex mb-5 relative ">
            <div className=" flex h-10 w-10">
                {!posted_by.avatar ? <div className="w-7 h-7 border rounded-full"></div> : <img className="w-8 h-8 rounded-full object-cover object-center" src={`${axios.defaults.baseURL}${posted_by.avatar.url}`} alt="avatar" />}
            </div>
            <span className="bg-charcoal rounded-xl px-2 ">
                <div className="flex items-center h-6">
                    <h1 className="font-semibold h-full text-sm mr-2">{posted_by.fullname}</h1>
                </div>
                <p className="text-xs whitespace-pre-line mb-2 ">
                    {body}
                </p>
            </span>
            <h2 className="text-xxs  absolute -bottom-4 left-12">{postPublished}</h2>
        </article>
    )
}

export default CommentItem
