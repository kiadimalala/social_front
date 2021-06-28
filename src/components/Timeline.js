import React from "react";
import { usePostsContext } from '../context/postsContext'

import FeedsForm from "./FeedsForm";
import PostsList from "./PostsList";

function Timeline() {
  const { posts, setPosts } = usePostsContext()
  return (
    <div className="w-4/6 flex flex-col mx-20">
      <FeedsForm setPosts={setPosts} />
      <PostsList posts={posts} />
    </div>
  );
}

export default Timeline;
