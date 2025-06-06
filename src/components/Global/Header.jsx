import React from "react";
import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseDB";
import MenuItem from "../SQL/Menu_by_Role";
import ButtonNav from "../Button/ButtonNav";
import "../../styles/Perm/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // ✅ Moved to top level
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("user");
  const [profile, setProfile] = useState(null);

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

  useEffect(() => {
  const fetchProfileImage = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("profile_img_url")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setProfile(data);
    }
  };

  fetchProfileImage();
}, [user]);


  return (
    <header className="header">
      <div className="navbar__container">
        <Link to="/" id="logoImg" className="logo">
          <img
          // src="/images/global/Logo.png"

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
        <NavLink id="pot" className="nav__link" to="/sample-test">
          Test
        </NavLink>
        {user && (
          <div ref={profileRef} className="profile-dropdown">
           
            <img
              src={
                profile?.profile_img_url
                  ? profile.profile_img_url
                  : "/images/global/Profile-placeholder.png"
              }
              alt="Profile"
              className="profile-icon"
              onClick={() => {
                setDropdownOpen((prev) => !prev);
                if (!dropdownOpen) setMenuOpen(false);
              }}
            />

            {dropdownOpen && (
              <div className="profile-menu">
                <MenuItem
                  id="add-questions"
                  data-testid="add-questions"
                  label="Add Questions"
                  to="/admin-add-questions"
                  roles={["user", "member", "admin", "superadmin"]}
                  userRole={userRole}
                />
                <MenuItem
                  id="edit-questions"
                  data-testid="edit-questions"
                  label="Edit Questions"
                  to="/admin-edit-questions"
                  roles={["user", "member", "admin", "superadmin"]}
                  userRole={userRole}
                />
                <MenuItem
                  id="grade-questions"
                  data-testid="grade-questions"
                  label="Grade Questions"
                  to="/admin-grade-questions"
                  roles={["user", "member", "admin", "superadmin"]}
                  userRole={userRole}
                />
                <MenuItem
                  id="profile"
                  testId="profile"
                  label="Profile"
                  to="/profile"
                  roles={["user", "member", "admin", "superadmin"]}
                  userRole={userRole}
                />
                <MenuItem
                  id="memberProfile"
                  testId="memberProfile"
                  label="Member Profiles"
                  to="/member-profiles"
                  roles={["user", "member", "admin", "superadmin"]}
                  userRole={userRole}
                />

                <MenuItem
                  id="userManager"
                  testId="userManager"
                  label="User Management"
                  to="/admin-user-manager"
                  roles={["admin", "superadmin", "user"]}
                  userRole={userRole}
                />
                <MenuItem
                  id="dashboard"
                  label="Dashboard"
                  to="/dashboard"
                  roles={["superadmin"]}
                  userRole={userRole}
                />
                <ButtonNav id="signOut" label="Sign Out" action="signOut" />

              </div>
            )}
          </div>
        )}
        {!user && (
          <>
          <ButtonNav id="signIn" label="Sign In" to="/login" />
          <ButtonNav id="red-ack" label="Register" to="/register1" />

          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
