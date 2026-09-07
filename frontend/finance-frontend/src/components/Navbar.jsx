import {
  Wallet,
  LogOut,
  Home,
  LayoutDashboard,
  User
} from "lucide-react";

function Navbar({
  user,
  currentPage,
  setCurrentPage,
  onLogout
}) {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div
          className="logo"
          onClick={() => setCurrentPage("home")}
        >
          <div className="logo-icon">
            <Wallet size={20} />
          </div>

          <span>FinTrack</span>
        </div>

        {/* Navigation */}
        <div className="nav-menu">

          <button
            className={
              currentPage === "home"
                ? "nav-link active"
                : "nav-link"
            }
            onClick={() => setCurrentPage("home")}
          >
            <Home size={16} />
            Home
          </button>

          {user && (
            <button
              className={
                currentPage === "dashboard"
                  ? "nav-link active"
                  : "nav-link"
              }
              onClick={() =>
                setCurrentPage("dashboard")
              }
            >
              <LayoutDashboard size={16} />
              Dashboard
            </button>
          )}

        </div>

        {/* Right Side */}
        <div className="navbar-right">

          {user ? (
            <>
              <div className="user-info">
                <User size={15} />
                <span>{user.name}</span>
              </div>

              <button
                className="logout-button"
                onClick={onLogout}
              >
                <LogOut size={15} />
                Logout
              </button>
            </>
          ) : (
            <div className="auth-buttons">

              <button
                className={
                  currentPage === "login"
                    ? "nav-login active"
                    : "nav-login"
                }
                onClick={() =>
                  setCurrentPage("login")
                }
              >
                Login
              </button>

              <button
                className="nav-signup"
                onClick={() =>
                  setCurrentPage("signup")
                }
              >
                Sign Up
              </button>

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;