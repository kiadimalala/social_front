import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import * as ROUTES from "../constants/routes";
import Image from "../assets/tatasika.png";

import axios from "../services/axiosConfig";

function Login() {
  const { setToken, setUser } = useAuthContext();

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");

  const isInvalid = password === "" || email === "";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/local", {
        identifier: email,
        password,
      });
      console.log(response)
      const newToken = await response.data.jwt;
      setToken(newToken);
     //history.push("/");
    } catch (error) {
      const message = error.response //error.response.data.message[0].messages[0].message;
      console.log(message)
      if (message === 'Identifier or password invalid.') {
        setIsError("Email/mot de passe incorrect")
      }
      if (message === "Cannot find user") {
        console.log(message);
        setIsError("Cette utilisateur n'existe pas");
      }
      if (message === "Incorrect password") {
        console.log(message);
        setIsError("Mot de passe incorrecte");
      }
      setEmail("");
      setPassword("");
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
                type="email"
                aria-label="Enter your e-mail adress"
                placeholder="Email adress"
                className="w-full h-8 my-1 pl-1 bg-charcoal text-baby-powder"
                name="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />
              <input
                type="password"
                aria-label="Enter your password"
                placeholder="password"
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
              onKeyDown={(e) => {
                if (e.key === "enter") {
                  handleLogin(e);
                }
              }}
            >
              Se connecter
            </button>
          </div>
        </div>
        <div className="w-80 h-10 border border-black-coral bg-independence flex items-center justify-center">
          <p className="text-baby-powder text-sm">
            Vous n’avez pas de compte ?{" "}
            <Link
              to={ROUTES.SIGN_UP}
              className="text-safety-yellow font-semibold"
            >
              Inscrivez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
