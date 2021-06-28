import React, { useEffect, useState, useCallback } from "react";
import { useAuthContext } from "../context/authContext";
import axios, { source } from "../services/axiosConfig";

function SuggestedProfile({ item }) {
  const { token, user, setUser } = useAuthContext();
  const [userProfile, setUserProfile] = useState(null);
  const [followed, setFollowed] = useState(false);
  const { id, followings } = user;


  const handleFollow = async (e) => {
    e.preventDefault();

    try {
      setFollowed(true);
      await axios
        .get(`/users/${item}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (response) => {
          const { data } = response;
          await axios
            .put(
              `users/${item}`,
              {
                ...data,
                followers: [...data.followers, id],
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then(async (response) => {
              const { data } = response;
              await axios
                .put(
                  `/users/${id}`,
                  { ...user, followings: [...followings, data] },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                )
                .then((response) => setUser(response.data));
            });
        });
    } catch (error) {
      console.log(error.response.data);
    }
  };


  const getUser = useCallback(
    async () => {
      try {
        if (!userProfile) {
          const response = await axios.get(
            `/users/${item}`,
            {
              //cancelToken: source.token,
              headers: {
                Authorization: `Bearer ${token}`,
              },

            }
          );
          setUserProfile(response.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    [item, token, userProfile],
  )
  useEffect(() => {
    let isSubscribe = true
    if (isSubscribe && source) {
      getUser(source);
    }
    return () => source.cancel('')
  }, [getUser, item, token]);

  if (userProfile) {
    const { fullname, username, avatar } = userProfile;
    return !followed ? (
      <article className="flex mb-2 rounded items-center w-full">
        {avatar ? (
          <div className="w-1/3 h-full  ">
            <img className="w-12 h-12 rounded-full object-cover object-center" src={`http://localhost:1337${avatar.url}`} alt={username} />
          </div>
        ) : (
          <div className="w-20 h-12  ">
            <div className="w-12 h-12 border border-charcoal shadow rounded-full"></div>
          </div>
        )}
        <div className="flex items-center w-full">
          <div className="ml-2 flex flex-col justify-center w-3/4">
            <h1 className="font-semibold">{fullname}</h1>
            <h1 className="text-sm text-black-coral font-semibold">
              {username}
            </h1>
          </div>
          <div className="flex items-center justify-end w-1/4">
            <button
              className="bg-charcoal w-40 p-1 self-end text-xs rounded"
              onClick={(e) => {
                handleFollow(e);
              }}
            >
              Suivre
            </button>
          </div>
        </div>
      </article>
    ) : null;
  }
  return null;
}

export default SuggestedProfile;
