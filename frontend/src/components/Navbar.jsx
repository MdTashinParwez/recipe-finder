
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b shadow-sm">

     
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

       
        <Link
          to="/"
          className="text-2xl font-extrabold text-orange-500 tracking-wide"
        >
          🍽️ Delishia
        </Link>

        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          {user ? (
            <>
              <span className="text-gray-600">
                👋 Hi, <span className="font-semibold">{user.name}</span>
              </span>

              <Link
                to="/favorites"
                className="hover:text-orange-500 transition"
              >
                ❤️ Favorites
              </Link>

              <button
                onClick={logout}
                className="bg-orange-500 text-white px-4 py-1.5 rounded-full hover:bg-orange-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-full border hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-orange-500 text-white px-4 py-1.5 rounded-full hover:bg-orange-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        
        <button
          className="md:hidden text-2xl p-1 rounded-md hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden px-4 pb-5">
          <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col gap-3 animate-fadeIn">

            {user ? (
              <>
                <span className="text-gray-600 text-sm">
                  👋 Hi, <b>{user.name}</b>
                </span>

                <Link
                  to="/favorites"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-lg hover:bg-orange-50 transition"
                >
                  ❤️ Favorites
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-lg border text-center hover:bg-gray-100 transition"
                >
                  🔐 Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="bg-orange-500 text-white py-2 rounded-lg text-center hover:bg-orange-600 transition"
                >
                  ✨ Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;