import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { supabase } from "../supabaseDB";
import TextInput from "../components/TextInput";
import TextAreaInput from "../components/TextArea";
import NumberInput from "../components/NumberInput";
import SuccessPopup from "../components/SuccessPopup";
import SelectInput from "../components/SelectInput";
import "../styles/main.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
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

  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});

  // Email field displays the email text
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchEmail = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user && !error) {
        setEmail(user.email);
      }
    };

    fetchEmail();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //////// ddl Country
  const handleCountryChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      country: value,
      customCountry: "", // Clear customCountry if not "Other"
    }));
  };

  ////// Member Photos
  const [profileImage, setProfileImage] = useState(null);

  // SAVE data entered in the Profile
  const handleSaveProfile = async (e) => {
    e.preventDefault();

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
    } = formData;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrors({
        type: "error",
        text: "User not authenticated",
      });

      return;
    }

    ////// Linkedin Error message
    const newErrors = {};

    const linkedinUrl = formData.linkedin?.trim();
    if (
      linkedinUrl &&
      !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(linkedinUrl)
    ) {
      newErrors.linkedin =
        "Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourname)";
    }

    const githubUrl = formData.github?.trim();
    if (
      githubUrl &&
      !/^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/.test(githubUrl)
    ) {
      newErrors.github =
        "Please enter a valid GitHub URL (e.g., https://github.com/your-username)";
    }

    const blogUrl = formData.blog?.trim();
    if (blogUrl) {
      try {
        new URL(blogUrl);
      } catch {
        newErrors.blog = "Please enter a valid blog URL.";
      }
    }

    const yearsExp = String(formData.yearsExperience || "").trim();
    if (yearsExp && (isNaN(yearsExp) || yearsExp < 0 || yearsExp > 60)) {
      newErrors.yearsExperience = "Please enter a number between 0 and 60.";
    }

    // Field checks here...
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    if (profileImage && profileImage.size > 5 * 1024 * 1024) {
      setErrors({
        type: "error",
        text: "Image must be under 5MB.",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 2000);

      return;
    }

    let profileImageUrl = "";

    if (profileImage) {
      const fileExt = profileImage.name.split(".").pop();
      const fileName = `user-${user.id}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, profileImage, {
          contentType: profileImage.type,
          upsert: true,
        });

      if (uploadError) {
        setErrors((prev) => ({
          ...prev,
          profileImage: `Image upload failed: ${uploadError.message}`,
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, profileImage: null }));
      }

      const { data: urlData } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filePath);

      profileImageUrl = urlData.publicUrl;
    }

    const finalPreferredName = preferredName?.trim() || firstName;
    const { error } = await supabase.from("profiles").upsert([
      {
        id: user.id,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        preferred_name: finalPreferredName,
        years_experience: formData.yearsExperience || null,
        birth_month: birthMonth,
        birth_day: birthDay,
        country: country === "Other" ? customCountry : country,
        profile_img_url:
          profileImageUrl || savedProfile?.profile_img_url || null,
        linkedin: linkedinUrl || null,
        github: githubUrl || null,
        blog: blogUrl || null,
        self_intro: formData.selfIntro || null,
      },
    ]);

    if (error) {
      console.error("Error saving profile:", error);
      setErrors({
        type: "error",
        text: "Something went wrong while saving your profile.",
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 2000);
    } else {
      setShowPopup(true);

      setSavedProfile({
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        preferred_name: finalPreferredName,
        yearsExperience: formData.yearsExperience,
        birth_month: birthMonth,
        birth_day: birthDay,
        country: country === "Other" ? customCountry : country,
        profile_img_url:
          profileImageUrl || savedProfile?.profile_img_url || null,
        linkedin: linkedin,
        github: github,
        blog: blog,
        self_intro: formData.selfIntro || null,
      });
    }
  };

  //////// SHOW first name as Preferred name if it is Null.
  const [savedProfile, setSavedProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (user && !userError) {
        setEmail(user.email);

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (!profileError) {
          setSavedProfile(profileData);

          // Optional: pre-fill formData with saved data
          setFormData((prev) => ({
            ...prev,
            firstName: profileData.first_name || "",
            lastName: profileData.last_name || "",
            preferredName: profileData.preferred_name || "",
            yearsExperience: profileData.years_experience || "",
            birthMonth: profileData.birth_month || "",
            birthDay: profileData.birth_day || "",
            country: profileData.country || "",
            customCountry: profileData.custom_country || "",
            linkedin: profileData.linkedin,
            github: profileData.github,
            blog: profileData.blog,
            self_intro: profileData.selfIntro || null,
          }));
        }
      }
    };

    fetchProfile();
  }, []);

  ////// PROFILE PAGE
  return (
    <Layout title="Profile" description="Your Profile">
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
            <div className="profile-image-preview">
              <img
                src={
                  savedProfile.profile_img_url
                    ? savedProfile.profile_img_url
                    : "/images/global/Profile-placeholder.png"
                }
                alt="Profile"
                title="Photo upload feature is coming soon. Stay tuned!"
                width={120}
                height={120}
                style={{
                  borderRadius: "25%",
                  border: "2px solid #ccc",
                  marginTop: "1rem",
                }}
              />
            </div>

            <h2>{savedProfile.preferred_name}</h2>
            <p>
              <strong>
                {savedProfile.first_name} {savedProfile.last_name}, 🌎{" "}
                {savedProfile.country}
              </strong>
            </p>
            <p>
              🎁 🎂{" "}
              <strong>
                {savedProfile.birth_month} {savedProfile.birth_day}
              </strong>{" "}
              🙌 🥳
            </p>
            {savedProfile?.linkedin && (
              <p>
                <a
                  href={savedProfile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {savedProfile.linkedin}
                </a>
              </p>
            )}

            {savedProfile?.github && (
              <p>
                <a
                  href={savedProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {savedProfile.github}
                </a>
              </p>
            )}

            {savedProfile?.blog && (
              <p>
                <a
                  href={savedProfile.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {savedProfile.blog}
                </a>
              </p>
            )}
          </section>
        )}

        {/* Editable fields */}
        <section className="body__right">
          <h2>Your Profile</h2>
          <form>
            <div className="email-field">
              <p className="readonly-email">
                Email: <b>{email} </b>{" "}
              </p>
            </div>

            {/* <div className="image-field">
              <label htmlFor="profileImage">Upload Profile Image </label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  if (file.size > 1 * 1024 * 1024) {
                    setErrors((prev) => ({
                      ...prev,
                      profileImage: "Image must be smaller than 1MB.",
                    }));
                    setProfileImage(null);
                  } else {
                    setErrors((prev) => ({ ...prev, profileImage: null }));
                    setProfileImage(file);
                  }
                }}
              />
              {errors.profileImage && (
                <p className="error-msg">{errors.profileImage}</p>
              )}
            </div> */}

            <p>
              <TextInput
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="e.g., Sridevi"
                value={formData.firstName}
                onChange={handleChange}
                maxLength={100}
              />
            </p>

            <p>
              <TextInput
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="e.g., Balla"
                value={formData.lastName}
                onChange={handleChange}
                maxLength={50}
              />
            </p>

            <p>
              <TextInput
                id="preferredName"
                name="preferredName"
                label="Preferred Name"
                placeholder="e.g., Srilu"
                value={formData.preferredName}
                onChange={handleChange}
                maxLength={50}
              />
            </p>

            <p>
              <NumberInput
                id="yearsExperience"
                name="yearsExperience"
                label="No. of years in IT (as Dev, QA, SDET, DevOps, etc.)"
                placeholder="e.g., 5"
                value={formData.yearsExperience}
                onChange={handleChange}
                min={0}
                max={60}
                step={1}
                error={errors.yearsExperience}
              />
            </p>

            <p>
              <TextAreaInput
                id="selfIntro"
                name="selfIntro"
                label="Self Introduction"
                placeholder="Write a short introduction about yourself..."
                value={formData.selfIntro}
                onChange={handleChange}
                maxLength={1000}
                rows={6}
                error={errors.selfIntro}
              />
            </p>

            <p>
              <div>
              <SelectInput
                id="birthMonth"
                name="birthMonth"
                label="Birth Month and Date"
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
                placeholder="Month"
              />

              <select
                id="birthDay"
                name="birthDay"
                label="Birth Day"
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
              </div>
            </p>

            <p>
              <SelectInput
                id="country"
                name="country"
                label="Country of Residence"
                value={formData.country}
                onChange={handleCountryChange}
                options={[
                  "USA",
                  "Canada",
                  "India",
                  "Europe",
                  "China",
                  "Japan",
                  "Africa",
                  "Other",
                ]}
                placeholder="-- Select Country --"
                error={errors.country}
              />
            </p>

            <p>
              <div className="text-field">
                <label htmlFor="linkedin">LinkedIn Profile</label>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  placeholder="https://www.linkedin.com/in/your-name"
                  value={formData.linkedin || ""}
                  onChange={handleChange}
                  maxLength={100}
                  title="Only valid LinkedIn URLs are allowed"
                  required={false}
                  className={errors.linkedin ? "error" : ""}
                />
                {errors.linkedin && (
                  <p className="error-msg">{errors.linkedin}</p>
                )}
              </div>

              <div className="text-field">
                <label htmlFor="github">Github Profile</label>
                <input
                  type="url"
                  id="github"
                  name="github"
                  placeholder="https://github.com/your-name"
                  value={formData.github || ""}
                  onChange={handleChange}
                  maxLength={100}
                  title="Only valid Github URLs are allowed"
                  required={false}
                  className={errors.github ? "error" : ""}
                />
                {errors.github && (
                  <p className="error-msg">{errors.github}</p>
                )}
              </div>

              <div className="text-field">
                <label htmlFor="blog">Blog</label>
                <input
                  type="url"
                  id="blog"
                  name="blog"
                  placeholder="https://mylegitblog.com"
                  value={formData.blog || ""}
                  onChange={handleChange}
                  maxLength={100}
                  title="Only valid Github URLs are allowed"
                  required={false}
                  className={errors.blog ? "error" : ""}
                />
                {errors.blog && <p className="error-msg">{errors.blog}</p>}
              </div>
            </p>
            <button
              type="submit"
              className="save-button"
              onClick={handleSaveProfile}
            >
              Save Profile
            </button>
          </form>
          {showPopup && (
            <SuccessPopup
              message="Your profile has been saved successfully!"
              onClose={() => setShowPopup(false)}
            />
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Profile;
