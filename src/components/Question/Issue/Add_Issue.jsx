import React, { useState } from "react";
import { supabase } from "../../../supabaseDB";
// import { v4 as uuidv4 } from "uuid";
import Msg_in_Body from "../../Message/Msg_in_Body";

const Add_Issue = () => {
  const [title, setTitle] = useState("");
  const [explain, setExplain] = useState("");
  const [steps, setSteps] = useState([""]);
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  const handleStepChange = (index, value) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const addStepField = () => setSteps([...steps, ""]);
  const removeStepField = (index) => {
    const updated = [...steps];
    updated.splice(index, 1);
    setSteps(updated);
  };

  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setStatus(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("You must be logged in to submit.");
        setStatus("error");
        return;
      }

      // Upload image if provided
      let image_url = null;
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `issue_images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("uploads")
          .upload(filePath, imageFile);

        if (uploadError) {
          setMessage("Image upload failed.");
          setStatus("error");
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from("uploads")
          .getPublicUrl(filePath);

        image_url = publicUrlData.publicUrl;
      }

      // Insert issue
      const { data: issueData, error: issueError } = await supabase
        .from("qa_issues")
        .insert([
          {
            title,
            explain,
            image_url,
            created_by: user.id,
          },
        ])
        .select()
        .single();

      if (issueError) {
        throw issueError;
      }

      // Insert steps
      const stepInserts = steps
        .filter((step) => step.trim() !== "")
        .map((step, index) => ({
          issue_id: issueData.id,
          step_order: index + 1,
          step_text: step,
        }));

      const { error: stepError } = await supabase
        .from("qa_issue_steps")
        .insert(stepInserts);

      if (stepError) throw stepError;

      setMessage("Issue successfully submitted!");
      setStatus("success");
      setTitle("");
      setExplain("");
      setSteps([""]);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while submitting.");
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Log New Issue</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 mb-4"
        />

        <label className="block mb-2">Explain</label>
        <textarea
          value={explain}
          onChange={(e) => setExplain(e.target.value)}
          rows={4}
          className="w-full border p-2 mb-4"
        />

        <label className="block mb-2">Steps to Reproduce</label>
        {steps.map((step, index) => (
          <div key={index} className="flex mb-2 gap-2">
            <input
              type="text"
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="w-full border p-2"
              placeholder={`Step ${index + 1}`}
            />
            {steps.length > 1 && (
              <button
                type="button"
                onClick={() => removeStepField(index)}
                className="text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addStepField}
          className="mb-4 text-blue-600"
        >
          + Add Step
        </button>

        <label className="block mb-2">Optional Screenshot</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Issue
        </button>
      </form>

      {message && (
        <Msg_in_Body type={status} message={message} className="mt-4" />
      )}
    </div>
  );
};

export default Add_Issue;
