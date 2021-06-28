import React from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'
import axios from '../services/axiosConfig'

function PostHeader({ posted, published }) {
    const { fullname, username, avatar } = posted
    return (
        <div className="flex h-12 items-center rounded ">
            {!avatar ? <div className=" w-10 h-10 border rounded-full">1</div> : <div className=" w-10 h-10 rounded-full">
                <img className="rounded-full object-cover object-center " src={`${axios.defaults.baseURL}${avatar.url}`} alt={username} />
            </div>}
            <div className="w-4/5 h-full mx-2 flex flex-col justify-center">
                <p className="font-semibold">{fullname}</p>
                <p className="text-xs text-gray-400"> {published}</p>
            </div>
            <div className="w-16 h-full flex justify-center items-center">
                <span className="w-full h-full flex justify-end items-center">
                    <span className=" flex justify-center items-center mx-4 text-2xl w-8 h-8 rounded-full hover:bg-gray-500"> <FiMoreHorizontal /></span>
                </span>
            </div>
        </div>
    )
}

export default PostHeader
