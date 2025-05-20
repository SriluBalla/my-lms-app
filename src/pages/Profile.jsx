import React, { useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../supabaseDB";
import TextInput from "../components/TextInput";
import "../styles/Register.css";

const Profile = () => {

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
      const [selectedCountry, setSelectedCountry] = useState("");

      const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  };

  return (
    <Layout title="Register" 
    description="Create your account">
    
      <section className="register-page">
        <div className="body__center">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <h4>To Get to Know you</h4>
            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="e.g., Sridevi"
                required
                minLength={1}
                maxLength={50}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="e.g., Balla"
                required
                minLength={1}
                maxLength={50}
              />
            </div>
            <div className="form-group">
              <label htmlFor="preferredName">Preferred Name</label>
              <input
                type="text"
                id="preferredName"
                name="preferredName"
                placeholder="e.g., Srilu"
                maxLength={50}
              />
            </div>
            <div className="form-group dob-group">
              <label htmlFor="dob">
                Birth Month & Day <span className="required">*</span>
              </label>
              <div className="dob-row">
                <select name="birthMonth" required>
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

                <select name="birthDay" required>
                  <option value="">Day</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="country">
                Country of Residence <span className="required">*</span>
              </label>
              <select
                id="country"
                name="country"
                required
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

              {selectedCountry === "Other" && (
                <div className="form-group">
                  <label htmlFor="otherCountry">Type your Country</label>
                  <input
                    type="text"
                    id="customCountry"
                    name="customCountry"
                    placeholder="eg., Wakanda"
                    className="custom-country-input"
                    onChange={handleCountryChange}
                    required
                    minLength={1}
                    maxLength={50}
                  />
                </div>
              )}
            </div>
            </form>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
