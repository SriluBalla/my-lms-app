import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseDB";
import ButtonNav from "../Button/ButtonNav";
import "../../styles/Perm/Header.css";

const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userRole, setUserRole] = useState("user");

  const navigate = useNavigate();
  const menuRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };

    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user || null)
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("profile_img_url")
        .eq("id", user.id)
        .single();

      if (!error && data) setProfile(data);

      const { data: roleData } = await supabase
        .from("user_role_assignments")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (roleData?.role) setUserRole(roleData.role.toLowerCase());
    };

    fetchUserProfile();
  }, [user]);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  const commonLinks = [
    { label: "Profile", to: "/profile" },
    { label: "Member Profiles", to: "/member-profiles" },
  ];
  const memberLinks = [{ label: "Certificates", to: "/certificates" }];
  const leaderLinks = [
    { label: "Grade Questions", to: "/admin-grade-questions" },
    { label: "Grade Issues", to: "/admin-grade-issues" },
    { label: "Grade Check Cases", to: "/admin-grade-checkcases" },
  ];
  const adminLinks = [
    { label: "Add Questions", to: "/admin-add-questions" },
    { label: "Edit Questions", to: "/admin-edit-questions" },
    { label: "Assign User Role", to: "/admin-assign-user-role" },
    { label: "Approve User Profile", to: "/admin-review-user-page" },
  ];

  const allRoles = {
    user: commonLinks,
    member: [...memberLinks, ...commonLinks],
    leader: [...memberLinks, ...commonLinks, ...leaderLinks],
    admin: [...memberLinks, ...commonLinks, ...adminLinks, ...leaderLinks],
    superadmin: [...memberLinks, ...commonLinks, ...adminLinks, ...leaderLinks],
  };

  const roleLinks = allRoles[userRole] || commonLinks;

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
      </div>

      <nav ref={menuRef} className={`nav-menu ${menuOpen ? "active" : ""}`}>
        {user ? (
          <div ref={profileRef} className="profile-dropdown">
            <img
              src={
                profile?.profile_img_url ||
                `${import.meta.env.BASE_URL}images/global/Profile-placeholder.png`
              }
              alt="Profile"
              className="profile-icon"
              onClick={() => {
                setDropdownOpen((prev) => !prev);
                setMenuOpen(false);
              }}
            />

            {dropdownOpen && (
              <div className="profile-menu">
                <p className="role-tag">{userRole.toUpperCase()}</p>
                {roleLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    className="nav__link"
                    to={link.to}
                    onClick={() => setDropdownOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <ButtonNav
                  id="signOut"
                  label="Sign Out"
                  onClick={handleLogout}
                />
              </div>
            )}
          </div>
        ) : (
          <>
            <ButtonNav id="signIn" label="Sign In" to="/login" />
            <ButtonNav id="red-ack" label="Sign Up" to="/register1" />
          </>
        )}
      </nav>
    </header>
  );
};

export default MainHeader;
