import React, { useState, useEffect, useCallback } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import * as ROUTES from "../constants/routes";
import Image from "../assets/tatasika.png";

import axios from "../services/axiosConfig";

function SignUp() {
  const { setToken, setUser } = useAuthContext();

  const history = useHistory();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");

  const isInvalid =
    password === "" || email === "" || username === "" || fullname === "";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post("/auth/local/register", {
          email,
          fullname,
          username,
          password,
        })
        .then((response) => {
          const data = response.data;
          setToken(data.jwt);
          setUser(data.user);
          history.push(ROUTES.DASHBOARD);
        });
    } catch (error) {
      const message = error.response
      console.log(message);
      if (message === "Email is already taken.") {
        setIsError("Cette adresse email est déjà utilisé");
      }
      setEmail("");
      setPassword("");
      setUsername("");
      setFullname("");
    }
  };
  return (
    <div className="h-100 flex flex-col">
      <div className=" mx-auto my-auto">
        <div className="w-80 border border-black-coral bg-independence mb-3">
          <h1 className="h-12 flex items-center">
            <img
              className=" w-full h-6 object-contain object-center"
              src={Image}
              alt="tatasika"
            />
          </h1>
          {isError && (
            <p className="my-4 text-xs text-center text-red-400">{isError}</p>
          )}
          <div className="flex flex-col">
            <form onSubmit={handleLogin} method="POST" className="px-2 my-4">
              <input
                type="text"
                aria-label="Veuillez saisir votre nom d'utilisateur"
                placeholder="Veuillez saisir votre nom d'utilisateur"
                className="w-full h-8 my-1 pl-1 bg-charcoal text-baby-powder"
                name="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
              <input
                type="text"
                aria-label="fullname"
                placeholder="Veuillez saisir votre nom/prénom"
                className="w-full h-8 my-1 pl-1 bg-charcoal text-baby-powder"
                name="fullname"
                value={fullname}
                onChange={({ target }) => setFullname(target.value)}
              />
              <input
                type="email"
                aria-label="Enter your e-mail adress"
                placeholder="Adresse email"
                className="w-full h-8 my-1 pl-1 bg-charcoal text-baby-powder"
                name="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
              <input
                type="password"
                aria-label="Enter your password"
                placeholder="Mot de passe"
                className="w-full h-8 my-1 pl-1 bg-charcoal text-baby-powder"
                name="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </form>
            <button
              disabled={isInvalid}
              type="submit"
              className={`h-8 bg-black-coral mx-2 mb-4 text-baby-powder font-semibold ${isInvalid && "opacity-50"
                }`}
              onClick={(e) => handleLogin(e)}
            >
              S'incrire
            </button>
          </div>
        </div>
        <div className="w-80 h-10 border border-black-coral bg-independence flex items-center justify-center">
          <p className="text-baby-powder text-sm">
            Vous n’avez pas de compte ?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="text-safety-yellow font-semibold"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
