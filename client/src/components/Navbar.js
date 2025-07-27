// client/src/components/Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const onLogout = () => dispatch(logout());

  // Button style for active/inactive
  const buttonClass = (isActive) =>
    isActive
      ? 'bg-blue-600 text-white px-4 py-2 rounded font-semibold'
      : 'bg-transparent text-gray-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded transition';

  return (
    <nav className="bg-white shadow sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center  space-x-60">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6h13" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 17V7h5v10H4z" />
              </svg>
              <span className="text-2xl font-bold text-gray-800">ExcelAnalyze</span>
            </Link>

            {/* Desktop menu buttons: Home, About, Contact */}
            <div className="hidden md:flex space-x-5 ml-10 items-center">
              <NavLink to="/" end className={({ isActive }) => buttonClass(isActive)}>
                Home
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => buttonClass(isActive)}>
                About
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => buttonClass(isActive)}>
                Contact
              </NavLink>

              {/* Authenticated user menu items */}
              {auth.token && (
                <>
                  <NavLink
                    to="/upload"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-600 hover:text-blue-600'
                    }
                  >
                    Upload
                  </NavLink>
                  <NavLink
                    to="/history"
                    className={({ isActive }) =>
                      isActive
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-600 hover:text-blue-600'
                    }
                  >
                    History
                  </NavLink>
                  {auth.user?.role === 'admin' && (
                    <NavLink
                      to="/admin"
                      className={({ isActive }) =>
                        isActive
                          ? 'text-blue-600 font-semibold'
                          : 'text-gray-600 hover:text-blue-600'
                      }
                    >
                      Admin
                    </NavLink>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right side auth buttons & mobile menu button */}
          <div className="flex items-center space-x-4">
            {!auth.token ? (
              <>
                <NavLink to="/login" className={buttonClass(false)}>
                  Login
                </NavLink>
                <NavLink to="/register" className={buttonClass(false)}>
                  Register
                </NavLink>
              </>
            ) : (
              <button
                onClick={onLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
                title={`Logout (${auth.user?.username})`}
              >
                Logout
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={toggleMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-1 border-t border-gray-200">
          <NavLink
            to="/"
            end
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'block px-3 py-2 rounded-md bg-blue-600 text-white font-semibold'
                : 'block px-3 py-2 rounded-md text-gray-600 hover:bg-blue-600 hover:text-white transition'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'block px-3 py-2 rounded-md bg-blue-600 text-white font-semibold'
                : 'block px-3 py-2 rounded-md text-gray-600 hover:bg-blue-600 hover:text-white transition'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              isActive
                ? 'block px-3 py-2 rounded-md bg-blue-600 text-white font-semibold'
                : 'block px-3 py-2 rounded-md text-gray-600 hover:bg-blue-600 hover:text-white transition'
            }
          >
            Contact
          </NavLink>

          {auth.token && (
            <>
              <NavLink
                to="/upload"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'block px-3 py-2 rounded-md text-blue-600 font-semibold'
                    : 'block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }
              >
                Upload
              </NavLink>
              <NavLink
                to="/history"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'block px-3 py-2 rounded-md text-blue-600 font-semibold'
                    : 'block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }
              >
                History
              </NavLink>
              {auth.user?.role === 'admin' && (
                <NavLink
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive
                      ? 'block px-3 py-2 rounded-md text-blue-600 font-semibold'
                      : 'block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }
                >
                  Admin
                </NavLink>
              )}
              <button
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 focus:outline-none rounded-md"
              >
                Logout ({auth.user?.username})
              </button>
            </>
          )}

          {!auth.token && (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'block px-3 py-2 rounded-md bg-blue-600 text-white font-semibold'
                    : 'block px-3 py-2 rounded-md text-gray-600 hover:bg-blue-600 hover:text-white transition'
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'block px-3 py-2 rounded-md bg-blue-600 text-white font-semibold'
                    : 'block px-3 py-2 rounded-md text-gray-600 hover:bg-blue-600 hover:text-white transition'
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}