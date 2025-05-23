import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { supabase } from "../supabaseDB";
import TextInput from "../components/TextInput";
import TextAreaInput from "../components/TextArea";
import NumberInput from "../components/NumberInput";
import SuccessPopup from "../components/SuccessPopup";
import SelectInput from "../components/SelectInput";
import SavedProfileCard from "../components/ProfileSummary";

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

  const [hasLoadedProfile, setHasLoadedProfile] = useState(false);
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
      selfIntro,
    } = formData;

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setErrors({ type: "error", text: "User not authenticated" });
      return;
    }

    // 🔍 Validation
    const newErrors = {};

    if (!firstName) newErrors.firstName = "Please provide your first name.";
    if (!lastName) newErrors.lastName = "Please provide your last name.";

    if (
      linkedin?.trim() &&
      !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(linkedin)
    )
      newErrors.linkedin = "Please enter a valid LinkedIn URL.";

    if (
      github?.trim() &&
      !/^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/.test(github)
    )
      newErrors.github = "Please enter a valid GitHub URL.";

    if (blog?.trim()) {
      try {
        new URL(blog);
      } catch {
        newErrors.blog = "Please enter a valid blog URL.";
      }
    }

    const yearsExp = String(yearsExperience || "").trim();
    if (yearsExp && (isNaN(yearsExp) || yearsExp < 0 || yearsExp > 60))
      newErrors.yearsExperience = "Please enter a number between 0 and 60.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    // 📸 Image upload (optional)
    let profileImageUrl = "";
    if (profileImage) {
      if (profileImage.size > 5 * 1024 * 1024) {
        setErrors({ profileImage: "Image must be under 5MB." });
        return;
      }

      const fileExt = profileImage.name.split(".").pop();
      const fileName = `user-${user.id}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(filePath, profileImage, {
          contentType: profileImage.type,
          upsert: true,
        });

      if (uploadError) {
        setErrors({
          profileImage: `Image upload failed: ${uploadError.message}`,
        });
        return;
      }

      const { data: urlData } = supabase.storage
        .from("profile-pictures")
        .getPublicUrl(filePath);

      profileImageUrl = urlData?.publicUrl || "";
    }

    // 📝 Upsert to Supabase
    const finalPreferredName = preferredName?.trim() || firstName;

    const { error } = await supabase.from("profiles").upsert([
      {
        id: user.id,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        preferred_name: finalPreferredName,
        years_experience: yearsExperience || null,
        birth_month: birthMonth || null,
        birth_day: birthDay || null,
        country: country === "Other" ? customCountry : country || null,
        profile_img_url: profileImageUrl || null,
        linkedin: linkedin?.trim() || null,
        github: github?.trim() || null,
        blog: blog?.trim() || null,
        self_intro: selfIntro?.trim() || null,
      },
    ]);

    if (error) {
      console.error("Error saving profile:", error);
      setErrors({
        type: "error",
        text: "Something went wrong while saving your profile.",
      });
      return;
    }

    // ✅ Success: update local state
    setShowPopup(true);

    setSavedProfile({
      email: user.email,
      first_name: firstName,
      last_name: lastName,
      preferred_name: finalPreferredName,
      yearsExperience,
      birth_month: birthMonth,
      birth_day: birthDay,
      country: country === "Other" ? customCountry : country,
      profile_img_url: profileImageUrl,
      linkedin,
      github,
      blog,
      self_intro: selfIntro,
    });

    setFormData({
      firstName,
      lastName,
      preferredName: finalPreferredName,
      yearsExperience,
      birthMonth,
      birthDay,
      country,
      customCountry,
      linkedin,
      github,
      blog,
      selfIntro,
    });
  };

  //////// SHOW first name as Preferred name if it is Null
  const [savedProfile, setSavedProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!user || userError) return;

      setEmail(user.email);

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError || !profileData) return;

      setSavedProfile(profileData);

      if (!hasLoadedProfile) {
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
        setHasLoadedProfile(true); // ✅ This prevents it from running again
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
            <SavedProfileCard profile={savedProfile} />
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

            <TextInput
              id="firstName"
              name="firstName"
              label="First Name"
              placeholder="e.g., Sridevi"
              required={true}
              value={formData.firstName}
              onChange={handleChange}
              maxLength={100}
              error={errors.firstName}
            />
            {errors.firstName && (
              <p className="error-message">{errors.firstName}</p>
            )}

            <TextInput
              id="lastName"
              name="lastName"
              label="Last Name"
              placeholder="e.g., Balla"
              required={true}
              value={formData.lastName}
              onChange={handleChange}
              maxLength={50}
              error={errors.lastName}
            />
            {errors.lastName && (
              <p className="error-message">{errors.lastName}</p>
            )}

            <TextInput
              id="preferredName"
              name="preferredName"
              label="Preferred Name"
              placeholder="e.g., Srilu"
              value={formData.preferredName}
              onChange={handleChange}
              maxLength={50}
            />

            <NumberInput
              id="yearsExperience"
              name="yearsExperience"
              label="No. of years in IT "
              placeholder="e.g., 5"
              value={formData.yearsExperience}
              onChange={handleChange}
              min={0}
              max={60}
              step={1}
              error={errors.yearsExperience}
            />
            <em>(as Dev, QA, SDET, DevOps, etc.)</em>

            <TextAreaInput
              id="selfIntro"
              name="selfIntro"
              label="Self Introduction"
              placeholder="Write a short introduction about yourself..."
              value={formData.selfIntro}
              onChange={handleChange}
              maxLength={2000}
              rows={12}
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
                placeholder="Month"
              />
              {errors.birthDay && (
                <p className="error-message">{errors.birthDay}</p>
              )}

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
              {errors.github && <p className="error-msg">{errors.github}</p>}
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

            <button type="submit" className="button" id="btn-profile">
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
