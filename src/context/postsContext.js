import { createContext, useState, useEffect, useContext } from "react";
import { formatDistance, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'
import axios from "../services/axiosConfig";
import { useAuthContext } from "./authContext";


export const PostsContext = createContext()

export const PostsProvider = ({ children }) => {
    const { token } = useAuthContext()
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            function getAllPosts() {
                axios.get('/posts', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    const posts = response.data
                    const last = posts[posts.length - 1]
                    const first = posts[0]
                    posts.sort((first, last) => {
                        if (Date.parse(last.createdAt) < Date.parse(first.createdAt)) {
                            return -1
                        }
                    })
                    setPosts(posts);
                })
            }
            getAllPosts()
            isMounted = true
        }

        return () => {
            isMounted = false
            console.log('post cleanup');

        }
    }, [setPosts, token])

    return (
        <PostsContext.Provider value={{ posts, setPosts }}>
            {children}
        </PostsContext.Provider>
    )
}

export const usePostsContext = () => {
    return useContext(PostsContext)
}