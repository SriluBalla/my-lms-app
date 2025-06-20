import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseDB";
import ButtonNav from "../Button/ButtonNav";
import "../../styles/Perm/Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userRole, setUserRole] = useState("user");

  const navigate = useNavigate();
  const menuRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    // Get current session/user on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // console.log("🔁 Auth Change Event:", event, session);
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    // Load user-specific profile and role data
    if (!user) return setProfile(null);
    supabase
      .from("profiles")
      .select("profile_img_url")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => !error && setProfile(data));

    supabase
      .from("user_role_assignments")
      .select("role")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => data?.role && setUserRole(data.role.toLowerCase()));
  }, [user]);

  useEffect(() => {
    const handleOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleLogout = async () => {
    console.log("🔓 handleLogout triggered");
    const { error } = await supabase.auth.signOut();
    console.log("✅ signOut result:", error ? error.message : "No error");
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
    member: [...commonLinks, ...memberLinks],
    leader: [...commonLinks, ...memberLinks, ...leaderLinks],
    admin: [...commonLinks, ...memberLinks, ...leaderLinks, ...adminLinks],
    superadmin: [...commonLinks, ...memberLinks, ...leaderLinks, ...adminLinks],
  };

  const roleLinks = allRoles[userRole] || commonLinks;

  return (
    <header className="header">
      <div className="navbar__container">
        <Link to="/" id="logoImg" className="logo">
          <img src="/images/global/Logo.png" alt="Logo" />
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
                "/images/global/Profile-placeholder.png"
              }
              alt="Profile"
              className="profile-icon"
              onClick={() => {
                setDropdownOpen((o) => !o);
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
                <ButtonNav id="signOut" label="Sign Out" action="signOut" />
              </div>
            )}
          </div>
        ) : (
          <>
            <ButtonNav id="signIn" label="Sign In" to="/login" />
            <ButtonNav id="signUp" label="Sign Up" to="/register1" />
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
