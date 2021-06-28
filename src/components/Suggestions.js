import React, { useState, useEffect, useCallback } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useAuthContext } from "../context/authContext";
import SuggestedProfile from "./SuggestedProfile";

import axios from "../services/axiosConfig";

function Suggestions({ user }) {
  const { token } = useAuthContext();

  const [profiles, setProfiles] = useState(null);
  const { id, followings } = user;

  // get profiles suggestions from followed user of their own followed profiles
  const getSuggestedProfiles = useCallback(
    async (id) => {
      try {
        if (!profiles) {
          const response = await axios.get("/users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          let followedUser = []
          const tempSuggestedProfiles = []
          response.data.map(user => {
            if (followings.includes(user.id)) {
              followedUser.push(user)
            }
          })
          followedUser.map(item => {
            item.followings.map(i => {
              if (i.id !== id && !followings.includes(i.id)) {
                tempSuggestedProfiles.push(i.id)
              }

            })
          })

          const suggestedProfiles = [...new Set(tempSuggestedProfiles)]

          setProfiles(suggestedProfiles);
        }
      } catch (error) {
      }
    },
    [followings, profiles, token]
  );

  useEffect(() => {
    //Get suggested profile
    if (id) {
      getSuggestedProfiles(id);
    }
  }, [getSuggestedProfiles, id]);

  if (!profiles) {
    return (
      <>
        <h1 className="font-semibold mb-2">Vous connaissez peut-être...</h1>
        <SkeletonTheme color="#30332E" highlightColor="#3A435E">
          <Skeleton count={3} height={50} />
        </SkeletonTheme>
      </>
    );
  }
  return (
    <section className=" flex flex-col">
      <h1 className="font-semibold mb-2">Vous connaissez peut-être...</h1>
      <div className="flex flex-col w-full justify-center">
        {profiles.map((item, index) => (
          <SuggestedProfile key={index} item={item} />
        ))}
      </div>
    </section>
  );
}

export default Suggestions;
