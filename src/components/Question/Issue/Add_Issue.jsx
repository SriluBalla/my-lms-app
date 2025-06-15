import React, { useState, useEffect } from "react";
import { supabase } from "../../../supabaseDB";
import { v4 as uuidv4 } from "uuid";
import SavedProfileCard from "../../SQL/Card_Profile";
import RichTextEditor from "../../Input/Input_RichTextEditor";
import ButtonSubmit from "../../Button/ButtonSubmit";
import TextInput from "../../Input/Input_TextField";
import Msg_in_Body from "../../Message/Msg_in_Body";
import ImageUploader from "../../SQL/Upload_Helper";
import SelectInput from "../../Input/Input_Select";
import "../../../styles/main.css";

const Add_Issue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [actualResult, setActualResult] = useState("");
  const [expectedResult, setExpectedResult] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [environment, setEnvironment] = useState("");
  const [browser, setBrowser] = useState("");
  const [os, setOS] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    async function fetchUserAndProfile() {
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData?.user;
      if (!currentUser) return;

      setUser(currentUser);

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", currentUser.id)
        .single();

      if (!error && profile) {
        setFullName(`${profile.first_name} ${profile.last_name}`);
      }
    }

    fetchUserAndProfile();
  }, []);

  const handleImageChange = (file) => setImageFile(file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      if (!user) {
        setMessage({ type: "info", text: "You must be logged in to submit." });
        return;
      }

      let issue_image_url = null;
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `issue_images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("uploads")
          .upload(filePath, imageFile);

        if (uploadError) {
          setMessage({ type: "error", text: "Image upload failed." });
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("uploads")
          .getPublicUrl(filePath);

        issue_image_url = publicUrlData.publicUrl;
      }

      const { error: issueError } = await supabase.from("qa_issues").insert([
        {
          title,
          description,
          actual_result: actualResult,
          expected_result: expectedResult,
          severity,
          status,
          environment,
          browser,
          os,
          assigned_to: assignedTo,
          created_by: user.id,
          issue_image_url,
        },
      ]);

      if (issueError) throw issueError;

      setMessage({
        type: "success",
        text: "Issue successfully submitted! Someone will get back to you with feedback",
      });

      setTitle("");
      setDescription("");
      setActualResult("");
      setExpectedResult("");
      setSeverity("");
      setStatus("");
      setEnvironment("");
      setBrowser("");
      setOS("");
      setAssignedTo("");
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setMessage({
        type: "error",
        text: "An error occurred while submitting.",
      });
    }
  };

  return (
    <div>
      <section className="hero bRed-bgRed left-hero">
        <form onSubmit={handleSubmit}>
          <TextInput
            id="issueTitle"
            name="issueTitle"
            label="Issue Title"
            placeholder="Product: Component: Issue"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            required
          />

          <RichTextEditor
            label="Description"
            p={`Explain the issue in as much detail as you feel is necessary, including:
             Database or API details, SQL queries, Screens or flows affected
             Repro steps or patterns observed`}
            value={description}
            onChange={setDescription}
            maxLength={1500}
            height={200}
            width="auto"
            placeholder="Describe the issue in detail"
            required
          />

          <TextInput
            id="actualResult"
            name="actualResult"
            label="Actual Result"
            placeholder="What actually happened?"
            value={actualResult}
            onChange={(e) => setActualResult(e.target.value)}
            required
          />

          <TextInput
            id="expectedResult"
            name="expectedResult"
            label="Expected Result"
            placeholder="What should have happened?"
            value={expectedResult}
            onChange={(e) => setExpectedResult(e.target.value)}
            required
          />

          <ImageUploader
            userId={user?.id}
            onUpload={(file) => handleImageChange(file)}
          />
        </form>
      </section>

      <div className="hero bRed-bgRed right-hero">
        <h2>Extra Details</h2>

        {fullName && (
          <div>
            <label>Reported by :</label>
            <p>{fullName} </p>
          </div>
        )}

        <SelectInput
          id="assignedTo"
          name="assignedTo"
          label="Assign To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          options={["Product Owner", "Particular Dev", "Dev Lead", "Default"]}
          placeholder="Select Assignee Role"
        />

        <SelectInput
          id="severity"
          name="severity"
          label="Severity"
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          options={["Blocker", "Critical", "Major", "Minor", "Trivial"]}
          placeholder="Severity"
        />

        <SelectInput
          id="status"
          name="status"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            "Open",
            "In Progress",
            "Ready for Re-Check",
            "In Checking",
            "Ready for Prod",
            "In Prod",
            "Won't Fix",
            "Cannot Reproduce",
            "Closed",
          ]}
          placeholder="----- Status -----"
        />

        <SelectInput
          id="environment"
          name="environment"
          label="Environment"
          value={environment}
          onChange={(e) => setEnvironment(e.target.value)}
          options={["Dev", "Prod", "Stage", "Test", "UAT"]}
          placeholder="Environment"
        />

        <TextInput
          id="os"
          name="os"
          label="Operating System"
          placeholder="Device, operating system, etc."
          value={os}
          onChange={(e) => setOS(e.target.value)}
        />
        <TextInput
          id="browser"
          name="browser"
          label="Browser / App"
          placeholder="Browser, App name"
          value={browser}
          onChange={(e) => setBrowser(e.target.value)}
        />

        <ButtonSubmit className="button flagged" data-testid="submitIssue" label="Submit Issue" />
      </div>

      <div>
        {message?.text && (
          <Msg_in_Body type={message.type} text={message.text} />
        )}
      </div>
    </div>
  );
};

export default Add_Issue;
