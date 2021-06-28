import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import Image from "../assets/tatasika.png";
import { FiHome, FiLogOut } from "react-icons/fi";

import { useAuthContext } from "../context/authContext";
function Header() {
  const { setToken } = useAuthContext();

  const handleLogOut = (e) => {
    setToken(null);
  };
  return (
    <div className="h-12 shadow border-b border-black-olive mb-8">
      <div className="container mx-auto h-full max-width-w-full">
        <div className="flex justify-between h-full">
          <div className="flex items-center w-full">
            <h1 className="flex justify-start w-full mx-20">
              <Link to={ROUTES.DASHBOARD} aria-label="Tatasika logo">
                <img className="h-6" src={Image} alt="Tatasika" />
              </Link>
            </h1>
          </div>
          <div className="flex items-center justify-end w-full mx-20">
            <Link
              className="h-full w-12 flex justify-center items-center text-2xl"
              to={ROUTES.DASHBOARD}
              aria-label="Dashboard"
            >
              <FiHome />
            </Link>
            <button
              className="h-full flex items-center justify-center w-12 text-2xl"
              onClick={(e) => {
                handleLogOut(e);
              }}
            >
              <FiLogOut />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
