import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseDB";
import { v4 as uuidv4 } from "uuid";
import Layout from "../components/Layout";
import TextInput from "../components/Input/Input_TextField";
import NumberInput from "../components/Input/Input_Number";
import RichTextEditor from "../components/Input/Input_RichTextEditor";
import SelectInput from "../components/Input/Input_Select";
import SuccessPopup from "../components/Message/Msg_in_Popup";
import ConfirmMessage from "../components/Message/Msg_in_Body";
import SavedProfileCard from "../components/SQL/Card_Profile";
import UserRole from "../components/SQL/SQL_get_Roles";
import ImageUploader from "../components/SQL/Upload_Helper";
import AdminNote from "../components/SQL/Admin_Notes";
import ButtonSubmit from "../components/Button/ButtonSubmit";
import "../styles/main.css";

const BUCKET = "profile-pictures";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [savedProfile, setSavedProfile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("");
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
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();
      if (currentUser) setUser(currentUser);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    async function fetchProfile() {
      setEmail(user.email);
      const { data, error } = await supabase
        .from("user_admin_view")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) return;
      if (data) {
        setSavedProfile(data);
        setProfileImageUrl(data.profile_img_url || "");
        setFormData({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          preferredName: data.preferred_name || "",
          yearsExperience: data.years_experience || "",
          birthMonth: data.birth_month || "",
          birthDay: data.birth_day || "",
          country: data.country || "",
          customCountry: data.custom_country || "",
          linkedin: data.linkedin || "",
          github: data.github || "",
          blog: data.blog || "",
          selfIntro: data.self_intro || "",
        });
      }
    }
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setErrors({});

    if (!user)
      return setMessage({ type: "error", text: "Please sign in first." });

    const urlErrors = {};
    if (
      formData.linkedin &&
      !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(formData.linkedin)
    )
      urlErrors.linkedin = "Invalid LinkedIn URL.";
    if (
      formData.github &&
      !/^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/.test(
        formData.github
      )
    )
      urlErrors.github = "Invalid GitHub URL.";

    if (Object.keys(urlErrors).length > 0) {
      setErrors(urlErrors);
      return;
    }

    let uploadedUrl = profileImageUrl;
    if (profileImageFile) {
      const ext = profileImageFile.name.split(".").pop();
      const path = `${uuidv4()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, profileImageFile);
      if (uploadError)
        return setMessage({ type: "error", text: "Image upload failed." });

      const { data: publicUrl } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(path);
      uploadedUrl = publicUrl.publicUrl;
    }

    const updatedProfile = {
      id: user.id,
      email: user.email,
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      preferred_name:
        formData.preferredName.trim() || formData.firstName.trim(),
      years_experience: Number(formData.yearsExperience) || null,
      birth_month: formData.birthMonth || null,
      birth_day: formData.birthDay ? parseInt(formData.birthDay) : null,
      profile_img_url: uploadedUrl,
      country:
        formData.country === "Other"
          ? formData.customCountry
          : formData.country,
      linkedin: formData.linkedin.trim() || null,
      github: formData.github.trim() || null,
      blog: formData.blog.trim() || null,
      self_intro: formData.selfIntro.trim(),
      profile_status:
        savedProfile &&
        (formData.firstName !== savedProfile.first_name ||
          formData.lastName !== savedProfile.last_name ||
          formData.preferredName !== savedProfile.preferred_name ||
          formData.selfIntro !== savedProfile.self_intro ||
          uploadedUrl !== savedProfile.profile_img_url)
          ? "pending"
          : savedProfile.profile_status || "approved",
    };

    const { error } = await supabase.from("profiles").upsert([updatedProfile]);
    if (error) {
      console.error(error);
      return setMessage({ type: "error", text: "Failed to save profile." });
    }

    setSavedProfile(updatedProfile);
    setProfileImageUrl(uploadedUrl);
    setShowPopup(true);
  };

  return (
    <Layout title="Profile" description="Manage your profile">
      <div className="body__outline">
        <section className="heading">
          <h2>Your Profile</h2>
          <p>
            <strong>Share your story with the community!</strong>
          </p>
          <AdminNote />
        </section>

        <div className="profile-body">
          <section className="left">
            {" "}
            {savedProfile && (
              <div className="member-card public">
                <SavedProfileCard profile={savedProfile} />
              </div>
            )}
          </section>

          <section className="hero lite-blue">
            <h2>Edit Profile</h2>
            <ConfirmMessage {...message} />

            <div className="email-field">
              <p>
                Email: <b>{email}</b>
              </p>
            </div>

            <UserRole />

            {/* IMAGE UPLOADER */}
            {user && (
              <ImageUploader
                bucketName={BUCKET}
                onUpload={(file) => setProfileImageFile(file)}
              />
            )}

            <form onSubmit={handleSaveProfile}>
              <TextInput
                id="firstName"
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                message={errors.firstName}
                type="error"
              />
              <TextInput
                id="lastName"
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                message={errors.lastName}
                type="error"
              />
              <TextInput
                id="preferredName"
                name="preferredName"
                label="Preferred Name"
                value={formData.preferredName}
                onChange={handleChange}
                message={errors.preferredName}
                type="error"
              />
              <NumberInput
                id="yearsExperience"
                name="yearsExperience"
                label="Years in IT"
                value={formData.yearsExperience}
                onChange={handleChange}
                min={0}
                max={60}
                message={errors.yearsExperience}
                type="error"
              />
              <RichTextEditor
                id="selfIntro"
                name="selfIntro"
                label="Self Intro"
                value={formData.selfIntro}
                onChange={(val) =>
                  setFormData((prev) => ({ ...prev, selfIntro: val }))
                }
                required
                maxLength={1000}
                width="auto"
              />
              {errors.selfIntro && (
                <ConfirmMessage type="error" text={errors.selfIntro} />
              )}

              <label>Date of Birth</label>
              <div className="ddl-group">
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
                />
                <SelectInput
                  id="birthDay"
                  name="birthDay"
                  value={formData.birthDay}
                  onChange={handleChange}
                  options={[...Array(31)].map((_, i) => `${i + 1}`)}
                  placeholder="-- Day --"
                />
              </div>

              <SelectInput
                id="country"
                name="country"
                label="Country"
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
                  "Other",
                ]}
                placeholder="-- Country --"
                message={errors.country}
              />
              {formData.country === "Other" && (
                <TextInput
                  id="customCountry"
                  name="customCountry"
                  label="Custom Country"
                  value={formData.customCountry}
                  onChange={handleChange}
                />
              )}
              <TextInput
                id="linkedin"
                name="linkedin"
                label="LinkedIn URL"
                value={formData.linkedin}
                onChange={handleChange}
                message={errors.linkedin}
                type="warn"
              />
              <TextInput
                id="github"
                name="github"
                label="GitHub URL"
                value={formData.github}
                onChange={handleChange}
                message={errors.github}
                type="warn"
              />

              <div className="center">
                <ButtonSubmit label="Save Profile" />
              </div>
            </form>
          </section>
        </div>

        {showPopup && (
          <SuccessPopup
            message={
              <>
                Profile saved!
                <br />
                <b>Refresh to see updates publicly.</b>
              </>
            }
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Profile;
