import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseDB";
import MenuItem from "./MenuItem";
import "../styles/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // ✅ Moved to top level
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("user");

  const menuRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };
    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header className="header">
      <div className="navbar__container">
        <Link to="/" id="logoImg" className="logo">
          <img
            src={`${import.meta.env.BASE_URL}images/global/Logo.png`}
            alt="Product Owner in Test Logo"
          />
        </Link>

        <Link to="/" id="logoText">
          Product Owner in Test™
        </Link>

        <button
          id="menuToggle"
          className="menu-toggle"
          onClick={() => {
            setMenuOpen((prev) => {
              const next = !prev;
              if (next) setDropdownOpen(false); // Close profile menu if opening
              return next;
            });
          }}
        >
          ☰
        </button>
      </div>
      <nav ref={menuRef} className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <NavLink id="qaToPot" className="nav__link" to="/qa-to-pot">
          QA to POT
        </NavLink>
        <NavLink id="why" className="nav__link" to="/why">
          Why
        </NavLink>
        <NavLink id="pot" className="nav__link" to="/pot">
          POT
        </NavLink>
        {/* </nav> */}
        {user && (
          <div ref={profileRef} className="profile-dropdown">
            <img
              src="/images/global/Profile-placeholder.png"
              alt="Profile"
              className="profile-icon"
              onClick={() => {
                setDropdownOpen((prev) => !prev);
                if (!dropdownOpen) setMenuOpen(false); // close nav if profile is opening
              }}
            />
            {dropdownOpen && (
              <div className="profile-menu">
                <MenuItem
                  id="account"
                  label="Account"
                  to="/account"
                  roles={["user", "member", "admin", "superadmin"]}
                  userRole={userRole}
                />
                <MenuItem
                  id="profile"
                  label="Profile"
                  to="/profile"
                  roles={["user", "member", "admin", "superadmin"]}
                  userRole={userRole}
                />
                <MenuItem
                  id="memberProfile"
                  label="Member Profiles"
                  to="/member-profiles"
                  roles={["user", "member", "admin", "superadmin"]}
                  userRole={userRole}
                />

                <MenuItem
                  id="userManager"
                  label="User Management"
                  to="/admin-user-manager"
                  roles={["admin", "superadmin","user"]}
                  userRole={userRole}
                />
                <MenuItem
                  id="dashboard"
                  label="Dashboard"
                  to="/dashboard"
                  roles={["superadmin"]}
                  userRole={userRole}
                />
                <button
                  id="signOut"
                  className="nav-button"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
        {!user && (
          <>
            <button
              id="signIn"
              className="nav-button"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <button
              id="register"
              className="nav-button"
              onClick={() => navigate("/register1")}
            >
              Register
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
