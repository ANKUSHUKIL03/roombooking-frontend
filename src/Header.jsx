import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="flex justify-between items-center p-2 bg-white shadow-sm sticky top-0 z-50">
      {/* Logo and Brand Name */}
      <Link to={'/'} className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 text-rose-500"
        >
          <path d="M19.006 3.705a.75.75 0 1 0-.512-1.41L6 6.838V3a.75.75 0 0 0-.75-.75h-1.5A.75.75 0 0 0 3 3v4.93l-1.006.365a.75.75 0 0 0 .512 1.41l16.5-6Z" />
          <path
            fillRule="evenodd"
            d="M3.019 11.114 18 5.667v3.421l4.006 1.457a.75.75 0 1 1-.512 1.41l-.494-.18v8.475h.75a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1 0-1.5H3v-9.129l.019-.007ZM18 20.25v-9.566l1.5.546v9.02H18Zm-9-6a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75H9Z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-bold text-xl text-gray-800">ApnaJannat</span>
      </Link>

      {/* Beautiful Promotional Message */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-pink-100 via-rose-200 to-pink-100 border border-pink-300 rounded-full px-6 py-3 shadow-md hover:shadow-lg transition cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-pink-600"
        >
          <path d="M12 2C6.477 2 2 6.486 2 12.01c0 5.137 3.872 9.39 8.867 9.952.648.058.883-.281.883-.623 0-.308-.012-1.265-.018-2.295-3.606.783-4.37-1.74-4.37-1.74-.59-1.5-1.441-1.9-1.441-1.9-1.177-.806.089-.79.089-.79 1.303.092 1.988 1.338 1.988 1.338 1.157 1.983 3.035 1.41 3.776 1.078.118-.841.453-1.411.823-1.736-2.881-.33-5.913-1.447-5.913-6.443 0-1.423.508-2.585 1.338-3.496-.135-.33-.58-1.659.127-3.46 0 0 1.087-.348 3.563 1.332a12.5 12.5 0 0 1 6.487 0c2.474-1.68 3.56-1.332 3.56-1.332.71 1.801.265 3.13.13 3.46.832.911 1.336 2.073 1.336 3.496 0 5.01-3.038 6.109-5.931 6.433.467.403.88 1.199.88 2.418 0 1.747-.016 3.158-.016 3.586 0 .346.232.688.89.617C18.128 21.397 22 17.145 22 12.01 22 6.486 17.523 2 12 2Z" />
        </svg>
        <div className="text-sm sm:text-base md:text-sm font-semibold text-gray-700">
          <span className="text-pink-700">Get your <span className="font-bold">Jannat</span></span> only here at an <span className="text-green-600">affordable rate</span> —
          <span className="text-blue-600"> enjoy your day with beautiful colors</span> 🎨🌈
        </div>
      </div>

      {/* User Login / Account */}
      <Link
        to={user ? '/account' : '/login'}
        className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 hover:shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>

        <div className="bg-gray-600 text-white rounded-full border border-gray-500 p-1 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {!!user && <div>{user.name}</div>}
      </Link>
    </header>
  );
}
