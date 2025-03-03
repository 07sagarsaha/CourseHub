import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { BookOpen, LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/login");
      });
  };
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path
      ? "px-3 py-2 rounded-md text-sm font-medium bg-indigo-800"
      : "px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500";
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">CourseHub</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/" className={getNavLinkClass("/")}>
              Courses
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className={getNavLinkClass("/dashboard")}>
                  Dashboard
                </Link>
                <div className="flex items-center">
                  <span className="mr-2 text-sm font-medium">
                    {user.displayName || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-indigo-700 hover:bg-indigo-800"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className={getNavLinkClass("/login")}>
                  Login
                </Link>
                <Link to="/register" className={getNavLinkClass("/register")}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
