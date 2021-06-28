import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import {PostsProvider} from '../context/postsContext'
function Dashboard() {
  return (
    <div className="text-baby-powder">
      <Header />
      <div className=" container mx-auto w-4/6 flex">
      <PostsProvider>
        <Timeline />
      </PostsProvider>
        <Sidebar />
      </div>
    </div>
  );
}

export default Dashboard;
