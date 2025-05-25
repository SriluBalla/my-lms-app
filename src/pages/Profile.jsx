import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TextInput from "../components/TextInput";
import NumberInput from "../components/NumberInput";
import TextAreaInput from "../components/TextArea";
import SelectInput from "../components/SelectInput";
import SuccessPopup from "../components/SuccessPopup";
import SavedProfileCard from "../components/ProfileSummary";
import UserRole from "../components/UserRole";
import ProfileImageUploader from "../components/ImageUploader";
import { supabase } from "../supabaseDB";
import "../styles/main.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    role: "",
    yearsExperience: "",
    birthMonth: "",
    birthDay: "",
    country: "",
    customCountry: "",
    linkedin: "",
    github: "",
    blog: "",
    selfIntro: "",
  });

  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [savedProfile, setSavedProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!user || userError) return;

      setEmail(user.email);

      const { data: profileData, error: profileError } = await supabase
        .from("user_admin_view")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!profileError && profileData && profileData.first_name) {
        setSavedProfile(profileData);
        setFormData({
          firstName: profileData.first_name || "",
          lastName: profileData.last_name || "",
          preferredName: profileData.preferred_name || "",
          yearsExperience: profileData.years_experience || "",
          birthMonth: profileData.birth_month || "",
          birthDay: profileData.birth_day || "",
          country: profileData.country || "",
          customCountry: profileData.custom_country || "",
          linkedin: profileData.linkedin || "",
          github: profileData.github || "",
          blog: profileData.blog || "",
          selfIntro: profileData.self_intro || "",
        });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      preferredName,
      profile_img_url,
      yearsExperience,
      birthMonth,
      birthDay,
      country,
      customCountry,
      linkedin,
      github,
      blog,
      selfIntro,
    } = formData;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      setErrors({ general: "User not authenticated" });
      return;
    }

    const newErrors = {};

    if (
      formData.linkedin?.trim() &&
      !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(formData.linkedin)
    ) {
      newErrors.linkedin =
        "Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourname)";
    }

    if (
      formData.github?.trim() &&
      !/^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/.test(
        formData.github
      )
    ) {
      newErrors.github =
        "Please enter a valid GitHub URL (e.g., https://github.com/your-username)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // ✅ this updates the UI
      return;
    }

    const yearsExp = String(yearsExperience || "").trim();
    const parsedYears = isNaN(Number(yearsExp)) ? null : Number(yearsExp);
    const parsedBirthDay = birthDay ? parseInt(birthDay) : null;
    const finalPreferredName = preferredName?.trim() || firstName;

    // const profileImageUrl = await handleImageUpload(user);

    const { error } = await supabase.from("profiles").upsert([
      {
        id: user.id,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        preferred_name: finalPreferredName,
        years_experience: parsedYears,
        birth_month: birthMonth || null,
        birth_day: parsedBirthDay,
        profile_img_url:
          profileImageUrl || savedProfile?.profile_img_url || null,
        country: country === "Other" ? customCountry : country || null,
        profile_img_url: profileImageUrl || null,
        linkedin: linkedin?.trim() || null,
        github: github?.trim() || null,
        blog: blog?.trim() || null,
        self_intro: selfIntro?.trim() || null,
      },
    ]);

    if (error) {
      console.error("❌ Supabase Save Error:", error);
      alert(`Error saving profile: ${error.message}`);
      return;
    }

    setShowPopup(true);
  };

  return (
    <Layout title="Profile" description="Manage your profile">
      <div className="body__outline">
        <section className="hero__head">
          <h2>Welcome to Your Profile</h2>
          <p>
            {" "}
            <strong>
              Tell your story to the Product Owner in Test community by sharing
              the information you want to be recognized by.
            </strong>
          </p>
        </section>

        {savedProfile && (
          <section className="body__left">
            <SavedProfileCard profile={savedProfile} />
          </section>
        )}

        <div className="body__right">
          <h2>Your Profile</h2>

          <div className="email-field">
            <p className="readonly-email">
              Email: <b>{email} </b>{" "}
            </p>
          </div>

          <UserRole />

          {user && user.id && (
            <ProfileImageUploader
              userId={user.id}
              onUpload={(url) => setProfileImageUrl(url)}
            />
          )}

          <form onSubmit={handleSaveProfile}>
            <TextInput
              id="firstName"
              name="firstName"
              label="First Name"
              placeholder="e.g., Sridevi"
              value={formData.firstName}
              onChange={handleChange}
              maxLength={100}
              required={true}
              error={errors.firstName}
            />
            <TextInput
              id="lastName"
              name="lastName"
              label="Last Name"
              placeholder="e.g., Balla"
              value={formData.lastName}
              onChange={handleChange}
              maxLength={100}
              required={true}
              error={errors.lastName}
            />

            <TextInput
              id="preferredName"
              name="preferredName"
              label="Preferred Name"
              placeholder="e.g., Srilu"
              value={formData.preferredName}
              onChange={handleChange}
              maxLength={50}
              required={false}
              error={errors.preferredName}
            />

            <NumberInput
              id="yearsExperience"
              name="yearsExperience"
              label="No. of years in IT"
              placeholder="e.g., 5"
              value={formData.yearsExperience}
              onChange={handleChange}
              min={0}
              max={60}
              required={false}
              error={errors.yearsExperience}
            />
            <em>(as Dev, QA, SDET, DevOps, etc.)</em>

            <TextAreaInput
              id="selfIntro"
              name="selfIntro"
              label="Self Introduction"
              placeholder="What would like for your community to know about you...."
              value={formData.selfIntro}
              onChange={handleChange}
              maxLength={1000}
              required={false}
              error={errors.selfIntro}
            />

            <label>Date of Birth and Month</label>
            <span className="ddl-group">
              <SelectInput
                id="birthMonth"
                name="birthMonth"
                value={formData.birthMonth}
                onChange={handleChange}
                options={[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ]}
                placeholder="-- Month --"
                required={false}
                error={errors.birthMonth}
              />

              <select
                id="birthDay"
                name="birthDay"
                value={formData.birthDay}
                onChange={handleChange}
              >
                <option value="">Day</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </span>

            {showPopup && (
              <SuccessPopup
                message={
                  <>
                    Your profile has been saved successfully!
                    <br />
                    <b> Refresh the page to view your public profile. </b>
                  </>
                }
                onClose={() => setShowPopup(false)}
              />
            )}

            <SelectInput
              id="country"
              name="country"
              label="Country of Residence"
              value={formData.country}
              onChange={handleChange}
              options={[
                "USA",
                "Canada",
                "India",
                "Europe",
                "China",
                "Japan",
                "Africa",
              ]}
              placeholder="-- Country --"
              error={errors.country}
            />

            <TextInput
              id="linkedin"
              name="linkedin"
              label="LinkedIn Profile"
              placeholder="https://www.linkedin.com/in/your-name"
              title="Only valid LinkedIn URLs are allowed"
              value={formData.linkedin}
              onChange={handleChange}
              maxLength={100}
              required={false}
              className={errors.linkedin ? "error" : ""}
            />
            {errors.linkedin && <p className="error-msg">{errors.linkedin}</p>}

            <TextInput
              id="github"
              name="github"
              label="GitHub Profile"
              placeholder="https://github.com/your-name"
              title="Only valid GitHub URLs are allowed"
              value={formData.github}
              onChange={handleChange}
              maxLength={100}
              required={false}
              className={errors.github ? "error" : ""}
            />
            {errors.github && <p className="error-msg">{errors.github}</p>}

            <button type="submit" className="button">
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
