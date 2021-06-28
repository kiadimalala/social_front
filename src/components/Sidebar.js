import React from "react";
import User from "./User";
import Suggestions from "./Suggestions";
import { useAuthContext } from "../context/authContext";

function Aside() {
  const { user } = useAuthContext();
  return (
    <div className="w-2/6 flex flex-col justify-center h-full ">
      <User user={user} />
      <Suggestions user={user} />
    </div>
  );
}

export default Aside;
