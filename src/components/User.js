import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function User({ user }) {
  const { fullname, username, avatar } = user;

  if (!fullname || !username) {
    return (
      <SkeletonTheme color="#30332f" highlightColor="#313E50">
        <Skeleton count={1} height={50} />
      </SkeletonTheme>
    );
  }
  return (
    <div className="flex items-center mb-8">
      {avatar ? (
        <div className="w-12 h-12 shadow rounded-full">
          <img
            className="w-full h-full rounded-full object-cover object-center"
            src={`http://localhost:1337${avatar.url}`}
            alt="avatar"
          />
        </div>
      ) : (
        <div className="w-12 h-12 shadow border border-charcoal rounded-full"></div>
      )}
      <div className="flex flex-col justify-center ml-2">
        <h1 className="font-semibold">{fullname}</h1>
        <h1 className="text-sm text-black-coral font-semibold">{username}</h1>
      </div>
    </div>
  );
}

export default User;
