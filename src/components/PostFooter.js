import React from 'react';
import axios from "../services/axiosConfig"
import { FiStar, FiMessageCircle } from 'react-icons/fi'


const PostFooter = ({ handleLikes, liked, inputRef }) => {
    const focus = () => {
        inputRef.current.focus()

    }
    return (
        <section className="flex justify-between items-center h-12">
            <button className="w-full flex justify-center items-center shadow mx-2 focus:outline-none hover:bg-gray-500 transition-colors duration-500" onClick={handleLikes} >
                <span className="w-10 h-10 text-xl flex items-center">
                    <FiStar className={`${liked ? 'fill-current text-yellow-500' : null}`} />
                </span>
            </button >
            <button className="w-full flex justify-center items-center shadow mx-2 focus:outline-none hover:bg-gray-500 transition-colors duration-500" onClick={() => {
                focus()
            }}>
                <span className="w-10 h-10 text-xl flex items-center">
                    <FiMessageCircle />
                </span>
            </button>
        </section>
    );
}

export default PostFooter;
