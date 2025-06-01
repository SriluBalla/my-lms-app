import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TextInput from "../components/Input_TextField";
import NumberInput from "../components/Input_Number";
import TextAreaInput from "../components/Input_TextArea";
import SelectInput from "../components/Input_Select";
import SuccessPopup from "../components/Msg_in_Popup";
import ConfirmMessage from "../components/Msg_in_Body";
import SavedProfileCard from "../components/Card_Profile";
import UserRole from "../components/SQL_get_Roles";
import ProfileImageUploader from "../components/Upload_Helper";
import { supabase } from "../supabaseDB";
import AdminNote from "../components/Admin_Notes";
import ButtonSubmit from "../components/ButtonSubmit";
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
  const [savedProfile, setSavedProfile] = useState(null);
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
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

  const requiresPendingStatus = (newData, oldData) => {
    const checkFields = [
      "first_name",
      "last_name",
      "preferred_name",
      "self_intro",
      "profile_img_url",
    ];
    return checkFields.some(
      (field) => newData[field]?.trim() !== oldData[field]?.trim()
    );
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    const {
      firstName,
      lastName,
      preferredName,
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
      setMessage({
        type: "error",
        text: "You must be logged in to save your profile.",
      });
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
      setErrors(newErrors);
      return;
    }

    const yearsExp = String(yearsExperience || "").trim();
    const parsedYears = isNaN(Number(yearsExp)) ? null : Number(yearsExp);
    const parsedBirthDay = birthDay ? parseInt(birthDay) : null;
    const finalPreferredName = preferredName?.trim() || firstName;

    const shouldSetPending = requiresPendingStatus(
      {
        first_name: firstName,
        last_name: lastName,
        preferred_name: finalPreferredName,
        self_intro: selfIntro,
        profile_img_url:
          profileImageUrl || savedProfile?.profile_img_url || null,
      },
      savedProfile
    );

    const updatedProfile = {
      id: user.id,
      email: user.email,
      first_name: firstName,
      last_name: lastName,
      preferred_name: finalPreferredName,
      years_experience: parsedYears,
      birth_month: birthMonth || null,
      birth_day: parsedBirthDay,
      profile_img_url: profileImageUrl || savedProfile?.profile_img_url || null,
      country: country === "Other" ? customCountry : country || null,
      linkedin: linkedin?.trim() || null,
      github: github?.trim() || null,
      blog: blog?.trim() || null,
      self_intro: selfIntro?.trim() || null,
      profile_status: shouldSetPending
        ? "pending"
        : savedProfile?.profile_status || "approved",
    };

    const { error } = await supabase.from("profiles").upsert([updatedProfile]);

    if (error) {
      console.error("❌ Supabase Save Error:", error);
      setMessage({
        type: "error",
        text: `Error saving profile: ${error.message}`,
      });
      return;
    }
    setShowPopup(true);
  };

  return (
    <Layout title="Profile" description="Manage your profile">
      <div className="body__outline">
        <section className="hero heading">
          <h2>Welcome to Your Profile</h2>
          <p>
            <strong>
              Tell your story to the Product Owner in Test community by sharing
              the information you want to be recognized by.
            </strong>
          </p>
          <AdminNote />
        </section>

        {savedProfile && (
          <section className="hero blue left">
            <SavedProfileCard profile={savedProfile} />
          </section>
        )}

        <div className="hero lite-blue right">
          <h2>Your Profile</h2>

          <ConfirmMessage type={message.type} text={message.text} />

          <div className="email-field">
            <p className="readonly-email">
              Email: <b>{email}</b>
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
              message={errors.firstName}
              type="error"
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
              message={errors.lastName}
              type="error"
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
              message={errors.preferredName}
              type="error"
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
              message={errors.yearsExperience}
              type="error"
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
              message={errors.selfIntro}
              type="error"
              className="text-area"
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
                message={errors.birthMonth}
                type="error"
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
                    <b>Refresh the page to view your public profile.</b>
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
              message={errors.country}
              type="warn"
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
              message={errors.linkedin}
              type="warn"
            />

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
              message={errors.github}
              type="warn"
            />

            <ButtonSubmit id="saveProfile" label="Save Profile" />
            
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
