import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { supabase } from "../supabaseDB";
import TextInput from "../components/TextInput";
import "../styles/main.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    birthMonth: "",
    birthDay: "",
    country: "",
    customCountry: "",
  });

  // Email field shows the email registered with but not editable
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

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      country: value,
      customCountry: "", // Clear customCountry if not "Other"
    }));
  };

  // SAVE data entered in the Profile
  const handleSaveProfile = async (e) => {
  e.preventDefault();

  const {
    firstName,
    lastName,
    preferredName,
    birthMonth,
    birthDay,
    country,
    customCountry,
  } = formData;

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    alert("User not authenticated");
    return;
  }

  const finalPreferredName = preferredName?.trim() || firstName;

  const { error } = await supabase.from("profiles").upsert([
    {
      id: user.id,
      email: user.email,
      first_name: firstName,
      last_name: lastName,
      preferred_name: finalPreferredName,
      birth_month: birthMonth,
      birth_day: birthDay,
      country: country === "Other" ? customCountry : country,
    },
  ]);

  if (error) {
    console.error("Error saving profile:", error);
    alert("Something went wrong saving your profile.");
  } else {
    alert("Profile saved successfully!");
    setSavedProfile({
      email: user.email,
      first_name: firstName,
      last_name: lastName,
      preferred_name: finalPreferredName,
      birth_month: birthMonth,
      birth_day: birthDay,
      country: country === "Other" ? customCountry : country,
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
            birthMonth: profileData.birth_month || "",
            birthDay: profileData.birth_day || "",
            country: profileData.country || "",
            customCountry: profileData.custom_country || "",
          }));
        }
      }
    };

    fetchProfile();
  }, []);

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
        <section className="body__left">
          <h2>Your Public Profile</h2>
          {savedProfile && (
            <div className="saved-profile-column">
              
              <p>
                 <strong> {savedProfile.first_name}  {savedProfile.last_name}, ( {savedProfile.preferred_name} ) </strong>
              </p>
              <p>
                🎁 🎂 <strong> {savedProfile.birth_month}{" "} {savedProfile.birth_day} </strong> 🙌 🥳
              </p>
              <p>
                🌎   <strong> {savedProfile.country}</strong>
              </p>
            </div>
          )}
        </section>
        <section className="body__right">
          <h2>Your Profile</h2>

          <form>
            <div className="form-group">
              <label>Email</label>
              <p className="readonly-email">{email}</p>
            </div>

            <TextInput
              id="firstName"
              name="firstName"
              label="First Name"
              placeholder="e.g., Sridevi"
              value={formData.firstName}
              onChange={handleChange}
              minLength={1}
              maxLength={50}
            />

            <TextInput
              id="lastName"
              name="lastName"
              label="Last Name"
              placeholder="e.g., Balla"
              value={formData.lastName}
              onChange={handleChange}
              minLength={1}
              maxLength={50}
            />

            <TextInput
              id="preferredName"
              name="preferredName"
              label="Preferred Name"
              placeholder="e.g., Srilu"
              value={formData.preferredName}
              onChange={handleChange}
              maxLength={50}
            />

            <div className="form-group dob-group">
              <label htmlFor="dob">Birth Month & Day</label>
              <div className="dob-row">
                <select
                  id="birthMonth"
                  name="birthMonth"
                  value={formData.birthMonth}
                  onChange={handleChange}
                >
                  <option value="">Month</option>
                  {[
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
                  ].map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

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
                <label></label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="country">Country of Residence</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
              >
                <option value="">-- Select Country --</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="India">India</option>
                <option value="Europe">Europe</option>
                <option value="China">China</option>
                <option value="Japan">Japan</option>
                <option value="Africa">Africa</option>
                <option value="Other">Other</option>
              </select>

              {formData.country === "Other" && (
                <TextInput
                  id="customCountry"
                  name="customCountry"
                  label="Type your Country"
                  placeholder="e.g., Wakanda"
                  value={formData.customCountry}
                  onChange={handleChange}
                  minLength={1}
                  maxLength={50}
                />
              )}
              <button
                type="submit"
                className="save-button"
                onClick={handleSaveProfile}
              >
                Save Profile
              </button>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default Profile;
